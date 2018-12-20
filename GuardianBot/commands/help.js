const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
        //Deletes the command message
        message.delete();

        //Create a new discord.js Embed Field
        let helpEmbed = new Discord.RichEmbed()
        .setDescription("Bot Help")
        .setColor("#b99900")
        .addField("!report", "Reports a user, Use: !report @UserToReport -Reason to report-")
        .addField("!kick", "Kicks a user, Use: !kick @UserToKick -Reason for the kick-")
        .addField("!delete", "Deletes all messages from the channel (Doesn´t work yet)")

        //Send the help embed message to the chat
        return message.channel.send(helpEmbed);
}

module.exports.help = 
{
    name: "help"
}