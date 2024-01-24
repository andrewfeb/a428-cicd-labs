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
        }
    }

    stage('Deploy to cloud') {
        input message: 'Lanjutkan deploy ke Azure? (klik "Process" untuk lanjut)'

        withEnv([
            'registryName=mysimplereactapp',
            'registryCredential=ACR-REACT1',
            'dockerImage= ',
            'registryUrl=mysimplereactapp.azurecr.io',
            'containerName=react-app'
        ]){
            script {
                dockerImage = docker.build registryName
                docker.withRegistry("http://${registryUrl}", registryCredential) {
                    dockerImage.push()
                }
            }
            
            withCredentials([
                usernamePassword(credentialsId: 'AZ-LOGIN', passwordVariable: 'az_pwd', usernameVariable: 'az_usr'),
                string(credentialsId: 'AZ-TENANT', variable: 'az_tenant')
            ]) {
                docker.image('mcr.microsoft.com/azure-cli:latest').inside('-it -v ${HOME}:/home/az -e HOME=/home/az') {
                    sh 'az login --service-principal --username ${az_usr} --password ${az_pwd} --tenant ${az_tenant} --output table'
                    sh 'az container create --resource-group CICDResources --name ${containerName} --image ${registryUrl}/${registryName}:latest --registry-login-server ${registryUrl} --registry-username ${az_usr} --registry-password ${az_pwd} --ip-address Public --protocol TCP --ports 8080 --dns-name-label ${containerName} --query "{FQDN:ipAddress.fqdn, IpAddress:ipAddress.ip, Port:ipAddress.ports[0].port}" --output table'
                }
            }
        }
    }
}