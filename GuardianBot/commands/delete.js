const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
    //If the sender has no permission to manage messages return and send an error message
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don´t have permission to delete messages");
    //If there are no arguments throw error message
    if(!args[0]) return message.channel.send("No Number of messages to delete specified");
    //Bulk delete specified number of messages on the channel the message was sent then
    message.channel.bulkDelete(args[0]).then(() => 
    {
    //Send a message to the channel how many messages were deleted which deletes itself after 2000ms
    message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete(2000));
    });

}

module.exports.help = 
{
    name: "delete"
}