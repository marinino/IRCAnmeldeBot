const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcein_sa2')
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
            console.log(`Der forceinSA2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply(`Ersetzten wurde gestartet`);

        const driverInUser = interaction.options.getUser('driver');
        const driverIn = interaction.guild.members.cache.get(driverInUser.id)
        const teamRole = interaction.options.getRole('team');
        var tempLineup = CurrentSeason.seasonData.getCurrentLineupLigaSA2();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLigaSA2();
        var tempTeamDrivers = new Array()
        if(teamRole.name == `Mercedes`){
            tempTeamDrivers = CurrentSeason.seasonData.getMercedesDriversLigaSA2();
        } else if(teamRole.name == `Red Bull`){
            tempTeamDrivers = CurrentSeason.seasonData.getRedBullDriversLigaSA2();
        } else if(teamRole.name == `Ferrari`){
            tempTeamDrivers = CurrentSeason.seasonData.getFerrariDriversLigaSA2();
        } else if(teamRole.name == `McLaren`){
            tempTeamDrivers = CurrentSeason.seasonData.getMcLarenDriversLigaSA2();
        } else if(teamRole.name == `Aston Martin`){
            tempTeamDrivers = CurrentSeason.seasonData.getAstonMartinDriversLigaSA2();
        } else if(teamRole.name == `Alpine`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlpineDriversLigaSA2();
        } else if(teamRole.name == `Alpha Tauri`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlphaTauriDriversLigaSA2();
        } else if(teamRole.name == `Alfa Romeo`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlfaRomeoDriversLigaSA2();
        } else if(teamRole.name == `Williams`){
            tempTeamDrivers = CurrentSeason.seasonData.getWilliamsDriversLigaSA2();
        } else if(teamRole.name == `Haas`){
            tempTeamDrivers = CurrentSeason.seasonData.getHaasDriversLigaSA2();
        }

        if(!(driverIn.roles.cache.has(CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSA2()))){
            interaction.channel.send(`Fahrer braucht Ersatzfahrerrolle von Liga SA 2`);
            var date = new Date().toLocaleString()
            console.log(`${driverInUser.username} hat nicht die Ersatzfahrerolle für Liga SA 2 -- ${date}`)
            return;
        }

        if(tempLineup.get(teamRole.name)[0] != 'entfernt' && tempLineup.get(teamRole.name)[1] != 'entfernt'){
            interaction.channel.send(`Falsches Team wurde übergeben`);
            var date = new Date().toLocaleString()
            console.log(`${teamRole.name} hat kein entferntes Cockpit in Liga SA 2 -- ${date}`)
            return;
        }

        if(tempLineup.get(teamRole.name)[0] == 'entfernt'){
            tempTeamDrivers[0] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSA2());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLigaSA2(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 0, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        } else if(tempLineup.get(teamRole.name)[1] == 'entfernt'){
            tempTeamDrivers[1] = driverIn.id;
            await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSA2());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);
            }
            CurrentSeason.seasonData.setSubPersonListLigaSA2(tempSubPersonList);

            await CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 1, driverIn.id, teamRole.name, CurrentSeason.seasonData);
        }

        if(teamRole.name == `Mercedes`){
            CurrentSeason.seasonData.setMercedesDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Red Bull`){
            CurrentSeason.seasonData.setRedBullDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Ferrari`){
            CurrentSeason.seasonData.setFerrariDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `McLaren`){
            CurrentSeason.seasonData.setMcLarenDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Aston Martin`){
            CurrentSeason.seasonData.setAstonMartinDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Alpine`){
            CurrentSeason.seasonData.setAlpineDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Alpha Tauri`){
            CurrentSeason.seasonData.setAlphaTauriDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Alfa Romeo`){
            CurrentSeason.seasonData.setAlfaRomeoDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Williams`){
            CurrentSeason.seasonData.setWilliamsDriversLigaSA2(tempTeamDrivers);
        } else if(teamRole.name == `Haas`){
            CurrentSeason.seasonData.setHaasDriversLigaSA2(tempTeamDrivers);
        }
        
    }  
}