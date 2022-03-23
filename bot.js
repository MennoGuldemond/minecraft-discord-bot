const dotenv = require('dotenv');
// const { Client } = require('discord.js');
const packageJson = require('./package.json');
const serverUtil = require('minecraft-server-util');

const options = {
  enableSRV: true, // SRV record lookup
};

dotenv.config();
// const client = new Client();
// const prefix = '!';

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('message', (message) => {
//   if (!message.content.startsWith(prefix) || message.author.bot) {
//     return;
//   }
//   const arguments = message.content.slice(prefix.length).trim().split(' ');
//   const command = arguments.shift().toLowerCase();

//   if (command === 'status') {
//     return handleStatus(message);
//   } else if (command === 'version') {
//     return handleVersion(message, arguments);
//   }
// });

// client.login(process.env.BOT_TOKEN);

function handleStatus(message) {
  serverUtil
    .status('rwc.beastmc.com', 25596)
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function handleVersion(message) {
  if (!isTestMode && message.channel.id) {
    return;
  }
  const versionString = `My current version is ${packageJson.version}`;
  message.channel.send(versionString);
}

handleStatus();
