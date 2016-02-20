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
    var svcName = '$svcApi';
    var app = angular.module('ozkary.authtoken');
    app.factory(svcName, ['$q','$http', '$appSettings','$svcAuth', svcApi]);

    function svcApi($q,$http, $appSettings, $svcAuth) {
        var baseUrl = $appSettings.apiUrl;
        var svc = {
            name: svcName,
            ping: ping,          
            about: about,
            token: token,
            login:login
        }

        /**
         * open api no token needed
         * @returns {type} 
         */
        function ping() {
            var url = baseUrl + '/ping';
            var promise = $http.get(url);
            return promise;
        }

        /**
         * checks if token is valid
         * @returns {type} 
         */
        function token() {
            var url = baseUrl + '/token';
            var promise = $http.get(url);
            return promise;
        }

        /**
         * gets the user profile
         * @returns {type} 
         */
        function about() {
            var url = baseUrl + '/about';
            var header = {};

            //example of how it can be done for a single request
            //var header = { headers: { 'Authorization': 'Bearer  jdjs...' } };
            var header = {};
            //0g-todo 1 add header to single request
            header['headers'] = $svcAuth.getAuthHeader();
            var promise = $http.get(url, header);

            return promise;
        }

        /**
         * handles the login api
         * @param {type} user
         * @returns {type} 
         */
        function login(user) {            
            var deferred = $q.defer();
            var url = baseUrl + '/login';

            $http.post(url, user).then(function (resp) {
                var token = resp.headers($appSettings.http.header);
                $svcAuth.login(token);

                //0g-todo 2 add header globally
                //configuring a global way to set the token after login
                $http.defaults.headers.common = $svcAuth.getAuthHeader();

                var status = resp.data;
                deferred.resolve(status);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return svc;
    }

})();

