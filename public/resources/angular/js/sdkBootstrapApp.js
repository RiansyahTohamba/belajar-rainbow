// define services msftelemed
  angular.module('msftelemed.services', []);

  var app = angular.module('bootstrap', ['sdk','msftelemed.services']);

  app.controller('bootstrapController', ['$rootScope','$scope',"rainbowSDK",
    function($rootScope,$scope,rainbowSDK) {
      'use strict';

      var onReady = function () {
         console.log("[MSFTELEMED] :: Rainbow SDK has been ready!");
         var myRainbowLogin = "riansyah@41studio.com";
         var myRainbowPassword = "Tauhid1!";

           // The SDK for Web is ready to be used, so you can sign in
         rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
           .then(function(account) {
              $scope.user = rainbowSDK.contacts.getConnectedUser();
              console.log('login berhasil kawan ');
           }).catch(function(err) {
              console.log(err);
           });
      };

      var onLoaded = function () {
          console.log("[MSFTELEMED] :: Rainbow SDK onLoaded");
          rainbowSDK.initialize().then(function() {
              console.log("[MSFTELEMED] :: Rainbow SDK initialized!");
          }).catch(function() {
              console.log("[MSFTELEMED] :: Something went wrong with the SDK...");
          });
      };

      $rootScope.$on(rainbowSDK.RAINBOW_ONREADY,  onReady);
      $rootScope.$on(rainbowSDK.RAINBOW_ONLOADED,  onLoaded);
  }]);
  app.controller('constructorController', ['$rootScope',"rainbowSDK",
          function ($rootScope,rainbowSDK) {
              this.initialize = function() {
                  console.log("[MSFTELEMED] :: Rainbow constructorController");
                  $rootScope.$broadcast(rainbowSDK.RAINBOW_ONLOADED);
                  $rootScope.$broadcast(rainbowSDK.RAINBOW_ONREADY);
                  $rootScope.$broadcast(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED);
              };
              this.initialize();
  }]);

