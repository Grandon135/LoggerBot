const discord = require('discord.js');
const Logger = require('./src/Logging');
const Commands = require('./src/Commands')

const client = new discord.Client();

let ChannelIgnore = ['logger', 'channel-logs'];

client.on('ready', () => {
  console.log("I'm Ready, I'm Ready.");
});

client.on('message', (msg) => {
  
  let attachmentArchive = client.channels.cache.find(r => r.name == 'logger');
  
  if(msg.channel.name == ChannelIgnore[0]) return;
  else if (msg.channel.name == ChannelIgnore[0]) return;
  if(msg.content.startsWith('!')) return;
  else if(msg.content.startsWith('!!')) Commands.dispatch(msg);
  Logger.MessageSent( attachmentArchive, msg);
});

client.on('messageUpdate', (oldMsg, newMsg) => {
  if(newMsg.channel.name == ChannelIgnore[0]) return;
  else if (newMsg.channel.name == ChannelIgnore[0]) return;
  Logger.MessageUpdated(oldMsg, newMsg);
});

client.on('messageDelete', (msg) => {
  if(msg.channel.name == ChannelIgnore[0]) return;
  else if (msg.channel.name == ChannelIgnore[0]) return;
  Logger.MessageDeleted(msg);
});

client.login('ODIwMTgzMjEzNDMxMzI0Njky.YExdJA.g73mdxgBv3q_ynTkBTcSvA_hinM');