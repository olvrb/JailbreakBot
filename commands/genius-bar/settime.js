const { Command } = require("discord.js-commando");
const sql = require("sqlite");
sql.open("./geniustime.sqlite");
class Time {
    constructor(time) {
        this.display = time;
        var hm = time.split(":");
        this.hour = hm[0];
        this.minute = hm[1];
    }
    toString() {
        return this.display;
    }
}
module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'settime',
			group: 'genius-bar',
			memberName: 'settime',
			description: 'Set available time! (in UTC)',
            examples: ['!time 00:00 23:59'],
            args: [
                {
                    key: 'from',
                    prompt: "Available from?",
                    type: 'string'
                },
                {
                    key: 'to',
                    prompt: 'To?',
                    type: 'string'
                }
            ]
		});
	}

    async run(message, { from, to }) {
        var fromtime = new Time(from.replace(":", ":"));
        var totime = new Time(to.replace(":", ":"));
        message.channel.send(fromtime.display + " to " + totime.display);
        sql.get(`SELECT * FROM available WHERE userId ="${message.author.id}"`).then(row => {
            if (!row)
                sql.run("INSERT INTO available (userId, fromtime, totime) VALUES (?, ?, ?)", [message.author.id, fromtime.toString(), totime.toString()]);
            else
                sql.run(`UPDATE available SET fromtime = "${fromtime.toString()}", totime = "${totime.toString()}" WHERE userId = ${message.author.id}`);
        }).catch(() => {
            sql.run("CREATE TABLE IF NOT EXISTS available (userId TEXT, fromtime TEXT, totime TEXT)").then(() => {
                sql.run("INSERT INTO available (userId, fromtime, totime) VALUES (?, ?, ?)", [message.author.id, fromtime.toString(), totime.toString()]);
            });
        });
        message.reply(`Done! Sat your available time to ${fromtime} to ${totime}`);
        //message.delete(1000);
	}
};