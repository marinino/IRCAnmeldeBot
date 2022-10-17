const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa2.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartliga_sa2')
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
            console.log(`Der startseasonligaSA2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Dino, Hoerke
        CurrentSeason.seasonData.setMercedesDriversLigaSA2(['527496491414192128', '339415812165074945']);
        // KDMNot34, Luca_YP
        CurrentSeason.seasonData.setRedBullDriversLigaSA2(['439861415633879040', '641015329429913633']);
        // Alone_Finn, MORE RGB = MORE FPS
        CurrentSeason.seasonData.setFerrariDriversLigaSA2(['694689316093558925', '693165800642576456']);
        // Scheber, Delacium
        CurrentSeason.seasonData.setMcLarenDriversLigaSA2(['822055711365136394', '689532105029713943']);
        // Tomato Hacker, Peekme
        CurrentSeason.seasonData.setAstonMartinDriversLigaSA2(['792152769431339008', '549248953011666944']);
        // Tim White, Danny Phantom
        CurrentSeason.seasonData.setAlpineDriversLigaSA2(['653676539174453258', '873747625067827200']);
        // faxbxo, Dr_joHo
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSA2(['480222830466695180', '496948780323831808']);
        // John, Mangoe
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSA2(['396155559344078849', '511933778806177813']);
        // Betschart04, DaaTom
        CurrentSeason.seasonData.setWilliamsDriversLigaSA2(['813047134688772116', '232563772626173952']);
        // Quinkway, The Wolf
        CurrentSeason.seasonData.setHaasDriversLigaSA2(['544005185526300672', '394987394719547442']);

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
                if(CurrentSeason.seasonData.getSeasonCalendarLigaSA2().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLigaSA2(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 432300000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaSA2(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaSA2().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaSA2() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 432300000);
                            CurrentSeason.seasonData.getSeasonCalendarLigaSA2().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaSA2().forEach(element => (console.log(element)))
                        }else{
                            var date = new Date().toLocaleString()
                            console.log(`Der Ligabetrieb in Liga SA 2 ist Pausiert oder zu Ende -- ${date}`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLigaSA2());
                        
                        CurrentSeason.seasonData.setSeasonActiveLigaSA2(false);
                        CurrentSeason.seasonData.setSeasonCalendarLigaSA2(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaSA2(new Array());
                        console.log(`Die Season in Liga SA 2 wurde beendet`);
                    }
                    
                }  , 604800000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga SA 2`)
        }
    }  
}