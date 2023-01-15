
const Discord = require('discord.js');
const { Client, Intents, Collection, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const fileFolder = fs.readdirSync('./handlers').filter((file) => file.endsWith('.js'))
for(const file of fileFolder){
  require(`./handlers/${file}`)(client, Discord)
}

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


const commandFolders = fs.readdirSync('./commands');

let commands = [];

client.commands = new Discord.Collection();

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
  for(const file of commandFiles){
    const command = require(`./commands/${folder}/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command)
  }
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
          Routes.applicationGuildCommands(clientId, guildId),
          { body: commands },
        );
        console.log('Registered locally')
      }
      console.log('Successfully reloaded application (/) commands.');

      // CONNECT TO OTHER DB
      await client.connectToLeagueDB().then(async function(res){
        console.log(`Connection to league DB established -- ${new Date().toLocaleString()}`)
      }, function(err){
        console.log(`Error connecting to league DB \n ${err} \n ${new Date().toLocaleString()}`)  
      })

      // CREATE DB BOT
      client.connectToBotDatabase().then(async function(res){
        console.log(`Connection to Bot DB established -- ${new Date().toLocaleString()}`)

        // CONNECT DB BOT
        client.createBotDataBase().then(async function(res){
          console.log(`Created Bot DB -- ${new Date().toLocaleString()}`)

          // CREATE TABLE LEAGUE IDS BOT
          client.createLeagueIdsTable().then(async function(res){
            console.log(`Created league ID table in Bot DB -- ${new Date().toLocaleString()}`)
          }, async function(err){
            console.log(`Error creating league ID table in Bot DB \n ${err} \n ${new Date().toLocaleString()}`)
          });
        }, async function(err){
          console.log(`Error creating Bot DB \n ${err} \n ${new Date().toLocaleString()}`)  
        })
      }, async function(err){
        console.log(`Error connecting to Bot DB \n ${err} \n ${new Date().toLocaleString()}`)
      });


    } catch (error) {
      console.error(error);
    }
  })();

})

client.login(process.env.TOKEN);






