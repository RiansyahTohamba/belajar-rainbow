angular.module('bootstrap').component('rbxUser', {
    bindings: {
        name: '@'
    },
    templateUrl: '/resources/js/components/user/userCmp.template.html',
    controller : function rbcConnectionCtrl (rainbowSDK, $rootScope, $scope) {

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
            console.log('login on usercmp')
            // Get the connected user information
            $scope.user = rainbowSDK.contacts.getConnectedUser();
            document.getElementById("userAvatar").src = $scope.user.avatar.src;
            document.getElementById("name_sidebar").innerHTML = $scope.user._displayName;
            window.tampilUser = $scope.user;
            // Subscribe to XMPP connection change
            $rootScope.$on(rainbowSDK.contacts.RAINBOW_ONINFORMATIONCHANGED, onInformationChanged);
        };

        // Subscribe to XMPP connection change
        $rootScope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);

        // Subscribe to XMPP connection change
        $rootScope.$on(rainbowSDK.connection.RAINBOW_ONSTARTED, onStarted);
    }
    
});
