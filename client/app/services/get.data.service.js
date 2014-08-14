angular.module( 'bubbleBaseApp' ).factory( 'GetDataService', function($resource) {
  console.log(3)

      return $resource( 'app/json/data.json', {}, {
      query: {
        method:'GET',
        isArray:true
      }
    } );
});
