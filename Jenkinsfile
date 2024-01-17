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

            /*input message: 'Lanjutkan deploy ke Netlify? (klik "Process" untuk lanjut)'

            withCredentials([string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN')]) {
                sh 'npx netlify deploy --prod --auth ${NETLIFY_AUTH_TOKEN}'
            }*/
        }
    }

    stage('Deploy to cloud') {
        input message: 'Lanjutkan deploy ke Azure? (klik "Process" untuk lanjut)'

        withEnv([
            'registryName=simplereactapp',
            'registryCredential=ACR-REACT',
            'dockerImage= ',
            'registryUrl=simplereactapp.azurecr.io',
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
                string(credentialsId: 'AZ-TENANT', variable: 'az-tenant')
            ]) {
                docker.image('mcr.microsoft.com/azure-cli:latest').inside('-it -v ${HOME}:/home/az -e HOME=/home/az') {
                    sh 'az login --service-principal --username ${az_usr} --password ${az_pwd} --tenant ${az-tenant} --output table'
                    sh 'az container create --resource-group CICDResources --name ${containerName} --image ${registryUrl}/${registryName}:latest --registry-login-server ${registryUrl} --registry-username ${vuejs_usr} --registry-password ${vuejs_pwd} --ip-address Public --protocol TCP --ports 8080 --query "{FQDN:ipAddress.fqdn, IpAddress:ipAddress.ip, Port:ipAddress.ports[0].port}" --output table'
                }
            }
        }
    }
}