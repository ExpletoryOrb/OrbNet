const fetch = require('node-fetch')
const { alphabaseurl } = require('./../alphaConfig.json')

module.exports = {
    name: 'alphaclan',
    description: 'retrieve alpha sc2 team league clan details',
    args: true,
    guildOnly: false,
    aliases: ['klan'],
    usage: '[command name] <clan number/tag> <show player info true/false>',
    execute(message, args) {
        let data = [];
        if (args[0]) {
            fetch(`${alphabaseurl}clan=${args[0]}`)
                .then(checkResponse)
                .then(response => response.json())
                .then(json => {
                    handleResponse(json, data, message, args);
                })
        }
    },
}

function checkResponse(res) {
    if (res.ok) {
        return res;
    } else {
        throw new Error(res.statusText);
    }
}

function racesMatch(elem1, elem2) {
    return elem1 === elem2;
}

function handleResponse(json, data, message, args) {
    data.push(`Klan: ${json.name}`);
    data.push(`Namn: ${json.tag}`);
    data.push(`Land: ${json.country}`);
    data.push(`Logga: ${json.logo}`);
    data.push(`Hemsida: ${json.website}`);
    data.push(`Twitter: ${json.twitter}`);

    var playerString = "\n";
    if (args[1]) {
        playerString += `Spelare:\n`;
        json.players.forEach(player => {
            playerString += ` Nickname: ${player.nickname}`;
            playerString += ` Ras: ${player.race.toLowerCase()}`;
            playerString += ` Liga: ${player.league.toLowerCase()}`;

            let obj = player.bnetdata.soloLadders[player.bnetdata.soloLadders.findIndex(item => racesMatch(item.race, player.race))];
            if (obj != null && obj != undefined) {
                playerString += ` Huvudras mmr: ${obj.mmr}`;
            } else {
                playerString += ` Huvudras mmr: - `;
            }
            playerString += `\n`;
        });
    }

    message.channel.send(`${data.join("\n") + playerString}`);
}