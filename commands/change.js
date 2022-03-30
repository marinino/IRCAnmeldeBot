const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'change',
    description: 'This is just a test file',
    execute(client, message, cmd, args, Discord){
        message.reply('We can!');
    }
  }