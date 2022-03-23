const { Client, Intents } = require('discord.js');
const rxjs = require('rxjs');
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
    rxjs
      .combineLatest([
        serverUtil.status(process.env.HOST, +process.env.PORT, options),
        serverUtil.queryFull(process.env.HOST, +process.env.PORT, options),
      ])
      .subscribe(([statusData, queryData]) => {
        const statusEmbed = MessageBuilder.createEmbed(statusData, queryData);
        interaction.reply({ embeds: [statusEmbed] });
      });
  } else if (commandName === 'version') {
    await interaction.reply(`My current version is ${packageJson.version}`);
  }
});

client.login(process.env.BOT_TOKEN);
