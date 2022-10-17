const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_so2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resumeseason_so2')
        .setDescription('Führt den Ligabertieb fort'),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der resumeseasonSO2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        if(!(CurrentSeason.seasonData.getSeasonActiveLigaSO2())){
            CurrentSeason.seasonData.setSeasonActiveLigaSO2(true);
        }

        interaction.reply(`Saison läuft wieder`);
    }  
}