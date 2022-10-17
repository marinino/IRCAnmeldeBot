const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa1.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removefromwaitlist_sa1')
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
            console.log(`Der removefromwaitlistSA1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        await interaction.reply(`Entfernen wurde gestartet`);

        const driverRemove = interaction.options.getUser('driver');
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLigaSA1();
        var tempSubDrivers = CurrentSeason.seasonData.getSubPersonListLigaSA1();
        const messageEmbededAnmelden = CurrentSeason.seasonData.getMessageEmbedAnmeldenLigaSA1();
        var tempReactedToSubIn = CurrentSeason.seasonData.getReactedToSubInLigaSA1(); 

        if(tempReinstatedDrivers.includes(driverRemove.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setsubPersonListReinstatedDriversLigaSA1(tempReinstatedDrivers);
        } else if(tempSubDrivers.includes(driverRemove.id)){
            tempSubDrivers.splice(tempSubDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setSubPersonListLigaSA1(tempSubDrivers);

            if(tempReactedToSubIn.has(driverRemove.id)){
                await messageEmbededAnmelden.reactions.resolve(tempReactedToSubIn.get(driverRemove.id)).users.remove(driverRemove.id);
                tempReactedToSubIn.delete(driverRemove.id);
                CurrentSeason.seasonData.setReactedToSubInLigaSA1(tempReactedToSubIn);
            }
        } else{
            await interaction.channel.send(`Fahrer ist nicht auf der Warteliste`)
            return;
        }

        let embedRemoveWaitlist = new EmbedBuilder()
            .setColor('#ff4d4d')
            .setTitle('↩')
            .addFields({name:'Update', value:`<@${driverRemove.id}> wurde von der Warteliste enfernt`});
        
        await client.channels.cache.get(CurrentSeason.seasonData.getAnmeldeChannelIDLigaSA1()).send({ embeds: [embedRemoveWaitlist] })

        await CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData)
    }  
}