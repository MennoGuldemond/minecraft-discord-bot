const { MessageEmbed } = require('discord.js');

module.exports = {
  createEmbed: function (statusData, queryData) {
    const players = queryData.players.list.length
      ? queryData.players.list.join('\n')
      : '-';

    return new MessageEmbed()
      .setColor('#4a6f28')
      .setTitle(`${statusData.srvRecord.host}`)
      .setDescription(`${statusData.motd.clean}`)
      .addFields({
        name: 'Online',
        value: `${queryData.players.online}/${queryData.players.max}`,
        inline: true,
      })
      .addFields({
        name: 'Players',
        value: `${players}`,
        inline: true,
      })
      .addFields({
        name: 'Mincraft version',
        value: `${statusData.version.name}`,
      })
      .setTimestamp();
  },
};
