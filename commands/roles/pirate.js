const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pirate',
            group: 'roles',
            memberName: 'pirate',
            description: 'Give or remove pirate role.',
            examples: ['pirate @oliver#9880 cydown'],
            args: [
                {
                    key: "member",
                    prompt: "Please specify a member.",
                    type: "member"
                },
                {
                    key: "reason",
                    prompt: "Please specify a reason",
                    type: "string",
                    default: ""
                }
            ]
        });
    }
    hasPermission(message) {
        return (message.member.roles.exists("name", "Geniuses™") || message.member.roles.exists("name", "Moderators")) && message.guild;
    }
    async run(message, { member, reason }) {
        message.delete();
        if (member.roles.exists("name", "Geniuses™")) return message.reply("You can't give a genius the pirate role!");
        const preCheck = await db.fetchObject(member.user.id + "_pirate");
        const pirateReports = message.guild.channels.find("name", "bot-testing");
        const pirateRole = message.guild.roles.find("name", "Pirate");
        if (!reason || preCheck.text === "not_pirate"){
            member.roles.remove(member.roles.find("name", "Pirate"));
            const data = await db.fetchObject(member.user.id + "_pirate");
            const pirateMessage = await pirateReports.messages.fetch(data.text);
            pirateMessage.delete();
            db.updateText(member.user.id + "_pirate", "not_pirate");
            return message.reply(`removed role from ${member}`);

        }
        const roleArray = member.roles.array();
        roleArray.push(pirateRole);
        member.edit({
            roles: roleArray
        });
        const embed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setTitle("Pirate")
            .setDescription(`${member.user.username} is a pirate.`)
            .addField("Reason", reason)
            .setColor("RANDOM")
        const m = await pirateReports.send(embed);
        db.updateText(member.user.id + "_pirate", m.id);

    }
};