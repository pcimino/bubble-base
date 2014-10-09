'use strict';
describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('bubbleBaseApp'));

  var ListCtrl,
      scope,
      location,
      sharedProperties;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, SharedProperties) {
    scope = $rootScope.$new();
    location = $location;
    sharedProperties = SharedProperties;
    sharedProperties.setBlob({
      businesses: [
        { "id": "x0" },
        { "id": "x1", addressBook : true }
      ]
    });

    ListCtrl = $controller('ListCtrl', {
      $scope: scope,
      $location: location,
      SharedProperties: sharedProperties
    });
  }));

  // verify controller created
  it('should be able to create the controller', inject(function($rootScope, $controller) {
    expect(ListCtrl).toBeDefined();
    expect(scope.data.businesses.length).toBe(2);
  }));

  // verify address list functionality
  it('Address list should contain only the businesses with a true flag', inject(function($rootScope, $controller) {
    expect(scope.addressList.length).toBe(1);

    // this test came about because I wasn't clearing the addressList before building the list
    $rootScope.$broadcast('event_address_update', sharedProperties.getBlob());
    expect(scope.addressList.length).toBe(1);
    expect(scope.addressList[0].id).toBe("x1");
  }));

  // verify nav
    it('should be able redirect to /bubble', inject(function($rootScope, $controller) {
      expect(location.path()).toBe('/');
      scope.search();
      scope.$apply();
      expect(location.path()).toBe('/bubble');
  }));

});

