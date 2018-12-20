//References to the botconfig amd the token
const BOTCONFIG = require("./botconfig.json");
const TOKEN = require("./token.json");
//Referemces to discord.js and node file system
const DISCORD = require("./node_modules/discord.js");
const FS = require("fs");
//Initializing the Bot
const BOT = new DISCORD.Client({disableEveryone: true});
//Initializing a Collection for the bot commands
BOT.commands = new DISCORD.Collection();

//Checking for files in the commands directory
FS.readdir("./commands/", (err, files) =>
{
    if(err) console.log(err);

    //Create an array of all jsFiles filtered by .js so only the filename remains
    let jsFile = files.filter(file => file.split(".").pop() === "js");
    //If there are no files
    if(jsFile.length <= 0){
        //log an error and return
        console.log("Couldn´t find commands.")
        return;
    }

    //Loop through all the files and set the properties
    jsFile.forEach((file, i) =>{
        let props = require(`./commands/${file}`);
        console.log(`${file} loaded!`);
        BOT.commands.set(props.help.name, props);
    });

})

//Login the bot with the token provided in the botconfig
BOT.login(TOKEN.token);

//Gets executen when the bot is ready
BOT.on("ready", async () =>  
{
    //Logs to the Windows Console that the bot is ready
    console.log(`${BOT.user.username} is now online!`);
    //Sets the Bots activity to the disired string
    BOT.user.setActivity("BotHeaven");
});

//Gets executed when the bots reads messages
BOT.on("message", async message =>
{
    //If the bot is the author of the message return
    if(message.author.Bot) return;
    //If the message is a direct message return
    if(message.channel.type === "dm") return;

    //Set prefix from the botconfig
    let prefix = BOTCONFIG.prefix;
    //Create a messageArray and spilt it by spaces
    let messageArray = message.content.split(" ");
    //Set cmd to the first spot in the array containing the command
    let cmd = messageArray[0];
    //Set the arguments to the rest of the array spliced by the command
    let args = messageArray.slice(1);

    let commandFile = BOT.commands.get(cmd.slice(prefix.length));
    if(commandFile)
    {
        commandFile.run(BOT,message,args);
    } 

});
