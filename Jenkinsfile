properties([
    disableConcurrentBuilds(abortPrevious: true), // Kill older builds
    buildDiscarder(logRotator(numToKeepStr: '1')), // Keep only last build
    pipelineTriggers([
        pollSCM('') // Adjust polling as needed
    ])
])

pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
              git branch: 'main',
                  url: 'https://github.com/Techa-Company/techa-user.git',
                  credentialsId: 'github-cred'
            }
        }

        stage('Install') {
            steps {
                script {
                    try {
                        sh 'sudo pnpm install --network-concurrency 1'
                    } catch (err) {
                        error("Install failed: ${err}")
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    try {
                        sh 'sudo pnpm run build'
                    } catch (err) {
                        error("Build failed: ${err}")
                    }
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    try {
                        sh 'sudo pnpm run start'
                        echo 'Run completed successfully ✅'
                    } catch (err) {
                        error("Run failed ❌: ${err}")
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build finished SUCCESSFULLY 🎉'
        }
        failure {
            echo 'Build FAILED ❌'
        }
    }
}
