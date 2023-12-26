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
            sh './jenkins/scripts/kill.sh'
            withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                env.GITHUB_REPOSITORY = 'andrewfeb/a428-cicd-labs'
                sh "git remote set-url origin https://git:$GITHUB_TOKEN@github.com/${env.GITHUB_REPOSITORY}.git"
                sh 'git push origin HEAD:react-app'
            }
            
        }
    }
}