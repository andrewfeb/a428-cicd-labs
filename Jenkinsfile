node {
    docker.image('node:20-buster-slim').inside('-p 3000:3000') {
        withEnv(['CI=true']) {
            stage('Build') {
                sh 'ls -la'
                sh 'npm install'
                sh 'node -v'
                sh 'ls'
                sh 'cat package.json'
                sh 'npx netlify --version'
            }

            stage('Test') {
                sh './jenkins/scripts/test.sh'
            }

            stage('Manual Approval') {
                input message: 'Lanjutkan ke tahap Deploy? (Klik "Proceed" untuk lanjut ke tahap Deploy)'
            }

            stage('Deploy') {
                sh './jenkins/scripts/deliver.sh'
                withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN')]) {
                    sh 'npx netlify deploy --prod --auth ${NETLIFY_AUTH_TOKEN}'
                }
                sh 'sleep 60s'
                sh './jenkins/scripts/kill.sh'
                
            }
        }
    }
}