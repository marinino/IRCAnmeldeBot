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

        // LIGA SA 1

        this.anmeldeChannelIDLigaSA1 = '857673238100574228'; // ID: 857673238100574228
        this.abmeldeChannelIDLigaSA1 = '857673345347485747'; // ID: 857673345347485747     
        this.ersatzfahrerRolleIDLigaSA1 = '843567323981938770'; // ID: 843567323981938770     
        this.stammfahrerRolleIDLigaSA1 = '843566505840214016'; // ID: 843566505840214016
        this.infoChannelIDLigaSA1 = '1004377045867970640'; // ID: 1004377045867970640
        
        // VARIABLEN

        // LIGA SA 1

        this.subPersonListLigaSA1 = []
        this.subPersonListReinstatedDriversLigaSA1 = []
        this.freeCarsLigaSA1 = []
        this.withdrawnDriversLigaSA1 = []
        this.withdrawnDriversPerCommandLigaSA1 = []
        this.subInDriversPerCommandLigaSA1 = []

        this.currentRaceLocationLigaSA1 = null

        this.reactedToSubInLigaSA1 = new Map()
        this.reactedToSignOutLigaSA1 = new Map()

        this.mercedesDriversLigaSA1 = []
        this.redBullDriversLigaSA1 = []
        this.ferrariDriversLigaSA1 = []
        this.mcLarenDriversLigaSA1 = []
        this.astonMartinDriversLigaSA1 = []
        this.alpineDriversLigaSA1 = []
        this.alphaTauriDriversLigaSA1 = []
        this.alfaRomeoDriversLigaSA1 = []
        this.williamsDriversLigaSA1 = []
        this.haasDriversLigaSA1 = []

        this.currentLineupLigaSA1 = new Map()
        this.regularDriversLigaSA1 = new Map()

        this.freeCarMsgIDLigaSA1 = null
        this.waitlistMsgIDLigaSA1 = null
        this.lineupMsgLigaSA1 = null
        this.currentRegularDriversLigaSA1 = null

        this.messageEmbedAnmeldenLigaSA1 = null
        this.messageEmbedAbmeldenLigaSA1 = null

        this.anmeldungActiveLigaSA1 = false
        this.seasonCalendarLigaSA1 = []
        this.seasonCalendarRacesDoneLigaSA1 = []
        this.seasonActiveLigaSA1 = false

        this.startLoopSA1 = null

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


    // LIGA SA 1

    getAnmeldeChannelIDLigaSA1(){
        return this.anmeldeChannelIDLigaSA1
    }

    getAbmeldeChannelIDLigaSA1(){
        return this.abmeldeChannelIDLigaSA1
    }

    getErsatzfahrerRolleIDLigaSA1(){
        return this.ersatzfahrerRolleIDLigaSA1
    }

    getStammfahrerRolleIDLigaSA1(){
        return this.stammfahrerRolleIDLigaSA1
    }

    getInfoChannelIDLigaSA1(){
        return this.infoChannelIDLigaSA1
    }

    // VARIABLEN

    // LIGA SA 1

    getSubPersonListLigaSA1() {
        return this.subPersonListLigaSA1;
    }

    setSubPersonListLigaSA1(pSubPersonListLigaSA1) {
        this.subPersonListLigaSA1 = pSubPersonListLigaSA1
    }

    getsubPersonListReinstatedDriversLigaSA1(){
        return this.subPersonListReinstatedDriversLigaSA1
    }

    setsubPersonListReinstatedDriversLigaSA1(pSubPersonListReinstatedDriversLigaSA1){
        this.subPersonListReinstatedDriversLigaSA1 = pSubPersonListReinstatedDriversLigaSA1
    }

    getFreeCarsLigaSA1(){
        return this.freeCarsLigaSA1
    }

    setFreeCarsLigaSA1(pFreeCarsLigaSA1){
        this.freeCarsLigaSA1 = pFreeCarsLigaSA1
    }

    getWithdrawnDriversLigaSA1(){
        return this.withdrawnDriversLigaSA1
    }

    setWithdrawnDriversLigaSA1(pWithdrawnDriversLigaSA1){
        this.withdrawnDriversLigaSA1 = pWithdrawnDriversLigaSA1
    }

    getWithdrawnDriversPerCommandLigaSA1(){
        return this.withdrawnDriversPerCommandLigaSA1
    }

    setWithdrawnDriversPerCommandLigaSA1(pWithdrawnDriversPerCommandLigaSA1){
        this.withdrawnDriversPerCommandLigaSA1 = pWithdrawnDriversPerCommandLigaSA1
    }

    getSubInDriversPerCommandLigaSA1(){
        return this.subInDriversPerCommandLigaSA1
    }

    setSubInDriversPerCommandLigaSA1(pSubInDriversPerCommandLigaSA1){
        this.subInDriversPerCommandLigaSA1 = pSubInDriversPerCommandLigaSA1
    }    

    getCurrentRaceLocationLigaSA1(){
        return this.currentRaceLocationLigaSA1
    }

    setCurrentRaceLocationLigaSA1(pCurrentRaceLocationLigaSA1){
        this.currentRaceLocationLigaSA1 = pCurrentRaceLocationLigaSA1
    }

    getReactedToSubInLigaSA1(){
        return this.reactedToSubInLigaSA1
    }

    setReactedToSubInLigaSA1(pReactedToSubInLigaSA1){
        this.reactedToSubInLigaSA1 = pReactedToSubInLigaSA1
    }

    getReactedToSignOutLigaSA1(){
        return this.reactedToSignOutLigaSA1
    }

    setReactedToSignOutLigaSA1(pReactedToSignOutLigaSA1){
        this.reactedToSignOutLigaSA1 = pReactedToSignOutLigaSA1
    }

    getMercedesDriversLigaSA1(){
        return this.mercedesDriversLigaSA1
    }

    setMercedesDriversLigaSA1(pMercedesDriversLigaSA1){
        this.mercedesDriversLigaSA1 = pMercedesDriversLigaSA1
    }

    getRedBullDriversLigaSA1(){
        return this.redBullDriversLigaSA1
    }

    setRedBullDriversLigaSA1(pRedBullDriversLigaSA1){
        this.redBullDriversLigaSA1 = pRedBullDriversLigaSA1
    }

    getFerrariDriversLigaSA1(){
        return this.ferrariDriversLigaSA1
    }

    setFerrariDriversLigaSA1(pFerrariDriversLigaSA1){
        this.ferrariDriversLigaSA1 = pFerrariDriversLigaSA1
    }

    getMcLarenDriversLigaSA1(){
        return this.mcLarenDriversLigaSA1
    }

    setMcLarenDriversLigaSA1(pMcLarenDriversLigaSA1){
        this.mcLarenDriversLigaSA1 = pMcLarenDriversLigaSA1
    }

    getAstonMartinDriversLigaSA1(){
        return this.astonMartinDriversLigaSA1
    }

    setAstonMartinDriversLigaSA1(pAstonMartinDriversLigaSA1){
        this.astonMartinDriversLigaSA1 = pAstonMartinDriversLigaSA1
    }

    getAlpineDriversLigaSA1(){
        return this.alpineDriversLigaSA1
    }

    setAlpineDriversLigaSA1(pAlpineDriversLigaSA1){
        this.alpineDriversLigaSA1 = pAlpineDriversLigaSA1
    }

    getAlphaTauriDriversLigaSA1(){
        return this.alphaTauriDriversLigaSA1
    }

    setAlphaTauriDriversLigaSA1(pAlphaTauriDriversLigaSA1){
        this.alphaTauriDriversLigaSA1 = pAlphaTauriDriversLigaSA1
    }

    getAlfaRomeoDriversLigaSA1(){
        return this.alfaRomeoDriversLigaSA1
    }

    setAlfaRomeoDriversLigaSA1(pAlfaRomeoDriversLigaSA1){
        this.alfaRomeoDriversLigaSA1 = pAlfaRomeoDriversLigaSA1
    }

    getWilliamsDriversLigaSA1(){
        return this.williamsDriversLigaSA1
    }

    setWilliamsDriversLigaSA1(pWilliamsDriversLigaSA1){
        this.williamsDriversLigaSA1 = pWilliamsDriversLigaSA1
    }

    getHaasDriversLigaSA1(){
        return this.haasDriversLigaSA1
    }

    setHaasDriversLigaSA1(pHaasDriversLigaSA1){
        this.haasDriversLigaSA1 = pHaasDriversLigaSA1
    }

    getCurrentLineupLigaSA1(){
        return this.currentLineupLigaSA1
    }

    setCurrentLineupLigaSA1(pCurrentLineupLigaSA1){
        this.currentLineupLigaSA1 = pCurrentLineupLigaSA1
    }    

    getRegularDriversLigaSA1(){
        return this.regularDriversLigaSA1
    }

    setRegularDriversLigaSA1(pRegularDriverLigaSA1){
        this.regularDriversLigaSA1 = pRegularDriverLigaSA1
    }

    setFreeCarMsgIDLigaSA1(pFreeCarMsgIDLigaSA1){
        this.freeCarMsgIDLigaSA1 = pFreeCarMsgIDLigaSA1
    }

    getFreeCarMsgIDLigaSA1(){
        return this.freeCarMsgIDLigaSA1
    }

    setWaitlistMsgIDLigaSA1(pWaitlistMsgIDLigaSA1){
        this.waitlistMsgIDLigaSA1 = pWaitlistMsgIDLigaSA1
    }    

    getWaitlistMsgIDLigaSA1(){
        return this.waitlistMsgIDLigaSA1
    }

    setLineupMsgLigaSA1(pLineupMsgLigaSA1){
        this.lineupMsgLigaSA1 = pLineupMsgLigaSA1
    }

    getLineupMsgLigaSA1(){
        return this.lineupMsgLigaSA1
    }

    setCurrentRegularDriversLigaSA1(pCurrentRegularDriversLigaSA1){
        this.currentRegularDriversLigaSA1 = pCurrentRegularDriversLigaSA1
    }

    getCurrentRegularDriversLigaSA1(){
        return this.currentRegularDriversLigaSA1
    }

    setMessageEmbedAnmeldenLigaSA1(pMessageEmbedAnmeldenLigaSA1){
        this.messageEmbedAnmeldenLigaSA1 = pMessageEmbedAnmeldenLigaSA1
    }

    getMessageEmbedAnmeldenLigaSA1(){
        return this.messageEmbedAnmeldenLigaSA1
    }

    setMessageEmbedAbmeldenLigaSA1(pMessageEmbedAbmeldenLigaSA1){
        this.messageEmbedAbmeldenLigaSA1 = pMessageEmbedAbmeldenLigaSA1
    }

    getMessageEmbedAbmeldenLigaSA1(){
        return this.messageEmbedAbmeldenLigaSA1
    }

    setAnmeldungActiveLigaSA1(pAnmeldungActiveLigaSA1){
        this.anmeldungActiveLigaSA1 = pAnmeldungActiveLigaSA1
    }

    getAnmeldungActiveLigaSA1(){
        return this.anmeldungActiveLigaSA1
    }

    setSeasonCalendarLigaSA1(pSeasonCalendarLigaSA1){
        this.seasonCalendarLigaSA1 = pSeasonCalendarLigaSA1
    }

    getSeasonCalendarLigaSA1(){
        return this.seasonCalendarLigaSA1
    }

    setSeasonCalendarRacesDoneLigaSA1(pSeasonCalendarRacesDoneLigaSA1){
        this.seasonCalendarRacesDoneLigaSA1 = pSeasonCalendarRacesDoneLigaSA1
    }

    getSeasonCalendarRacesDoneLigaSA1(){
        return this.seasonCalendarRacesDoneLigaSA1
    }

    setSeasonActiveLigaSA1(pSeasonActiveLigaSA1){
        this.seasonActiveLigaSA1 = pSeasonActiveLigaSA1
    }

    getSeasonActiveLigaSA1(){
        return this.seasonActiveLigaSA1
    }

    setStartLoopLigaSA1(pStartLoopLigaSA1){
        this.pStartLoopLigaSA1 = pStartLoopLigaSA1
    }

    getStartLoopLigaSA1(){
        return this.pStartLoopLigaSA1
    }

}

module.exports = Season
 