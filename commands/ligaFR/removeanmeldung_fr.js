const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeanmeldung_fr')
        .setDescription('Can reverse if a driver was subbed in before')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer dessen Anmeldung zurück genommen werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            await interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der removeanmeldungFR Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        const userToRemoveSubIn = interaction.options.getUser('fahrer');
        var subInDriversPerCmd = new Array()
        var subPersonList = new Array()
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for removeanmeldung command -- ${new Date().toLocaleString()}`)
            
            subInDriversPerCmd = res[0].sub_in_drivers_per_cmd.split(',')
            subPersonList = res[0].sub_person_list
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for removeanmeldung command -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(!(subInDriversPerCmd.includes(userToRemoveSubIn.id))){
            await interaction.reply('Fahrer wurde nicht per Command angemeldet');
            console.log(`${userToRemoveSubIn.username} wurde vorher nicht per Command angemeldet in Liga SO 1 -- ${new Date().toLocaleString()}`)
            return
        } else {
            if(!(client.guilds.cache.get(await client.getDiscordID()).members.cache.get(userToRemoveSubIn.id).roles.cache.has(await client.getErsatzfahrerRolleIDLigaFR()))){
                interaction.reply('Fahrer hat die Ersatzfahrerrolle nicht');
                console.log(`${userToRemoveSubIn.username} hat die Ersatzfahrer Rolle Liga SO 1 nicht -- ${new Date().toLocaleString()}`)
                return
            }
            await interaction.reply(`Bei ${userToRemoveSubIn.username} wird die Anmeldung zurück genommen `)
            let confirmMessage = await interaction.channel.send(`Bist du sicher, dass du die Anmeldung von ${userToRemoveSubIn.username} zurück nehmen möchtest?`);
            await confirmMessage.react(CurrentSeason.seasonData.getAnmeldeEmoji());
            await confirmMessage.react(CurrentSeason.seasonData.getAbmeldeEmoji());

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
                if(reaction.emoji.name == await client.getAnmeldeEmoji()){
                    // Driver on waitlist
                    if(subPersonList.includes(userToRemoveSubIn.id)){
                        // Perform removal in waitlist
                        await client.subDriverRemoveSubInOnWaitlist(client, userToRemoveSubIn);
                        // Remove from subInPerCommand list
                        subInDriversPerCmd.splice(subInDriversPerCmd.indexOf(userToRemoveSubIn.id), 1);

                        var subInDriversPerCmdAsString = await client.convertArrayToString(subInDriversPerCmd)
                        await client.updateSubInDriversPerCmd(subInDriversPerCmdAsString, raceID).then(function(res){
                            console.log(`Successfully updated sub in drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating sub in drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
                    } else if(await client.checkDriverInLineup(userToRemoveSubIn.id)){
                        // Perform removal in lineup
                        await client.subDriverRemoveSubInInLineup(client, userToRemoveSubIn)
                        // Remove from subInPerCommand list

                        subInDriversPerCmd.splice(subInDriversPerCmd.indexOf(userToRemoveSubIn.id), 1);
                        var subInDriversPerCmdAsString = await client.convertArrayToString(subInDriversPerCmd)
                        await client.updateSubInDriversPerCmd(subInDriversPerCmdAsString, raceID).then(function(res){
                            console.log(`Successfully updated sub in drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating sub in drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
                    } else {
                        console.log(`Die Anmeldung per Command von Fahrer ${userToRemoveSubIn.username} sollte zurückgenommen werden, allerdings `+
                                    `war der Fahrer weder im Lineup noch in auf der Warteliste in ${await client.getLigatitel()} -- ${new Date().toLocaleString()}`);
                    }
                    console.log(`removeanmeldungFR wurde gestartet und erfolgreich durchgeführt für ${userToRemoveSubIn.username} -- ${new Date().toLocaleString()}`)
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == await client.getAbmeldeEmoji()){
                    await confirmMessage.delete();
                    await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`).then(() => {
                        console.log(`removeanmeldungFR wurde gestartet und abgebrochen -- ${new Date().toLocaleString()}`)
                    });
                } else {
                    await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(async () => {
                      console.log(`removeanmeldungFR wurde gestartet aber es wurde mit dem falschen Emoji `+
                                    `reagiert in ${CurrentSeason.seasonData.getLigatitel()} -- ${new Date().toLocaleString()}`)
                      await reaction.users.remove(user.id);
                    })
                  }
            })
        }

    }  
}