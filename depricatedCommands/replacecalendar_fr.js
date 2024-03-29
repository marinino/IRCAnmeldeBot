const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');

async function printCalendar(interaction){

    // Output for races in the future
    var stringFutureRaces = ''
    if(CurrentSeason.seasonData.getSeasonCalendarLigaFR().length == 0){
        stringFutureRaces = `Es sind keine \n Rennen mehr geplant`
    }else{
        CurrentSeason.seasonData.getSeasonCalendarLigaFR().forEach((element) => {
        console.log(element)
        stringFutureRaces = stringFutureRaces.concat(`${element}\n`)
        })
    }
    
    // Output of current race
    var stringCurrentRace = ''
    if(CurrentSeason.seasonData.getCurrentRaceLocationLigaFR() == null){
        stringCurrentRace = `Aktuell läuft \n kein Event`
    }else{
        stringCurrentRace = CurrentSeason.seasonData.getCurrentRaceLocationLigaFR()
    }
    
    // Outputs past races
    var stringPastRaces = ''
    if(CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaFR().length == 0){
        stringPastRaces = `Bisher wurde noch kein \n Event abgeschlossen`
    }else{
        CurrentSeason.seasonData.getSeasonCalendarRacesDoneLigaFR().forEach((element) => {
        stringPastRaces = stringPastRaces.concat(`${element}\n`)
        })
    }
    
    if(stringCurrentRace == '' || stringFutureRaces == '' || stringPastRaces == ''){
        message.reply('Versuche den Command später nochmal')
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
            content:`Der Kalender wurde erfolgreich geändert!`,
            embeds: [calendarEmbed]
        })
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replacecalendar_fr')
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

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der replacecalendarFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const eventIn = interaction.options.getString('trackin');
        const eventOut = interaction.options.getString('trackout');

        let listTemp = CurrentSeason.seasonData.getSeasonCalendarLigaFR();

        if(!(listTemp.includes(eventOut))){
            interaction.reply(`Ist nicht drin`);
            return;
        }
        
        indexToInsert = listTemp.indexOf(eventOut);  
        
        listTemp[indexToInsert] = eventIn;

        CurrentSeason.seasonData.setSeasonCalendarLigaFR(listTemp);
        printCalendar(interaction);
    }  
}