//References to the botconfig and discord.js
const BotConfig = require("./botconfig.json");
const Discord = require("./node_modules/discord.js");

//Creating the Bot variable
const Bot = new Discord.Client({disableEveryone: true});

//Gets executen when the bot is ready
Bot.on("ready", async () =>  
{
    //Logs to the Windows Console that the bot is ready
    console.log(`${Bot.user.username} is now online!`);
    //Sets the Bots activity to the disired string
    Bot.user.setActivity("BotHeaven");
});

//Gets executed when the bots reads messages
Bot.on("message", async message =>
{
    //If the bot is the author of the message return
    if(message.author.Bot) return;
    //If the message is a direct message return
    if(message.channel.type === "dm") return;

    //Set prefix from the botconfig
    let prefix = BotConfig.prefix;
    //Create a messageArray and spilt it by spaces
    let messageArray = message.content.split(" ");
    //Set cmd to the first spot in the array containing the command
    let cmd = messageArray[0];
    //Set the arguments to the rest of the array spliced by the command
    let args = messageArray.slice(1);

    //HELP COMMAND
    if (cmd === `${prefix}help`)
    {
        //Deletes the command message
        message.delete();

        //Create a new discord.js Embed Field
        let helpEmbed = new Discord.RichEmbed()
        .setDescription("Bot Help")
        .setColor("#b99900")
        .addField("!delete", "deletes all messages from the channel")
        .addField("!kick", "Kicks a user");

        return message.channel.send(helpEmbed);
    }

    //DELETE COMMAND
    if (cmd === `${prefix}delete`)
    {
        //Deletes the command message
        message.delete();
        for (x = 0; x < messageArray.channel.length; x++){
            messageArray.channel[x].delete();
        }
    }

});

//Login the bot with the token provided in the botconfig
Bot.login(BotConfig.token);