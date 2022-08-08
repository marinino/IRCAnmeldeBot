const {SlashCommandBuilder} = require('@discordjs/builders');
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
        // Sergeant, Jules Kaiser
        CurrentSeason.seasonData.setRedBullDriversLigaFR(['266673984601325570', '529018929008476160']);
        // Felixx, Jan Overbeck
        CurrentSeason.seasonData.setFerrariDriversLigaFR(['927709369431363594', '598253459216662634']);
        // Spacelord, Feuerrabe
        CurrentSeason.seasonData.setMcLarenDriversLigaFR(['335420562413453312', '682281837233700931']);
        // Kesby, Robbsell
        CurrentSeason.seasonData.setAstonMartinDriversLigaFR(['387002150569377802', '659327297819508737']);
        // avestro, Pacman
        CurrentSeason.seasonData.setAlpineDriversLigaFR(['671353767232274442', '284950253772341248']);
        // Alkenvogel, Yarbay
        CurrentSeason.seasonData.setAlphaTauriDriversLigaFR(['163331404439093248', '523553582524399672']);
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
                            `${seasonStartDayofMonthEnd}.${seasonStartMonthEnd} um ${seasonStartHourOfDayEnd}:${seasonStartMinutesOfDayEnd}:${seasonStartSecondsOfDayEnd}` + 
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