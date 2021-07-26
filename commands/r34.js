const { resourceLimits } = require('worker_threads');

module.exports = {
	name: 'r34',
	description: 'Returns a Rule34 image based on search.',
	execute(message, args) {
		if(!message.channel.nsfw){
			message.reply('You can\'t use this command in a sfw channel.');
			return;
		}
        var query = args[0];
        for(var i = 1; i < args.length; i++){
            query += args[i] + '+';
        }
		var xhr = new XMLHttpRequest();
        xhr.responseType = 'xml';
        xhr.open('GET','https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + query);
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                var parseString = require('xml2js').parseString;
                var top = 0;
                parseString(xhr.response, function (err, result) {
                    var posts = result.posts.post;
                    if(!posts){
                        message.reply('No posts found.');
                        return;
                    }
                    var score = 0;
                    var topPost;
                    for(var i = 0; i < posts.length; i++){
                        var post = posts[i]['$'];
                        if(post.score > score){
                            score = post.score;
                            topPost = post;
                        }
                    }
                    message.channel.send('',{ files: [topPost.file_url] });
                });
            }
        }
		xhr.send();
	},
};
