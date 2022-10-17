const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_origin.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflewaitlistlast_origin')
        .setDescription('Schiebt einen Fahrer auf den letzten Platz auf der Warteliste')
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
            console.log(`Der shufflewaitlistlastOrigin Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply('Prozess gestartet')

        const driver = interaction.options.getUser('driver');
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLigaOrigin();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLigaOrigin();

        if(tempReinstatedDrivers.includes(driver.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driver.id), 1)
        } else if(tempSubPersonList.includes(driver.id)){
            tempSubPersonList.splice(tempSubPersonList.indexOf(driver.id), 1);
        } else {
            interaction.channel.send(`Fahrer nicht auf Warteliste`);
            return;
        }

        tempSubPersonList.push(driver.id);

        CurrentSeason.seasonData.setsubPersonListReinstatedDriversLigaOrigin(tempReinstatedDrivers);
        CurrentSeason.seasonData.setSubPersonListLigaOrigin(tempSubPersonList);

        CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData);

    }  
}