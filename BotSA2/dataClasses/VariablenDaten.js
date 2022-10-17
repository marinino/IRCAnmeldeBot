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
        
        // LIGA SA 2

        this.anmeldeChannelIDLigaSA2 = '1004370397376028722'; // ID: 1004370397376028722
        this.abmeldeChannelIDLigaSA2 = '1004370431832248320'; // ID: 1004370431832248320
        this.ersatzfahrerRolleIDLigaSA2 = '1004370368775069807'; // ID: 1004370368775069807
        this.stammfahrerRolleIDLigaSA2 = '1004370356397690910'; // ID: 1004370356397690910
        this.infoChannelIDLigaSA2 = '1004370315582898306'; // ID: 1004370315582898306
        
        // VARIABLEN

        // LIGA SA 2

        this.subPersonListLigaSA2 = []
        this.subPersonListReinstatedDriversLigaSA2 = []
        this.freeCarsLigaSA2 = []
        this.withdrawnDriversLigaSA2 = []
        this.withdrawnDriversPerCommandLigaSA2 = []
        this.subInDriversPerCommandLigaSA2 = []

        this.currentRaceLocationLigaSA2 = null

        this.reactedToSubInLigaSA2 = new Map()
        this.reactedToSignOutLigaSA2 = new Map()

        this.mercedesDriversLigaSA2 = []
        this.redBullDriversLigaSA2 = []
        this.ferrariDriversLigaSA2 = []
        this.mcLarenDriversLigaSA2 = []
        this.astonMartinDriversLigaSA2 = []
        this.alpineDriversLigaSA2 = []
        this.alphaTauriDriversLigaSA2 = []
        this.alfaRomeoDriversLigaSA2 = []
        this.williamsDriversLigaSA2 = []
        this.haasDriversLigaSA2 = []

        this.currentLineupLigaSA2 = new Map()
        this.regularDriversLigaSA2 = new Map()

        this.freeCarMsgIDLigaSA2 = null
        this.waitlistMsgIDLigaSA2 = null
        this.lineupMsgLigaSA2 = null
        this.currentRegularDriversLigaSA2 = null

        this.messageEmbedAnmeldenLigaSA2 = null
        this.messageEmbedAbmeldenLigaSA2 = null

        this.anmeldungActiveLigaSA2 = false
        this.seasonCalendarLigaSA2 = []
        this.seasonCalendarRacesDoneLigaSA2 = []
        this.seasonActiveLigaSA2 = false

        this.startLoopSA2 = null
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

    // LIGA SA 2

    getAnmeldeChannelIDLigaSA2(){
        return this.anmeldeChannelIDLigaSA2
    }

    getAbmeldeChannelIDLigaSA2(){
        return this.abmeldeChannelIDLigaSA2
    }

    getErsatzfahrerRolleIDLigaSA2(){
        return this.ersatzfahrerRolleIDLigaSA2
    }

    getStammfahrerRolleIDLigaSA2(){
        return this.stammfahrerRolleIDLigaSA2
    }

    getInfoChannelIDLigaSA2(){
        return this.infoChannelIDLigaSA2
    }

    // VARIABLEN

    // LIGA SA 2

    getSubPersonListLigaSA2() {
        return this.subPersonListLigaSA2;
    }

    setSubPersonListLigaSA2(pSubPersonListLigaSA2) {
        this.subPersonListLigaSA2 = pSubPersonListLigaSA2
    }

    getsubPersonListReinstatedDriversLigaSA2(){
        return this.subPersonListReinstatedDriversLigaSA2
    }

    setsubPersonListReinstatedDriversLigaSA2(pSubPersonListReinstatedDriversLigaSA2){
        this.subPersonListReinstatedDriversLigaSA2 = pSubPersonListReinstatedDriversLigaSA2
    }

    getFreeCarsLigaSA2(){
        return this.freeCarsLigaSA2
    }

    setFreeCarsLigaSA2(pFreeCarsLigaSA2){
        this.freeCarsLigaSA2 = pFreeCarsLigaSA2
    }

    getWithdrawnDriversLigaSA2(){
        return this.withdrawnDriversLigaSA2
    }

    setWithdrawnDriversLigaSA2(pWithdrawnDriversLigaSA2){
        this.withdrawnDriversLigaSA2 = pWithdrawnDriversLigaSA2
    }

    getWithdrawnDriversPerCommandLigaSA2(){
        return this.withdrawnDriversPerCommandLigaSA2
    }

    setWithdrawnDriversPerCommandLigaSA2(pWithdrawnDriversPerCommandLigaSA2){
        this.withdrawnDriversPerCommandLigaSA2 = pWithdrawnDriversPerCommandLigaSA2
    }

    getSubInDriversPerCommandLigaSA2(){
        return this.subInDriversPerCommandLigaSA2
    }

    setSubInDriversPerCommandLigaSA2(pSubInDriversPerCommandLigaSA2){
        this.subInDriversPerCommandLigaSA2 = pSubInDriversPerCommandLigaSA2
    }    

    getCurrentRaceLocationLigaSA2(){
        return this.currentRaceLocationLigaSA2
    }

    setCurrentRaceLocationLigaSA2(pCurrentRaceLocationLigaSA2){
        this.currentRaceLocationLigaSA2 = pCurrentRaceLocationLigaSA2
    }

    getReactedToSubInLigaSA2(){
        return this.reactedToSubInLigaSA2
    }

    setReactedToSubInLigaSA2(pReactedToSubInLigaSA2){
        this.reactedToSubInLigaSA2 = pReactedToSubInLigaSA2
    }

    getReactedToSignOutLigaSA2(){
        return this.reactedToSignOutLigaSA2
    }

    setReactedToSignOutLigaSA2(pReactedToSignOutLigaSA2){
        this.reactedToSignOutLigaSA2 = pReactedToSignOutLigaSA2
    }

    getMercedesDriversLigaSA2(){
        return this.mercedesDriversLigaSA2
    }

    setMercedesDriversLigaSA2(pMercedesDriversLigaSA2){
        this.mercedesDriversLigaSA2 = pMercedesDriversLigaSA2
    }

    getRedBullDriversLigaSA2(){
        return this.redBullDriversLigaSA2
    }

    setRedBullDriversLigaSA2(pRedBullDriversLigaSA2){
        this.redBullDriversLigaSA2 = pRedBullDriversLigaSA2
    }

    getFerrariDriversLigaSA2(){
        return this.ferrariDriversLigaSA2
    }

    setFerrariDriversLigaSA2(pFerrariDriversLigaSA2){
        this.ferrariDriversLigaSA2 = pFerrariDriversLigaSA2
    }

    getMcLarenDriversLigaSA2(){
        return this.mcLarenDriversLigaSA2
    }

    setMcLarenDriversLigaSA2(pMcLarenDriversLigaSA2){
        this.mcLarenDriversLigaSA2 = pMcLarenDriversLigaSA2
    }

    getAstonMartinDriversLigaSA2(){
        return this.astonMartinDriversLigaSA2
    }

    setAstonMartinDriversLigaSA2(pAstonMartinDriversLigaSA2){
        this.astonMartinDriversLigaSA2 = pAstonMartinDriversLigaSA2
    }

    getAlpineDriversLigaSA2(){
        return this.alpineDriversLigaSA2
    }

    setAlpineDriversLigaSA2(pAlpineDriversLigaSA2){
        this.alpineDriversLigaSA2 = pAlpineDriversLigaSA2
    }

    getAlphaTauriDriversLigaSA2(){
        return this.alphaTauriDriversLigaSA2
    }

    setAlphaTauriDriversLigaSA2(pAlphaTauriDriversLigaSA2){
        this.alphaTauriDriversLigaSA2 = pAlphaTauriDriversLigaSA2
    }

    getAlfaRomeoDriversLigaSA2(){
        return this.alfaRomeoDriversLigaSA2
    }

    setAlfaRomeoDriversLigaSA2(pAlfaRomeoDriversLigaSA2){
        this.alfaRomeoDriversLigaSA2 = pAlfaRomeoDriversLigaSA2
    }

    getWilliamsDriversLigaSA2(){
        return this.williamsDriversLigaSA2
    }

    setWilliamsDriversLigaSA2(pWilliamsDriversLigaSA2){
        this.williamsDriversLigaSA2 = pWilliamsDriversLigaSA2
    }

    getHaasDriversLigaSA2(){
        return this.haasDriversLigaSA2
    }

    setHaasDriversLigaSA2(pHaasDriversLigaSA2){
        this.haasDriversLigaSA2 = pHaasDriversLigaSA2
    }

    getCurrentLineupLigaSA2(){
        return this.currentLineupLigaSA2
    }

    setCurrentLineupLigaSA2(pCurrentLineupLigaSA2){
        this.currentLineupLigaSA2 = pCurrentLineupLigaSA2
    }    

    getRegularDriversLigaSA2(){
        return this.regularDriversLigaSA2
    }

    setRegularDriversLigaSA2(pRegularDriverLigaSA2){
        this.regularDriversLigaSA2 = pRegularDriverLigaSA2
    }

    setFreeCarMsgIDLigaSA2(pFreeCarMsgIDLigaSA2){
        this.freeCarMsgIDLigaSA2 = pFreeCarMsgIDLigaSA2
    }

    getFreeCarMsgIDLigaSA2(){
        return this.freeCarMsgIDLigaSA2
    }

    setWaitlistMsgIDLigaSA2(pWaitlistMsgIDLigaSA2){
        this.waitlistMsgIDLigaSA2 = pWaitlistMsgIDLigaSA2
    }    

    getWaitlistMsgIDLigaSA2(){
        return this.waitlistMsgIDLigaSA2
    }

    setLineupMsgLigaSA2(pLineupMsgLigaSA2){
        this.lineupMsgLigaSA2 = pLineupMsgLigaSA2
    }

    getLineupMsgLigaSA2(){
        return this.lineupMsgLigaSA2
    }

    setCurrentRegularDriversLigaSA2(pCurrentRegularDriversLigaSA2){
        this.currentRegularDriversLigaSA2 = pCurrentRegularDriversLigaSA2
    }

    getCurrentRegularDriversLigaSA2(){
        return this.currentRegularDriversLigaSA2
    }

    setMessageEmbedAnmeldenLigaSA2(pMessageEmbedAnmeldenLigaSA2){
        this.messageEmbedAnmeldenLigaSA2 = pMessageEmbedAnmeldenLigaSA2
    }

    getMessageEmbedAnmeldenLigaSA2(){
        return this.messageEmbedAnmeldenLigaSA2
    }

    setMessageEmbedAbmeldenLigaSA2(pMessageEmbedAbmeldenLigaSA2){
        this.messageEmbedAbmeldenLigaSA2 = pMessageEmbedAbmeldenLigaSA2
    }

    getMessageEmbedAbmeldenLigaSA2(){
        return this.messageEmbedAbmeldenLigaSA2
    }

    setAnmeldungActiveLigaSA2(pAnmeldungActiveLigaSA2){
        this.anmeldungActiveLigaSA2 = pAnmeldungActiveLigaSA2
    }

    getAnmeldungActiveLigaSA2(){
        return this.anmeldungActiveLigaSA2
    }

    setSeasonCalendarLigaSA2(pSeasonCalendarLigaSA2){
        this.seasonCalendarLigaSA2 = pSeasonCalendarLigaSA2
    }

    getSeasonCalendarLigaSA2(){
        return this.seasonCalendarLigaSA2
    }

    setSeasonCalendarRacesDoneLigaSA2(pSeasonCalendarRacesDoneLigaSA2){
        this.seasonCalendarRacesDoneLigaSA2 = pSeasonCalendarRacesDoneLigaSA2
    }

    getSeasonCalendarRacesDoneLigaSA2(){
        return this.seasonCalendarRacesDoneLigaSA2
    }

    setSeasonActiveLigaSA2(pSeasonActiveLigaSA2){
        this.seasonActiveLigaSA2 = pSeasonActiveLigaSA2
    }

    getSeasonActiveLigaSA2(){
        return this.seasonActiveLigaSA2
    }

    setStartLoopLigaSA2(pStartLoopLigaSA2){
        this.pStartLoopLigaSA2 = pStartLoopLigaSA2
    }

    getStartLoopLigaSA2(){
        return this.pStartLoopLigaSA2
    }

}

module.exports = Season
 