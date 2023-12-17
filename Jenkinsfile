node {
    stage('Build') { 
		try {
        	sh 'npm install'
		} catch(ex) {
			echo 'Something failed, I should sound the klaxons!'
		}
    }
}