module.exports = {
	name: 'pokemon',
	description: 'Returns a pokemon',
	execute(message, args) {
        if(args.length <= 0) {
            return message.channel.send("You need a search query.");
        }
		var xhr = new XMLHttpRequest();
        var data = args[0];
        xhr.open('GET','https://pokeapi.co/api/v2/pokemon/' + data);
		xhr.responseType = 'json';
		xhr.addEventListener('load',function(){
            var pokemon = xhr.response;

            var pokestring = 'Ditto\n';
            pokestring += pokemon.sprites['other']['official-artwork']['front_default'];
            pokestring += '\nTypes: '
            for(var i = 0; i < pokemon.types.length; i++) {
                pokestring += '`' + pokemon.types[i].type.name + '` ';
            }
            message.reply(pokestring);   
		});
		xhr.send();
	},
};