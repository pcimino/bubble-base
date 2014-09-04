angular.module( 'bubbleBaseApp' ).factory( 'GetDataService', function($resource) {
      return $resource( 'app/json/data.json', {}, {
      query: {
        method:'GET',
        isArray:true
      }
    } );
});

