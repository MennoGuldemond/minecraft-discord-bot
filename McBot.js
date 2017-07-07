/*****************************************

Minecraft server status BOT by: Menno Guldemond
v1.0: 04/05/2017
v1.1: 15/06/2017

******************************************/

var tools = require('./config');
var config = tools.Config();

const discord = require('discord.js');
const client = new discord.Client();
const pinger = require('minecraft-pinger');
var serverData = null;

// Promise 
pinger.pingPromise(config.domain, config.port).catch(console.error);

// Ping callback function
function pingCallback(message, result) {

  // Refresh server data
  serverData = result;
  // Send message
  sendMessage(message);
};

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  client.user.setGame('Type !help');
  console.log('RWC-BOT is ready to go!');
});

// Create an event listener for messages
client.on('message', function(message) {
  // Only check messages with the '!' prefix
  if (message.content.charAt(0) !== '!'){
    return;
  }
  pinger.ping(config.domain, config.port, function(error, result) {
    pingCallback(message, result);
  });
});

// Log our bot in
client.login(config.token);

// All the available commands
function sendMessage(message) {
  // If we can't ping the server, let them know.
  if (serverData == null) {
    message.channel.send('Sorry! I could not ping the server. =(');
  }

  else if (message.content === '!motd') {
    message.channel.send(serverData.description.text);
  }

  else if (message.content === '!players') {
    message.channel.send(serverData.players.online + ' of ' + serverData.players.max + ' players are currently online.');
  }

  else if (message.content === '!ping') {
    message.channel.send('Ping to the server: ' +  serverData.ping);
  }

  else if (message.content === '!version') {
    message.channel.send('The server is currently running: ' + serverData.version.name);
  }

  else if (message.content === '!help') {
    message.channel.send('This is the RWC-BOT\n\nYou can ask me the following:\n\n!motd:     The message of the day.\n!players:  How many people are playing on the server.\n!ping:       The latency to the server.\n!version:  The version the server is running on.');
  }
}