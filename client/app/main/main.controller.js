'use strict';

angular.module('bubbleBaseApp')
  .controller('MainCtrl', function ($scope, GetConceptsService) {
    $scope.featuresList = [];

    GetConceptsService.get( function( database ) {
        $scope.featuresList = database.data;
    } );

  });

