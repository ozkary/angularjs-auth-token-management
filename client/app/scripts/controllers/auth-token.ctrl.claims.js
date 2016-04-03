/*!
* Copyright 2016 ozkary.com
* http://ozkary.com/ by Oscar Garcia
* Licensed under the MIT license. Please see LICENSE for more information.
*
* ozkary.authtoken
* auth token management demo
* ozkary.com
* ver. 1.1.0
*
* Created By oscar garcia 
*
* Update/Fix History
*   ogarcia 03252016 initial implementation
*
*/

(function () {
    'use strict';

    'use strict';
    var ctrlName = 'ozkary.authtoken.ctrl.claims';
    var app = angular.module('ozkary.authtoken');
    app.controller(ctrlName, ['$svcApi', '$svcMsg', '$svcAuth', '$appSettings','$scope', ctrlClaims]);
       
    function ctrlClaims($svcApi, $svcMsg, $svcAuth, $appSettings, $scope) {
        var ctrl = this;
        ctrl.name = ctrlName;       
        $scope.identity = ctrl.identity = $svcAuth.identity;
        if (ctrl.identity) {
            ctrl.claims = ctrl.identity.appClaims;
        }
        
        ctrl.selected = null;
       
        ctrl.add = function () {
            ctrl.selected = 'app://auth-token/new-claim-here';
            ctrl.claims[ctrl.selected] = '';
        }

        ctrl.remove = function (key) {
            if(key){
                delete ctrl.claims[key];
                $svcMsg.success($appSettings.messages.removed);
            }
        }

        ctrl.save = function () {
           //todo server update - demo only
           $svcMsg.success($appSettings.messages.updated);            
        }

        ctrl.edit = function (key) {
           
            if (ctrl.selected === key) {
                ctrl.selected = null;
                return;
            }

            if (key) {                            
                ctrl.selected = key;
            }            
        }

        /**
         * provides a scope variable to scope mapping
         */
        ctrl.claimMapping = function () {
            ctrl.updateAccess = false;
            ctrl.deleteAccess = false;
            var mapping = {};
            mapping['updateAccess'] = 'app://auth-token/claims/update';
            mapping['deleteAccess'] = 'app://auth-token/claims/delete';
            return mapping;
        }

        ctrl.claimResults = function (claims) {
            ctrl.updateAccess = claims['updateAccess'];
            ctrl.deleteAccess = claims['deleteAccess'];
        }

        /**
         * option to use controller to handle the auth of claims
         */
        function initClaims() {
            var claims = ctrl.claimMapping();           
            if (claims && typeof (claims) === 'object') {
                for (var item in claims) {                    
                    var claim = claims[item];
                    var result = $svcAuth.hasClaim(claim);
                    claims[item] = result;
                }
                ctrl.claimResults(claims);
            }
        }

        //initClaims();//todo-auth  use controller instead of directive	
    }
   
})();
      