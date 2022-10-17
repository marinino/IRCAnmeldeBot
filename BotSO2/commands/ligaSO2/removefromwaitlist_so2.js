const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_so2.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removefromwaitlist_so2')
        .setDescription('Entfernt einen Fahrer von der Warteliste')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer welcher von der Warteliste entfernt werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der removefromwaitlistSO2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        await interaction.reply(`Entfernen wurde gestartet`);

        const driverRemove = interaction.options.getUser('driver');
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLigaSO2();
        var tempSubDrivers = CurrentSeason.seasonData.getSubPersonListLigaSO2();
        const messageEmbededAnmelden = CurrentSeason.seasonData.getMessageEmbedAnmeldenLigaSO2();
        var tempReactedToSubIn = CurrentSeason.seasonData.getReactedToSubInLigaSO2(); 

        if(tempReinstatedDrivers.includes(driverRemove.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setsubPersonListReinstatedDriversLigaSO2(tempReinstatedDrivers);
        } else if(tempSubDrivers.includes(driverRemove.id)){
            tempSubDrivers.splice(tempSubDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setSubPersonListLigaSO2(tempSubDrivers);

            if(tempReactedToSubIn.has(driverRemove.id)){
                await messageEmbededAnmelden.reactions.resolve(tempReactedToSubIn.get(driverRemove.id)).users.remove(driverRemove.id);
                tempReactedToSubIn.delete(driverRemove.id);
                CurrentSeason.seasonData.setReactedToSubInLigaSO2(tempReactedToSubIn);
            }
        } else{
            await interaction.channel.send(`Fahrer ist nicht auf der Warteliste`)
            return;
        }

        let embedRemoveWaitlist = new EmbedBuilder()
            .setColor('#ff4d4d')
            .setTitle('↩')
            .addFields({name:'Update', value:`<@${driverRemove.id}> wurde von der Warteliste enfernt`});
        
        await client.channels.cache.get(CurrentSeason.seasonData.getAnmeldeChannelIDLigaSO2()).send({ embeds: [embedRemoveWaitlist] })

        await CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData)
    }  
}