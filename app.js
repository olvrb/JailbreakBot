const { CommandoClient } = require('discord.js-commando');
const path = require('path');
this.embed = function () {
    var reportembed = new MessageEmbed()
        .setTimestamp()
        .setAuthor(author.username, author.displayAvatarURL())
        .setTitle(title)
        .setDescription(desc);
}
const client = new CommandoClient({
    commandPrefix: '&',
    owner: '267407075905110016',
    disableEveryone: true,
    unknownCommandResponse: false
});
client.on("ready", () => {
    console.log(`Started with ${client.users.size} users, in ${client.guilds.size} guilds and with ${client.channels.size} channels.`);
    client.user.setPresence({ game: { name: 'with the devs', type: 0 } });
});

//client.on("");

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['roles', 'Role Assignment'],
        ['meta', 'Command about the bot itself'],
        ['genius-bar', 'Commands for genius-bar']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands( {
        ping: false,
        help: false,
        eval: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));
client.login("MzU4Mjk1ODQwNDIwNTI4MTI4.DVoqAw.WfLm48eKYUS19URJo0Tl91pCLm4");
