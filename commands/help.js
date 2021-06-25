const { MessageEmbed } = require("discord.js");
const configBot = require('../botconfig.json')

module.exports = {
    name: "help",
    description: "Permet d'avoir le détail des commandes disponibles",
    category: "utilitaire",
    async execute(message, args) {
        const { commands } = message.client;

        if (!args.length) {
            const Embed = new MessageEmbed()
                .setTitle("Aide")
                .setDescription("Voici la liste des commandes :")
                .addFields([
                    {
                        name: "Utilitaire",
                        value: `\`${
                            commands
                                .filter((cmd) => cmd.category == "utilitaire")
                                .map((cmd) => cmd.name)
                                .join("`\n`") || "Aucune commande trouvé"
                        }\``,
                    },
                ], [
                    {
                        name: "Modération",
                        value: `\`${
                            commands
                                .filter((cmd) => cmd.category == "moderation")
                                .map((cmd) => cmd.name)
                                .join("`\n`") || "Aucune commande trouvé"
                        }\``,
                    },
                ])
                .setFooter(
                    `Tu peux envoyer ${configBot.prefix}help pour avoir plus de détail sur la commande`
                );

            return message.author
                .send(Embed)
                .then(() => {
                    if (message.channel.type === "dm") return;
                    message.channel.send("Regarde tes messages privés pour les commandes !");
                })
                .catch((error) => {
                    console.error(
                        `Impossible d'envoyer un message à ${message.author.tag}.\n`,
                        error
                    );
                    message.channel.send(
                        'Impossible de te répondre en privé'
                    );
                });
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("Cette commande est invalide");
        }

        const Embed = new MessageEmbed().setTitle(command.name);

        if (command.aliases) Embed.addField("Aliases", command.aliases.join(", "));
        if (command.category) Embed.addField("Catégorie", command.category);
        if (command.description) Embed.addField("Description", command.description);
        if (command.usage)
            Embed.addField("Usage", `\`${prefix}${command.name} ${command.usage}\``);

        message.channel.send(Embed);
    }
};