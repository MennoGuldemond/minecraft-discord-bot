const { Client, Intents } = require('discord.js');
const serverUtil = require('minecraft-server-util');
const dotenv = require('dotenv');
const packageJson = require('./package.json');
const MessageBuilder = require('./message-builder');

const options = {
  enableSRV: true,
};

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'status') {
    serverUtil
      .queryFull(process.env.HOST, +process.env.PORT, options)
      .then((serverData) => {
        const statusEmbed = MessageBuilder.createEmbed(serverData);
        interaction.reply({ embeds: [statusEmbed] });
      })
      .catch((error) => console.error(error));
  } else if (commandName === 'version') {
    await interaction.reply(`My current version is ${packageJson.version}`);
  }
});

client.login(process.env.BOT_TOKEN);
