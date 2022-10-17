const {SlashCommandBuilder} = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa2.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startonce_sa2')
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
            console.log(`Der startonceSA2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Dino, Hoerke
        CurrentSeason.seasonData.setMercedesDriversLigaSA2(['527496491414192128', '339415812165074945']);
        // KDMNot34, Luca_YP
        CurrentSeason.seasonData.setRedBullDriversLigaSA2(['439861415633879040', '641015329429913633']);
        // Alone_Finn, MORE RGB = MORE FPS
        CurrentSeason.seasonData.setFerrariDriversLigaSA2(['694689316093558925', '693165800642576456']);
        // Scheber, Delacium
        CurrentSeason.seasonData.setMcLarenDriversLigaSA2(['822055711365136394', '689532105029713943']);
        // Tomato Hacker, Peekme
        CurrentSeason.seasonData.setAstonMartinDriversLigaSA2(['792152769431339008', '549248953011666944']);
        // Tim White, Danny Phantom
        CurrentSeason.seasonData.setAlpineDriversLigaSA2(['653676539174453258', '873747625067827200']);
        // faxbxo, Dr_joHo
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSA2(['480222830466695180', '496948780323831808']);
        // John, Mangoe
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSA2(['396155559344078849', '511933778806177813']);
        // Betschart04, DaaTom
        CurrentSeason.seasonData.setWilliamsDriversLigaSA2(['813047134688772116', '232563772626173952']);
        // Quinkway, The Wolf
        CurrentSeason.seasonData.setHaasDriversLigaSA2(['544005185526300672', '394987394719547442']);

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

        CurrentSeason.seasonData.setLigatitel('Liga SA 2')
        CurrentSeason.seasonData.setSeasonCalendarLigaSA2([location]);  

        let startDate = new Date(new Date().getFullYear(), seasonStartMonthStart - 1, seasonStartDayofMonthStart, seasonStartHourOfDayStart, 
                                seasonStartMinutesOfDayStart, seasonStartSecondsOfDayStart);
        let endDate = new Date(new Date().getFullYear(), seasonStartMonthEnd - 1, seasonStartDayofMonthEnd, seasonStartHourOfDayEnd, 
                                seasonStartMinutesOfDayEnd, seasonStartSecondsOfDayEnd);
        
        try{
            cron.schedule(`${seasonStartSecondsOfDayStart} ${seasonStartMinutesOfDayStart} ${seasonStartHourOfDayStart} ${seasonStartDayofMonthStart} ${seasonStartMonthStart} *`, () => {
                if(!(CurrentSeason.seasonData.getSeasonActiveLigaSA2())){
                    CurrentSeason.seasonData.setSeasonActiveLigaSA2(true);
                }
                CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, endDate - startDate)
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden`)
        }

    }  
}