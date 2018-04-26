(function(angular) {
  'use strict';
function EditableFieldController($scope, $element, $attrs) {
  var ctrl = this;

  ctrl.handleModeChange = function() {
    ctrl.output = ctrl.fieldValue
  };
}

angular.module('heroApp').component('rbxReferral', {
  templateUrl: 'form.html',
  controller: EditableFieldController,
  bindings: {
    fieldValue: '<', 
    jenisField: '@?',
    onUpdate: '&'
  }
});
})(window.angular);

/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
