const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_so1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcein_so1')
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

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der forceinSO1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply(`Ersetzten wurde gestartet`);

        const driverInUser = interaction.options.getUser('driver');
        const driverIn = interaction.guild.members.cache.get(driverInUser.id)
        const teamRole = interaction.options.getRole('team');
        var tempLineup = CurrentSeason.seasonData.getCurrentLineupLigaSO1();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLigaSO1();
        var tempTeamDrivers = new Array()
        if(teamRole.name == `Mercedes`){
            tempTeamDrivers = CurrentSeason.seasonData.getMercedesDriversLigaSO1();
        } else if(teamRole.name == `Red Bull`){
            tempTeamDrivers = CurrentSeason.seasonData.getRedBullDriversLigaSO1();
        } else if(teamRole.name == `Ferrari`){
            tempTeamDrivers = CurrentSeason.seasonData.getFerrariDriversLigaSO1();
        } else if(teamRole.name == `McLaren`){
            tempTeamDrivers = CurrentSeason.seasonData.getMcLarenDriversLigaSO1();
        } else if(teamRole.name == `Aston Martin`){
            tempTeamDrivers = CurrentSeason.seasonData.getAstonMartinDriversLigaSO1();
        } else if(teamRole.name == `Alpine`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlpineDriversLigaSO1();
        } else if(teamRole.name == `Alpha Tauri`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlphaTauriDriversLigaSO1();
        } else if(teamRole.name == `Alfa Romeo`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlfaRomeoDriversLigaSO1();
        } else if(teamRole.name == `Williams`){
            tempTeamDrivers = CurrentSeason.seasonData.getWilliamsDriversLigaSO1();
        } else if(teamRole.name == `Haas`){
            tempTeamDrivers = CurrentSeason.seasonData.getHaasDriversLigaSO1();
        }

        if(!(driverIn.roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSO1()))){
            interaction.channel.send(`Fahrer braucht Ersatzfahrerrolle von Liga SO 1`);
            var date = new Date().toLocaleString()
            console.log(`${driverInUser.username} hat nicht die Ersatzfahrerolle für Liga SO 1 -- ${date}`)
            return;
        }

        if(tempLineup.get(teamRole.name)[0] != 'entfernt' && tempLineup.get(teamRole.name)[1] != 'entfernt'){
            interaction.channel.send(`Falsches Team wurde übergeben`);
            var date = new Date().toLocaleString()
            console.log(`${teamRole.name} hat kein entferntes Cockpit in Liga SO 1 -- ${date}`)
            return;
        }

        if(tempLineup.get(teamRole.name)[0] == 'entfernt'){
            tempTeamDrivers[0] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSO1());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSO1());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLigaSO1(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 0, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        } else if(tempLineup.get(teamRole.name)[1] == 'entfernt'){
            tempTeamDrivers[1] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSO1());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSO1());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLigaSO1(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 1, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        }

        if(teamRole.name == `Mercedes`){
            CurrentSeason.seasonData.setMercedesDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Red Bull`){
            CurrentSeason.seasonData.setRedBullDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Ferrari`){
            CurrentSeason.seasonData.setFerrariDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `McLaren`){
            CurrentSeason.seasonData.setMcLarenDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Aston Martin`){
            CurrentSeason.seasonData.setAstonMartinDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Alpine`){
            CurrentSeason.seasonData.setAlpineDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Alpha Tauri`){
            CurrentSeason.seasonData.setAlphaTauriDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Alfa Romeo`){
            CurrentSeason.seasonData.setAlfaRomeoDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Williams`){
            CurrentSeason.seasonData.setWilliamsDriversLigaSO1(tempTeamDrivers);
        } else if(teamRole.name == `Haas`){
            CurrentSeason.seasonData.setHaasDriversLigaSO1(tempTeamDrivers);
        }
        
    }  
}