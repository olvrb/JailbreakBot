const {
    CommandoClient
} = require('discord.js-commando');
const path = require('path');
const config = require("./config.json");
const db = require("quick.db");
const client = new CommandoClient({
    commandPrefix: '?',
    owner: '267407075905110016',
    unknownCommandResponse: false
});
client.on("ready", () => {
    console.log(`Started with ${client.users.size} users, in ${client.guilds.size} guilds and with ${client.channels.size} channels.`);
});

client.on("guildMemberAdd", member => { //es-lint disable unused-variable
    const checkMember = db.fetchObject(member.guild.id + member.user.id + "_pirate");
    if (checkMember.text.length !== 18) return;
    const pirateRole = member.guild.roles.find("name", "Pirate");
    const roleArray = member.roles.array(); // discord.js has a weird way of handling role adding on master
    roleArray.push(pirateRole); // so we just do this
    member.edit({
        roles: roleArray
    });
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['roles', 'Role Assignment'],
        ['meta', 'Command about the bot itself'],
        ['genius-bar', 'Commands for genius-bar']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        ping: false,
        help: false,
        eval: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);