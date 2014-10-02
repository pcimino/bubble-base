/*
    var addressCount = function() {
    var count = 0;
      for (var i in $rootScope.businesses) {
        if ($rootScope.businesses[i].addressBook) {
          count++;
        }
      }
    };
*/

'use strict';

angular.module('bubbleBaseApp')
  .directive('addressCount', function () {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */


    directive.compile = function(element, attributes) {
      // do one-time configuration of element.

      var linkFunction = function($scope, element, attributes) {
        console.log($scope.addressCount);
      }

      return linkFunction;
    }

    return directive;
  });
