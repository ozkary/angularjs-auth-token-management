
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
    app.config(['$routeProvider', appConfig]);
    app.run(['$rootScope', '$location', runApp]);

    var appSettings = {
        apiUrl: 'http://localhost:3001/api',
        http: { header: 'Authorization', token: 'Bearer ' },
        messages: {success:'You have access', noAccess:'No Access'}
    }
    app.constant('$appSettings', appSettings);
       
    function runApp($rootScope,$location) {
        $rootScope.$on('$locationChangeSuccess', function () {
            // $rootScope.menu = $location.path();
            $rootScope.route = $location.$$path;           
        });
    }
   
    function appConfig($routeProvider) {
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
    }

})();




