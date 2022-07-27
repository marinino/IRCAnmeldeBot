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
            content:`Der Kalender wurde erfolgreich geändert!`,
            embeds: [calendarEmbed]
        })
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('insertcalendar2')
        .setDescription('Fügt ein Event der Saison hinzu')
        .addStringOption(option => 
            option.setName('trackinsert')
                .setDescription('Das Event welches eingefügt werden soll')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('trackreference')
                .setDescription('Nach dem diesem Event wird das Event eingefügt, wenn es an den Anfang soll 0 eintragen')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        const eventNew = interaction.options.getString('trackinsert')
        const eventRef = interaction.options.getString('trackreference')

        let listTemp = CurrentSeason.seasonData.getSeasonCalendarLiga2();

        if(eventRef != 0 && !(listTemp.includes(eventRef))){
            interaction.reply('Falscher Wert als Referenz');
            return;
        }

        let indexToInsert = null;
        if(eventRef == 0){
            indexToInsert = -1;
        }else{
            indexToInsert = listTemp.indexOf(eventRef);
        }
        
        listTemp.splice(indexToInsert + 1, 0, eventNew);
        listTemp.join();

        CurrentSeason.seasonData.setSeasonCalendarLiga2(listTemp);
        printCalendar(interaction);
    }  
}