module.exports = {
	name: 'fox',
	description: 'Returns a Fox',
	execute(message, args) {
		var xhr = new XMLHttpRequest();
        xhr.open('GET','https://randomfox.ca/floof/');
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
				message.reply(xhr.response.image);
			}
		});
		xhr.send();
	},
};