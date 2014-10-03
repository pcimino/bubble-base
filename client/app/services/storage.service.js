/*
  Utility service for getting/setting session storage

  Operations

    getBusinesses : retrieves the array of business objects form session storage

    setBusinesses : Stores an array of business objects in session stlorage
      @arg [] businesses

    this is a hack for a hack: Was using rootScope for everything to expedite development
    using storage is slightly better in that it divorces the controlelr from the rootScope
    getDataBlob : retrieves the pseudo global datas store

    setDataBlob : Stores an array of business objects in session stlorage
      @arg {} blobby[] businesses
*/
angular.module('bubbleBaseApp').service('StorageService',
  function($window) {
    'use strict';
    // get data blob
    this.getDataBlob = function() {
      return this.getByKey('dataBlob');
    };
    // store blob
    this.setDataBlob = function(blobby) {
      this.setByKey('dataBlob', blobby);
    };

    // get all businesses
    this.getAddressBook = function() {
      return this.getByKey('businesses');
    };
    // store business info
    this.setAddressBook = function(businesses) {
      this.setByKey('businesses', businesses);
    };

    // generic helpers
    this.getByKey = function(key) {
      var resultArray = JSON.parse($window.sessionStorage.getItem(key));
      if (null === resultArray) {
        resultArray = {list:[]};
        this.setByKey(key, resultArray);
      }
      return resultArray;
    };
    this.setByKey = function(key, objectArray) {
      $window.sessionStorage.setItem(key, JSON.stringify(objectArray));
    };
  }).service('SharedProperties', function ($rootScope) {
    // not really happy about this. Pushing global data around with various solutions
    // tying the emit into it at least notifies the listening services
    var blob = {};

    return {
      getBlob: function () {
        return blob;
      },
      setBlob: function(value, broadcast_event) {
        var event = broadcast_event;
        if (undefined === event) {
          event = 'shared_data_update';
        }
        blob = value;
        $rootScope.$broadcast(event, blob);
      }
    };
  });