app.factory('rainbowFactory', function() {
  return {
    getAllConversations: function() {
      return [{
        id: "19ef44b123b442a797d23fee19e741aa@sandbox-all-in-one-prod-1.opentouch.cloud",
        dbId: "5aaa3ef8958fc7b503cab34f",
        type: 0,
        owner: null,
        contact: {
          id: "19ef44b123b442a797d23fee19e741aa@sandbox-all-in-one-prod-1.opentouch.cloud",
          jid: "19ef44b123b442a797d23fee19e741aa@sandbox-all-in-one-prod-1.opentouch.cloud",
          fullJid: null,
          jidtel: "tel_19ef44b123b442a797d23fee19e741aa@sandbox-all-in-one-prod-1.opentouch.cloud",
          dbId: "59f9491bde8b80386e0cff99",
          login: null,
          temp: false,
          status: "offline",
          telStatus: "",
          imStatus: "offline",
          imStatusStamp: [],
          resources: {},
          loginEmail: "hendra@41studio.com",
          lastname: "Nicholas",
          firstname: "Hendra",
          company: {
            id: "58219a61513a25ec3315e422",
            name: "Rainbow",
            adminEmail: "",
            supportEmail: "",
            status: "active",
            economicActivityClassification: "NONE",
            visibility: "private",
            visibleBy: [],
            organisationId: "",
            userSelfRegisterEnabled: false,
            userSelfRegisterAllowedDomains: [],
            offerType: "freemium",
            state: null,
            isBP: false,
            adminHasRightToUpdateSubscriptions: false,
            adminAllowedUpdateSubscriptionsOps: "all",
            lastAvatarUpdateDate: null,
            lastBannerUpdateDate: null,
            avatarShape: "circle",
            logo: null,
            filterName: "rainbow"
          },
          nickname: "",
          title: "",
          jobTitle: "",
          country: "IDN",
          avatar: {},
          roles: ["user"],
          confId: "",
          phonePro: "",
          phoneProCan: "",
          phonePbx: "",
          phoneInternalNumber: "",
          pbxId: "",
          mobilePro: "",
          mobileProCan: "",
          phonePerso: "",
          phonePersoCan: "",
          mobilePerso: "",
          mobilePersoCan: "",
          emailPro: "hendra@41studio.com",
          emailPerso: "",
          oldImStatus: null,
          roster: true,
          _displayName: "Hendra Nicholas",
          name: {
            value: "Hendra Nicholas"
          },
          initials: "HN",
          message: "",
          cellStyle: "",
          ask: "none",
          subscription: "both",
          conversation: {
            $ref: "#0"
          },
          adminType: "undefined",
          capabilities: {
            telephony: false,
            webRTC: false,
            sharedDesktop: false,
            fileTransfert: false,
            mediaAvailable: false,
            addMedia: false
          },
          groups: null,
          mobileResource: null,
          language: null,
          _lastActivityDate: null,
          _lastActivityMessage: "",
          nameUpdatePrio: 99,
          calendarState: {},
          guest: false,
          isBot: false,
          isTerminated: false,
          lastAvatarUpdateDate: null,
          guestMode: false,
          voicemailNumber: "",
          hasPhoneNumber: false,
          displayNameMD5: "5013d79c312aaac3c8279a3a2174d4f5",
          colorIndex: 3,
          color: "#007356"
        },
        room: null,
        capabilities: {
          $ref: "#0.contact.capabilities"
        },
        avatar: "data:image/png;base64,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",
        presenceStatus: null,
        name: {
          $ref: "#0.contact.name"
        },
        filterName: "hendra nicholas",
        missedCounter: 0,
        missedCalls: 0,
        messages: [],
        participantStatuses: {},
        draft: "",
        uploadFiles: null,
        status: {
          key: 0,
          value: "active"
        },
        historyIndex: -1,
        historyMessages: [],
        historyDefered: null,
        historyComplete: false,
        lastModification: "2018-04-17T02:23:44Z",
        creationDate: "2018-03-15T09:38:00Z",
        lastMessageText: "chating",
        lastMessageSender: "",
        pip: true,
        videoCall: {
          status: {
            key: 0,
            value: "Unknown"
          }
        },
        audioCall: null,
        pstnConferenceSession: null,
        webConferenceSession: null,
        isMutedAudio: false,
        isMutedVideo: false,
        infoVisible: null,
        muted: false,
        preload: false
      }, {
        id: "emily.sandbox-all-in-one-prod-1.opentouch.cloud",
        dbId: "5aaa1a81958fc7b503cab2d2",
        type: 0,
        owner: null,
        contact: {
          id: "emily.sandbox-all-in-one-prod-1.opentouch.cloud",
          jid: "emily.sandbox-all-in-one-prod-1.opentouch.cloud",
          fullJid: null,
          jidtel: null,
          dbId: "5a8fdfc3dfa8b803ff05e246",
          login: null,
          temp: false,
          status: "online",
          telStatus: "",
          imStatus: "online",
          imStatusStamp: [],
          resources: {},
          loginEmail: "",
          lastname: "Emily",
          firstname: "",
          nickname: "",
          title: "",
          jobTitle: "",
          country: "",
          avatar: {},
          timezone: "",
          roles: null,
          confId: "",
          phonePro: "",
          phoneProCan: "",
          phonePbx: "",
          phoneInternalNumber: "",
          pbxId: "",
          mobilePro: "",
          mobileProCan: "",
          phonePerso: "",
          phonePersoCan: "",
          mobilePerso: "",
          mobilePersoCan: "",
          emailPro: "",
          emailPerso: "",
          oldImStatus: null,
          roster: false,
          initialized: false,
          _displayName: "Emily",
          name: {
            value: "Emily"
          },
          initials: "E",
          message: "",
          cellStyle: "",
          ask: "none",
          subscription: "both",
          conversation: {
            $ref: "#1"
          },
          adminType: null,
          capabilities: {
            telephony: false,
            webRTC: false,
            sharedDesktop: false,
            fileTransfert: false,
            mediaAvailable: false,
            addMedia: false
          },
          groups: null,
          mobileResource: null,
          language: null,
          _lastActivityDate: null,
          _lastActivityMessage: "",
          nameUpdatePrio: 99,
          isInDefaultCompany: false,
          calendarState: {},
          guest: false,
          isBot: true,
          displayNameMD5: "d8ea48bc5a82a9fd6b80f70dd51fc30c"
        },
        room: null,
        capabilities: {
          $ref: "#1.contact.capabilities"
        },
        avatar: "",
        presenceStatus: null,
        name: {
          $ref: "#1.contact.name"
        },
        filterName: "emily",
        missedCounter: 0,
        missedCalls: 0,
        messages: [],
        participantStatuses: {},
        draft: "",
        uploadFiles: null,
        status: {
          $ref: "#0.status"
        },
        historyIndex: -1,
        historyMessages: [],
        historyDefered: null,
        historyComplete: false,
        lastModification: "2018-03-15T07:02:24Z",
        creationDate: "2018-03-15T07:02:25Z",
        lastMessageText: "Hello Riansyah, if you would like to suggest an idea or bring an issue to our attention, please send me the details, including #support in your message.",
        lastMessageSender: "",
        pip: true,
        videoCall: {
          status: {
            $ref: "#0.videoCall.status"
          }
        },
        audioCall: null,
        pstnConferenceSession: null,
        webConferenceSession: null,
        isMutedAudio: false,
        isMutedVideo: false,
        infoVisible: null,
        muted: false,
        preload: false
      }]
    }
    ,
    getUser: function(){
      return {
        id: "05190fba5d9a45f59c1c2c238854b70e@sandbox-all-in-one-prod-1.opentouch.cloud",
        jid: "05190fba5d9a45f59c1c2c238854b70e@sandbox-all-in-one-prod-1.opentouch.cloud",
        fullJid: "05190fba5d9a45f59c1c2c238854b70e@sandbox-all-in-one-prod-1.opentouch.cloud/web_sdk_1.39.6_b8y5Nqah",
        jidtel: "tel_05190fba5d9a45f59c1c2c238854b70e@sandbox-all-in-one-prod-1.opentouch.cloud",
        dbId: "5aaa190f958fc7b503cab2d1",
        login: null,
        temp: false,
        status: "offline",
        telStatus: "",
        imStatus: "offline",
        imStatusStamp: {},
        resources: {},
        loginEmail: "riansyah@41studio.com",
        lastname: "Tohamba",
        firstname: "Riansyah",
        company: {
          id: "58219a61513a25ec3315e422",
          name: "Rainbow",
          adminEmail: "",
          supportEmail: "",
          status: "active",
          economicActivityClassification: "NONE",
          visibility: "private",
          visibleBy: [],
          organisationId: null,
          userSelfRegisterEnabled: true,
          userSelfRegisterAllowedDomains: [],
          offerType: "premium",
          state: null,
          isBP: false,
          adminHasRightToUpdateSubscriptions: false,
          adminAllowedUpdateSubscriptionsOps: "all",
          lastAvatarUpdateDate: null,
          lastBannerUpdateDate: null,
          avatarShape: "circle",
          catalogId: "59abe05afe31a3d39499fa84",
          numberUsers: 82,
          logo: {},
          filterName: "rainbow",
          banner: {}
        },
        nickname: "",
        title: "",
        jobTitle: "",
        country: "IDN",
        avatar: {},
        roles: ["user"],
        confId: "",
        phonePro: "",
        phoneProCan: "",
        phonePbx: "",
        phoneInternalNumber: "",
        pbxId: "",
        mobilePro: "",
        mobileProCan: "",
        phonePerso: "",
        phonePersoCan: "",
        mobilePerso: "",
        mobilePersoCan: "",
        emailPro: "riansyah@41studio.com",
        emailPerso: "",
        oldImStatus: null,
        roster: false,
        initialized: true,
        _displayName: "Riansyah Tohamba",
        name: {
          value: "Riansyah Tohamba"
        },
        initials: "RT",
        message: "",
        cellStyle: "",
        ask: null,
        subscription: null,
        conversation: null,
        adminType: "undefined",
        capabilities: null,
        groups: null,
        mobileResource: null,
        language: "en",
        _lastActivityDate: null,
        _lastActivityMessage: "",
        nameUpdatePrio: 99,
        isInDefaultCompany: true,
        calendarState: {},
        guest: false,
        organisationId: null,
        siteId: null,
        isBot: false,
        isTerminated: false,
        lastAvatarUpdateDate: null,
        guestMode: false,
        voicemailNumber: "",
        hasPhoneNumber: false,
        displayNameMD5: "e247abe421d6411bf14bf63809242275",
        colorIndex: 7,
        color: "#6639b7"
      }
    }
  }
})
