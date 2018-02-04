const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: '?',
    owner: '267407075905110016',
    disableEveryone: true
});
client.on("ready", () => {
    console.log(`Started with ${client.users.size} users, in ${client.guilds.size} guilds and with ${client.channels.size} channels.`);
    client.user.setPresence({ game: { name: 'with the devs', type: 0 } });
});
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['roles', 'Role Assignment'],
        ['meta', 'Command about the bot itself']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands( {
        ping: false,
        eval: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login("NDA5Nzk2MzA1ODY3NTA1NjY3.DVkAhA.OoHv377-6HsuqP59XGjGXkjzFPw");