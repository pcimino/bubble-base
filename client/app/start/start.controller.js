'use strict';

angular.module('bubbleBaseApp')
  .controller('StartCtrl', function ($scope, $location, GetSlidesService) {

    $scope.slides = [];
    $scope.slideNumber = 0;

    GetSlidesService.get( function( database ) {
        $scope.slides = database.data;
    } );

    $scope.nextSlide = function() {
      $scope.slideNumber++;
      if ($scope.slideNumber >= $scope.slides.length) {
        $location.path('/bubble');
      }
    }
    $scope.previousSlide = function() {
      $scope.slideNumber--;
      if ($scope.slideNumber < 0) {
        $scope.slideNumber = 0;
      }
    }
  });


