module.exports = {
    name: "volume",
    description: "Permet de changer le volume du bot",
    category: "moderation",
    async execute(message, args, options) {
        const connection = options.voiceConnection;
        options.dispatcher.setVolumeLogarithmic(parseInt(args[0])/100);
    }
};