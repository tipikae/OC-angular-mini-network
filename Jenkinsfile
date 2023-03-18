pipeline {
  agent any
  tools {nodejs 'NodeJS'}
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
 
    stage('Test') {
      steps { sh 'npm run test-headless' }
    }
 
    stage('Build') {
      steps { sh 'npm run build' }
    }
 
    stage('Copy') {
      steps { sh 'cp -r /var/lib/jenkins/workspace/awesome-components/dist/awesome-components /var/www/html/' }
    }
  }
}