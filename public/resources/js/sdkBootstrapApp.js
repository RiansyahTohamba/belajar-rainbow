
var bootstrap = angular.module('bootstrap', ['sdk']);

bootstrap.controller("bootstrapController", [
    "$log",
    "$rootScope",
    "rainbowSDK",
    function($log, $rootScope, sdk) {
        "use strict";

        /*********************************************************/
        /**                INITIALIZATION STUFF                 **/
        /*********************************************************/

        var onReady = function onReady() {

         var myRainbowLogin = "riansyah@41studio.com";        // Replace by your login
         var myRainbowPassword = "Tauhid1!";    // Replace by your password

           // The SDK for Web is ready to be used, so you can sign in
           rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
           .then(function(account) {
               console.log('login berhasil');
               console.log(account);
           }).catch(function(err) {
              console.log(err);
           });
        };

        var onLoaded = function onLoaded() {
            console.log("[DEMO] :: Rainbow SDK has been loaded!");

            sdk.initialize().then(function() {
                console.log("[DEMO] :: Rainbow SDK is initialized!");
            }).catch(function() {
                console.log("[DEMO] :: Something went wrong with the SDK...");
            });
        };

        this.initialize = function() {
            console.log("DEMO :: Rainbow Demo Application");

            $rootScope.$on(sdk.RAINBOW_ONREADY, onReady);

            $rootScope.$on(sdk.RAINBOW_ONLOADED, onLoaded);
        };

        this.initialize();

        return true;
    }
]);
