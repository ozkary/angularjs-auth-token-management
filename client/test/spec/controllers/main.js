'use strict';

describe('Controller: ozkary.authtoken.ctrl.main', function () {

  // load the controller's module
    beforeEach(module('ozkary.authtoken'));

    var ctrlMain,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrlMain = $controller('ozkary.authtoken.ctrl.main', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('name should be ozkary.authtoken.ctrl.main', function () {
      expect(ctrlMain.name).toBe('ozkary.authtoken.ctrl.main');
  });
});
