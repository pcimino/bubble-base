'use strict';
angular.module('bubbleBaseApp')
  .controller('ListCtrl', function ($scope, $rootScope, $location) {
    $scope.addressList = [];
    if (undefined === $scope.businesses) {
      $scope.businesses = [];
    };

    $rootScope.$on('listen_for_address_update', function(event, businesses) {
      $scope.businesses = businesses;
    });

    for (var i in $scope.businesses) {
      if ($scope.businesses[i].addressBook) {
        $scope.addressList.push($scope.businesses[i]);
      }
    }

    $scope.search = function() {
      $location.path('/bubble');
    };
  });
