const { Command } = require("discord.js-commando");
function hasNull(target) {
    for (var member in target) {
        if (target[member] == null)
            return true;
    }
    return false;
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
        _geniuses.forEach(function (genius) {
            if (genius != null) {
                if (genius.user.presence.status == "online")
                    geniuses.push(genius.user);
            }
        });
        var ping = "";
        geniuses.forEach(function (genius) {
            ping += " ";
            ping += genius.username;
        });
        message.reply(ping);
    }
};