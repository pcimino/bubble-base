'use strict';

angular.module('bubbleBaseApp')
  .controller('MainCtrl', function ($scope, GetConceptsService) {
    $scope.featuresList = [];

    GetConceptsService.get( function( database ) {
      alert(1)
        $scope.featuresList = database.data;
    } );
  });
