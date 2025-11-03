# Deploy to Azure AKS

```bash
# Set environment variables
MY_RESOURCE_GROUP_NAME=pub-sub-kafka-test
REGION=westeurope
MY_AKS_CLUSTER_NAME=pub-sub-kafka-aks

# Create resource group
az group create --name $MY_RESOURCE_GROUP_NAME --location $REGION

# Create AKS cluster
az aks create   --resource-group $MY_RESOURCE_GROUP_NAME   --name $MY_AKS_CLUSTER_NAME   --node-count 1   --generate-ssh-keys

# Get AKS credentials
az aks get-credentials   --resource-group $MY_RESOURCE_GROUP_NAME   --name $MY_AKS_CLUSTER_NAME

# Verify connection
kubectl get nodes

# Deploy application
kubectl apply -f kubernetes.yaml
```

---

# Set Up Argo CD

```bash
# Create Argo CD namespace
kubectl create namespace argocd

# Install Argo CD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Get Argo CD server external IP
kubectl get svc argocd-server -n argocd -o=jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

---

# Deploy to AWS EKS

```bash
# TODO: Add AWS EKS deployment commands
```

---

# Deploy to OpenStack

```bash
# TODO: Add OpenStack deployment commands
```
