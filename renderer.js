var fs = require("fs"); // fs = file system


function mergeValues(values, content) {
	// cycle over keys
	for (var key in values) {
		content = content.replace("{{" + key +"}}", values[key]);
	}

	// replace all {{key}} wiht the values object


	//return merged content
	return content;
}



function view(templateName, values, response) {
	// Read from the template files
	var fileContents = fs.readFileSync('./views/' + templateName + ".html", {encoding: "utf8"});
	// Insert values
	fileContents = mergeValues(values, fileContents);
	// write out response
	response.write(fileContents);

}

module.exports.view = view;