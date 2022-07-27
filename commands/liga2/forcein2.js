const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcein2')
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
        var tempLineup = CurrentSeason.seasonData.getCurrentLineupLiga2();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLiga2();
        var tempTeamDrivers = new Array()
        if(teamRole.name == `Mercedes`){
            tempTeamDrivers = CurrentSeason.seasonData.getMercedesDriversLiga2();
        } else if(teamRole.name == `Red Bull`){
            tempTeamDrivers = CurrentSeason.seasonData.getRedBullDriversLiga2();
        } else if(teamRole.name == `Ferrari`){
            tempTeamDrivers = CurrentSeason.seasonData.getFerrariDriversLiga2();
        } else if(teamRole.name == `McLaren`){
            tempTeamDrivers = CurrentSeason.seasonData.getMcLarenDriversLiga2();
        } else if(teamRole.name == `Aston Martin`){
            tempTeamDrivers = CurrentSeason.seasonData.getAstonMartinDriversLiga2();
        } else if(teamRole.name == `Alpine`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlpineDriversLiga2();
        } else if(teamRole.name == `Alpha Tauri`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlphaTauriDriversLiga2();
        } else if(teamRole.name == `Alfa Romeo`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlfaRomeoDriversLiga2();
        } else if(teamRole.name == `Williams`){
            tempTeamDrivers = CurrentSeason.seasonData.getWilliamsDriversLiga2();
        } else if(teamRole.name == `Haas`){
            tempTeamDrivers = CurrentSeason.seasonData.getHaasDriversLiga2();
        }

        if(!(driverIn.roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2()))){
            interaction.channel.send(`Fahrer braucht Ersatzfahrerrolle von Liga 2`);
            return;
        }

        if(tempLineup.get(teamRole.name)[0] != 'entfernt' && tempLineup.get(teamRole.name)[1] != 'entfernt'){
            interaction.channel.send(`Falsches Team wurde übergeben`);
            return;
        }

        if(tempLineup.get(teamRole.name)[0] == 'entfernt'){
            tempTeamDrivers[0] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLiga2(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 0, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        } else if(tempLineup.get(teamRole.name)[1] == 'entfernt'){
            tempTeamDrivers[1] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLiga2(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 1, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        }

        if(teamRole.name == `Mercedes`){
            CurrentSeason.seasonData.setMercedesDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Red Bull`){
            CurrentSeason.seasonData.setRedBullDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Ferrari`){
            CurrentSeason.seasonData.setFerrariDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `McLaren`){
            CurrentSeason.seasonData.setMcLarenDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Aston Martin`){
            CurrentSeason.seasonData.setAstonMartinDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Alpine`){
            CurrentSeason.seasonData.setAlpineDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Alpha Tauri`){
            CurrentSeason.seasonData.setAlphaTauriDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Alfa Romeo`){
            CurrentSeason.seasonData.setAlfaRomeoDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Williams`){
            CurrentSeason.seasonData.setWilliamsDriversLiga2(tempTeamDrivers);
        } else if(teamRole.name == `Haas`){
            CurrentSeason.seasonData.setHaasDriversLiga2(tempTeamDrivers);
        }
        
    }  
}