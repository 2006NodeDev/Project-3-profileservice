apiVersion: apps/v1
kind: Deployment
metadata:
  name: profile-service-deployment
  namespace: user-profile-system
  labels:
    app: p3
    service: profile-service
    deployment: uat
spec:
  replicas: 2
  selector:
    matchLabels:
      app: p3
      service: profile-service
  template:
    metadata:
      labels:
        app: p3
        service: profile-service
    spec:    
      containers:
      - name: profile-service   
        image: gcr.io/alec-2006nodedev/profile-service:COMMIT_SHA
        imagePullPolicy: Always
        env:
        - name: PG_HOST
          value: "10.47.249.252"
        - name: PG_USER
          value: "postgres"
        - name: PG_DATABASE
          value: "postgres"
        - name: BASE_PATH
          value: "/profile-service"
        - name: USER_SERVICE_HOST
          value: "http://user-service-service:2006/profile-service"  
        - name: PG_PASSWORD
          valueFrom:
            secretKeyRef:
              name: secrets
              key: password 
        ports:
        - containerPort: 2007
        livenessProbe:
          httpGet:
            path: /health
            port: 2007
          initialDelaySeconds: 3
          periodSeconds: 3
        readinessProbe:
          httpGet:
            path: /health
            port: 2007
          initialDelaySeconds: 3
          periodSeconds: 3
