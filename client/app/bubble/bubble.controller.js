'use strict';

/* TODO
    Color of the bubbles should be derived: Choose light for the intial and then progressivle darker for each level
    Position of bubbles should be dynamic, not defining bubbles and fixed div
*/
angular.module('bubbleBaseApp')
  .controller('BubbleCtrl', function ($scope, $animate, GetDataService) {

    var blueRange = ['#FFFFFF', 'E6EBFA', 'CCD6F5', 'B2C2F0', '99ADEB', '8099E6', '6685E0', '4D70DB', '335CD6', '1947D1', '#0033CC'];
    var redRange = ['#FFFFFF', 'FFE6E6', 'FFCCCC', 'FFB2B2', 'FF9999', 'FF8080', 'FF6666', 'FF4D4D', 'FF3333', 'FF1919', '#FF0000'];
    var greenRange = ['#FFFFFF', 'E6F5EB', 'CCEBD6', 'B2E0C2', '99D6AD', '80CC99', '66C285', '4DB870', '33AD5C', '19A347',  '#009933'];
    var orangeRange = ['#FFFFFF', '#FFF5EB', '#FFEBD6', '#FFE0C2', '#FFD6AD', '#FFCC99', '#FFC285', '#FFB870', '#FFAD5C', '#FFA347', '#FF9933' ];

    $scope.serviceLevel = [];
    $scope.productLevel = [];

    GetDataService.get( function( database ) {
        $scope.businesses = database.data[0].businesses;
        $scope.hideAllBubbles();
        $scope.showBubble('xService');
        $scope.showBubble('xProduct');
    } );

    $scope.hideAllBubbles = function() {
      // can't simply call hide on class 'bubble' because it will show the bubbles prior to hiding
      // so for each 'bubble' determine if it's visible, then hide
      $('.bubble').each(function() {
        if ($(this).is(':visible')) {
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

    $scope.setupServiceLevel = function(level) {
      var returnArray = [];
      for (var j in $scope.businesses) {
        var cat = $scope.businesses[j].serviceCategory[level];
        if (cat) {
          returnArray.push({category:cat, business: $scope.businesses[j]});
        }
      }
      $scope.services = returnArray;
    }
    $scope.setupProductLevel = function(level) {
      var returnArray = [];
      for (var j in $scope.businesses) {
        var cat = $scope.businesses[j].productCategory[level];
        if (cat) {
          returnArray.push({category:cat, business: $scope.businesses[j]});
        }
      }
      $scope.products = returnArray;
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

