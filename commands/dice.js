module.exports = {
    name: 'dice',
    description: 'Roll one or several dies',
    usage: '<face of dies> <number of dies> <view long result>',
    aliases: ['dieroll', 'roll'],
    cooldown: 1,
    execute(message, args) {
        let value = 6;
        let numberOfRolls = 1;
        let text = "";
        let resText = "";
        let showLongRes = false;
        let result = [];
        let sum = 0;
        let avg = 0;

        if (args[0]) {
            if (args[0] <= 0) {
                message.reply('Values must be higher than 0');
                return;
            }
            value = parseInt(args[0]);
            if (value == NaN || value > 10000) value = 6;
        }

        if (args[1]) {
            if (args[1] <= 0) {
                message.reply('Values must be higher than 0');
                return;
            }
            numberOfRolls = parseInt(args[1]);
            if (numberOfRolls == NaN || numberOfRolls > 500) numberOfRolls = 1;
        }

        if (args[2]) {
            showRes = args[2].toLowerCase() === 'true' ? true : false;
        }

        for (i = 0; i < numberOfRolls; i++) {
            result.push(Math.floor(Math.random() * value) + 1);
        }

        text = `Using face: ${value} and ${numberOfRolls} roll(s), result: `;

        for (i = 0; i < result.length; i++) {
            sum += result[i];
            resText += result[i].toString() + ', ';
        }

        resText.trim(',');
        if (sum > 0 && numberOfRolls > 0) avg = Math.round((sum / numberOfRolls) * 100) / 100;

        message.channel.send(`${text} sum: ${sum}, average: ${avg}, rolls: ${resText.substring(0, showLongRes ? 5000 : 200)}.`);
    },
};