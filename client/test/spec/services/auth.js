'use strict';

describe('Service: $svcAuth', function () {

  // load the controller's module
    beforeEach(module('ozkary.authtoken'));

  var svcAuth,
    scope;

  // Initialize the service and a mock scope
  beforeEach(inject(function (_$svcAuth_) {
      svcAuth = _$svcAuth_;
  }));

  it('name should be ozkary.authtoken.svc.auth', function () {
      expect(svcAuth.name).toBe('$svcAuth');
  });
});
