require('dotenv').config;
const Client = require('./base/LoggerBot');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

const bot = new Client();

(async () => { 
  const eventFiles = await readdir('./src/events/');
  bot.logger.log(`++++++++++++++++++ Loading Event(s): ${eventFiles.length} ++++++++++++++++++++`);
  eventFiles.forEach(file => {
    const eventName = file.split('.')[0];
    bot.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    bot.on(eventName, event.bind(null, bot));
  });
  
  //Connect Bot to Database
  //NOTE This line should be uncommented when this is done
  //bot.mongoose.init(bot);

  //Connect Bot to Discord
  bot.login(process.env.TOKEN).catch(e => bot.logger.error(e));
})();
