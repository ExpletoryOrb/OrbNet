module.exports = {
    name: 'vikingknight',
    description: 'Summons the Viking Knight',
    args: false,
    guildOnly: false,
    execute(message, args) {
        if(message.guild.id === '291262363569618944'){
            message.channel.send(`Tread carefully, you are summoning: <@232479102831951872>`);
        }else{
            message.channel.send('Command not available on this server');
        }
    }
}