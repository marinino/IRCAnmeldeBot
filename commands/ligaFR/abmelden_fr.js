const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('abmelden_fr')
        .setDescription('Wird benutzt um einen Fahrer abzumelden')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer der abgemeldet werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen');
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der abmeldenFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const userToRemove = interaction.options.getUser('fahrer');
        var tempWithdrawnDriversPerCommand = new Array();
        var raceID = -1;

        await client.getLastRaceInDatabase().then(function(res){
            console.log(`Successfully got last entry in table for abmelden command -- ${new Date().toLocaleString()}`)

            tempWithdrawnDriversPerCommand = res[0].withdrawn_drivers_per_cmd.split(',')
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for abmelden command -- ${new Date().toLocaleString()} \n ${err}`)
        })
       
        if(tempWithdrawnDriversPerCommand.includes(userToRemove.id)){
            await interaction.reply('Der Farhrer wurde schon per Command abgemeldet');
            return;
        }else{
            var markedUserID = userToRemove.id;

            var confirmMessage = await interaction.channel.send(`Bist du sicher, dass du ${userToRemove.username} abmelden möchtest?`);

            await confirmMessage.react(await client.getAnmeldeEmoji());
            await confirmMessage.react(await client.getAbmeldeEmoji());

        
            interaction.reply(`${userToRemove.username} wird per Command abgemeldet`)

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

                    if(userToRemove && 
                        client.guilds.cache.get(await client.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(await client.getStammfahrerRolleIDLigaFR())){                

                        await client.regularDriverWithdraw(client, userToRemove);
                        tempWithdrawnDriversPerCommand.push(userToRemove.id)
                        var withdrawnDriverAsString = await client.convertArrayToString(tempWithdrawnDriversPerCommand)
                        await client.updateWithdrawnDriversPerCmd(withdrawnDriverAsString, raceID).then(function(res){
                            console.log(`Successfully updated withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })

                        console.log(`abmeldenFR wurde erfolgreich mit ${userToRemove.username} durchgeführt -- ${new Date().toLocaleString()}`);
            
                    }else if(userToRemove &&
                        !(client.guilds.cache.get(await client.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(await client.getStammfahrerRolleIDLigaFR()))){
                            console.log(`Es ist etwas schiefgelaufen beim abmeldenFR Command. ${userToRemove.username} hat nicht die Rolle Stammfahrer Liga 1. -- ${new Date().toLocaleString()}`);
                       
                    }else{
              
                        console.log(`Bei abmeldenFR war der userToRemove undefiniert oder null. -- ${new Date().toLocaleString()}`);
                        
                    }
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == await client.getAbmeldeEmoji()){
                    await confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                        console.log(`abmeldenFR wurde gestartet und abgebrochen -- ${new Date().toLocaleString()}`)
                    });
                    await confirmMessage.delete();
                } else {
                    await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                        console.log(`abmeldenFR wurde gestartet und es wurde mit dem falschen Emoji reagiert -- ${new Date().toLocaleString()}`)
                    })
                    await reaction.users.remove(user.id);
                }
            })
        }    
    }  
}