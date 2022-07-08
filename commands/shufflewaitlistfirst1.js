const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflewaitlistfirst1')
        .setDescription('Schiebt einen Fahrer auf den ersten Platz auf der Warteliste')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer der Verschoben werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        interaction.reply('Prozess gestartet')

        const driver = interaction.options.getUser('driver');
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLiga1();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLiga1();

        if(tempReinstatedDrivers.includes(driver.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driver.id), 1)
        } else if(tempSubPersonList.includes(driver.id)){
            tempSubPersonList.splice(tempSubPersonList.indexOf(driver.id), 1);
        } else {
            interaction.channel.send(`Fahrer nicht auf Warteliste`);
            return;
        }

        tempReinstatedDrivers.unshift(driver.id);
        
        CurrentSeason.seasonData.setsubPersonListReinstatedDriversLiga1(tempReinstatedDrivers);
        CurrentSeason.seasonData.setSubPersonListLiga1(tempSubPersonList);

        await CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData);

    }  
}