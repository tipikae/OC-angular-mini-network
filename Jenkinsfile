pipeline {
  stages {
    stage('Test') {
      parallel {
        stage('Unit tests') {
            steps { sh 'ng test' }
        }
      }
    }
 
    stage('Build') {
      steps { sh 'ng build' }
    }
  }
}