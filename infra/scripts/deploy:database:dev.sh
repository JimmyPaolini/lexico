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
