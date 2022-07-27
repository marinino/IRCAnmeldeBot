const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const CurrentSeason = require('./startseasonliga2.js')

async function printCalendar(interaction){

    // Output for races in the future
    var stringFutureRaces = ''
    if(CurrentSeason.seasonData.getSeasonCalendarLiga2().length == 0){
        stringFutureRaces = `Es sind keine \n Rennen mehr geplant`
    }else{
        CurrentSeason.seasonData.getSeasonCalendarLiga2().forEach((element) => {
        console.log(element)
        stringFutureRaces = stringFutureRaces.concat(`${element}\n`)
        })
    }
    
    // Output of current race
    var stringCurrentRace = ''
    if(CurrentSeason.seasonData.getCurrentRaceLocationLiga2() == null){
        stringCurrentRace = `Aktuell läuft \n kein Event`
    }else{
        stringCurrentRace = CurrentSeason.seasonData.getCurrentRaceLocationLiga2()
    }
    
    // Outputs past races
    var stringPastRaces = ''
    if(CurrentSeason.seasonData.getSeasonCalendarRacesDoneLiga2().length == 0){
        stringPastRaces = `Bisher wurde noch kein \n Event abgeschlossen`
    }else{
        CurrentSeason.seasonData.getSeasonCalendarRacesDoneLiga2().forEach((element) => {
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
            content:`Das ist der aktuelle Kalendar!`,
            embeds: [calendarEmbed]
        })
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('printcalendar2')
        .setDescription('Gibt Kalender aus!'),
        
    async execute(client, interaction, command){
        printCalendar(interaction);
    }  
}