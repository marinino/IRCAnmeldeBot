const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_so2.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartliga_so2')
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
            console.log(`Der startseasonligaSO2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        
        // Armedn Osmani, Buddy
        CurrentSeason.seasonData.setMercedesDriversLigaSO2(['616690841532104759', '177733474713600000']);
        // Spylex, scottY_
        CurrentSeason.seasonData.setRedBullDriversLigaSO2(['310120370860457984', '235084053907243008']);
        // Frosti, nerlan
        CurrentSeason.seasonData.setFerrariDriversLigaSO2(['663084750256209950', '329353284273831937']);
        // Harlekin, -
        CurrentSeason.seasonData.setMcLarenDriversLigaSO2(['554754801632804865', 'entfernt']);
        // Treatz, Tom:)
        CurrentSeason.seasonData.setAstonMartinDriversLigaSO2(['582711260408184843', '342305504359481345']);
        // stayz, Jan.05
        CurrentSeason.seasonData.setAlpineDriversLigaSO2(['406475375330459649', '720227768457101373']);
        // Julian, Hico
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSO2(['563449483162288150', '442694360652447755']);
        // Noryl, Klaus
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSO2(['289036587159912448', '595695198596759593']);
        // -, Fr0z3nsc0pio
        CurrentSeason.seasonData.setWilliamsDriversLigaSO2(['entfernt', '760177185746583622']);
        // Scof, Leviathan
        CurrentSeason.seasonData.setHaasDriversLigaSO2(['378256164196188160', '288054858030776320']);

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
                if(CurrentSeason.seasonData.getSeasonCalendarLigaSO2().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLigaSO2(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 510000000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaSO2(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaSO2().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaSO2() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 510000000);
                            CurrentSeason.seasonData.getSeasonCalendarLigaSO2().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaSO2().forEach(element => (console.log(element)))
                        }else{
                            var date = new Date().toLocaleString()
                            console.log(`Der Ligabetrieb in Liga SO 2 ist Pausiert oder zu Ende -- ${date}`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLigaSO2());
                        
                        CurrentSeason.seasonData.setSeasonActiveLigaSO2(false);
                        CurrentSeason.seasonData.setSeasonCalendarLigaSO2(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaSO2(new Array());
                        console.log(`Die Season in Liga SO 2 wurde beendet`);
                    }
                    
                }  , 604800000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga SO 2`)
        }
    }  
}