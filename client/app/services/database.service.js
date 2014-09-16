/*
  Dummy database service

  Operations

    initializeDatabase : Hmm, a bit kludgey. remember the concept here isn't about data storage/retrieval, but the presentation



*/
angular.module('bubbleBaseApp').service('DatabaseService',
  function($window, $rootScope, GetDataService) {
    'use strict';
    // load the data from the flatfile into memory
    this.initializeDatabase = function() {
      GetDataService.get( function( database ) {
          $rootScope.businesses = database.data[0].businesses;
      } );
    };

    // TODO set this up as a prototype on array
    var arrayHas = function(testArray, v){
      for (var i = 0; i < testArray.length; i++) {
        if (testArray[i] === v) {
          return true;
        }
      }
      return undefined;
    }

    this.moreDetail = function(currentCategory) {
      var returnVal = {'cat':[], 'bus':[]};
      if (undefined == $rootScope.currentLevel) {
        $rootScope.currentLevel = -1;
      }
      $rootScope.parentCategory = currentCategory;
      if ('Products' === currentCategory) {
        $rootScope.productFlag = true;
      } else if ('Services' === currentCategory) {
        $rootScope.productFlag = false;
      }
      $rootScope.currentLevel++;
      var level = $rootScope.currentLevel;
      // the complexity comes from the fact that I want to handle multiple businesses under the same category, otherwise
      // drilling down into a heirarchy is pointless, everything would just be one level down

      for (var i in $rootScope.businesses) {
        var business = $rootScope.businesses[i];
        var categoryArray = business.serviceCategory;
        if ($rootScope.productFlag) {
          categoryArray = business.productCategory;
        }
        if (categoryArray[level]) {
          var pushFlag = false;
          if (level > 0 && currentCategory === categoryArray[level-1]) {
            pushFlag = true;
          } else if (level === 0) {
            pushFlag = true;
          }
          if (pushFlag && !arrayHas(returnVal.cat, categoryArray[level])) {
            returnVal.cat.push(categoryArray[level]);
          }

        }
        if (level > 0 && level === categoryArray.length && currentCategory === categoryArray[level-1]) {
          returnVal.bus.push(business);
        }
      }

      return returnVal;
    };

    this.lessDetail = function() {
    };

  });




