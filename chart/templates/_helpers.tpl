{{/*
Create the registry auth secret for docker config JSON.
*/}}
{{- define "portfolio.registryAuth" -}}
{{- $regUser := .Values.registry.username | b64enc }}
{{- $regPass := .Values.registry.password | b64enc }}
{{- $auth := printf "%s:%s" $regUser $regPass | b64enc }}
{{- $authDict := dict "auth" $auth }}
{{- $dockerConfig := dict "auths" (dict .Values.image.repository $authDict) }}
{{- $dockerConfig | toJson | b64enc }}
{{- end }}
