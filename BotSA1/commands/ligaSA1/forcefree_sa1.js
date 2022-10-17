const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcefree_sa1')
        .setDescription('Öffnet ein entferntes Cockpit für Ersatzfahrer')
        .addRoleOption(option => 
            option.setName('team')
                .setDescription('Team welches frei gemacht werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der forcefreeSA1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply(`Öffnen wurde gestartet`);

        const teamRole = interaction.options.getRole('team');
        var tempCurrentLineup = CurrentSeason.seasonData.getCurrentLineupLigaSA1();
        var tempFreeCars = CurrentSeason.seasonData.getFreeCarsLigaSA1();

        tempFreeCars.push(teamRole.id);
        CurrentSeason.seasonData.setFreeCarsLigaSA1(tempFreeCars);

        if(tempCurrentLineup.get(teamRole.name)[0] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[0] = 'nicht besetzt';
            CurrentSeason.seasonData.setCurrentLineupLigaSA1(tempCurrentLineup);
            CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 0, null, null, CurrentSeason.seasonData);
            
            var date = new Date().toLocaleString()
            console.log(`Cockpit 1 von ${teamRole.name} wurde auf nicht besetzt gestellt -- ${date}`)
        } else if(tempCurrentLineup.get(teamRole.name)[1] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[1] = 'nicht besetzt';
            CurrentSeason.seasonData.setCurrentLineupLigaSA1(tempCurrentLineup);
            CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 1, null, null, CurrentSeason.seasonData);

            var date = new Date().toLocaleString()
            console.log(`Cockpit 2 von ${teamRole.name} wurde auf nicht besetzt gestellt -- ${date}`)
        } else {
            interaction.channel.send(`Falsches Team übergeben`);

            var date = new Date().toLocaleString()
            console.log(`Kein Cockpit von ${teamRole.name} war entfernt -- ${date}`)
        }
    }  
}