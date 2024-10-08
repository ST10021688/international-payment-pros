pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'payment-portal-app'
        AWS_EC2_IP = 'ec2-13-60-156-215.eu-north-1.compute.amazonaws.com'
        SSH_KEY = 'C:/Users/lab_services_student/Downloads/jenkins (2).war'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the Git repository
                git 'https://github.com/ST10021688/international-payment-pros.git'
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm run build' // Adjust if needed; ensure build script is available
                }
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build' // Ensure the build script exists for frontend
                }
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
