const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endseason1')
        .setDescription('Beendet eine Season'),

    async execute(client, interaction, command){

        let startLoop = CurrentSeason.seasonData.getStartLoopLiga1();

        if(startLoop != null){
            clearInterval(startLoop);
            CurrentSeason.seasonData.setSeasonCalendarLiga1(new Array());
            CurrentSeason.seasonData.setSeasonCalendarRacesDoneLiga1(new Array());
            CurrentSeason.seasonData.setSeasonActiveLiga1(false);
            CurrentSeason.seasonData.setStartLoopLiga1(null);

            interaction.reply(`Saison wurde beendet`);

        } else {
            interaction.reply(`Saison wurde noch nicht gestartet`)
        }

    }  
}