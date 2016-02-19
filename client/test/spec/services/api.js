'use strict';

describe('Service: $svcApi', function () {

  // load the controller's module
    beforeEach(module('ozkary.authtoken'));

    var svcApi,
    scope;

  // Initialize the service and a mock scope
  beforeEach(inject(function (_$svcApi_) {
      svcApi = _$svcApi_;
  }));

  it('name should be svcApi', function () {
      expect(svcApi.name).toBe('$svcApi');
  });
});
