const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "sondage",
    description: "Permet de poser une question fermé",
    aliases: ["ask", "question", "query"],
    usage: "<query>",
    category: "Moderation",
    args: true,
    guildOnly: true,
    permission: "MANAGE_CHANNELS",
    execute(message, args) {
        const nomCreateur = message.member.nickname ? message.member.nickname : message.author.username;

        const thumbsup = message.guild.emojis.cache.find(emoji => emoji.name === 'thumbsup');
        const thumbsdown = message.guild.emojis.cache.find(emoji => emoji.name === 'thumbsdown');

        const Embed = new MessageEmbed()
            .setColor(0xffc300)
            .setTitle("Sondage créé par @" + nomCreateur)
            .setDescription(args.slice(0).join(" "))
            .setThumbnail(message.author.avatarURL())
            .addField("Réactions", `${thumbsup} = Oui!\n${thumbsdown} = Non!`);
        message.channel.send(Embed).then((messageToReact) => {
            messageToReact.react(thumbsup);
            messageToReact.react("\:thumbsdown:");
            message.delete({ timeout: 500 }).catch(console.error);
        });
    },
};