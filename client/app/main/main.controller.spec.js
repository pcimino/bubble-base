'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bubbleBaseApp'));

  var MainCtrl,
      scope,
      GetConceptsService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, GetConceptsService) {
      spyOn(GetConceptsService, 'get').andReturn([{'data':'mockReturnValue'}]);

      scope = $rootScope.$new();

      MainCtrl = $controller('MainCtrl', {
        $scope: scope,
        GetConceptsService: GetConceptsService
      });

  }));

  it('should be able to create the controller', inject(function($rootScope, $controller, GetConceptsService) {
        expect(MainCtrl).toBeDefined();
  }));

  it('should have defined features', inject(function($rootScope, $controller, GetConceptsService) {
        expect(scope.featuresList).toBeDefined();
        expect(scope.featuresList.length).toBe(1);
  }));
});

