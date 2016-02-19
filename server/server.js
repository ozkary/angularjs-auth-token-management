/*
 *  Name:  server.js
 *  Purpose:  nodejs jwt simple api to demo how to manage auth tokens
 *  Author:  oscar garcia - ozkary.com 

 * 
 *  Dependencies:
 *  view package.json for a list of dependencies that need to be installed using 
 *			npm install packagename -save
 *			
 *  Update History:
 *		ogarcia 02162016 initial implementation
 *			
 */
'use strict';
/*
 * require modules
 * 
 */
var http = require('http');         //http server protocol
var express = require('express');	//express
var cors = require('cors');			
var exjwt = require('express-jwt');
var jwt = require('jsonwebtoken');		//sign tokens
var morgan = require('morgan')			//console logger
var clc = require('cli-color');			//console fonts
var bodyParser = require('body-parser');
var users = require('./users.js');		//user module
var messages = require('./messages.js');		//message module


/*
 * Application configuration
 * 
 * */
//minimal web framework for sever apps
var app = express();

//Configure the express middleware to protect APIs
var appSecret = process.env.SECRET || 'ozkary.com2016';
var appAuthHeader = 'Authorization';    //auth header name
//app.set('superSecret', config.secret); // secret variable

//Middleware for user authorization and authentication with JSON Web Token
var authenticate = exjwt( {
	secret: new Buffer(appSecret)
});

/*
 * configure the available APIs
 * */

var baseApiRoute = '/api'; 
	
app.use(cors());	
//app.use(morgan('combined'));	//uncomment to trace api calls	(verbose)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
	
//secured APIs
app.use('/api/about', authenticate);
app.use('/api/token', authenticate);

//route middleware for protected routes
app.use(function (err, req, res, next) {
     
	if (err.constructor.name === 'UnauthorizedError') {
        helper.send(res, 401, { text: ' Unauthorized. No Authorization: Bearer found ' + req.url });
    }
   
});


//Route: api/ping
app.get('/api/ping', function (req, res) {
	var url = req.url;
	var msg = helper.getMessage(req,' Anonymous - No token required');
    helper.send(res, 200, { text:msg});
});

//Route: api/about  Secured
//use to get the extended profile information
app.get('/api/about', function (req, res) {    
    var user = helper.getUserFromToken(req, res);
    if (user) {
        var profile = users.profile(user);     //demo to get additional information   
        var claims = users.userClaims(user);     //demo to get claims only
        helper.setSignedToken(claims, res);       //renews token
        var msg = ' '+ helper.getMessage(req, profile.username);        
        helper.send(res, 200, profile, msg);
    }   
})

//Route: api/token Secured
//use it to refresh the token
app.get('/api/token', function (req, res) {
    var user = helper.getUserFromToken(req, res);
    if (user) {
        var claims = users.userClaims(user);     //demo to get claims only
        helper.setSignedToken(claims, res);
        var msg = helper.getMessage(req, user.username + ' token refreshed');
        helper.send(res, 200, { text: msg });  
    } 
     
})

//Route: api/login
//login
app.post('/api/login', function (req, res) {
    
    var username = req.body.username;
    var user = users.login(username, req.body.password);    //authenticate and return basic user information with claims
    
    if (!user) {       
        helper.send(res, 401, { text: msg });
        return;
    }

    //setting the token on the header
    helper.setSignedToken(user, res);  
    var msg = helper.getMessage(req, user.username + ' authenticated');

    helper.send(res, 200, msg);
});

/*
 * server configuration
 * 
 * */
var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {

	var routes = [{ route: '/ping', secured: false }, { route: '/login', secured: true }, { route: '/about', secured: true }, { route: '/token', secured: true }];
	
	var dt = new Date();
	console.log('Auth Token Management Demo by ozkary.com');
	console.log(helper.getDate());
	console.log('***************************\nAPIs');
	routes.forEach(function (item) {
		var msg = 'Routes: ' + baseApiRoute + item.route + '\t secured: ' + item.secured
		console.log(clc.green(msg));
	});
	console.log('***************************');
	console.log('Server Ready - listening @ http://localhost:' + port);
	
	
	if (err) {
		console.log(err);
	}
});

/*
 * Helper functions
 * 
 * */
var helper = {};

helper.setSignedToken = function(user, res) {
	
	// We are sending the profile inside the token with the claims
	var token = '';
    try {		
        
        token = jwt.sign(user, appSecret, { 'expiresIn': 60 }); //in seconds
        if (res) {
            res.setHeader(appAuthHeader, token);                            //adding header with token    
            res.setHeader('Access-Control-Expose-Headers', appAuthHeader);  //allowing cors access                
        }
	} catch (err) {
		helper.send(null, 500, { text: err });
	}
		
	return token;
}

helper.getUserFromToken = function(req, res){
    var data = null;
    if (req) {
        var token = req.headers[appAuthHeader.toLowerCase()];
       // console.log(clc.green("Token: "+ token));
        
        try {
            token = token.replace('Bearer ', '');   //strip unwanted characters                   
            data = jwt.decode(token);               //decode the payload - user claims              
        }
        catch (err){
            helper.send(res, 500, { text: err });
        }        

    }

    return data;
}

helper.getMessage = function (req, msg) {
	var url = req.url;	
	var rspMsg = url + ' ' + msg;
	return rspMsg;
}


helper.send = function(res, status, json, other) {
    if (res) {        
		res.status(status).send(json);
	}
    
    var text = json.text ? json.text : JSON.stringify(json);
    status += other || ''; 
    var msg = helper.getDate() + ' : status: ' + status + ' ' + text;
    
	console.log(clc.yellow(msg));
}

helper.getDate = function () {
	
	var dt = (new Date()).toLocaleString();
	return dt;
}