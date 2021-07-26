module.exports = {
	name: 'hentai',
	description: 'Returns a nsfw Waifu. Optional argument of waifu, neko, trap, or blowjob.',
	execute(message, args) {
		if(cache['hentai_urls'] === undefined){
			cache['hentai_urls'] = [];
		}
		if(!message.channel.nsfw){
			message.reply('You can\'t use this command in a sfw channel.');
			return;
		}
		var categories = ['waifu','neko','trap','blowjob'];
		let category = categories[0];
		for(var i = 0; i < categories.length; i++) {
			if(args[0] === undefined){
				category = categories[i];
				break;
			}
			if(args[0].toLowerCase() === categories[i]) {
				category = categories[i];
				break;
			}
		}
		var xhr = new XMLHttpRequest();
        xhr.open('GET','https://api.waifu.pics/nsfw/' + category);
		xhr.responseType = 'json';
		xhr.setRequestHeader('exclude',cache['hentai_urls']);
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
				message.channel.send('',{files: [xhr.response.url]});
				if(cache['hentai_urls'].length >= 100){
					cache['hentai_urls'].shift();
				}
				cache['hentai_urls'].push(xhr.response.url);
			}
		});
		xhr.send();
	},
};
