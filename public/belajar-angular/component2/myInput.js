(function() {
  'use strict';

  angular.module('MyApp').component('myInput', {
    templateUrl: 'myInput.html',
    controller: MyInputController,
    bindings: {
      placeholder: '@',
      model:'='
    }
  });
  
  
  function MyInputController() {

  }

})();