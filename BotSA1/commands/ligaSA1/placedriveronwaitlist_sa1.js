const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('placedriveronwaitlist_sa1')
        .setDescription('Setzt einen Fahrer auf die Warteliste an die letzte Stelle')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer welche auf Warteliste soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der placedriveronwaitlistSA1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const driver = interaction.options.getUser('driver');
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLigaSA1();
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLigaSA1();

        interaction.reply(`Hinzufügen wurde gestartet`);

        if(!(tempSubPersonList.includes(driver.id)) && !(tempReinstatedDrivers.includes(driver.id)) && 
            !(await CurrentSeason.methodStorage.checkDriverInLineup(driver.id, CurrentSeason.seasonData))){
            tempSubPersonList.push(driver.id);
            CurrentSeason.seasonData.setSubPersonListLigaSA1(tempSubPersonList);

            var date = new Date().toLocaleString()
            console.log(`${driver.username} wurde erfolgreich auf die Warteliste gepackt -- ${date}`)
            await CurrentSeason.methodStorage.setWaitlistMsgContent(client, CurrentSeason.seasonData);
        } else {
            interaction.channel.send(`Fahrer ist schon im Lineup oder auf der Warteliste`);
        }

    }  
}