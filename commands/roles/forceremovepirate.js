const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'forceremovepirate',
            group: 'roles',
            memberName: 'forceremovepirate',
            description: 'Give or remove pirate role.',
            examples: ['forceremovepirate @oliver#9880'],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Please specify a user ID.",
                    type: "user"
                }
            ]
        });
    }
    hasPermission(message) {
        return (message.member.roles.exists("name", "Moderators"));
    }
    async run(message, { user }) {
        const userPirateInfo = await db.fetchObject(message.guild.id + user.id + "_pirate");                                   //i don't remeber why i made this command
        const pirateMessage = await message.guild.channels.find("name", "pirate-reports").messages.fetch(userPirateInfo.text);
        pirateMessage.delete();
        message.reply("Successfully force removed pirate message.");
    }
};