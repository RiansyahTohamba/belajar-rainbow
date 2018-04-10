angular.module('bootstrap').component('rbxMessenger', {
    bindings: {},
    templateUrl: 'resources/js/components/messenger/messengerCmp.template.html',
    controller : function rbxMessengerCmp (rainbowSDK, $rootScope, $scope) {

        $scope.isConnected = false;

        $scope.nbContacts = 0;

        $scope.contacts = [];

        var listeners = [];

        $scope.load = function() {
          var myRainbowLogin = "riansyah@41studio.com";        // Replace by your login
          var myRainbowPassword = "Tauhid1!";
            rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword).then(function(account) {
                $scope.isLoading = false;
                $scope.isConnected = true;

                $scope.contact = rainbowSDK.contacts.getAll();
                $scope.contact1 = rainbowSDK.contacts.getConnectedUser();

                window.telolet = $scope.contact;
                console.log('login berhasil');
            }).catch(function(err) {
                $scope.isLoading = false;
                $scope.isConnected = false;
            });
        }

        $scope.invite = function(contact){
          contact = JSON.parse(contact);
            window.asupteu = contact;
          rainbowSDK.contacts.addToContactsList(contact).then(function(contact){
            swal("Invitation Success!");
            console.log("[DEMO] :: Successfully invited!");
          }).catch(function(err){
            swal("Contact is already invited!");
            console.log("[DEMO] :: Contact is already invited!");
          });
        }

        $scope.deleteContact = function(contact){
          rainbowSDK.contacts.removeFromContactsList(contact).then(function(contact) {
            swal("Delete Successfully!");
            console.log("[DEMO] :: Successfully!");

            $scope.load();//reload data
          }).catch(function(err) {
            swal("Delete Error!");
            console.log("[DEMO] :: Error!");
          });
        }

        $scope.createList = function(create){
            var check = 1;
            $scope.contact = rainbowSDK.contacts.groups(check);

            window.cek = $scope.contact;
        }


        this.$onInit = function () {

            // Subscribe to XMPP connection change
            listeners.push($rootScope.$on(rainbowSDK.connection.RAINBOW_ONSTARTED, onStarted));

            // Subscribe to XMPP connection change
            listeners.push($rootScope.$on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, onConnectionStateChangeEvent));

            // Subscribe to XMPP connection change
            listeners.push($rootScope.$on(rainbowSDK.presence.RAINBOW_ONCONTACTPRESENCECHANGED, onContactPresenceChangeEvent));

            // Subscribe to Contact information change connection changes
            listeners.push($rootScope.$on(rainbowSDK.contacts.RAINBOW_ONCONTACTINFORMATIONCHANGED, onContactInformationChangeEvent));

            // Subscribe to XMPP connection change
            listeners.push($rootScope.$on(rainbowSDK.contacts.RAINBOW_ONCONTACTINFORMATIONCHANGED, onContactsInformationChanged));
        };

        this.$onDestroy = function () {
            var listener = listeners.pop();
            while(listener) {
                listener();
                listener = listeners.pop();
            };
        };

        var onContactInformationChangeEvent = function onContactInformationChangeEvent(event, contact) {
            console.log("DEMO :: Contact information changed to ", contact);
        };

        var onContactPresenceChangeEvent = function onContactPresenceChangeEvent(event, status) {
            console.log("DEMO :: presence changed to ", status);
        };

        var countNumberOfContacts = function countNumberOfContacts() {
            $scope.nbContacts = Object.keys($scope.contacts).length;
        };

        var onStarted = function onReady() {
            $scope.contacts = rainbowSDK.contacts.getAll();
            $scope.invitations = rainbowSDK.contacts.getInvitationsReceived();
            console.log("All Invitations : ", rainbowSDK.contacts.getInvitationsReceived(), " length: ", rainbowSDK.contacts.getInvitationsReceived().length);
        };

        var onConnectionStateChangeEvent = function onConnectionStateChangeEvent(event, status) {

            if (status === rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED) {
                $scope.isConnected = true;
            }
            else {
                $scope.isConnected = false;
                $scope.nbContacts = 0;
                $scope.contacts = {};
            }
        };

        var onContactsInformationChanged = function onContactsInformationChanged(event, contact) {

            if (!(contact.id in $scope.contacts)) {
                $scope.contacts[contact.id] = contact;
                countNumberOfContacts();
            }
            else {
                // Track changes
            }
        };

        $scope.onCreateList = function() {
          rainbowSDK.contacts.groups.createGroup("aFavoriteGroup", "This is a favorite group");
        };

    }

});
