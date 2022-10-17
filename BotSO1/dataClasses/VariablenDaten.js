class Season {

    constructor() {

        //ALLGEMEINE DATEN

        // KONSTANTEN

        this.ligatitel = '';

        // KONSTANTEN

        this.rennleiterRolleID = '479053658135461903';
        this.ligaleiterRolleID = '736929944646713355';
        this.commandChannelID = '901067530012078162';
        this.logChannelID = '901067704499322890';
        this.teamsChannelID = '866950218887987221';
        this.ehemaligerFahrerRolle = '587697224561983516';
        this.fahrerF1Rolle = '587695833428787240';
        this.discordID = '479053264537649153';
        this.mercedesRolleID = '656098815492882432';  
        this.redBullRolleID = '656098821289541633';  
        this.ferrariRolleID = '656098818290483201';
        this.mcLarenRolleID = '656098834878824469';
        this.astonMartinRolleID = '656104213893611522';
        this.alpineRolleID = '656098824074428416';
        this.alphaTauriRolleID = '656098829497532417';
        this.alfaRomeoRolleID = '656098832052125698';
        this.williamsRolleID = '656098837965963274';
        this.haasRolleID = '656098826427432963';
        this.anmeldenEmoji = '✅';
        this.abmeldenEmoji = '❌';

        // LIGACHANNEL

        // LIGA SO 1
        
        this.anmeldeChannelIDLigaSO1 = '857658403592863804'; // ID: 857658403592863804
        this.abmeldeChannelIDLigaSO1 = '869236783089590342'; // ID: 869236783089590342
        this.ersatzfahrerRolleIDLigaSO1 = '479056707104931840'; // ID: 479056707104931840
        this.stammfahrerRolleIDLigaSO1 = '841833530933379092'; // ID: 841833530933379092
        this.infoChannelIDLigaSO1 = '871757845400530974'; // ID: 871757845400530974
        
        // VARIABLEN

        // LIGA SO 1

        this.subPersonListLigaSO1 = []
        this.subPersonListReinstatedDriversLigaSO1 = []
        this.freeCarsLigaSO1 = []
        this.withdrawnDriversLigaSO1 = []
        this.withdrawnDriversPerCommandLigaSO1 = []
        this.subInDriversPerCommandLigaSO1 = []

        this.currentRaceLocationLigaSO1 = null

        this.reactedToSubInLigaSO1 = new Map()
        this.reactedToSignOutLigaSO1 = new Map()

        this.mercedesDriversLigaSO1 = []
        this.redBullDriversLigaSO1 = []
        this.ferrariDriversLigaSO1 = []
        this.mcLarenDriversLigaSO1 = []
        this.astonMartinDriversLigaSO1 = []
        this.alpineDriversLigaSO1 = []
        this.alphaTauriDriversLigaSO1 = []
        this.alfaRomeoDriversLigaSO1 = []
        this.williamsDriversLigaSO1 = []
        this.haasDriversLigaSO1 = []

        this.currentLineupLigaSO1 = new Map()
        this.regularDriversLigaSO1 = new Map()

        this.freeCarMsgIDLigaSO1 = null
        this.waitlistMsgIDLigaSO1 = null
        this.lineupMsgLigaSO1 = null
        this.currentRegularDriversLigaSO1 = null

        this.messageEmbedAnmeldenLigaSO1 = null
        this.messageEmbedAbmeldenLigaSO1 = null

        this.anmeldungActiveLigaSO1 = false
        this.seasonCalendarLigaSO1 = []
        this.seasonCalendarRacesDoneLigaSO1 = []
        this.seasonActiveLigaSO1 = false

        this.startLoopSO1 = null
    }

    // GETTERS AND SETTERS

    // ALLGEMEINE DATEN

    // VARIABLEN

    setLigatitel(pLigatitel){
        this.ligatitel = pLigatitel
    }

    getLigatitel(){
        return this.ligatitel
    }

    // KONSTANTEN

    getRennleiterRolleID(){
        return this.rennleiterRolleID
    }

    getLigaleiterRolleID(){
        return this.ligaleiterRolleID
    }

    getCommandChannelID(){
        return this.commandChannelID
    }

    getLogChannelID(){
        return this.logChannelID
    }

    getTeamsChannelID(){
        return this.teamsChannelID
    }

    getEhemaligerFahrerRolleID(){
        return this.ehemaligerFahrerRolle
    }

    getFahrerF1RolleID(){
        return this.fahrerF1Rolle
    }

    getDiscordID(){
        return this.discordID
    }

    getMercedesRolleID(){
        return this.mercedesRolleID
    }

    getRedBullRolleID(){
        return this.redBullRolleID
    }

    getFerrariRolleID(){
        return this.ferrariRolleID
    }

    getMcLarenRolleID(){
        return this.mcLarenRolleID
    }

    getAstonMartinRolleID(){
        return this.astonMartinRolleID
    }

    getAlpineRolleID(){
        return this.alpineRolleID
    }

    getAlphaTauriRolleID(){
        return this.alphaTauriRolleID
    }

    getAlfaRomeoRolleID(){
        return this.alfaRomeoRolleID
    }

    getWilliamsRolleID(){
        return this.williamsRolleID
    }

    getHaasRolleID(){
        return this.haasRolleID
    }

    getAbmeldeEmoji(){
        return this.abmeldenEmoji
    }

    getAnmeldeEmoji(){
        return this.anmeldenEmoji
    }

    // LIGA ABHÄNGIG

    // KONSTANTEN

    // LIGA SO 1

    getAnmeldeChannelIDLigaSO1(){
        return this.anmeldeChannelIDLigaSO1
    }

    getAbmeldeChannelIDLigaSO1(){
        return this.abmeldeChannelIDLigaSO1
    }

    getErsatzfahrerRolleIDLigaSO1(){
        return this.ersatzfahrerRolleIDLigaSO1
    }

    getStammfahrerRolleIDLigaSO1(){
        return this.stammfahrerRolleIDLigaSO1
    }

    getInfoChannelIDLigaSO1(){
        return this.infoChannelIDLigaSO1
    }

    // VARIABLEN

    // LIGA SO 1

    getSubPersonListLigaSO1() {
        return this.subPersonListLigaSO1;
    }

    setSubPersonListLigaSO1(pSubPersonListLigaSO1) {
        this.subPersonListLigaSO1 = pSubPersonListLigaSO1
    }

    getsubPersonListReinstatedDriversLigaSO1(){
        return this.subPersonListReinstatedDriversLigaSO1
    }

    setsubPersonListReinstatedDriversLigaSO1(pSubPersonListReinstatedDriversLigaSO1){
        this.subPersonListReinstatedDriversLigaSO1 = pSubPersonListReinstatedDriversLigaSO1
    }

    getFreeCarsLigaSO1(){
        return this.freeCarsLigaSO1
    }

    setFreeCarsLigaSO1(pFreeCarsLigaSO1){
        this.freeCarsLigaSO1 = pFreeCarsLigaSO1
    }

    getWithdrawnDriversLigaSO1(){
        return this.withdrawnDriversLigaSO1
    }

    setWithdrawnDriversLigaSO1(pWithdrawnDriversLigaSO1){
        this.withdrawnDriversLigaSO1 = pWithdrawnDriversLigaSO1
    }

    getWithdrawnDriversPerCommandLigaSO1(){
        return this.withdrawnDriversPerCommandLigaSO1
    }

    setWithdrawnDriversPerCommandLigaSO1(pWithdrawnDriversPerCommandLigaSO1){
        this.withdrawnDriversPerCommandLigaSO1 = pWithdrawnDriversPerCommandLigaSO1
    }

    getSubInDriversPerCommandLigaSO1(){
        return this.subInDriversPerCommandLigaSO1
    }

    setSubInDriversPerCommandLigaSO1(pSubInDriversPerCommandLigaSO1){
        this.subInDriversPerCommandLigaSO1 = pSubInDriversPerCommandLigaSO1
    }    

    getCurrentRaceLocationLigaSO1(){
        return this.currentRaceLocationLigaSO1
    }

    setCurrentRaceLocationLigaSO1(pCurrentRaceLocationLigaSO1){
        this.currentRaceLocationLigaSO1 = pCurrentRaceLocationLigaSO1
    }

    getReactedToSubInLigaSO1(){
        return this.reactedToSubInLigaSO1
    }

    setReactedToSubInLigaSO1(pReactedToSubInLigaSO1){
        this.reactedToSubInLigaSO1 = pReactedToSubInLigaSO1
    }

    getReactedToSignOutLigaSO1(){
        return this.reactedToSignOutLigaSO1
    }

    setReactedToSignOutLigaSO1(pReactedToSignOutLigaSO1){
        this.reactedToSignOutLigaSO1 = pReactedToSignOutLigaSO1
    }

    getMercedesDriversLigaSO1(){
        return this.mercedesDriversLigaSO1
    }

    setMercedesDriversLigaSO1(pMercedesDriversLigaSO1){
        this.mercedesDriversLigaSO1 = pMercedesDriversLigaSO1
    }

    getRedBullDriversLigaSO1(){
        return this.redBullDriversLigaSO1
    }

    setRedBullDriversLigaSO1(pRedBullDriversLigaSO1){
        this.redBullDriversLigaSO1 = pRedBullDriversLigaSO1
    }

    getFerrariDriversLigaSO1(){
        return this.ferrariDriversLigaSO1
    }

    setFerrariDriversLigaSO1(pFerrariDriversLigaSO1){
        this.ferrariDriversLigaSO1 = pFerrariDriversLigaSO1
    }

    getMcLarenDriversLigaSO1(){
        return this.mcLarenDriversLigaSO1
    }

    setMcLarenDriversLigaSO1(pMcLarenDriversLigaSO1){
        this.mcLarenDriversLigaSO1 = pMcLarenDriversLigaSO1
    }

    getAstonMartinDriversLigaSO1(){
        return this.astonMartinDriversLigaSO1
    }

    setAstonMartinDriversLigaSO1(pAstonMartinDriversLigaSO1){
        this.astonMartinDriversLigaSO1 = pAstonMartinDriversLigaSO1
    }

    getAlpineDriversLigaSO1(){
        return this.alpineDriversLigaSO1
    }

    setAlpineDriversLigaSO1(pAlpineDriversLigaSO1){
        this.alpineDriversLigaSO1 = pAlpineDriversLigaSO1
    }

    getAlphaTauriDriversLigaSO1(){
        return this.alphaTauriDriversLigaSO1
    }

    setAlphaTauriDriversLigaSO1(pAlphaTauriDriversLigaSO1){
        this.alphaTauriDriversLigaSO1 = pAlphaTauriDriversLigaSO1
    }

    getAlfaRomeoDriversLigaSO1(){
        return this.alfaRomeoDriversLigaSO1
    }

    setAlfaRomeoDriversLigaSO1(pAlfaRomeoDriversLigaSO1){
        this.alfaRomeoDriversLigaSO1 = pAlfaRomeoDriversLigaSO1
    }

    getWilliamsDriversLigaSO1(){
        return this.williamsDriversLigaSO1
    }

    setWilliamsDriversLigaSO1(pWilliamsDriversLigaSO1){
        this.williamsDriversLigaSO1 = pWilliamsDriversLigaSO1
    }

    getHaasDriversLigaSO1(){
        return this.haasDriversLigaSO1
    }

    setHaasDriversLigaSO1(pHaasDriversLigaSO1){
        this.haasDriversLigaSO1 = pHaasDriversLigaSO1
    }

    getCurrentLineupLigaSO1(){
        return this.currentLineupLigaSO1
    }

    setCurrentLineupLigaSO1(pCurrentLineupLigaSO1){
        this.currentLineupLigaSO1 = pCurrentLineupLigaSO1
    }    

    getRegularDriversLigaSO1(){
        return this.regularDriversLigaSO1
    }

    setRegularDriversLigaSO1(pRegularDriverLigaSO1){
        this.regularDriversLigaSO1 = pRegularDriverLigaSO1
    }

    setFreeCarMsgIDLigaSO1(pFreeCarMsgIDLigaSO1){
        this.freeCarMsgIDLigaSO1 = pFreeCarMsgIDLigaSO1
    }

    getFreeCarMsgIDLigaSO1(){
        return this.freeCarMsgIDLigaSO1
    }

    setWaitlistMsgIDLigaSO1(pWaitlistMsgIDLigaSO1){
        this.waitlistMsgIDLigaSO1 = pWaitlistMsgIDLigaSO1
    }    

    getWaitlistMsgIDLigaSO1(){
        return this.waitlistMsgIDLigaSO1
    }

    setLineupMsgLigaSO1(pLineupMsgLigaSO1){
        this.lineupMsgLigaSO1 = pLineupMsgLigaSO1
    }

    getLineupMsgLigaSO1(){
        return this.lineupMsgLigaSO1
    }

    setCurrentRegularDriversLigaSO1(pCurrentRegularDriversLigaSO1){
        this.currentRegularDriversLigaSO1 = pCurrentRegularDriversLigaSO1
    }

    getCurrentRegularDriversLigaSO1(){
        return this.currentRegularDriversLigaSO1
    }

    setMessageEmbedAnmeldenLigaSO1(pMessageEmbedAnmeldenLigaSO1){
        this.messageEmbedAnmeldenLigaSO1 = pMessageEmbedAnmeldenLigaSO1
    }

    getMessageEmbedAnmeldenLigaSO1(){
        return this.messageEmbedAnmeldenLigaSO1
    }

    setMessageEmbedAbmeldenLigaSO1(pMessageEmbedAbmeldenLigaSO1){
        this.messageEmbedAbmeldenLigaSO1 = pMessageEmbedAbmeldenLigaSO1
    }

    getMessageEmbedAbmeldenLigaSO1(){
        return this.messageEmbedAbmeldenLigaSO1
    }

    setAnmeldungActiveLigaSO1(pAnmeldungActiveLigaSO1){
        this.anmeldungActiveLigaSO1 = pAnmeldungActiveLigaSO1
    }

    getAnmeldungActiveLigaSO1(){
        return this.anmeldungActiveLigaSO1
    }

    setSeasonCalendarLigaSO1(pSeasonCalendarLigaSO1){
        this.seasonCalendarLigaSO1 = pSeasonCalendarLigaSO1
    }

    getSeasonCalendarLigaSO1(){
        return this.seasonCalendarLigaSO1
    }

    setSeasonCalendarRacesDoneLigaSO1(pSeasonCalendarRacesDoneLigaSO1){
        this.seasonCalendarRacesDoneLigaSO1 = pSeasonCalendarRacesDoneLigaSO1
    }

    getSeasonCalendarRacesDoneLigaSO1(){
        return this.seasonCalendarRacesDoneLigaSO1
    }

    setSeasonActiveLigaSO1(pSeasonActiveLigaSO1){
        this.seasonActiveLigaSO1 = pSeasonActiveLigaSO1
    }

    getSeasonActiveLigaSO1(){
        return this.seasonActiveLigaSO1
    }

    setStartLoopLigaSO1(pStartLoopLigaSO1){
        this.pStartLoopLigaSO1 = pStartLoopLigaSO1
    }

    getStartLoopLigaSO1(){
        return this.pStartLoopLigaSO1
    }

}

module.exports = Season
 