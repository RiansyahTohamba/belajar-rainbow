angular.module('bootstrap').component('rbxUser', {
    bindings: {
        name: '@'
    },
    templateUrl: '/resources/js/components/user/userCmp.template.html',
    controller : function (rainbowSDK, $rootScope, $scope) {
        console.log('usercmp terpanggil');

        this.name = $scope.name;
        // document.getElementById("userAvatar").src = $scope.user.avatar.src;
        // let user = rainbowSDK.contacts.getConnectedUser();
        // document.getElementById("name_sidebar").innerHTML = user._displayName;
        // document.getElementById("name_sidebar").innerHTML = this.name;

        //TODO: gimana caranya manggil rainbowSDK ? karena userCmp yang terpanggil terlebih dahulu
        // sementara rainbowSDK belum siap?
        // bagaiamana mengakses $rootScope yang sudah dibuat di bootstrap??


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
        $rootScope.$broadcast(rainbowSDK.RAINBOW_ONREADY);
        // Subscribe to XMPP connection change

    }

});
