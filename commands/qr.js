module.exports = {
	name: 'qr',
	description: 'Makes a QR Code',
	execute(message, args) {
        if(args.length <= 0) {
            return message.channel.send("You need to specify data to encode into a QR");
        }
		var xhr = new XMLHttpRequest();
        var data = args[0];
        for(var i = 1; i < args.length; i++) {
            data += '%20';
            data += args[i];
        }
        xhr.open('GET','https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + data);
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
			if(xhr.status === 200){
				message.channel.send('',{files: [xhr.responseURL]});
			}
		});
		xhr.send();
	},
};
