const Logger = require('../modules/file system');

module.exports = async (bot, msg) => {
  if(msg.channel.name == bot.ignoreChannels[0] || msg.channel.name == bot.ignoreChannels[1]) return;
  let attachments = msg.attachments.array();
  if(attachments.length != 0) {
    var str = "";
    var files = [];
    for(var i = 0; i < attachments.length; i++) {
      var current = attachments[i];
      var tempstring = "(" + current.name + ", " + current.url + ")";
      files.push(current.url);
      str += tempstring;
    }

    var string = `Sent: ${msg.createdAt} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content}, Attachements: ${str} \r\n`;
    var channel = await bot.getChannel('logger');
    channel.send({files: files, content: string}).catch(error => {
        bot.logger.error(error);
    });
  } else {
    var string =  `Sent: ${msg.createdAt} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content} \r\n`;
  }

  Logger.logMessage(`./Logs/${msg.channel.name}-messages.txt`, string);
};