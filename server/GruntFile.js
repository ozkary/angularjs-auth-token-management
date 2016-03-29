//grunt tasks to run our node server 
'use strict';


module.exports = function (grunt) {
    
    grunt.registerTask('server', 'starts the node api server', function () {
        
        process.stdin.resume();

        var done = this.async();
        require('./server.js');

        process.on('SIGINT', function () {                       
            done();
        });

       
    });

}