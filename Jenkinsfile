pipeline {
    agent any

    environment {
        DOCKER_REPO = 'rcglezreyes/angular-app'  // Actualiza esto con tu nombre de usuario y nombre del repositorio
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        ANGULAR_APP_NAME = 'angular-app'
    }

    // Trigger action when Webhook activates

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_REPO}:${IMAGE_TAG} .'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_HUB_TOKEN')]) {
                        sh 'echo $DOCKER_HUB_TOKEN | docker login -u rcglezreyes --password-stdin https://index.docker.io/v1/'
                        sh 'docker push ${DOCKER_REPO}:${IMAGE_TAG}'
                    }
                }
            }
        }
        stage('Deploy Angular App') {
            steps {
                script {
                    // Actualizar el archivo docker-compose.override.yml para usar la nueva imagen
                    sh """
                    echo 'version: "3"' > docker-compose.override.yml
                    echo 'services:' >> docker-compose.override.yml
                    echo '  angular-app:' >> docker-compose.override.yml
                    echo '    image: ${DOCKER_REPO}:${IMAGE_TAG}' >> docker-compose.override.yml
                    """

                    // Usar Docker Compose para actualizar el contenedor
                    sh 'docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d'
                }
            }
        }
    }

    post {
        success {
            echo "Aplicación Angular desplegada exitosamente en ${DOCKER_REPO}:${IMAGE_TAG}"
        }
        failure {
            echo "Fallo en el despliegue de la aplicación Angular."
        }
    }
}
