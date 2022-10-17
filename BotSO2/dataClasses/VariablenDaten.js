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

        // LIGA SO 2

        this.anmeldeChannelIDLigaSO2 = '857658929226973225'; // ID: 857658929226973225
        this.abmeldeChannelIDLigaSO2 = '869237098669043732'; // ID: 869237098669043732
        this.ersatzfahrerRolleIDLigaSO2 = '734888172097503323'; // ID: 734888172097503323
        this.stammfahrerRolleIDLigaSO2 = '843566503026884608'; // ID: 843566503026884608
        this.infoChannelIDLigaSO2 = '1004376605214392401'; // ID: 1004376605214392401

        // VARIABLEN

        // LIGA SO 2

        this.subPersonListLigaSO2 = []
        this.subPersonListReinstatedDriversLigaSO2 = []
        this.freeCarsLigaSO2 = []
        this.withdrawnDriversLigaSO2 = []
        this.withdrawnDriversPerCommandLigaSO2 = []
        this.subInDriversPerCommandLigaSO2 = []

        this.currentRaceLocationLigaSO2 = null

        this.reactedToSubInLigaSO2 = new Map()
        this.reactedToSignOutLigaSO2 = new Map()

        this.mercedesDriversLigaSO2 = []
        this.redBullDriversLigaSO2 = []
        this.ferrariDriversLigaSO2 = []
        this.mcLarenDriversLigaSO2 = []
        this.astonMartinDriversLigaSO2 = []
        this.alpineDriversLigaSO2 = []
        this.alphaTauriDriversLigaSO2 = []
        this.alfaRomeoDriversLigaSO2 = []
        this.williamsDriversLigaSO2 = []
        this.haasDriversLigaSO2 = []

        this.currentLineupLigaSO2 = new Map()
        this.regularDriversLigaSO2 = new Map()

        this.freeCarMsgIDLigaSO2 = null
        this.waitlistMsgIDLigaSO2 = null
        this.lineupMsgLigaSO2 = null
        this.currentRegularDriversLigaSO2 = null

        this.messageEmbedAnmeldenLigaSO2 = null
        this.messageEmbedAbmeldenLigaSO2 = null

        this.anmeldungActiveLigaSO2 = false
        this.seasonCalendarLigaSO2 = []
        this.seasonCalendarRacesDoneLigaSO2 = []
        this.seasonActiveLigaSO2 = false

        this.startLoopSO2 = null
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

    // LIGA SO 2

    getAnmeldeChannelIDLigaSO2(){
        return this.anmeldeChannelIDLigaSO2
    }

    getAbmeldeChannelIDLigaSO2(){
        return this.abmeldeChannelIDLigaSO2
    }

    getErsatzfahrerRolleIDLigaSO2(){
        return this.ersatzfahrerRolleIDLigaSO2
    }

    getStammfahrerRolleIDLigaSO2(){
        return this.stammfahrerRolleIDLigaSO2
    }

    getInfoChannelIDLigaSO2(){
        return this.infoChannelIDLigaSO2
    }

    // VARIABLEN

    // LIGA SO 1

    getSubPersonListLigaSO2() {
        return this.subPersonListLigaSO2;
    }

    setSubPersonListLigaSO2(pSubPersonListLigaSO2) {
        this.subPersonListLigaSO2 = pSubPersonListLigaSO2
    }

    getsubPersonListReinstatedDriversLigaSO2(){
        return this.subPersonListReinstatedDriversLigaSO2
    }

    setsubPersonListReinstatedDriversLigaSO2(pSubPersonListReinstatedDriversLigaSO2){
        this.subPersonListReinstatedDriversLigaSO2 = pSubPersonListReinstatedDriversLigaSO2
    }

    getFreeCarsLigaSO2(){
        return this.freeCarsLigaSO2
    }

    setFreeCarsLigaSO2(pFreeCarsLigaSO2){
        this.freeCarsLigaSO2 = pFreeCarsLigaSO2
    }

    getWithdrawnDriversLigaSO2(){
        return this.withdrawnDriversLigaSO2
    }

    setWithdrawnDriversLigaSO2(pWithdrawnDriversLigaSO2){
        this.withdrawnDriversLigaSO2 = pWithdrawnDriversLigaSO2
    }

    getWithdrawnDriversPerCommandLigaSO2(){
        return this.withdrawnDriversPerCommandLigaSO2
    }

    setWithdrawnDriversPerCommandLigaSO2(pWithdrawnDriversPerCommandLigaSO2){
        this.withdrawnDriversPerCommandLigaSO2 = pWithdrawnDriversPerCommandLigaSO2
    }

    getSubInDriversPerCommandLigaSO2(){
        return this.subInDriversPerCommandLigaSO2
    }

    setSubInDriversPerCommandLigaSO2(pSubInDriversPerCommandLigaSO2){
        this.subInDriversPerCommandLigaSO2 = pSubInDriversPerCommandLigaSO2
    }    

    getCurrentRaceLocationLigaSO2(){
        return this.currentRaceLocationLigaSO2
    }

    setCurrentRaceLocationLigaSO2(pCurrentRaceLocationLigaSO2){
        this.currentRaceLocationLigaSO2 = pCurrentRaceLocationLigaSO2
    }

    getReactedToSubInLigaSO2(){
        return this.reactedToSubInLigaSO2
    }

    setReactedToSubInLigaSO2(pReactedToSubInLigaSO2){
        this.reactedToSubInLigaSO2 = pReactedToSubInLigaSO2
    }

    getReactedToSignOutLigaSO2(){
        return this.reactedToSignOutLigaSO2
    }

    setReactedToSignOutLigaSO2(pReactedToSignOutLigaSO2){
        this.reactedToSignOutLigaSO2 = pReactedToSignOutLigaSO2
    }

    getMercedesDriversLigaSO2(){
        return this.mercedesDriversLigaSO2
    }

    setMercedesDriversLigaSO2(pMercedesDriversLigaSO2){
        this.mercedesDriversLigaSO2 = pMercedesDriversLigaSO2
    }

    getRedBullDriversLigaSO2(){
        return this.redBullDriversLigaSO2
    }

    setRedBullDriversLigaSO2(pRedBullDriversLigaSO2){
        this.redBullDriversLigaSO2 = pRedBullDriversLigaSO2
    }

    getFerrariDriversLigaSO2(){
        return this.ferrariDriversLigaSO2
    }

    setFerrariDriversLigaSO2(pFerrariDriversLigaSO2){
        this.ferrariDriversLigaSO2 = pFerrariDriversLigaSO2
    }

    getMcLarenDriversLigaSO2(){
        return this.mcLarenDriversLigaSO2
    }

    setMcLarenDriversLigaSO2(pMcLarenDriversLigaSO2){
        this.mcLarenDriversLigaSO2 = pMcLarenDriversLigaSO2
    }

    getAstonMartinDriversLigaSO2(){
        return this.astonMartinDriversLigaSO2
    }

    setAstonMartinDriversLigaSO2(pAstonMartinDriversLigaSO2){
        this.astonMartinDriversLigaSO2 = pAstonMartinDriversLigaSO2
    }

    getAlpineDriversLigaSO2(){
        return this.alpineDriversLigaSO2
    }

    setAlpineDriversLigaSO2(pAlpineDriversLigaSO2){
        this.alpineDriversLigaSO2 = pAlpineDriversLigaSO2
    }

    getAlphaTauriDriversLigaSO2(){
        return this.alphaTauriDriversLigaSO2
    }

    setAlphaTauriDriversLigaSO2(pAlphaTauriDriversLigaSO2){
        this.alphaTauriDriversLigaSO2 = pAlphaTauriDriversLigaSO2
    }

    getAlfaRomeoDriversLigaSO2(){
        return this.alfaRomeoDriversLigaSO2
    }

    setAlfaRomeoDriversLigaSO2(pAlfaRomeoDriversLigaSO2){
        this.alfaRomeoDriversLigaSO2 = pAlfaRomeoDriversLigaSO2
    }

    getWilliamsDriversLigaSO2(){
        return this.williamsDriversLigaSO2
    }

    setWilliamsDriversLigaSO2(pWilliamsDriversLigaSO2){
        this.williamsDriversLigaSO2 = pWilliamsDriversLigaSO2
    }

    getHaasDriversLigaSO2(){
        return this.haasDriversLigaSO2
    }

    setHaasDriversLigaSO2(pHaasDriversLigaSO2){
        this.haasDriversLigaSO2 = pHaasDriversLigaSO2
    }

    getCurrentLineupLigaSO2(){
        return this.currentLineupLigaSO2
    }

    setCurrentLineupLigaSO2(pCurrentLineupLigaSO2){
        this.currentLineupLigaSO2 = pCurrentLineupLigaSO2
    }    

    getRegularDriversLigaSO2(){
        return this.regularDriversLigaSO2
    }

    setRegularDriversLigaSO2(pRegularDriverLigaSO2){
        this.regularDriversLigaSO2 = pRegularDriverLigaSO2
    }

    setFreeCarMsgIDLigaSO2(pFreeCarMsgIDLigaSO2){
        this.freeCarMsgIDLigaSO2 = pFreeCarMsgIDLigaSO2
    }

    getFreeCarMsgIDLigaSO2(){
        return this.freeCarMsgIDLigaSO2
    }

    setWaitlistMsgIDLigaSO2(pWaitlistMsgIDLigaSO2){
        this.waitlistMsgIDLigaSO2 = pWaitlistMsgIDLigaSO2
    }    

    getWaitlistMsgIDLigaSO2(){
        return this.waitlistMsgIDLigaSO2
    }

    setLineupMsgLigaSO2(pLineupMsgLigaSO2){
        this.lineupMsgLigaSO2 = pLineupMsgLigaSO2
    }

    getLineupMsgLigaSO2(){
        return this.lineupMsgLigaSO2
    }

    setCurrentRegularDriversLigaSO2(pCurrentRegularDriversLigaSO2){
        this.currentRegularDriversLigaSO2 = pCurrentRegularDriversLigaSO2
    }

    getCurrentRegularDriversLigaSO2(){
        return this.currentRegularDriversLigaSO2
    }

    setMessageEmbedAnmeldenLigaSO2(pMessageEmbedAnmeldenLigaSO2){
        this.messageEmbedAnmeldenLigaSO2 = pMessageEmbedAnmeldenLigaSO2
    }

    getMessageEmbedAnmeldenLigaSO2(){
        return this.messageEmbedAnmeldenLigaSO2
    }

    setMessageEmbedAbmeldenLigaSO2(pMessageEmbedAbmeldenLigaSO2){
        this.messageEmbedAbmeldenLigaSO2 = pMessageEmbedAbmeldenLigaSO2
    }

    getMessageEmbedAbmeldenLigaSO2(){
        return this.messageEmbedAbmeldenLigaSO2
    }

    setAnmeldungActiveLigaSO2(pAnmeldungActiveLigaSO2){
        this.anmeldungActiveLigaSO2 = pAnmeldungActiveLigaSO2
    }

    getAnmeldungActiveLigaSO2(){
        return this.anmeldungActiveLigaSO2
    }

    setSeasonCalendarLigaSO2(pSeasonCalendarLigaSO2){
        this.seasonCalendarLigaSO2 = pSeasonCalendarLigaSO2
    }

    getSeasonCalendarLigaSO2(){
        return this.seasonCalendarLigaSO2
    }

    setSeasonCalendarRacesDoneLigaSO2(pSeasonCalendarRacesDoneLigaSO2){
        this.seasonCalendarRacesDoneLigaSO2 = pSeasonCalendarRacesDoneLigaSO2
    }

    getSeasonCalendarRacesDoneLigaSO2(){
        return this.seasonCalendarRacesDoneLigaSO2
    }

    setSeasonActiveLigaSO2(pSeasonActiveLigaSO2){
        this.seasonActiveLigaSO2 = pSeasonActiveLigaSO2
    }

    getSeasonActiveLigaSO2(){
        return this.seasonActiveLigaSO2
    }

    setStartLoopLigaSO2(pStartLoopLigaSO2){
        this.pStartLoopLigaSO2 = pStartLoopLigaSO2
    }

    getStartLoopLigaSO2(){
        return this.pStartLoopLigaSO2
    }

}

module.exports = Season
 