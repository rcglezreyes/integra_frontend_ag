pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Reemplaza con tus credenciales de Docker Hub en Jenkins
        DOCKER_IMAGE = 'rcglezreyes/angular-app' // Reemplaza con tu imagen Docker
        GIT_CREDENTIALS_ID = 'github-credentials' // Reemplaza con tus credenciales de GitHub en Jenkins
        NODEJS_HOME = tool name: 'MyNodeInstallation', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation' // Reemplaza con el nombre de la instalación de NodeJS configurada en Jenkins
        PATH = "$NODEJS_HOME/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: env.GIT_CREDENTIALS_ID, url: 'https://github.com/rcglezreyes/integra_frontend_ag.git', branch: 'main'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm install'
                sh 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.withRegistry('', env.DOCKER_CREDENTIALS_ID) {
                        def app = docker.build("${env.DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                        app.push()
                    }
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    def containerName = 'angular-app'
                    try {
                        sh "docker stop ${containerName}"
                        sh "docker rm ${containerName}"
                    } catch (Exception e) {
                        echo 'Container does not exist or could not be stopped/removed.'
                    }
                    sh "docker run -d --name ${containerName} -p 80:80 ${env.DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
