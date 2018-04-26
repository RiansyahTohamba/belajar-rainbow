var app = angular.module('MyApp', []);
 
app.controller('MyCtrl', function ($scope) {
  $scope.userData = {
    name: 'Xavier',
    age: 25
  }
});