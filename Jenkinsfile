pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
 
    stage('Test') {
      steps { sh 'ng test' }
    }
 
    stage('Build') {
      steps { sh 'ng build' }
    }
  }
}