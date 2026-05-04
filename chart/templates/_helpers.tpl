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
