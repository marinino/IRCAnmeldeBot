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
        
        // LIGA ORIGIN

        this.anmeldeChannelIDLigaOrigin = '1004370770090283158'; // ID: 1004370770090283158
        this.abmeldeChannelIDLigaOrigin = '1004370845206052864'; // ID: 1004370845206052864     
        this.ersatzfahrerRolleIDLigaOrigin = '1004370371912417361'; // ID: 1004370371912417361     
        this.stammfahrerRolleIDLigaOrigin = '1004370361095299124'; // ID: 1004370361095299124
        this.infoChannelIDLigaOrigin = '1004370716646461520'; // ID: 1004370716646461520
        
        // VARIABLEN

        // LIGA ORIGIN

        this.subPersonListLigaOrigin = []
        this.subPersonListReinstatedDriversLigaOrigin = []
        this.freeCarsLigaOrigin = []
        this.withdrawnDriversLigaOrigin = []
        this.withdrawnDriversPerCommandLigaOrigin = []
        this.subInDriversPerCommandLigaOrigin = []

        this.currentRaceLocationLigaOrigin = null

        this.reactedToSubInLigaOrigin = new Map()
        this.reactedToSignOutLigaOrigin = new Map()

        this.mercedesDriversLigaOrigin = []
        this.redBullDriversLigaOrigin = []
        this.ferrariDriversLigaOrigin = []
        this.mcLarenDriversLigaOrigin = []
        this.astonMartinDriversLigaOrigin = []
        this.alpineDriversLigaOrigin = []
        this.alphaTauriDriversLigaOrigin = []
        this.alfaRomeoDriversLigaOrigin = []
        this.williamsDriversLigaOrigin = []
        this.haasDriversLigaOrigin = []

        this.currentLineupLigaOrigin = new Map()
        this.regularDriversLigaOrigin = new Map()

        this.freeCarMsgIDLigaOrigin = null
        this.waitlistMsgIDLigaOrigin = null
        this.lineupMsgLigaOrigin = null
        this.currentRegularDriversLigaOrigin = null

        this.messageEmbedAnmeldenLigaOrigin = null
        this.messageEmbedAbmeldenLigaOrigin = null

        this.anmeldungActiveLigaOrigin = false
        this.seasonCalendarLigaOrigin = []
        this.seasonCalendarRacesDoneLigaOrigin = []
        this.seasonActiveLigaOrigin = false

        this.startLoopOrigin = null
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

    // LIGA ORIGIN

    getAnmeldeChannelIDLigaOrigin(){
        return this.anmeldeChannelIDLigaOrigin
    }

    getAbmeldeChannelIDLigaOrigin(){
        return this.abmeldeChannelIDLigaOrigin
    }

    getErsatzfahrerRolleIDLigaOrigin(){
        return this.ersatzfahrerRolleIDLigaOrigin
    }

    getStammfahrerRolleIDLigaOrigin(){
        return this.stammfahrerRolleIDLigaOrigin
    }

    getInfoChannelIDLigaOrigin(){
        return this.infoChannelIDLigaOrigin
    }

    // VARIABLEN

    // LIGA ORIGIN

    getSubPersonListLigaOrigin() {
        return this.subPersonListLigaOrigin;
    }

    setSubPersonListLigaOrigin(pSubPersonListLigaOrigin) {
        this.subPersonListLigaOrigin = pSubPersonListLigaOrigin
    }

    getsubPersonListReinstatedDriversLigaOrigin(){
        return this.subPersonListReinstatedDriversLigaOrigin
    }

    setsubPersonListReinstatedDriversLigaOrigin(pSubPersonListReinstatedDriversLigaOrigin){
        this.subPersonListReinstatedDriversLigaOrigin = pSubPersonListReinstatedDriversLigaOrigin
    }

    getFreeCarsLigaOrigin(){
        return this.freeCarsLigaOrigin
    }

    setFreeCarsLigaOrigin(pFreeCarsLigaOrigin){
        this.freeCarsLigaOrigin = pFreeCarsLigaOrigin
    }

    getWithdrawnDriversLigaOrigin(){
        return this.withdrawnDriversLigaOrigin
    }

    setWithdrawnDriversLigaOrigin(pWithdrawnDriversLigaOrigin){
        this.withdrawnDriversLigaOrigin = pWithdrawnDriversLigaOrigin
    }

    getWithdrawnDriversPerCommandLigaOrigin(){
        return this.withdrawnDriversPerCommandLigaOrigin
    }

    setWithdrawnDriversPerCommandLigaOrigin(pWithdrawnDriversPerCommandLigaOrigin){
        this.withdrawnDriversPerCommandLigaOrigin = pWithdrawnDriversPerCommandLigaOrigin
    }

    getSubInDriversPerCommandLigaOrigin(){
        return this.subInDriversPerCommandLigaOrigin
    }

    setSubInDriversPerCommandLigaOrigin(pSubInDriversPerCommandLigaOrigin){
        this.subInDriversPerCommandLigaOrigin = pSubInDriversPerCommandLigaOrigin
    }    

    getCurrentRaceLocationLigaOrigin(){
        return this.currentRaceLocationLigaOrigin
    }

    setCurrentRaceLocationLigaOrigin(pCurrentRaceLocationLigaOrigin){
        this.currentRaceLocationLigaOrigin = pCurrentRaceLocationLigaOrigin
    }

    getReactedToSubInLigaOrigin(){
        return this.reactedToSubInLigaOrigin
    }

    setReactedToSubInLigaOrigin(pReactedToSubInLigaOrigin){
        this.reactedToSubInLigaOrigin = pReactedToSubInLigaOrigin
    }

    getReactedToSignOutLigaOrigin(){
        return this.reactedToSignOutLigaOrigin
    }

    setReactedToSignOutLigaOrigin(pReactedToSignOutLigaOrigin){
        this.reactedToSignOutLigaOrigin = pReactedToSignOutLigaOrigin
    }

    getMercedesDriversLigaOrigin(){
        return this.mercedesDriversLigaOrigin
    }

    setMercedesDriversLigaOrigin(pMercedesDriversLigaOrigin){
        this.mercedesDriversLigaOrigin = pMercedesDriversLigaOrigin
    }

    getRedBullDriversLigaOrigin(){
        return this.redBullDriversLigaOrigin
    }

    setRedBullDriversLigaOrigin(pRedBullDriversLigaOrigin){
        this.redBullDriversLigaOrigin = pRedBullDriversLigaOrigin
    }

    getFerrariDriversLigaOrigin(){
        return this.ferrariDriversLigaOrigin
    }

    setFerrariDriversLigaOrigin(pFerrariDriversLigaOrigin){
        this.ferrariDriversLigaOrigin = pFerrariDriversLigaOrigin
    }

    getMcLarenDriversLigaOrigin(){
        return this.mcLarenDriversLigaOrigin
    }

    setMcLarenDriversLigaOrigin(pMcLarenDriversLigaOrigin){
        this.mcLarenDriversLigaOrigin = pMcLarenDriversLigaOrigin
    }

    getAstonMartinDriversLigaOrigin(){
        return this.astonMartinDriversLigaOrigin
    }

    setAstonMartinDriversLigaOrigin(pAstonMartinDriversLigaOrigin){
        this.astonMartinDriversLigaOrigin = pAstonMartinDriversLigaOrigin
    }

    getAlpineDriversLigaOrigin(){
        return this.alpineDriversLigaOrigin
    }

    setAlpineDriversLigaOrigin(pAlpineDriversLigaOrigin){
        this.alpineDriversLigaOrigin = pAlpineDriversLigaOrigin
    }

    getAlphaTauriDriversLigaOrigin(){
        return this.alphaTauriDriversLigaOrigin
    }

    setAlphaTauriDriversLigaOrigin(pAlphaTauriDriversLigaOrigin){
        this.alphaTauriDriversLigaOrigin = pAlphaTauriDriversLigaOrigin
    }

    getAlfaRomeoDriversLigaOrigin(){
        return this.alfaRomeoDriversLigaOrigin
    }

    setAlfaRomeoDriversLigaOrigin(pAlfaRomeoDriversLigaOrigin){
        this.alfaRomeoDriversLigaOrigin = pAlfaRomeoDriversLigaOrigin
    }

    getWilliamsDriversLigaOrigin(){
        return this.williamsDriversLigaOrigin
    }

    setWilliamsDriversLigaOrigin(pWilliamsDriversLigaOrigin){
        this.williamsDriversLigaOrigin = pWilliamsDriversLigaOrigin
    }

    getHaasDriversLigaOrigin(){
        return this.haasDriversLigaOrigin
    }

    setHaasDriversLigaOrigin(pHaasDriversLigaOrigin){
        this.haasDriversLigaOrigin = pHaasDriversLigaOrigin
    }

    getCurrentLineupLigaOrigin(){
        return this.currentLineupLigaOrigin
    }

    setCurrentLineupLigaOrigin(pCurrentLineupLigaOrigin){
        this.currentLineupLigaOrigin = pCurrentLineupLigaOrigin
    }    

    getRegularDriversLigaOrigin(){
        return this.regularDriversLigaOrigin
    }

    setRegularDriversLigaOrigin(pRegularDriverLigaOrigin){
        this.regularDriversLigaOrigin = pRegularDriverLigaOrigin
    }

    setFreeCarMsgIDLigaOrigin(pFreeCarMsgIDLigaOrigin){
        this.freeCarMsgIDLigaOrigin = pFreeCarMsgIDLigaOrigin
    }

    getFreeCarMsgIDLigaOrigin(){
        return this.freeCarMsgIDLigaOrigin
    }

    setWaitlistMsgIDLigaOrigin(pWaitlistMsgIDLigaOrigin){
        this.waitlistMsgIDLigaOrigin = pWaitlistMsgIDLigaOrigin
    }    

    getWaitlistMsgIDLigaOrigin(){
        return this.waitlistMsgIDLigaOrigin
    }

    setLineupMsgLigaOrigin(pLineupMsgLigaOrigin){
        this.lineupMsgLigaOrigin = pLineupMsgLigaOrigin
    }

    getLineupMsgLigaOrigin(){
        return this.lineupMsgLigaOrigin
    }

    setCurrentRegularDriversLigaOrigin(pCurrentRegularDriversLigaOrigin){
        this.currentRegularDriversLigaOrigin = pCurrentRegularDriversLigaOrigin
    }

    getCurrentRegularDriversLigaOrigin(){
        return this.currentRegularDriversLigaOrigin
    }

    setMessageEmbedAnmeldenLigaOrigin(pMessageEmbedAnmeldenLigaOrigin){
        this.messageEmbedAnmeldenLigaOrigin = pMessageEmbedAnmeldenLigaOrigin
    }

    getMessageEmbedAnmeldenLigaOrigin(){
        return this.messageEmbedAnmeldenLigaOrigin
    }

    setMessageEmbedAbmeldenLigaOrigin(pMessageEmbedAbmeldenLigaOrigin){
        this.messageEmbedAbmeldenLigaOrigin = pMessageEmbedAbmeldenLigaOrigin
    }

    getMessageEmbedAbmeldenLigaOrigin(){
        return this.messageEmbedAbmeldenLigaOrigin
    }

    setAnmeldungActiveLigaOrigin(pAnmeldungActiveLigaOrigin){
        this.anmeldungActiveLigaOrigin = pAnmeldungActiveLigaOrigin
    }

    getAnmeldungActiveLigaOrigin(){
        return this.anmeldungActiveLigaOrigin
    }

    setSeasonCalendarLigaOrigin(pSeasonCalendarLigaOrigin){
        this.seasonCalendarLigaOrigin = pSeasonCalendarLigaOrigin
    }

    getSeasonCalendarLigaOrigin(){
        return this.seasonCalendarLigaOrigin
    }

    setSeasonCalendarRacesDoneLigaOrigin(pSeasonCalendarRacesDoneLigaOrigin){
        this.seasonCalendarRacesDoneLigaOrigin = pSeasonCalendarRacesDoneLigaOrigin
    }

    getSeasonCalendarRacesDoneLigaOrigin(){
        return this.seasonCalendarRacesDoneLigaOrigin
    }

    setSeasonActiveLigaOrigin(pSeasonActiveLigaOrigin){
        this.seasonActiveLigaOrigin = pSeasonActiveLigaOrigin
    }

    getSeasonActiveLigaOrigin(){
        return this.seasonActiveLigaOrigin
    }

    setStartLoopLigaOrigin(pStartLoopLigaOrigin){
        this.pStartLoopLigaOrigin = pStartLoopLigaOrigin
    }

    getStartLoopLigaOrigin(){
        return this.pStartLoopLigaOrigin
    }

}

module.exports = Season
 