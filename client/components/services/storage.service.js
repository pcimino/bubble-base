/*
  Utility service for getting/setting session storage

  Operations

    getBusinesses : retrieves the array of business objects form session storage

    setBusinesses : Stores an array of business objects in session stlorage
      @arg [] businesses

*/
angular.module('bubbleBaseApp').service('StorageService',
  function($window) {
    'use strict';
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
    }
    this.setByKey = function(key, objectArray) {
      $window.sessionStorage.setItem(key, JSON.stringify(objectArray));
    }
  });
