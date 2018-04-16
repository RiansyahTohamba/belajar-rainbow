(function(angular) {
  'use strict';
  var app = angular.module('bootstrap', ['sdk']);

  app.controller('bootstrapController', ['$rootScope',"rainbowSDK",function($rootScope,rainbowSDK) {
      // 'use strict';
      var ctrl = this;
      ctrl.username = "Riansyah";
      var onReady = function () {
         console.log("[MSFTELEMED] :: Rainbow SDK has been ready!");

         var myRainbowLogin = "riansyah@41studio.com";
         var myRainbowPassword = "Tauhid1!";

           // The SDK for Web is ready to be used, so you can sign in
         rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
           .then(function(account) {


               console.log('login berhasil kawan');
           }).catch(function(err) {
              console.log(err);
           });
      };

      var onLoaded = function () {
          console.log("[MSFTELEMED] :: Rainbow SDK has been loaded!");
          rainbowSDK.initialize().then(function() {
              console.log("[MSFTELEMED] :: Rainbow SDK is initialized!");
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
                  console.log("[MSFTELEMED] :: Rainbow initialize Application");
                  $rootScope.$broadcast(rainbowSDK.RAINBOW_ONREADY);
                  $rootScope.$broadcast(rainbowSDK.RAINBOW_ONLOADED);
              };
              this.initialize();
  }]);
})(window.angular);
