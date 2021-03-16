require('dotenv').config;
const {Client, Collection} = require('discord.js');


//Creating the custom Version of the discord Client.
const LoggerBot = class LoggerBot extends Client {
  constructor(options) {
    super(options);
    
    //Console Logger
    this.logger = require('../modules/logging')

		this.ignoreChannels = ['logger', 'channel-logs'];

    //For the commands
    this.commands = new Collection();

    //DB Connection
    this.mongoose = require('../modules/datebase/db');

    //Activity
    this.Activity = [];
    this.PresenceType = 'PLAYING';
  };

  // Fetch user ID from discord API
	async getUser(ID) {
		try {
			const user = await this.users.fetch(ID);
			return user;
		} catch (err) {
			console.log(err.message);
			return false;
		}
	}

	// Get a channel in cache
	async getChannel(name) {
		try {
			const channel = await this.channels.cache.find(r => r.name == name);
			return channel;
		} catch (err) {
			console.log(err.message);
			return false;
		}
	}

  // Set this's status
	async SetStatus(status = 'online') {
		try {
			await this.user.setStatus(status);
			return;
		} catch (err) {
			console.log(err.message);
			return false;
		}
	}

	// Set this's activity
	SetActivity(array = [], type = 'PLAYING') {
		this.Activity = array;
		this.PresenceType = type;
		try {
			let j = 0;
			setInterval(() => this.user.setActivity(`${this.Activity[j++ % this.Activity.length]}`, { type: type }), 10000);
			return;
		} catch (e) {
			console.log(e);
		}
	}

};


module.exports = LoggerBot;