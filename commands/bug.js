module.exports = {
	name: 'bug',
	description: 'Returns info on how to submit a bug report.',
	execute(message, args) {
    message.reply('To submit a bug report, put in an issue at: \n https://github.com/FallingPixels/pangolinbot/issues');
	}
};
