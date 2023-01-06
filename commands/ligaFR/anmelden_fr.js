const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anmelden_fr')
        .setDescription('Wird benutzt um einen Fahrer abzumelden')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer der angemeldet werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der anmeldenFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const userToSubIn = interaction.options.getUser('fahrer');
        var tempSubDriversInPerCommand = new Array();
        var raceID = -1;
        
        await client.getLastRaceInDatabase().then(function(res){
            console.log(`Successfully got last entry in table for anmelden command -- ${new Date().toLocaleString()}`)

            tempSubDriversInPerCommand = res[0].sub_in_drivers_per_cmd.split(',')
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for anmelden command -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(tempSubDriversInPerCommand.includes(userToSubIn.id)){
            await interaction.reply('Der Farhrer wurde schon per Command abgemeldet');
            return
        }else{
            let markedUserID = userToSubIn.id;
           
            let confirmMessage = await interaction.channel.send(`Bist du sicher, dass du ${userToSubIn.username} anmelden möchtest?`);

            await confirmMessage.react(CurrentSeason.seasonData.getAnmeldeEmoji());
            await confirmMessage.react(CurrentSeason.seasonData.getAbmeldeEmoji());

        
            await interaction.reply(`${userToSubIn.username} wird per Command angemeldet`)

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

                    if(userToSubIn && 
                        client.guilds.cache.get(await client.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(await client.getErsatzfahrerRolleIDLigaFR())){                

                        await client.subDriverIn(client, userToSubIn);
                        tempSubDriversInPerCommand.push(userToSubIn.id)
                        var subInDriversAsString = await client.convertArrayToString(tempSubDriversInPerCommand)
                        await client.updateSubInDriversPerCmd(subInDriversAsString, raceID).then(function(res){
                            console.log(`Successfully updated sub in drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating sub in drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })

                        console.log(`anmeldenFR wurde erfolgreich mit ${userToSubIn.username} durchgeführt -- ${new Date().toLocaleString()}`);

                    }else if(userToSubIn &&
                        !(client.guilds.cache.get(await client.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(await client.getErsatzfahrerRolleIDLigaFR()))){
                        
                            console.log(`Es ist etwas schiefgelaufen beim anmeldenFR Command. ${userToSubIn.username} hat nicht die Rolle Ersatzfahrer Liga 1. -- ${new Date().toLocaleString()}`);
                       
                    }else{
                       
                        console.log(`Bei anmeldenFR war der userToSubIn undefiniert oder null. -- ${new Date().toLocaleString()}`);
                        
                    }
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                    await confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                        console.log(`anmeldenFR wurde gestartet und abgebrochen -- ${new Date().toLocaleString()}`)
                    });
                    await confirmMessage.delete();
                } else {
                    await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                        console.log(`anmeldenFR wurde gestartet und es wurde mit dem falschen Emoji reagiert -- ${new Date().toLocaleString()}`)
                        })
                    await reaction.users.remove(user.id);
                }
            })
        }    
    }  
}