module.exports = {
	name: 'dog',
	description: 'Returns a random Dog',
	execute(message, args) {
		var xhr = new XMLHttpRequest();
        xhr.open('GET','https://dog.ceo/api/breeds/image/random');
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
				message.channel.send('',{files: [xhr.response.message]});
			}
		});
		xhr.send();
	},
};
