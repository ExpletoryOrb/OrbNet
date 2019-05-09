module.exports = {
    name: 'vikingknight',
    description: 'Summons the Viking Knight',
    args: false,
    guildOnly: false,
    execute(message, args) {
        message.channel.send(`Tread carefully, you are summoning: <@232479102831951872>`);
    }
}