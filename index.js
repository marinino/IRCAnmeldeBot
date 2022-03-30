const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler' , 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
});

client.on('messageCreate', message => {
  if(/<@!892149522766110780>|<@892149522766110780>/.test(message.content)) {
    randomNumber = Math.floor(Math.random() * 10)
    if(randomNumber == 9){
      message.reply('https://media.giphy.com/media/ZebTmyvw85gnm/giphy.gif')
    } else {
      message.reply('Markier mich nicht sonst gibts ne bombe <:bombe:771888990437507072>')
    }
    return 
  }
})

client.login(process.env.TOKEN);