'use strict';
angular.module( 'bubbleBaseApp' ).factory( 'GetDataService', function($resource) {
      return $resource( 'app/json/data.json', {}, {
      query: {
        method:'GET',
        isArray:true
      }
    } );
}).factory( 'GetConceptsService', function($resource) {
      return $resource( 'app/json/concepts.json', {}, {
      query: {
        method:'GET',
        isArray:true
      }
    } );
}).factory( 'GetSlidesService', function($resource) {
      return $resource( 'app/json/slides.json', {}, {
      query: {
        method:'GET',
        isArray:true
      }
    } );
}).service('ColorRangeService',
  function() {
    this.getBlueRange = function() {
      return ['CCD6F5', '99ADEB', '6685E0', '335CD6', '0033CC'];
    };
    this.getGreenRange = function() {
      return ['01DF01', '04B404', '088A08', '0B610B', '0B3B0B', '003300'];
    };
});

// var redRange = ['FFCCCC', 'FFB2B2', 'FF9999', 'FF8080', 'FF6666', 'FF4D4D', 'FF3333', 'FF1919', 'FF0000'];
// var orangeRange = ['FFEBD6', 'FFE0C2', 'FFD6AD', 'FFCC99', 'FFC285', 'FFB870', 'FFAD5C', 'FFA347', 'FF9933' ];
