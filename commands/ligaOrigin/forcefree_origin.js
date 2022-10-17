const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_origin.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcefree_origin')
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
            console.log(`Der forcefreeOrigin Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply(`Öffnen wurde gestartet`);

        const teamRole = interaction.options.getRole('team');
        var tempCurrentLineup = CurrentSeason.seasonData.getCurrentLineupLigaOrigin();
        var tempFreeCars = CurrentSeason.seasonData.getFreeCarsLigaOrigin();

        tempFreeCars.push(teamRole.id);
        CurrentSeason.seasonData.setFreeCarsLigaOrigin(tempFreeCars);

        if(tempCurrentLineup.get(teamRole.name)[0] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[0] = 'nicht besetzt';
            CurrentSeason.seasonData.setCurrentLineupLigaOrigin(tempCurrentLineup);
            CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 0, null, null, CurrentSeason.seasonData);
            
            var date = new Date().toLocaleString()
            console.log(`Cockpit 1 von ${teamRole.name} wurde auf nicht besetzt gestellt -- ${date}`)
        } else if(tempCurrentLineup.get(teamRole.name)[1] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[1] = 'nicht besetzt';
            CurrentSeason.seasonData.setCurrentLineupLigaOrigin(tempCurrentLineup);
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