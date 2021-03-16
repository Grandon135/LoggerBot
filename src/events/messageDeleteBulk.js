const Logger = require('../modules/file system');

module.exports = async (bot, msgs) => {
  msgs.array().forEach(msg => {
    if(msg.channel.name == bot.ignoreChannels[0] || msg.channel.name == bot.ignoreChannels[1]) return;
    var string =  `Deleted: ${Date()} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content} \r\n`;
    
    bot.logger.warn('Bulk messages deleted');

    Logger.logMessage(`./Logs/deleted-messages.txt`, string);
  });
};