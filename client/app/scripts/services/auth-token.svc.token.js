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
    var svcName = '$svcToken';
    var app = angular.module('ozkary.authtoken');
    app.factory(svcName, ['$q', '$log', '$svcAuth', svcToken]);

    /*
    *   token manager interceptor
    *
    */
    function svcToken($q, $log,$svcAuth) {
              
        var svc = {
            request: function (config) {
                addAuthHeader(config);
                return config;
            },
            response: function (response) {
                updateAuthToken(response);
                return response;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    notAuthorized();
                }
                return $q.reject(response);
            }
        }

        /**
         * updates the token that we have in storage
         */
        function updateAuthToken(res) {
            if (res && res.headers){
                var token = res.headers($svcAuth.authHeaderName);
                if (token){
                    $svcAuth.login(token);
                    $log.log('processing new token');
                    //handle the case for auto refresh due to iactivity
                }
            }            
        }
        

        /**
         * adds the auth header to the request
         */
        function addAuthHeader(config) {
            if (config) {
                config.headers[$svcAuth.authHeaderName] = $svcAuth.getAuthToken();
                $log.log('adding auth header');
            }
        }

        /**
         * handle the case when perhaps the token has expired or was not sent
         */
        function notAuthorized(response) {
           
        }
        
        return svc;
    }

})();

