const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js');
const SeasonData = require('../../dataClasses/VariablenDaten.js');
const MethodStorage = require('../../dataClasses/MethodenDaten.js');

var seasonData = new SeasonData();
var methodStorage = new MethodStorage()

async function printCalendar(interaction){

    // Output for races in the future
    var stringFutureRaces = ''
    if(seasonData.getSeasonCalendarLigaOrigin().length == 0){
        stringFutureRaces = `Es sind keine \n Rennen mehr geplant`
    }else{
        seasonData.getSeasonCalendarLigaOrigin().forEach((element) => {
        console.log(element)
        stringFutureRaces = stringFutureRaces.concat(`${element}\n`)
        })
    }
    
    // Output of current race
    var stringCurrentRace = ''
    if(seasonData.getCurrentRaceLocationLigaOrigin() == null){
        stringCurrentRace = `Aktuell läuft \n kein Event`
    }else{
        stringCurrentRace = seasonData.getCurrentRaceLocationLigaOrigin()
    }
    
    // Outputs past races
    var stringPastRaces = ''
    if(seasonData.getSeasonCalendarRacesDoneLigaOrigin().length == 0){
        stringPastRaces = `Bisher wurde noch kein \n Event abgeschlossen`
    }else{
        seasonData.getSeasonCalendarRacesDoneLigaOrigin().forEach((element) => {
        stringPastRaces = stringPastRaces.concat(`${element}\n`)
        })
    }
    
    if(stringCurrentRace == '' || stringFutureRaces == '' || stringPastRaces == ''){
        message.reply('Versuche den Command später nochmal')
    }else{
        const calendarEmbed = new MessageEmbed()
        .setColor('#b1fe8c')
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
        .setName('startseasonligaOrigin')
        .setDescription('Starts season and sets calendar')
        .addStringOption(option => 
            option.setName('calendar')
                .setDescription('Kalender hier angeben, Leerzeichen zwischen Flaggen')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der startseasonFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Sets typ of League
        seasonData.setLigatitel('Liga Origin')

        // Gets parameter
        const calendarAsString = interaction.options.getString('calendar')

        // Sets calendar for given season object
        var calendarAsArray = calendarAsString.split(' ')
        if(calendarAsArray.length == 0){
            interaction.reply('Kalender leer');
            return
        }
        seasonData.setSeasonCalendarLigaOrigin(calendarAsArray)

        printCalendar(interaction);
        
    }
}