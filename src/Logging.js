const fs = require('fs');

const Logger = {
  MessageSent: (AA, msg) => {
    var loggerstring;
    let attachments = msg.attachments.array();
    if(attachments.length != 0) {
      var str = FormatAttachments(attachments)
      loggerstring = `Sent: ${msg.createdAt} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content}, Attachements: ${str} \r\n`;
      AA.send({files: getURls(attachments), content: `Sent: ${msg.createdAt} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content}`}).catch(console.error);
    } else {
      loggerstring = `Sent: ${msg.createdAt} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content} \r\n`;
    }
    
    fs.appendFile(`./Logs/${msg.channel.name}-messages.txt`, loggerstring, (err)=> {
      return err;
    });
  },
  MessageUpdated: (oldMsg, newMsg) => {
    var loggerstring;
    let attachments = newMsg.attachments.array();
    if(attachments.length != 0) {
      var str = FormatAttachments(attachments)
      loggerstring = `Edited: ${newMsg.editedAt} Old Message Time: ${oldMsg.createdAt} | User: ${newMsg.author.username}, Channel: ${newMsg.channel.name} - ${newMsg.content}, Attachements: ${str} \r\n`;
    } else {
      loggerstring = `Edited: ${newMsg.editedAt} Old Message Time: ${oldMsg.createdAt} | User: ${newMsg.author.username}, Channel: ${newMsg.channel.name} - ${newMsg.content} \r\n`;
    }
    
    fs.appendFile(`./Logs/${newMsg.channel.name}-messages.txt`, loggerstring, (err)=> {
      return err;
    });
  },
  MessageDeleted: (msg) => {
    var loggerstring;
    let attachments = msg.attachments.array();
    if(attachments.length != 0) {
      var str = FormatAttachments(attachments)
      loggerstring = `Deleted: ${Date()} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content}, Attachements: ${str} \r\n`;
    } else {
      loggerstring = `Deleted: ${Date()} | User: ${msg.author.username}, Channel: ${msg.channel.name} - ${msg.content} \r\n`;
    }
    
    fs.appendFile(`./Logs/deleted-messages.txt`, loggerstring, (err)=> {
      return err;
    });
  },

  log: ( ) => {

  },
};

/* Helper Function */
function FormatAttachments(atch) {
  var str = "";
  for(var i = 0; i < atch.length; i++) {
    var current = atch[i];
    var tempstring = "(" + current.name + ", " + current.url + ")";
    str += tempstring;
  }
  return str;
}

function getURls(atch) {
  var files = [];
  for(var i = 0; i < atch.length; i++) {
    var current = atch[i];
    files.push(current.url);
  }
  return files;
}

module.exports = Logger;