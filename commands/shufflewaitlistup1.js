const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflewaitlistup1')
        .setDescription('Schiebt einen Fahrer einen Platz nach hinten auf der Warteliste')
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
        var indexDriver = null
        var onReinstate = false
        var onNormal = false

        if(tempReinstatedDrivers.includes(driver.id)){
            indexDriver = tempReinstatedDrivers.indexOf(driver.id);
            onReinstate = true
        } else if(tempSubPersonList.includes(driver.id)){
            indexDriver = tempSubPersonList.indexOf(driver.id);
            onNormal = true
        } else {
            interaction.channel.send(`Fahrer nicht auf Warteliste`);
            return;
        }

        if(indexDriver != null){
            if(onReinstate){
                if(indexDriver == tempReinstatedDrivers.length - 1){
                    tempReinstatedDrivers[indexDriver] = tempSubPersonList[0];
                    tempSubPersonList[0] = driver.id
                } else {
                    tempReinstatedDrivers[indexDriver] = tempReinstatedDrivers[indexDriver + 1];
                    tempReinstatedDrivers[indexDriver + 1] = driver.id;
                }
            } else if(onNormal){
                if(indexDriver == tempSubPersonList.length - 1){
                    interaction.channel.send(`Fahrer ist schon ganz hinten`)
                } else {
                    tempSubPersonList[indexDriver] = tempSubPersonList[indexDriver + 1];
                    tempSubPersonList[indexDriver + 1] = driver.id;
                }
            }
        }

        CurrentSeason.seasonData.setsubPersonListReinstatedDriversLiga1(tempReinstatedDrivers);
        CurrentSeason.seasonData.setSubPersonListLiga1(tempSubPersonList);

        CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData);

    }  
}