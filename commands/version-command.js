const { SlashCommandBuilder } = require('@discordjs/builders');
const packageJson = require('../package.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Returns the current version of the bot'),
  async execute(interaction) {
    await interaction.reply(`My current version is ${packageJson.version}`);
  },
};
