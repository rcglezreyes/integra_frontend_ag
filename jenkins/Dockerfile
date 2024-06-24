FROM jenkins/jenkins:lts

USER root

# Instalar Docker CLI en ARM64
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    echo "deb [arch=arm64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli && \
    rm -rf /var/lib/apt/lists/*

# Crear el grupo docker y agregar el usuario jenkins a ese grupo
RUN groupadd docker && usermod -aG docker jenkins

USER jenkins
