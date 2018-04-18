angular.module('bootstrap').component('rbxConversation', {
    bindings: {
        item: '='
    },
    templateUrl: 'resources/js/components/conversation/conversationCmp.template.html',
    controller : function(rainbowSDK, $rootScope, $scope) {

        var ctrl = $scope;

        var handlers = [];

        $scope.contact = this.item.contact;

        $scope.bubble = this.item.bubble;

        $scope.conversation = this.item;

        $scope.message = "";

        $scope.onSend = function() {
            rainbowSDK.im.sendMessageToConversation($scope.conversation, $scope.message);
            $scope.message = "";
        };

        $scope.uploadFile = function(){
            console.log("file that needed : ", $scope.fileArray.length);

            var contactIdToSearch = $scope.contact.dbId;
            var filePath = "./path/to/my/file";

            if ($scope.fileArray.length >= 2) {
                // Retrieve a contact by its id
                rainbowSDK.contacts.searchById(contactIdToSearch)
                .then(function(contact) {
                    // Retrieve the associated conversation
                    return rainbowSDK.conversations.openConversationForContact(contact);
                }).then(function(conversation) {
                    // Share the file
                    for (i = 0; i < $scope.fileArray.length; i++) {
                        rainbowSDK.fileStorage.uploadFileToConversation(conversation, $scope.fileArray[i], $scope.uploadMessage);
                    }
                }).then(function(message) {
                    // Do something once the file has been shared
                    alert("File Uploaded!");
                }).catch(function(err) {
                    // Do somehting in case of error
                });
            } else {
                // Retrieve a contact by its id
                rainbowSDK.contacts.searchById(contactIdToSearch)
                .then(function(contact) {
                    // Retrieve the associated conversation
                    return rainbowSDK.conversations.openConversationForContact(contact);
                }).then(function(conversation) {
                    // Share the file
                    return rainbowSDK.fileStorage.uploadFileToConversation(conversation, $scope.fileArray[0], $scope.uploadMessage);
                }).then(function(message) {
                    // Do something once the file has been shared
                    alert("File Uploaded!");
                }).catch(function(err) {
                    // Do somehting in case of error
                });
            }
        };

        $scope.audioCall = function(){
            if(rainbowSDK.webRTC.hasAMicrophone()) {
                /* A microphone is available, you can make at least audio call */
                var res = rainbowSDK.webRTC.callInAudio($scope.contact);
                console.log(res);
                if(res.label === "OK") {
                    /* Your call has been correctly initiated. Waiting for the other peer to answer */
                    $("#mycalling").modal("show");
                    console.log("Now you are on the call with your friend");
                }
            }
            else {
                /* No microphone detected */
                alert("There is no microphone detected");
            }
        }

        $scope.videoCall = function(){
            if(rainbowSDK.webRTC.hasACamera()) {
                /* A webcam is available, you can make video call */
                var res = rainbowSDK.webRTC.callInVideo($scope.contact);
                console.log(res);
                if(res.label === "OK") {
                    /* Your call has been correctly initiated. Waiting for the other peer to answer */
                    $("#mycalling").modal("show");
                    console.log("Now you are on the call with your friend");
                }
            } else {
                /* No webcam detected */
                alert("There is no webcam detected");
            }
        }

        $scope.releaseCall = function(){
            console.log("the calling variable : ", $scope.callItem);
            rainbowSDK.webRTC.release($scope.callItem);
            $scope.streaming.stop();
            if (!$scope.callItem.isInitiator) {
              $("#calling").modal("hide");
            }
            $("#mycalling").modal("hide");
            console.log("the release status : ", rainbowSDK.webRTC.release($scope.callItem));
        }

        $scope.answerAudio = function(){
            if(rainbowSDK.webRTC.hasAMicrophone()) {
                    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(function(stream) {

                    /* Stream received which means that the user has authorized the application to access to the devices in audio and video. Local stream can be stopped at this time */
                    $scope.streaming = stream;
                    // stream.getTracks().forEach(function(track) {
                    //     track.stop();
                    // });

                    console.log("what is stream : ", stream.getTracks());

                    /*  Get the list of available devices */
                    navigator.mediaDevices.enumerateDevices().then(function(devices){

                        /* Do something for each device (e.g. add it to a selector list) */
                        devices.forEach(function(device) {
                            switch (device.kind) {
                                case "audioinput":
                                    // This is a device of type 'microphone'
                                    console.log("calling audioinput : ", device);
                                    var microphone = device.deviceId;
                                    rainbowSDK.webRTC.useMicrophone(device.deviceId);
                                    rainbowSDK.webRTC.useMicrophone(microphone);
                                    rainbowSDK.webRTC.useSpeaker(speaker);
                                    // /* A microphone is available, you can make at least audio call */
                                    rainbowSDK.webRTC.answerInAudio($scope.callItem);
                                    break;
                                case "audiooutput":
                                    // This is a device of type 'speaker'
                                    console.log("calling audiooutput : ", device);
                                    var speaker = device.deviceId;
                                    rainbowSDK.webRTC.useSpeaker(device.deviceId);
                                    break;
                                case "videoinput":
                                    // This is a device of type 'camera'
                                    console.log("calling videoinput : ", device);
                                    var camera = device.deviceId;
                                    rainbowSDK.webRTC.useCamera(device.deviceId);
                                    break;
                                default:
                                    console.log("calling another inputoutput : ", device);
                                    break;
                            }
                        });

                    }).catch(function(error) {
                        /* In case of error when enumerating the devices */
                        console.log("error recognizing media");
                    });

                    rainbowSDK.webRTC.useMicrophone(microphone);
                    rainbowSDK.webRTC.useSpeaker(speaker);
                    // /* A microphone is available, you can make at least audio call */
                    rainbowSDK.webRTC.answerInAudio($scope.callItem);
                }).catch(function(error) {
                    /* In case of error when authorizing the application to access the media devices */
                    console.log("error recognizing media");
                });

                rainbowSDK.webRTC.useMicrophone(microphone);
                rainbowSDK.webRTC.useSpeaker(speaker);
                // /* A microphone is available, you can make at least audio call */
                rainbowSDK.webRTC.answerInAudio($scope.callItem);
            }
            else {
                /* No microphone detected */
                alert("There is no microphone detected");
            }
        }

        $scope.answerVideo = function(){
            /* Ask the user to authorize the application to access to the media devices */
            navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function(stream) {


                /*  Get the list of available devices */
                navigator.mediaDevices.enumerateDevices().then(function(devices){

                    /* Do something for each device (e.g. add it to a selector list) */
                    devices.forEach(function(device) {
                        switch (device.kind) {
                            case "audioinput":
                                // This is a device of type 'microphone'
                                console.log("calling audioinput : ", device);
                                rainbowSDK.webRTC.useMicrophone(device.deviceId)
                                break;
                            case "audiooutput":
                                // This is a device of type 'speaker'
                                console.log("calling audiooutput : ", device);
                                rainbowSDK.webRTC.useSpeaker(device.deviceId)
                                break;
                            case "videoinput":
                                // This is a device of type 'camera'
                                console.log("calling videoinput : ", device);
                                rainbowSDK.webRTC.useCamera(device.deviceId);
                                break;
                            default:
                                console.log("calling another inputoutput : ", device);
                                break;
                        }
                    });

                }).catch(function(error) {
                    /* In case of error when enumerating the devices */
                    console.log("error recognizing media");
                });
            }).catch(function(error) {
                /* In case of error when authorizing the application to access the media devices */
                console.log("error recognizing media");
            });

            console.log("this is the call item : ", $scope.callItem);
            console.log("answer status : ", rainbowSDK.webRTC.answerInVideo($scope.callItem));
            var video = angular.element("#minivideo");
            video.src = window.URL.createObjectURL(stream);
            rainbowSDK.webRTC.answerInVideo($scope.callItem);
            // rainbowSDK.webRTC.escaladeToVideoCall($scope.callItem);
            rainbowSDK.webRTC.showLocalVideo();
            rainbowSDK.webRTC.showRemoteVideo($scope.callItem);
            console.log("and this is the remote video : ", rainbowSDK.webRTC.showRemoteVideo($scope.callItem));

        }

        var onWebRTCCallChanged = function onWebRTCCallChanged(event, call) {
        /* Listen to WebRTC call state change */
            // console.log("calling object : ", call);
            console.log("calling status : ", call.status);
            // console.log("calling event : ", event);
            $scope.callItem = call;
            $scope.callingUser = call.contact;

            /* Listen to WebRTC call state change */
            switch(call.status.value) {
                case "incommingCall":
                    /* Answer or reject the call */
                    if (!call.isInitiator) {
                        $("#calling").modal("show");
                    }
                    break;
                case "active":
                    /* display the local and remote video */
                    $("#calling").modal("hide");
                    $("#videoShowUp").modal("show");
                    rainbowSDK.webRTC.showLocalVideo();
                    rainbowSDK.webRTC.showRemoteVideo(call);
                    break;
                case "Unknown":
                    /* Hiding the local and remote video */
                    rainbowSDK.webRTC.hideLocalVideo();
                    rainbowSDK.webRTC.hideRemoteVideo(call);
                    $("#calling").modal("hide");
                    $("#mycalling").modal("hide");
                    if (!call.isInitiator) {
                        $("#calling").modal("hide");
                    } else {
                        $("#mycalling").modal("hide");
                    }
                    break;
                default:
                    break;
            }
        }

        /* Subscribe to WebRTC call change */
        // in angular application
        $rootScope.$on("$destroy", ($rootScope.$on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCCALLSTATECHANGED, onWebRTCCallChanged)));

        // WebRTC tracks changed = video has been added or removed
        var onWebRTCGetUserMediaErrorOccured = function onWebRTCGetUserMediaErrorOccured(__event, error) {

            // Do something when this error occurs
            console.log("you have a media error here : ", error);
        };

        // In non-angular application
        $(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCTMEDIAERROROCCURED, onWebRTCGetUserMediaErrorOccured);
    /* or */
        // in angular application
        $rootScope.$on("$destroy", ($rootScope.$on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCTMEDIAERROROCCURED, onWebRTCGetUserMediaErrorOccured)));

        // WebRTC tracks changed = video has been added or removed
        var onWebRTCTrackChanged = function onWebRTCTrackChanged(__event, call) {

             // Manage remote video
                if (call.remoteMedia & Call.Media.VIDEO) {
                    displayRemoteVideo(call);
                }
                else {
                    hideRemoteVideo(call);
                }
                // Manage local video
                if (call.localMedia & Call.Media.VIDEO) {
                    displayLocalVideo(call);
                }
                else {
                    hideLocalVideo(call);
                }
        };

        // In non-angular application
        $(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCTRACKCHANGED, onWebRTCTrackChanged);
    /* or */
        // in angular application
        $rootScope.$on("$destroy", ($rootScope.$on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCTRACKCHANGED, onWebRTCTrackChanged)));

        var escaladeToVideoCall = function escaladeToVideoCall(call) {
            /* Call this API to try do add video to the call */
            var res = rainbowSDK.webRTC.escaladeToVideoCall(call);
        };

        var reverseToAudioCall = function reverseToAudioCall(call) {
            /* Call this API to release video in the call */
            var res = rainbowSDK.webRTC.reverseToAudioCall(call);
        };

        rainbowSDK.im.getMessagesFromConversation(this.item, 50).then(function(__messages) {
            onConversationChanged();
        });

        var allfiles = rainbowSDK.fileStorage.getFilesReceivedInConversation(this.item);
        console.log("All uploaded files : ", allfiles, " and the conversation is : ", this.item);

        var onConversationChanged = function onConversationChanged() {
            setTimeout(function() {
                var containerHeight = $('.conversation-' + ctrl.conversation.dbId)[0].scrollHeight;
                var container = angular.element(".conversation-" + ctrl.conversation.dbId);
                container.animate({scrollTop: containerHeight}, 100);
            }, 100);
        };

        this.$onInit = function() {

            // Subscribe to XMPP connection change
            handlers.push($rootScope.$on(this.item.id, onConversationChanged));

             var container = angular.element(".conversation-" + ctrl.conversation.dbId);

             container.on('scroll', function(__event) {

                if (container.scrollTop() <= 0) {
                    //Load older messages
                    rainbowSDK.im.getMessagesFromConversation($scope.conversation, 30).then(function() {
                    }).catch(function() {
                    });
                }
            });
        };

        this.$onDestroy = function() {
            var handler = handlers.pop();
            while (handler) {
                handler();
                handler = handlers.pop();
            }
        };
    }

})
.directive("filesInput", function() {
  return {
    require: "ngModel",
    link: function postLink(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      })
    }
  }
});;
