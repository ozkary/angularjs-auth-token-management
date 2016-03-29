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
* ver. 1.1.0
*
* Created By oscar garcia 
*
* Update/Fix History
*   ogarcia 03252016 initial implementation
*
*/
    'use strict';
    var ctrlName = 'ozkary.authtoken.ctrl.menu';
    var app = angular.module('ozkary.authtoken'); 
    app.controller(ctrlName, ['$svcAuth', '$appRoutes', '$filter', ctrlMenu]);
	
    function ctrlMenu($svcAuth, $appRoutes, $filter) {
        var ctrl = this;
        this.name = ctrlName;
        var routes = $filter('filter')($appRoutes, { showMenu: true});
        ctrl.menu = routes;
    } 
   
})();
      
