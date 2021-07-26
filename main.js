global.XMLHttpRequest = require('xhr2');
const fs = require('fs');
const Discord = require('discord.js');
global.admin_id = require('./config.json').admin_id;
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
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
client.login(process.env.DISCORD);
