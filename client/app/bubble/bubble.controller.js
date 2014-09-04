'use strict';
var ggg = {}
angular.module('bubbleBaseApp')
  .controller('BubbleCtrl', function ($scope, GetDataService) {

      GetDataService.get( function( database ) {
        $scope.database = database.data;
        ggg = database.data;
    } );
  });

  