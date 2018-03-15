const { Command } = require('discord.js-commando', 'discord.js');
var db = require('quick.db')

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'endvote',
            group: 'bigbois',
            memberName: 'endvote',
            description: 'Force end an on-going vote ',
            examples: ['!endvote']
        });
    }
hasPermission(msg) {
        if (msg.member.roles.exists("name", "Administrators") || (msg.member.roles.exists("name", "Moderators"))){
			return true;
		}
		else {
		return false;
		}
    }
	
    run(msg) {
db.updateText(`userUp`,"");
db.updateText(`userDown`,"");
db.updateText(`userAb`,"");
db.fetchObject("Vote").then(i=>{
if (i.value == 0) return msg.reply(`There is no vote taking place`);
db.updateValue("Vote",`-${i.value}`);
return msg.reply(`Done.`);
});
}		
};

    


