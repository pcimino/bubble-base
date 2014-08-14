'use strict';

angular.module('bubbleBaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'app/list/list.html',
        controller: 'ListCtrl'
      });
  });
