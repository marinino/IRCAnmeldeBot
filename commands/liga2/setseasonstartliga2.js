const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartliga2')
        .setDescription('Sets the start of a new Season')
        .addStringOption(option => 
            option.setName('starttime')
                .setDescription('Startzeit angeben im Format TT.MM HH:MM:SS')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        // Adman, Chris
        CurrentSeason.seasonData.setMercedesDriversLiga2(['269499201702854667', '469926134700703748']);
        // SHD, lyrex
        CurrentSeason.seasonData.setRedBullDriversLiga2(['284981237645312000', '281829417775267840']);
        CurrentSeason.seasonData.setFerrariDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setMcLarenDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        // Vollkorn
        CurrentSeason.seasonData.setAstonMartinDriversLiga2(['319115003032502282', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlpineDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlphaTauriDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlfaRomeoDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setWilliamsDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setHaasDriversLiga2(['nicht besetzt', 'nicht besetzt']);

        var seasonStartDayofMonth = null
        var seasonStartMonth = null
        var seasonStartHourOfDay = null
        var seasonStartMinutesOfDay = null
        var seasonStartSecondsOfDay = null

        const string = interaction.options.getString('starttime')

        seasonStartDayofMonth = string.slice(0,2)
        seasonStartMonth = string.slice(3,6)
        seasonStartHourOfDay = string.slice(6,8)
        seasonStartMinutesOfDay = string.slice(9,11)
        seasonStartSecondsOfDay = string.slice(12,14)

        interaction.reply(`Die Saison startet am ${seasonStartDayofMonth}.${seasonStartMonth} um ${seasonStartHourOfDay}:${seasonStartMinutesOfDay}:${seasonStartSecondsOfDay}`)
   
        try{
            cron.schedule(`${seasonStartSecondsOfDay} ${seasonStartMinutesOfDay} ${seasonStartHourOfDay} ${seasonStartDayofMonth} ${seasonStartMonth} *`, () => {
                if(CurrentSeason.seasonData.getSeasonCalendarLiga2().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLiga2(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 60000);
                    console.log(`Rennen 1`)
                }
                var i = 1
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLiga2(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLiga2().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLiga2() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 60000);
                            i++
                            console.log(`Rennen ${i}`)
                            CurrentSeason.seasonData.getSeasonCalendarLiga2().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLiga2().forEach(element => (console.log(element)))
                        }else{
                            console.log(`Pausiert oder zu Ende`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLiga2());
                        
                        CurrentSeason.seasonData.setSeasonActiveLiga2(false);
                        CurrentSeason.seasonData.setSeasonCalendarLiga2(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLiga2(new Array());
                        console.log(`Die Season in ${CurrentSeason.seasonData.getLigatitel()} wurde beendet`);
                    }
                    
                }  , 80000)
                
            })
        }catch{
            console.log(`dick`)
        }
    }  
}