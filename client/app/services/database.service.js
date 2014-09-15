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
console.log('Level ' + level + ' cat ' + currentCategory + ' productflag ' + $rootScope.productFlag)
      // the complexity comes from the fact that I want to handle multiple businesses under the same category, otherwise
      // drilling down into a heirarchy is pointless, everything would just be one level down
      if ($rootScope.productFlag) {
        for (var i in $rootScope.businesses) {
 console.log(' i ' + i)
          for (var j in $rootScope.businesses[i].productCategory) {
            if ($rootScope.businesses[i].productCategory[level]) {
              var pushFlag = false;
              if (level > 0 && currentCategory === $rootScope.businesses[i].productCategory[level-1]) {
                  pushFlag = true;
              } else if (level === 0) {
                  pushFlag = true;
              }
              if (pushFlag && !arrayHas(returnVal.cat, $rootScope.businesses[i].productCategory[level])) {
                returnVal.cat.push($rootScope.businesses[i].productCategory[level]);
              }
            }
          }
          if (level > 0 && level === $rootScope.businesses[i].productCategory.length && currentCategory === $rootScope.businesses[i].productCategory[level-1]) {
            returnVal.bus.push($rootScope.businesses[i]);
          }
        }
      } else {
      }
      return returnVal;
    };

    this.lessDetail = function() {
    };

  });


