class Season {

    constructor() {

        //ALLGEMEINE DATEN

        // KONSTANTEN

        this.ligatitel = '';

        // KONSTANTEN

        this.rennleiterRolleID = '947229969711521867';
        this.ligaleiterRolleID = '0';
        this.commandChannelID = '947229975671615492';
        this.logChannelID = '947229975671615493';
        this.teamsChannelID = '947229976825049124';
        this.ehemaligerFahrerRolle = '947229969640222735';
        this.fahrerF1Rolle = '947229969640222734';
        this.discordID = '947229969438896128';
        this.mercedesRolleID = '947229969673760816';  
        this.redBullRolleID = '947229969673760812';  
        this.ferrariRolleID = '947229969673760814';
        this.mcLarenRolleID = '947229969656971368';
        this.astonMartinRolleID = '947229969656971364';
        this.alpineRolleID = '947229969673760810';
        this.alphaTauriRolleID = '947229969656971372';
        this.alfaRomeoRolleID = '947229969656971370';
        this.williamsRolleID = '947229969656971366';
        this.haasRolleID = '947229969673760808';
        this.anmeldenEmoji = '✅';
        this.abmeldenEmoji = '❌';

        // LIGACHANNEL

        // LIGA FR

        this.anmeldeChannelIDLigaFR = '947229976997007384'; // ID: 1004371431112593418
        this.abmeldeChannelIDLigaFR = '947229976997007385'; // ID: 1004371465380048937     
        this.ersatzfahrerRolleIDLigaFR = '947229969686335531'; // ID: 1004370377780248647     
        this.stammfahrerRolleIDLigaFR = '947229969686335536'; // ID: 1004370364895342782
        this.infoChannelIDLigaFR = '947229976997007383'; // ID: 1004371403740545045
        
        // VARIABLEN

        // LIGA FR

        this.subPersonListLigaFR = []
        this.subPersonListReinstatedDriversLigaFR = []
        this.freeCarsLigaFR = []
        this.withdrawnDriversLigaFR = []
        this.withdrawnDriversPerCommandLigaFR = []
        this.subInDriversPerCommandLigaFR = []

        this.currentRaceLocationLigaFR = null

        this.reactedToSubInLigaFR = new Map()
        this.reactedToSignOutLigaFR = new Map()

        this.mercedesDriversLigaFR = []
        this.redBullDriversLigaFR = []
        this.ferrariDriversLigaFR = []
        this.mcLarenDriversLigaFR = []
        this.astonMartinDriversLigaFR = []
        this.alpineDriversLigaFR = []
        this.alphaTauriDriversLigaFR = []
        this.alfaRomeoDriversLigaFR = []
        this.williamsDriversLigaFR = []
        this.haasDriversLigaFR = []

        this.currentLineupLigaFR = new Map()
        this.regularDriversLigaFR = new Map()

        this.freeCarMsgIDLigaFR = null
        this.waitlistMsgIDLigaFR = null
        this.lineupMsgLigaFR = null
        this.currentRegularDriversLigaFR = null

        this.messageEmbedAnmeldenLigaFR = null
        this.messageEmbedAbmeldenLigaFR = null

        this.anmeldungActiveLigaFR = false
        this.seasonCalendarLigaFR = []
        this.seasonCalendarRacesDoneLigaFR = []
        this.seasonActiveLigaFR = false

        this.startLoopFR = null
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

    

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // KONSTANTEN

    // LIGA FR

    getAnmeldeChannelIDLigaFR(){
        return this.anmeldeChannelIDLigaFR
    }

    getAbmeldeChannelIDLigaFR(){
        return this.abmeldeChannelIDLigaFR
    }

    getErsatzfahrerRolleIDLigaFR(){
        return this.ersatzfahrerRolleIDLigaFR
    }

    getStammfahrerRolleIDLigaFR(){
        return this.stammfahrerRolleIDLigaFR
    }

    getInfoChannelIDLigaFR(){
        return this.infoChannelIDLigaFR
    }

    // VARIABLEN

    // LIGA FR

    getSubPersonListLigaFR() {
        return this.subPersonListLigaFR;
    }

    setSubPersonListLigaFR(pSubPersonListLigaFR) {
        this.subPersonListLigaFR = pSubPersonListLigaFR
    }

    getsubPersonListReinstatedDriversLigaFR(){
        return this.subPersonListReinstatedDriversLigaFR
    }

    setsubPersonListReinstatedDriversLigaFR(pSubPersonListReinstatedDriversLigaFR){
        this.subPersonListReinstatedDriversLigaFR = pSubPersonListReinstatedDriversLigaFR
    }

    getFreeCarsLigaFR(){
        return this.freeCarsLigaFR
    }

    setFreeCarsLigaFR(pFreeCarsLigaFR){
        this.freeCarsLigaFR = pFreeCarsLigaFR
    }

    getWithdrawnDriversLigaFR(){
        return this.withdrawnDriversLigaFR
    }

    setWithdrawnDriversLigaFR(pWithdrawnDriversLigaFR){
        this.withdrawnDriversLigaFR = pWithdrawnDriversLigaFR
    }

    getWithdrawnDriversPerCommandLigaFR(){
        return this.withdrawnDriversPerCommandLigaFR
    }

    setWithdrawnDriversPerCommandLigaFR(pWithdrawnDriversPerCommandLigaFR){
        this.withdrawnDriversPerCommandLigaFR = pWithdrawnDriversPerCommandLigaFR
    }

    getSubInDriversPerCommandLigaFR(){
        return this.subInDriversPerCommandLigaFR
    }

    setSubInDriversPerCommandLigaFR(pSubInDriversPerCommandLigaFR){
        this.subInDriversPerCommandLigaFR = pSubInDriversPerCommandLigaFR
    }    

    getCurrentRaceLocationLigaFR(){
        return this.currentRaceLocationLigaFR
    }

    setCurrentRaceLocationLigaFR(pCurrentRaceLocationLigaFR){
        this.currentRaceLocationLigaFR = pCurrentRaceLocationLigaFR
    }

    getReactedToSubInLigaFR(){
        return this.reactedToSubInLigaFR
    }

    setReactedToSubInLigaFR(pReactedToSubInLigaFR){
        this.reactedToSubInLigaFR = pReactedToSubInLigaFR
    }

    getReactedToSignOutLigaFR(){
        return this.reactedToSignOutLigaFR
    }

    setReactedToSignOutLigaFR(pReactedToSignOutLigaFR){
        this.reactedToSignOutLigaFR = pReactedToSignOutLigaFR
    }

    getMercedesDriversLigaFR(){
        return this.mercedesDriversLigaFR
    }

    setMercedesDriversLigaFR(pMercedesDriversLigaFR){
        this.mercedesDriversLigaFR = pMercedesDriversLigaFR
    }

    getRedBullDriversLigaFR(){
        return this.redBullDriversLigaFR
    }

    setRedBullDriversLigaFR(pRedBullDriversLigaFR){
        this.redBullDriversLigaFR = pRedBullDriversLigaFR
    }

    getFerrariDriversLigaFR(){
        return this.ferrariDriversLigaFR
    }

    setFerrariDriversLigaFR(pFerrariDriversLigaFR){
        this.ferrariDriversLigaFR = pFerrariDriversLigaFR
    }

    getMcLarenDriversLigaFR(){
        return this.mcLarenDriversLigaFR
    }

    setMcLarenDriversLigaFR(pMcLarenDriversLigaFR){
        this.mcLarenDriversLigaFR = pMcLarenDriversLigaFR
    }

    getAstonMartinDriversLigaFR(){
        return this.astonMartinDriversLigaFR
    }

    setAstonMartinDriversLigaFR(pAstonMartinDriversLigaFR){
        this.astonMartinDriversLigaFR = pAstonMartinDriversLigaFR
    }

    getAlpineDriversLigaFR(){
        return this.alpineDriversLigaFR
    }

    setAlpineDriversLigaFR(pAlpineDriversLigaFR){
        this.alpineDriversLigaFR = pAlpineDriversLigaFR
    }

    getAlphaTauriDriversLigaFR(){
        return this.alphaTauriDriversLigaFR
    }

    setAlphaTauriDriversLigaFR(pAlphaTauriDriversLigaFR){
        this.alphaTauriDriversLigaFR = pAlphaTauriDriversLigaFR
    }

    getAlfaRomeoDriversLigaFR(){
        return this.alfaRomeoDriversLigaFR
    }

    setAlfaRomeoDriversLigaFR(pAlfaRomeoDriversLigaFR){
        this.alfaRomeoDriversLigaFR = pAlfaRomeoDriversLigaFR
    }

    getWilliamsDriversLigaFR(){
        return this.williamsDriversLigaFR
    }

    setWilliamsDriversLigaFR(pWilliamsDriversLigaFR){
        this.williamsDriversLigaFR = pWilliamsDriversLigaFR
    }

    getHaasDriversLigaFR(){
        return this.haasDriversLigaFR
    }

    setHaasDriversLigaFR(pHaasDriversLigaFR){
        this.haasDriversLigaFR = pHaasDriversLigaFR
    }

    getCurrentLineupLigaFR(){
        return this.currentLineupLigaFR
    }

    setCurrentLineupLigaFR(pCurrentLineupLigaFR){
        this.currentLineupLigaFR = pCurrentLineupLigaFR
    }    

    getRegularDriversLigaFR(){
        return this.regularDriversLigaFR
    }

    setRegularDriversLigaFR(pRegularDriverLigaFR){
        this.regularDriversLigaFR = pRegularDriverLigaFR
    }

    setFreeCarMsgIDLigaFR(pFreeCarMsgIDLigaFR){
        this.freeCarMsgIDLigaFR = pFreeCarMsgIDLigaFR
    }

    getFreeCarMsgIDLigaFR(){
        return this.freeCarMsgIDLigaFR
    }

    setWaitlistMsgIDLigaFR(pWaitlistMsgIDLigaFR){
        this.waitlistMsgIDLigaFR = pWaitlistMsgIDLigaFR
    }    

    getWaitlistMsgIDLigaFR(){
        return this.waitlistMsgIDLigaFR
    }

    setLineupMsgLigaFR(pLineupMsgLigaFR){
        this.lineupMsgLigaFR = pLineupMsgLigaFR
    }

    getLineupMsgLigaFR(){
        return this.lineupMsgLigaFR
    }

    setCurrentRegularDriversLigaFR(pCurrentRegularDriversLigaFR){
        this.currentRegularDriversLigaFR = pCurrentRegularDriversLigaFR
    }

    getCurrentRegularDriversLigaFR(){
        return this.currentRegularDriversLigaFR
    }

    setMessageEmbedAnmeldenLigaFR(pMessageEmbedAnmeldenLigaFR){
        this.messageEmbedAnmeldenLigaFR = pMessageEmbedAnmeldenLigaFR
    }

    getMessageEmbedAnmeldenLigaFR(){
        return this.messageEmbedAnmeldenLigaFR
    }

    setMessageEmbedAbmeldenLigaFR(pMessageEmbedAbmeldenLigaFR){
        this.messageEmbedAbmeldenLigaFR = pMessageEmbedAbmeldenLigaFR
    }

    getMessageEmbedAbmeldenLigaFR(){
        return this.messageEmbedAbmeldenLigaFR
    }

    setAnmeldungActiveLigaFR(pAnmeldungActiveLigaFR){
        this.anmeldungActiveLigaFR = pAnmeldungActiveLigaFR
    }

    getAnmeldungActiveLigaFR(){
        return this.anmeldungActiveLigaFR
    }

    setSeasonCalendarLigaFR(pSeasonCalendarLigaFR){
        this.seasonCalendarLigaFR = pSeasonCalendarLigaFR
    }

    getSeasonCalendarLigaFR(){
        return this.seasonCalendarLigaFR
    }

    setSeasonCalendarRacesDoneLigaFR(pSeasonCalendarRacesDoneLigaFR){
        this.seasonCalendarRacesDoneLigaFR = pSeasonCalendarRacesDoneLigaFR
    }

    getSeasonCalendarRacesDoneLigaFR(){
        return this.seasonCalendarRacesDoneLigaFR
    }

    setSeasonActiveLigaFR(pSeasonActiveLigaFR){
        this.seasonActiveLigaFR = pSeasonActiveLigaFR
    }

    getSeasonActiveLigaFR(){
        return this.seasonActiveLigaFR
    }

    setStartLoopLigaFR(pStartLoopLigaFR){
        this.pStartLoopLigaFR = pStartLoopLigaFR
    }

    getStartLoopLigaFR(){
        return this.pStartLoopLigaFR
    }

}

module.exports = Season
 