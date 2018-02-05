const { Command } = require("discord.js-commando");
const sql = require("sqlite");
sql.open("./geniustime.sqlite");
function between(a, b, c) {
    return ((a < b) && (b < c));
}
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'genius-bar',
            memberName: 'ping',
            description: 'Ping available geniuses!',
            aliases: ['geniuses', 'pinggenius', 'genius'],
            examples: ['ping']
        });
    }

    async run(message) {
        var role = message.guild.roles.get("355177530061357057");
        var geniuses = [];
        var _geniuses = role.members.array();
        message.channel.send(message.author + " has mentioned the available geniuses");
        _geniuses.forEach(function (genius) {
            if (genius != null) {
                var from;
                var to;
                var topush = "none";
                sql.get(`SELECT * FROM available WHERE userId ="${genius.user.id}"`).then(row => {
                    if (!row) return;
                    if (!row.fromtime) return;
                    if (!row.totime) return;
                    from = row.fromtime.split(":");
                    to = row.totime.split(":");
                    var cur = new Date();
                    var h = cur.getUTCHours();
                    var m = cur.getUTCMinutes();
                    var hourmatch = between(from[0], h, to[0]);
                    var minutematch = true;
                    if (from[0] == h || to[0] == h) {
                        console.log("hour match");
                        minutematch = between(from[1], m, to[1]);
                    }
                    if (hourmatch && minutematch) {
                        topush = genius;
                    }
                }).catch(() => {
                    console.log("error");
                }).then(() => {
                    if (topush != null && topush != "none") {
                        var name = topush.user.username;
                        message.channel.send(name).then(function (msg) {
                            msg.delete(10000);
                        });
                    }
                });
            }
        });
    }
};