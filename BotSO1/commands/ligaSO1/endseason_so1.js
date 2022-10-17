const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_so1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endseason_so1')
        .setDescription('Beendet eine Season'),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der endseasonSO1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        let startLoop = CurrentSeason.seasonData.getStartLoopLigaSO1();

        if(startLoop != null){
            clearInterval(startLoop);
            CurrentSeason.seasonData.setSeasonCalendarLigaSO1(new Array());
            CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaSO1(new Array());
            CurrentSeason.seasonData.setSeasonActiveLigaSO1(false);
            CurrentSeason.seasonData.setStartLoopLigaSO1(null);

            interaction.reply(`Saison wurde beendet`);
            var date = new Date().toLocaleString()
            console.log(`endseasonSO1 wurde verwendet -- ${date}`)

        } else {
            interaction.reply(`Saison wurde noch nicht gestartet`)
            var date = new Date().toLocaleString()
            console.log(`endseasonSO1 wurde verwendet, hat aber nicht funktioniert, da die Season noch nicht gestartet wurde -- ${date}`)
        }

    }  
}