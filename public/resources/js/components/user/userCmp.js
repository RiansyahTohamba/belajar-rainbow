angular.module('bootstrap').component('rbxUser', {
    bindings: {
        avatar_src: '@',
        name: '@',
    },
    templateUrl: '/resources/js/components/user/userCmp.template.html',
    controller : function (rainbowSDK, $rootScope, $scope) {
        console.log('usercmp terpanggil');
        $scope.isConnected = false;
        $scope.user = null;
        
        var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event, status) {
            if (status === rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED) {
                $scope.isConnected = true;
            }else {
                $scope.isConnected = false;
                $scope.user = null;
            }
        };

        var onInformationChanged = function onInformationChanged(event, user) {

            if (!$scope.user) {
                $scope.user = user;
            }
            else {
                // Track changes
            }
        };

        var onStarted = function onReady() {
            console.log('siap userCmp');
            document.getElementById("userAvatar").src = $scope.user.avatar.src;
            $rootScope.$on(rainbowSDK.contacts.RAINBOW_ONINFORMATIONCHANGED, onInformationChanged);
        };

        // Subscribe to XMPP connection change
        $rootScope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);
        $rootScope.$broadcast(rainbowSDK.RAINBOW_ONREADY);
        // Subscribe to XMPP connection change

    }

});
