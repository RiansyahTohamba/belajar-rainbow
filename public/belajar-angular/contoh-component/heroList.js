(function(angular) {
  'use strict';


angular.module('heroApp').component('heroList', {
  templateUrl: 'heroList.html',
  controller: function ($scope, $element, $attrs) {
        var ctrl = this;

        // This would be loaded by $http etc.
        ctrl.list = [
          {
            name: 'Superman',
            location: ''
          },
          {
            name: 'Batman',
            location: 'Wayne Manor'
          }
        ];

        ctrl.updateHero = function(hero, prop, value) {
          hero[prop] = value;
        };

        ctrl.deleteHero = function(hero) {
          var idx = ctrl.list.indexOf(hero);
          if (idx >= 0) {
            ctrl.list.splice(idx, 1);
          }
        };
  }
});
})(window.angular);

/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/