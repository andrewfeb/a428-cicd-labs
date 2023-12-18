node {
	docker.image('node:lts-buster-slim').inside {
        stage('Build') {
            sh 'npm install'
        }
		stage('Test') {
            sh './jenkins/scripts/test.sh'
        }
    }	
}