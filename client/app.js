'use strict';

angular.module('bubbleBaseApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngDialog',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
  });
