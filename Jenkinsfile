pipeline {
  agent any
  stages {
    stage('Test') {
      steps { sh 'ng test' }
    }
 
    stage('Build') {
      steps { sh 'ng build' }
    }
  }
}