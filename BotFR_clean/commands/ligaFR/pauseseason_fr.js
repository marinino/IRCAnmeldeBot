const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_fr.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pauseseason_fr')
        .setDescription('Pausiert den Ligabertieb, bis er wieder aktiviert wird'),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der pauseseasonFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        if(CurrentSeason.seasonData.getSeasonActiveLigaFR()){
            CurrentSeason.seasonData.setSeasonActiveLigaFR(false);
        }

        interaction.reply(`Saison wurde pausiert`);

    }  
}