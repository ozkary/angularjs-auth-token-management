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
    *   0garcia 02162016 initial implementation
    *   0garcia 03242016 add the authorization logic - claim management
    *
    */

    'use strict';
    var svcName = '$svcAuth';
    var app = angular.module('ozkary.authtoken');
    app.factory(svcName, ['$q', '$appSettings', '$window',svcAuth]);


    /*
    *   auth manager service
    *
    */
    function svcAuth($q, $appSettings, $window) {
        
        var baseUrl = $appSettings.apiUrl;
        var svc = {
            name: svcName,
            authHeaderName: 'Authorization',
            token: null,
            identity: null,
            isAuth: isAuthenticated,            
            logout: logout,
            login:processToken,
            getToken: getToken,
            saveToken:saveToken,
            getAuthHeader: getAuthHeader,
            getAuthToken: getAuthToken,
            waitForAuth: waitForAuth,
            hasClaim:hasClaim
        }
      

        /**
         * removes the auth token
         */
        function logout() {
            svc.token = null;
            svc.identity = null;
            delete $window.localStorage['authToken'];            
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
                var newIdentity = JSON.parse($window.atob(payload));    //payload with claims
                if (svc.identity) {
                    //update props with new claims
                    svc.identity.firstname = newIdentity.firstname;
                    svc.identity.username = newIdentity.username;
                    svc.identity.appClaims = newIdentity.appClaims;
                } else {
                    svc.identity = newIdentity;
                }

                saveToken(token);
            }            
        }

        function saveToken(token) {
            //persisten in memory as a property            
            svc.token = token;
           
            //0g-todo 3 save toke to storage
            //we need to persist the token to  to storage to handle page refresh
            $window.localStorage['authToken'] = token;          
        }

        function getToken() {
            //from memory
            var token = svc.token;
                       
            //from storage
            if (!token) {
                token = $window.localStorage['authToken'];
            }
            
            return token;
           
        }

        /**
         * returns a json with the header format
         * @returns {type} 
         */
        function getAuthHeader() {
            var content = getAuthToken();
            var header = { 'Authorization': content };                    
            return header;
        }

        /**
         * returns the token value properly formatted
         * @returns {type} 
         */
        function getAuthToken() {
            var content = 'Bearer ' + svc.getToken();
            return content;
        }

        /**
         * checks for persisted token
         */
        function waitForAuth() {
            var token = getToken();
            processToken(token);   
        }

        /**
         * checks to see if the current user has a claim
         */
        function hasClaim(claims) {
            var result = false;
            var identity = svc.identity;           

            if (claims && identity && identity.appClaims) {
                result = identity.appClaims[claims] != null;   //true if exists                
            }          

            return result;
        }

        return svc;
    }

})();

