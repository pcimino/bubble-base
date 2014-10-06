'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('bubbleBaseApp'));

  var ListCtrl,
      scope,
      location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    ListCtrl = $controller('ListCtrl', {
      $scope: scope,
      $location: location
    });
  }));

  // verify controller created
  it('should be able to create the controller', inject(function($rootScope, $controller, $location) {
        expect(ListCtrl).toBeDefined();
  }));

});

