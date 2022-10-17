const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_fr.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('abmelden_fr')
        .setDescription('Wird benutzt um einen Fahrer abzumelden')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer der abgemeldet werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen');
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der abmeldenFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const userToRemove = interaction.options.getUser('fahrer');
        var tempWithdrawnDriversPerCommand = CurrentSeason.seasonData.getWithdrawnDriversPerCommandLigaFR();

        if(tempWithdrawnDriversPerCommand.includes(userToRemove.id)){
            interaction.reply('Der Farhrer wurde schon per Command abgemeldet');
            return;
        }else{
            let markedUserID = userToRemove.id;

            let confirmMessage = await interaction.channel.send(`Bist du sicher, dass du ${userToRemove.username} abmelden möchtest?`);

            await confirmMessage.react(CurrentSeason.seasonData.getAnmeldeEmoji());
            await confirmMessage.react(CurrentSeason.seasonData.getAbmeldeEmoji());

        
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
                if(reaction.emoji.name == CurrentSeason.seasonData.getAnmeldeEmoji()){

                    if(userToRemove && 
                        client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getStammfahrerRolleIDLigaFR())){                

                        CurrentSeason.methodStorage.regularDriverWithdraw(client, userToRemove, CurrentSeason.seasonData);
                        CurrentSeason.seasonData.setWithdrawnDriversPerCommandLigaFR(tempWithdrawnDriversPerCommand.concat([userToRemove.id]));

                        let date = new Date().toLocaleString();
                        console.log(`abmeldenFR wurde erfolgreich mit ${userToRemove.username} durchgeführt -- ${date}`);
                
   
                    }else if(userToRemove &&
                        !(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getStammfahrerRolleIDLigaFR()))){
                        
                            let date = new Date().toLocaleString();
                            console.log(`Es ist etwas schiefgelaufen beim abmeldenFR Command. ${userToRemove.username} hat nicht die Rolle Stammfahrer Liga 1. -- ${date}`);
                       
                    }else{
                       
                        let date = new Date().toLocaleString();
                        console.log(`Bei abmeldenFR war der userToRemove undefiniert oder null. -- ${date}`);
                        
                    }
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                    await confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`abmeldenFR wurde gestartet und abgebrochen -- ${date}`)
                    });
                    await confirmMessage.delete();
                } else {
                    await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`abmeldenFR wurde gestartet und es wurde mit dem falschen Emoji reagiert -- ${date}`)
                        })
                    await reaction.users.remove(user.id);
                }
            })
        }    
    }  
}