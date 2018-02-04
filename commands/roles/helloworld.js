const { Command } = require("discord.js-commando");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'helloworld',
            group: 'roles',
            memberName: 'helloworld',
            description: 'say hello world.',
            examples: ['helloworld']
        });
    }

    async run(message) {
        message.channel.send("Hello World!");
    }
};