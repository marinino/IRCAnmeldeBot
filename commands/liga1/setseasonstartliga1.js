const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga1.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartliga1')
        .setDescription('Setzt die Startzeit der wöchentlichen Anmeldung für die Liga')
        .addStringOption(option => 
            option.setName('starttime')
                .setDescription('Startzeit angeben im Format TT.MM HH:MM:SS')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der startseasonliga1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Adman, Chris
        CurrentSeason.seasonData.setMercedesDriversLiga1(['269499201702854667', '469926134700703748']);
        // SHD, lyrex
        CurrentSeason.seasonData.setRedBullDriversLiga1(['284981237645312000', '281829417775267840']);
        CurrentSeason.seasonData.setFerrariDriversLiga1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setMcLarenDriversLiga1(['nicht besetzt', 'nicht besetzt']);
        // Vollkorn
        CurrentSeason.seasonData.setAstonMartinDriversLiga1(['319115003032502282', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlpineDriversLiga1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlphaTauriDriversLiga1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlfaRomeoDriversLiga1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setWilliamsDriversLiga1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setHaasDriversLiga1(['nicht besetzt', 'nicht besetzt']);

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
                if(CurrentSeason.seasonData.getSeasonCalendarLiga1().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLiga1(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 180000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLiga1(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLiga1().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLiga1() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 180000);
                            CurrentSeason.seasonData.getSeasonCalendarLiga1().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLiga1().forEach(element => (console.log(element)))
                        }else{
                            var date = new Date().toLocaleString()
                            console.log(`Der Ligabetrieb in Liga 1 ist Pausiert oder zu Ende -- ${date}`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLiga1());
                        
                        CurrentSeason.seasonData.setSeasonActiveLiga1(false);
                        CurrentSeason.seasonData.setSeasonCalendarLiga1(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLiga1(new Array());
                        console.log(`Die Season in Liga 1 wurde beendet`);
                    }
                    
                }  , 190000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden`)
        }
    }  
}