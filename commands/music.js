const play = require('discordjs-ytdl');

module.exports = {
    name: "music",
    description: "Permet d'écouter de la musique",
    category: "moderation",
    async execute(message, args, options) {
        const connection = options.voiceConnection;
        if (connection) connection.disconnect();

        await play.play(connection, args[0], '');
    }
};