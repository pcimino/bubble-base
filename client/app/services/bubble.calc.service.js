/*
  Business logic for displaying the correct level of bubbles
*/
'use strict';
angular.module('bubbleBaseApp').factory('BubbleCalcService', function(SharedProperties) {
    var calcService = {};

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

    calcService.moreDetail = function(currentCategory) {
      var returnVal = {'cat':[], 'bus':[]};
      var data = SharedProperties.getBlob();

      if (undefined === data.currentLevel) {
        data.currentLevel = -1;
      }
      if (undefined === data) {
        data = [];
      }
      if (undefined === data.history) {
        data.history = [];
      }
      data.history.push(currentCategory);
      if ('Products' === currentCategory) {
        data.productFlag = true;
      } else if ('Services' === currentCategory) {
        data.productFlag = false;
      }

      var level = data.currentLevel;
      // the complexity comes from the fact that I want to handle multiple businesses under the same category, otherwise
      // drilling down into a heirarchy is pointless, everything would just be one level down

      for (var i in data.businesses) {
        var business = data.businesses[i];
        var categoryArray = business.serviceCategory;
        if (data.productFlag) {
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
            returnVal.cat.push({'cat':categoryArray[level], 'count': getBusinessCount(data.businesses, data.productFlag, categoryArray[level])});
          }

        }
        if (level > 0 && level === categoryArray.length && currentCategory === categoryArray[level-1]) {
          returnVal.bus.push(business);
        }
      }
      SharedProperties.setBlob(data);
      return returnVal;
    };

    return calcService;
});
