angular.module('bootstrap').component('rbxConnection', {
    bindings: {
        name: '@'
    },
    templateUrl: '',
    controller : function rbcConnectionCtrl (rainbowSDK, $rootScope, $scope) {

        "use strict";

        $scope.isConnected = false;

        $scope.isLoading = false;

        $scope.state = rainbowSDK.connection.getState();

        $scope.hosts = [
            {
                "id": 0,
                "value": "sandbox",
                "name": "Rainbow Sandbox"
            },
            {
                "id": 1,
                "value": "rainbow",
                "name": "Rainbow Official"
            }
        ];

        $scope.selectedItem = $scope.hosts[0];


        var handlers = [];

        $scope.signin = function () {

            $scope.isLoading = true;

            saveToStorage();

            switch ($scope.selectedItem.value) {
                case "rainbow":
                    rainbowSDK.connection.signinOnRainbowOfficial($scope.user.name, $scope.user.password).then(function(account) {

                        $scope.isLoading = false;
                        $scope.isConnected = true;

                        swal("Login Successfull!");
                        console.log("[DEMO] :: Successfully signed!");
                        var user = {};
                        user.email = $scope.user.name;
                        user.password = $scope.user.password;
                        console.log( user );
                        localStorage.setItem( 'user', JSON.stringify(user) );
                        console.log( JSON.parse( localStorage.getItem( 'user' ) ) );
                        window.location.href="/home";

                    }).catch(function(err) {
                        swal("Invalid email or password!");
                        console.log("[DEMO] :: Error when sign-in", err);
                        $scope.isLoading = false;
                        $scope.isConnected = false;
                    });
                break;
                default:
                    rainbowSDK.connection.signin($scope.user.name, $scope.user.password).then(function(account) {

                        $scope.isLoading = false;
                        $scope.isConnected = true;
                        swal("Login Successfull!");
                        console.log("[DEMO] :: Successfully signed!");
                        var user = {};
                        user.email = $scope.user.name;
                        user.password = $scope.user.password;
                        console.log( user );
                        localStorage.setItem( 'user', JSON.stringify(user) );
                        console.log( JSON.parse( localStorage.getItem( 'user' ) ) );
                        window.location.href="/home";
                    }).catch(function(err) {
                        swal("Invalid email or password!");
                        console.log("[DEMO] :: Error when sign-in", err);
                        $scope.isLoading = false;
                        $scope.isConnected = false;
                    });
                break;
            }


        };

        $scope.signout = function() {
            $scope.isLoading = true;
            rainbowSDK.connection.signout().then(function() {
                $scope.isLoading = false;
                $scope.isConnected = false;
            });
        };

        var saveToStorage = function () {
            sessionStorage.connection = angular.toJson($scope.user);
            sessionStorage.host = angular.toJson($scope.selectedItem);

            window.sStr = sessionStorage;
        };

        var readFromStorage = function () {
            if(sessionStorage.connection) {
                $scope.user = angular.fromJson(sessionStorage.connection);

            }
            else {
                $scope.user = {name: "", password: ""};
            }

            if(sessionStorage.host) {
                $scope.selectedItem = $scope.hosts[angular.fromJson(sessionStorage.host).id];
            }
            else {
                $scope.selectedItem = $scope.hosts[0];
            }
        };

        var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(__event, __status) {
            $scope.state = rainbowSDK.connection.getState();
        };

        this.$onInit = function () {
            // Subscribe to XMPP connection change
            handlers.push($rootScope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent));
        };

        this.$onDestroy = function () {
            var handler = handlers.pop();
            while(handler) {
                handler();
                handler = handlers.pop();
            };
        };

        var initialize = function() {
            readFromStorage();
        };

        initialize();

    }

});
