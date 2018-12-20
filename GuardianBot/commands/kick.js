const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
    //Deletes the sent command, still not sure if catch is needed
    message.delete();

    //Get the user intended to kick. Either the first mentioned user or the first argument of the message
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //If this user does not exist send a error message to the channel
    if(!kUser) return message.channel.send("Couldn`t find user.");
    //Get the kick reason by slicing 22 from the arguments because the ID length is 22
    let reason = args.join(" ").slice(22);
    //If there is no reason return and send an error message to the channel
    if(!reason) return message.channel.send("You need to specify a reason to for the kick.")
    
    //Kick the user supposed to be kicked
    kUser.kick()
        .then(() => console.log(`Kicked ${kUser}`))
        .catch(console.error);
    
    //Create the embed kick message
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Kick Message")
    .setColor("#b99900")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked by", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);
                
    //Get the channel the kick should be posted in (posting the kick message in the report channel)
    let reportschannel = message.guild.channels.find(`name`, "reports");
    //If the channel does not exist send error message to the channel
    if(!reportschannel) return message.channel.send("Couldn´t find reportchannel!");
    
    //Send the report embed message to the reports channel and the channel the kick was sent from
    reportschannel.send(reportEmbed);
    message.channel.send(reportEmbed).then(msg => msg.delete(300000));
}

module.exports.help = 
{
    name: "kick"
}