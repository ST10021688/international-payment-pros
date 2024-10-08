pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'payment-portal-app'
        AWS_EC2_IP = 'ec2-13-60-156-215.eu-north-1.compute.amazonaws.com'
        SSH_KEY = 'C:/Users/lab_services_student/Downloads/jenkins (2).war'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Docker Push') {
            steps {
                sh 'docker tag $DOCKER_IMAGE:latest $AWS_EC2_IP:5000/$DOCKER_IMAGE:latest'
                sh 'docker push $AWS_EC2_IP:5000/$DOCKER_IMAGE:latest'
            }
        }
        stage('Deploy') {
            steps {
                sh 'ssh -i $SSH_KEY ubuntu@$AWS_EC2_IP "docker pull $DOCKER_IMAGE && docker-compose up -d"'
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
