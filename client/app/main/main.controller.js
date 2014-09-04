'use strict';

angular.module('bubbleBaseApp')
  .controller('MainCtrl', function ($scope, $http, GetConceptsService) {
    $scope.featuresList = [];

    GetConceptsService.get( function( database ) {
        $scope.featuresList = database.data;
        ggg = featuresList.data;
    } );
  });
