pipeline {
    agent any

    tools {
        maven 'Maven 3'
    }

    environment {
        PROJECT_DIR = 'backend'
    }

    stages {

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Run Tests'){
            steps {
                dir("$PROJECT_DIR"){
                    sh 'mvn test'
                }
            }
            post {
                success {
                        echo '----------------------------------------------- TESTS RAN SUCCESSFULLY'
                }
            }
        }

        stage('Build JAR') {
            steps {
                dir("$PROJECT_DIR") {
                    sh 'mvn -B clean package -DskipTests'
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: "$PROJECT_DIR/target/*.jar", fingerprint: true
                }
            }
        }

        stage('Docker build (local)') {
            environment {
                IMAGE_NAME = 'cosmo-backend'
                IMAGE_TAG  = "${env.BUILD_NUMBER}"
            }
            steps {
                sh '''
                echo ">> Docker client & server:"
                docker version

                echo ">> Building backend image:"
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ${PROJECT_DIR}
                '''
            }
        }

        stage('Frontend Docker build (local)') {
            environment {
                FE_IMAGE_NAME = 'cosmo-frontend'
                FE_IMAGE_TAG  = "${env.BUILD_NUMBER}"
            }
            steps {
                sh '''
                echo ">> Building frontend image:"
                docker build -t ${FE_IMAGE_NAME}:${FE_IMAGE_TAG} frontend
                '''
            }
        }

        stage('Push image to registry') {
            environment {
                REGISTRY      = 'docker.io'
                REPOSITORY    = 'kei077'
                IMAGE_NAME    = 'cosmo-backend'
                IMAGE_TAG     = "${env.BUILD_NUMBER}"
                DOCKER_CREDS  = credentials('dockerhub-login')
            }
            steps {
                sh '''
                echo ">> Logging in to registry"
                echo "$DOCKER_CREDS_PSW" | docker login $REGISTRY -u "$DOCKER_CREDS_USR" --password-stdin

                echo ">> Tagging and pushing"
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} $REPOSITORY/${IMAGE_NAME}:${IMAGE_TAG}
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} $REPOSITORY/${IMAGE_NAME}:latest

                docker push $REPOSITORY/${IMAGE_NAME}:${IMAGE_TAG}
                docker push $REPOSITORY/${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Frontend - push image') {
            environment {
                REGISTRY      = 'docker.io'
                REPOSITORY    = 'kei077'
                FE_IMAGE_NAME = 'cosmo-frontend'
                FE_IMAGE_TAG  = "${env.BUILD_NUMBER}"
                DOCKER_CREDS  = credentials('dockerhub-login')
            }
            steps {
                sh '''
                    echo ">> Logging in to registry"
                    echo "$DOCKER_CREDS_PSW" | docker login $REGISTRY -u "$DOCKER_CREDS_USR" --password-stdin

                    echo ">> Tagging and pushing frontend image"
                    docker tag ${FE_IMAGE_NAME}:${FE_IMAGE_TAG} $REPOSITORY/${FE_IMAGE_NAME}:${FE_IMAGE_TAG}
                    docker tag ${FE_IMAGE_NAME}:${FE_IMAGE_TAG} $REPOSITORY/${FE_IMAGE_NAME}:latest

                    docker push $REPOSITORY/${FE_IMAGE_NAME}:${FE_IMAGE_TAG}
                    docker push $REPOSITORY/${FE_IMAGE_NAME}:latest
                    '''
            }
        }

        stage('Deploy & Smoke-test') {
            steps {
                withCredentials([usernamePassword(
                        credentialsId: 'db-creds',
                        usernameVariable: 'DB_USER',
                        passwordVariable: 'DB_PASS')]) {

                    sh '''#!/usr/bin/env bash
                        set -euo pipefail

                        echo "▶ Tearing down previous stack"
                        docker compose -f docker-compose.prod.yml down --remove-orphans

                        echo "▶ Pulling images"
                        docker compose -f docker-compose.prod.yml pull

                        echo "▶ Starting stack"
                        DB_USER=$DB_USER DB_PASS=$DB_PASS docker compose -f docker-compose.prod.yml up -d

                        echo "▶ Waiting for backend health check"
                        for i in {1..20}; do
                        if curl -fs http://10.1.3.43:8081/actuator/health | grep -q '"UP"'; then
                            echo "Backend is UP (waited $((i*3))s)"
                            exit 0
                        fi
                        sleep 3
                        done

                        echo "Backend failed to become healthy in time"
                        false
                        '''
                    }
                }
                post {
                    failure {
                        sh '''#!/usr/bin/env bash
                        echo "▶ Debugging container connectivity"

                        echo "→ docker ps -a"
                        docker ps -a || true

                        BACK_ID=$(docker compose -f docker-compose.prod.yml ps -q backend || true)

                        if [[ -n "$BACK_ID" ]]; then
                        echo; echo "→ Network settings for backend ($BACK_ID)"
                        if command -v jq >/dev/null 2>&1; then
                            docker inspect "$BACK_ID" --format '{{json .NetworkSettings}}' | jq .
                        else
                            docker inspect "$BACK_ID"
                        fi

                        echo; echo "→ Curl from Jenkins host"
                        curl -vv http://10.1.3.43:8081/actuator/health || true

                        echo; echo "→ Curl from inside backend container"
                        docker exec "$BACK_ID" curl -vv http://10.1.3.43:8081/actuator/health || true

                        echo; echo "→ Logs (last 200 lines)"
                        docker logs --tail 200 "$BACK_ID" || true
                        else
                        echo "Backend container not found."
                        fi
                        '''
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed check the stage logs above.'
        }
    }
}
