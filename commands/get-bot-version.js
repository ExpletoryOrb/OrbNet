const data = require('../package.json');

module.exports = {
	name: 'bot-info',
    description: 'Information about the bot.',
    args: false,
    aliases: ['info'],

	execute(message, args) {
		message.channel.send(`Bot info: name = ${data.name}, version = ${data.version}`);
	},
};