const play = require('discordjs-ytdl');
const ytdl = require('ytdl-core');
const YouTubeAPI = require("simple-youtube-api");
const configBot = require('../botconfig.json');
const youtube = new YouTubeAPI(configBot.youtubeApiKey);

module.exports = {
    name: "play",
    description: "Permet de jouer une musique",
    category: "moderation",
    async execute(message, args, options) {
        const connection = options.voiceConnection;
        if (connection) connection.disconnect()
        try {

            // const stream = await ytdl(, { highWaterMark: 1 << 25 });

            // const stream = ytdl(args[0], { filter: 'audioonly'});

            const serverQueue = message.client.queue.get(message.guild.id);
            if (!channel) return message.reply("Il faut être dans un channel pour jouer de musique");
            if (serverQueue && channel !== message.guild.me.voice.channel)
                return message
                    .reply('Nous ne somme pas dans le même channel', { user: message.client.user });


            const results = await youtube.searchVideos(args[0], 1, { part: "snippet" });
            // const stream = await ytdl(args[0], { highWaterMark: 1 << 25, filter: 'audioonly', quality: 'lowestaudio' });
            // const stream = await ytdl(, { highWaterMark: 1 << 25 });

            const stream = ytdl(args[0], { opusEncoded: true });
            console.log(results);

            const dispatcher = connection.play(stream)/*.on("error", (err) => {
                console.error(err);
            });*/;
            dispatcher.setVolumeLogarithmic(20/100);

            // connection.play(ytdl('https://www.youtube.com/watch?v=VPCHiqtGscw&ab_channel=mariofan5', { quality: 'highestaudio' }));
            // connection.play(stream);
        } catch (error) {
            console.error(error);
        }

    }
};