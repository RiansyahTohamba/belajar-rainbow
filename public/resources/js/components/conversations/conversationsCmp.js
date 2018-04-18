angular.module('bootstrap').component('rbxConversations', {
    bindings: {
    },

    templateUrl: 'resources/js/components/conversations/conversationsCmp.template.html' ,
    controller : function rbcConnectionsCtrl (rainbowSDK, $rootScope, $scope, $timeout) {
        $scope.conversations = [];

        // $scope.conversations = [];

        var getAllOneToOneConversations = function getAllOneToOneConversations() {

            var conversations = rainbowSDK.conversations.getAllConversations();

            var oneToOneConversations = [];

            conversations.forEach(function(conversation) {
                if (conversation.type === 0) {
                    oneToOneConversations.push(conversation);
                }
            });

            return oneToOneConversations;
        };


        var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event, status) {
            console.log('at onConnectionStateChangeEvent');
            if (status === rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED) {
                $scope.conversations = getAllOneToOneConversations();
            }else {
                $scope.conversations = [];
            }
        };

        var onConversationsListChanged = function onConversationsListChanged(event, conversation) {
            $scope.conversations = getAllOneToOneConversations();
        };

        var onConversationChanged = function(__event, conversationID) {
            $rootScope.$broadcast(conversationID, null);
        };

        $rootScope.$on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONSCHANGED, onConversationsListChanged);

        $rootScope.$on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONREMOVED, onConversationsListChanged);

        $rootScope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent);

        $rootScope.$on(rainbowSDK.conversations.RAINBOW_ONCONVERSATIONCHANGED, onConversationChanged);

        var 
    }
});
