
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
    var app = angular.module('ozkary.authtoken');
    app.config(['$routeProvider', '$httpProvider', '$appRoutes','$appSettings', appConfig]);

    var appSettings = {
        apiUrl: 'http://localhost:3001/api',
        http: { header: 'Authorization', token: 'Bearer ' },
        messages: { success: 'You have access', noAccess: 'No Access', updated: 'Your change was successful', removed: 'Item was removed' },
        apiRoutes: {
            token: {
                requiredAuth: true,
                claims:'app://auth-token/token/' //todo-auth rename token to test the api access
            },
            about: {
                requiredAuth: true,
                claims: 'app://auth-token/about/'
            },
            login: {
                requiredAuth: false,
                claims: ''
            },
            ping: {
                requiredAuth: false,
                claims: ''
            }
        }
    }

    /*app settings*/
    app.constant('$appSettings', appSettings);

    var appRoutes = [{       
        title: "Login",
        url: "/",        
        icon: "",
        templateUrl: "views/main.html",
        controller: "ozkary.authtoken.ctrl.main",
        controllerAs: "ctrl",
        claims: "",
        requiredAuth: false,
        showMenu:true
    }, {
        title: "About",
        url: "/about",
        icon: "",
        templateUrl: "views/about.html",
        controller: "ozkary.authtoken.ctrl.about",
        controllerAs: "ctrl",
        redirectTo: '/noaccess',
        //claims: "app://auth-token/about/",    //todo-auth enable claim on menu
        //requiredAuth: true,
        showMenu: true
    },
    //{
    //    title: "Claims",                //todo-auth add claims module
    //    url: "/claims",
    //    icon: "",
    //    templateUrl: "views/claims.html",
    //    controller: "ozkary.authtoken.ctrl.claims",
    //    controllerAs: "ctrl",
    //    redirectTo: '/noaccess',
    //    claims: "app://auth-token/claims/",
    //    requiredAuth: true,
    //    showMenu: true
    //},
    {
        title: "No Access",
        url: "/noaccess",
        icon: "",
        templateUrl: "views/noaccess.html",
        controller: null,
        controllerAs: null,       
        requiredAuth: false,
        showMenu: false
    }];

    /*route settings*/
    app.constant('$appRoutes', appRoutes);
           
   
    /**
     * add the routes and interceptors
     * @param {type} $routeProvider
     * @param {type} $httpProvider
     */
    function appConfig($routeProvider, $httpProvider, $appRoutes, $appSettings) {

        $appRoutes.forEach(function (route) {
            configRoute(route);
            function configRoute(route) {
                $routeProvider
                    .when(route.url, {                       
                        templateUrl: route.templateUrl,
                        controller: route.controller,
                        controllerAs: route.controllerAs,                        
                        //resolve: {  //todo-auth secure routes
                        //    "hasClaim": ["$svcAuth", "$route", function ($svcAuth, $route) {                                
                        //        var result = false;
                        //        if (route.requiredAuth) {
                        //            var result = $svcAuth.hasClaim(route.claims);
                        //            if (!result) {
                        //                $route.current.$$route.redirectTo = route.redirectTo;
                        //                throw new Error($appSettings.messages.noAccess);
                        //            }
                        //        }
                        //        return result;
                        //    }]
                        //}
                    });                
            }
        });

        $routeProvider.otherwise("/");
       
        //add token interceptor
        //$httpProvider.interceptors.push('$svcToken');

        //a way to add tokens to all requests via provider
        //$httpProvider.defaults.headers.common = { 'Authorization': 'Bearer jdjs...' };
        
        ////or just post 
        //$httpProvider.defaults.headers.post = { 'Authorization': 'Bearer jdjs...' };

        ////or just gets
        //$httpProvider.defaults.headers.get = { 'Authorization': 'Bearer jdjs...' };

        //0g-todo 5 add interceptors
        //interceptor configuration
        $httpProvider.interceptors.push('$svcToken');
    }

})();




