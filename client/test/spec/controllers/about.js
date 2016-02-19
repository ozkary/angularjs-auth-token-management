'use strict';

describe('Controller: ozkary.authtoken.ctrl.about', function () {

  // load the controller's module
    beforeEach(module('ozkary.authtoken'));

  var ctrlAbout,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrlAbout = $controller('ozkary.authtoken.ctrl.about', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('name should be ozkary.authtoken.ctrl.about', function () {
      expect(ctrlAbout.name).toBe('ozkary.authtoken.ctrl.about');
  });
});
