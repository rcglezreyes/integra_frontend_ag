pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
        DOCKER_REGISTRY = 'docker.io'  // Cambia a tu URL del registro Docker
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        ANGULAR_APP_NAME = 'angular-app'
        JENKINS_NETWORK = 'app-network'
        NODEJS_HOME = tool name: 'MyNodeInstallation', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation' // Reemplaza con el nombre de la instalación de NodeJS configurada en Jenkins
        PATH = "$NODEJS_HOME/bin:$PATH"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Angular App') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_REGISTRY}/${ANGULAR_APP_NAME}:${IMAGE_TAG} .'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${env.DOCKER_REGISTRY}", env.DOCKER_CREDENTIALS_ID) {
                        sh 'docker push ${DOCKER_REGISTRY}/${ANGULAR_APP_NAME}:${IMAGE_TAG}'
                    }
                }
            }
        }
        stage('Deploy Angular App') {
            steps {
                script {
                    sh """
                    if [ \$(docker ps -a -q --filter "name=${ANGULAR_APP_NAME}") ]; then
                      docker rm -f ${ANGULAR_APP_NAME}
                    fi
                    docker run -d --name ${ANGULAR_APP_NAME} --network ${JENKINS_NETWORK} -p 4200:80 ${DOCKER_REGISTRY}/${ANGULAR_APP_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Aplicación Angular desplegada exitosamente en ${DOCKER_REGISTRY}/${ANGULAR_APP_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "Fallo en el despliegue de la aplicación Angular."
        }
    }
}
