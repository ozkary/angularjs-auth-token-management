(function () {
    'use strict';
    /*!
    * Copyright 2016 ozkary.com
    * http://ozkary.com/ by Oscar Garcia
    * Licensed under the MIT license. Please see LICENSE for more information.
    *
    * ozkary.authtoken
    * auth token management demo
    * ozkary.com
    * ver. 1.0.0
    *
    * Created By oscar garcia 
    *
    * Update/Fix History
    *   ogarcia 02162016 initial implementation
    *
    */

    'use strict';
    var name = 'authorize';
    var app = angular.module('ozkary.authtoken');
    app.directive(name, ['$svcAuth', dirAuthorize]);    

    function dirAuthorize($svcAuth) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, elem, attrs, control) {
                var watch = function () {
                    //get the claim value
                    var claim = attrs.authorize;
                    $svcAuth.hasClaim(claim).then(function (result) {
                        if (!result) {
                            elem.hide();
                        }
                    });
                };

                watch();
            }
        };
    };

})();

