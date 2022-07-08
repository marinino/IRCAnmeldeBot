const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const CurrentSeason = require('./startseasonliga1.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removefromwaitlist1')
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
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLiga1();
        var tempSubDrivers = CurrentSeason.seasonData.getSubPersonListLiga1();
        const messageEmbededAnmelden = CurrentSeason.seasonData.getMessageEmbedAnmeldenLiga1();
        var tempReactedToSubIn = CurrentSeason.seasonData.getReactedToSubInLiga1(); 

        if(tempReinstatedDrivers.includes(driverRemove.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setsubPersonListReinstatedDriversLiga1(tempReinstatedDrivers);
        } else if(tempSubDrivers.includes(driverRemove.id)){
            tempSubDrivers.splice(tempSubDrivers.indexOf(driverRemove.id), 1);
            CurrentSeason.seasonData.setSubPersonListLiga1(tempSubDrivers);

            if(tempReactedToSubIn.has(driverRemove.id)){
                console.log(messageEmbededAnmelden)
                await messageEmbededAnmelden.reactions.resolve(tempReactedToSubIn.get(driverRemove.id)).users.remove(driverRemove.id);
                tempReactedToSubIn.delete(driverRemove.id);
                CurrentSeason.seasonData.setReactedToSubInLiga1(tempReactedToSubIn);
            }
        } else{
            await interaction.channel.send(`Fahrer ist nicht auf der Warteliste`)
            return;
        }

        let embedRemoveWaitlist = new MessageEmbed()
            .setColor('RED')
            .setTitle('↩')
            .addFields({name:'Update', value:`<@${driverRemove.id}> wurde von der Warteliste enfernt`});
        
        await client.channels.cache.get(CurrentSeason.seasonData.getAnmeldeChannelIDLiga1()).send({ embeds: [embedRemoveWaitlist] })

        await CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData)
    }  
}