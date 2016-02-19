/*
 *  Name:  messages.js
 *  Purpose:  simple messages repository for demo purposes
 *  Author:  oscar garcia - ozkary.com 

 *			
 *  Update History:
 *		ogarcia 02162016 initial implementation
 *			
 */

(function () {
	'use strict';	
    
	var messages = {
        list: [],
        add : function (msg){
            if (msg) {
                this.list.push(msg);
            }
        }
	}
	
	// exports the module to enable the require directive
	module.exports = messages;

})();