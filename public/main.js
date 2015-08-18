//Creación del Módulo
var meanTodo = angular.module('meanTodo', []);

//Creación del Controlador 
function mainController($scope, $http) {
  $scope.formData = {};

  // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/todos/')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  // Cuando se añade un nuevo TODO, manda el texto a la API
  $scope.createTodo = function() {
    $http.post('/api/todos/', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
  //Borra un TODO luego de chequearlo como finalizado
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}