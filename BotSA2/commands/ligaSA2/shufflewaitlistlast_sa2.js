const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflewaitlistlast_sa2')
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
            console.log(`Der shufflewaitlistlastSA2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply('Prozess gestartet')

        const driver = interaction.options.getUser('driver');
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLigaSA2();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLigaSA2();

        if(tempReinstatedDrivers.includes(driver.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driver.id), 1)
        } else if(tempSubPersonList.includes(driver.id)){
            tempSubPersonList.splice(tempSubPersonList.indexOf(driver.id), 1);
        } else {
            interaction.channel.send(`Fahrer nicht auf Warteliste`);
            return;
        }

        tempSubPersonList.push(driver.id);

        CurrentSeason.seasonData.setsubPersonListReinstatedDriversLigaSA2(tempReinstatedDrivers);
        CurrentSeason.seasonData.setSubPersonListLigaSA2(tempSubPersonList);

        CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData);

    }  
}