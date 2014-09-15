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
      $scope.setupDisplay($rootScope.currentLevel-1, $rootScope.displayProducts, $rootScope.displayServices);
    }
    $scope.moreDetail = function(category) {
      $scope.setupDisplay($rootScope.currentLevel+1, $rootScope.displayProducts, $rootScope.displayServices, category);
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
    $scope.setupDisplay = function(level, products, services, category) {
      var displayClass = [];
   //   $rootScope.currentLevel = level;
      if (level === -1) {
          $scope.hideAllBubbles();
          $scope.showBubble('xService');
          $scope.showBubble('xProduct');
          $scope.hideBubble('small-bubble');
      } else {
        $scope.hideAllBubbles();
        $scope.showBubble('small-bubble');
        $rootScope.displayProducts = products;
        $rootScope.displayServices = services;
        $rootScope.productLevelBus = [];
        $rootScope.productLevelCat = [];
        $rootScope.serviceLevelBus = [];
        $rootScope.serviceLevelCat = [];

        if (products) {
          var results = DatabaseService.moreDetail('Products');
          console.log('cat '  + ':' + JSON.stringify(results))
          for (var i in results.cat) {
            console.log('cat ' + i + ':' + JSON.stringify(results))
            $rootScope.productLevelCat.push($rootScope.businesses[i].productCategory[level]);
            displayClass.push('productLevel'+i);
          }
          for (var i in results.bus) {
            console.log('bus ' + i + ':' + JSON.stringify(results))
            $rootScope.productLevelBus.push(results.bus[i]);
            displayClass.push('p'+i);
          }

        } else if (services) {
          for (var i in $rootScope.businesses) {
            for (var j in $rootScope.businesses[i].serviceCategory) {
              if ($rootScope.businesses[i].serviceCategory[level]) {
                if (category) {
                  if (category === $rootScope.businesses[i].serviceCategory[level-1]) {
                    if ($rootScope.businesses[i].serviceCategory[level]) {
                      if (!arrayHas($rootScope.serviceLevelCat, $rootScope.businesses[i].serviceCategory[level])) {
                        $rootScope.serviceLevelCat.push($rootScope.businesses[i].serviceCategory[level]);
                        displayClass.push('serviceLevel'+i);
                      }
                    }
                  }
                } else {
                  if (!arrayHas($rootScope.serviceLevelCat, $rootScope.businesses[i].serviceCategory[level])) {
                    $rootScope.serviceLevelCat.push($rootScope.businesses[i].serviceCategory[level]);
                    displayClass.push('serviceLevel'+i);
                  }
                }
                if (level === $rootScope.businesses[i].serviceCategory.length+1) {
                  $rootScope.serviceLevelBus.push($rootScope.businesses[i]);
                  displayClass.push('s'+i);
                }
              }
            }
          }
        }
        for (var i in displayClass) {
          $scope.showBubble(displayClass[i]);
        }
      }
    }

    $scope.setupDisplay($rootScope.currentLevel);
  });


