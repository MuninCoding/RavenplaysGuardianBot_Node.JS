const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
    //Deletes the sent command, still not sure if catch is needed
    message.delete().catch(O_o=>{});

    //Get the user intended to report. Either the first mentioned user or the first argument of the message
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //If this user does not exist send a error message to the channel
    if(!rUser) return message.channel.send("Couldn`t find user.");
    //Get the report reason by slicing 22 from the arguments because the ID length is 22
    let reason = args.join(" ").slice(22);
    //If there is no reason return and send an error message to the channel
    if(!reason) return message.channel.send("You need to specify a reason to for the report.")
    
    //Create the embed report message
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report`s")
    .setColor("#b99900")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);
                
    //Get the channel the report should be posted in
    let reportschannel = message.guild.channels.find(`name`, "reports");
    //If the channel does not exist send error message to the channel
    if(!reportschannel) return message.channel.send("Couldn´t find reportchannel!");
    
    //Send the report embed message to the reports channel
    reportschannel.send(reportEmbed);
}

module.exports.help = 
{
    name: "report"
}