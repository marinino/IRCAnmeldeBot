const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_fr.js')
const cron = require('node-cron');
const mysql = require('mysql')

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

        /*
        // Adman, Chris
        CurrentSeason.seasonData.setMercedesDriversLigaFR(['269499201702854667', '469926134700703748']);
        // lyrex, Broncos
        CurrentSeason.seasonData.setRedBullDriversLigaFR(['216889083463598080', '604645537882308609']);
        // Felixx, Dome nur Besser
        CurrentSeason.seasonData.setFerrariDriversLigaFR(['nicht besetzt', 'nicht besetzt']);
        // Spacelord, Mandalon
        CurrentSeason.seasonData.setMcLarenDriversLigaFR(['nicht besetzt', 'nicht besetzt']);
        // Vollkorn, UhuUnheil
        CurrentSeason.seasonData.setAstonMartinDriversLigaFR(['319115003032502282', 'nicht besetzt']);
        // avestro, Pacman
        CurrentSeason.seasonData.setAlpineDriversLigaFR(['nicht besetzt', 'nicht besetzt']);
        // Entsafter, Yarbay
        CurrentSeason.seasonData.setAlphaTauriDriversLigaFR(['nicht besetzt', 'nicht besetzt']);
        // Andre, Felichs
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaFR(['nicht besetzt', 'nicht besetzt']);
        // Jojo, Pascalus
        CurrentSeason.seasonData.setWilliamsDriversLigaFR(['nicht besetzt', 'nicht besetzt']);
        // Senfy, Schorli
        CurrentSeason.seasonData.setHaasDriversLigaFR(['nicht besetzt', 'nicht besetzt']);
        */


        var leagueID = -1;
        var mercedesDrivers = new Array();

       
        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Mercedes').then(async function(res){
                console.log(`Query for Team Mercedes ID was successful -- ${new Date().toLocaleString()}`)
                var mercedesTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, 'Mercedes').then(async function(res){
                    console.log(`Query for drivers from team Mercedes was successful -- ${new Date().toLocaleString()}`)

                    var mercDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            mercDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                mercDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var mercDriversDcID = new Array()

                    await client.getDiscordIDs(mercDriversPersID, mercDriversDcID).then(function(res){
                        console.log(`Query for drivers Discord IDs from team Mercedes was successful -- ${new Date().toLocaleString()}`)
                        res.forEach(driver => {
                            console.log(driver)
                        })
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })
       

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
                    CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 60000);
                }
                let startLoop = setInterval(async function(){
                    CurrentSeason.seasonData.setStartLoopLigaFR(startLoop);
                    if(CurrentSeason.seasonData.getSeasonCalendarLigaFR().length > 0){
                        if(CurrentSeason.seasonData.getSeasonActiveLigaFR() == true){
                            CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, 60000);
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
                    
                }  , 80000)
                console.log(startLoop)
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga FR`)
        }
    }  
}