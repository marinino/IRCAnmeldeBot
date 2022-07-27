const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga2')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startonce2')
        .setDescription('Startet ein Rennen und keine ganze Saison.')
        .addStringOption(option => 
            option.setName('location')
                .setDescription('Ort wo gefahren wird')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('timestart')
                .setDescription('Wann soll die Anmeldung geöffnet werden. Bitte in Format angeben Datum TT.MM HH:MM:SS')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('timeend')
                .setDescription('Wann soll die Anmeldung geschlossen werden. Bitte in Format angeben Datum TT.MM HH:MM:SS')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        // Adman, Chris
        CurrentSeason.seasonData.setMercedesDriversLiga2(['269499201702854667', '469926134700703748']);
        // SHD, Brückenwasser
        CurrentSeason.seasonData.setRedBullDriversLiga2(['284981237645312000', '281829417775267840']);
        //
        CurrentSeason.seasonData.setFerrariDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setMcLarenDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAstonMartinDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlpineDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlphaTauriDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setAlfaRomeoDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setWilliamsDriversLiga2(['nicht besetzt', 'nicht besetzt']);
        CurrentSeason.seasonData.setHaasDriversLiga2(['nicht besetzt', 'nicht besetzt']);

        const location = interaction.options.getString('location');
        const startTime = interaction.options.getString('timestart');
        const endTime = interaction.options.getString('timeend')

        let seasonStartDayofMonthStart = startTime.slice(0,2)
        let seasonStartMonthStart = startTime.slice(3,6)
        let seasonStartHourOfDayStart = startTime.slice(6,8)
        let seasonStartMinutesOfDayStart = startTime.slice(9,11)
        let seasonStartSecondsOfDayStart = startTime.slice(12,14)

        let seasonStartDayofMonthEnd = endTime.slice(0,2)
        let seasonStartMonthEnd = endTime.slice(3,6)
        let seasonStartHourOfDayEnd = endTime.slice(6,8)
        let seasonStartMinutesOfDayEnd = endTime.slice(9,11)
        let seasonStartSecondsOfDayEnd = endTime.slice(12,14)

        interaction.reply(`Die Anmeldung zum Rennen in ${location} wird am ${seasonStartDayofMonthStart}.${seasonStartMonthStart} um ` + 
                            `${seasonStartHourOfDayStart}:${seasonStartMinutesOfDayStart}:${seasonStartSecondsOfDayStart} geöffnet und am ` + 
                            `${seasonStartDayofMonthEnd}.${seasonStartMonthEnd} um ${seasonStartHourOfDayEnd}:${seasonStartMinutesOfDayEnd}:${seasonStartSecondsOfDayEnd}` + 
                            `geschlossen`)

        CurrentSeason.seasonData.setLigatitel('Liga 2')
        CurrentSeason.seasonData.setSeasonCalendarLiga2([location]);  

        let startDate = new Date(new Date().getFullYear(), seasonStartMonthStart - 1, seasonStartDayofMonthStart, seasonStartHourOfDayStart, 
                                seasonStartMinutesOfDayStart, seasonStartSecondsOfDayStart);
        let endDate = new Date(new Date().getFullYear(), seasonStartMonthEnd - 1, seasonStartDayofMonthEnd, seasonStartHourOfDayEnd, 
                                seasonStartMinutesOfDayEnd, seasonStartSecondsOfDayEnd);
        console.log(endDate - startDate)
        
        try{
            cron.schedule(`${seasonStartSecondsOfDayStart} ${seasonStartMinutesOfDayStart} ${seasonStartHourOfDayStart} ${seasonStartDayofMonthStart} ${seasonStartMonthStart} *`, () => {
                console.log(`hz`)
                if(!(CurrentSeason.seasonData.getSeasonActiveLiga2())){
                    CurrentSeason.seasonData.setSeasonActiveLiga2(true);
                }
                console.log(CurrentSeason.seasonData)
                CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, endDate - startDate)
            })
        }catch{
            console.log(`dick`)
        }

    }  
}