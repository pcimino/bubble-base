'use strict';

angular.module('bubbleBaseApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Intro',
      'link': '/start'
    },
    {
      'title': 'Search',
      'link': '/bubble'
    },
    {
      'title': 'Address Book',
      'link': '/list'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
