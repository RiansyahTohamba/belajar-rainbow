var app = angular.module('plunker', []);

app.controller('MainCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
    'use strict';
    // $scope.name = 'World';
    $scope.name = 'World';
    

    $rootScope.$on('bar', function (event, metadata) {
        console.log('hello metacontroller metadata on constructor' );
    });
}]);

(function () {
    'use strict';

    app.controller('constructorController', ['$scope', '$timeout', '$rootScope',
        function ($scope, $timeout, $rootScope) {
            $rootScope.$broadcast('bar', function(){
                console.log('helooo');
            });

        }]);
})();
