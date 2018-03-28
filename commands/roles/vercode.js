const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vercode',
            group: 'roles',
            memberName: 'vercode',
            description: 'Generate a verification code.',
            examples: ['vercode'],
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "Please input a valid member.",
                    type: "member"
                }
            ]
        });
    }
    hasPermission(message) {
        return (message.member.roles.exists("name", "Geniuses™") || message.member.roles.exists("name", "Moderators") || message.member.roles.exists("name", "Electra Geniuses™"));
    }
    async run(message, { member }) {
        const code = makeid();
        const pirateEmbed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setTitle("Genius Script Verification Code")
            .setDescription(`Verification code: ${code}`)
            .addField("Instructions", 
`1. Download the attached file to your device using wget, curl or any of the like.
2. cd to the directory where you placed the file.
3. Run \`chmod +x genius_script.x\`.
4. Followed by \`./genius_script.sh.x ${code}\`. If you get errors, run as superuser (\`su\`, then enter password (default is \`alpine\`))
5. Send the output link to the Genius™ reqeusting it.
6. ???
7. Profit`);
        const geniusEmbed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setTitle("Genius Script Verification Code")
            .setDescription(`Verification code for ${member.user.username}: ${code}`)
        message.author.send(geniusEmbed);
        member.send({
            content: "https://cdn.discordapp.com/attachments/409799854714257408/428511470213660684/genius_script.sh.x",
            embed: pirateEmbed
        });
    }
};

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }