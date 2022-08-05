const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anmelden1')
        .setDescription('Wird benutzt um einen Fahrer abzumelden')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer der angemeldet werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der anmelden1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const userToSubIn = interaction.options.getUser('fahrer');

        var tempSubDriversInPerCommand = CurrentSeason.seasonData.getSubInDriversPerCommandLiga1()

        if(tempSubDriversInPerCommand.includes(userToSubIn.id)){
            interaction.reply('Der Farhrer wurde schon per Command abgemeldet');
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
                        client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga1())){                

                        CurrentSeason.methodStorage.subDriverIn(client, userToSubIn, CurrentSeason.seasonData);
                        
                        CurrentSeason.seasonData.setSubInDriversPerCommandLiga1(tempSubDriversInPerCommand.concat([userToSubIn.id]));
                        
                        console.log(CurrentSeason.seasonData.getSubInDriversPerCommandLiga1().length)
                
                        let date = new Date().toLocaleString();
                        console.log(`anmelden1 wurde erfolgreich mit ${userToSubIn.username} durchgeführt -- ${date}`);

                    }else if(userToSubIn &&
                        !(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(markedUserID).roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga1()))){
                        
                            let date = new Date().toLocaleString();
                            console.log(`Es ist etwas schiefgelaufen beim anmelden1 Command. ${userToSubIn.username} hat nicht die Rolle Ersatzfahrer Liga 1. -- ${date}`);
                       
                    }else{
                       
                        let date = new Date().toLocaleString();
                        console.log(`Bei anmelden1 war der userToSubIn undefiniert oder null. -- ${date}`);
                        
                    }
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                    await confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`anmelden1 wurde gestartet und abgebrochen -- ${date}`)
                    });
                    await confirmMessage.delete();
                } else {
                    await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`anmelden1 wurde gestartet und es wurde mit dem falschen Emoji reagiert -- ${date}`)
                        })
                    await reaction.users.remove(user.id);
                }
            })
        }    
    }  
}