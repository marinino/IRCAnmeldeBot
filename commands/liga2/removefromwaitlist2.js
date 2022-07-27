const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const CurrentSeason = require('./startseasonliga2.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removefromwaitlist2')
        .setDescription('Entfernt einen Fahrer von der Warteliste')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer welcher von der Warteliste entfernt werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        await interaction.reply(`Entfernen wurde gestartet`);

        const driverRemove = interaction.options.getUser('driver');
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLiga2();
        var tempSubDrivers = CurrentSeason.seasonData.getSubPersonListLiga2();
        const messageEmbededAnmelden = CurrentSeason.seasonData.getMessageEmbedAnmeldenLiga2();
        var tempReactedToSubIn = CurrentSeason.seasonData.getReactedToSubInLiga2(); 

        if(tempReinstatedDrivers.includes(driverRemove.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setsubPersonListReinstatedDriversLiga2(tempReinstatedDrivers);
        } else if(tempSubDrivers.includes(driverRemove.id)){
            tempSubDrivers.splice(tempSubDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setSubPersonListLiga2(tempSubDrivers);

            if(tempReactedToSubIn.has(driverRemove.id)){
                console.log(messageEmbededAnmelden)
                await messageEmbededAnmelden.reactions.resolve(tempReactedToSubIn.get(driverRemove.id)).users.remove(driverRemove.id);
                tempReactedToSubIn.delete(driverRemove.id);
                CurrentSeason.seasonData.setReactedToSubInLiga2(tempReactedToSubIn);
            }
        } else{
            await interaction.channel.send(`Fahrer ist nicht auf der Warteliste`)
            return;
        }

        let embedRemoveWaitlist = new MessageEmbed()
            .setColor('RED')
            .setTitle('↩')
            .addFields({name:'Update', value:`<@${driverRemove.id}> wurde von der Warteliste enfernt`});
        
        await client.channels.cache.get(CurrentSeason.seasonData.getAnmeldeChannelIDLiga2()).send({ embeds: [embedRemoveWaitlist] })

        await CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData)
    }  
}