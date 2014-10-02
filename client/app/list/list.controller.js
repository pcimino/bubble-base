'use strict';
angular.module('bubbleBaseApp')
  .controller('ListCtrl', function ($scope, $rootScope, $location) {
    $scope.addressList = [];
    for (var i in $rootScope.businesses) {
      if ($rootScope.businesses[i].addressBook) {
        $scope.addressList.push($rootScope.businesses[i]);
      }
    }

    $scope.search = function() {
      $location.path('/bubble');
    };
  });

