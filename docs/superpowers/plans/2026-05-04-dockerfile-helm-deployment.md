# Dockerfile + Helm Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an optimized Dockerfile and Helm chart for deploying the portfolio to Kubernetes with Traefik ingress and cert-manager TLS.

**Architecture:** 4-stage multi-stage Dockerfile for production builds; Helm chart with Deployment, Service, and Ingress templates using standard Kubernetes labels and cert-manager annotations for automatic TLS.

**Tech Stack:** Docker (Node 20 Alpine), Helm, Kubernetes, Traefik, cert-manager

---

### Task 1: Optimize Dockerfile

**Files:**
- Modify: `Dockerfile`

- [ ] **Step 1: Update the Dockerfile**

Replace the entire `Dockerfile` with an optimized version that adds `NODE_ENV=production`, `PORT=80`, non-root user, and HEALTHCHECK:

```dockerfile
FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
ENV NODE_ENV=production
ENV PORT=80

COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["npm", "run", "start"]
```

- [ ] **Step 2: Commit**

```bash
git add Dockerfile
git commit -m "optimize Dockerfile: add healthcheck, non-root user, PORT=80"
```

---

### Task 2: Update .dockerignore

**Files:**
- Modify: `.dockerignore`

- [ ] **Step 1: Update the .dockerignore**

Replace the `.dockerignore` with a more complete version:

```dockerignore
# Build artifacts
.react-router
build
node_modules

# Version control
.git
.gitignore
.gitattributes

# Documentation
README.md
docs

# Environment files
.env
.env.*
.env.local
.env.development
.env.production

# IDE and editor files
.vscode
.idea
*.swp
*.swo

# Test coverage
coverage
.nyc_output

# OS files
.DS_Store
Thumbs.db

# Type-generated files
.react-router/types
```

- [ ] **Step 2: Commit**

```bash
git add .dockerignore
git commit -m "update .dockerignore: exclude .git, docs, .env files, IDE files"
```

---

### Task 3: Create Helm Chart metadata

**Files:**
- Create: `chart/Chart.yaml`
- Create: `chart/values.yaml`

- [ ] **Step 1: Create Chart.yaml**

```yaml
apiVersion: v2
name: portfolio
description: Portfolio website - React Router SSR
type: application
version: 0.1.0
appVersion: latest
```

- [ ] **Step 2: Create values.yaml**

```yaml
replicaCount: 1

image:
  repository: portfolio
  tag: latest
  pullPolicy: IfNotPresent

containerPort: 80

service:
  port: 80

ingress:
  enabled: true
  className: traefik
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  host: portfolio.hatal.cc
  tls:
    secretName: portfolio-tls

resources:
  requests:
    cpu: 128m
    memory: 128Mi
  limits:
    cpu: 256m
    memory: 256Mi
```

- [ ] **Step 3: Commit**

```bash
git add chart/Chart.yaml chart/values.yaml
git commit -m "add helm chart: Chart.yaml and values.yaml"
```

---

### Task 4: Create Helm Deployment template

**Files:**
- Create: `chart/templates/deployment.yaml`

- [ ] **Step 1: Create deployment.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "portfolio.fullname" . }}
  labels:
    app.kubernetes.io/name: {{ include "portfolio.name" . }}
    app.kubernetes.io/instance: {{ .Release.Name }}
    app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
    app.kubernetes.io/managed-by: {{ .Release.Service }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app.kubernetes.io/name: {{ include "portfolio.name" . }}
      app.kubernetes.io/instance: {{ .Release.Name }}
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app.kubernetes.io/name: {{ include "portfolio.name" . }}
        app.kubernetes.io/instance: {{ .Release.Name }}
    spec:
      containers:
        - name: portfolio
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .Values.containerPort }}
              protocol: TCP
          readinessProbe:
            httpGet:
              path: /
              port: http
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /
              port: http
            initialDelaySeconds: 15
            periodSeconds: 10
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

- [ ] **Step 2: Create helper templates**

Create `chart/templates/_helpers.tpl`:

```yaml
{{/*
Expand the name of the chart.
*/}}
{{- define "portfolio.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "portfolio.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}
```

- [ ] **Step 3: Commit**

```bash
git add chart/templates/deployment.yaml chart/templates/_helpers.tpl
git commit -m "add helm deployment template with probes and rolling update"
```

---

### Task 5: Create Helm Service and Ingress templates

**Files:**
- Create: `chart/templates/service.yaml`
- Create: `chart/templates/ingress.yaml`

- [ ] **Step 1: Create service.yaml**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ include "portfolio.fullname" . }}
  labels:
    app.kubernetes.io/name: {{ include "portfolio.name" . }}
    app.kubernetes.io/instance: {{ .Release.Name }}
    app.kubernetes.io/managed-by: {{ .Release.Service }}
spec:
  type: ClusterIP
  ports:
    - port: {{ .Values.service.port }}
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: {{ include "portfolio.name" . }}
    app.kubernetes.io/instance: {{ .Release.Name }}
```

- [ ] **Step 2: Create ingress.yaml**

```yaml
{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ include "portfolio.fullname" . }}
  labels:
    app.kubernetes.io/name: {{ include "portfolio.name" . }}
    app.kubernetes.io/instance: {{ .Release.Name }}
    app.kubernetes.io/managed-by: {{ .Release.Service }}
  annotations:
    {{- with .Values.ingress.annotations }}
    {{- toYaml . | nindent 4 }}
    {{- end }}
spec:
  ingressClassName: {{ .Values.ingress.className }}
  tls:
    - hosts:
        - {{ .Values.ingress.host | quote }}
      secretName: {{ .Values.ingress.tls.secretName }}
  rules:
    - host: {{ .Values.ingress.host | quote }}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: {{ include "portfolio.fullname" . }}
                port:
                  number: {{ .Values.service.port }}
{{- end }}
```

- [ ] **Step 3: Commit**

```bash
git add chart/templates/service.yaml chart/templates/ingress.yaml
git commit -m "add helm service and ingress templates (Traefik + cert-manager)"
```
