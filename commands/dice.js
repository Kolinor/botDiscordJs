const random = require('../utils/random');

module.exports = {
    name: "dice",
    description: "Tire un nombre aléatoire entre 1 et 6",
    category: "fun",
    async execute(message) {
        const dice = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:'];
        await message.channel.send(dice[random(1, dice.length)]);
    }
};