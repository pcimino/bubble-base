'use strict';

angular.module('bubbleBaseApp')
  .controller('StartCtrl', function ($scope, $rootScope) {

    // indicator for bubble controller to determine of data is already laoded and where to start
    // probably a better way to control reentry to the page
    $rootScope.currentLevel = -1;
  });

