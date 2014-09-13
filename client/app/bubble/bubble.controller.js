'use strict';
var ggg = {};
/* TODO
    Color of the bubbles should be derived: Choose light for the intial and then progressivle darker for each level
    Position of bubbles should be dynamic, not defining bubbles and fixed div
*/
angular.module('bubbleBaseApp')
  .controller('BubbleCtrl', function ($scope, $rootScope, GetDataService, StorageService) {

    var blueRange = ['CCD6F5', '99ADEB', '6685E0', '335CD6', '0033CC'];
    var redRange = ['FFCCCC', 'FFB2B2', 'FF9999', 'FF8080', 'FF6666', 'FF4D4D', 'FF3333', 'FF1919', 'FF0000'];
    var greenRange = ['01DF01', '04B404', '088A08', '0B610B', '0B3B0B', '003300'];
    var orangeRange = ['FFEBD6', 'FFE0C2', 'FFD6AD', 'FFCC99', 'FFC285', 'FFB870', 'FFAD5C', 'FFA347', 'FF9933' ];


    $scope.lessDetail = function() {
      $scope.setupDisplay($rootScope.currentLevel-1, $rootScope.displayProducts, $rootScope.displayServices);
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
      console.log(bubbleClass)
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

    // Pretty much wrong, setting up bubbles and data statically
    // in the real world bubbles would be rendered as needed
    // and each click would run a search
    // flattening the data so only need one ng-repeat
    $scope.setupServiceLevel = function() {
      // businesses persisted in address book
      var businessList = StorageService.getAddressBook();
      var serviceTree = [];
      for (var k = 0; k < 15; k++) serviceTree.push({'cat':[], 'bus':[] });
      for (var i in $rootScope.businesses) {
        for (var j in $rootScope.businesses[i].serviceCategory) {
          if (!arrayHas(serviceTree[j].cat, $rootScope.businesses[i].serviceCategory[j])) {
            serviceTree[j].cat.push($rootScope.businesses[i].serviceCategory[j]);
          }
        }
        var category = $rootScope.businesses[i].serviceCategory[j];
        $rootScope.businesses[i].lastServiceCat = category;
        j++;
        serviceTree[j].bus.push($rootScope.businesses[i]);
      }

      $rootScope.serviceTree = serviceTree;
    }
    $scope.setupProductLevel = function(level) {
     // businesses persisted in address book
      var businessList = StorageService.getAddressBook();
      var productTree = [];
      for (var k = 0; k < 15; k++) productTree.push({'cat':[], 'bus':[] });
      for (var i in $rootScope.businesses) {
        for (var j in $rootScope.businesses[i].productCategory) {
          if (!arrayHas(productTree[j].cat, $rootScope.businesses[i].productCategory[j])) {
            productTree[j].cat.push($rootScope.businesses[i].productCategory[j]);
          }
        }
        var category = $rootScope.businesses[i].productCategory[j];
        $rootScope.businesses[i].lastServiceCat = category;
        j++;
        productTree[j].bus.push($rootScope.businesses[i]);
      }

      $rootScope.productTree = productTree;
    }

    var isInList = function(businessList, business) {
      for (var i in businessList) {
        if (businessList[i].id === business.id) return true;
      }
      return false;
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
      GetDataService.get( function( database ) {
          $rootScope.businesses = database.data[0].businesses;
          $scope.setupServiceLevel();
          $scope.setupProductLevel();
      } );
    }
    $scope.setupDisplay = function(level, products, services) {
      var displayClass = [];

      $rootScope.currentLevel = level;
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

        if (products) {
          $rootScope.productLevelBus = [];
          $rootScope.productLevelCat = $rootScope.productTree[level].cat;

          for (var i in $rootScope.productTree[level+1].bus) {
            if (arrayHas($rootScope.productLevelCat, $rootScope.productTree[level+1].bus[i])) {
              $rootScope.productLevelBus.push($rootScope.productTree[level+1].bus[i]);
              displayClass.push('p'+i);
            }
          }
          for (var i in $rootScope.productLevelCat) {
            displayClass.push('productLevel'+i);
          }
        } else if (services) {
          $rootScope.serviceLevelBus = [];
          $rootScope.serviceLevelCat = $rootScope.serviceTree[level].cat;
          for (var i in $rootScope.serviceTree[level+1].bus) {
            if (arrayHas($rootScope.serviceLevelCat, $rootScope.serviceTree[level+1].bus[i].lastServiceCat)) {
              $rootScope.serviceLevelBus.push($rootScope.serviceTree[level+1].bus[i]);
              displayClass.push('s'+i);
            }
          }
          for (var i in $rootScope.serviceLevelCat) {
            displayClass.push('serviceLevel'+i);
          }
        }

        for (var i in displayClass) {
          $scope.showBubble(displayClass[i]);
        }
      }
    }

    $scope.setupDisplay($rootScope.currentLevel);
  });

