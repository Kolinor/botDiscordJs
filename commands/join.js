module.exports = {
    name: "join",
    description: "Permet au bot de rejoindre le salon",
    category: "moderation",
    async execute(message, args, options) {
        if (message.member.voice.channel) {
            options.voiceConnection = await message.member.voice.channel.join();
        }
    }
};