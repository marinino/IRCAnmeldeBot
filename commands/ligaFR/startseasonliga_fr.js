const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js');
const SeasonData = require('../../dataClasses/VariablenDaten.js');
const MethodStorage = require('../../dataClasses/MethodenDaten.js');
const mysql = require('mysql')

var seasonData = new SeasonData();
var methodStorage = new MethodStorage()

/*
async function printCalendar(interaction){

    // Output for races in the future
    var stringFutureRaces = ''
    if(seasonData.getSeasonCalendarLigaFR().length == 0){
        stringFutureRaces = `Es sind keine \n Rennen mehr geplant`
    }else{
        seasonData.getSeasonCalendarLigaFR().forEach((element) => {
        console.log(element)
        stringFutureRaces = stringFutureRaces.concat(`${element}\n`)
        })
    }
    
    // Output of current race
    var stringCurrentRace = ''
    if(seasonData.getCurrentRaceLocationLigaFR() == null){
        stringCurrentRace = `Aktuell läuft \n kein Event`
    }else{
        stringCurrentRace = seasonData.getCurrentRaceLocationLigaFR()
    }
    
    // Outputs past races
    var stringPastRaces = ''
    if(seasonData.getSeasonCalendarRacesDoneLigaFR().length == 0){
        stringPastRaces = `Bisher wurde noch kein \n Event abgeschlossen`
    }else{
        seasonData.getSeasonCalendarRacesDoneLigaFR().forEach((element) => {
            stringPastRaces = stringPastRaces.concat(`${element}\n`)
        })
    }
    
    if(stringCurrentRace == '' || stringFutureRaces == '' || stringPastRaces == ''){
        message.reply('Versuche den Command später nochmal')
        console.log('ack')
    }else{
        const calendarEmbed = new EmbedBuilder()
        .setColor('#6d6dfc')
        .setTitle(`Kalender`)
        .addFields(
            {name: 'Zukünftige Rennen', value: `${stringFutureRaces}`, inline: true},
            {name: 'Aktuelles Rennen', value: `${stringCurrentRace}`, inline: true},
            {name: 'Gefahrene Rennen', value: `${stringPastRaces}`, inline: true}
        )
        interaction.reply({
            content:`Die Season wurde erfolgreich gestartet!`,
            embeds: [calendarEmbed]
        })
        console.log('ack')
    }

}
*/

module.exports = {
    seasonData,
    methodStorage,
    data: new SlashCommandBuilder()
        .setName('startseasonliga_fr')
        .setDescription('Starts season and sets calendar')
        .addNumberOption(option => 
            option.setName('id')
                .setDescription('ID der Liga in der Datenbank')
                .setRequired(true)),

    async execute(client, interaction, command, connection){

        

        if(!interaction.member.roles.cache.has(seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            //console.log('ack')
            return;
        }else{
            var date = new Date().toLocaleString()
            //console.log(`Der startseason_fr Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Gets parameter
        const leagueID = interaction.options.getNumber('id')

        const connectionAdman = mysql.createConnection({
                host     : 'localhost',
                port     : '3306',
                user     : 'root',
                password : 'root',
                database : 'adman_dummy_daten'
            });

       
        var tempLeagueIDsWithSameName = new Array()
        var calendarSortedByDate = new Array()
     
        var stringFutureRaces = ''

        connectionAdman.connect(async error => {
             if(error){
              //console.log(error)
            } else {
              // Sets typ of League
                await connection.query(`SELECT * FROM league_ids`, function(err, res, fields) {
                    if(err){
                        //console.log(err)
                    } else {
                        res.forEach(entry => {
                            if(entry.name == 'Sonntag 1'){
                                tempLeagueIDsWithSameName.push(entry.league_id);
                            
                                tempLeagueIDsWithSameName.forEach(async id => {
                                  
                                    await connection.query(`DELETE FROM league_ids WHERE league_id = ${id}`, async function(err, res, fields){
                                        if(err){
                                            //console.log(err)
                                        } else {
                                            //console.log(res)

                                            await connection.query(`INSERT INTO league_ids (league_id, name) VALUES (${leagueID}, 'Sonntag 1')`, function(err, res, fields){
                                                if(err){
                                                    //console.log(err)
                                                } else {
                                                    //console.log(res)
                                                }
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
        
        let p1 =  new Promise(function(resolve, reject) {
            connectionAdman.query(`SELECT * FROM rennen WHERE lid = ${leagueID}`, function(err, res, fields){
                console.log(`Query done`)
                if(err){
                    console.log(`Query error`)
                    reject(err);
                } else {
                    console.log(`Query success`)
                    resolve(res);
                    console.log(`Query after`)
                }
            });
        });

        p1.then(function(res) {
            console.log(`---------------------------------------------------------------------------------`)

            console.log(res)

            while(res.length > 0){
                var currentMin = new Date(res[0].datum).getTime();
                var currentMinEvent = res[0];
                res.forEach(event => {
                    if(new Date(event.datum).getTime() < currentMin){
                     
                        currentMin = event.date;
                        currentMinEvent = event;
                    }
                })
                
                res.splice(res.indexOf(currentMinEvent), 1);
                calendarSortedByDate.push(currentMinEvent);
            } 
            
            calendarSortedByDate.forEach(async element => {
            })
        },function(err) {
         
        })
        
        
        

        queryPromise2 = () => {
            return new Promise((reject, resolve) => {
                calendarSortedByDate.forEach(async element => {
                    connectionAdman.query(`SELECT * FROM austragungsort WHERE ausid = ${element.ausid}`, async function(err, res){
                        if(err){
                            return err
                        } else {
                            return res;
                        }
                    })
                })
            })
        }

        
          
       
        
       

        

        var resultAus = await queryPromise2();

        resultAus.forEach(element => {
            stringFutureRaces = stringFutureRaces.concat(`${element[0].grandprixname}\n`)

        })
        
        var embedNextRaces = new EmbedBuilder()
            .setColor('#6d6dfc')
            .setDescription('Zuküftige Rennen in dieser Saison')
            .addFields( {name: 'Namen', value: `${stringFutureRaces}`} )

        await interaction.reply({embeds: [embedNextRaces]})
        

           
        /*
        // Sets calendar for given season object
        var calendarAsArray = calendarAsString.split(' ')
        if(calendarAsArray.length == 0){
            interaction.reply('Kalender leer');
            return
        }
        seasonData.setSeasonCalendarLigaFR(calendarAsArray)

        //printCalendar(interaction);
        */
        
    }
}