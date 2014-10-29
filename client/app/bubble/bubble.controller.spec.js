'use strict';

describe('Controller: BubbleCtrl', function () {

  // load the controller's module
  beforeEach(module('bubbleBaseApp'));

  var BubbleCtrl,
      scope,
      location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, StorageService, DatabaseService, ngDialog, ColorRangeService, SharedProperties) {
    scope = $rootScope.$new();
    location = $location;
    BubbleCtrl = $controller('BubbleCtrl', {
      $scope: scope,
      $location: location,
      StorageService: StorageService,
      DatabaseService: DatabaseService,
      ngDialog: ngDialog,
      ColorRangeService: ColorRangeService,
      SharedProperties: SharedProperties
    });
  }));

  // verify controller created
  it("should be able to create the controller", inject(function($rootScope, $controller, $location) {
        expect(BubbleCtrl).toBeDefined();
  }));
});
