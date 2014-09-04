'use strict';

angular.module('bubbleBaseApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Start',
      'link': '/start'
    },
    {
      'title': 'Search',
      'link': '/bubble'
    },
    {
      'title': 'List',
      'link': '/list'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
 