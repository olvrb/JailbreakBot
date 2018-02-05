const { Command } = require("discord.js-commando");
const sql = require("sqlite");
sql.open("./geniustime.sqlite");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gettime',
            group: 'genius-bar',
            memberName: 'gettime',
            description: 'Gets your available time',
            examples: ['gettime']
        });
    }

    async run(message) {
        sql.get(`SELECT * FROM available WHERE userId ="${message.author.id}"`).then(row => {
            message.channel.send(`${row.fromtime} to ${row.totime}`);
            //message.delete(1000);
        }).catch(() => {
            message.channel.send("You have not setup a time, set one up via the command 'settime'");
            //message.delete(1000);
        });
    }
};