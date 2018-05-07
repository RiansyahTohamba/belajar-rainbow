var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider){
      
  $urlRouterProvider.when("", "/beatles/list");
  $urlRouterProvider.when("/", "/beatles/list");
  
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/beatles/list");
  
  $stateProvider
    .state('beatles', {
        abstract: true,
        url: '/beatles',
        templateUrl: 'head.html'
    })
    .state('beatles.list', {
        url: '/list',
        // loaded into ui-view of parent's template
        templateUrl: 'list.html',
        controller: 'listController'
    })
    .state('beatles.detail', {
        url: '/:id',
        // loaded into ui-view of parent's template
        templateUrl: 'detail.html',
        controller: 'listController'
    })
})

routerApp.controller('listController', ['$scope', '$http', '$state', '$location', function($scope, $http, $state, $location) {
    $http.get('data.json').success(function(data){
      $scope.thisAlbum = $state.params.id;
      $scope.albums = data;
    });
}]);