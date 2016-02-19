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
    var svcName = '$svcAuth';
    var app = angular.module('ozkary.authtoken');
    app.factory(svcName, ['$q', '$http', '$appSettings', '$window',svcAuth]);

    function svcAuth($q, $http, $appSettings, $window) {
        
        var baseUrl = $appSettings.apiUrl;
        var svc = {
            name: svcName,
            identity: null,
            isAuth: isAuthenticated,
            login: login,
            token:null
        }


        /**
         * login the user
         * @param {type} user
         * @returns {type} 
         */
        function login(user) {
            var deferred = $q.defer();
            var url = baseUrl + '/login';
            $http.post(url, user).then(function (resp) {
                var token = resp.headers($appSettings.http.header);
                processToken(token);
                var status = resp.data;
                deferred.resolve(status);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        /**
         * validates if the identity has been set
         * @returns {type} 
         */
        function isAuthenticated() {
            return svc.identity != null;
        }

        /**
         * processing token with format header.payload.signature
         * @param {type} token
         */
        function processToken(token) {
            if (token){
                var payload = token.split('.')[1];      //get the payload
                svc.identity = JSON.parse($window.atob(payload));    //payload with claims
                saveToken(token);
            }            
        }

        function saveToken(token) {
            svc.token = token;
        }

        return svc;
    }

})();

