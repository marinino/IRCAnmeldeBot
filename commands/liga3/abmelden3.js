const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga3.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('abmelden3')
        .setDescription('Can sub out driver')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer der abgemeldet werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        const userToRemove = interaction.options.getUser('fahrer');
        console.log(userToRemove)

        if(CurrentSeason.seasonData.getWithdrawnDriversPerCommandLiga3().includes(userToRemove.id)){
            interaction.reply('Wurde schon');
            return;
        }else{
            let markedUserID = userToRemove.id;
            console.log(markedUserID)

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
                        client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getStammfahrerRolleIDLiga3())){                

                        CurrentSeason.methodStorage.regularDriverWithdraw(client, userToRemove, CurrentSeason.seasonData);
                        CurrentSeason.seasonData.setWithdrawnDriversPerCommandLiga3(CurrentSeason.seasonData.getWithdrawnDriversPerCommandLiga3().concat([userToRemove.id]));

                        let date = new Date().toLocaleString();
                        console.log(`${userToRemove.username} wurde erfolgreich per Command abgemeldet -- ${date}`);
                
   
                    }else if(userToRemove &&
                        !(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getStammfahrerRolleIDLiga3()))){
                        
                            let date = new Date().toLocaleString();
                            console.log(`Es ist etwas schiefgelaufen beim abmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
                            `Fahrer: ${userToRemove.username} -- ${date}`);
                       
                    }else{
                       
                        let date = new Date().toLocaleString();
                        console.log(`Es ist etwas schiefgelaufen beim abmelden Command. Das Userobjekt war wahrscheinlich ` + 
                        `entweder undefiniert oder null -- ${date}`);
                        
                    }
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                    await confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`Der manuelle Anmeldeprozess wurde gestartet und abgebrochen -- ${date}`)
                    });
                    await confirmMessage.delete();
                } else {
                    await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`Der manuelle Abmeldeprozess wurde gestartet und es wurde mit dem flaschen Emoji reagiert -- ${date}`)
                        })
                    await reaction.users.remove(user.id);
                }
            })
        }    
    }  
}