angular.module('msftelemed.services').factory('conversations', function() {
  return {
     getAllOneToOneConversations: function(conversations) {
      var oneToOneConversations = [];
      conversations.forEach(function(conversation) {
        //TODO type 0 itu apa?
        if (conversation.type === 0) {
          oneToOneConversations.push(conversation);
        }
      });
      return oneToOneConversations;
    }
  };
});
