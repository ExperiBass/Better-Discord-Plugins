/**
 * @name ServerCount
 * @version 1.0.1
 * @description Displays the number of servers you've joined.
 * @author ExperiBassMusic
 * @authorId 399447908237180939
 * @donate https://cash.app/$experibassmusic
 * @authorLink https://experibassmusic.eth.link
 * @website https://experibassmusic.eth.link
 * @ens also: ens://experibassmusic.eth
 * @source https://github.com/experibass/Better-Discord-Plugins
 * @updateUrl https://raw.githubusercontent.com/ExperiBass/Better-Discord-Plugins/master/src/ServerCount/ServerCount.plugin.js
 */

// So i noticed about every plugin has this, apparently its a autoinstaller? anyways, YOINK! mine now >:3
/* @cc_on
    @if (@_jscript)
        var name = WScript.ScriptName.split(".")[0];
        var shell = WScript.CreateObject("WScript.Shell");
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        shell.Popup("Do NOT run random scripts from the internet with the Windows Script Host!\n\nYou are supposed to move this file to your BandagedBD/BetterDiscord plugins folder.", 0, name + ": Warning!", 0x1030);
        var pluginsPath = shell.expandEnvironmentStrings("%appdata%\\BetterDiscord\\plugins");
        if (!fso.FolderExists(pluginsPath)) {
            if (shell.Popup("Unable to find the BetterDiscord plugins folder on your computer.\nOpen the download page of BandagedBD/BetterDiscord?", 0, name + ": BetterDiscord installation not found", 0x14) === 6) {
                shell.Exec("explorer \"https://github.com/rauenzi/betterdiscordapp/releases\"");
            }
        } else if (WScript.ScriptFullName === pluginsPath + "\\" + WScript.ScriptName) {
            shell.Popup("This plugin is already in the correct folder.\nNavigate to the \"Plugins\" settings tab in Discord and enable it there.", 0, name, 0x40);
        } else {
            shell.Exec("explorer " + pluginsPath);
        }
        WScript.Quit();
    @else
@*/
class ServerCount {
    constructor() {
        this.name = "ServerCount"
        this.version = "1.0.1"
        this.STYLES = {
            base: "color:white",
            warn: "color:yellow",
            error: "color:red",
            info: "color:cyan"
        }
        const guildHandler = BdApi.findModuleByProps("getGuildCount")
        this.guildCount = guildHandler.getGuildCount
        this._log(`version ${this.version} is loaded.`)
    }
    start() {
        // create the guild count under the logo
        this.guildDiv = document.getElementsByClassName("guildSeparator-a4uisj")[0]
        const fontSize = this._getFontDimensions(`${this.guildCount()}`)
        this.guildDiv.setAttribute("style", `height:${fontSize.actualBoundingBoxAscent}px`)
        this.guildDiv.innerHTML = `<p id="ServerCount" style="padding:0px;margin:0px;color:white;font-size:8px;text-align:center;"></p>`
        this.display()
        this._log(`version ${this.version} is running.`)
    }
    display() {
        document.getElementById("ServerCount").innerText = this.guildCount()
    }
    stop() {
        this.guildDiv.setAttribute("style", "")
        this.guildDiv.innerHTML = ""
    }
    onSwitch() {
        this.display() // should refresh the guild count
                       // ...should.
    }
    /**
     * @param {string} text String of text to measure.
     * @returns {TextMetrics}
     */
    _getFontDimensions(text) {
        // stolen and modified from https://www.tutorialspoint.com/Calculate-text-width-with-JavaScript
        // get the font
        const logoDiv = document.getElementsByClassName("listItem-3SmSlK")[0] // discord logo div
        const font = window.getComputedStyle(logoDiv, null).getPropertyValue("font-family") // stolen from https://stackoverflow.com/a/7444724
        const myCanvas = this.canvas || (this.canvas = document.createElement("canvas"))
        const context = myCanvas.getContext("2d")
        context.font = font
        const metrics = context.measureText(text)
        // measuring done, yeetus deleetus
        this.canvas = null
        return metrics
    }
    _test() {
        this._log("Info!", "INFO")
        this._log("Wawning!", "WARN")
        this._log("Ewwow!", "ERROR")
    }
    _log(message, type = "") {
        switch (type.toLowerCase()) {
            case "info": {
                console.log(`%c[${this.name}] [INFO]: %c${message}`, this.STYLES.info, this.STYLES.base)
                break;
            }
            case "warn": {
                console.warn(`%c[${this.name}] [INFO]: %c${message}`, this.STYLES.warn, this.STYLES.base)
                break;
            }
            case "err": {}
            case "error": {
                console.error(`%c[${this.name}] [INFO]: %c${message}`, this.STYLES.error, this.STYLES.base)
                break;
            }
            case "": {
                console.log(`%c[${this.name}]: %c${message}`, this.STYLES.info, this.STYLES.base)
                break;
            }
            default: {
                this._log(message, "INFO")
            }
        }
    }
}
module.exports = ServerCount