const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('placedriveronwaitlist1')
        .setDescription('Setzt einen Fahrer auf die Warteliste an die letzte Stelle')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer welche auf Warteliste soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        const driver = interaction.options.getUser('driver');
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLiga1();
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLiga1();

        interaction.reply(`Hinzufügen wurde gestartet`);

        console.log(!(tempSubPersonList.includes(driver.id)))
        console.log(!(tempReinstatedDrivers.includes(driver.id)))
        console.log(await CurrentSeason.methodStorage.checkDriverInLineup(driver.id, CurrentSeason.seasonData))

        if(!(tempSubPersonList.includes(driver.id)) && !(tempReinstatedDrivers.includes(driver.id)) && 
            !(await CurrentSeason.methodStorage.checkDriverInLineup(driver.id, CurrentSeason.seasonData))){
            tempSubPersonList.push(driver.id);
            CurrentSeason.seasonData.setSubPersonListLiga1(tempSubPersonList);
            await CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData);
        } else {
            interaction.channel.send(`Fahrer ist schon im Lineup oder auf der Warteliste`);
        }

    }  
}