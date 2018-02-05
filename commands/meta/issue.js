const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'issue',
            group: 'meta',
            memberName: 'issue',
            description: 'files an issue',
            aliases: ['feedback'],
            examples: ['issue "!give myrole" crashes bot'],
            args: [
                {
                    key: 'text',
                    prompt: "What's the problem you are facing?",
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { text }) {
        var issuechannel = this.client.channels.get("409796293116821515");
        var report = message.author.username + " reported an issue";
        var reportembed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(message.author.username + "#" + message.author.discriminator + " has reported an issue")
            .setDescription(text);
        issuechannel.send(reportembed);
    }
};