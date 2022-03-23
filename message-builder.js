const { MessageEmbed } = require('discord.js');

module.exports = {
  createEmbed: function (data) {
    const players = data.players.list.length
      ? data.players.list.map((p) => `${p} \n`)
      : '-';

    return new MessageEmbed()
      .setColor('#4a6f28')
      .setTitle('Minecraft server status')
      .setDescription(`${process.env.HOST}`)
      .addFields({
        name: 'Online',
        value: `${data.players.online}/${data.players.max}`,
      })
      .addFields({
        name: 'Players',
        value: `${players}`,
      })
      .addFields({
        name: 'Mincraft version',
        value: `${data.version.name}`,
      })
      .setTimestamp()
      .setFooter({ text: 'Royale With Cheese' });
  },
};
