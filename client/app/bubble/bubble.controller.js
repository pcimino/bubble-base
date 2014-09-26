'use strict';

/* TODO
    Color of the bubbles should be derived: Choose light for the intial and then progressivle darker for each level
    Position of bubbles should be dynamic, not defining bubbles and fixed div
*/
angular.module('bubbleBaseApp')
  .controller('BubbleCtrl', function ($scope, $rootScope, StorageService, DatabaseService, ngDialog) {

    var i;
    if (undefined === $rootScope.businesses || $rootScope.businesses.length === 0) {
      DatabaseService.initializeDatabase();
    }

    $rootScope.currentLevel = -1; 
    var blueRange = ['CCD6F5', '99ADEB', '6685E0', '335CD6', '0033CC'];
    // var redRange = ['FFCCCC', 'FFB2B2', 'FF9999', 'FF8080', 'FF6666', 'FF4D4D', 'FF3333', 'FF1919', 'FF0000'];
    var greenRange = ['01DF01', '04B404', '088A08', '0B610B', '0B3B0B', '003300'];
    // var orangeRange = ['FFEBD6', 'FFE0C2', 'FFD6AD', 'FFCC99', 'FFC285', 'FFB870', 'FFAD5C', 'FFA347', 'FF9933' ];

    $scope.lessDetail = function() {
      $rootScope.currentLevel -= 1;
      if ($rootScope.currentLevel < -1) {
        $rootScope.currentLevel = -1;
      }
      $rootScope.history.pop();
      var cat = $rootScope.history.pop();
      $scope.setupDisplay($rootScope.displayProducts, $rootScope.displayServices, cat);

    };
    $scope.moreDetail = function(productFlag, serviceFlag, category) {
      $rootScope.currentLevel++;
      $scope.setupDisplay(productFlag, serviceFlag, category);
    };
    $scope.addressBookModal = function(busId) {
      for (var i in $rootScope.businesses) {
        if ($rootScope.businesses[i].id === busId) {
          var templateString = "<p>Address Book</p>";
          if ($rootScope.businesses[i].addressBook) {
            templateString = templateString + "<p><a href='' ng-click='removeAddress(\"" + busId + "\")' class='btn btn-primary btn-sm right-margin'>Remove From Address Book</a><a href='' ng-click='cancelAddressDialog()' class='btn btn-success btn-sm'>Cancel</a></p>";
          } else {
            templateString = templateString + "<p><a href='' ng-click='addAddress(\"" + busId + "\")' class='btn btn-primary btn-sm right-margin'>Add To Address Book</a><a href='' ng-click='cancelAddressDialog()' class='btn btn-success btn-sm'>Cancel</a></p>";
          }
          ngDialog.open({template:templateString, showClose:true, controller:"AddressDialogCtrl", plain:true}); // 'address.template.html');
        }
      }
    }

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

    if (undefined === $rootScope.currentLevel) {
      $rootScope.currentLevel = -1;
    }
    if (-1 === $rootScope.currentLevel) {
      $rootScope.serviceTree = [];
      $rootScope.productTree = [];
      $rootScope.serviceLevelCat = [];
      $rootScope.serviceLevelBus = [];
      $rootScope.productLevelCat = [];
      $rootScope.productLevelBus = [];
      $rootScope.blueStyle =[];
      $rootScope.greenStyle =[];
      $rootScope.displayProducts = false;
      $rootScope.displayServices = false;

      for (i in greenRange) {
        $rootScope.greenStyle.push({'background': '#'+greenRange[i] });
      }
      for (i in blueRange) {
        $rootScope.blueStyle.push({'background': '#'+blueRange[i] });
      }
    }
    $scope.setupDisplay = function(products, services, category) {
      var level = $rootScope.currentLevel;
      var displayClass = [];
      var i, results;
      $scope.hideAllBubbles();

      if (level === -1) {
          $scope.showBubble('xService');
          $scope.showBubble('xProduct');
          $scope.hideBubble('small-button');
          category = '';
      } else {
        $scope.showBubble('small-button');
        $rootScope.displayProducts = products;
        $rootScope.displayServices = services;
        $rootScope.productLevelBus = [];
        $rootScope.productLevelCat = [];
        $rootScope.serviceLevelBus = [];
        $rootScope.serviceLevelCat = [];

        if (products) {
          results = DatabaseService.moreDetail(category);
          for (i in results.cat) {
            $rootScope.productLevelCat.push(results.cat[i]);
            displayClass.push('productLevel'+i);
          }
          for (i in results.bus) {
            $rootScope.productLevelBus.push(results.bus[i]);
            displayClass.push('p'+i);
          }
        } else if (services) {
          results = DatabaseService.moreDetail(category);
          for (i in results.cat) {
            $rootScope.serviceLevelCat.push(results.cat[i]);
            displayClass.push('serviceLevel'+i);
          }
          for (i in results.bus) {
            $rootScope.serviceLevelBus.push(results.bus[i]);
            displayClass.push('s'+i);
          }
        }
        for (i in displayClass) {
          $scope.showBubble(displayClass[i]);
        }
      }
    };

    $scope.setupDisplay($rootScope.currentLevel);
  });








