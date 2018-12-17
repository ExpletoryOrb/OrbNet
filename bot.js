const Discord = require('Discord.js');
const client = new Discord.Client();

const {prefix,token} = require('./config.json');

var channelIdList = [
    {name: 'introductions', id: '445985208240570369'},
    {name: 'mtg-general', id: '291262363569618944'},
    {name: 'off-topic', id: '445980791156113438'},
    {name: 'judge-questions', id: '489477243974844437'},
    {name: 'deckhelp', id: '445982373591515146'},
    {name: 'mtg-arena', id: '497183549330292736'},
    {name: 'videogames', id: '445980818175819806'},
    {name: 'arguments', id: '445981701332795413'},
    {name: 'scryfall', id: '452179984073883650'},
    {name: 'orbnet', id: '523283864169480230'}
];

//{name: `${prefix}help`, action: ``},
var allCommands = [
    {command: `${prefix}help`, desc: `Displays available commands`},
    {command: `${prefix}ping`, desc: `Pings the bot`},
    {command: `${prefix}daddy`, desc: `Summons the Viking Knight`},
];


client.login(token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
   
/*
if(msg.content === `${prefix}MESSAGE`)
*/

try {
    client.on('message', msg => {
        //if(!msg.guild.available){return;}

        /*if((msg.content.includes('[[') || msg.content.includes('!card')) && !(msg.content.includes('_')) && msg.channel.id == getChannelIdByName('mtg-general')){
            msg.reply(' Please use the '+getChannelName('scryfall')+' channel instead when looking up cards');
            return;
        }*/

        if (msg.author == client.user) {
            return;
        }

        if(msg.content.substring(0,5) === `${prefix}help`){
            msg.author.send(`the available commands are: \n`+getAllCommandsInfo())
            return;
        }

        if(msg.content.substring(0,5) === `${prefix}ping`){
            msg.channel.send('pong!');
            return;
        }

        if(msg.content.substring(0,6) === `${prefix}daddy`){
            let  user = client.users.get('232479102831951872');
            msg.reply(`Tread carefully, you are summoning: ${user}`);
            return;
        }


    });

} catch (error) {
    console.log('could not interpret message');
}

/*
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if(!channel) return;
    channel.send('Welcome to the server! ', $(member));
});
*/
 
function getChannelIdByName(pString){
    return channelIdList.find(obj => obj.name === pString).id
};

function getChannelName(pString){
    return channelIdList.find(obj => obj.name === pString).name
};

function getAllCommandsInfo(){
    let tempString = '';
    allCommands.forEach(x => {
        tempString += '\n '+x.command+' - '+x.desc+'\n';
    });
    return (tempString == null) ? 'no commands currently available' : tempString;
}