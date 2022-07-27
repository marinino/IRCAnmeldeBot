const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resumeseason2')
        .setDescription('Führt den Ligabertieb fort'),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied');
            return;
        }else{
            console.log('all good');
        }

        if(!(CurrentSeason.seasonData.getSeasonActiveLiga2())){
            CurrentSeason.seasonData.setSeasonActiveLiga2(true);
        }

        interaction.reply(`Saison läuft wieder`);
    }  
}