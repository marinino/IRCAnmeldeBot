const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonligaSA1.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startonceSA1')
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
            console.log(`Der startonceSA1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Adman, Chris
        CurrentSeason.seasonData.setMercedesDriversLigaSA1(['269499201702854667', '469926134700703748']);
        // SHD, Brückenwasser
        CurrentSeason.seasonData.setRedBullDriversLigaSA1(['284981237645312000', '281829417775267840']);
        // Rocky, Helim
        CurrentSeason.seasonData.setFerrariDriversLigaSA1(['176331806839275520', '404664138103652362']);
        // DavidXUX, DelBoss
        CurrentSeason.seasonData.setMcLarenDriversLigaSA1(['386929779208880150', '438403655306313728']);
        // Trade.VSG, ScepticHamster
        CurrentSeason.seasonData.setAstonMartinDriversLigaSA1(['399565281657225226', '170629700719214592']);
        // Demiyoo, hairylegs
        CurrentSeason.seasonData.setAlpineDriversLigaSA1(['356721136467443722', '605199089793236996']);
        //
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSA1(['nicht besetzt', 'nicht besetzt']);
        // Cvbby, smittyy
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSA1(['259366764121423872', '154609243033436160']);
        // ghostvali, PhantaFlash
        CurrentSeason.seasonData.setWilliamsDriversLigaSA1(['650625652407402496', '709479846358810704']);
        // VettelFan, josia
        CurrentSeason.seasonData.setHaasDriversLigaSA1(['328902952486174722', '469239617590132737']);

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
        CurrentSeason.seasonData.setSeasonCalendarLigaSA1([location]);  

        let startDate = new Date(new Date().getFullYear(), seasonStartMonthStart - 1, seasonStartDayofMonthStart, seasonStartHourOfDayStart, 
                                seasonStartMinutesOfDayStart, seasonStartSecondsOfDayStart);
        let endDate = new Date(new Date().getFullYear(), seasonStartMonthEnd - 1, seasonStartDayofMonthEnd, seasonStartHourOfDayEnd, 
                                seasonStartMinutesOfDayEnd, seasonStartSecondsOfDayEnd);
        
        try{
            cron.schedule(`${seasonStartSecondsOfDayStart} ${seasonStartMinutesOfDayStart} ${seasonStartHourOfDayStart} ${seasonStartDayofMonthStart} ${seasonStartMonthStart} *`, () => {
                if(!(CurrentSeason.seasonData.getSeasonActiveLigaSA1())){
                    CurrentSeason.seasonData.setSeasonActiveLigaSA1(true);
                }
                CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, endDate - startDate)
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden`)
        }

    }  
}