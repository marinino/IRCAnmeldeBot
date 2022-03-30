const discordID = '872168156913864765';
const rennleiterRolleID = '872169337245560832';

module.exports = {
    name: 'clear',
    description: 'clear messages!',
    async execute(client, message, cmd, args){
      if(!args[0]){
        message.reply('Bitte gebe eine Zahl mit.');
        return;
      }
      if(isNaN(args[0])){
        message.reply('Das angegebene Argument ist keine Zahl.');
        return;
      }
      if(args[0] > 100){
        message.reply('Die Zahl darf nicht zu groß sein. Das Maximum ist 100.');
        return;
      }
      if(args[0] < 1){
        messages.reply('Die Zahl muss größer 1 sein.');
        return;
      }
      if(!(client.guilds.cache.get(discordID).members.cache.get(message.member.user.id).roles.cache.has(rennleiterRolleID)) && !(client.user.bot)){
        message.reply('Dieser Command kann nur von der Rennleitung ausgeführt werden.')
        return;
      }
  
      await message.channel.messages.fetch({limit: args[0]}).then(messages => {
        message.channel.bulkDelete(messages);
      })
    }
  }