const Discord = require('discord.js');
const { RiotAPI, RiotAPITypes, PlatformId } = require('@fightmegg/riot-api');
const configBot = require('./botconfig.json');
const fs = require('fs');

const client = new Discord.Client();
const riotApi = new RiotAPI(configBot.riotApiKey);

client.commands = new Discord.Collection();

const options = {
    voiceConnection: null,
    riotApi
};

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('ready', () => {
    client.user.setActivity('Kolinor coder | !help', {
        type: "WATCHING",
    });
});

client.on('message', message => {
    if (!message.content.startsWith(configBot.prefix)) return;

    const args = message.content.slice(configBot.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) return;

    try {
        command.execute(message, args, options);
    } catch (error) {
        console.error(error);
    }
});

process.on('exit', ()=> {
    if (options.voiceConnection) options.voiceConnection.disconnect();
});

client.login(configBot.botToken);