'use strict';
var ggg = {};
/* TODO
    Color of the bubbles should be derived: Choose light for the intial and then progressivle darker for each level
    Position of bubbles should be dynamic, not defining bubbles and fixed div
*/
angular.module('bubbleBaseApp')
  .controller('BubbleCtrl', function ($scope, $rootScope, GetDataService) {

    var blueRange = ['CCD6F5', '99ADEB', '6685E0', '335CD6', '0033CC'];
    var redRange = ['FFCCCC', 'FFB2B2', 'FF9999', 'FF8080', 'FF6666', 'FF4D4D', 'FF3333', 'FF1919', 'FF0000'];
    var greenRange = ['01DF01', '04B404', '088A08', '0B610B', '0B3B0B', '003300'];
    var orangeRange = ['FFEBD6', 'FFE0C2', 'FFD6AD', 'FFCC99', 'FFC285', 'FFB870', 'FFAD5C', 'FFA347', 'FF9933' ];

    if (undefined === $rootScope.currentLevel) $rootScope.currentLevel = -1
    if (-1 === $rootScope.currentLevel) {
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
      GetDataService.get( function( database ) {
          $rootScope.businesses = database.data[0].businesses;
          $scope.hideAllBubbles();
          $scope.showBubble('xService');
          $scope.showBubble('xProduct');
          $scope.setupServiceLevel();
          $scope.setupProductLevel();
      } );
    } else {
      $scope.setupDisplay($rootScope.currentLevel);
    }

    $scope.setupDisplay = function(level, services, products) {
      $rootScope.currentLevel = level;


      if (level === -1) {
          $scope.showBubble('xService');
          $scope.showBubble('xProduct');
      } else {
        $rootScope.displayProducts = products;
        $rootScope.displayServices = services;
      }


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

    // Pretty much wrong, setting up bubbles and data statically
    // in the real world bubbles would be rendered as needed
    // and each click would run a search
    // flattening the data so only need one ng-repeat
    $scope.setupServiceLevel = function() {
      var levelCat = []; // data by level
      var businessLevel = []; // businesses by level
      for (var i in $rootScope.businesses) {
        var lastService = $rootScope.businesses[i].serviceCategory.length - 1;
        for (var level = 0; level < $rootScope.businesses[i].serviceCategory.length; level++) {
          levelCat.push({'level':level+1, 'cat':$rootScope.businesses[i].serviceCategory[level]});
          if (level === lastService) {
            businessLevel.push({'level':level+1, 'bus':$rootScope.businesses[i]});
          }
        }
      }

      $rootScope.serviceLevelCat = levelCat;
      $rootScope.serviceLevelBus = businessLevel;
    }
    $scope.setupProductLevel = function(level) {
      var levelCat = []; // data by level
      var businessLevel = []; // businesses by level
      for (var i in $rootScope.businesses) {
        var lastService = $rootScope.businesses[i].productCategory.length - 1;
        for (var level = 0; level < $rootScope.businesses[i].productCategory.length; level++) {
          levelCat.push({'level':level+1, 'cat':$rootScope.businesses[i].productCategory[level]});
          if (level === lastService) {
            businessLevel.push({'level':level+1, 'bus':$rootScope.businesses[i]});
          }
        }
      }

      $rootScope.productLevelCat = levelCat;
      $rootScope.productLevelBus = businessLevel;
    }

    $scope.showServiceLevel = function(level) {
      for (var i in $scope.services) {
        var element = $('.x' + i);
        element.style.backgroundColor = blueRange[i];
      }
    }
    $scope.showProductLevel = function(level) {

    }


  });

