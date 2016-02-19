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

(function () {
    'use strict';

    'use strict';
    var ctrlName = 'ozkary.authtoken.ctrl.about';
    var app = angular.module('ozkary.authtoken');
    app.controller(ctrlName, ['$svcApi', '$svcMsg', '$svcAuth', ctrlAbout]);
       
    function ctrlAbout($svcApi, $svcMsg, $svcAuth) {
        var ctrl = this;
        ctrl.name = ctrlName;
        ctrl.user = null;
        ctrl.identity = $svcAuth.identity;

        ctrl.profile = function () {
            $svcApi.about().then(function (resp) {
                ctrl.user = resp.data;
                $svcMsg.success();
            }, function (err) {
                var msg = err.data.text;
                $svcMsg.error(msg);
            });
        }

        ctrl.ping = function () {

            $svcApi.ping().then(function (resp) {
                var msg = resp.data.text;
                $svcMsg.success(msg);
            }, function (err) {
                var msg =err.data.text;
                $svcMsg.error(msg);
            });
        }
	
    }
   
})();
      