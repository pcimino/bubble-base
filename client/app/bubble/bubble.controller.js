'use strict';

// TODO
//    Color of the bubbles should be derived: Choose light for the intial and then progressivle darker for each level
//    Position of bubbles should be dynamic, not defining bubbles and fixed div
//

angular.module('bubbleBaseApp')
  .controller('BubbleCtrl', function ($scope, $rootScope, $location, DatabaseService, ngDialog, ColorRangeService, SharedProperties) {

    var i;
    var blueRange = ColorRangeService.getBlueRange();
    var greenRange = ColorRangeService.getGreenRange();
    $scope.hideAddress = true;

    // Read the blob
    $scope.data = SharedProperties.getBlob();
    $scope.data.currentLevel = -1;
    SharedProperties.setBlob($scope.data, 'ignore');

    // first time? Get the data
    if (undefined === $scope.data.businesses || $scope.data.businesses.length === 0) {
      DatabaseService.initializeDatabase();
    }

    $rootScope.$on('event_data_update', function(event, data) {
        $scope.data = data;
        $scope.addressCount();
    });
    $rootScope.$on('event_address_update', function(event, data) {
        $scope.data = data;
        $scope.addressCount();
    });

    $scope.addressCount = function() {
      var count = 0;
      for (var i in $scope.data.businesses) {
        if ($scope.data.businesses[i].addressBook) {
          count++;
        }
      }
      if (count > 0) {
         $scope.hideAddress = false;
         $scope.showBubble('bubble-address-book');
      } else {
         $scope.hideBubble('bubble-address-book');
         $scope.hideAddress = true;
      }
      SharedProperties.setBlob($scope.data, 'listen_for_address_update');
    };
    $scope.addressBook = function() {
      $location.path('/list');
    };
    $scope.topLevel = function() {
      $scope.data = SharedProperties.getBlob();
      $scope.data.currentLevel = -1;
      $scope.setupDisplay(false, false, '');
      SharedProperties.setBlob($scope.data, 'listen_for_level_update');
    };
    $scope.lessDetail = function() {
      $scope.data = SharedProperties.getBlob();

      $scope.data.currentLevel -= 1;
      if ($scope.data.currentLevel < -1) {
        $scope.data.currentLevel = -1;
      }
      $scope.data.history.pop();
      var cat = $scope.data.history.pop();
      SharedProperties.setBlob($scope.data, 'listen_for_level_update');
      $scope.setupDisplay($scope.displayProducts, $scope.displayServices, cat);
    };
    $scope.moreDetail = function(productFlag, serviceFlag, category) {
      $scope.data = SharedProperties.getBlob();
      $scope.data.currentLevel++;
      SharedProperties.setBlob($scope.data, 'listen_for_level_update');
      $scope.setupDisplay(productFlag, serviceFlag, category);
    };
    $scope.addressBookModal = function(busId) {
      for (var i in $scope.data.businesses) {
          var templateString = '<p>Address Book</p>';
        if ($scope.data.businesses[i].id === busId) {
          if ($scope.data.businesses[i].addressBook) {
            templateString = templateString + '<p><a href="" ng-click="removeAddress(\'' + busId + '\')" class="btn btn-primary btn-sm right-margin">Remove From Address Book</a><a href="" ng-click="cancelAddressDialog()" class="btn btn-success btn-sm">Cancel</a></p>';
          } else {
            templateString = templateString + '<p><a href="" ng-click="addAddress(\'' + busId + '\')" class="btn btn-primary btn-sm right-margin">Add To Address Book</a><a href="" ng-click="cancelAddressDialog()" class="btn btn-success btn-sm">Cancel</a></p>';
          }
          ngDialog.open({template:templateString, showClose:true, controller:'AddressDialogCtrl', plain:true}); // 'address.template.html');
        }
      }
    };

    $scope.hideAllBubbles = function() {
      // can't simply call hide on class 'bubble' because it will show the bubbles prior to hiding
      // so for each 'bubble' determine if it's visible, then hide
      $('.bubble').each(function() {
        if ($(this).attr('class').toString().indexOf('show-bubble') >= 0) {
          $(this).addClass('hide-bubble');
        }
      });
    };
    $scope.showBubble = function(bubbleClass) {
      var element = $('.' + bubbleClass);
      element.removeClass('hide-bubble');
      element.addClass('show-bubble');
    };
    $scope.hideBubble = function(bubbleClass) {
      var element = $('.' + bubbleClass);
      element.removeClass('show-bubble');
      element.addClass('hide-bubble');
    };

    $scope.setupDisplay = function(products, services, category) {
      var level = $scope.data.currentLevel;
      var displayClass = [];
      var i, results;
      $scope.hideAllBubbles();

      if (level === -1) {
          $scope.showBubble('xService');
          $scope.showBubble('xProduct');
          $scope.hideBubble('bubble-back');
          $scope.hideBubble('bubble-top');
          $scope.hideBubble('bubble-address-book');
          category = '';
      } else {
        $scope.showBubble('bubble-back');
        $scope.showBubble('bubble-top');
        $scope.addressCount();
        $scope.displayProducts = products;
        $scope.displayServices = services;
        $scope.productLevelBus = [];
        $scope.productLevelCat = [];
        $scope.serviceLevelBus = [];
        $scope.serviceLevelCat = [];

        if (products) {
          results = DatabaseService.moreDetail(category);
          for (i in results.cat) {
            $scope.productLevelCat.push(results.cat[i]);
            displayClass.push('productLevel'+i);
          }
          for (i in results.bus) {
            $scope.productLevelBus.push(results.bus[i]);
            displayClass.push('p'+i);
          }
        } else if (services) {
          results = DatabaseService.moreDetail(category);
          for (i in results.cat) {
            $scope.serviceLevelCat.push(results.cat[i]);
            displayClass.push('serviceLevel'+i);
          }
          for (i in results.bus) {
            $scope.serviceLevelBus.push(results.bus[i]);
            displayClass.push('s'+i);
          }
        }
        for (i in displayClass) {
          $scope.showBubble(displayClass[i]);
        }
      }
      SharedProperties.setBlob($scope.data, 'listen_for_address_update');
    };
    
    if (undefined === $scope.data.currentLevel) {
      $scope.data.currentLevel = -1;
    }
    if (-1 === $scope.data.currentLevel) {
      $scope.serviceLevelCat = [];
      $scope.serviceLevelBus = [];
      $scope.productLevelCat = [];
      $scope.productLevelBus = [];
      $scope.blueStyle = [];
      $scope.greenStyle = [];
      $scope.displayProducts = false;
      $scope.displayServices = false;

      for (i in greenRange) {
        $scope.greenStyle.push({'background': '#' + greenRange[i] });
      }
      for (i in blueRange) {
        $scope.blueStyle.push({'background': '#' + blueRange[i] });
      }
    }
    $scope.setupDisplay();
  });










