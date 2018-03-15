const { Command } = require('discord.js-commando', 'discord.js');
const { MessageEmbed } = require("discord.js");
var Discord = require('discord.js');
const db = require('quick.db')

function voteReset() {
    db.updateText(`userUp`, "");
    db.updateText(`userDown`, "");
    db.updateText(`userAb`, "");
    db.fetchObject("Vote").then(i => {
        db.updateValue("Vote", `-${i.value}`);

    });
}

function userFinder(array, msg, user, geniusesCount, msg2, msg3, element) {


    msg3.delete();
    element.send(`Thank you!`);
    const result = array.filter(user => user != `<@410872740363501571>`)
    db.fetchObject(`userUp`).then(u => {
        console.log(u);
        db.fetchObject(`userDown`).then(d => {
            db.updateText(`userUp`, u.text + ` <@${result[0].id}>`).then(i => {
                db.fetchObject(`userAb`).then(a => {
                    var one = (i.text.match(/@/g) || []).length;
                    var two = (d.text.match(/@/g) || []).length;
                    var three = (a.text.match(/@/g) || []).length;
                    var whole = one + two + three;
                    console.log(whole);
                    if (whole > geniusesCount) {
                        voteReset();
                        return msg2.reply(`An error  has occurred`);
                    }
                    if (geniusesCount == whole) {
                        msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${i.text} \n No:${d.text} \n Abstainers:${a.text} \n**------VOTE ENDED------**`);
                        voteReset();
                    } else {
                        msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${i.text} \n No:${d.text} \n Abstainers:${a.text} \n`);
                    }
                });
            });
        });
    });



    return result

}

function userFinder2(array, msg, user, geniusesCount, msg2, msg3, element) {
    msg3.delete();
    element.send(`Thank you!`);
    const result = array.filter(user => user != `<@410872740363501571>`)
    db.fetchObject(`userDown`).then(u => {
        console.log(u);

        db.updateText(`userDown`, u.text + ` <@${result[0].id}>`).then(i => {
            db.fetchObject(`userUp`).then(d => {
                db.fetchObject(`userAb`).then(a => {
                    var one = (i.text.match(/@/g) || []).length;
                    var two = (d.text.match(/@/g) || []).length;
                    var three = (a.text.match(/@/g) || []).length;
                    var whole = one + two + three;
                    console.log(whole);
                    if (whole > geniusesCount) {
                        voteReset();
                        return msg2.reply(`An error  has occurred`);
                    }
                    if (geniusesCount == whole) {
                        msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${d.text} \n No:${i.text} \n Abstainers:${a.text} \n**----VOTE ENDED----**`);
                        voteReset();
                    } else {
                        msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${d.text} \n No:${i.text} \n Abstainers:${a.text} \n`);
                    }
                });
            });
        });
    });
    return result

}

