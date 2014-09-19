'use strict';

angular.module('bubbleBaseApp')
  .controller('AddressDialogCtrl', function ($scope, $rootScope, ngDialog) {
    $scope.featuresList = [];

    $scope.cancelAddressDialog = function() {
      ngDialog.closeAll();
    };
    $scope.removeAddress = function(id) {
      for (var i in $rootScope.businesses) {
        if ($rootScope.businesses[i].id === id) {
          $rootScope.businesses[i].addressBook = undefined;
        }
      }
      ngDialog.closeAll();
    };
    $scope.addAddress = function(id) {
      for (var i in $rootScope.businesses) {
        if ($rootScope.businesses[i].id === id) {
          $rootScope.businesses[i].addressBook = true;
        }
      }
      ngDialog.closeAll();
    };

  });
