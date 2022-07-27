const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcefree2')
        .setDescription('Öffnet ein entferntes Cockpit für Ersatzfahrer')
        .addRoleOption(option => 
            option.setName('team')
                .setDescription('Team welches frei gemacht werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        interaction.reply(`Öffnen wurde gestartet`);

        const teamRole = interaction.options.getRole('team');
        var tempCurrentLineup = CurrentSeason.seasonData.getCurrentLineupLiga2();
        var tempFreeCars = CurrentSeason.seasonData.getFreeCarsLiga2();

        tempFreeCars.push(teamRole.id);
        CurrentSeason.seasonData.setFreeCarsLiga1(tempFreeCars);

        if(tempCurrentLineup.get(teamRole.name)[0] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[0] = 'nicht besetzt';
            CurrentSeason.seasonData.setCurrentLineupLiga2(tempCurrentLineup);
            CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 0, null, null, CurrentSeason.seasonData);
        } else if(tempCurrentLineup.get(teamRole.name)[1] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[1] = 'nicht besetzt';
            CurrentSeason.seasonData.setCurrentLineupLiga2(tempCurrentLineup);
            CurrentSeason.methodStorage.checkSubCanBeMade(client, true, 1, null, null, CurrentSeason.seasonData);
        } else {
            interaction.channel.send(`Falsches Team übergeben`);
        }


    }  
}