module.exports = {
	name: 'pingable',
	description: 'Changes attributes of the pingable role',
	usage: '<lock/unlock>',
	execute(message, args) {

		if(!(message.member.roles.some(role => role.name === 'Admin'))){
			message.channel.send(`You are not authorised to use that command`);
			return;
		}

		action = args[0].toLowerCase();
		if((action != 'lock') && (action != 'unlock')){
			message.channel.send(`Invalid argument, use the help command to see valid arguments`);
			return;
		}

		const guild = message.guild
		const role = guild.roles.find(obj => obj.name === 'Pingable');
		let isMentionable = role.mentionable;
		let res;

		if (role != null) {
			if (role.mentionable) {
				if (action === 'lock') {
					res = false
				}
			} else {
				if (action === 'unlock') {
					res = true;
				}
			}
		}

		if (res != null) {
			role.edit({ mentionable: res })
				.then(updated => message.channel.send(`Edited role mentionable from ${isMentionable} to ${updated.mentionable}`))
				.catch(console.error);
		}
	},
};