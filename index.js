/*

- Complementary Config

- By Alydus & Contributors

- Git: https://github.com/Alydus/complementary-config.git

*/

// Load configuration
var modConfig = require("./modconfig")

// Load required packages
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
	var configFolder = path.join(filePath, "config")

	console.log("Starting config modifications...")

	Object.keys(modConfig.modifications).forEach(function(modificationName) {
		var modificationData = modConfig.modifications[modificationName]

		complementaryConfig.applyModification(configFolder, modificationData, modificationName)
	})
}

complementaryConfig.applyModification = function(configFolder, modificationData, modificationName) {
	var modificationConfigPath = path.join(configFolder, modificationData["configPath"])

	console.log("Applying " + modificationName + " config changes...")

	if (!fs.existsSync(modificationConfigPath)) {
		console.log(modificationName + " is not detected, cancelled modification.")
	} else {
		try {
			var unparsedConfig = fs.readFileSync(modificationConfigPath, "utf8")
			var modifiedConfig = unparsedConfig
			var modificationCount = 0

			for (var [textToReplace, newText] of Object.entries(modificationData["configModifications"])) {
				var previousConfig = modifiedConfig

				if (modifiedConfig.contains(textToReplace)) {
					console.log("contains!")
				}

				modifiedConfig = modifiedConfig.replace(textToReplace, newText)

				if (modifiedConfig != previousConfig) {
					modificationCount++
				}

				fs.writeFile(modificationConfigPath, modifiedConfig, "utf8", function(err) {
					if (err) {
						console.log("Failed to run modification " + modificationName + ", error while writing config, cancelled modification.")
					}
				})
			}

			console.log("Successfully ran " + modificationCount + " modifications for modification " + modificationName)
		} catch (err) {
			console.log("Failed to run modification " + modificationName + ", error while modifying config, cancelled modification.")

			console.error(err)
		}
	}
}

// Start prompt to get filepath for minecraft from user
prompt.start()

prompt.get(complementaryConfig.promptSchema, function(err, result) {
	// User has provided valid filepath, proceed with configuration fixes

	console.log("Valid filepath detected, found required folders.")
	console.log("Running complementary-config on '" + path.join(result.filePath, "config") + "'")

	complementaryConfig.handleFilePath(result.filePath)
})