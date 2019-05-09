const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const io = require('@pm2/io');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command);
});

try {

    io.init({
        metrics: {
            network: {
                ports: true
            }
        }
    })

    loginBot();

    client.on('ready', () => {
        client.user.setActivity("with the human population")
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('reconnecting', () => {
        client.user.setActivity("Reconnecting...")
        console.log(`Reconnecting as ${client.user.tag}!`);
    });

    client.on('error', () => {
        console.log(`Error, trying to log in again as ${client.user.tag}...`);
        loginBot();
    });

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;        
        if (message.author == client.user) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if ((command.usage != null) && (command.usage)) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try{
            command.execute(message,args);
        } catch (error) {
            console.log('could not execute that command');
            message.reply('there was an error executing that command!');
        }
    });

    function loginBot(){
        client.login(token);
        return;
    }

} catch (error) {
    console.log('Outer Error: ' + error.message);
    console.log('Trying to log in again');
    loginBot();
}

/*
var channelIdList = [
    { name: 'introductions', id: '445985208240570369' },
    { name: 'mtg-general', id: '291262363569618944' },
    { name: 'off-topic', id: '445980791156113438' },
    { name: 'judge-questions', id: '489477243974844437' },
    { name: 'deckhelp', id: '445982373591515146' },
    { name: 'mtg-arena', id: '497183549330292736' },
    { name: 'videogames', id: '445980818175819806' },
    { name: 'arguments', id: '445981701332795413' },
    { name: 'scryfall', id: '452179984073883650' },
    { name: 'orbnet', id: '523283864169480230' }
];

var allCommands = [
    { command: `${prefix}help`, desc: `Displays available commands` },
    { command: `${prefix}ping`, desc: `Pings the bot` },
    { command: `${prefix}vikingknight`, desc: `Summons the Viking Knight` },
];*/

/*
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if(!channel) return;
    channel.send('Welcome to the server! ', $(member));
});
*/

/*
function getChannelIdByName(pString) {
    return channelIdList.find(obj => obj.name === pString).id;
};

function getChannelName(pString) {
    return channelIdList.find(obj => obj.name === pString).name;
};

function getAllCommandsInfo() {
    let tempString = '';
    allCommands.forEach(x => {
        tempString += '\n ' + x.command + ' - ' + x.desc + '\n';
    });
    return (tempString == null) ? 'no commands currently available' : tempString;
}*/
