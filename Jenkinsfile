node {
    docker.image('node:20-buster').inside('-p 3000:3000') {
        stage('Build') {
            sh 'npm --version'
            sh 'git --version'
            sh 'npm install'
        }

        stage('Test') {
            sh './jenkins/scripts/test.sh'
        }

        stage('Manual Approval') {
            input message: 'Lanjutkanke tahap Deploy? (Klik "Proceed" untuk lanjut ke tahap Deploy)'
        }

        stage('Deploy') {
            sh './jenkins/scripts/deliver.sh'
            sh 'sleep 60'
            sh './jenkins/scripts/kill.sh'
        }
    }
}