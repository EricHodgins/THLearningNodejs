var router = require("./router.js");

// problem: need a simple way to look at a users badge count & js points
// solution: user node.js to perform profile lookkups an serve our tmplates via http

// 1. Create a web server
var http = require('http');
http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response);
}).listen(1337, '0.0.0.0');
console.log('Server running at http://127.0.0.1:1337/');


