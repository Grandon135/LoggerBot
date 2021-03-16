const Logger = require('../modules/file system');

module.exports = async (bot, msg) => {
  if(msg.channel.name == bot.ignoreChannels[0] || msg.channel.name == bot.ignoreChannels[1]) return;
  var string =  `Deleted: ${Date()} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content} \r\n`;

  Logger.logMessage(`./Logs/deleted-messages.txt`, string);
};