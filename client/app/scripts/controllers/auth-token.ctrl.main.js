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
    var ctrlName = 'ozkary.authtoken.ctrl.main';
    var app = angular.module('ozkary.authtoken'); 
    app.controller(ctrlName, ['$svcApi', '$svcMsg', '$svcAuth','$interval', ctrlMain]);
	
    function ctrlMain($svcApi, $svcMsg, $svcAuth, $interval) {
        var ctrl = this;
        this.name = ctrlName;
        ctrl.user = {};
        ctrl.identity = $svcAuth.identity;           

        ctrl.login = function () {

            $svcApi.login(ctrl.user).then(function (auth) {
                $svcMsg.success(auth);
                ctrl.identity = $svcAuth.identity;
                             
            }, function (err) {
                $svcMsg.error(err);
            });
        }

        ctrl.logout = function () {
            $svcAuth.logout();
            ctrl.identity = $svcAuth.identity;
        }
        
        ctrl.ping = function () {

            $svcApi.ping().then(function (resp) {
                var msg = resp.data.text;
                $svcMsg.success(msg);
            }, function (err) {
                var msg = err.data.text;
                $svcMsg.error(msg);              
           });
        }

        ctrl.token = function () {

            $svcApi.token().then(function (resp) {
                var msg = resp.data.text;
                $svcMsg.success(msg);
            }, function (err) {
                var msg = err.data.text;
                $svcMsg.error(msg);
            });
        }
    } 
   
})();
      
