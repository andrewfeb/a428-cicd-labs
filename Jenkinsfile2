pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'ls -la'
                sh 'npm install'
                sh 'node -v'
                sh 'ls'
                sh 'cat package.json'
                sh 'npx netlify --version'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Manual Approval') {
            steps {
                input message: 'Lanjutkan ke tahap Deploy? (Klik "Proceed" untuk lanjut ke tahap Deploy)'
            }
        }
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                sh 'ls build'
                withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN')]) {
                    sh 'npx netlify deploy --prod --auth ${NETLIFY_AUTH_TOKEN}'
                }
                sh 'sleep 60s'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
