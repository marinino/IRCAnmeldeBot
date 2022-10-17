const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_origin.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflewaitlistdown_origin')
        .setDescription('Schiebt einen Fahrer einen Platz nach vorne auf der Warteliste')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer der Verschoben werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der shufflewaitlistdownOrigin Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply('Prozess startet')

        const driver = interaction.options.getUser('driver');
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLigaOrigin();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLigaOrigin();
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
                   interaction.channel.send(`Fahrer ist schon ganz vorne`)
                } else {
                    tempReinstatedDrivers[indexDriver] = tempReinstatedDrivers[indexDriver - 1];
                    tempReinstatedDrivers[indexDriver - 1] = driver.id;
                }
            } else if(onNormal){
                if(tempReinstatedDrivers.length == 0 && indexDriver == 0){
                    interaction.channel.send(`Fahrer ist schon ganz vorne`)
                }  else if(indexDriver == 0){
                    tempSubPersonList[0] = tempReinstatedDrivers[tempReinstatedDrivers.length - 1];
                    tempReinstatedDrivers[tempReinstatedDrivers.length - 1] = driver.id;
                } else {
                    tempSubPersonList[indexDriver] = tempSubPersonList[indexDriver - 1];
                    tempSubPersonList[indexDriver - 1] = driver.id;
                }
            }
        }

        CurrentSeason.seasonData.setsubPersonListReinstatedDriversLigaOrigin(tempReinstatedDrivers);
        CurrentSeason.seasonData.setSubPersonListLigaOrigin(tempSubPersonList);

        CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData);

    }  
}