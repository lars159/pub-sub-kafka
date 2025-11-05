# Install dependencies
npm install

# Development mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start


# Build the Docker image
docker build -t kafka-server .

# Run the container
docker run -p 8000:8000 kafka-server

# Build and push the image (replace with your registry)
docker build -t lars1595/kafka-server:latest .
docker push lars1595/kafka-server:latest

# Update the deployment
kubectl apply -f deployment-server.yaml