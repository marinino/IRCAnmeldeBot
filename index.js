
const Discord = require('discord.js');
const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler' , 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
});

client.on('messageCreate', message => {
  if(/<@!901473425078497360>|<@901473425078497360>/.test(message.content)) {

    randomNumber = Math.floor(Math.random() * 10)
    console.log(randomNumber)
    if(randomNumber == 9){
      message.reply('https://media.giphy.com/media/ZebTmyvw85gnm/giphy.gif')
    } else {
      message.reply('Hey, mention, \<:dickerChris:937291228645580821>.')
    }

    
    
    return 
  }
})


const commandFilesLiga1 = fs.readdirSync('./commands/liga1').filter(file => file.endsWith('.js'));
const commandFilesLiga2 = fs.readdirSync('./commands/liga2').filter(file => file.endsWith('.js'));
const commandFilesLiga3 = fs.readdirSync('./commands/liga3').filter(file => file.endsWith('.js'));
let commands = [];

client.commands = new Discord.Collection();

for (const file of commandFilesLiga1) {
  const command = require(`./commands/liga1/${file}`);
	commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command)
}

for (const file of commandFilesLiga2) {
  const command = require(`./commands/liga2/${file}`);
	commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command)
}

for (const file of commandFilesLiga3) {
  const command = require(`./commands/liga3/${file}`);
	commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command)
}

client.once("ready", () => {
 
  const clientId = client.user.id;
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
  const guildId = '947229969438896128';

  (async () => {
    try {
      
      
      console.log('Started refreshing application (/) commands.');

      if(process.env.ENV === 'production'){

        /*
        rest.get(Routes.applicationGuildCommands(clientId, guildId))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises);
        });
        */


        await rest.put(
          Routes.applicationCommands(clientId),
          { body: commands.values() },
        );
        console.log('Registered globally')
      }else{

        console.log(await rest.get(
          Routes.applicationGuildCommands(clientId, guildId),
          
        ))

        /*
        rest.get(Routes.applicationGuildCommands(clientId, guildId))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises);
        });
        */


        console.log(await rest.get(
          Routes.applicationGuildCommands(clientId, guildId),
          
        ))
       
        await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          { body: commands },
        );
        console.log('Registered locally')
      }
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();

})



client.login(process.env.TOKEN);