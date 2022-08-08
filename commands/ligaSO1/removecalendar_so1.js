const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const CurrentSeason = require('./startseasonliga_so1.js')

async function printCalendar(interaction){

    // Output for races in the future
    var stringFutureRaces = ''
    if(CurrentSeason.seasonData.getSeasonCalendarLigaSO1().length == 0){
        stringFutureRaces = `Es sind keine \n Rennen mehr geplant`
    }else{
        CurrentSeason.seasonData.getSeasonCalendarLigaSO1().forEach((element) => {
        console.log(element)
        stringFutureRaces = stringFutureRaces.concat(`${element}\n`)
        })
    }
    
    // Output of current race
    var stringCurrentRace = ''
    if(CurrentSeason.seasonData.getCurrentRaceLocationLigaSO1() == null){
        stringCurrentRace = `Aktuell läuft \n kein Event`
    }else{
        stringCurrentRace = CurrentSeason.seasonData.getCurrentRaceLocationLigaSO1()
    }
    
    // Outputs past races
    var stringPastRaces = ''
    if(CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaSO1().length == 0){
        stringPastRaces = `Bisher wurde noch kein \n Event abgeschlossen`
    }else{
        CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaSO1().forEach((element) => {
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
            content:`Der Kalender wurde erfolgreich geändert!`,
            embeds: [calendarEmbed]
        })
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removecalendar_so1')
        .setDescription('Fügt ein Event der Saison hinzu')
        .addStringOption(option => 
            option.setName('trackremove')
                .setDescription('Das Event welches gelöscht werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der removefromcalendarSO1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const eventRemove = interaction.options.getString('trackremove')

        let listTemp = CurrentSeason.seasonData.getSeasonCalendarLigaSO1();

        if(!(listTemp.includes(eventRemove))){
            interaction.reply('Nicht drin im Kalender');
            return;
        }
        
        indexToInsert = listTemp.indexOf(eventRemove);  
        
        listTemp.splice(indexToInsert, 1);

        CurrentSeason.seasonData.setSeasonCalendarLigaSO1(listTemp);
        printCalendar(interaction);
    }  
}