const { Command } = require("discord.js-commando");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'issue',
            group: 'meta',
            memberName: 'issue',
            description: 'files an issue',
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
        var reportembed = {
            embed: {
                color: 3447003,
                title: report,
                description: text
            }
        }
        issuechannel.send(reportembed);
    }
};