'use strict';

angular.module('bubbleBaseApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.concepts = [];

    $http.get('/api/things').success(function(concepts) {
      $scope.concepts = concepts;
    });
  });

