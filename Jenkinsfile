pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Paso para obtener el código fuente del repositorio
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Instalar dependencias y compilar la aplicación Angular
                sh 'npm install'
                sh 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Construir la imagen Docker usando el Dockerfile en el proyecto
                script {
                    docker.build("mi-app-angular:${env.BUILD_ID}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                // Publicar la imagen Docker en un registro Docker (como Docker Hub)
                script {
                    docker.withRegistry('https://registry.example.com', 'docker-hub-credentials') {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Desplegar la imagen Docker en un entorno Docker
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        sh 'docker-compose -f docker-compose.yml up -d'
                    }
                }
            }
        }
    }

    post {
        success {
            echo '¡Despliegue exitoso!'
        }
        failure {
            echo '¡Fallo en el despliegue!'
        }
    }
}
