'use strict';

angular.module('bubbleBaseApp')
  .controller('AddressDialogCtrl', function ($scope, $rootScope, ngDialog, DatabaseService) {
    $scope.featuresList = [];

    if (undefined === $rootScope.addressFlag) {
      $rootScope.addressFlag = false;
    }
    var addressCount = function(businessList) {
      var count = 0;
      for (var i in $rootScope.businesses) {
        if ($rootScope.businesses[i].addressBook) {
          count++;
        }
      }
      $rootScope.addressFlag = count > 0;
    };

    $scope.cancelAddressDialog = function() {
      ngDialog.closeAll();
    };
    $scope.removeAddress = function(id) {
      for (var i in $rootScope.businesses) {
        if ($rootScope.businesses[i].id === id) {
          $rootScope.businesses[i].addressBook = undefined;
        }
      }
      addressCount();
      ngDialog.closeAll();
    };
    $scope.addAddress = function(id) {
      for (var i in $rootScope.businesses) {
        if ($rootScope.businesses[i].id === id) {
          $rootScope.businesses[i].addressBook = true;
        }
      }

      addressCount();
      ngDialog.closeAll();
    };



  });
