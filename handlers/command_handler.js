const fs = require('fs');

module.exports = (client, Discord) =>{
  const command_filesLiga1 = fs.readdirSync('./commands/liga1/').filter(file => file.endsWith('.js'));
  const command_filesLiga2 = fs.readdirSync('./commands/liga2/').filter(file => file.endsWith('.js'));
  const command_filesLiga3 = fs.readdirSync('./commands/liga3/').filter(file => file.endsWith('.js'));

  for(const file of command_filesLiga1){
    const command = require(`../commands/liga1/${file}`);
    if(command.name){
      client.commands.set(command.name, command);
    } else{
      continue;
    }
  }

  for(const file of command_filesLiga2){
    const command = require(`../commands/liga2/${file}`);
    if(command.name){
      client.commands.set(command.name, command);
    } else{
      continue;
    }
  }

  for(const file of command_filesLiga3){
    const command = require(`../commands/liga3/${file}`);
    if(command.name){
      client.commands.set(command.name, command);
    } else{
      continue;
    }
  }

}