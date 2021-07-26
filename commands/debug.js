module.exports = {
	name: 'debug',
	description: 'Allows execution of arbitrary JavaScript',
	execute(message, args) {
    if(message.author.id !== admin_id){
      return;
    }
    var command = '';
    for(var i = 0; i < args.length; i++){
      command += args[i] + ' ';
    }
    command.trim();
    message.reply('Ran:\n `' + command + '`');
    eval(command);
	}
};
