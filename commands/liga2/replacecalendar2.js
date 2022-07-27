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
        .setName('replacecalendar2')
        .setDescription('Ändert ein Rennen, welches existiert')
        .addStringOption(option => 
            option.setName('trackin')
                .setDescription('Das Event welches eingesetzt werden soll')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('trackout')
                .setDescription('Das Event welches gelöscht werden soll')
                .setRequired(true)),
       
    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied');
            return;
        }else{
            console.log('all good');
        }

        const eventIn = interaction.options.getString('trackin');
        const eventOut = interaction.options.getString('trackout');

        let listTemp = CurrentSeason.seasonData.getSeasonCalendarLiga2();

        if(!(listTemp.includes(eventOut))){
            interaction.reply(`Ist nicht drin`);
            return;
        }
        
        indexToInsert = listTemp.indexOf(eventOut);  
        
        listTemp[indexToInsert] = eventIn;

        CurrentSeason.seasonData.setSeasonCalendarLiga2(listTemp);
        printCalendar(interaction);
    }  
}