pipeline {
	agent any
			
	environment {
		DOCKER_HUB_CREDENTIALS = 'docker_hub_token'
                DOCKER_IMAGE_NAME = 'rajshreeu/news-app-jenkins-docker-frontend'
                DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
        }

	stages {
		stage('Build Node') {
			steps {
				checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/RajshreeUmarekar/news-app-react-v2']])
				bat 'npm install -f'
			}
		}
		stage('Build Docker Image') {
			steps {
				script {
					bat 'docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} .'
				}
			}
		}
		stage('Push Image to Hub'){
			steps {
				script {
					withCredentials([string(credentialsId: 'DOCKER_HUB_CREDENTIALS', variable: 'DOCKER_HUB_TOKEN')]) {
						bat 'docker login -u rajshreeu -p ${DOCKER_HUB_TOKEN}'
					}
					bat 'docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}'
				}
			}
		}
	}
}
