pipeline {
			agent any

			tools {
				dockerTool 'jenkins-docker'
			}

			stages {
				stage('Build Node') {
					steps {
						checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/RajshreeUmarekar/news-app-react-v2']])
						bat 'npm install'
					}
				}
				stage('Build Docker Image') {
					steps {
						script {
							bat 'docker build -t rajshreeu/news-app-jenkins-docker-frontend .'
						}
					}
				}
				stage('Push Image to Hub'){
					steps {
						script {
							withCredentials([string(credentialsId: 'dockerHubPwd', variable: 'dockerHubPwd')]) {
								bat 'docker login -u rajshreeu -p ${dockerHubPwd}'
							}
							bat 'docker push rajshreeu/news-app-jenkins-docker-frontend'
						}
					}
				}
			}
		}
