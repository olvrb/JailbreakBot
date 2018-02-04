const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'r',
            aliases: ["role"],
            group: 'roles',
            memberName: 'r',
            description: 'Get or remove a role from the available list.',
            examples: ['r liberios'],
            args: [
                {
                    key: "role",
                    prompt: "Please specify a role.",
                    type: "string"
                }
            ]
        });
    }
    async run(message, { role }) {
        const roles = ["iOS", "macOS", "tvOS", "wathcOS", "Other Updates", "Electra", "Meridian", "g0blin", "LiberiOS", "h3lix", "overcl0ck"];
        if (!(roles.indexOf(role) > -1)) return message.reply("That role is invalid.");
        const newRole = message.guild.roles.find("name", role);
        const roleCollection = message.member.roles.array();
        if (message.member.roles.exists("name", role)) {
            message.member.roles.remove(newRole);
            return message.reply(`Removed \`${newRole.name}\`.`);
        }
        try {
            roleCollection.push(newRole);
            message.member.edit({
                roles: roleCollection
            });
        } catch (error) {
            throw error;
        }
        message.reply(`I gave you the \`${role}\` role.`);
    }
};