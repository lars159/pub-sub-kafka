# Deply to Azure AKS
MY_RESOURCE_GROUP_NAME=pub-sub-kafka-test
REGION=westeurope
az group create --name $MY_RESOURCE_GROUP_NAME --location $REGION
MY_AKS_CLUSTER_NAME=pub-sub-kafka-aks

az aks create \
  --resource-group $MY_RESOURCE_GROUP_NAME \
  --name $MY_AKS_CLUSTER_NAME \
  --node-count 1 \
  --generate-ssh-keys

  az aks get-credentials --resource-group $MY_RESOURCE_GROUP_NAME --name $MY_AKS_CLUSTER_NAME

  kubectl get nodes

  kubectl apply -f kubernetes.yaml


#setup argo cd deploy helm

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get svc argocd-server -n argocd -o=jsonpath='{.status.loadBalancer.ingress[0].ip}'

  # Deply to AWS AKS


    # Deply to Open stack 