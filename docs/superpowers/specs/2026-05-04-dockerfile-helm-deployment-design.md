# Dockerfile + Helm Chart Deployment Design

**Date:** 2026-05-04

## Overview

Create an optimized Dockerfile and a Helm chart to deploy the React Router SSR portfolio to Kubernetes with Traefik ingress and cert-manager TLS.

## Dockerfile

Keep the existing 4-stage multi-stage build and add production hardening:

1. **Stage: development-dependencies-env** - Full `npm ci` for build deps
2. **Stage: production-dependencies-env** - `npm ci --omit=dev` for runtime deps
3. **Stage: build-env** - Run `npm run build`, output to `/app/build`
4. **Stage: runtime** - Production image with:
   - `NODE_ENV=production`
   - `PORT=80`
   - Non-root user (`node`)
   - HEALTHCHECK on `http://localhost:80/`
   - CMD: `npm run start`

### .dockerignore updates
Add additional excludes: `.git`, `docs`, `.env*`, `coverage`, `.react-router/types`

## Helm Chart

Structure: `chart/` directory following standard Helm layout.

### Chart.yaml
- Name: portfolio
- Version: 0.1.0
- AppVersion: latest

### values.yaml
| Key | Default | Description |
|-----|---------|-------------|
| `image.repository` | `portfolio` | Container image name |
| `image.tag` | `latest` | Image tag |
| `replicaCount` | `1` | Pod replicas |
| `service.port` | `80` | Service port |
| `containerPort` | `80` | App container port |
| `host` | `portfolio.hatal.cc` | Ingress hostname |
| `ingress.enabled` | `true` | Create ingress resource |
| `ingress.annotations` | `{}` | Additional Traefik/cert-manager annotations |
| `resources.requests.cpu` | `128m` | |
| `resources.requests.memory` | `128Mi` | |
| `resources.limits.cpu` | `256m` | |
| `resources.limits.memory` | `256Mi` | |

### templates/deployment.yaml
- Rolling update strategy (maxSurge: 1, maxUnavailable: 0)
- Readiness probe: HTTP GET `/`, port 80, initialDelay: 10s
- Liveness probe: HTTP GET `/`, port 80, initialDelay: 15s
- Resource requests/limits from values
- Standard labels: app.kubernetes.io/name, app.kubernetes.io/instance

### templates/service.yaml
- ClusterIP type
- Port 80 → containerPort 80
- Matches deployment pod selector

### templates/ingress.yaml
- `ingressClassName: traefik`
- TLS with cert-manager: `cert-manager.io/cluster-issuer: letsencrypt-prod`
- Host: `{{ .Values.host }}`
- TLS secret: `portfolio-tls`
- Backend: service port 80
