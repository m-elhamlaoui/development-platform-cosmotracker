pipeline {
    agent any

    tools { maven 'Maven 3' }

    environment {
        REGISTRY      = 'docker.io'
        REPOSITORY    = 'kei077'
        BUILD_VERSION = "${env.BUILD_NUMBER}"
        DOCKER_CREDS  = credentials('dockerhub-login')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Docker Login') {
            steps {
                sh '''
                    echo "$DOCKER_CREDS_PSW" | docker login $REGISTRY -u "$DOCKER_CREDS_USR" --password-stdin
                '''
            }
        }

        stage('Build and Push') {
            parallel {
                stage('Backend') {
                    stages {
                        stage('Run Tests') {
                            steps {
                                dir('backend') {
                                    sh 'mvn test'
                                }
                            }
                        }

                        stage('Build JAR') {
                            steps {
                                dir('backend') {
                                    sh 'mvn -B clean package'
                                }
                            }
                            post {
                                success {
                                    archiveArtifacts artifacts: "backend/target/*.jar", fingerprint: true
                                }
                            }
                        }
                        
                        stage('Build & Push Backend Image') {
                            environment {
                                IMAGE_NAME = 'cosmo-backend'
                            }
                            steps {
                                script {
                                    sh '''
                                        docker build \
                                            --cache-from $REPOSITORY/${IMAGE_NAME}:latest \
                                            --build-arg BUILDKIT_INLINE_CACHE=1 \
                                            -t $REPOSITORY/${IMAGE_NAME}:${BUILD_VERSION} \
                                            -t $REPOSITORY/${IMAGE_NAME}:latest \
                                            backend
                                        
                                        docker push $REPOSITORY/${IMAGE_NAME}:${BUILD_VERSION}
                                        docker push $REPOSITORY/${IMAGE_NAME}:latest
                                    '''
                                }
                            }
                        }
                    }
                }
                
                stage('Frontend') {
                    environment {
                        IMAGE_NAME = 'cosmo-frontend'
                    }
                    steps {
                        script {
                            sh '''
                                docker pull $REPOSITORY/${IMAGE_NAME}:latest || true
                                
                                docker build \
                                    --cache-from $REPOSITORY/${IMAGE_NAME}:latest \
                                    --build-arg BUILDKIT_INLINE_CACHE=1 \
                                    -t $REPOSITORY/${IMAGE_NAME}:${BUILD_VERSION} \
                                    -t $REPOSITORY/${IMAGE_NAME}:latest \
                                    frontend
                                
                                docker push $REPOSITORY/${IMAGE_NAME}:${BUILD_VERSION}
                                docker push $REPOSITORY/${IMAGE_NAME}:latest
                            '''
                        }
                    }
                }
            }
        }

    }

    post {
        always {
            sh 'docker system prune -f'
            sh 'docker logout $REGISTRY'
        }
        success {
            echo "Build successful! Images pushed to Docker Hub:"
            echo "- $REPOSITORY/cosmo-backend:${BUILD_VERSION}"
            echo "- $REPOSITORY/cosmo-frontend:${BUILD_VERSION}"
        }
        failure { 
            echo 'Pipeline failed — check stage logs.'
        }
    }
}
