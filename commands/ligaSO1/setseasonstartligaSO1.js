const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonligaSO1.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartligaSO1')
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
            console.log(`Der startseasonligaSO1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Adman, Chris
        CurrentSeason.seasonData.setMercedesDriversLigaSO1(['269499201702854667', '469926134700703748']);
        // SHD, lyrex
        CurrentSeason.seasonData.setRedBullDriversLigaSO1(['284981237645312000', '281829417775267840']);
        CurrentSeason.seasonData.setFerrariDriversLigaSO1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setMcLarenDriversLigaSO1(['nicht besetzt', 'nicht besetzt']);
        // Vollkorn
        CurrentSeason.seasonData.setAstonMartinDriversLigaSO1(['319115003032502282', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlpineDriversLigaSO1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSO1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSO1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setWilliamsDriversLigaSO1(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setHaasDriversLigaSO1(['nicht besetzt', 'nicht besetzt']);

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
                if(CurrentSeason.seasonData.getSeasonCalendarLigaSO1().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLigaSO1(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 180000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaSO1(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaSO1().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaSO1() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 180000);
                            CurrentSeason.seasonData.getSeasonCalendarLigaSO1().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaSO1().forEach(element => (console.log(element)))
                        }else{
                            var date = new Date().toLocaleString()
                            console.log(`Der Ligabetrieb in Liga SO 1 ist Pausiert oder zu Ende -- ${date}`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLigaSO1());
                        
                        CurrentSeason.seasonData.setSeasonActiveLigaSO1(false);
                        CurrentSeason.seasonData.setSeasonCalendarLigaSO1(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaSO1(new Array());
                        console.log(`Die Season in Liga SO 1 wurde beendet`);
                    }
                    
                }  , 190000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga SO 1`)
        }
    }  
}