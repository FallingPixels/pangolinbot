module.exports = {
	name: 'cat',
	description: 'Returns a Cat',
	execute(message, args) {
		var xhr = new XMLHttpRequest();
        xhr.open('GET','https://thatcopy.pw/catapi/rest/');
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
				message.channel.send('',{files: [xhr.response.url]});
			}
		});
		xhr.send();
	},
};
