const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_so1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeabmeldung_so1')
        .setDescription('Nimmt eine Abmeldung per Command zurück, wenn diese vorher auch per Command gemacht wurde')
        .addUserOption(option => 
            option.setName('fahrer')
                .setDescription('Fahrer dessen Abmeldung zurück genommen werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der removeabmeldungSO1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const userToRemoveWithdraw = interaction.options.getUser('fahrer');

        if(!(CurrentSeason.seasonData.getWithdrawnDriversPerCommandLigaSO1().includes(userToRemoveWithdraw.id))){
            interaction.reply('Fahrer wurde nicht per Command abgemeldet');
            var date = new Date().toLocaleString()
            console.log(`${userToRemoveWithdraw.username} wurde vorher nicht per Command abgemeldet in Liga SO 1 -- ${date}`)
            return
        } else {
            if(!(client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(userToRemoveWithdraw.id).roles.cache.has(CurrentSeason.seasonData.getStammfahrerRolleIDLigaSO1()))){
                interaction.reply('Fahrer hat die Stammfahrer nicht');
                var date = new Date().toLocaleString()
                console.log(`${userToRemoveWithdraw.username} hat die Stammfahrer Rolle Liga SO 1 nicht -- ${date}`)
                return
            }

            await interaction.reply(`Bei ${userToRemoveWithdraw.username} wird die Abmeldung zurück genommen `)
            let confirmMessage = await interaction.channel.send(`Bist du sicher, dass du die Abmeldung von ${userToRemoveWithdraw.username} zurück nehmen möchtest?`);
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
                    // Remove Withdraw
                    CurrentSeason.methodStorage.regularDriverRemoveWithdraw(client, userToRemoveWithdraw, CurrentSeason.seasonData);
                    // Changes content of list
                    let tempArray = CurrentSeason.seasonData.getWithdrawnDriversPerCommandLigaSO1();
                    tempArray.splice(tempArray.indexOf(userToRemoveWithdraw.id), 1);
                    CurrentSeason.seasonData.setWithdrawnDriversPerCommandLigaSO1(tempArray); 

                    let date = new Date().toLocaleString();
                    console.log(`removeabmeldungSO1 wurde gestartet und erfolgreich durchgeführt für ${userToRemoveWithdraw.username} -- ${date}`)
                    // Deletes message
                    await confirmMessage.delete();
                } else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                    await confirmMessage.delete();
                    await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`).then(() => {
                        let date = new Date().toLocaleString();
                        console.log(`removeabmeldungSO1 wurde gestartet und abgebrochen -- ${date}`)
                    });
                } else {
                    confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                      let date = new Date().toLocaleString();
                      console.log(`removeabmeldungSO1 wurde gestartet aber es wurde mit dem falschen Emoji `+
                                    `reagiert in ${CurrentSeason.seasonData.getLigatitel()} -- ${date}`)
                      reaction.users.remove(user.id);
                    })
                  }
            })
        }

    }  
}