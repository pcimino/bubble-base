'use strict';
angular.module('bubbleBaseApp')
  .controller('ListCtrl', function ($scope, $rootScope, $location, SharedProperties) {
    $scope.addressList = [];
    $scope.data = SharedProperties.getBlob();


    $rootScope.$on('event_address_update', function(event, data) {
      $scope.data = data;
      buildAddressList();
    });

    $scope.search = function() {
      $location.path('/bubble');
    };

    var buildAddressList = function() {
      for (var i in $scope.data.businesses) {
        if ($scope.data.businesses[i].addressBook) {
          $scope.addressList.push($scope.data.businesses[i]);
        }
      }
    };
    buildAddressList();
  });

