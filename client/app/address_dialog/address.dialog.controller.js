'use strict';

angular.module('bubbleBaseApp')
  .controller('AddressDialogCtrl', function ($scope, ngDialog, SharedProperties) {
    $scope.cancelAddressDialog = function() {
      ngDialog.closeAll();
    };
    $scope.removeAddress = function(id) {
      var data = SharedProperties.getBlob();
      for (var i in data.businesses) {
        if (data.businesses[i].id === id) {
          data.businesses[i].addressBook = undefined;
        }
      }
      SharedProperties.setBlob(data);
      ngDialog.closeAll();
    };
    $scope.addAddress = function(id) {
      var data = SharedProperties.getBlob();
      for (var i in data.businesses) {
        if (data.businesses[i].id === id) {
          data.businesses[i].addressBook = true;
        }
      }
      SharedProperties.setBlob(data);
      ngDialog.closeAll();
    };

  });

