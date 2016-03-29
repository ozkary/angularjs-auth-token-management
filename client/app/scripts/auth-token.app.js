
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
    var app = angular.module('ozkary.authtoken', ['ngRoute']);   
    app.run(['$rootScope', '$location', '$http', '$svcAuth', '$svcMsg', '$route', runApp]);
        
    function runApp($rootScope, $location, $http, $svcAuth, $svcMsg, $route) {
        $rootScope.$on('$routeChangeSuccess', function () {          
            $rootScope.route = $location.$$path;           
        });

        $rootScope.$on('$routeChangeError', function (evt, current, previous, reject) {
            evt.preventDefault();
            $svcMsg.error(reject.message);           
        });       
       
        //a way to add tokens to all requests via service
        //$http.defaults.headers.common = { 'Authorization': 'Bearer jdjs...' };

        //0g-todo 4 initialize token from storage
        //initialize any auth token already in storage
         $svcAuth.waitForAuth();              
    }      

})();




