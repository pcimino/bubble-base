'use strict';

describe('Controller: StartCtrl', function () {

  // load the controller's module
  beforeEach(module('bubbleBaseApp'));

  var StartCtrl,
      scope,
      location,
      mockGetSlidesService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, GetSlidesService) {
    scope = $rootScope.$new();
    location = $location;

    mockGetSlidesService = GetSlidesService;
    spyOn(mockGetSlidesService, 'get').andCallFake(
        function() {
          scope.slides = [
            { 'id': 'slide0' },
            { 'id': 'slide1' },
            { 'id': 'slide2' },
            { 'id': 'slide3' }
          ];
        });

    StartCtrl = $controller('StartCtrl', {
      $scope: scope,
      $location: location,
      GetSlidesService: mockGetSlidesService
    });
  }));

  // verify controller created
  it('should be able to create the controller', inject(function($rootScope, $controller) {
    expect(StartCtrl).toBeDefined();
    expect(scope.slideNumber).toBe(0);
    expect(scope.nextLabel).toBe('Next');
    expect(scope.slides.length).toBe(4);
  }));
  // verify next
  it('should be able to move through the slides', inject(function($rootScope, $controller) {
    scope.nextSlide();
    expect(scope.slideNumber).toBe(1);
    expect(scope.nextLabel).toBe('Next');

    scope.previousSlide();
    expect(scope.slideNumber).toBe(0);

    // can't move backwards past slide
    scope.previousSlide();
    expect(scope.slideNumber).toBe(0);
  }));
  // verify last slide
  it('last slide should change label', inject(function($rootScope, $controller) {
    scope.slideNumber = scope.slides.length - 2;
    scope.nextSlide();
    expect(scope.slideNumber).toBe(scope.slides.length - 1);
    expect(scope.nextLabel).toBe('Demo');
  }));
  // verify nav
  it('move past last slide should change url', inject(function($rootScope, $controller) {
    scope.slideNumber = scope.slides.length - 1;
    expect(location.path()).toBe('/');
    scope.nextSlide();
    scope.$apply();
    expect(location.path()).toBe('/bubble');
  }));
});
