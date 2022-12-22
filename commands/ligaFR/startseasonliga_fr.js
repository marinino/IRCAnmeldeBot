const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js');
const SeasonData = require('../../dataClasses/VariablenDaten.js');
const MethodStorage = require('../../dataClasses/MethodenDaten.js');
const mysql = require('mysql')

var seasonData = new SeasonData();
var methodStorage = new MethodStorage()


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

        var promConnect = new Promise(function(resolve, reject) {
            connectionAdman.connect(async error => {
                if(error){
                  reject(error)
                } else {
                  resolve(`Connection established`)
                }
            })
        })
        
        
        
        
        
        

        

        

       
    

        await promConnect.then(async function(res){
            console.log(res)

            setTimeout(function(){
                console.log('test')
            }, 5000);

            var promGetLeagues = new Promise(function(resolve, reject){
                connection.query(`SELECT * FROM league_ids`, function(err, res, fields) {
                    if(err){
                        console.log(`Query getLeagues failed`)
                        reject(err)
                    } else {
                        console.log(`Query getLeagues succeeded`)
                        resolve(res);
                    }
                })
            })
    
            await promGetLeagues.then(async function(res){
                res.forEach(entry => {
                    if(entry.name == 'Sonntag 1'){
                        tempLeagueIDsWithSameName.push(entry.league_id);
                    }
                })

                var promDeleteLeagues = new Promise(function(resolve, reject){
                    tempLeagueIDsWithSameName.forEach(async id => {
                        connection.query(`DELETE FROM league_ids WHERE league_id = ${id}`, async function(err, res, fields){
                            if(err){
                                console.log(`Query deleteLeagues failed`)
                                reject(err)
                            } else {
                                console.log(`Query deleteLeagues succeeded`)
                                resolve(res);
                            }
                        })
                    })
                })

                await promDeleteLeagues.then(async function(res){
                    console.log(res)

                    var promInsertNewLeague = new Promise(function(resolve, reject){
                        connection.query(`INSERT INTO league_ids (league_id, name) VALUES (${leagueID}, 'Sonntag 1')`, function(err, res, fields){
                            if(err){
                                console.log(`Query insertLeague failed`)
                                reject(err)
                            } else {
                                console.log(`Query insertLeague succeeded`)
                                resolve(res)
                            }
                        })
                    })

                    await promInsertNewLeague.then(async function(res){
                        console.log(res)

                        var promGetRaces =  new Promise(function(resolve, reject) {
                            connectionAdman.query(`SELECT * FROM rennen WHERE lid = ${leagueID}`, function(err, res, fields){
                                if(err){
                                    console.log(`Query rennen failed`)
                                    reject(err);
                                } else {
                                    console.log(`Query rennen succeeded`)
                                    resolve(res);
                                }
                            });
                        });

                        await promGetRaces.then(async function(res) {
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

                            

                            var promGetNamesOfRaces = new Promise(function (resolve, reject){
                                var racesNames = new Array()
                                calendarSortedByDate.forEach(async element => {
                                    connectionAdman.query(`SELECT * FROM austragungsort WHERE ausid = ${element.ausid}`, async function(err, res){
                                        if(err){
                                            reject(err)
                                        } else {
                                            console.log(res)
                                            racesNames.push(res)
                                        }
                                    })
                                })

                                setTimeout(function(){
                                    console.log('SEARCHING FOR NAMES')
                                    resolve(racesNames);
                                    console.log(racesNames)
                                }, 2000);

                                
                            })

                            await promGetNamesOfRaces.then(async function(res){

                                //console.log(res)

                                res.forEach(element => {
                                    //console.log(element)
                                    stringFutureRaces = stringFutureRaces.concat(`${element[0].grandprixname}\n`)
                        
                                })
                                
                                const embedNextRaces = new EmbedBuilder()
                                    .setColor('#6d6dfc')
                                    .setDescription('Zuküftige Rennen in dieser Saison')
                                    .addFields( {name: 'Namen', value: `${stringFutureRaces}`} )
                        
                                await interaction.reply({embeds: [embedNextRaces]})
                            }, function(err){
                                console.log(err)
                            })
                        },function(err) {
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
        }, function(err){
            console.log(err)
        }).then(async () => {
            
        }) 
        
    }
}