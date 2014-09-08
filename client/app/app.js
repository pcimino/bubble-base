'use strict';

angular.module('bubbleBaseApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
