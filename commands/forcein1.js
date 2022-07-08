const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcein1')
        .setDescription('Belegt ein Cockpit welches vorher gecleart wurde')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Driver welcher eingesetzt werden soll')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('team')
                .setDescription('Team welches den offenen Platz hat')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        interaction.reply(`Ersetzten wurde gestartet`);

        const driverInUser = interaction.options.getUser('driver');
        const driverIn = interaction.guild.members.cache.get(driverInUser.id)
        const teamRole = interaction.options.getRole('team');
        var tempLineup = CurrentSeason.seasonData.getCurrentLineupLiga1();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLiga1();
        var tempTeamDrivers = new Array()
        if(teamRole.name == `Mercedes`){
            tempTeamDrivers = CurrentSeason.seasonData.getMercedesDriversLiga1();
        } else if(teamRole.name == `Red Bull`){
            tempTeamDrivers = CurrentSeason.seasonData.getRedBullDriversLiga1();
        } else if(teamRole.name == `Ferrari`){
            tempTeamDrivers = CurrentSeason.seasonData.getFerrariDriversLiga1();
        } else if(teamRole.name == `McLaren`){
            tempTeamDrivers = CurrentSeason.seasonData.getMcLarenDriversLiga1();
        } else if(teamRole.name == `Aston Martin`){
            tempTeamDrivers = CurrentSeason.seasonData.getAstonMartinDriversLiga1();
        } else if(teamRole.name == `Alpine`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlpineDriversLiga1();
        } else if(teamRole.name == `Alpha Tauri`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlphaTauriDriversLiga1();
        } else if(teamRole.name == `Alfa Romeo`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlfaRomeoDriversLiga1();
        } else if(teamRole.name == `Williams`){
            tempTeamDrivers = CurrentSeason.seasonData.getWilliamsDriversLiga1();
        } else if(teamRole.name == `Haas`){
            tempTeamDrivers = CurrentSeason.seasonData.getHaasDriversLiga1();
        }

        if(!(driverIn.roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga1()))){
            interaction.channel.send(`Fahrer braucht Ersatzfahrerrolle von Liga 1`);
            return;
        }

        if(tempLineup.get(teamRole.name)[0] != 'entfernt' && tempLineup.get(teamRole.name)[1] != 'entfernt'){
            interaction.channel.send(`Falsches Team wurde übergeben`);
            return;
        }

        if(tempLineup.get(teamRole.name)[0] == 'entfernt'){
            tempTeamDrivers[0] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga1());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga1());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLiga1(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 0, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        } else if(tempLineup.get(teamRole.name)[1] == 'entfernt'){
            tempTeamDrivers[1] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga1());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga1());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLiga1(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 1, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        }

        if(teamRole.name == `Mercedes`){
            CurrentSeason.seasonData.setMercedesDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Red Bull`){
            CurrentSeason.seasonData.setRedBullDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Ferrari`){
            CurrentSeason.seasonData.setFerrariDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `McLaren`){
            CurrentSeason.seasonData.setMcLarenDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Aston Martin`){
            CurrentSeason.seasonData.setAstonMartinDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Alpine`){
            CurrentSeason.seasonData.setAlpineDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Alpha Tauri`){
            CurrentSeason.seasonData.setAlphaTauriDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Alfa Romeo`){
            CurrentSeason.seasonData.setAlfaRomeoDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Williams`){
            CurrentSeason.seasonData.setWilliamsDriversLiga1(tempTeamDrivers);
        } else if(teamRole.name == `Haas`){
            CurrentSeason.seasonData.setHaasDriversLiga1(tempTeamDrivers);
        }
        
    }  
}