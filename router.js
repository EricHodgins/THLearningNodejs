var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");


var commonHeaders = {'Content-Type': 'text/html'};


function home(request, response) {
	// if the url === "/" && GET
	if (request.url === "/") {
		if (request.method.toLowerCase() === "get") {
			// show the search field
			response.writeHead(200, commonHeaders);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		} else {
			// if the url === "/" && POST
			// redirect to username
			// get post data from body
			request.on("data", function(postBody) {
				console.log("cmon!");
				console.log(postBody.toString());
				// extract username
				var query = querystring.parse(postBody.toString());
				response.writeHead(303, {"location": "/" + query.username});
				response.end();
			});

		}
	}

}


function user(request, response) {
	// if url === "/....."
	var username = request.url.replace("/", "");
	if (username.length > 0) {
		response.writeHead(200, commonHeaders);
		renderer.view("header", {}, response);

		// get JSON data
		var studentProfile = new Profile(username);
		studentProfile.on("end", function(profileJSON) {
			// show profile

			// store values
			var values = {
				avatarURL: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				jsPoints: profileJSON.points.JavaScript
			}

			// simple response
			renderer.view("profile", values, response);
			renderer.view("footer", {}, response);
			response.end();

		});

		// on error
		studentProfile.on("error", function(error) {
			// show error
			renderer.view("error", {errorMessage: error.message}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		});

	}
}


module.exports.home = home;
module.exports.user = user;