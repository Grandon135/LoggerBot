require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
  init: (bot) => {
    mongoose.connect(`${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.connection.on('connected', () => {
      bot.logger.log('Mongoose Connection Successful', 'ready');
    });

    mongoose.connection.on('err', (err) => {
      bot.logger.error(`Mongoose Error: ${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      bot.logger.error('Mongoose Disconnected');
    });
  }
}

mongoose.set('useCreateIndex', true);