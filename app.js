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

client.on("message", message => {
    if (message.member.roles.exists("name", "Police")) return;
    /* this isn't needed anymore, april fools is over
    let bannedWords = ['anime', 'eta son', 'xarold', 'hackyouriphone', 'biteyourapple', 'cunt', 'pussy', 'eta s0n'];
    for (let word of bannedWords) {
        if (message.content.toLowerCase().includes(word)) message.delete("bad word");
    }*/
});

client.on("guildMemberAdd", async member => { //es-lint disable unused-variable
    const checkMember = await db.fetchObject(member.guild.id + member.user.id + "_pirate");
    if (!checkMember.text) return;
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
        ['genius-bar', 'Commands for genius-bar'],
        ['support', 'Commands for tickets.']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        ping: false,
        help: false,
        eval: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login("NzQ2ODczNDQzMzI4MTk2NjU4.X0GqGQ.BRP95vhVteLSshyBEkW6NHGkQO4");
