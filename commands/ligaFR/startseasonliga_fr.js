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

    async execute(client, interaction, command){

        

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

        

       
        var tempLeagueIDsWithSameName = new Array()
        var calendarSortedByDate = new Array()
     
        var stringFutureRaces = ''        
        
        await client.connectToLeagueDB().then(async function(res){
            console.log(`Connection to league DB established -- ${new Date().toLocaleString()}`)
    
            await client.getLeagues().then(async function(res){
                console.log(`Query getLeagues in Bot database was successful -- ${new Date().toLocaleString()}`)

                res.forEach(entry => {
                    if(entry.name == 'Sonntag 1'){
                        tempLeagueIDsWithSameName.push(entry.league_id);
                    }
                })

                await client.deleteDuplicateLeagues(tempLeagueIDsWithSameName).then(async function(res){
                    console.log(`Query deleteLeagues in Bot database was successful -- ${new Date().toLocaleString()}`)

                    await client.insertNewLeague(leagueID).then(async function(res){
                        console.log(`Query insertLeague in Bot database was successful -- ${new Date().toLocaleString()}`)

                        await client.getRaces(leagueID).then(async function(res) {
                            console.log(`Query getRaces in league database was successful -- ${new Date().toLocaleString()}`)
            
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

                            await client.getNamesOfRaces(calendarSortedByDate).then(async function(res){
                                console.log(`Query getNames in league database was successful -- ${new Date().toLocaleString()}`)

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
        })
    }
}