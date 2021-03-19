var modConfig = {}

modConfig.modifications = []

modConfig.modifications["Botania 1.12"] = {
    configPath: "botania.cfg",
    configModifications: {
        "B:fancySkybox.enable=true": "B:fancySkybox.enable=false",
        "B:shaders.enabled=true": "B:shaders.enabled=false"
    }
}

modConfig.modifications["Botania 1.16.5"] = {
    configPath: "botania-client.toml",
    configModifications: {
        "shaders = true": "shaders = false",
        "enabled = true": "enabled = false"
    }
}

modConfig.modifications["CC: Tweaked 1.16.5"] = {
    configPath: "computercraft-client.toml",
    configModifications: {
        "monitor_renderer = \"BEST\"": "monitor_renderer=\"VBO\"",
        "monitor_renderer = \"TBO\"": "monitor_renderer=\"VBO\""
    }
}

modConfig.modifications["Astral Sorcery 1.16.5"] = {
    configPath: "astralsorcery-client.toml",
    configModifications: {
        "skyRenderingEnabled = [\"minecraft:overworld\"]": "skyrenderingEnabled = []"
    }
}

modConfig.modifications["Advanced Rocketry 1.12.2"] = {
    configPath: "advRocketry/advancedRocketry.cfg",
    configModifications: {
        "B:overworldSkyOverride=true": "B:overworldSkyOverride=false"
    }
}

/*modConfig.modifications["Astral Sorcery 1.12"] = {
    configPath: "astralsorcery.cfg",
    configModifications: {
        'S:weakSkyRenders <\n >': 'S:weakSkyRenders < \n0\n>'
    }
}*/

module.exports = modConfig