module.exports = {
	name: 'mtg',
	description: 'Returns a magic card, takes a search query.',
	execute(message, args) {
        if(args.length <= 0) {
            return message.channel.send("You need a search query.");
        }
		var xhr = new XMLHttpRequest();
        var data = args[0];
        for(var i = 1; i < args.length; i++) {
            data += '+';
            data += args[i];
        }
        xhr.open('GET','https://api.scryfall.com/cards/named?fuzzy=' + data);
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
				message.channel.send('', {files: [xhr.response.image_uris.large]});
			}
		});
		xhr.send();
	},
};
