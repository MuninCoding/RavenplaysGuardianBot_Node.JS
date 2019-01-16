//MODULES
const DISCORD = require("discord.js");
const FORTNITE_API = require("fortnite-api");
//FILES
const CONFIG = require("../botconfig.json")
const EPIC_DATA = require("C:/Coding/Repositories/Ravenplays Guardian Bot/PrivateFiles/epicData.json");


module.exports.run = async (bot, message, args) =>
{
    let username = args[0];
    let platform = args[1] || "pc";

    if (!username) message.channel.send("user");
    if (!platform) message.channel.send("platform");

    let fortniteAPI = new FORTNITE_API(
        [
            EPIC_DATA.loginEmail,
            EPIC_DATA.loginPassword,
            EPIC_DATA.clientLauncherToken,
            EPIC_DATA.fortniteClientToken
        ],
        {
            debug: true
        }
    );

    fortniteAPI.login().then(() =>
    {
        fortniteAPI
            .getStatsBR(username, platform, "alltime")
            .then(stats => {
                console.log(stats);
            })
            .catch(err => {
                console.log(err);
            });
    });
}
module.exports.help = {
    name: "fortnite"
}