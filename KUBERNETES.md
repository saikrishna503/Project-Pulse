# Run Project Pulse on Kubernetes

These manifests run the existing Dockerized app: two client replicas, two API replicas, and a single MongoDB StatefulSet backed by a persistent volume claim. The client is exposed on NodePort `30080`; its Nginx config proxies `/api` to the internal API Service.

## Local cluster with Minikube

Start a cluster with enough resources for the app:

```powershell
minikube start --cpus=4 --memory=4096
```

Build the images inside Minikube so Kubernetes can use them without a registry:

```powershell
minikube image build -t project-pulse-server:local ./server
minikube image build -t project-pulse-client:local ./client
```

Create `server/.env` from `server/.env.example`, set strong random values for `JWT` and `USER_VERIFICATION_TOKEN_SECRET`, and set `DB_LOCAL_URI=mongodb://mongo:27017/projectpulse`. Then create the Kubernetes Secret and deploy:

```powershell
kubectl create secret generic project-pulse-secrets --from-env-file=server/.env
kubectl apply -f k8s/project-pulse.yaml
kubectl get pods,services,pvc
```

Open the app at `http://localhost:30080` (or run `minikube service client --url` if your Minikube driver does not expose NodePorts on localhost).

## Configuration and cleanup

The `project-pulse-config` ConfigMap sets `URL` and `CORS_ORIGIN` for local access. Change both values to the public website origin before deploying elsewhere, then apply the manifest again. Keep secrets out of the manifest and source control; create `project-pulse-secrets` from a protected environment file or your cluster's secret manager. Kubernetes Secrets are base64 encoded by default, so enable encryption at rest and restrict RBAC in shared or production clusters.

The MongoDB PVC uses the cluster's default StorageClass and requests 5 GiB. Back up the database separately. This single MongoDB replica is suitable for local development and demos; use managed MongoDB or a properly operated replicated database for production.

To remove the app resources, run `kubectl delete -f k8s/project-pulse.yaml` and `kubectl delete secret project-pulse-secrets`. The PVC may be retained according to the cluster's StorageClass policy; delete it explicitly only if you also intend to remove its database data.
