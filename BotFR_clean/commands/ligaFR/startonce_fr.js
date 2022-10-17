const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_fr.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startonce_fr')
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

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der startonceFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Martin2002, MaxPrimetime
        CurrentSeason.seasonData.setMercedesDriversLigaFR(['268398200749031425', '533728391107575809']);
        // Zerotix, Nagato
        CurrentSeason.seasonData.setRedBullDriversLigaFR(['545636518782435330', '772557225024946217']);
        // Felixx, Dome nur Besser
        CurrentSeason.seasonData.setFerrariDriversLigaFR(['927709369431363594', '777188809175072778']);
        // Spacelord, Mandalon
        CurrentSeason.seasonData.setMcLarenDriversLigaFR(['335420562413453312', '764434676588740638']);
        // Moralix, UhuUnheil
        CurrentSeason.seasonData.setAstonMartinDriversLigaFR(['460882242856681474', '1007613328505454632']);
        // avestro, Pacman
        CurrentSeason.seasonData.setAlpineDriversLigaFR(['1014907037412511864', '284950253772341248']);
        // Entsafter, Yarbay
        CurrentSeason.seasonData.setAlphaTauriDriversLigaFR(['630078485083455498', '523553582524399672']);
        // Andre, Felichs
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaFR(['548524356855136268', '471758946651078657']);
        // Jojo, Pascalus
        CurrentSeason.seasonData.setWilliamsDriversLigaFR(['695583838042325042', '254292883492831232']);
        // Senfy, Schorli
        CurrentSeason.seasonData.setHaasDriversLigaFR(['497014626589081602', '1004447400645111969']);

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
                            `${seasonStartDayofMonthEnd}.${seasonStartMonthEnd} um ${seasonStartHourOfDayEnd}:${seasonStartMinutesOfDayEnd}:${seasonStartSecondsOfDayEnd} ` + 
                            `geschlossen`)

        CurrentSeason.seasonData.setLigatitel('Liga SO 1')
        CurrentSeason.seasonData.setSeasonCalendarLigaFR([location]);  

        let startDate = new Date(new Date().getFullYear(), seasonStartMonthStart - 1, seasonStartDayofMonthStart, seasonStartHourOfDayStart, 
                                seasonStartMinutesOfDayStart, seasonStartSecondsOfDayStart);
        let endDate = new Date(new Date().getFullYear(), seasonStartMonthEnd - 1, seasonStartDayofMonthEnd, seasonStartHourOfDayEnd, 
                                seasonStartMinutesOfDayEnd, seasonStartSecondsOfDayEnd);
        
        try{
            cron.schedule(`${seasonStartSecondsOfDayStart} ${seasonStartMinutesOfDayStart} ${seasonStartHourOfDayStart} ${seasonStartDayofMonthStart} ${seasonStartMonthStart} *`, () => {
                if(!(CurrentSeason.seasonData.getSeasonActiveLigaFR())){
                    CurrentSeason.seasonData.setSeasonActiveLigaFR(true);
                }
                CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, endDate - startDate)
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden`)
        }

    }  
}