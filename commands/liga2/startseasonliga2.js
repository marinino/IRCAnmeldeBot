const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js');
const SeasonData = require('../../dataClasses/VariablenDaten.js');
const MethodStorage = require('../../dataClasses/MethodenDaten.js');

var seasonData = new SeasonData();
var methodStorage = new MethodStorage()

async function printCalendar(interaction){

    // Output for races in the future
    var stringFutureRaces = ''
    if(seasonData.getSeasonCalendarLiga2().length == 0){
        stringFutureRaces = `Es sind keine \n Rennen mehr geplant`
    }else{
        seasonData.getSeasonCalendarLiga2().forEach((element) => {
        console.log(element)
        stringFutureRaces = stringFutureRaces.concat(`${element}\n`)
        })
    }
    
    // Output of current race
    var stringCurrentRace = ''
    if(seasonData.getCurrentRaceLocationLiga2() == null){
        stringCurrentRace = `Aktuell läuft \n kein Event`
    }else{
        stringCurrentRace = seasonData.getCurrentRaceLocationLiga2()
    }
    
    // Outputs past races
    var stringPastRaces = ''
    if(seasonData.getSeasonCalendarRacesDoneLiga2().length == 0){
        stringPastRaces = `Bisher wurde noch kein \n Event abgeschlossen`
    }else{
        seasonData.getSeasonCalendarRacesDoneLiga2().forEach((element) => {
        stringPastRaces = stringPastRaces.concat(`${element}\n`)
        })
    }
    
    if(stringCurrentRace == '' || stringFutureRaces == '' || stringPastRaces == ''){
        message.reply('Versuche den Command später nochmal')
    }else{
        const calendarEmbed = new MessageEmbed()
        .setColor('YELLOW')
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
    }

}

module.exports = {
    seasonData,
    methodStorage,
    data: new SlashCommandBuilder()
        .setName('startseasonliga2')
        .setDescription('Starts season and sets calendar')
        .addStringOption(option => 
            option.setName('calendar')
                .setDescription('Kalender hier angeben, Leerzeichen zwischen Flaggen')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        // Sets typ of League
        seasonData.setLigatitel('Liga 2')

        // Gets parameter
        const calendarAsString = interaction.options.getString('calendar')

        // Sets calendar for given season object
        var calendarAsArray = calendarAsString.split(' ')
        if(calendarAsArray.length == 0){
            interaction.reply('Kalender leer');
            return
        }
        seasonData.setSeasonCalendarLiga2(calendarAsArray)

        // test to give all race in console
        var calendarTest = seasonData.getSeasonCalendarLiga2()
        calendarTest.forEach(element => {
            console.log(element)
        });

        printCalendar(interaction);
        
    }
}