const { PlatformId, DDragon  } = require('@fightmegg/riot-api');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "riot",
    aliases: ["r"],
    description: "Permet d'avoir des informations sur un profil de la league",
    category: "fun",
    async execute(message, args, options) {
        const riotApi = options.riotApi;

        switch (args[0]) {
            case 'p':
            case 'player':
                const summoner = await riotApi.summoner.getBySummonerName({
                    region: PlatformId.EUW1,
                    summonerName: args[1],
                });
                const profilIcones = await riotApi.ddragon.profileIcons();

                const Embed = new MessageEmbed()
                    .setColor(0xFF3104)
                    .setTitle("Profil de " + args[1])
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${profilIcones.version}/img/profileicon/${profilIcones.data[summoner.profileIconId].image.full}`)
                    .addField("Niveau", `${summoner.summonerLevel}`);
                message.channel.send(Embed);
                break;
        }


        // let str = '';
        // const summoner = await riotApi.summoner.getBySummonerName({
        //     region: PlatformId.EUW1,
        //     summonerName: args[0],
        // });
        // const { matches } = await riotApi.match.getMatchlistByAccount({
        //     region: PlatformId.EUW1,
        //     accountId: summoner.accountId
        // });
        // console.log(match);
        //
        // const game = await riotApi.match.getById({
        //     region: PlatformId.EUW1,
        //     matchId: matches[0].gameId
        // });
        // message.channel.send(summoner.toString());
        // message.channel.send(summoner.toString());
        // game.participantIdentities.forEach((participant) => {
        //     console.log(participant.player);
        //     str += participant.player.summonerName + ', ';
        // });
        // message.channel.send(str);

        // console.log(game.participantIdentities);
    }
};