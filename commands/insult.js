module.exports = {
	name: 'insult',
	description: 'Insults you.',
	execute(message, args) {
		var xhr = new XMLHttpRequest();
        xhr.open('GET','https://evilinsult.com/generate_insult.php?lang=en&type=json');
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
                var insult = xhr.response.insult;
                insult.replace(insult,'&quot;','');
                message.channel.send(insult);
			}
		});
		xhr.send();
	},
};