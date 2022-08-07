const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonligaOrigin.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeanmeldungOrigin')
        .setDescription('Can reverse if a driver was subbed in before')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer dessen Anmeldung zurück genommen werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der removeanmeldungOrigin Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const userToRemoveSubIn = interaction.options.getUser('fahrer');

        if(!(CurrentSeason.seasonData.getSubInDriversPerCommandLigaOrigin().includes(userToRemoveSubIn.id))){
            interaction.reply('Fahrer wurde nicht per Command angemeldet');
            var date = new Date().toLocaleString()
            console.log(`${userToRemoveSubIn.username} wurde vorher nicht per Command angemeldet in Liga Origin -- ${date}`)
            return
        } else {
            if(!(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(userToRemoveSubIn.id).roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaOrigin()))){
                interaction.reply('Fahrer hat die Ersatzfahrerrolle nicht');
                var date = new Date().toLocaleString()
                console.log(`${userToRemoveSubIn.username} hat die Ersatzfahrer Rolle Liga Origin nicht -- ${date}`)
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
                    if(CurrentSeason.seasonData.getSubPersonListLigaOrigin().includes(userToRemoveSubIn.id)){
                        // Perform removal in waitlist
                        CurrentSeason.methodStorage.subDriverRemoveSubInOnWaitlist(client, userToRemoveSubIn, CurrentSeason.seasonData);
                        // Remove from subInPerCommand list
                        let tempArray = CurrentSeason.seasonData.getSubInDriversPerCommandLigaOrigin();
                        tempArray.splice(tempArray.indexOf(userToRemoveSubIn.id), 1);
                        CurrentSeason.seasonData.setSubInDriversPerCommandLigaOrigin(tempArray);
                    } else if(CurrentSeason.methodStorage.checkDriverInLineup(userToRemoveSubIn.id, CurrentSeason.seasonData)){
                        // Perform removal in lineup
                        CurrentSeason.methodStorage.subDriverRemoveSubInInLineup(client, userToRemoveSubIn, CurrentSeason.seasonData)
                        // Remove from subInPerCommand list
                        let tempArray = CurrentSeason.seasonData.getSubInDriversPerCommandLigaOrigin();
                        tempArray.splice(tempArray.indexOf(userToRemoveSubIn.id), 1);
                        CurrentSeason.seasonData.setSubInDriversPerCommandLigaOrigin(tempArray); 
                    } else {
                        let date = new Date().toLocaleString();
                        console.log(`Die Anmeldung per Command von Fahrer ${userToRemoveSubIn.username} sollte zurückgenommen werden, allerdings `+
                                    `war der Fahrer weder im Lineup noch in auf der Warteliste in ${CurrentSeason.seasonData.getLigatitel()} -- ${date}`);
                    }
                    let date = new Date().toLocaleString();
                    console.log(`removeanmeldungOrigin wurde gestartet und erfolgreich durchgeführt für ${userToRemoveSubIn.username} -- ${date}`)
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                    await confirmMessage.delete();
                    await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`).then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`removeanmeldungOrigin wurde gestartet und abgebrochen -- ${date}`)
                    });
                } else {
                    confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                      let date = new Date().toLocaleString();
                      console.log(`removeanmeldungOrigin wurde gestartet aber es wurde mit dem falschen Emoji `+
                                    `reagiert in ${CurrentSeason.seasonData.getLigatitel()} -- ${date}`)
                      reaction.users.remove(user.id);
                    })
                  }
            })
        }

    }  
}