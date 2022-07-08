const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pauseseason1')
        .setDescription('Pausiert den Ligabertieb, bis er wieder aktiviert wird'),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied');
            return;
        }else{
            console.log('all good');
        }

        if(CurrentSeason.seasonData.getSeasonActiveLiga1()){
            CurrentSeason.seasonData.setSeasonActiveLiga1(false);
        }

        interaction.reply(`Saison wurde pausiert`);

    }  
}