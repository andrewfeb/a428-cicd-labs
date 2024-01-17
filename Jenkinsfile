node {
    docker.image('node:lts-buster-slim').inside('-p 3000:3000') {
        stage('Build') {
            sh 'npm install'
        }

        stage('Test') {
            sh './jenkins/scripts/test.sh'
        }

        stage('Manual Approval') {
            input message: 'Lanjutkan ke tahap Deploy? (Klik "Process" untuk lanjut ke tahap Deploy)'
        }

        stage('Deploy') {
            sh './jenkins/scripts/deliver.sh'
            sh 'sleep 60s'
            sh './jenkins/scripts/kill.sh'

            input message: 'Lanjutkan deploy ke Netlify? (klik "Process" untuk lanjut)'

            withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN')]) {
                sh 'npx netlify deploy --prod --auth ${NETLIFY_AUTH_TOKEN}'
            }
        }
    }    
}