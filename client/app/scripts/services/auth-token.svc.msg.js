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
    var svcName = '$svcMsg';
    var app = angular.module('ozkary.authtoken');
    app.factory(svcName, ['$http','$appSettings', '$timeout','$rootScope',svcApi]);

    function svcApi($http, $appSettings, $timeout, $rootScope) {
        var baseUrl = $appSettings;
        var svc = {
            name: svcName,
            success: success,
            error:error
        }

        function success(msg) {
            var message = msg || $appSettings.messages.success;            
            showSimpleToast('#toastok', msg);
        }

        function error(msg) {           
            
            showSimpleToast('#toastfail', msg);           
        }

        /**
         * simple toast implementation
         * @param {type} id
         * @param {type} msg
         */
        function showSimpleToast(id, msg) {
            console.log(msg);
            $rootScope.message = msg;
            $(id).modal();

            $timeout(function () {
                $(id).modal('hide');
            },2000)
        }
       

        return svc;
    }

})();

