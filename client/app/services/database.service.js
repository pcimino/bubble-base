/*
  Dummy database service

  Operations

    initializeDatabase : Hmm, a bit kludgey. remember the concept here isn't about data storage/retrieval, but the presentation

    moreDetail : Walk the tree for more details
    @param: Category

    lessDetail : Walk backwards through category selections


*/
angular.module('bubbleBaseApp').service('DatabaseService',
  function($window, $rootScope, GetDataService, SharedProperties) {
    'use strict';

    // initialize the history
    var $scope = $rootScope.$new();
    $scope.data = {};

    // load the data from the flatfile into memory
    this.initializeDatabase = function() {
      GetDataService.get( function( database ) {
        $scope.data.businesses = database.data[0].businesses;
        $scope.data.history = [];
        $scope.data.productCount = 0;
        $scope.data.serviceCount = 0;
        $scope.data.currentLevel = -1;

        for (var i in $scope.data.businesses) {
          if ($scope.data.businesses[i].productCategory.length > 0) {
            $scope.data.productCount++;
          }
          if ($scope.data.businesses[i].serviceCategory.length > 0) {
            $scope.data.serviceCount++;
          }
        }
        SharedProperties.setBlob($scope.data);
      } );
    };

    // TODO set this up as a prototype on array
    var arrayHas = function(testArray, v) {
      for (var i = 0; i < testArray.length; i++) {
        if (testArray[i] === v) {
          return true;
        }
      }
      return undefined;
    };
    var arrayHasCat = function(testArray, v) {
      for (var i = 0; i < testArray.length; i++) {
        if (testArray[i].cat === v) {
          return true;
        }
      }
      return undefined;
    };

    var getBusinessCount = function(businesses, productFlag, cat) {
      var count = 0;
      for (var i in businesses) {
        if (productFlag) {
          if (arrayHas(businesses[i].productCategory, cat)) {
            count++;
          }
        } else {
          if (arrayHas(businesses[i].serviceCategory, cat)) {
            count++;
          }
        }
      }
      return count;
    };

    this.moreDetail = function(currentCategory) {
      var returnVal = {'cat':[], 'bus':[]};
      $scope.data = SharedProperties.getBlob();

      if (undefined === $scope.data.currentLevel) {
        $scope.data.currentLevel = -1;
      }
      if (undefined === $scope.data) {
        $scope.data = [];
      }
      $scope.data.history.push(currentCategory);
      if ('Products' === currentCategory) {
        $rootScope.productFlag = true;
      } else if ('Services' === currentCategory) {
        $rootScope.productFlag = false;
      }

      var level = $scope.data.currentLevel;
      // the complexity comes from the fact that I want to handle multiple businesses under the same category, otherwise
      // drilling down into a heirarchy is pointless, everything would just be one level down

      for (var i in $scope.businesses) {
        var business = $scope.businesses[i];
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
          if (pushFlag && !arrayHasCat(returnVal.cat, categoryArray[level])) {
            returnVal.cat.push({'cat':categoryArray[level], 'count': getBusinessCount($scope.data.businesses, $rootScope.productFlag, categoryArray[level])});
          }

        }
        if (level > 0 && level === categoryArray.length && currentCategory === categoryArray[level-1]) {
          returnVal.bus.push(business);
        }
      }
      SharedProperties.setBlob($scope.data);
      return returnVal;
    };

  });






