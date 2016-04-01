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
    var name = 'authorize';
    var app = angular.module('ozkary.authtoken');
    app.directive(name, ['$svcAuth', dirAuthorize]);
    app.directive('authorizeScope', ['$svcAuth', dirAuthorizeScope]);
    /**
     * hides an element when a claim is not found
     * @param {type} $svcAuth
     * @returns {type} 
     */
    function dirAuthorize($svcAuth) {
        return {
            restrict: 'A',
            scope: true,//true=parent->child, false=bidirectional
            /**
             * handles the removal or disable of an element
             * @param {type} scope
             * @param {type} elem
             * @param {type} attrs
             * @param {type} control
             */
            link: function (scope, elem, attrs) {
               
                var watch = function () {
                    //get the claim value
                    var claims = attrs.authorize;
                    if (claims) {
                        var action = attrs.authorizeAction;
                        var result = $svcAuth.hasClaim(claims);
                        if (!result) {
                            //defaults to hide command
                            if (action === 'disabled') {
                                elem.context.disabled = true;
                            } else {
                                elem.hide();
                            }
                        } else {
                            if (action === 'disabled') {
                                elem.context.disabled = false;
                            } else {
                                elem.show();
                            }
                        }
                    }
                                    
                };
                //scope.$watch(function () { return $svcAuth.identity; }, watch)  //must watch identity changes only (login/logout)   
                scope.$watch(watch);  //watch over all controller scope - expensive            
            }
        };
    };


    /**
    * updates parent scope variables which allows the controller to authorize multiple elements
    * @param {type} $svcAuth
    * @returns {type} 
    */
    function dirAuthorizeScope($svcAuth) {
        return {
            restrict: 'E',
            scope: {
                authorizeMapping: '&',
                authorizeCallback: '&',
            },//isolated scope
            template: '',
            replace:true,
            /**
             * handles the removal or disable of an element
             * @param {type} scope
             * @param {type} elem
             * @param {type} attrs             
             */
            link: function (scope, elem, attrs) {

                var watch = function () {
                    //get the claim to variable maps
                    var claims = scope.authorizeMapping()();
                    var callback = scope.authorizeCallback();
                    if (claims && typeof (claims) === 'object') {
                        for (var item in claims) {
                            //console.log(item);
                            var claim = claims[item];
                            var result = $svcAuth.hasClaim(claim);
                            claims[item] = result;
                        }
                        callback(claims);
                    }                   
                };                               
                scope.$watch(watch);
                //watch();
            }
        };
    };

})();

