const Logger = require('../modules/file system');

module.exports = async (bot, oldMsg, newMsg) => {
  if(msg.channel.name == bot.ignoreChannels[0] || msg.channel.name == bot.ignoreChannels[1]) return;
  var string =  `Edited: ${newMsg.editedAt} Old Message Time: ${oldMsg.createdAt} | User: ${newMsg.author.username}, Channel: ${newMsg.channel.name} - ${newMsg.content} \r\n`;

  Logger.logMessage(`./Logs/${newMsg.channel.name}-messages.txt`, string);
};