
/* Wait for the page is completely loaded */
$(function() {

    console.log("[DEMO] :: Rainbow Application started!");

    var applicationID = "",
        applicationSecret = "";

    /* Bootstrap the SDK */
    angular.bootstrap(document, ["sdk"]).get("rainbowSDK");

    /* Callback for handling the event 'RAINBOW_ONREADY' */
    var onReady = function onReady() {

     var myRainbowLogin = "riansyah@41studio.com";        // Replace by your login
     var myRainbowPassword = "Tauhid1!";    // Replace by your password

       // The SDK for Web is ready to be used, so you can sign in
       rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
       .then(function(account) {
           console.log(account);
       }).catch(function(err) {
          console.log(err);
       });
    };
    /* Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED' */
    var onLoaded = function onLoaded() {
        console.log("[DEMO] :: On SDK Loaded kawan!");

        rainbowSDK.initialize(applicationID, applicationSecret).then(function() {
            console.log("[DEMO] :: Rainbow SDK is initialized!");
        }).catch(function(err) {
            console.log("[DEMO] :: Something went wrong with the SDK...", err);
        });
    };

    /* Listen to the SDK event RAINBOW_ONREADY */
    $(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);

    /* Listen to the SDK event RAINBOW_ONLOADED */
    $(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);

    /* Load the SDK */
    rainbowSDK.load();
});
