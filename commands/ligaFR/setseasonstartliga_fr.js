const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_fr.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartliga_fr')
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
            console.log(`Der startseasonligaFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Martin2002, MaxPrimetime
        CurrentSeason.seasonData.setMercedesDriversLigaFR(['268398200749031425', '533728391107575809']);
        // Sergeant, Jules Kaiser
        CurrentSeason.seasonData.setRedBullDriversLigaFR(['266673984601325570', '529018929008476160']);
        // Felixx, Jan Overbeck
        CurrentSeason.seasonData.setFerrariDriversLigaFR(['927709369431363594', '598253459216662634']);
        // Spacelord, Feuerrabe
        CurrentSeason.seasonData.setMcLarenDriversLigaFR(['335420562413453312', '682281837233700931']);
        // Kesby, Robbsell
        CurrentSeason.seasonData.setAstonMartinDriversLigaFR(['387002150569377802', '659327297819508737']);
        // avestro, Pacman
        CurrentSeason.seasonData.setAlpineDriversLigaFR(['671353767232274442', '284950253772341248']);
        // Alkenvogel, Yarbay
        CurrentSeason.seasonData.setAlphaTauriDriversLigaFR(['163331404439093248', '523553582524399672']);
        // Andre, Felichs
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaFR(['548524356855136268', '471758946651078657']);
        // Jojo, Pascalus
        CurrentSeason.seasonData.setWilliamsDriversLigaFR(['695583838042325042', '254292883492831232']);
        // Senfy, Schorli
        CurrentSeason.seasonData.setHaasDriversLigaFR(['497014626589081602', '1004447400645111969']);

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
                if(CurrentSeason.seasonData.getSeasonCalendarLigaFR().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLigaFR(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 341400000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaFR(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaFR().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaFR() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 341400000);
                            CurrentSeason.seasonData.getSeasonCalendarLigaFR().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaFR().forEach(element => (console.log(element)))
                        }else{
                            var date = new Date().toLocaleString()
                            console.log(`Der Ligabetrieb in Liga FR ist Pausiert oder zu Ende -- ${date}`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLigaFR());
                        
                        CurrentSeason.seasonData.setSeasonActiveLigaFR(false);
                        CurrentSeason.seasonData.setSeasonCalendarLigaFR(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaFR(new Array());
                        console.log(`Die Season in Liga FR wurde beendet`);
                    }
                    
                }  , 604800000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga FR`)
        }
    }  
}