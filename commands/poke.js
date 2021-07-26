module.exports = {
	name: 'poke',
	description: 'Poke Somebody',
	execute(message, args) {
		if(!message.channel.nsfw){
			message.reply('You can\'t use this command in a sfw channel.');
			return;
		}
		var xhr = new XMLHttpRequest();
        xhr.open('GET','https://api.waifu.pics/sfw/poke');
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
				message.channel.send('',{files: [xhr.response.url]});
			}
		});
		xhr.send();
	},
};
