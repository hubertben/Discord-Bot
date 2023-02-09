var fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
let ammount = 0;
let print_str = '';
let user;

const token = ' - Your Token Number Here - ';
const owner_number = '- Your Owner Number Here - ';
const PREFIX = '#';

const version = '1.2.4'
let list;
let compliment_list;

fs.readFile('Version_Log_Index.txt', 'utf8', function (err, data) {
    if (err) throw err;
    list = data.split('\n');
});

fs.readFile('Compliment_List.txt', 'utf8', function (err, data) {
    if (err) throw err;
    compliment_list = data.split('\n');

    for(let i = 0; i < compliment_list.length; i++){
        compliment_list[i] = compliment_list[i].substring(5);
        //console.log(compliment_list[i]);
    }
});


bot.login(token);

bot.on('message', msg => {

    if (msg.content.charAt(0) === PREFIX) {
        let args = msg.content.substring(PREFIX.length).split(' ');

        ammount = 0;
        print_str = '';

        switch (args[0]) {
            case 'v':
                if (args[1] === 'current') {
                    msg.channel.send('Big_Boy Current Version: ' + version);
                } else if (args[1]) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i] === `Version ${args[1]}:`) {
                            msg.channel.send(list[i]);
                            let j = i + 1;
                            while (list[j].charAt(0) === ' ') {
                                msg.channel.send(list[j]);
                                j++;
                            }
                        }
                    }
                }

                break;
            case 'off':
                if (msg.member.user.id === owner_number) {
                    bot.destroy();
                } else {
                    msg.channel.send('Only the Server Leader can Disable me at this Time', { tts: true });
                }
                break;

            case 'trbl':
                user = msg.mentions.users.first();
                msg.channel.send(`${user.username} is in Big Trouble`, { tts: true });
                break;

            case 'bolbi':
                if (!args[1])
                    ammount = 1;
                else
                    ammount = args[1];

                for (let a = 0; a < ammount; a++)
                    print_str += 'Slap Slap Slap Clap Clap Clap ';

                msg.channel.send(print_str, { tts: true });
                break;

            case 'rep':
                if (!args[1])
                    ammount = 1;
                else
                    ammount = args[1];

                let temp_str = '';
                for (let a = 2; a < args.length; a++)
                    temp_str += args[a] + ' ';

                for (let b = 0; b < ammount; b++)
                    print_str += temp_str;

                msg.channel.send(print_str, { tts: true });
                break;

            case 'say':
                if (!args[1])
                    return;

                for (let a = 1; a < args.length; a++)
                    print_str += args[a] + ' ';

                msg.channel.send(print_str, { tts: true });
                break;

            case 'comp':
                user = msg.mentions.users.first();
                let num = 0;
                if (!user) {
                    msg.channel.send('You Forgot to add a User. Type \'#comp @Username\'');
                    return;
                } else {
                    if (args.length === 2) {
                        num = Math.floor(Math.random() * compliment_list.length);
                        msg.channel.send(`(${num}/${compliment_list.length - 1})`);
                    }
                    if (args.length === 3) {
                        num = args[args.length - 1];
                    }
                }
                let compliment = compliment_list[num];
                if (!user) {
                    msg.channel.send(`#${num} is \"${compliment}\"`, { tts: true });
                } else {
                    msg.channel.send(`${user.username} is ${compliment}`, { tts: true });
                }
                break;

            case 'shot':
            	if(args[1] == 'spin'){
            		let myGuildId = 698010537908371507;
				    let myChannelId = 698010537908371511;

				    console.log(msg)
				    //let guild = client.guilds.cache.get(g => g.Id == myGuildId);
				    //let voiceChannel = guild.Channels.FirstOrDefault(c => c.Id == myChannelId);
				    //let users = voiceChannel.Users;

				    //for (let user of users){
				    //    let dm = user.GetOrCreateDMChannelAsync();
				    //    dm.SendMessageAsync("Greetings");
    				//}
            	}
        }
    }
});


