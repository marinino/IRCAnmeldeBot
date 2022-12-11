
const Discord = require('discord.js');
const { Client, Intents, Collection, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const mysql = require('mysql');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


const connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'root',
  database : 'db_irc_anmelde_test'
});
 
connection.connect(error => {
   if(error){
    console.log(error)
  } else {
    console.log('Connection established');
  }
});

connection.query(`CREATE TABLE IF NOT EXISTS bot_sonntag_1(
  race_id INT NOT NULL,
  sub_person_list MEDIUMTEXT,
  sub_person_list_reinstated_drivers MEDIUMTEXT,
  free_cars MEDIUMTEXT,
  withdrawn_drivers MEDIUMTEXT,
  withdrawn_drivers_per_cmd MEDIUMTEXT,
  sub_in_drivers_per_cmd MEDIUMTEXT,
  race_location MEDIUMTEXT,
  reacted_to_sub_in MEDIUMTEXT,
  reacted_to_sign_out MEDIUMTEXT,
  regular_drivers_mercedes MEDIUMTEXT,
  regular_drivers_rb MEDIUMTEXT,
  regular_drivers_ferrari MEDIUMTEXT,
  regular_drivers_mclaren MEDIUMTEXT,
  regular_drivers_aston_martin MEDIUMTEXT,
  regular_drivers_alpine MEDIUMTEXT,
  regular_drivers_alpha_tauri MEDIUMTEXT,
  regular_drivers_alfa_romeo MEDIUMTEXT,
  regular_drivers_williams MEDIUMTEXT,
  regular_drivers_haas MEDIUMTEXT,
  current_lineup MEDIUMTEXT,
  regular_drivers MEDIUMTEXT,
  free_car_msg_id BIGINT,
  waitlist_msg_id BIGINT,
  regular_drivers_msg_id BIGINT,
  register_msg_id BIGINT,
  deregister_msg_id BIGINT,
  registration_active BOOL DEFAULT 0,
  season_active BOOL DEFAULT 0,
  past_race_locations MEDIUMTEXT,
  future_race_locations MEDIUMTEXT,
  PRIMARY KEY(race_id)
)`, function(error, result, fields) {
  if(error){
    console.log(error);
    return;
  }else{
    console.log(result);
  }
})

connection.query(`CREATE TABLE IF NOT EXISTS league_ids (
  league_id INT NOT NULL,
  name VARCHAR(255),
  PRIMARY KEY (league_id)
)`, function(error, result, fields) {
  if(error){
    console.log(error);
    return;
  }else{
    console.log(result);
  }
})

const fileFolder = fs.readdirSync('./handlers').filter((file) => file.endsWith('.js'))
for(const file of fileFolder){
  require(`./handlers/${file}`)(client, Discord, connection)
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
    } catch (error) {
      console.error(error);
    }
  })();

})

client.login(process.env.TOKEN);


let p = new Promise(function(resolve, reject) {
  if(true){
    resolve('TEST');
    console.log(`AFTER`)
  }else{
    reject(new Error())
  }
})

p.then(function(result){
  console.log(result)
}, function(error){
  console.log(error)
})
