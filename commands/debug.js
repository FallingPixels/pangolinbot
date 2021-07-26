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
    try {
      var output = eval(command);
      if(output === undefined){
        output = 'undefined';
      }
      if(output === null) {
        output = 'null';
      }
      if(output === NaN) {
        output = 'NaN';
      }
      if(typeof output === 'object') {
        output = JSON.stringify(output);
        output = output.substring(0,Math.min(output.length, 2000));
      }
      message.channel.send(output);
    } catch (e) {
      message.channel.send(e.message);
    }
	}
};
