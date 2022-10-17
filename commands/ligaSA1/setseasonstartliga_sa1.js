const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_sa1.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartliga_sa1')
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
            console.log(`Der startseasonligaSA1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // EinOrepo, Settle
        CurrentSeason.seasonData.setMercedesDriversLigaSA1(['485144937160114188', '662671755542003732']);
        // Tim21, Brightgamer
        CurrentSeason.seasonData.setRedBullDriversLigaSA1(['701141425835999232', '706792145654120468']);
        // Rocky, Helim
        CurrentSeason.seasonData.setFerrariDriversLigaSA1(['176331806839275520', '404664138103652362']);
        // DavidXUX, DelBoss
        CurrentSeason.seasonData.setMcLarenDriversLigaSA1(['386929779208880150', '438403655306313728']);
        // Trade.VSG, ScepticHamster
        CurrentSeason.seasonData.setAstonMartinDriversLigaSA1(['399565281657225226', '170629700719214592']);
        // Demiyoo, hairylegs
        CurrentSeason.seasonData.setAlpineDriversLigaSA1(['356721136467443722', '605199089793236996']);
        // ghostvali, PhantaFlash
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSA1(['259366764121423872', '709479846358810704']);
        // Cvbby, smittyy
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSA1(['259366764121423872', '154609243033436160']);
        // Wunschloser, Lulu
        CurrentSeason.seasonData.setWilliamsDriversLigaSA1(['495992539829108746', '648519863467507712']);
        // VettelFan, josia
        CurrentSeason.seasonData.setHaasDriversLigaSA1(['328902952486174722', '469239617590132737']);

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
                if(CurrentSeason.seasonData.getSeasonCalendarLigaSA1().length > 0){
                    CurrentSeason.seasonData.setSeasonActiveLigaSA1(true);
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 426600000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaSA1(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaSA1().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaSA1() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 426600000);
                            CurrentSeason.seasonData.getSeasonCalendarLigaSA1().forEach(element => (console.log(element)))
                            CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaSA1().forEach(element => (console.log(element)))
                        }else{
                            var date = new Date().toLocaleString()
                            console.log(`Der Ligabetrieb in Liga SA 1 ist Pausiert oder zu Ende -- ${date}`)
                        }
                    
                    }else{
                        clearInterval(CurrentSeason.seasonData.getStartLoopLigaSA1());
                        
                        CurrentSeason.seasonData.setSeasonActiveLigaSA1(false);
                        CurrentSeason.seasonData.setSeasonCalendarLigaSA1(new Array());
                        CurrentSeason.seasonData.setSeasonCalendarRacesDoneLigaSA1(new Array());
                        console.log(`Die Season in Liga SA 1 wurde beendet`);
                    }
                    
                }  , 604800000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga SA 1`)
        }
    }  
}