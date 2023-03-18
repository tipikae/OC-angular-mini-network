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
      steps { sh 'cp -a /var/lib/jenkins/workspace/test2-pipeline/dist/awesome-components/. /var/www/html/awesome-components/' }
    }
  }
}