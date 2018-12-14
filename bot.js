var Discord = require('Discord.js');
var logger = require('winston');
var auth = require('./auth.json');

//configure logger settings 
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message: ', function (message){//user, userID, channelID, message, evt){
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    message.channelID.send('hello');
    
});