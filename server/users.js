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
		firstname: 'ozkary',
		lastname: 'garcia',
		email: 'ozkary@ozkary.com',
		id: 123123,
        password: '123123',
        picture: 'https://lh3.googleusercontent.com/-usADIDgPGz0/VKLs9FK5TwI/AAAAAAAAAcA/2-SyqSQlZc8/w140-h140-p/OscarReady.png',       
        likes: ['cloud', 'nodejs', 'javascript']
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
        profile:profile
    }
    
    //simple login
    function login(username, password){
        var user = this.list[username];
        if (!user || user.password !== password) {
            user = null
        }
        return user;
    }
    
    //gets the profile information
    function profile(user) {
        var profile = null;
        if (user) {
            profile = users.list[user.username];
        }

        return profile;
    }       
	
	users.list[user1.username] = user1;
	users.list[user2.username] = user2;
	
	// exports the module to enable the require directive
	module.exports = users;

})();