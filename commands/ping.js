module.exports = {
    name: "ping",
    description: "Permet de ping le bot",
    category: "utilitaire",
    execute(message, args) {
        const { ws } = message.client;
        message.channel.send(`Ping: ${ws.ping} ms`);
    }
};