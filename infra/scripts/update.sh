#!/bin/bash
if [ $1 == "dev" ]; then
  if [ $2 == "nginx" ]; then
    helm upgrade nginx-dev ingress-nginx/ingress-nginx -f infra/helm/dev/nginx.yaml -n lexico-dev
  else
    echo "invalid input"
    exit 1
  fi
elif [ $1 == "web" ]; then
  kubectl rollout restart deployment web
elif [ $1 == "server" ]; then
  kubectl rollout restart deployment server
elif [ $1 == "database" ]; then
  export POSTGRES_PASSWORD=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_PASSWORD}" | base64 --decode)
  export POSTGRES_USER=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_USER}" | base64 --decode)
  export POSTGRES_DB=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_DB}" | base64 --decode)

  helm upgrade database bitnami/postgresql \
    -f ./infra/helm/database.yaml \
    --set postgresqlPassword=$POSTGRES_PASSWORD \
    --set postgresqlUsername=$POSTGRES_USER \
    --set postgresqlDatabase=$POSTGRES_DB \
elif [ $1 == "nginx" ]; then
  helm upgrade nginx ingress-nginx/ingress-nginx -f infra/helm/nginx.yaml
# elif [ $1 == "elasticsearch" ]; then
#   helm upgrade elasticsearch elastic/elasticsearch -n logging -f infra/helm/elasticsearch.yaml
# elif [ $1 == "fluentbit" ]; then
#   helm upgrade fluentbit fluent/fluent-bit -n logging -f infra/helm/fluentbit.yaml
# elif [ $1 == "kibana" ]; then
#   helm upgrade kibana elastic/kibana -n logging -f infra/helm/kibana.yaml
# elif [ $1 == "monitoring" ]; then
#   helm upgrade monitoring prometheus-community/kube-prometheus-stack -n monitoring
else
  echo "invalid input"
  exit 1
fi
exit 0
