const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endseason2')
        .setDescription('Beendet eine Season'),

    async execute(client, interaction, command){

        let startLoop = CurrentSeason.seasonData.getStartLoopLiga2();

        if(startLoop != null){
            clearInterval(startLoop);
            CurrentSeason.seasonData.setSeasonCalendarLiga2(new Array());
            CurrentSeason.seasonData.setSeasonCalendarRacesDoneLiga2(new Array());
            CurrentSeason.seasonData.setSeasonActiveLiga2(false);
            CurrentSeason.seasonData.setStartLoopLiga2(null);

            interaction.reply(`Saison wurde beendet`);

        } else {
            interaction.reply(`Saison wurde noch nicht gestartet`)
        }

    }  
}