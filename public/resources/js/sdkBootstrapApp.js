
// var bootstrap = angular.module('bootstrap', ['sdk']);
// bootstrap.controller("bootstrapController", [
//     "$rootScope",
//     "rainbowSDK",
//     function($rootScope, rainbowSDK) {
//         'use strict';
//         $rootScope.$on('test', function (event, metadata) {
//             console.log('hello metacontroller metadata on constructor' );
//         });
//     }]);
// var bootstrap = angular.module('bootstrap', []);
// bootstrap.controller("bootstrapController", [
//     "$rootScope",   
//     function($rootScope) {
//         'use strict';
//         $rootScope.$on('test', function (event, metadata) {
//             console.log('hello metacontroller metadata on constructor' );
//         });
//     }]);

// bootstrap.controller("bootstrapController", [
//     "$rootScope",
//     "rainbowSDK",
//     function($rootScope, rainbowSDK) {
//         "use strict";

//         /*********************************************************/
//         /**                INITIALIZATION STUFF                 **/
//         /*********************************************************/

//         var onReady = function onReady() {

//            var myRainbowLogin = "riansyah@41studio.com";        // Replace by your login
//            var myRainbowPassword = "Tauhid1!";    // Replace by your password

//              // The SDK for Web is ready to be used, so you can sign in
//              rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
//              .then(function(account) {
//                  console.log('login berhasil kawan');
//                  console.log(account);
//              }).catch(function(err) {
//                 console.log(err);
//              });
//         };

//         var onLoaded = function onLoaded() {
//             console.log("[DEMO] :: Rainbow SDK has been loaded!");

//             rainbowSDK.initialize().then(function() {
//                 console.log("[DEMO] :: Rainbow SDK is initialized!");
//             }).catch(function() {
//                 console.log("[DEMO] :: Something went wrong with the SDK...");
//             });
//         };

//         this.initialize = function() {
//             console.log("DEMO :: Rainbow Demo Application");
//             // /* Listen to the SDK event RAINBOW_ONREADY */
//             //     $(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);

//             //     /* Listen to the SDK event RAINBOW_ONLOADED */
//             //     $(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
//             // $rootScope.$on(rainbowSDK.RAINBOW_ONREADY, onReady);
            

//             // $rootScope.$on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
//         };
//         $rootScope.$on('test', function(){
//               console.log('rootScope')
//         });
//         this.initialize();

//         return true;
//     }
// ]);

var app = angular.module('bootstrap', ['sdk']);

app.controller('MainCtrl', ['$rootScope',function($rootScope) {
    'use strict';
    // $scope.name = 'World';
    

    $rootScope.$on('test', function (event, metadata) {
        console.log('hello metacontroller metadata on constructor' );
    });
}]);


(function () {
    'use strict';
        
    app.controller('constructorController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $rootScope.$broadcast('test', function(){
                console.log('helooo');
            });
        }]);
})();
