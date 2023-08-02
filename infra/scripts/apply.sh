#!/bin/bash
if [ $1 == "dev" ]; then
  if [ $2 == "web" ]; then
    kubectl apply -f infra/kubernetes/dev/web.yaml -n lexico-dev
  elif [ $2 == "server" ]; then
    kubectl apply -f infra/kubernetes/dev/server.yaml -n lexico-dev
  elif [ $2 == "env" ]; then
    kubectl apply -f infra/kubernetes/dev/.env.yaml -n lexico-dev
  elif [ $2 == "database" ]; then
    export POSTGRES_PASSWORD=$(kubectl get secret env -n lexico-dev -o "jsonpath={.data.POSTGRES_PASSWORD}" | base64 --decode)
    export POSTGRES_USER=$(kubectl get secret env -n lexico-dev -o "jsonpath={.data.POSTGRES_USER}" | base64 --decode)
    export POSTGRES_DB=$(kubectl get secret env -n lexico-dev -o "jsonpath={.data.POSTGRES_DB}" | base64 --decode)

    helm install database bitnami/postgresql \
      -f ./infra/helm/database.yaml \
      --set postgresqlPassword=$POSTGRES_PASSWORD \
      --set postgresqlUsername=$POSTGRES_USER \
      --set postgresqlDatabase=$POSTGRES_DB \
      -n lexico-dev \
      --set resources.requests.cpu=100m \
      --set resources.requests.memory=128m \
  elif [ $2 == "nginx" ]; then
    helm install nginx-dev ingress-nginx/ingress-nginx -f infra/helm/dev/nginx.yaml -n lexico-dev
  elif [ $2 == "ingress" ]; then
    kubectl apply -f infra/kubernetes/dev/ingress.yaml -n lexico-dev
  else
    echo "invalid input"
    exit 1
  fi
elif [ $1 == "web" ]; then
  kubectl apply -f infra/kubernetes/web.yaml
elif [ $1 == "server" ]; then
  kubectl apply -f infra/kubernetes/server.yaml
elif [ $1 == "env" ]; then
  kubectl apply -f infra/kubernetes/.env.yaml
elif [ $1 == "database" ]; then
  export POSTGRES_PASSWORD=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_PASSWORD}" | base64 --decode)
  export POSTGRES_USER=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_USER}" | base64 --decode)
  export POSTGRES_DB=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_DB}" | base64 --decode)

  helm install database bitnami/postgresql \
    -f ./infra/helm/database.yaml \
    --set postgresqlPassword=$POSTGRES_PASSWORD \
    --set postgresqlUsername=$POSTGRES_USER \
    --set postgresqlDatabase=$POSTGRES_DB \
elif [ $1 == "nginx" ]; then
  helm install nginx ingress-nginx/ingress-nginx -f infra/helm/nginx.yaml
elif [ $1 == "ingress" ]; then
  kubectl apply -f infra/kubernetes/ingress.yaml
# elif [ $1 == "elasticsearch" ]; then
#   helm install elasticsearch elastic/elasticsearch -n logging -f infra/helm/elasticsearch.yaml
# elif [ $1 == "fluentbit" ]; then
#   helm install fluentbit fluent/fluent-bit -n logging -f infra/helm/fluentbit.yaml
# elif [ $1 == "kibana" ]; then
#   helm install kibana elastic/kibana -n logging -f infra/helm/kibana.yaml
# elif [ $1 == "monitoring" ]; then
#   helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring
else
  echo "invalid input"
  exit 1
fi
exit 0
