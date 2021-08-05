export POSTGRES_PASSWORD=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_PASSWORD}" | base64 --decode)
export POSTGRES_USER=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_USER}" | base64 --decode)
export POSTGRES_DB=$(kubectl get secret env -o "jsonpath={.data.POSTGRES_DB}" | base64 --decode)

helm install database bitnami/postgresql \
  -f ./infra/helm/database.yaml \
  --set postgresqlPassword=$POSTGRES_PASSWORD \
  --set postgresqlUsername=$POSTGRES_USER \
  --set postgresqlDatabase=$POSTGRES_DB \
