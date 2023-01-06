const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeabmeldung_fr')
        .setDescription('Nimmt eine Abmeldung per Command zurück, wenn diese vorher auch per Command gemacht wurde')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer dessen Abmeldung zurück genommen werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der removeabmeldungFR Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        const userToRemoveWithdraw = interaction.options.getUser('fahrer');

        var withdrawnDriversPerCommand = new Array()
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for removeabmeldung command -- ${new Date().toLocaleString()}`)
            
            withdrawnDriversPerCommand = res[0].withdrawn_drivers_per_cmd.split(',')
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for removeabmeldung command -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(!(withdrawnDriversPerCommand.includes(userToRemoveWithdraw.id))){
            await interaction.reply('Fahrer wurde nicht per Command abgemeldet');
            console.log(`${userToRemoveWithdraw.username} wurde vorher nicht per Command abgemeldet in Liga SO 1 -- ${new Date().toLocaleString()}`)
            return
        } else {
            if(!(client.guilds.cache.get(await client.getDiscordID()).members.cache.get(userToRemoveWithdraw.id).roles.cache.has(await client.getStammfahrerRolleIDLigaFR()))){
                await interaction.reply('Fahrer hat die Stammfahrer nicht');
                console.log(`${userToRemoveWithdraw.username} hat die Stammfahrer Rolle Liga SO 1 nicht -- ${new Date().toLocaleString()}`)
                return
            }

            await interaction.reply(`Bei ${userToRemoveWithdraw.username} wird die Abmeldung zurück genommen `)
            let confirmMessage = await interaction.channel.send(`Bist du sicher, dass du die Abmeldung von ${userToRemoveWithdraw.username} zurück nehmen möchtest?`);
            await confirmMessage.react(await client.getAnmeldeEmoji());
            await confirmMessage.react(await client.getAbmeldeEmoji());

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
                    // Remove Withdraw
                    await client.regularDriverRemoveWithdraw(client, userToRemoveWithdraw);
                    // Changes content of list
                    
                    withdrawnDriversPerCommand.splice(tempArray.indexOf(userToRemoveWithdraw.id), 1);
                    var withdrawnDriversPerCmdAsString = await client.convertArrayToString(withdrawnDriversPerCommand)
                    await client.updateWithdrawnDriversPerCmd(withdrawnDriversPerCmdAsString, raceID).then(function(res){
                        console.log(`Successfully updated withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    console.log(`removeabmeldungFR wurde gestartet und erfolgreich durchgeführt für ${userToRemoveWithdraw.username} -- ${new Date().toLocaleString()}`)
                    // Deletes message
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == await client.getAbmeldeEmoji()){
                    await confirmMessage.delete();
                    await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`).then(() => {
                        console.log(`removeabmeldungFR wurde gestartet und abgebrochen -- ${new Date().toLocaleString()}`)
                    });
                } else {
                    await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(async () => {
                      console.log(`removeabmeldungFR wurde gestartet aber es wurde mit dem falschen Emoji `+
                                    `reagiert in ${CurrentSeason.seasonData.getLigatitel()} -- ${new Date().toLocaleString()}`)
                      await reaction.users.remove(user.id);
                    })
                  }
            })
        }

    }  
}