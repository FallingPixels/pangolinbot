global.XMLHttpRequest = require('xhr2');
const fs = require('fs');
const Discord = require('discord.js');
global.admin_id = require('./config.json').admin_id;
global.max_times = require('./config.json').max_times;
global.prefix = require('./config.json').prefix;
global.client = new Discord.Client();
client.commands = new Discord.Collection();
const net = require('net');
const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // Handle errors here.
  throw err;
});
server.listen(process.env.PORT, '0.0.0.0');

var commandNames = [];
var helpString = '';
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
    commandNames.push(command.name);
}

commandNames.sort()

client.once('ready', () => {
	console.log('Ready!');
    helpString = '\nList of Commands\n';
    for(var i = 0; i < commandNames.length; i++){
        helpString += '`' + commandNames[i] + '` - ' + client.commands.get(commandNames[i]).description + '\n';
    }
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    if(command === 'help'){
        if(client.commands.has(args[0])){
            message.channel.send(client.commands.get(args[0]).description);
        }
        else{
            message.reply(helpString);
        }
        return;
    }
	if (!client.commands.has(command)) return;

	try {
        if(args[args.length - 2] === 'times' && !isNaN(args[args.length - 1])){
            var num = parseInt(args[args.length - 1]);
            if(message.author.id !== admin_id){
                num = Math.min(max_times, num);
            }
            args.pop();
            args.pop();
            for(var i = 0; i < num; i++){
                client.commands.get(command).execute(message, args);
            }
        }else {
            client.commands.get(command).execute(message, args);
        }
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.DISCORD);
