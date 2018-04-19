angular.module('bootstrap').component('rbxConversations', {
    bindings: {
    },
    templateUrl: 'resources/angular/js/components/conversations/conversationsCmp.template.html' ,
    controller : function rbcConnectionsCtrl (rainbowSDK, $rootScope, $scope, $timeout,rainbowFactory,conversations) {
        $scope.conversations = [];

        // testing purpose
        // $scope.factory = rainbowFactory.getAllConversations();
        $scope.conversations = conversations.getAllOneToOneConversations(rainbowFactory.getAllConversations());

        var setOneToOneConversations = function () {
            $scope.conversations = conversations.getAllOneToOneConversations(rainbowSDK.conversations.getAllConversations());
        };

        var onConversationChanged = function(__event, conversationID) {
            $rootScope.$broadcast(conversationID, null);
        };

        $rootScope.$on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONSCHANGED, setOneToOneConversations);

        $rootScope.$on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONREMOVED, setOneToOneConversations);

        $rootScope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, setOneToOneConversations);

        $rootScope.$on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONCHANGED, onConversationChanged);

    }
});
