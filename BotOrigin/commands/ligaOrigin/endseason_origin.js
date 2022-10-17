const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_origin.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endseason_origin')
        .setDescription('Beendet eine Season'),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der endseasonOrigin Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        let startLoop = CurrentSeason.seasonData.getStartLoopLigaOrigin();

        if(startLoop != null){
            clearInterval(startLoop);
            CurrentSeason.seasonData.setSeasonCalendarLigaOrigin(new Array());
            CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaOrigin(new Array());
            CurrentSeason.seasonData.setSeasonActiveLigaOrigin(false);
            CurrentSeason.seasonData.setStartLoopLigaOrigin(null);

            interaction.reply(`Saison wurde beendet`);
            var date = new Date().toLocaleString()
            console.log(`endseasonFR wurde verwendet -- ${date}`)

        } else {
            interaction.reply(`Saison wurde noch nicht gestartet`)
            var date = new Date().toLocaleString()
            console.log(`endseasonFR wurde verwendet, hat aber nicht funktioniert, da die Season noch nicht gestartet wurde -- ${date}`)
        }

    }  
}