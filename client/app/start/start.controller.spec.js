'use strict';

describe('Controller: StartCtrl', function () {

  // load the controller's module
  beforeEach(module('bubbleBaseApp'));

  var StartCtrl,
      scope,
      $location,
      GetSlidesService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();

    GetSlidesService = {
      get: function() { return [{'data':'data'}]}
    };
    StartCtrl = $controller('StartCtrl', {
      $scope: scope,
      $location: $location,
      GetSlidesService: GetSlidesService
    });
  }));

  // verify controller created
  it('should be able to create the controller', inject(function($rootScope, $controller, $location, GetSlidesService) {
        expect(StartCtrl).toBeDefined();
  }));
});
