{{/*
Create the registry auth secret for docker config JSON.
*/}}
{{- define "portfolio.dockerconfigjson" -}}
{{- $auth := printf "%s:%s" .Values.registry.username .Values.registry.password | b64enc -}}
{
  "auths": {
    "{{ .Values.image.repository }}": {
      "auth": "{{ $auth }}"
    }
  }
}
{{- end }}
