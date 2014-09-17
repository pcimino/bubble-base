'use strict';

/* TODO
    Color of the bubbles should be derived: Choose light for the intial and then progressivle darker for each level
    Position of bubbles should be dynamic, not defining bubbles and fixed div
*/
angular.module('bubbleBaseApp')
  .controller('BubbleCtrl', function ($scope, $rootScope, StorageService, DatabaseService) {

    DatabaseService.initializeDatabase();
    var blueRange = ['CCD6F5', '99ADEB', '6685E0', '335CD6', '0033CC'];
    var redRange = ['FFCCCC', 'FFB2B2', 'FF9999', 'FF8080', 'FF6666', 'FF4D4D', 'FF3333', 'FF1919', 'FF0000'];
    var greenRange = ['01DF01', '04B404', '088A08', '0B610B', '0B3B0B', '003300'];
    var orangeRange = ['FFEBD6', 'FFE0C2', 'FFD6AD', 'FFCC99', 'FFC285', 'FFB870', 'FFAD5C', 'FFA347', 'FF9933' ];


    $scope.lessDetail = function() {
      $rootScope.currentLevel -= 1;
      if ($rootScope.currentLevel < -1) $rootScope.currentLevel = -1;
      $rootScope.history.pop();
      var cat = $rootScope.history.pop();
      $scope.setupDisplay($rootScope.displayProducts, $rootScope.displayServices, cat);
    }
    $scope.moreDetail = function(productFlag, serviceFlag, category) {
      $rootScope.currentLevel++;
      $scope.setupDisplay(productFlag, serviceFlag, category);
    }


    $scope.hideAllBubbles = function() {
      // can't simply call hide on class 'bubble' because it will show the bubbles prior to hiding
      // so for each 'bubble' determine if it's visible, then hide
      $('.bubble').each(function() {
        if ($(this).attr("class").toString().indexOf("show-bubble") >= 0) {
          $(this).addClass("hide-bubble");
        }
      });
    }
    $scope.showBubble = function(bubbleClass) {
      var element = $('.' + bubbleClass);
      element.removeClass("hide-bubble");
      element.addClass("show-bubble");
    }
    $scope.hideBubble = function(bubbleClass) {
      var element = $('.' + bubbleClass);
      element.removeClass("show-bubble");
      element.addClass("hide-bubble");
    }

    // TODO set this up as a prototype on array
    var arrayHas = function(testArray, v){
      for (i = 0; i < testArray.length; i++) {
        if (testArray[i] === v) {
          return true;
        }
      }
      return undefined;
    }

    if (undefined === $rootScope.currentLevel) $rootScope.currentLevel = -1
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

      for (var i in greenRange) {
        $rootScope.greenStyle.push({"background": '#'+greenRange[i] });
      }
      for (var i in blueRange) {
        $rootScope.blueStyle.push({"background": '#'+blueRange[i] });
      }
    }
    $scope.setupDisplay = function(products, services, category) {
      var level = $rootScope.currentLevel;
      var displayClass = [];
      $scope.hideAllBubbles();

      if (level === -1) {
          $scope.showBubble('xService');
          $scope.showBubble('xProduct');
          $scope.hideBubble('small-bubble');
          category = '';
      } else {
        $scope.showBubble('small-bubble');
        $rootScope.displayProducts = products;
        $rootScope.displayServices = services;
        $rootScope.productLevelBus = [];
        $rootScope.productLevelCat = [];
        $rootScope.serviceLevelBus = [];
        $rootScope.serviceLevelCat = [];

        if (products) {
          var results = DatabaseService.moreDetail(category);
          for (var i in results.cat) {
            $rootScope.productLevelCat.push(results.cat[i]);
            displayClass.push('productLevel'+i);
          }
          for (var i in results.bus) {
            $rootScope.productLevelBus.push(results.bus[i]);
            displayClass.push('p'+i);
          }
        } else if (services) {
          var results = DatabaseService.moreDetail(category);
          for (var i in results.cat) {
            $rootScope.serviceLevelCat.push(results.cat[i]);
            displayClass.push('serviceLevel'+i);
          }
          for (var i in results.bus) {
            $rootScope.serviceLevelBus.push(results.bus[i]);
            displayClass.push('s'+i);
          }
        }
        for (var i in displayClass) {
          $scope.showBubble(displayClass[i]);
        }
      }
    }

    $scope.setupDisplay($rootScope.currentLevel);
  });





