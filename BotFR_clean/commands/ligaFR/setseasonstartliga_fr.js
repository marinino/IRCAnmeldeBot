const {SlashCommandBuilder} = require('discord.js');
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
        // Zerotix, Nagato
        CurrentSeason.seasonData.setRedBullDriversLigaFR(['545636518782435330', '772557225024946217']);
        // Felixx, Dome nur Besser
        CurrentSeason.seasonData.setFerrariDriversLigaFR(['927709369431363594', '777188809175072778']);
        // Spacelord, Mandalon
        CurrentSeason.seasonData.setMcLarenDriversLigaFR(['335420562413453312', '764434676588740638']);
        // Moralix, UhuUnheil
        CurrentSeason.seasonData.setAstonMartinDriversLigaFR(['460882242856681474', '1007613328505454632']);
        // avestro, Pacman
        CurrentSeason.seasonData.setAlpineDriversLigaFR(['1014907037412511864', '284950253772341248']);
        // Entsafter, Yarbay
        CurrentSeason.seasonData.setAlphaTauriDriversLigaFR(['630078485083455498', '523553582524399672']);
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