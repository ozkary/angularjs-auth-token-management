
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
    app.config(['$routeProvider', '$httpProvider', appConfig]);
    app.run(['$rootScope', '$location', '$http', '$svcAuth', runApp]);

    var appSettings = {
        apiUrl: 'http://localhost:3001/api',
        http: { header: 'Authorization', token: 'Bearer ' },
        messages: {success:'You have access', noAccess:'No Access'}
    }
    app.constant('$appSettings', appSettings);
       
    function runApp($rootScope, $location, $http, $svcAuth) {
        $rootScope.$on('$locationChangeSuccess', function () {          
            $rootScope.route = $location.$$path;           
        });
       
        //a way to add tokens to all requests via service
        //$http.defaults.headers.common = { 'Authorization': 'Bearer jdjs...' };

        //initialize any auth token already in storage
        $svcAuth.waitForAuth();              
    }
   
    function appConfig($routeProvider, $httpProvider) {
        $routeProvider
          .when('/', {
              templateUrl: 'views/main.html',
              controller: 'ozkary.authtoken.ctrl.main',
              controllerAs: 'ctrl'
          })
          .when('/about', {
              templateUrl: 'views/about.html',
              controller: 'ozkary.authtoken.ctrl.about',
              controllerAs: 'ctrl'
          })
          .otherwise({
              redirectTo: '/'
          });

        //add token interceptor
        //$httpProvider.interceptors.push('$svcToken');

        //a way to add tokens to all requests via provider
        //$httpProvider.defaults.headers.common = { 'Authorization': 'Bearer jdjs...' };
        
        ////or just post 
        //$httpProvider.defaults.headers.post = { 'Authorization': 'Bearer jdjs...' };

        ////or just gets
        //$httpProvider.defaults.headers.post = { 'Authorization': 'Bearer jdjs...' };

        //interceptor configuration
        $httpProvider.interceptors.push('$svcToken');
    }

})();




