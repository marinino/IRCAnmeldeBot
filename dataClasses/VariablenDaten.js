class Season {

    constructor() {

        //ALLGEMEINE DATEN

        // KONSTANTEN

        this.ligatitel = '';

        // KONSTANTEN

        this.rennleiterRolleID = '947229969711521867';
        this.ligaleiterRolleID = '736929944646713355';
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

        // LIGA SO 1
        
        this.anmeldeChannelIDLigaSO1 = '857658403592863804'; // ID: 857658403592863804
        this.abmeldeChannelIDLigaSO1 = '869236783089590342'; // ID: 869236783089590342
        this.ersatzfahrerRolleIDLigaSO1 = '479056707104931840'; // ID: 479056707104931840
        this.stammfahrerRolleIDLigaSO1 = '841833530933379092'; // ID: 841833530933379092
        this.infoChannelIDLigaSO1 = '871757845400530974'; // ID: 871757845400530974

        // LIGA SO 2

        this.anmeldeChannelIDLigaSO2 = '857658929226973225'; // ID: 857658929226973225
        this.abmeldeChannelIDLigaSO2 = '869237098669043732'; // ID: 869237098669043732
        this.ersatzfahrerRolleIDLigaSO2 = '734888172097503323'; // ID: 734888172097503323
        this.stammfahrerRolleIDLigaSO2 = '843566503026884608'; // ID: 843566503026884608
        this.infoChannelIDLigaSO2 = '1004376605214392401'; // ID: 1004376605214392401

        // LIGA SA 1

        this.anmeldeChannelIDLigaSA1 = '857673238100574228'; // ID: 857673238100574228
        this.abmeldeChannelIDLigaSA1 = '857673345347485747'; // ID: 857673345347485747     
        this.ersatzfahrerRolleIDLigaSA1 = '843567323981938770'; // ID: 843567323981938770     
        this.stammfahrerRolleIDLigaSA1 = '843566505840214016'; // ID: 843566505840214016
        this.infoChannelIDLigaSA1 = '1004377045867970640'; // ID: 1004377045867970640
        
        // LIGA SA 2

        this.anmeldeChannelIDLigaSA2 = '1004370397376028722'; // ID: 1004370397376028722
        this.abmeldeChannelIDLigaSA2 = '1004370431832248320'; // ID: 1004370431832248320
        this.ersatzfahrerRolleIDLigaSA2 = '1004370368775069807'; // ID: 1004370368775069807
        this.stammfahrerRolleIDLigaSA2 = '1004370356397690910'; // ID: 1004370356397690910
        this.infoChannelIDLigaSA2 = '1004370315582898306'; // ID: 1004370315582898306

        // LIGA FR

        this.anmeldeChannelIDLigaFR = '1004371431112593418'; // ID: 1004371431112593418
        this.abmeldeChannelIDLigaFR = '1004371465380048937'; // ID: 1004371465380048937     
        this.ersatzfahrerRolleIDLigaFR = '1004370377780248647'; // ID: 1004370377780248647     
        this.stammfahrerRolleIDLigaFR = '1004370364895342782'; // ID: 1004370364895342782
        this.infoChannelIDLigaFR = '1004371403740545045'; // ID: 1004371403740545045
        
        // LIGA ORIGIN

        this.anmeldeChannelIDLigaOrigin = '1004370770090283158'; // ID: 1004370770090283158
        this.abmeldeChannelIDLigaOrigin = '1004370845206052864'; // ID: 1004370845206052864     
        this.ersatzfahrerRolleIDLigaOrigin = '1004370371912417361'; // ID: 1004370371912417361     
        this.stammfahrerRolleIDLigaOrigin = '1004370361095299124'; // ID: 1004370361095299124
        this.infoChannelIDLigaOrigin = '1004370716646461520'; // ID: 1004370716646461520
        
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        this.ferrariDriversLigaSO1 = pFerrariDriversLigaSO2
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
 