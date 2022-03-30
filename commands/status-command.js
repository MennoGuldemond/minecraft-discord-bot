const { SlashCommandBuilder } = require('@discordjs/builders');
const rxjs = require('rxjs');
const serverUtil = require('minecraft-server-util');
const MessageBuilder = require('../utils/message-builder');

const options = {
  enableSRV: true,
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Returns minecraft server info'),
  async execute(interaction) {
    rxjs
      .combineLatest([
        serverUtil.status(process.env.HOST, +process.env.PORT, options),
        serverUtil.queryFull(process.env.HOST, +process.env.PORT, options),
      ])
      .subscribe(([statusData, queryData]) => {
        const statusEmbed = MessageBuilder.createEmbed(statusData, queryData);
        interaction.reply({ embeds: [statusEmbed] });
      });
  },
};
