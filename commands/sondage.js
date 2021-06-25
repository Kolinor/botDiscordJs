const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "sondage",
    description: "Permet de poser une question fermé",
    aliases: ["ask", "question", "query"],
    usage: "<query>",
    category: "moderation",
    args: true,
    guildOnly: true,
    permission: "MANAGE_CHANNELS",
    async execute(message, args) {
        const nomCreateur = message.member.nickname ? message.member.nickname : message.author.username;

        const thumbsup = ':thumbsup:';
        const thumbsdown = ':thumbsdown:';

        const Embed = new MessageEmbed()
            .setColor(0xffc300)
            .setTitle("Sondage créé par @" + nomCreateur)
            .setDescription(args.slice(0).join(" "))
            .setThumbnail(message.author.avatarURL())
            .addField("Réactions", `${thumbsup} = Oui!\n${thumbsdown} = Non!`);
        const messageToReact = await message.channel.send(Embed);

        messageToReact.react("👍");
        messageToReact.react("👎");

        try {
            message.delete({ timeout: 500 })
        } catch (error) {
            console.error(error);
        }
    },
};