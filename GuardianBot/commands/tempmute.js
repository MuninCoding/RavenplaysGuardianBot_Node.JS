const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (message.member.hasPermission("MANAGE_MESSAGES"))
    {
        //!mute @user 1s/m/h/d
        try
        {
            //Find User
            let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!toMute)
            {
                return message.reply("Couldn't find user.");
            }

            //Check if user has higher permissions
            if (toMute.hasPermission("MANAGE_MESSAGES"))
            {
                return message.reply("Can't mute them!");
            }

            //Get Mute Time
            let muteTime = args[1];
            if (muteTime == null)
            {
                return message.reply("You didn't specify a time!");
            }



            //Search for muted role
            let muteRole = message.guild.roles.find(x => x.name === "muted");

            //If the mute role does not exist we create it
            if (!muteRole)
            {
                muteRole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions: []
                })
            }

            //Override the permissions of the mute role
            message.guild.channels.forEach(async (channel) =>
            {
                await channel.overwritePermissions(muteRole,
                    {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
            });

            await (toMute.addRole(muteRole.id));
            message.reply(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);


            setTimeout(function ()
            {
                toMute.removeRole(muteRole.id);
                message.channel.send(`<@${toMute.id}> has been unmuted!`);
            }, ms(muteTime));

        } catch (e)
        {
            console.log(e.stack);
            message.channel.send("There was an error with the formatting of your message.");
        }

    } else
    {
        message.channel.send("You do not have the permissions to do this.");
    }

}

module.exports.help = {
    name: "mute"
}
