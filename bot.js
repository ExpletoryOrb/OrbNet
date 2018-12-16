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


client.login(token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
   

client.on('message', msg => {
    if(!msg.guild.available){return;}

    if((msg.content.includes('[[') || msg.content.includes('!card')) && !(msg.content.includes('_')) && msg.channel.id == getChannelIdByName('mtg-general')){

        msg.channel.send('Please use the '+getChannelName('scryfall')+' channel instead when looking up cards');
    }else if(msg.content === `${prefix}ping`){
        msg.channel.send('pong!');
    }
});

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