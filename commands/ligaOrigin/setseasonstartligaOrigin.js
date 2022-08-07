const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonligaOrigin.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartligaOrigin')
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
            console.log(`Der startseasonligaOrigin Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // MrZOCKson, Crysii
        CurrentSeason.seasonData.setMercedesDriversLigaOrigin(['181150006961635328', '310176925848961025']);
        // Charizzz, talo
        CurrentSeason.seasonData.setRedBullDriversLigaOrigin(['469926134700703748', '265537845081407489']);
        // Noryl, WieSie
        CurrentSeason.seasonData.setFerrariDriversLigaOrigin(['289036587159912448', '382914407153401857']);
        // felx, John
        CurrentSeason.seasonData.setMcLarenDriversLigaOrigin(['250274323934347264', '396155559344078849']);
        // Broncos, Rocket
        CurrentSeason.seasonData.setAstonMartinDriversLigaOrigin(['604645537882308609', '281100297051570177']);
        // Bratpfanne, Giulio
        CurrentSeason.seasonData.setAlpineDriversLigaOrigin(['640308390072942617', '266833962989518849']);
        // Adman, Scof
        CurrentSeason.seasonData.setAlphaTauriDriversLigaOrigin(['269499201702854667', '378256164196188160']);
        // Lizenzinhaber, Julian223
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaOrigin(['556478238311055360', '563449483162288150']);
        // Milleniuz, Nexoooo
        CurrentSeason.seasonData.setWilliamsDriversLigaOrigin(['416272464012640256', '419147681659617280']);
        // Mops, Taurice
        CurrentSeason.seasonData.setHaasDriversLigaOrigin(['291996277556641794', '206037918647713792']);

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
                if(CurrentSeason.seasonData.getSeasonCalendarLigaOrigin().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLigaOrigin(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 180000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaOrigin(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaOrigin().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaOrigin() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 180000);
                            CurrentSeason.seasonData.getSeasonCalendarLigaOrigin().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaOrigin().forEach(element => (console.log(element)))
                        }else{
                            var date = new Date().toLocaleString()
                            console.log(`Der Ligabetrieb in Liga Origin ist Pausiert oder zu Ende -- ${date}`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLigaOrigin());
                        
                        CurrentSeason.seasonData.setSeasonActiveLigaOrigin(false);
                        CurrentSeason.seasonData.setSeasonCalendarLigaOrigin(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaOrigin(new Array());
                        console.log(`Die Season in Liga Origin wurde beendet`);
                    }
                    
                }  , 190000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga Origin`)
        }
    }  
}