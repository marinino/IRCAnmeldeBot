const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonliga_so2.js')
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startonce_so2')
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
            console.log(`Der startonceSO2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Armedn Osmani, Buddy
        CurrentSeason.seasonData.setMercedesDriversLigaSO2(['616690841532104759', '177733474713600000']);
        // Spylex, scottY_
        CurrentSeason.seasonData.setRedBullDriversLigaSO2(['310120370860457984', '235084053907243008']);
        // Frosti, nerlan
        CurrentSeason.seasonData.setFerrariDriversLigaSO2(['663084750256209950', '329353284273831937']);
        // Harlekin, Matters
        CurrentSeason.seasonData.setMcLarenDriversLigaSO2(['554754801632804865', '339842173065232387']);
        // Treatz, Tom:)
        CurrentSeason.seasonData.setAstonMartinDriversLigaSO2(['582711260408184843', '342305504359481345']);
        // stayz, Jan.05
        CurrentSeason.seasonData.setAlpineDriversLigaSO2(['406475375330459649', '720227768457101373']);
        // unerzogen, Hico
        CurrentSeason.seasonData.setAlphaTauriDriversLigaSO2(['547097687208493066', '442694360652447755']);
        // Arongo, Klaus
        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSO2(['645299363375087616', '595695198596759593']);
        // Marius, Fr0z3nsc0pio
        CurrentSeason.seasonData.setWilliamsDriversLigaSO2(['470548642802040843', '760177185746583622']);
        // riiqzy, Leviathan
        CurrentSeason.seasonData.setHaasDriversLigaSO2(['376412804288348160', '288054858030776320']);

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

        CurrentSeason.seasonData.setLigatitel('Liga SO 2')
        CurrentSeason.seasonData.setSeasonCalendarLigaSO2([location]);  

        let startDate = new Date(new Date().getFullYear(), seasonStartMonthStart - 1, seasonStartDayofMonthStart, seasonStartHourOfDayStart, 
                                seasonStartMinutesOfDayStart, seasonStartSecondsOfDayStart);
        let endDate = new Date(new Date().getFullYear(), seasonStartMonthEnd - 1, seasonStartDayofMonthEnd, seasonStartHourOfDayEnd, 
                                seasonStartMinutesOfDayEnd, seasonStartSecondsOfDayEnd);
        
        try{
            cron.schedule(`${seasonStartSecondsOfDayStart} ${seasonStartMinutesOfDayStart} ${seasonStartHourOfDayStart} ${seasonStartDayofMonthStart} ${seasonStartMonthStart} *`, () => {
                if(!(CurrentSeason.seasonData.getSeasonActiveLigaSO2())){
                    CurrentSeason.seasonData.setSeasonActiveLigaSO2(true);
                }
                CurrentSeason.methodStorage.startFunction(client, interaction, CurrentSeason.seasonData, endDate - startDate)
            })
        }catch{
            console.log(`Seasonstart konnte nicht durchgeführt werden`)
        }

    }  
}