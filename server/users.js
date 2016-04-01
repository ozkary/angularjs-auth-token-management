/*
 *  Name:  users.js
 *  Purpose:  simple user repository for demo purposes
 *  Author:  oscar garcia - ozkary.com 

 *			
 *  Update History:
 *		ogarcia 02162016 initial implementation
 *			
 */

(function () {
	'use strict';	
	var user1 = {
		username: 'ozkary@ozkary.com',
		firstname: 'oscar',
		lastname: 'garcia',
		email: 'ozkary@ozkary.com',
		id: 123123,
        password: '123123',
        picture: 'https://lh3.googleusercontent.com/-usADIDgPGz0/VKLs9FK5TwI/AAAAAAAAAcA/2-SyqSQlZc8/w140-h140-p/OscarReady.png',       
        likes: ['cloud', 'nodejs', 'angular']
	};
	
	var user2 = {
		username: 'test@ozkary.com',
		firstname: 'testo',
		lastname: 'codecamp',
		email: 'test@ozkary.com',
		id: 789789,
        password: '123123',      
        likes: ['qa', 'build', 'javascript'],           
        picture:'https://lh3.googleusercontent.com/-K34_hBZhGWY/UAbmFyhyihI/AAAAAAAAAOo/eKRiVUe50tg/w140-h127-p/ozkary.jpg'
	};
	
	var users = {
		list: {},
        login: login,
        profile: profile,
        userClaims: userClaims
    }
    
    /**
     * defines the application claims
     * format:
     * module/area/element
    **/
    var appClaims = {
        'app://auth-token/token/': '',
        'app://auth-token/about/':'',
        'app://auth-token/about/email':'',
        'app://auth-token/about/load':'',
        'app://auth-token/claims/':'',
        'app://auth-token/claims/add':'',
        'app://auth-token/claims/delete':'',
        'app://auth-token/claims/update': '',
        'app://auth-token/claims/save':''        
    }
    
    //simple login
    function login(username, password){
        var user = this.list[username];
        var claims = {};
        if (!user || user.password !== password) {
            claims = null
        } else {
            claims = userClaims(user);
        }
        return claims;
    }
    
    //gets the profile information
    function profile(user) {
        var profile = null;
        if (user) {            
            profile = JSON.parse(JSON.stringify(users.list[user.username])); //simple clone
            delete profile.password;
        }

        return profile;
    }
    
    //gets the basic user claims
    function userClaims(user){
        var claims = {};
        if (user) {
            //set the application claims
            claims.appClaims = appClaims;
            //user claims
            claims.username = user.username;
            claims.firstname = user.firstname;
            claims.email = user.email;
            claims.id = user.id;
                     
        }

        return claims;
    }       
	
	users.list[user1.username] = user1;
	users.list[user2.username] = user2;
	
	// exports the module to enable the require directive
	module.exports = users;

})();