/*
  Dummy database service

  Operations

    initializeDatabase : Hmm, a bit kludgey. remember the concept here isn't about data storage/retrieval, but the presentation

    moreDetail : Walk the tree for more details
    @param: Category

    lessDetail : Walk backwards through category selections


*/
angular.module('bubbleBaseApp').service('DatabaseService',
  function(GetDataService, SharedProperties, BubbleCalcService) {
    'use strict';

    // load the data from the flatfile into memory
    this.initializeDatabase = function() {
      GetDataService.get( function( database ) {
        var data = {};
        data.businesses = database.data[0].businesses;
        data.history = [];
        data.productCount = 0;
        data.serviceCount = 0;
        data.currentLevel = -1;

        for (var i in data.businesses) {
          if (data.businesses[i].productCategory.length > 0) {
            data.productCount++;
          }
          if (data.businesses[i].serviceCategory.length > 0) {
            data.serviceCount++;
          }
        }
        SharedProperties.setBlob(data);
      } );
    };

    this.moreDetail = function(currentCategory) {
      return BubbleCalcService.moreDetail(currentCategory);
    };
  });





