const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeanmeldung2')
        .setDescription('Can reverse if a driver was subbed in before')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer dessen Anmeldung zurück genommen werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        const userToRemoveSubIn = interaction.options.getUser('fahrer');
        console.log(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(userToRemoveSubIn.id))

        if(!(CurrentSeason.seasonData.getSubInDriversPerCommandLiga2().includes(userToRemoveSubIn.id))){
            interaction.reply('Fahrer wurde nicht per Command angemeldet');
            return
        } else {
            if(!(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(userToRemoveSubIn.id).roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2()))){
                interaction.reply('Fahrer hat die Ersatzfahrerrolle nicht');
                return
            }
            await interaction.reply(`Bei ${userToRemoveSubIn.username} wird die Anmeldung zurück genommen `)
            let confirmMessage = await interaction.channel.send(`Bist du sicher, dass du die Anmeldung von ${userToRemoveSubIn.username} zurück nehmen möchtest?`);
            confirmMessage.react(CurrentSeason.seasonData.getAnmeldeEmoji());
            confirmMessage.react(CurrentSeason.seasonData.getAbmeldeEmoji());

            const collectorConfirm = confirmMessage.createReactionCollector({ dispose: true});

            collectorConfirm.on('collect', async (reaction, user) => {
                if(reaction.message.partial){
                    await reaction.message.fetch();
                }
                if(reaction.partial){
                    await reaction.fetch();
                }
                if(user.bot){
                    return;
                }
                if(!(reaction.message.guild)){
                    return;
                }
                if(reaction.emoji.name == CurrentSeason.seasonData.getAnmeldeEmoji()){
                    // Driver on waitlist
                    if(CurrentSeason.seasonData.getSubPersonListLiga2().includes(userToRemoveSubIn.id)){
                        // Perform removal in waitlist
                        CurrentSeason.methodStorage.subDriverRemoveSubInOnWaitlist(client, userToRemoveSubIn, CurrentSeason.seasonData);
                        // Remove from subInPerCommand list
                        let tempArray = CurrentSeason.seasonData.getSubInDriversPerCommandLiga2();
                        tempArray.splice(tempArray.indexOf(userToRemoveSubIn.id), 1);
                        CurrentSeason.seasonData.setSubInDriversPerCommandLiga2(tempArray);
                    } else if(CurrentSeason.methodStorage.checkDriverInLineup(userToRemoveSubIn.id, CurrentSeason.seasonData)){
                        // Perform removal in lineup
                        CurrentSeason.methodStorage.subDriverRemoveSubInInLineup(client, userToRemoveSubIn.id, CurrentSeason.seasonData)
                        // Remove from subInPerCommand list
                        let tempArray = CurrentSeason.seasonData.getSubInDriversPerCommandLiga2();
                        tempArray.splice(tempArray.indexOf(userToRemoveSubIn.id), 1);
                        CurrentSeason.seasonData.setSubInDriversPerCommandLiga2(tempArray); 
                    } else {
                        let date = new Date().toLocaleString();
                        console.log(`Die Anmeldung per Command von Fahrer ${userToRemoveSubIn.username} sollte zurückgenommen werden, allerdings `+
                                    `war der Fahrer weder im Lineup noch in auf der Warteliste in ${CurrentSeason.seasonData.getLigatitel()} -- ${date}`);
                    }
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                    await confirmMessage.delete();
                    await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`).then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`Der manuelle Anmeldeentfernungsprozess wurde gestartet und abgebrochen ${CurrentSeason.seasonData.getLigatitel()} -- ${date}`)
                    });
                } else {
                    confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                      let date = new Date().toLocaleString();
                      console.log(`Der manuelle Anmeldeprozess wurde gestartet aber es wurde mit dem falschen Emoji `+
                                    `reagiert in ${CurrentSeason.seasonData.getLigatitel()} -- ${date}`)
                      reaction.users.remove(user.id);
                    })
                  }
            })
        }

    }  
}