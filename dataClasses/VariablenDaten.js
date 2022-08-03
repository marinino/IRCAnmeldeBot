class Season {

    constructor() {
        this.ligatitel = ''
        this.anmeldeChannelIDLiga1 = '947229976997007384';
        this.anmeldeChannelIDLiga2 = '947229977248690211';
        this.anmeldeChannelIDLiga3 = '947229977567428632';
        this.abmeldeChannelIDLiga1 = '947229976997007385';
        this.abmeldeChannelIDLiga2 = '947229977248690212';
        this.abmeldeChannelIDLiga3 = '947229977567428633';
        this.ersatzfahrerRolleIDLiga1 = '947229969686335531';
        this.ersatzfahrerRolleIDLiga2 = '947229969686335530';
        this.ersatzfahrerRolleIDLiga3 = '947229969686335529';
        this.stammfahrerRolleIDLiga1 = '947229969686335536';
        this.stammfahrerRolleIDLiga2 = '947229969686335535';
        this.stammfahrerRolleIDLiga3 = '947229969686335534';
        this.rennleiterRolleID = '947229969711521867';
        this.ligaleiterRolleID = '736929944646713355';
        this.infoChannelIDLiga1 = '947229976997007383';
        this.infoChannelIDLiga2 = '947229977248690210';
        this.infoChannelIDLiga3 = '947229977567428631';
        this.commandChannelID = '947229975671615492';
        this.logChannelID = '947229975671615493';
        this.teamsChannelID = '947229976825049124';
        this.ehemaligerFahrerRolle = '947229969640222735';
        this.fahrerF1Rolle = '947229969640222734';

        this.discordID = '947229969438896128';

        this.mercedesRolleID = '947229969673760816';  
        this.redBullRolleID = '947229969673760812';  
        this.ferrariRolleID = '947229969673760814'
        this.mcLarenRolleID = '947229969656971368'
        this.astonMartinRolleID = '947229969656971364'
        this.alpineRolleID = '947229969673760810'
        this.alphaTauriRolleID = '947229969656971372'
        this.alfaRomeoRolleID = '947229969656971370'
        this.williamsRolleID = '947229969656971366'
        this.haasRolleID = '947229969673760808'

        this.anmeldenEmoji = '✅';
        this.abmeldenEmoji = '❌';

        /////////////////////////////////////////////////////

        this.subPersonListLiga1 = []
        this.subPersonListReinstatedDriversLiga1 = []
        this.freeCarsLiga1 = []
        this.withdrawnDriversLiga1 = []
        this.withdrawnDriversPerCommandLiga1 = []
        this.subInDriversPerCommandLiga1 = []

        this.currentRaceLocationLiga1 = null

        this.reactedToSubInLiga1 = new Map()
        this.reactedToSignOutLiga1 = new Map()

        this.mercedesDriversLiga1 = []
        this.redBullDriversLiga1 = []
        this.ferrariDriversLiga1 = []
        this.mcLarenDriversLiga1 = []
        this.astonMartinDriversLiga1 = []
        this.alpineDriversLiga1 = []
        this.alphaTauriDriversLiga1 = []
        this.alfaRomeoDriversLiga1 = []
        this.williamsDriversLiga1 = []
        this.haasDriversLiga1 = []

        this.currentLineupLiga1 = new Map()
        this.regularDriversLiga1 = new Map()

        this.freeCarMsgIDLiga1 = null
        this.waitlistMsgIDLiga1 = null
        this.lineupMsgLiga1 = null
        this.currentRegularDriversLiga1 = null

        this.messageEmbedAnmeldenLiga1 = null
        this.messageEmbedAbmeldenLiga1 = null

        this.anmeldungActiveLiga1 = false
        this.seasonCalendarLiga1 = []
        this.seasonCalendarRacesDoneLiga1 = []
        this.seasonActiveLiga1 = false

        this.startLoop1 = null

        ////////////////////////////////////////////////////////

        this.subPersonListLiga2 = []
        this.subPersonListReinstatedDriversLiga2 = []
        this.freeCarsLiga2 = []
        this.withdrawnDriversLiga2 = []
        this.withdrawnDriversPerCommandLiga2 = []
        this.subInDriversPerCommandLiga2 = []

        this.currentRaceLocationLiga2 = null

        this.reactedToSubInLiga2 = new Map()
        this.reactedToSignOutLiga2 = new Map()

        this.mercedesDriversLiga2 = []
        this.redBullDriversLiga2 = []
        this.ferrariDriversLiga2 = []
        this.mcLarenDriversLiga2 = []
        this.astonMartinDriversLiga2 = []
        this.alpineDriversLiga2 = []
        this.alphaTauriDriversLiga2 = []
        this.alfaRomeoDriversLiga2 = []
        this.williamsDriversLiga2 = []
        this.haasDriversLiga2 = []

        this.currentLineupLiga2 = new Map()
        this.regularDriversLiga2 = new Map()

        this.freeCarMsgIDLiga2 = null
        this.waitlistMsgIDLiga2 = null
        this.lineupMsgLiga2 = null
        this.currentRegularDriversLiga2 = null

        this.messageEmbedAnmeldenLiga2 = null
        this.messageEmbedAbmeldenLiga2 = null

        this.anmeldungActiveLiga2 = false
        this.seasonCalendarLiga2 = []
        this.seasonCalendarRacesDoneLiga2 = []
        this.seasonActiveLiga2 = false

        this.startLoop2 = null

        ////////////////////////////////////////////////////

        this.subPersonListLiga3 = []
        this.subPersonListReinstatedDriversLiga3 = []
        this.freeCarsLiga3 = []
        this.withdrawnDriversLiga3 = []
        this.withdrawnDriversPerCommandLiga3 = []
        this.subInDriversPerCommandLiga3 = []

        this.currentRaceLocationLiga3 = null

        this.reactedToSubInLiga3 = new Map()
        this.reactedToSignOutLiga3 = new Map()

        this.mercedesDriversLiga3 = []
        this.redBullDriversLiga3 = []
        this.ferrariDriversLiga3 = []
        this.mcLarenDriversLiga3 = []
        this.astonMartinDriversLiga3 = []
        this.alpineDriversLiga3 = []
        this.alphaTauriDriversLiga3 = []
        this.alfaRomeoDriversLiga3 = []
        this.williamsDriversLiga3 = []
        this.haasDriversLiga3 = []

        this.currentLineupLiga3 = new Map()
        this.regularDriversLiga3 = new Map()

        this.freeCarMsgIDLiga3 = null
        this.waitlistMsgIDLiga3 = null
        this.lineupMsgLiga3 = null
        this.currentRegularDriversLiga3 = null

        this.messageEmbedAnmeldenLiga3 = null
        this.messageEmbedAbmeldenLiga3 = null

        this.anmeldungActiveLiga3 = false
        this.seasonCalendarLiga3 = []
        this.seasonCalendarRacesDoneLiga3 = []
        this.seasonActiveLiga3 = false

        this.startLoop3 = null
    }

    getSubPersonListLiga2() {
        return this.subPersonListLiga2;
    }

    setSubPersonListLiga2(pSubPersonListLiga2) {
        this.subPersonListLiga2 = pSubPersonListLiga2
    }

    getsubPersonListReinstatedDriversLiga2(){
        return this.subPersonListReinstatedDriversLiga2
    }

    setsubPersonListReinstatedDriversLiga2(pSubPersonListReinstatedDriversLiga2){
        this.subPersonListReinstatedDriversLiga2 = pSubPersonListReinstatedDriversLiga2
    }

    getFreeCarsLiga2(){
        return this.freeCarsLiga2
    }

    setFreeCarsLiga2(pFreeCarsLiga2){
        this.freeCarsLiga2 = pFreeCarsLiga2
    }

    getWithdrawnDriversLiga2(){
        return this.withdrawnDriversLiga2
    }

    setWithdrawnDriversLiga2(pWithdrawnDriversLiga2){
        this.withdrawnDriversLiga2 = pWithdrawnDriversLiga2
    }

    getWithdrawnDriversPerCommandLiga2(){
        return this.withdrawnDriversPerCommandLiga2
    }

    setWithdrawnDriversPerCommandLiga2(pWithdrawnDriversPerCommandLiga2){
        this.withdrawnDriversPerCommandLiga2 = pWithdrawnDriversPerCommandLiga2
    }

    getSubInDriversPerCommandLiga2(){
        return this.subInDriversPerCommandLiga2
    }

    setSubInDriversPerCommandLiga2(pSubInDriversPerCommandLiga2){
        this.subInDriversPerCommandLiga2 = pSubInDriversPerCommandLiga2
    }    

    getCurrentRaceLocationLiga2(){
        return this.currentRaceLocationLiga2
    }

    setCurrentRaceLocationLiga2(pCurrentRaceLocationLiga2){
        this.currentRaceLocationLiga2 = pCurrentRaceLocationLiga2
    }

    getReactedToSubInLiga2(){
        return this.reactedToSubInLiga2
    }

    setReactedToSubInLiga2(pReactedToSubInLiga2){
        this.reactedToSubInLiga2 = pReactedToSubInLiga2
    }

    getReactedToSignOutLiga2(){
        return this.reactedToSignOutLiga2
    }

    setReactedToSignOutLiga2(pReactedToSignOutLiga2){
        this.reactedToSignOutLiga2 = pReactedToSignOutLiga2
    }

    getMercedesDriversLiga2(){
        return this.mercedesDriversLiga2
    }

    setMercedesDriversLiga2(pMercedesDriversLiga2){
        this.mercedesDriversLiga2 = pMercedesDriversLiga2
    }

    getRedBullDriversLiga2(){
        return this.redBullDriversLiga2
    }

    setRedBullDriversLiga2(pRedBullDriversLiga2){
        this.redBullDriversLiga2 = pRedBullDriversLiga2
    }

    getFerrariDriversLiga2(){
        return this.ferrariDriversLiga2
    }

    setFerrariDriversLiga2(pFerrariDriversLiga2){
        this.ferrariDriversLiga2 = pFerrariDriversLiga2
    }

    getMcLarenDriversLiga2(){
        return this.mcLarenDriversLiga2
    }

    setMcLarenDriversLiga2(pMcLarenDriversLiga2){
        this.mcLarenDriversLiga2 = pMcLarenDriversLiga2
    }

    getAstonMartinDriversLiga2(){
        return this.astonMartinDriversLiga2
    }

    setAstonMartinDriversLiga2(pAstonMartinDriversLiga2){
        this.astonMartinDriversLiga2 = pAstonMartinDriversLiga2
    }

    getAlpineDriversLiga2(){
        return this.alpineDriversLiga2
    }

    setAlpineDriversLiga2(pAlpineDriversLiga2){
        this.alpineDriversLiga2 = pAlpineDriversLiga2
    }

    getAlphaTauriDriversLiga2(){
        return this.alphaTauriDriversLiga2
    }

    setAlphaTauriDriversLiga2(pAlphaTauriDriversLiga2){
        this.alphaTauriDriversLiga2 = pAlphaTauriDriversLiga2
    }

    getAlfaRomeoDriversLiga2(){
        return this.alfaRomeoDriversLiga2
    }

    setAlfaRomeoDriversLiga2(pAlfaRomeoDriversLiga2){
        this.alfaRomeoDriversLiga2 = pAlfaRomeoDriversLiga2
    }

    getWilliamsDriversLiga2(){
        return this.williamsDriversLiga2
    }

    setWilliamsDriversLiga2(pWilliamsDriversLiga2){
        this.williamsDriversLiga2 = pWilliamsDriversLiga2
    }

    getHaasDriversLiga2(){
        return this.haasDriversLiga2
    }

    setHaasDriversLiga2(pHaasDriversLiga2){
        this.haasDriversLiga2 = pHaasDriversLiga2
    }

    getCurrentLineupLiga2(){
        return this.currentLineupLiga2
    }

    setCurrentLineupLiga2(pCurrentLineupLiga2){
        this.currentLineupLiga2 = pCurrentLineupLiga2
    }    

    getRegularDriversLiga2(){
        return this.regularDriversLiga2
    }

    setRegularDriversLiga2(pRegularDriverLiga2){
        this.regularDriversLiga2 = pRegularDriverLiga2
    }

    getAnmeldeChannelIDLiga2(){
        return this.anmeldeChannelIDLiga2
    }

    getAbmeldeChannelIDLiga2(){
        return this.abmeldeChannelIDLiga2
    }

    getErsatzfahrerRolleIDLiga2(){
        return this.ersatzfahrerRolleIDLiga2
    }

    getStammfahrerRolleIDLiga2(){
        return this.stammfahrerRolleIDLiga2
    }

    getInfoChannelIDLiga2(){
        return this.infoChannelIDLiga2
    }

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

    setLigatitel(pLigatitel){
        this.ligatitel = pLigatitel
    }

    getLigatitel(){
        return this.ligatitel
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

    setFreeCarMsgIDLiga2(pFreeCarMsgIDLiga2){
        this.freeCarMsgIDLiga2 = pFreeCarMsgIDLiga2
    }

    getFreeCarMsgIDLiga2(){
        return this.freeCarMsgIDLiga2
    }

    setWaitlistMsgIDLiga2(pWaitlistMsgIDLiga2){
        this.waitlistMsgIDLiga2 = pWaitlistMsgIDLiga2
    }    

    getWaitlistMsgIDLiga2(){
        return this.waitlistMsgIDLiga2
    }

    setLineupMsgLiga2(pLineupMsgLiga2){
        this.lineupMsgLiga2 = pLineupMsgLiga2
    }

    getLineupMsgLiga2(){
        return this.lineupMsgLiga2
    }

    setCurrentRegularDriversLiga2(pCurrentRegularDriversLiga2){
        this.currentRegularDriversLiga2 = pCurrentRegularDriversLiga2
    }

    getCurrentRegularDriversLiga2(){
        return this.currentRegularDriversLiga2
    }

    setMessageEmbedAnmeldenLiga2(pMessageEmbedAnmeldenLiga2){
        this.messageEmbedAnmeldenLiga2 = pMessageEmbedAnmeldenLiga2
    }

    getMessageEmbedAnmeldenLiga2(){
        return this.messageEmbedAnmeldenLiga2
    }

    setMessageEmbedAbmeldenLiga2(pMessageEmbedAbmeldenLiga2){
        this.messageEmbedAbmeldenLiga2 = pMessageEmbedAbmeldenLiga2
    }

    getMessageEmbedAbmeldenLiga2(){
        return this.messageEmbedAbmeldenLiga2
    }

    setAnmeldungActiveLiga2(pAnmeldungActiveLiga2){
        this.anmeldungActiveLiga2 = pAnmeldungActiveLiga2
    }

    getAnmeldungActiveLiga2(){
        return this.anmeldungActiveLiga2
    }

    setSeasonCalendarLiga2(pSeasonCalendarLiga2){
        this.seasonCalendarLiga2 = pSeasonCalendarLiga2
    }

    getSeasonCalendarLiga2(){
        return this.seasonCalendarLiga2
    }

    setSeasonCalendarRacesDoneLiga2(pSeasonCalendarRacesDoneLiga2){
        this.seasonCalendarRacesDoneLiga2 = pSeasonCalendarRacesDoneLiga2
    }

    getSeasonCalendarRacesDoneLiga2(){
        return this.seasonCalendarRacesDoneLiga2
    }

    setSeasonActiveLiga2(pSeasonActiveLiga2){
        this.seasonActiveLiga2 = pSeasonActiveLiga2
    }

    getSeasonActiveLiga2(){
        return this.seasonActiveLiga2
    }

    setStartLoopLiga2(pStartLoopLiga2){
        this.pStartLoopLiga2 = pStartLoopLiga2
    }

    getStartLoopLiga2(){
        return this.pStartLoopLiga2
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getSubPersonListLiga1() {
        return this.subPersonListLiga1;
    }

    setSubPersonListLiga1(pSubPersonListLiga1) {
        this.subPersonListLiga1 = pSubPersonListLiga1
    }

    getsubPersonListReinstatedDriversLiga1(){
        return this.subPersonListReinstatedDriversLiga1
    }

    setsubPersonListReinstatedDriversLiga1(pSubPersonListReinstatedDriversLiga1){
        this.subPersonListReinstatedDriversLiga1 = pSubPersonListReinstatedDriversLiga1
    }

    getFreeCarsLiga1(){
        return this.freeCarsLiga1
    }

    setFreeCarsLiga1(pFreeCarsLiga1){
        this.freeCarsLiga1 = pFreeCarsLiga1
    }

    getWithdrawnDriversLiga1(){
        return this.withdrawnDriversLiga1
    }

    setWithdrawnDriversLiga1(pWithdrawnDriversLiga1){
        this.withdrawnDriversLiga1 = pWithdrawnDriversLiga1
    }

    getWithdrawnDriversPerCommandLiga1(){
        return this.withdrawnDriversPerCommandLiga1
    }

    setWithdrawnDriversPerCommandLiga1(pWithdrawnDriversPerCommandLiga1){
        this.withdrawnDriversPerCommandLiga1 = pWithdrawnDriversPerCommandLiga1
    }

    getSubInDriversPerCommandLiga1(){
        return this.subInDriversPerCommandLiga1
    }

    setSubInDriversPerCommandLiga1(pSubInDriversPerCommandLiga1){
        this.subInDriversPerCommandLiga1 = pSubInDriversPerCommandLiga1
    }    

    getCurrentRaceLocationLiga1(){
        return this.currentRaceLocationLiga1
    }

    setCurrentRaceLocationLiga1(pCurrentRaceLocationLiga1){
        this.currentRaceLocationLiga1 = pCurrentRaceLocationLiga1
    }

    getReactedToSubInLiga1(){
        return this.reactedToSubInLiga1
    }

    setReactedToSubInLiga1(pReactedToSubInLiga1){
        this.reactedToSubInLiga1 = pReactedToSubInLiga1
    }

    getReactedToSignOutLiga1(){
        return this.reactedToSignOutLiga1
    }

    setReactedToSignOutLiga1(pReactedToSignOutLiga1){
        this.reactedToSignOutLiga1 = pReactedToSignOutLiga1
    }

    getMercedesDriversLiga1(){
        return this.mercedesDriversLiga1
    }

    setMercedesDriversLiga1(pMercedesDriversLiga1){
        this.mercedesDriversLiga1 = pMercedesDriversLiga1
    }

    getRedBullDriversLiga1(){
        return this.redBullDriversLiga1
    }

    setRedBullDriversLiga1(pRedBullDriversLiga1){
        this.redBullDriversLiga1 = pRedBullDriversLiga1
    }

    setFerrariDriversLiga1(pFerrariDriversLiga1){
        this.ferrariDriversLiga1 = pFerrariDriversLiga1
    }

    getFerrariDriversLiga1(){
        return this.ferrariDriversLiga1
    }

    setMcLarenDriversLiga1(pMcLarenDriversLiga1){
        this.mcLarenDriversLiga1 = pMcLarenDriversLiga1
    }

    getMcLarenDriversLiga1(){
        return this.mcLarenDriversLiga1
    }

    setAstonMartinDriversLiga1(pAstonMartinDriversLiga1){
        this.astonMartinDriversLiga1 = pAstonMartinDriversLiga1
    }

    getAstonMartinDriversLiga1(){
        return this.astonMartinDriversLiga1
    }
    
    setAlpineDriversLiga1(pAlpineDriversLiga1){
        this.alpineDriversLiga1 = pAlpineDriversLiga1
    }

    getAlpineDriversLiga1(){
        return this.alpineDriversLiga1
    }

    setAlphaTauriDriversLiga1(pAlphaTauriDriversLiga1){
        this.alphaTauriDriversLiga1 = pAlphaTauriDriversLiga1
    }

    getAlphaTauriDriversLiga1(){
        return this.alphaTauriDriversLiga1
    }

    setAlfaRomeoDriversLiga1(pAlfaRomeoDriversLiga1){
        this.alfaRomeoDriversLiga1 = pAlfaRomeoDriversLiga1
    }

    getAlfaRomeoDriversLiga1(){
        return this.alfaRomeoDriversLiga1
    }

    setWilliamsDriversLiga1(pWilliamsDriversLiga1){
        this.williamsDriversLiga1 = pWilliamsDriversLiga1
    }

    getWilliamsDriversLiga1(){
        return this.williamsDriversLiga1
    }

    setHaasDriversLiga1(pHaasDriversLiga1){
        this.haasDriversLiga1 = pHaasDriversLiga1
    }

    getHaasDriversLiga1(){
        return this.haasDriversLiga1
    }

    getCurrentLineupLiga1(){
        return this.currentLineupLiga1
    }

    setCurrentLineupLiga1(pCurrentLineupLiga1){
        this.currentLineupLiga1 = pCurrentLineupLiga1
    }    

    getRegularDriversLiga1(){
        return this.regularDriversLiga1
    }

    setRegularDriversLiga1(pRegularDriverLiga1){
        this.regularDriversLiga1 = pRegularDriverLiga1
    }

    getAnmeldeChannelIDLiga1(){
        return this.anmeldeChannelIDLiga1
    }

    getAbmeldeChannelIDLiga1(){
        return this.abmeldeChannelIDLiga1
    }

    getErsatzfahrerRolleIDLiga1(){
        return this.ersatzfahrerRolleIDLiga1
    }

    getStammfahrerRolleIDLiga1(){
        return this.stammfahrerRolleIDLiga1
    }

    getInfoChannelIDLiga1(){
        return this.infoChannelIDLiga1
    }

    setFreeCarMsgIDLiga1(pFreeCarMsgIDLiga1){
        this.freeCarMsgIDLiga1 = pFreeCarMsgIDLiga1
    }

    getFreeCarMsgIDLiga1(){
        return this.freeCarMsgIDLiga1
    }

    setWaitlistMsgIDLiga1(pWaitlistMsgIDLiga1){
        this.waitlistMsgIDLiga1 = pWaitlistMsgIDLiga1
    }    

    getWaitlistMsgIDLiga1(){
        return this.waitlistMsgIDLiga1
    }

    setLineupMsgLiga1(pLineupMsgLiga1){
        this.lineupMsgLiga1 = pLineupMsgLiga1
    }

    getLineupMsgLiga1(){
        return this.lineupMsgLiga1
    }

    setCurrentRegularDriversLiga1(pCurrentRegularDriversLiga1){
        this.currentRegularDriversLiga1 = pCurrentRegularDriversLiga1
    }

    getCurrentRegularDriversLiga1(){
        return this.currentRegularDriversLiga1
    }

    setMessageEmbedAnmeldenLiga1(pMessageEmbedAnmeldenLiga1){
        this.messageEmbedAnmeldenLiga1 = pMessageEmbedAnmeldenLiga1
    }

    getMessageEmbedAnmeldenLiga1(){
        return this.messageEmbedAnmeldenLiga1
    }

    setMessageEmbedAbmeldenLiga1(pMessageEmbedAbmeldenLiga1){
        this.messageEmbedAbmeldenLiga1 = pMessageEmbedAbmeldenLiga1
    }

    getMessageEmbedAbmeldenLiga1(){
        return this.messageEmbedAbmeldenLiga1
    }

    setAnmeldungActiveLiga1(pAnmeldungActiveLiga1){
        this.anmeldungActiveLiga1 = pAnmeldungActiveLiga1
    }

    getAnmeldungActiveLiga1(){
        return this.anmeldungActiveLiga1
    }

    setSeasonCalendarLiga1(pSeasonCalendarLiga1){
        this.seasonCalendarLiga1 = pSeasonCalendarLiga1
    }

    getSeasonCalendarLiga1(){
        return this.seasonCalendarLiga1
    }

    setSeasonCalendarRacesDoneLiga1(pSeasonCalendarRacesDoneLiga1){
        this.seasonCalendarRacesDoneLiga1 = pSeasonCalendarRacesDoneLiga1
    }

    getSeasonCalendarRacesDoneLiga1(){
        return this.seasonCalendarRacesDoneLiga1
    }

    setSeasonActiveLiga1(pSeasonActiveLiga1){
        this.seasonActiveLiga1 = pSeasonActiveLiga1
    }

    getSeasonActiveLiga1(){
        return this.seasonActiveLiga1
    }

    setStartLoopLiga1(pStartLoopLiga1){
        this.pStartLoopLiga1 = pStartLoopLiga1
    }

    getStartLoopLiga1(){
        return this.pStartLoopLiga1
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getSubPersonListLiga3() {
        return this.subPersonListLiga3;
    }

    setSubPersonListLiga3(pSubPersonListLiga3) {
        this.subPersonListLiga3 = pSubPersonListLiga3
    }

    getsubPersonListReinstatedDriversLiga3(){
        return this.subPersonListReinstatedDriversLiga3
    }

    setsubPersonListReinstatedDriversLiga3(pSubPersonListReinstatedDriversLiga3){
        this.subPersonListReinstatedDriversLiga3 = pSubPersonListReinstatedDriversLiga3
    }

    getFreeCarsLiga3(){
        return this.freeCarsLiga3
    }

    setFreeCarsLiga3(pFreeCarsLiga3){
        this.freeCarsLiga3 = pFreeCarsLiga3
    }

    getWithdrawnDriversLiga3(){
        return this.withdrawnDriversLiga3
    }

    setWithdrawnDriversLiga3(pWithdrawnDriversLiga3){
        this.withdrawnDriversLiga3 = pWithdrawnDriversLiga3
    }

    getWithdrawnDriversPerCommandLiga3(){
        return this.withdrawnDriversPerCommandLiga3
    }

    setWithdrawnDriversPerCommandLiga3(pWithdrawnDriversPerCommandLiga3){
        this.withdrawnDriversPerCommandLiga3 = pWithdrawnDriversPerCommandLiga3
    }

    getSubInDriversPerCommandLiga3(){
        return this.subInDriversPerCommandLiga3
    }

    setSubInDriversPerCommandLiga3(pSubInDriversPerCommandLiga3){
        this.subInDriversPerCommandLiga3 = pSubInDriversPerCommandLiga3
    }    

    getCurrentRaceLocationLiga3(){
        return this.currentRaceLocationLiga3
    }

    setCurrentRaceLocationLiga3(pCurrentRaceLocationLiga3){
        this.currentRaceLocationLiga3 = pCurrentRaceLocationLiga3
    }

    getReactedToSubInLiga3(){
        return this.reactedToSubInLiga3
    }

    setReactedToSubInLiga3(pReactedToSubInLiga3){
        this.reactedToSubInLiga3 = pReactedToSubInLiga3
    }

    getReactedToSignOutLiga3(){
        return this.reactedToSignOutLiga3;
    }

    setReactedToSignOutLiga3(pReactedToSignOutLiga3){
        this.reactedToSignOutLiga3 = pReactedToSignOutLiga3
    }

    getReactedSignOutInLiga3(){
        return this.reactedToSignOutLiga3
    }

    setReactedSignOutInLiga3(pReactedSignOutInLiga3){
        this.reactedToSignOutLiga3 = pReactedSignOutInLiga3
    }

    getMercedesDriversLiga3(){
        return this.mercedesDriversLiga3
    }

    setMercedesDriversLiga3(pMercedesDriversLiga3){
        this.mercedesDriversLiga3 = pMercedesDriversLiga3
    }

    getRedBullDriversLiga3(){
        return this.redBullDriversLiga3
    }

    setRedBullDriversLiga3(pRedBullDriversLiga3){
        this.redBullDriversLiga3 = pRedBullDriversLiga3
    }

    setFerrariDriversLiga3(pFerrariDriversLiga3){
        this.ferrariDriversLiga3 = pFerrariDriversLiga3
    }

    getFerrariDriversLiga3(){
        return this.ferrariDriversLiga3
    }

    setMcLarenDriversLiga3(pMcLarenDriversLiga3){
        this.mcLarenDriversLiga3 = pMcLarenDriversLiga3
    }

    getMcLarenDriversLiga3(){
        return this.mcLarenDriversLiga3
    }

    setAstonMartinDriversLiga3(pAstonMartinDriversLiga3){
        this.astonMartinDriversLiga3 = pAstonMartinDriversLiga3
    }

    getAstonMartinDriversLiga3(){
        return this.astonMartinDriversLiga3
    }
    
    setAlpineDriversLiga3(pAlpineDriversLiga3){
        this.alpineDriversLiga3 = pAlpineDriversLiga3
    }

    getAlpineDriversLiga3(){
        return this.alpineDriversLiga3
    }

    setAlphaTauriDriversLiga3(pAlphaTauriDriversLiga3){
        this.alphaTauriDriversLiga3 = pAlphaTauriDriversLiga3
    }

    getAlphaTauriDriversLiga3(){
        return this.alphaTauriDriversLiga3
    }

    setAlfaRomeoDriversLiga3(pAlfaRomeoDriversLiga3){
        this.alfaRomeoDriversLiga3 = pAlfaRomeoDriversLiga3
    }

    getAlfaRomeoDriversLiga3(){
        return this.alfaRomeoDriversLiga3
    }

    setWilliamsDriversLiga3(pWilliamsDriversLiga3){
        this.williamsDriversLiga3 = pWilliamsDriversLiga3
    }

    getWilliamsDriversLiga3(){
        return this.williamsDriversLiga3
    }

    setHaasDriversLiga3(pHaasDriversLiga3){
        this.haasDriversLiga3 = pHaasDriversLiga3
    }

    getHaasDriversLiga3(){
        return this.haasDriversLiga3
    }

    getCurrentLineupLiga3(){
        return this.currentLineupLiga3
    }

    setCurrentLineupLiga3(pCurrentLineupLiga3){
        this.currentLineupLiga3 = pCurrentLineupLiga3
    }    

    getRegularDriversLiga3(){
        return this.regularDriversLiga3
    }

    setRegularDriversLiga3(pRegularDriverLiga3){
        this.regularDriversLiga3 = pRegularDriverLiga3
    }

    getAnmeldeChannelIDLiga3(){
        return this.anmeldeChannelIDLiga3
    }

    getAbmeldeChannelIDLiga3(){
        return this.abmeldeChannelIDLiga3
    }

    getErsatzfahrerRolleIDLiga3(){
        return this.ersatzfahrerRolleIDLiga3
    }

    getStammfahrerRolleIDLiga3(){
        return this.stammfahrerRolleIDLiga3
    }

    getInfoChannelIDLiga3(){
        return this.infoChannelIDLiga3
    }

    setFreeCarMsgIDLiga3(pFreeCarMsgIDLiga3){
        this.freeCarMsgIDLiga3 = pFreeCarMsgIDLiga3
    }

    getFreeCarMsgIDLiga3(){
        return this.freeCarMsgIDLiga3
    }

    setWaitlistMsgIDLiga3(pWaitlistMsgIDLiga3){
        this.waitlistMsgIDLiga3 = pWaitlistMsgIDLiga3
    }    

    getWaitlistMsgIDLiga3(){
        return this.waitlistMsgIDLiga3
    }

    setLineupMsgLiga3(pLineupMsgLiga3){
        this.lineupMsgLiga3 = pLineupMsgLiga3
    }

    getLineupMsgLiga3(){
        return this.lineupMsgLiga3
    }

    setCurrentRegularDriversLiga3(pCurrentRegularDriversLiga3){
        this.currentRegularDriversLiga3 = pCurrentRegularDriversLiga3
    }

    getCurrentRegularDriversLiga3(){
        return this.currentRegularDriversLiga3
    }

    setMessageEmbedAnmeldenLiga3(pMessageEmbedAnmeldenLiga3){
        this.messageEmbedAnmeldenLiga3 = pMessageEmbedAnmeldenLiga3
    }

    getMessageEmbedAnmeldenLiga3(){
        return this.messageEmbedAnmeldenLiga3
    }

    setMessageEmbedAbmeldenLiga3(pMessageEmbedAbmeldenLiga3){
        this.messageEmbedAbmeldenLiga3 = pMessageEmbedAbmeldenLiga3
    }

    getMessageEmbedAbmeldenLiga3(){
        return this.messageEmbedAbmeldenLiga3
    }

    setAnmeldungActiveLiga3(pAnmeldungActiveLiga3){
        this.anmeldungActiveLiga3 = pAnmeldungActiveLiga3
    }

    getAnmeldungActiveLiga3(){
        return this.anmeldungActiveLiga3
    }

    setSeasonCalendarLiga3(pSeasonCalendarLiga3){
        this.seasonCalendarLiga3 = pSeasonCalendarLiga3
    }

    getSeasonCalendarLiga3(){
        return this.seasonCalendarLiga3
    }

    setSeasonCalendarRacesDoneLiga3(pSeasonCalendarRacesDoneLiga3){
        this.seasonCalendarRacesDoneLiga3 = pSeasonCalendarRacesDoneLiga3
    }

    getSeasonCalendarRacesDoneLiga3(){
        return this.seasonCalendarRacesDoneLiga3
    }

    setSeasonActiveLiga3(pSeasonActiveLiga3){
        this.seasonActiveLiga3 = pSeasonActiveLiga3
    }

    getSeasonActiveLiga3(){
        return this.seasonActiveLiga3
    }

    setStartLoopLiga3(pStartLoopLiga3){
        this.pStartLoopLiga3 = pStartLoopLiga3
    }

    getStartLoopLiga3(){
        return this.pStartLoopLiga3
    }

}

module.exports = Season
 