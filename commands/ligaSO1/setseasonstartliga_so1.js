const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_so1.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setseasonstartliga_so1')
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

                // Zani, xDarknight
                CurrentSeason.seasonData.setMercedesDriversLigaSO1(['751461016583274516', '756083277512835082']);
                // Nyrox, Sweazy
                CurrentSeason.seasonData.setRedBullDriversLigaSO1(['336885878029025280', '307481682272059394']);
                // k.k, Playhak
                CurrentSeason.seasonData.setFerrariDriversLigaSO1(['688006080109740070', '299534780595175424']);
                // Eriksen, SHDGames
                CurrentSeason.seasonData.setMcLarenDriversLigaSO1(['263760051515293696', '284981237645312000']);
                // Achimedes, Korky
                CurrentSeason.seasonData.setAstonMartinDriversLigaSO1(['336841703816429570', '380076906172645390']);
                // Sven, Die_K4ante
                CurrentSeason.seasonData.setAlpineDriversLigaSO1(['427116609128103947', '315803566591967243']);
                // Finn, lyrex
                CurrentSeason.seasonData.setAlphaTauriDriversLigaSO1(['272073232893345792', '216889083463598080']);
                // Sören_1206, Shining
                CurrentSeason.seasonData.setAlfaRomeoDriversLigaSO1(['264706413715128322', '312983203147153418']);
                // MRVN, Kibu
                CurrentSeason.seasonData.setWilliamsDriversLigaSO1(['495721676848496640', '173416598101688320']);
                // Vollkorn, Melody
                CurrentSeason.seasonData.setHaasDriversLigaSO1(['319115003032502282', '413367477548875777']);

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
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 515700000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaSO1(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaSO1().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaSO1() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 515700000);
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
                    
                }  , 604800000)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga SO 1`)
        }
    }  
}