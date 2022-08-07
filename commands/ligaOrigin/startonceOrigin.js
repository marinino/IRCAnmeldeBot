const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonligaOrigin.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startonceOrigin')
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
            console.log(`Der startonceOrigin Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // MrZOCKson, Crysii
        CurrentSeason.seasonData.setMercedesDriversLigaOrigin(['181150006961635328', '310176925848961025']);
        // Charizzz, talo
        CurrentSeason.seasonData.setRedBullDriversLigaOrigin(['469926134700703748', '265537845081407489']);
        // Noryl, WieSie
        CurrentSeason.seasonData.setFerrariDriversLigaOrigin(['289036587159912448', '382914407153401857']);
        // felx, John
        CurrentSeason.seasonData.setMcLarenDriversLigaOrigin(['250274323934347264', '396155559344078849']);
        // Broncos, Rocket
        CurrentSeason.seasonData.setAstonMartinDriversLigaOrigin(['604645537882308609', '281100297051570177']);
        // Bratpfanne, Giulio
        CurrentSeason.seasonData.setAlpineDriversLigaOrigin(['640308390072942617', '266833962989518849']);
        // Adman, Scof
        CurrentSeason.seasonData.setAlphaTauriDriversLigaOrigin(['269499201702854667', '378256164196188160']);
        // Lizenzinhaber, Julian223
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaOrigin(['556478238311055360', '563449483162288150']);
        // Milleniuz, Nexoooo
        CurrentSeason.seasonData.setWilliamsDriversLigaOrigin(['416272464012640256', '419147681659617280']);
        // Mops, Taurice
        CurrentSeason.seasonData.setHaasDriversLigaOrigin(['291996277556641794', '206037918647713792']);

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

        CurrentSeason.seasonData.setLigatitel('Liga Origin')
        CurrentSeason.seasonData.setSeasonCalendarLigaOrigin([location]);  

        let startDate = new Date(new Date().getFullYear(), seasonStartMonthStart - 1, seasonStartDayofMonthStart, seasonStartHourOfDayStart, 
                                seasonStartMinutesOfDayStart, seasonStartSecondsOfDayStart);
        let endDate = new Date(new Date().getFullYear(), seasonStartMonthEnd - 1, seasonStartDayofMonthEnd, seasonStartHourOfDayEnd, 
                                seasonStartMinutesOfDayEnd, seasonStartSecondsOfDayEnd);
        
        try{
            cron.schedule(`${seasonStartSecondsOfDayStart} ${seasonStartMinutesOfDayStart} ${seasonStartHourOfDayStart} ${seasonStartDayofMonthStart} ${seasonStartMonthStart} *`, () => {
                if(!(CurrentSeason.seasonData.getSeasonActiveLigaOrigin())){
                    CurrentSeason.seasonData.setSeasonActiveLigaOrigin(true);
                }
                CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, endDate - startDate)
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden`)
        }

    }  
}