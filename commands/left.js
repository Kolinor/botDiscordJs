module.exports = {
    name: "left",
    description: "Permet au bot de quitter le salon",
    category: "moderation",
    async execute(message, args, options) {
        const connection = options.voiceConnection;
        if (connection) connection.disconnect();
    }
};