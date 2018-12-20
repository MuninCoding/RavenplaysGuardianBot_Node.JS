const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
    //If the sender has no permission to manage messages return and send an error message
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don´t have permission to delete messages");
    //If the channel the message was sent from is a text channel proceed
    if (message.channel.type == 'text') {
        //Fetch messages (max 100 for discord performance) from the sent channel and iterate over the messages
        message.channel.fetchMessages({limit: 100}).then(messages => {
            //Get all unpinned messages by filtering the messages by not pinned
            const unpinnedMessages = messages.filter(msg => !msg.pinned);
            //Bulk delete the unpinned Messages
            message.channel.bulkDelete(unpinnedMessages);
            //Get the number of messages deleted to display them in the message
            messagesDeleted = unpinnedMessages.array().length; 
    
            //Then we log the number of messages deleted on both the channel and console.
            message.channel.send("Deletion of messages successful. Total messages deleted: " + messagesDeleted)
                //The channel message gets self destroyed in t-2 seconds
                .then(msg => msg.delete(2000));
            console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted)
            //If there is an error catch it
        }).catch(err => {
            //And console log an error message 
            console.log('Error while doing Bulk Delete');
            //alongside the actual error that got catched
            console.log(err);
        });
    }

}

module.exports.help = 
{
    name: "delete"
}