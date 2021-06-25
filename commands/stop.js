module.exports = {
    name: "stop",
    description: "Permet de stoper le bot",
    category: "moderation",
    async execute(message) {
        await message.reply("Bot is shutting down.");
        process.exit(0);
    }
};