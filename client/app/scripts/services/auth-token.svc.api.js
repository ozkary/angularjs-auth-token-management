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
    app.factory(svcName, ['$http', '$appSettings', svcApi]);

    function svcApi($http,$appSettings) {
        var baseUrl = $appSettings.apiUrl;
        var svc = {
            name: svcName,
            ping: ping,          
            about: about,
            token:token
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
            var promise = $http.get(url);
            return promise;
        }

        return svc;
    }

})();

