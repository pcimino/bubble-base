'use strict';

angular.module('bubbleBaseApp')
  .controller('StartCtrl', function ($scope, $location, GetSlidesService) {

    $scope.slides = [];
    $scope.slideNumber = 0;
    $scope.nextLabel = "Next";
    $scope.nextColor = '#04B404';
    GetSlidesService.get( function( database ) {
        $scope.slides = database.data;
    } );

    var update = function() {
      if ($scope.slideNumber === $scope.slides.length-1) {
        $scope.nextLabel = "Demo";
        $scope.nextColor = '#FF0000';
      } else {
        $scope.nextLabel = "Next";
        $scope.nextColor = '#04B404';
      }
    };

    $scope.nextSlide = function() {
      $scope.slideNumber++;
      if ($scope.slideNumber >= $scope.slides.length) {
        $location.path('/bubble');
      } else {
        update();
      }
    };

    $scope.previousSlide = function() {
      $scope.slideNumber--;
      if ($scope.slideNumber < 0) {
        $scope.slideNumber = 0;
      }
      update();
    };

  });


