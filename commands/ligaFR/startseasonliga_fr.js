const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js');
const cron = require('node-cron');

var racesPlanned = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startseasonliga_fr')
        .setDescription('Starts season and sets calendar')
        .addNumberOption(option => 
            option.setName('id')
                .setDescription('ID der Liga in der Datenbank')
                .setRequired(true)),

    async execute(client, interaction, command){

        

        if(!interaction.member.roles.cache.has(client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            //console.log('ack')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der startseason_fr Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Gets parameter
        const leagueID = interaction.options.getNumber('id')

        var tempLeagueIDsWithSameName = new Array()
        var calendarSortedByDate = new Array()
     
        var stringFutureRaces = ''        
        
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
                                    currentMin = new Date(event.datum);
                                    currentMinEvent = event;
                                }
                            })
                            
                            res.splice(res.indexOf(currentMinEvent), 1);
                            console.log(currentMinEvent.datum)
                            if(currentMinEvent.datum > new Date()){
                                calendarSortedByDate.push(currentMinEvent);
                            }
                            
                        } 

                        await client.getNamesOfRaces(calendarSortedByDate).then(async function(res){
                            console.log(`Query getNames in league database was successful -- ${new Date().toLocaleString()}`)

                            racesPlanned = res;

                            res.forEach((value, key) => {
                                console.log(key.grandprixname + " " + value)
                                stringFutureRaces = stringFutureRaces.concat(`${key.grandprixname} am ${new Date(value).toLocaleString()}\n`)
                    
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
    

        try{
            cron.schedule(`57 18 * * 6`, async () => {

                if(racesPlanned.size > 0){
                    var [nextRaceKey] = racesPlanned.keys()
                    console.log(nextRaceKey)

                    var nextRaceDate = new Date(racesPlanned.get(nextRaceKey))
                    console.log(nextRaceDate)

                    // 604800000 is one week in ms
                    if(nextRaceDate - new Date() < 604800000){
                        
                        
                    
                        await client.startFunction(client, interaction, nextRaceDate, nextRaceKey.grandprixname);
                        console.log('RACEEEEEEEEEEEEEEEEEEEEE')
                    } else {
                        console.log(`Checked for planned races but none found in the next week. -- ${new Date().toLocaleString()}`)
                    }

                } else {
                    console.log(`Checked for planned races, none where found. -- ${new Date().toLocaleString()}`)
                }
                
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden in Liga FR`)
        }
    }
}