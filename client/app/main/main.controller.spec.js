'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bubbleBaseApp'));

  var MainCtrl,
      scope,
      mockGetConceptsService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, GetConceptsService) {
      mockGetConceptsService = GetConceptsService;
      spyOn(mockGetConceptsService, 'get').andCallFake(
        function() {
          scope.featuresList = [{'data':'mockReturnValue'}];
        });

      scope = $rootScope.$new();

      MainCtrl = $controller('MainCtrl', {
        $scope: scope,
        GetConceptsService: mockGetConceptsService
      });

  }));

  it('should be able to create the controller', inject(function($rootScope, $controller) {
        expect(MainCtrl).toBeDefined();
  }));

  it('should have defined features', inject(function($rootScope, $controller) {
        expect(scope.featuresList).toBeDefined();
        expect(scope.featuresList.length).toBe(1);
  }));
});
