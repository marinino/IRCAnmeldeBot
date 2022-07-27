const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anmelden2')
        .setDescription('Can sign sub driver up')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer der angemeldet werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        const userToSubIn = interaction.options.getUser('fahrer');
        console.log(userToSubIn)

        if(CurrentSeason.seasonData.getSubInDriversPerCommandLiga2().includes(userToSubIn.id)){
            interaction.reply('Wurde schon');
            return
        }else{
            let markedUserID = userToSubIn.id;
            console.log(markedUserID)

            let confirmMessage = await interaction.channel.send(`Bist du sicher, dass du ${userToSubIn.username} anmelden möchtest?`);

            await confirmMessage.react(CurrentSeason.seasonData.getAnmeldeEmoji());
            await confirmMessage.react(CurrentSeason.seasonData.getAbmeldeEmoji());

        
            interaction.reply(`${userToSubIn.username} wird per Command angemeldet`)

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

                    if(userToSubIn && 
                        client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2())){                

                        CurrentSeason.methodStorage.subDriverIn(client, userToSubIn, CurrentSeason.seasonData);
                        
                        CurrentSeason.seasonData.setSubInDriversPerCommandLiga2(CurrentSeason.seasonData.getSubInDriversPerCommandLiga2().concat([userToSubIn.id]));
                        
                        console.log(CurrentSeason.seasonData.getSubInDriversPerCommandLiga2().length)
                
                        let date = new Date().toLocaleString();
                        console.log(`${userToSubIn.username} wurde erfolgreich per Command angemeldet -- ${date}`);

                    }else if(userToSubIn &&
                        !(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2()))){
                        
                            let date = new Date().toLocaleString();
                            console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
                            `Fahrer: ${userToSubIn.username} -- ${date}`);
                       
                    }else{
                       
                        let date = new Date().toLocaleString();
                        console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Das Userobjekt war wahrscheinlich ` + 
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
                        console.log(`Der manuelle Abmeldeprozess wurde gestartet und es wurde mit dem falschen Emoji reagiert -- ${date}`)
                        })
                    await reaction.users.remove(user.id);
                }
            })
        }    
    }  
}