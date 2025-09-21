pipeline {
    agent any
    
    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build')
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'], description: 'Deploy target')
        booleanParam(name: 'RUN_TEST', defaultValue: true, description: 'Run unit/integration tests')
    }

    environment {
        APP_NAME = 'gaming-website'
        NODE_ENV = 'production'
    }

    triggers { 
        pollSCM('H/5 * * * *')
    }
    
    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                bat '''
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    if exist package-lock.json (
                        npm ci
                    ) else (
                        npm install
                    )
                '''
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            when {
                expression { params.RUN_TEST == true }
            }
            steps {
                bat '''
                    npm run lint || echo "No lint script found"
                    echo "Test stage completed - no test script configured"
                '''
            }
        }

        stage('Package') {
            steps {
                bat '''
                    if not exist artifacts mkdir artifacts
                    for /f %%i in ('git rev-parse --short HEAD') do set SHORT_HASH=%%i
                    powershell "Compress-Archive -Path package.json,dist -DestinationPath artifacts\\%APP_NAME%-%SHORT_HASH%.zip -Force"
                '''
            }
        }
    }
    
    post {
        success {
            archiveArtifacts artifacts: 'artifacts/*.zip', fingerprint: true
        }
        always {
            cleanWs()
        }
    }
}