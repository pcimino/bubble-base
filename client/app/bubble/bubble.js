'use strict';

angular.module('bubbleBaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bubble', {
        url: '/bubble',
        templateUrl: 'app/bubble/bubble.html',
        controller: 'BubbleCtrl'
      });
  });