function userFinder3(array, msg, user, geniusesCount, msg2, msg3, element) {
    msg3.delete();
    element.send(`Thank you!`);

    const result = array.filter(user => user != `<@410872740363501571>`)
    db.fetchObject(`userAb`).then(u => {
        console.log(u);

        db.updateText(`userAb`, u.text + ` <@${result[0].id}>`).then(i => {
            db.fetchObject(`userUp`).then(a => {
                db.fetchObject(`userDown`).then(d => {
                    var one = (i.text.match(/@/g) || []).length;
                    var two = (d.text.match(/@/g) || []).length;
                    var three = (a.text.match(/@/g) || []).length;
                    var whole = one + two + three;
                    if (whole > geniusesCount) {
                        voteReset();
                        return msg2.reply(`An error  has occurred`);
                    }
                    if (geniusesCount == whole) {
                        msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${a.text} \n No:${d.text} \n Abstainers:${i.text} \n**------VOTE ENDED------**`);
                        voteReset();
                    } else {
                        msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${a.text} \n No:${d.text} \n Abstainers:${i.text} \n`);
                    }
                });
            });
        });
    });


    return result

}
module.exports = class SayCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'votegenius',
                group: 'bigbois',
                memberName: 'votegenius',
                description: 'Genius voting system	',
                examples: ['!votegenius @AlexK#0001'],
                args: [{
                    key: 'user',
                    prompt: 'Who do you want to nominate?',
                    type: 'member'
                }]
            });
        }

        hasPermission(msg) {
            if (msg.member.roles.exists("name", "Administrators") || (msg.member.roles.exists("name", "Moderators"))) {
                return true;
            } else {
                return false;
            }
        }
        run(msg, { user }) {
                const discourt = msg.guild.channels.find("name", "discourt");
                const upvote = msg.guild.emojis.find("name", "upvote");
                const downvote = msg.guild.emojis.find("name", "downvote");
                const x = msg.guild.emojis.find("name", "x_")
                const roleID = `423861102716125184`;
                const geniuses = msg.guild.roles.get(roleID).members;
                const geniusesCount = msg.guild.roles.get(roleID).members.array().length;
                const votemsg = `**Genius nomination from ${msg.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes: \n No: \n Abstainers: \n`;
                db.fetchObject("Vote").then(i => {
                            if (i.value >= 1) return msg.reply(`A vote is already taking place.`);      else db.updateValue("Vote", 1);
                            console.log(i.value);


                            discourt.send(votemsg).then(message =>


                                    geniuses.forEach(function(element) {         element.send(`Hi , ${user} for genius?`).then(message2 => {
                            message2.react(upvote)
                            message2.react(downvote)
                            message2.react(x)
                            const filter = (reaction, user) => reaction.emoji.name === upvote.name && user.id != message2.author.id
                            const filter2 = (reaction, user) => reaction.emoji.name === downvote.name && user.id != message2.author.id
                            const filter3 = (reaction, user) => reaction.emoji.name === x.name && user.id != message2.author.id
                            const collector = message2.createReactionCollector(filter, { max: 1 });
                            const collector2 = message2.createReactionCollector(filter2, { max: 1 });
                            const collector3 = message2.createReactionCollector(filter3, { max: 1 });
                            collector.on('collect', r => console.log(`R = ${userFinder(r.users.array(),message,user,geniusesCount,msg,message2,element)}`))
                            collector2.on('collect', r => console.log(`R = ${userFinder2(r.users.array(),message,user,geniusesCount,msg,message2,element)}`));
                            collector3.on('collect', r => console.log(`R = ${userFinder3(r.users.array(),message,user,geniusesCount,msg,message2,element)}`));



                        }

                    )

                })
            );
        });
    }
};return result

}
function userFinder2(array,msg,user,geniusesCount,msg2,msg3,element){
	msg3.delete();
	element.send(`Thank you!`);
const result = array.filter(user =>user != `<@410872740363501571>` )
db.fetchObject(`userDown`).then(u => {
	console.log(u);

		db.updateText(`userDown`, u.text + ` <@${result[0].id}>`).then(i => {
			db.fetchObject(`userUp`).then(d => {
				db.fetchObject(`userAb`).then(a => {
	var one = (i.text.match(/@/g) || []).length;
				var two = (d.text.match(/@/g) || []).length;
				var three = (a.text.match(/@/g) || []).length;
			var whole = one + two + three;
			console.log(whole);
			if(whole > geniusesCount){
				voteReset(); 
				return msg2.reply(`An error  has occurred`);
			}
			if (geniusesCount == whole){
				    msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${d.text} \n No:${i.text} \n Abstainers:${a.text} \n**----VOTE ENDED----**`);
			voteReset();
			}
			
else {
    msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${d.text} \n No:${i.text} \n Abstainers:${a.text} \n`);
}				});
	});
		});
});
return result

}
function userFinder3(array,msg,user,geniusesCount,msg2,msg3,element){
	msg3.delete();
	element.send(`Thank you!`);
	
const result = array.filter(user =>user != `<@410872740363501571>` )
db.fetchObject(`userAb`).then(u => {
	console.log(u);

		db.updateText(`userAb`, u.text + ` <@${result[0].id}>`).then(i => {
			db.fetchObject(`userUp`).then(a => {
				db.fetchObject(`userDown`).then(d => {
	var one = (i.text.match(/@/g) || []).length;
	var two = (d.text.match(/@/g) || []).length;
    var three = (a.text.match(/@/g) || []).length;
	var whole = one + two + three;
	if(whole > geniusesCount){
	voteReset(); 
		return msg2.reply(`An error  has occurred`);
			}
	if (geniusesCount == whole){
		msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${a.text} \n No:${d.text} \n Abstainers:${i.text} \n**------VOTE ENDED------**`);
			voteReset();
			}
			
             else {
    msg.edit(`**Genius nomination from ${msg2.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes:${a.text} \n No:${d.text} \n Abstainers:${i.text} \n`);
}});
		});
		});
		});


return result

}
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'votegenius',
            group: 'bigbois',
            memberName: 'votegenius',
            description: 'Genius voting system	',
            examples: ['!votegenius @AlexK#0001'],
            args: [
                {
                    key: 'user',
                    prompt: 'Who do you want to nominate?',
                    type: 'member'
                }
            ]
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
     run(msg,{user}) {
	const discourt = msg.guild.channels.find("name","discourt");		
	const upvote = msg.guild.emojis.find("name","upvote");
	const downvote = msg.guild.emojis.find("name","downvote");
    const x = msg.guild.emojis.find("name","x_")
	const roleID = `423861102716125184`;
	const geniuses = msg.guild.roles.get(roleID).members;
	const geniusesCount = msg.guild.roles.get(roleID).members.array().length;
	const votemsg = `**Genius nomination from ${msg.author.username}** \n Nominated genius : ${user} \n **-----VOTES-----** \n Yes: \n No: \n Abstainers: \n`;
	db.fetchObject("Vote").then(i=>{ 
	if (i.value >= 1) return msg.reply(`A vote is already taking place.`);
	else db.updateValue("Vote",1);
	console.log(i.value);
	 
	 
	discourt.send(votemsg).then(message => 
	

	geniuses.forEach(function(element) {

  element.send(`Hi , ${user} for genius?`).then(message2 => {
	message2.react(upvote)
    message2.react(downvote)
		message2.react(x)
		const filter = (reaction , user) => reaction.emoji.name === upvote.name && user.id != message2.author.id
		const filter2 = (reaction , user) => reaction.emoji.name === downvote.name && user.id != message2.author.id
		const filter3 = (reaction , user) => reaction.emoji.name === x.name && user.id != message2.author.id
        const collector = message2.createReactionCollector(filter,{max : 1});
		const collector2 = message2.createReactionCollector(filter2 , {max : 1});
		const collector3 = message2.createReactionCollector(filter3 , {max :1});		
       collector.on('collect', r =>console.log(`R = ${userFinder(r.users.array(),message,user,geniusesCount,msg,message2,element)}`)
		)
	collector2.on('collect', r =>console.log(`R = ${userFinder2(r.users.array(),message,user,geniusesCount,msg,message2,element)}`) );
	collector3.on('collect', r => console.log(`R = ${userFinder3(r.users.array(),message,user,geniusesCount,msg,message2,element)}`));
		


                                             }
											 
                               )
						   
})
);
});
}		
};

    


