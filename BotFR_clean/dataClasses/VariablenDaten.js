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

        // LIGA FR

        this.anmeldeChannelIDLigaFR = '1004371431112593418'; // ID: 1004371431112593418
        this.abmeldeChannelIDLigaFR = '1004371465380048937'; // ID: 1004371465380048937     
        this.ersatzfahrerRolleIDLigaFR = '1004370377780248647'; // ID: 1004370377780248647     
        this.stammfahrerRolleIDLigaFR = '1004370364895342782'; // ID: 1004370364895342782
        this.infoChannelIDLigaFR = '1004371403740545045'; // ID: 1004371403740545045
        
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
 