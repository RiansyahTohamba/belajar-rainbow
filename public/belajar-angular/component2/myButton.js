(function() {
  'use strict';

  angular.module('MyApp').component('myButton', {
    templateUrl: 'myButton.html',
    controller: MyButtonController,
    bindings: {
      label: '@'
    }
  });
  
  
  function MyButtonController() {

  }

})();