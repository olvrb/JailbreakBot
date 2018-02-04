const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: '?',
    owner: '267407075905110016',
    disableEveryone: true
});
client.on("ready", () => {
    console.log(`Started with ${client.users.size} users, in ${client.guilds.size} guilds and with ${client.channels.size} channels.`);
});
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['roles', 'Role Assignment']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands( {
        ping: false,
        eval: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login("NDA5Nzk2MzA1ODY3NTA1NjY3.DVj0Dw.FeNHz6bnIIbkpIG-ztw7JtiPJmg");