/*

- Complementary Config

- By Alydus & Contributors

- Git: https://github.com/Alydus/complementary-config.git

*/

// Load configuration
var modConfig = require("./modconfig")

// Load required packages
var yaml = require("yaml")
var fs = require("fs")
var prompt = require("prompt")
var path = require("path")

// Define data for the application
var complementaryConfig = {}

complementaryConfig.requiredFolders = ["mods", "shaderpacks", "config"]

complementaryConfig.promptSchema = {
	properties: {
		filePath: {
			description: "Filepath to your minecraft folder",
			message: "Please enter a valid filepath to your minecraft folder, must contain a mods, shaderpacks and config folder.",
			required: true,
			default: "./",
			conform: function(attemptedFilePath) {
				for (var i = 0; i < complementaryConfig.requiredFolders.length; i++) {
					if (!fs.existsSync(path.join(attemptedFilePath, complementaryConfig.requiredFolders[i]))) {
						return false;
					}
				}

				return true;
			}
		}
	}
}


complementaryConfig.handleFilePath = function(filePath) {

}

// Start prompt to get filepath for minecraft from user
prompt.start()

prompt.get(complementaryConfig.promptSchema, function(err, result) {
	complementaryConfig.handleFilePath(result.filePath)
})