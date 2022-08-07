const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonligaSO1.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startonceSO1')
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
            console.log(`Der startonceSO1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Zani, xDarknight
        CurrentSeason.seasonData.setMercedesDriversLigaSO1(['751461016583274516', '756083277512835082']);
        // Nyrox, Sweazy
        CurrentSeason.seasonData.setRedBullDriversLigaSO1(['336885878029025280', '307481682272059394']);
        // k.k, Playhak
        CurrentSeason.seasonData.setFerrariDriversLigaSO1(['688006080109740070', '299534780595175424']);
        // Eriksen, SHDGames
        CurrentSeason.seasonData.setMcLarenDriversLigaSO1(['263760051515293696', '284981237645312000']);
        // Achimedes, Korky
        CurrentSeason.seasonData.setAstonMartinDriversLigaSO1(['336841703816429570', '380076906172645390']);
        // Sven, Die_K4ante
        CurrentSeason.seasonData.setAlpineDriversLigaSO1(['427116609128103947', '315803566591967243']);
        // Finn, lyrex
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSO1(['272073232893345792', '216889083463598080']);
        // Sören_1206, Shining
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSO1(['264706413715128322', '312983203147153418']);
        // MRVN, Kibu
        CurrentSeason.seasonData.setWilliamsDriversLigaSO1(['495721676848496640', '173416598101688320']);
        // Vollkorn, Melody
        CurrentSeason.seasonData.setHaasDriversLigaSO1(['319115003032502282', '413367477548875777']);

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
        CurrentSeason.seasonData.setSeasonCalendarLigaSO1([location]);  

        let startDate = new Date(new Date().getFullYear(), seasonStartMonthStart - 1, seasonStartDayofMonthStart, seasonStartHourOfDayStart, 
                                seasonStartMinutesOfDayStart, seasonStartSecondsOfDayStart);
        let endDate = new Date(new Date().getFullYear(), seasonStartMonthEnd - 1, seasonStartDayofMonthEnd, seasonStartHourOfDayEnd, 
                                seasonStartMinutesOfDayEnd, seasonStartSecondsOfDayEnd);
        
        try{
            cron.schedule(`${seasonStartSecondsOfDayStart} ${seasonStartMinutesOfDayStart} ${seasonStartHourOfDayStart} ${seasonStartDayofMonthStart} ${seasonStartMonthStart} *`, () => {
                if(!(CurrentSeason.seasonData.getSeasonActiveLigaSO1())){
                    CurrentSeason.seasonData.setSeasonActiveLigaSO1(true);
                }
                CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, endDate - startDate)
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden`)
        }

    }  
}