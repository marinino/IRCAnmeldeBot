const { EmbedBuilder , Client } = require('discord.js');
const VariableClass = require('../dataClasses/VariablenDaten.js')

class MethodClass{
    async removeFromCurrentLineup(client, userToRemoveID, freeCar, seasonData){
        let date = new Date().toLocaleString();
        console.log(`Die Methode removeFromCurrentLineup wurde aufgerufen. Parameter: userToRemoveID: ${userToRemoveID}, freeCar: ${freeCar} ` + 
                    `In Liga FR -- ${date}`);
        //Gets all the information
        let currentLineup = new Map();
        let stammfahrerRolleID = null
        
        currentLineup = seasonData.getCurrentLineupLigaFR();
        stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaFR();
       
        var userToRemove = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(userToRemoveID);
        //Checks if user has stammfahrer
        if(userToRemove.roles.cache.has(stammfahrerRolleID)){
            let date = new Date().toLocaleString();
            console.log(`${userToRemove.user.username} soll aus dem Lineup entfernt werden, ${userToRemove.user.username} hat die Stammfahrer Rolle für Liga FR. ` + 
                        `In Liga FR -- ${date}`);
            //Change cockpit locally
            var tempNameString = await this.findMainTeamString(userToRemove, seasonData)
            if(currentLineup.get(tempNameString)[0] == userToRemove.id){
                currentLineup.get(tempNameString)[0] = 'nicht besetzt';
                let date = new Date().toLocaleString();
                console.log(`${userToRemove.user.username} wurde aus dem Lineup entfernt -- ${date}`);
            } else if(currentLineup.get(tempNameString)[1] == userToRemove.id){
                currentLineup.get(tempNameString)[1] = 'nicht besetzt';
                let date = new Date().toLocaleString();
                console.log(`${userToRemove.user.username} wurde aus dem Lineup entfernt -- ${date}`);
            } else {
                let date = new Date().toLocaleString();
                console.log(`${userToRemove.user.username} konnte nicht aus dem Lineup entfernt werden, da er in keinem der beiden Cockpits saß. ` + 
                            `In Liga FR -- ${date}`);
            }
            //Change in object
            await seasonData.setCurrentLineupLigaFR(currentLineup);
           
        } else {
            let date1 = new Date().toLocaleString();
            console.log(`${userToRemove.user.username} soll aus dem Lineup entfernt werden, ${userToRemove.user.username} hat die Ersatzfahrer Rolle für Liga FR. ` + 
                        `In Liga FR -- ${date1}`);
            //Get all the information
            let teamNameString = null;
            if(freeCar == null){
                teamNameString = await this.findMainTeamString(userToRemove, seasonData);
            } else {
                let teamID = freeCar;
                teamNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(teamID).name;
            }
            let date = new Date();
            console.log(`Das Team aus dem ${userToRemove.user.username} entfernt werden soll ist ${teamNameString}. -- ${date}`)
            //Change cockpit locally
            if(currentLineup.get(teamNameString)[0] == userToRemove.id){
                currentLineup.get(teamNameString)[0] = 'nicht besetzt';
                let date = new Date().toLocaleString();
                console.log(`${userToRemove.nickname} wurde aus dem Lineup entfernt  in ${seasonData.getLigatitel()}-- ${date}`);
            } else if(currentLineup.get(teamNameString)[1] == userToRemove.id){
                currentLineup.get(teamNameString)[1] = 'nicht besetzt';
                let date = new Date().toLocaleString();
                console.log(`${userToRemove.nickname} wurde aus dem Lineup entfernt  in ${seasonData.getLigatitel()}-- ${date}`);
            } else {
                let date = new Date().toLocaleString();
                console.log(`Fehler beim Entfernen ${userToRemove.nickname} aus dem Lineup  in ${seasonData.getLigatitel()}-- ${date}`);
            }
            //Change content in object
            await seasonData.setCurrentLineupLigaFR(currentLineup);
           
        }
    }

    async regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition, seasonData){
        //Gets all the information
        let currentLineup = new Map();
       
        currentLineup = seasonData.getCurrentLineupLigaFR();
        
        //Checks if seat is open
        if(seatOpen == false){
            //Changes cockpit locally
            let mainTeamNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(mainTeamIDString).name;
            currentLineup.get(mainTeamNameString)[subDriverPosition] = driverToStart;
            let date = new Date().toLocaleString();
            console.log(`Method: regularDriverBack => Im ${mainTeamNameString} hat ${driverToStart} sein Cockpit wieder -- ${date}`);
            let carToTakeNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name;
            if(currentLineup.get(carToTakeNameString)[0] == 'nicht besetzt'){
                currentLineup.get(carToTakeNameString)[0] = subDriverID;
                let date = new Date().toLocaleString();
                console.log(`Method: regularDriverBack => Das erste Cockpit von ${carToTakeNameString} war offen, 
                            Fahrer mit ID ${subDriverID} ist nun im ${carToTakeNameString} in ${seasonData.getLigatitel()} -- ${date}`);
            } else if(currentLineup.get(carToTakeNameString)[1] == 'nicht besetzt'){
                currentLineup.get(carToTakeNameString)[1] = subDriverID;
                let date = new Date().toLocaleString();
                console.log(`Method: regularDriverBack => Das zweite Cockpit von ${carToTakeNameString} war offen, 
                            Fahrer mit ID ${subDriverID} ist nun im ${carToTakeNameString} in ${seasonData.getLigatitel()} -- ${date}`);
            } else {
                let date = new Date().toLocaleString();
                console.log(`Method: regularDriverBack => ${carToTakeNameString} hatte kein offenes Cockpit in ${seasonData.getLigatitel()} -- ${date}`);
            }
            //Change content in object
           
            await seasonData.setCurrentLineupLigaFR(currentLineup);
            
        } else {
            //Changes cockpit locally
            let mainTeamNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(mainTeamIDString).name;
            currentLineup.get(mainTeamNameString)[subDriverPosition] = driverToStart;
            let date = new Date().toLocaleString();
            console.log(`Method: regularDriverBack => Im ${mainTeamNameString} hat ${driverToStart} sein Cockpit wieder, 
                        das Cockpit war noch frei in ${seasonData.getLigatitel()} -- ${date}`);
            //Change content in object
           
            await seasonData.setCurrentLineupLigaFR(currentLineup);
          
        }
    }

    async changeLineupNormalSub(client, driverToStart, carToTake, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        
        currentLineup = seasonData.getCurrentLineupLigaFR();
       
        //Checks if seat i
        let carToTakeNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name;
        if(currentLineup.get(carToTakeNameString)[0] == 'nicht besetzt'){
            currentLineup.get(carToTakeNameString)[0] = driverToStart;
            let date = new Date().toLocaleString();
            console.log(`Der Tausch im Lineup wurde im Team ${carToTakeNameString} an der ersten Stelle 
                        durchgeführt; Normal Sub in ${seasonData.getLigatitel()} -- ${date}`);
        } else if(currentLineup.get(carToTakeNameString)[1] == 'nicht besetzt'){
            currentLineup.get(carToTakeNameString)[1] = driverToStart;
            let date = new Date().toLocaleString();
            console.log(`Der Tausch im Lineup wurde im Team ${carToTakeNameString} an der zweiten Stelle 
                        durchgeführt; Normal Sub in ${seasonData.getLigatitel()} -- ${date}`);
        } else {
            let date = new Date().toLocaleString();
            console.log(`Der Tausch im Lineup konnte nicht durchgeführt werden; Normal Sub. EVTL GEWOLLT in ${seasonData.getLigatitel()} -- ${date}`);
        }
        //Changes cockpit globally
       
        await seasonData.setCurrentLineupLigaFR(currentLineup);
        
    }

    async changeLineupAfterForceOpen(driverToStart, carToTake, positionForForce, seasonData){
        //Gets all the information
        let currentLineup = new Map();
       
        currentLineup = seasonData.getCurrentLineupLigaFR();
       
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        let date = new Date().toLocaleString();
        console.log(`Nachdem das Cockpit von ${carToTake} offen geforced wurde ist jetzt der Fahrer mit der
                    der ID ${driverToStart} drin in ${seasonData.getLigatitel()} -- ${date}`);
        //Changes cockpit globally
       
        await seasonData.setCurrentLineupLigaFR(currentLineup);
       
    }

    async changeLineupAfterForceDedicated(driverToStart, carToTake, positionForForce, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        
        currentLineup = seasonData.getCurrentLineupLigaFR();
       
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        let date = new Date().toLocaleString();
        console.log(`In das Cockpit von ${carToTake} wurde der Fahrer mit der
                    der ID ${driverToStart} rein geforced in ${seasonData.getLigatitel()} -- ${date}`);
        //Changes cockpit globally
       
        await seasonData.setCurrentLineupLigaFR(currentLineup);
        
    }

    async printLineup(client, seasonData){
        //Gets all the information
        let msgLineupID = null;
        let infoChannelID = null;
        let currentRaceLocation = null;
       
       
        msgLineupID = seasonData.getLineupMsgLigaFR();
        infoChannelID = seasonData.getInfoChannelIDLigaFR();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaFR();

        var mercedesDrivers = await this.getMercedesDrivers(client);
        console.log(mercedesDrivers + '.............................................')
        var redBullDrivers = await this.getRedBullDrivers(client);
        var ferrariDrivers = await this.getFerrariDrivers(client)
        var mcLarenDrivers = await this.getMcLarenDrivers(client);
        var astonMartinDrivers = await this.getAstonMartinDrivers(client);
        var alpineDrivers = await this.getAlpineDrivers(client);
        var alphaTauriDrivers = await this.getAlphaTauriDrivers(client);
        var alfaRomeoDrivers = await this.getAlfaRomeoDrivers(client);
        var williamsDrivers = await this.getWilliamsDrivers(client);
        var haasDrivers = await this.getHaasDrivers(client);
       
        //Deletes lineup currently displayed in channel
        if(msgLineupID != null){
            await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(infoChannelID).messages.fetch(msgLineupID).then((msg) => {
                msg.delete();
                let date = new Date().toLocaleString();
                console.log(`Das aktuelle Lineup wurde gelöscht. In ${seasonData.getLigatitel()} -- ${date}`)
            })
        }
        
        //Sets content for new message

        let lineupEmbed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Aktuelles Lineup')
        .setDescription(`Die AKTUELLEN Fahrer aller Teams für das Rennen in ${currentRaceLocation} sind hier aufgelistet`)
        .addFields(
            {name: 'Mercedes ', value: `${await this.setContentForLineup(mercedesDrivers[0], client, seasonData)} und ${await this.setContentForLineup(mercedesDrivers[1], client, seasonData)}`},
            {name: 'Red Bull ', value: `${await this.setContentForLineup(redBullDrivers[0], client, seasonData)} und ${await this.setContentForLineup(redBullDrivers[1], client, seasonData)}`},
            {name: 'Ferrari ', value: `${await this.setContentForLineup(ferrariDrivers[0], client, seasonData)} und ${await this.setContentForLineup(ferrariDrivers[1], client, seasonData)}`},
            {name: 'McLaren ', value: `${await this.setContentForLineup(mcLarenDrivers[0], client, seasonData)} und ${await this.setContentForLineup(mcLarenDrivers[1], client, seasonData)}`},
            {name: 'Aston Martin ', value: `${await this.setContentForLineup(astonMartinDrivers[0], client, seasonData)} und ${await this.setContentForLineup(astonMartinDrivers[1], client, seasonData)}`},
            {name: 'Alpine ', value: `${await this.setContentForLineup(alpineDrivers[0], client, seasonData)} und ${await this.setContentForLineup(alpineDrivers[1], client, seasonData)}`},
            {name: 'Alpha Tauri ', value: `${await this.setContentForLineup(alphaTauriDrivers[0], client, seasonData)} und ${await this.setContentForLineup(alphaTauriDrivers[1], client, seasonData)}`},
            {name: 'Alfa Romeo ', value: `${await  this.setContentForLineup(alfaRomeoDrivers[0], client, seasonData)} und ${await this.setContentForLineup(alfaRomeoDrivers[1], client, seasonData)}`},
            {name: 'Williams ', value: `${await this.setContentForLineup(williamsDrivers[0], client, seasonData)} und ${await this.setContentForLineup(williamsDrivers[1], client, seasonData)}`},
            {name: 'Haas ', value: `${await this.setContentForLineup(haasDrivers[0], client, seasonData)} und ${await this.setContentForLineup(haasDrivers[1], client, seasonData)}`}
        )
        let date = new Date().toLocaleString();   
        console.log(`Das aktuelle Lineup wurde gesendet. Für Liga ${seasonData.getLigatitel()} -- ${date}`);
        await client.channels.cache.get(infoChannelID).send({ embeds : [lineupEmbed]}).then((msg) => {
            //Set Waitlist Msg ID
            
            seasonData.setLineupMsgLigaFR(msg.id);
            
        });
       
    }

    async setContentForLineup(cockpitValue, client, seasonData){       
        
        //Yields return value
        if(cockpitValue == 'nicht besetzt'){
            return `nicht besetzt`;
        } else if(cockpitValue == 'entfernt'){
            return `entfernt`;
        } else {
            console.log(cockpitValue)
            var driverInSeat = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(cockpitValue);
            console.log(`HUUUUUUUUUUUUUUUUUUUUUUUUURENSOHN`)

            if(driverInSeat.roles.cache.has(seasonData.getSteamRolleID())){
                return `<@${currentLineup.get(teamName)[seat]}> <:steam:1032252108772229142>`;
            } else if(driverInSeat.roles.cache.has(seasonData.getOriginRolleID())){
                return `<@${currentLineup.get(teamName)[seat]}> <:origin:1032252076169900082>`;
            }
            // if XBox
            // if PS
        }
    }

    async checkSubCanBeMade(client, fromForceRemove, positionForForce, driverForForce, carForForce, seasonData){
        //Gets all the information
        let freeCars = new Array();
        let subPersonList = new Array();
        let subPersonListReinstatedDrivers = new Array();
        let withdrawnDrivers = new Array();
        let stammfahrerRolleID = new Array();
        let ersatzfahrerRolleID = null;
        let anmeldeChannelID = null;
        let currentLineup = new Map();
        
        freeCars = seasonData.getFreeCarsLigaFR();
        subPersonList = seasonData.getSubPersonListLigaFR();
        subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaFR();
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
        stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaFR();
        ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaFR();
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        currentLineup = seasonData.getCurrentLineupLigaFR();
       

        if(freeCars.length > 0 && ((subPersonList.length + subPersonListReinstatedDrivers.length) > 0)){
            
            let driverToStart = null;
            if(subPersonListReinstatedDrivers.length > 0){
                var driverToStartTemp = subPersonListReinstatedDrivers.shift();
                driverToStart = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(driverToStartTemp);
            } else {
                var driverToStartTemp = subPersonList.shift();
                driverToStart = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(driverToStartTemp);
            }
            let carToTake = freeCars.shift();
            if(driverToStart == null){
                let date = new Date();
                console.log(`Wurde checkSubCanBeMade ausgeführt, aber der driverToStart war in irgendeiner Weise falsch. 
                            DriverToStart war null. In ${seasonData.getLigatitel()} -- ${date}`);
                return;
            }
            let date = new Date();
            console.log(`Prüfsumme für ${seasonData.getLigatitel()}, Methode checkSubCanBeMade. Das Auto was gerade belegt wird hat ID ${carToTake}, der 
                        Fahrer der es nimmt hat die ID ${driverToStartTemp}. Beides darf nicht null oder undefined sein in ${seasonData.getLigatitel()}. -- ${date}`);
            if(!fromForceRemove && await driverToStart.roles.cache.has(stammfahrerRolleID) && await this.checkIfCarisFree(client, carToTake, seasonData)){
                let mainTeamNameString = await this.findMainTeamString(driverToStart, seasonData);
                var seatOpen = false;
                let mainTeamIDString = null;
                client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.find(role => {
                    if(role.name == mainTeamNameString){
                        mainTeamIDString = role.id;
                    }
                })
                let subDriverPosition = null;
                if(currentLineup.get(mainTeamNameString)[0] == 'nicht besetzt'){
                    subDriverPosition = 0;
                    seatOpen = true;
                } else if(currentLineup.get(mainTeamNameString)[1] == 'nicht besetzt'){
                    subDriverPosition = 1;
                    seatOpen = true;
                } else {
                    var driverOfMainTeamOne = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(currentLineup.get(mainTeamNameString)[0])
                    var driverOfMainTeamTwo = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(currentLineup.get(mainTeamNameString)[1])

                    if(driverOfMainTeamOne.roles.cache.has(ersatzfahrerRolleID)){
                        subDriverPosition = 0;
                    } else if(driverOfMainTeamTwo.roles.cache.has(ersatzfahrerRolleID)){
                        subDriverPosition = 1;
                    }
                }
                
                let subDriverID = null;
                if(subDriverPosition != null){
                    subDriverID = currentLineup.get(mainTeamNameString)[subDriverPosition];
                } else {
                    let date = new Date()
                    console.log(`Methode: CheckSubCanBeMade, Fall: 1 => Stammfahrer kommt zurück, subDriverPosition war null in ${seasonData.getLigatitel()} -- ${date}`)
                    return;
                }
                await this.regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart.id, seatOpen, subDriverPosition, seasonData);
                let regularDriverBackEmbed = new EmbedBuilder()
                .setColor('#fff654')
                .setTitle('🔄')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverToStart.id}> bekommt seinen Stammplatz wieder`}
                )
                if(seatOpen == false){
                    let driverInEmbed = new EmbedBuilder()
                    .setColor('#fff654')
                    .setTitle('➡️')
                    if(carToTake == mainTeamIDString){ 
                        driverInEmbed.addFields(
                            {name: `Update im Lineup`, value: `<@${subDriverID}> bekommt den anderen <@&${carToTake}>`}
                        )
                    }else{
                        driverInEmbed.addFields(
                            {name: `Update im Lineup`, value: `<@${subDriverID}> bekommt den <@&${carToTake}>`}
                        )
                        await client.guilds.cache.get(seasonData.getDiscordID()).members.cache.get(subDriverID).send(`Es ergab sich eine ` +
                        `Verschiebung im Lineup, du fährst am Wochenende den ${client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name}`);
                    }
                    await client.channels.cache.get(anmeldeChannelID).send({embeds : [driverInEmbed]}).then(() => {
                        client.channels.cache.get(seasonData.getLogChannelID()).send({embeds : [driverInEmbed]});
                    });
                }
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [regularDriverBackEmbed]}).then(() => {
                    client.channels.cache.get(seasonData.getLogChannelID()).send({embeds : [regularDriverBackEmbed]});
                    driverToStart.send(`Gute Nachrichten, ` +
                    `du hast deinen Stammplatz für diese Woche wieder! 😄`);
                });
                let date = new Date().toLocaleString();
                if(subDriverID && subDriverID != 'nicht besetzt'){
                    console.log(`${client.guilds.cache.get(seasonData.getDiscordID()).members.cache.get(subDriverID).nickname} übernimmt einen ` + 
                                `${client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name} und ` + 
                                `${driverToStart.nickname} bekommt seinen Stammplatz wieder -- ${date}`);
                } else {
                    console.log(`${driverToStart.nickname} bekommt seinen Stammplatz wieder -- ${date}`);
                }
            
            } else if(!fromForceRemove && driverToStart.roles.cache.has(ersatzfahrerRolleID) && await this.checkIfCarisFree(client, carToTake, seasonData)){
                await this.changeLineupNormalSub(client, driverToStart.id, carToTake, seasonData);
                let driverInEmbed = new EmbedBuilder()
                .setColor('#fff654')
                .setTitle('➡️')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverToStart.id}> bekommt den <@&${carToTake}>`}
                );
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [driverInEmbed]}).then(() => {
                    client.channels.cache.get(seasonData.getLogChannelID()).send({embeds : [driverInEmbed]});
                    driverToStart.send(`Gute Nachrichten, du fährst diese Woche den ` + 
                    `${client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
                });
                let date = new Date().toLocaleString();
                console.log(`${driverToStart.nickname} bekommt ` + 
                            `den ${client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name} -- ${date}`);
            } else if(fromForceRemove && driverForForce == null && carForForce == null){
                await this.changeLineupAfterForceOpen(driverToStart.id, client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name, positionForForce, seasonData);
                let subDriverInEmbed = new EmbedBuilder()
                .setColor('#fff654')
                .setTitle('➡️')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverToStart.id}> bekommt den <@&${carToTake}>`}
                );
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [subDriverInEmbed]}).then(() => {
                    client.channels.cache.get(seasonData.getLogChannelID()).send({embeds : [subDriverInEmbed]});
                    driverToStart.send(`Gute Nachrichten, du fährst diese Woche den ` + 
                    `${client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
                });
                let date = new Date().toLocaleString();
                console.log(`${driverToStart.nickname} bekommt` + 
                            ` den ${client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name} -- ${date}`);
            }
        } else {
            if(fromForceRemove && driverForForce != null && carForForce != null){
                await this.changeLineupAfterForceDedicated(driverForForce, carForForce, positionForForce, seasonData);
                let subDriverInEmbed = new EmbedBuilder()
                .setColor('#fff654')
                .setTitle('➡️')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverForForce}> bekommt den ${carForForce}`}
                );
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [subDriverInEmbed]}).then(() => {
                    client.channels.cache.get(seasonData.getLogChannelID()).send({embeds : [subDriverInEmbed]});
                    client.guilds.cache.get(seasonData.getDiscordID()).members.cache.get(driverForForce).send(`Gute Nachrichten, du fährst diese Woche den ` + 
                    `${(carForForce)}! Viel Glück beim Rennen 🍀`);
                });
                let date = new Date().toLocaleString();
                console.log(`${client.guilds.cache.get(seasonData.getDiscordID()).members.cache.get(driverForForce).user.username} bekommt` + 
                            ` den ${carForForce} -- ${date}`);
            }
        }
        await this.setWaitlistMsgContent(client, seasonData);
        await this.printLineup(client, seasonData)
    }

    async addCarOfWithdrawnDriverToFreeCars(memberUser, seasonData, client){
        //Gets all the information
        let freeCars = new Map();
       
        freeCars = seasonData.getFreeCarsLigaFR();
        
        //Changes locally
        var member = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(memberUser.id);
        if(member.roles.cache.has(seasonData.getMercedesRolleID())){
            await freeCars.unshift(seasonData.getMercedesRolleID());
        } else if(member.roles.cache.has(seasonData.getRedBullRolleID())){
            await freeCars.unshift(seasonData.getRedBullRolleID());
        } else if(member.roles.cache.has(seasonData.getFerrariRolleID())){
            await freeCars.unshift(seasonData.getFerrariRolleID());
        } else if(member.roles.cache.has(seasonData.getMcLarenRolleID())){
            await freeCars.unshift(seasonData.getMcLarenRolleID());
        } else if(member.roles.cache.has(seasonData.getAstonMartinRolleID())){
            await freeCars.unshift(seasonData.getAstonMartinRolleID());
        }  else if(member.roles.cache.has(seasonData.getAlpineRolleID())){
            await freeCars.unshift(seasonData.getAlpineRolleID());
        } else if(member.roles.cache.has(seasonData.getAlphaTauriRolleID())){
            await freeCars.unshift(seasonData.getAlphaTauriRolleID());
        } else if(member.roles.cache.has(seasonData.getAlfaRomeoRolleID())){
            await freeCars.unshift(seasonData.getAlfaRomeoRolleID());
        } else if(member.roles.cache.has(seasonData.getWilliamsRolleID())){
            await freeCars.unshift(seasonData.getWilliamsRolleID());
        } else if(member.roles.cache.has(seasonData.getHaasRolleID())){
            await freeCars.unshift(seasonData.getHaasRolleID());
        }
        //Makes changes globally
       
        await seasonData.setFreeCarsLigaFR(freeCars);
       
    }

    async setWaitlistMsgContent(client, seasonData){
        //Gets all the information
        let subPersonList = new Map();
        let subPersonListReinstatedDrivers = new Map();
        let freeCars = new Map();
        let waitListMsgID = null;
        let freeCarsMsgID = null;
        let anmeldeChannelID = null;
        
        subPersonList = seasonData.getSubPersonListLigaFR();
        subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaFR();
        freeCars = seasonData.getFreeCarsLigaFR();
        waitListMsgID = seasonData.getWaitlistMsgIDLigaFR();
        freeCarsMsgID = seasonData.getFreeCarMsgIDLigaFR();
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
       
        //Make local changes
        let waitListContent = subPersonListReinstatedDrivers.concat(subPersonList);
        let waitListDefaultMessage = `Warteliste:`;
        for(let i = 0; i < waitListContent.length; i++){
            if(i == 0){
                waitListDefaultMessage += ` <@${waitListContent[i]}>`;
            } else {
                waitListDefaultMessage += `, <@${waitListContent[i]}>`;
            }
        }
        await client.channels.cache.get(anmeldeChannelID).messages.fetch(waitListMsgID).then((msg) => {
            msg.edit(waitListDefaultMessage)
        });
        var freeCarListDefaultMessage = `Freie Autos:`;
        for(let i = 0; i < freeCars.length; i++){
            if(i == 0){
                freeCarListDefaultMessage += ` <@&${freeCars[i]}>`;
            } else {
                freeCarListDefaultMessage += `, <@&${freeCars[i]}>`;
            }
        }
        await client.channels.cache.get(anmeldeChannelID).messages.fetch(freeCarsMsgID).then((msg) => {
            msg.edit(freeCarListDefaultMessage);
        });
    }

    async setDefaultLineup(seasonData){
        //Gets all the information
        let currentLineup = new Map();
        let mercedesDriver1 = null;
        let mercedesDriver2 = null;
        let redBullDriver1 = null;
        let redBullDriver2 = null;
        let ferrariDriver1 = null;
        let ferrariDriver2 = null;
        let mcLarenDriver1 = null;
        let mcLarenDriver2 = null;
        let astonMartinDriver1 = null;
        let astonMartinDriver2 = null;
        let alpineDriver1 = null;
        let alpineDriver2 = null;
        let alphaTauriDriver1 = null;
        let alphaTauriDriver2 = null;
        let alfaRomeoDriver1 = null;
        let alfaRomeoDriver2 = null;
        let williamsDriver1 = null;
        let williamsDriver2 = null;
        let haasDriver1 = null;
        let haasDriver2 = null;
       
        currentLineup = seasonData.getCurrentLineupLigaFR();
        mercedesDriver1 = seasonData.getMercedesDriversLigaFR()[0];
        mercedesDriver2 = seasonData.getMercedesDriversLigaFR()[1];
        redBullDriver1 = seasonData.getRedBullDriversLigaFR()[0];
        redBullDriver2 = seasonData.getRedBullDriversLigaFR()[1];
        ferrariDriver1 = seasonData.getFerrariDriversLigaFR()[0];
        ferrariDriver2 = seasonData.getFerrariDriversLigaFR()[1];
        mcLarenDriver1 = seasonData.getMcLarenDriversLigaFR()[0];
        mcLarenDriver2 = seasonData.getMcLarenDriversLigaFR()[1];
        astonMartinDriver1 = seasonData.getAstonMartinDriversLigaFR()[0];
        astonMartinDriver2 = seasonData.getAstonMartinDriversLigaFR()[1];
        alpineDriver1 = seasonData.getAlpineDriversLigaFR()[0];
        alpineDriver2 = seasonData.getAlpineDriversLigaFR()[1];
        alphaTauriDriver1 = seasonData.getAlphaTauriDriversLigaFR()[0];
        alphaTauriDriver2 = seasonData.getAlphaTauriDriversLigaFR()[1];
        alfaRomeoDriver1 = seasonData.getAlfaRomeoDriversLigaFR()[0];
        alfaRomeoDriver2 = seasonData.getAlfaRomeoDriversLigaFR()[1];
        williamsDriver1 = seasonData.getWilliamsDriversLigaFR()[0];
        williamsDriver2 = seasonData.getWilliamsDriversLigaFR()[1];
        haasDriver1 = seasonData.getHaasDriversLigaFR()[0];
        haasDriver2 = seasonData.getHaasDriversLigaFR()[1];
        
        //Makes changes locally
        currentLineup.set("Mercedes", []);
        currentLineup.set("Red Bull", []);
        currentLineup.set("Ferrari", []);
        currentLineup.set("McLaren", []);
        currentLineup.set("Aston Martin", []);
        currentLineup.set("Alpine", []);
        currentLineup.set("Alpha Tauri", []);
        currentLineup.set("Alfa Romeo", []);
        currentLineup.set("Williams", []);
        currentLineup.set("Haas", []);
        await currentLineup.get('Mercedes').push(mercedesDriver1);
        await currentLineup.get('Mercedes').push(mercedesDriver2);
        await currentLineup.get('Red Bull').push(redBullDriver1);
        await currentLineup.get('Red Bull').push(redBullDriver2);
        await currentLineup.get('Ferrari').push(ferrariDriver1);
        await currentLineup.get('Ferrari').push(ferrariDriver2);
        await currentLineup.get('McLaren').push(mcLarenDriver1);
        await currentLineup.get('McLaren').push(mcLarenDriver2);
        await currentLineup.get('Aston Martin').push(astonMartinDriver1);
        await currentLineup.get('Aston Martin').push(astonMartinDriver2);
        await currentLineup.get('Alpine').push(alpineDriver1);
        await currentLineup.get('Alpine').push(alpineDriver2);
        await currentLineup.get('Alpha Tauri').push(alphaTauriDriver1);
        await currentLineup.get('Alpha Tauri').push(alphaTauriDriver2);
        await currentLineup.get('Alfa Romeo').push(alfaRomeoDriver1);
        await currentLineup.get('Alfa Romeo').push(alfaRomeoDriver2);
        await currentLineup.get('Williams').push(williamsDriver1);
        await currentLineup.get('Williams').push(williamsDriver2);
        await currentLineup.get('Haas').push(haasDriver1);
        await currentLineup.get('Haas').push(haasDriver2);
        //Makes global changes
       
        await seasonData.setCurrentLineupLigaFR(currentLineup);
      
    }

    async findMainTeamString(member, seasonData){
        if(member.roles.cache.has(seasonData.getMercedesRolleID())){
            return 'Mercedes';
        } else if(member.roles.cache.has(seasonData.getRedBullRolleID())){
            return 'Red Bull';
        } else if(member.roles.cache.has(seasonData.getFerrariRolleID())){
            return 'Ferrari';
        } else if(member.roles.cache.has(seasonData.getMcLarenRolleID())){
            return 'McLaren';
        } else if(member.roles.cache.has(seasonData.getAstonMartinRolleID())){
            return 'Aston Martin';
        } else if(member.roles.cache.has(seasonData.getAlpineRolleID())){
            return 'Alpine';
        } else if(member.roles.cache.has(seasonData.getAlphaTauriRolleID())){
            return 'Alpha Tauri';
        } else if(member.roles.cache.has(seasonData.getAlfaRomeoRolleID())){
            return 'Alfa Romeo';
        } else if(member.roles.cache.has(seasonData.getWilliamsRolleID())){
            return 'Williams';
        } else if(member.roles.cache.has(seasonData.getHaasRolleID())){
            return 'Haas';
        } else {

        }
    }

    async checkIfCarisFree(client, carToTake, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        
        currentLineup = seasonData.getCurrentLineupLigaFR();
        
        let teamNameString = client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name;
        if(currentLineup.get(teamNameString)[0] == `nicht besetzt` || currentLineup.get(teamNameString)[1] == `nicht besetzt`){
            return true;
        } else {
            return false;
        }
    }

    async initVariables(currentRaceLocation, seasonData){
        
       
        await seasonData.setSubPersonListLigaFR(new Array());
        await seasonData.setsubPersonListReinstatedDriversLigaFR(new Array());
        await seasonData.setFreeCarsLigaFR(new Array());
        await seasonData.setWithdrawnDriversLigaFR(new Array());
        await seasonData.setWithdrawnDriversPerCommandLigaFR(new Array());
        await seasonData.setSubInDriversPerCommandLigaFR(new Array());
        await seasonData.setReactedToSignOutLigaFR(new Map());
        await seasonData.setReactedToSubInLigaFR(new Map());
        await seasonData.setLineupMsgLigaFR(null);
        await seasonData.setAnmeldungActiveLigaFR(true);
        await seasonData.setCurrentRaceLocationLigaFR(currentRaceLocation);
       
    }

    async clearChannels(client, seasonData){
        //Gets all the information
        let anmeldeChannelID = null;
        let abmeldeChannelID = null;
        
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaFR();
       
    
        await client.channels.cache.get(anmeldeChannelID).bulkDelete(100).then(() => {
            let date = new Date().toLocaleString();
            console.log(`Der Anmelde-Channel in ${seasonData.getLigatitel()} wurde gecleart -- ${date}`)
        });
        await client.channels.cache.get(abmeldeChannelID).bulkDelete(100).then(() => {
            let date = new Date().toLocaleString();
            console.log(`Der Abmelde-Channel in ${seasonData.getLigatitel()} wurde gecleart -- ${date}`)
        });
    }

    async sendFreeCarsWaitListDefaultLineup(client, seasonData){ 
        //Gets all the information
        let anmeldeChannelID = null;
        let ersatzfahrerRolleID = null;
        let currentRaceLocation = null;
       
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaFR();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaFR();
       
        await client.channels.cache.get(anmeldeChannelID).send(`<@&${ersatzfahrerRolleID}> die Anmeldung für das ` + 
                                                              `Ligarennen in ${currentRaceLocation} ist hiermit eröffnet!`).then(() => {
            let date = new Date().toLocaleString();
            console.log(`Die Anmeldung für ${seasonData.getLigatitel()} in ${currentRaceLocation} wurde eröffnet. -- ${date}`);
        });
        // Message for List of waiting drivers
        await client.channels.cache.get(anmeldeChannelID).send(`Warteliste:`).then((msg) => {
           
            seasonData.setWaitlistMsgIDLigaFR(msg.id);
           
        });            
        // Message for List of free cars
        await client.channels.cache.get(anmeldeChannelID).send(`Freie Autos:`).then((msg) => {
           
            seasonData.setFreeCarMsgIDLigaFR(msg.id);
           
        })    
        await this.printLineup(client, seasonData);
        let date = new Date().toLocaleString();
        console.log(`Das Standard Lineup wurde gesendet in ${seasonData.getLigatitel()} -- ${date}`);
    }

    async subDriverIn(client, driverObject, seasonData){     
        let anmeldeChannelID = null;     
        let subPersonList = new Array();
        let withdrawnDrivers = new Array();
       
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        subPersonList = seasonData.getSubPersonListLigaFR();
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
       

        if(driverObject.id){
            subPersonList.push(driverObject.id);
        }else{
            return;
        }
        
        if(withdrawnDrivers.includes(driverObject.id)){
            withdrawnDrivers.splice(withdrawnDrivers.indexOf(driverObject.id), 1);
        }
        let subInEmbed = new EmbedBuilder()
        .setColor('#4ef57b')
        .setTitle('➡️')
        .addFields(
            {name: `Update`, value: `<@${driverObject.id}> hat sich für diese Woche angemeldet`}
        );
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [subInEmbed]}).then(() => {
            client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(seasonData.getLogChannelID()).send({ embeds : [subInEmbed]});
        });
        let date = new Date().toLocaleString();
        console.log(`${driverObject.username} hat sich erfolgreich angemeldet in ${seasonData.getLigatitel()} -- ${date}`);
        
        //Make changes global
        
       
        await seasonData.setSubPersonListLigaFR(subPersonList);
        await seasonData.setWithdrawnDriversLigaFR(withdrawnDrivers);      
       

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async regularDriverWithdraw(client, driverObject, seasonData){
        //Get current info
        let abmeldeChannelID = null;
        let withdrawnDrivers = new Array();
        
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaFR();   
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
       
        //Do stuff
        withdrawnDrivers.push(driverObject.id);
        await this.addCarOfWithdrawnDriverToFreeCars(driverObject, seasonData, client);
        await this.removeFromCurrentLineup(client, driverObject, null, seasonData);
        let driverWithdrawnEmbed = new EmbedBuilder()
        .setColor('#ff4d4d')
        .setTitle('⬅️')
        .addFields(
            {name: `Update im Lineup`, value: `<@${driverObject.id}> ist diese Woche nicht dabei`}
        )
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(abmeldeChannelID).send({ embeds : [driverWithdrawnEmbed]}).then(() => {
            client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(seasonData.getLogChannelID()).send({ embeds : [driverWithdrawnEmbed]});
        });
        let date = new Date().toLocaleString();
        console.log(`${driverObject.username} hat sich erfolgreich abgemeldet in ${seasonData.getLigatitel()} -- ${date}`); 
        
        //Make changes global
        
        await seasonData.setWithdrawnDriversLigaFR(withdrawnDrivers);      
       

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async subDriverRemoveSubInOnWaitlist(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;//
        let subPersonList = new Array();//
        
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        subPersonList = seasonData.getSubPersonListLigaFR();
       
        //Do stuff
        subPersonList.splice(subPersonList.indexOf(driverObject.id), 1); 
        let subInRemoveEmbed = new EmbedBuilder()
        .setColor('#ff4d4d')
        .setTitle('️️️️️️️️️️️️️️️↩')
        .addFields(
            {name: `Update im Lineup`, value: `<@${driverObject.id}> ist diese Woche doch nicht dabei`}
        );
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [subInRemoveEmbed]}).then(() => {
            client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(seasonData.getLogChannelID()).send({ embeds : [subInRemoveEmbed]});
        });
        let date = new Date().toLocaleString();
        console.log(`${driverObject.username} wurde erfolgreich von der Warteliste entfernt in ${seasonData.getLigatitel()} -- ${date}`);
        
        //Make changes global
       
        await seasonData.setSubPersonListLigaFR(subPersonList);     
        

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async subDriverRemoveSubInInLineup(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;//
        let freeCars = new Array()//
       
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        freeCars = seasonData.getFreeCarsLigaFR();
      
        //Do stuff
        let freeCar = await this.findCurrentCockpitOfSub(driverObject, seasonData);
        freeCars.unshift(freeCar);
        await this.removeFromCurrentLineup(client, driverObject, freeCar, seasonData);
        let subInRemoveEmbed = new EmbedBuilder()
        .setColor('#ff4d4d')
        .setTitle('️️️️️️️️️️️️️️️↩')
        .addFields(
            {name: `Update im Lineup`, value: `<@${driverObject.id}> ist diese Woche doch nicht dabei`}
        );
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [subInRemoveEmbed]}).then(() => {
            client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(seasonData.getLogChannelID()).send({ embeds : [subInRemoveEmbed]});
        });
        let date = new Date().toLocaleString();
        console.log(`${driverObject.nickname} wurde erfolgreich aus Lineup genommen in ${seasonData.getLigatitel()} -- ${date}`);
        
        //Make changes global
       
        await seasonData.setFreeCarsLigaFR(freeCars);    
        
        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async regularDriverRemoveWithdraw(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;
        let withdrawnDrivers = new Array();
        let reinstatedDrivers = new Array();
        
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
        reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaFR();
        
        //Do stuff
        reinstatedDrivers.push(driverObject.id);
        withdrawnDrivers.splice(withdrawnDrivers.indexOf(driverObject.id), 1);
        let withdrawRemoveEmbed = new EmbedBuilder()
        .setColor('#4ef57b')
        .setTitle('️️️️️️️️↪')
        .addFields(
            {name: `Update`, value: `<@${driverObject.id}> ist diese Woche doch dabei`}
        );
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [withdrawRemoveEmbed]}).then(() => {
            client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(seasonData.getLogChannelID()).send({ embeds : [withdrawRemoveEmbed]});
        })
        let date = new Date().toLocaleString();
        console.log(`Die Abmeldung von ${driverObject.username} wurde erfolgreich zurückgenommen  ${seasonData.getLigatitel()} -- ${date}`);
        
        //Make changes global
       
    
        await seasonData.setsubPersonListReinstatedDriversLigaFR(reinstatedDrivers);
        await seasonData.setWithdrawnDriversLigaFR(withdrawnDrivers);      
        

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async sendTeams(client, seasonData){
        //Get current info
        let currentRegularDriver = null;
        let regularDrivers = new Map();
        let mercedesDrivers = new Array();
        let redBullDrivers = new Array();
        let ferrariDrivers = new Array();
        let mcLarenDrivers = new Array();
        let astonMartinDrivers = new Array();
        let alpineDrivers = new Array();
        let alphaTauriDrivers = new Array();
        let alfaRomeoDrivers = new Array();
        let williamsDrivers = new Array();
        let haasDrivers = new Array();
        
        currentRegularDriver = seasonData.getCurrentRegularDriversLigaFR();
        regularDrivers = seasonData.getRegularDriversLigaFR();
        mercedesDrivers = seasonData.getMercedesDriversLigaFR();
        redBullDrivers = seasonData.getRedBullDriversLigaFR();
        ferrariDrivers = seasonData.getFerrariDriversLigaFR();
        mcLarenDrivers = seasonData.getMcLarenDriversLigaFR();
        astonMartinDrivers = seasonData.getAstonMartinDriversLigaFR();
        alpineDrivers = seasonData.getAlpineDriversLigaFR();
        alphaTauriDrivers = seasonData.getAlphaTauriDriversLigaFR();
        alfaRomeoDrivers = seasonData.getAlfaRomeoDriversLigaFR();
        williamsDrivers = seasonData.getWilliamsDriversLigaFR();
        haasDrivers = seasonData.getHaasDriversLigaFR();
        

        if(currentRegularDriver != null){
            await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(seasonData.getTeamsChannelID()).messages.fetch(currentRegularDriver).then((msg) => {
                msg.delete();
            })
        }
        regularDrivers.set("Mercedes", mercedesDrivers);
        regularDrivers.set("Red Bull", redBullDrivers);
        regularDrivers.set("Ferrari", ferrariDrivers);
        regularDrivers.set("McLaren", mcLarenDrivers);
        regularDrivers.set("Aston Martin", astonMartinDrivers);
        regularDrivers.set("Alpine", alpineDrivers);
        regularDrivers.set("Alpha Tauri", alphaTauriDrivers);
        regularDrivers.set("Alfa Romeo", alfaRomeoDrivers);
        regularDrivers.set("Williams", williamsDrivers);
        regularDrivers.set("Haas", haasDrivers);
        let regularDriverEmbed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('️️️️️️️️Stammfahrer Liga Freitag')
        .addFields(
            {name: `Mercedes`, value: `<@${await regularDrivers.get('Mercedes')[0]}> und <@${await regularDrivers.get('Mercedes')[1]}>`},
            {name: `Red Bull`, value: `<@${await regularDrivers.get('Red Bull')[0]}> und <@${await regularDrivers.get('Red Bull')[1]}>`},
            {name: `Ferrari`, value: `<@${await regularDrivers.get('Ferrari')[0]}> und <@${await regularDrivers.get('Ferrari')[1]}>`},
            {name: `McLaren`, value: `<@${await regularDrivers.get('McLaren')[0]}> und <@${await regularDrivers.get('McLaren')[1]}>`},
            {name: `Aston Martin`, value: `<@${await regularDrivers.get('Aston Martin')[0]}> und <@${await regularDrivers.get('Aston Martin')[1]}>`},
            {name: `Alpine`, value: `<@${await regularDrivers.get('Alpine')[0]}> und <@${await regularDrivers.get('Alpine')[1]}>`},
            {name: `Alpha Tauri`, value: `<@${await regularDrivers.get('Alpha Tauri')[0]}> und <@${await regularDrivers.get('Alpha Tauri')[1]}>`},
            {name: `Alfa Romeo`, value: `<@${await regularDrivers.get('Alfa Romeo')[0]}> und <@${await regularDrivers.get('Alfa Romeo')[1]}>`},
            {name: `Williams`, value: `<@${await regularDrivers.get('Williams')[0]}> und <@${await regularDrivers.get('Williams')[1]}>`},
            {name: `Haas`, value: `<@${await regularDrivers.get('Haas')[0]}> und <@${await regularDrivers.get('Haas')[1]}>`}
        );
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(seasonData.getTeamsChannelID()).send({ embeds : [regularDriverEmbed]}).then((msg) => {
            
            
            seasonData.setCurrentRegularDriversLigaFR(msg.id);
            seasonData.setRegularDriversLigaFR(regularDrivers);
            
        })
    }

    async findCurrentCockpitOfSub(driverObject, seasonData){
        //Get current info
        let currentLineup = new Array();
       
        currentLineup = seasonData.getCurrentLineupLigaFR();
        

        //Do stuff
        if(currentLineup.get('Mercedes').includes(driverObject.id)){
            return seasonData.getMercedesRolleID();
        } else if(currentLineup.get('Red Bull').includes(driverObject.id)){
            return seasonData.getRedBullRolleID();
        } else if(currentLineup.get('Ferrari').includes(driverObject.id)){
            return seasonData.getFerrariRolleID();
        } else if(currentLineup.get('McLaren').includes(driverObject.id)){
            return seasonData.getMcLarenRolleID();
        } else if(currentLineup.get('Aston Martin').includes(driverObject.id)){
            return seasonData.getAstonMartinRolleID();
        } else if(currentLineup.get('Alpine').includes(driverObject.id)){
            return seasonData.getAlpineRolleID();
        } else if(currentLineup.get('Alpha Tauri').includes(driverObject.id)){
            return seasonData.getAlphaTauriRolleID();
        } else if(currentLineup.get('Alfa Romeo').includes(driverObject.id)){
            return seasonData.getAlfaRomeoRolleID();
        } else if(currentLineup.get('Williams').includes(driverObject.id)){
            return seasonData.getWilliamsRolleID();
        } else if(currentLineup.get('Haas').includes(driverObject.id)){
            return seasonData.getHaasRolleID();
        } else {
            console.log(`WIR SIND DURCH GEFALLEN! findCurrentCockpitOfSub in ${seasonData.getLigatitel()}`)
        }
    }

    async checkDriverInLineup(driverID, seasonData){
        //Get current info
        let currentLineup = new Array();
        currentLineup = seasonData.getCurrentLineupLigaFR();
       

        if(currentLineup.get('Mercedes').includes(driverID)){
            return true;
        } else if(currentLineup.get('Red Bull').includes(driverID)){
            return true;
        }  else if(currentLineup.get('Ferrari').includes(driverID)){
            return true;
        } else if(currentLineup.get('McLaren').includes(driverID)){
            return true;
        } else if(currentLineup.get('Aston Martin').includes(driverID)){
            return true;
        } else if(currentLineup.get('Alpine').includes(driverID)){
            return true;
        } else if(currentLineup.get('Alpha Tauri').includes(driverID)){
            return true;
        } else if(currentLineup.get('Alfa Romeo').includes(driverID)){
            return true;
        } else if(currentLineup.get('Williams').includes(driverID)){
            return true;
        } else if(currentLineup.get('Haas').includes(driverID)){
            return true;
        } else {
            return false;
        }
    }

    async startFunction(client, message, seasonData, timeTillClose){
        let seasonCalendar = new Array();
        
        seasonCalendar = seasonData.getSeasonCalendarLigaFR();
       
        //Init
        await this.initVariables(seasonCalendar.shift(), seasonData);
        //Get information
        //Check new for every reaction
        let anmeldungActive = false;
        let subDriverInPerCommand = new Array();
        let subPersonList = new Array();
        let reactedToSubIn = new Array();
        let reactedToSignOut = new Array();
        let withdrawnDriversPerCommand = new Array();
        //Only check at begining
        let anmeldeChannelID = null;
        let abmeldeChannelID = null;
        let ersatzfahrerRolleID = null;
        let stammfahrerRolleID = null;
        let currentRaceLocation = null;
        
        seasonCalendar = seasonData.getSeasonCalendarLigaFR();
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaFR();
        anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
        subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaFR();
        ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaFR();
        subPersonList = seasonData.getSubPersonListLigaFR();        
        stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaFR();
        reactedToSubIn = seasonData.getReactedToSubInLigaFR();
        reactedToSignOut = seasonData.getReactedToSignOutLigaFR();
        withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaFR();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaFR();
        
        //Do stuff
        
        await this.clearChannels(client, seasonData);
        await this.setDefaultLineup(seasonData);
        await this.sendTeams(client, seasonData);
        await this.sendFreeCarsWaitListDefaultLineup(client, seasonData);
        // get current race location
        
        //
        let embedAnmeldung = new EmbedBuilder()
        .setColor('#0064fd')
        .setTitle('Anmeldung für Ersatzfahrer')
        .setDescription(`Diese Nachricht ist NUR für Ersatzfahrer relevant. Um euch anzumelden für das Ligarennen in ${currentRaceLocation} bitte mit ` +
                        `dem ✅ unter dieser Nachricht reagieren, falls ihr mitfahren wollt. `+
                        `Die Ersatzfahrer werden, sobald ein Cockpit frei wird, eingefügt. Hier gilt, wer sich zuerst anmeldet kriegt zuerst ein Cockpit. ` +
                        `Wenn ihr ein Cockpit habt, kriegt ihr vom Bot eine Privatnachricht. Trotzdem bitte hin ` +
                        `und wieder mal auf den Discord schauen. Wenn ihr ein Cockpit habt wird euer Name ins Lineup, im Infochannel, eingetragen. \n \n` +
                        `Wenn ihr doch keine Zeit habt, könnt ihr ganz einfach eure Reaktion unter dieser Nachricht wieder entfernen ` +
                        `und seid nicht mehr angemeldet. Ihr könnt NICHT im Abmelde-Channel reagieren. \n \n Bei Unklarheit bitte den %help-Command ausführen. Falls ihr nicht ` +
                        `reagieren könnt, könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch.`)
        
        let embedAbmeldung = new EmbedBuilder()
        .setColor('#0064fd')
        .setTitle('Abmeldung für Stammfahrer')
        .setDescription(`Diese Nachricht ist NUR für die Stammfahrer relevant. Um euch abzumelden für das Ligarennen in ${currentRaceLocation} bitte mit dem ❌ reagieren, falls ihr ` +
                        `nicht könnt. Falls ihr doch könnt und mitfahren wollt, also eure Abmeldung wieder zurück ziehen wollt, entfernt einfach eure ` +
                        `Reaktion unter dieser Nachricht wieder. Ihr könnt euch NICHT im Anmelde-Channel wieder anmelden. Falls ihr nicht reagieren könnt, ` +
                        `könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch`)
        
        var collectorSubIn = null;
        
        await client.channels.cache.get(anmeldeChannelID).send({ embeds: [embedAnmeldung] }).then((msg) => {
           
            seasonData.setMessageEmbedAnmeldenLigaFR(msg);
            msg.react(seasonData.getAnmeldeEmoji());
            collectorSubIn = msg.createReactionCollector({ dispose: true});
            
        });
        var collectorWithdraw = null;
        await client.channels.cache.get(abmeldeChannelID).send({ embeds: [embedAbmeldung] }).then((msg) => {
           
            seasonData.setMessageEmbedAbmeldenLigaFR(msg);
            msg.react(seasonData.getAbmeldeEmoji());
            collectorWithdraw = msg.createReactionCollector({ dispose: true});
          
        });
    
        // Hinzufügen von Rolle
        collectorSubIn.on('collect', async (reaction, user) => {
            //Get information
            //Check new for every reaction
                  
            anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaFR();                                               
            reactedToSubIn = seasonData.getReactedToSubInLigaFR();                  
           
            //Do stuff
            if(reaction.message.partial){
            await reaction.message.fetch();
            }
            if(reaction.partial){
            await reaction.fetch();
            }
            if(user.bot){
            return;
            }
            if(!(reaction.message.guild)){
            return;
            }
            // Anmeldevorgang
            if(reaction.message.channel.id == anmeldeChannelID){
                if(anmeldungActive == true){
                    // insert reaction into reacted to sub in list
                    
                    if(reactedToSubIn.has(user.id)){
                        let date = new Date().toLocaleString();
                        console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                    } else {
                        reactedToSubIn.set(user.id, reaction)
                        let date = new Date().toLocaleString();
                        console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                        await seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                    }
                    

                    if(reaction.emoji.name === seasonData.getAnmeldeEmoji() && !subDriverInPerCommand.includes(user.id) &&
                        reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleID)){                          
                        this.subDriverIn(client, reaction.message.guild.members.cache.get(user.id), seasonData);
                    } else if(reaction.emoji.name != seasonData.getAnmeldeEmoji()) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${seasonData.getLigatitel()}-- ${date}`);
                    } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleID))) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich anzumelden, hat aber die Stammfahrer ` + 
                        `Rolle in ${seasonData.getLigatitel()} nicht -- ${date}`);
                    } else {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl angemeldet in ${seasonData.getLigatitel()} -- ${date}`);
                    }             
                }else{
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte sich abmelden, aber Anmeldung war schon beendet ${seasonData.getLigatitel()} -- ${date}`);
                }
            
            }
        });
        // Abmeldevorgang
        collectorWithdraw.on('collect', async (reaction, user) => {
            //Get information
            //Check new for every reaction
                      
            anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaFR();     
            reactedToSignOut = seasonData.getReactedToSignOutLigaFR();                 
           
            //Do stuff
            if(reaction.message.channel.id == abmeldeChannelID){
                if(anmeldungActive == true){
                    
                    if(reaction.message.partial){
                        await reaction.message.fetch();
                    }
                    if(reaction.partial){
                        await reaction.fetch();
                    }
                    if(user.bot){
                        return;
                    }
                    if(!(reaction.message.guild)){
                        return;
                    }
                    if(reaction.emoji.name === seasonData.getAbmeldeEmoji() && !(withdrawnDriversPerCommand.includes(user.id)) &&
                        reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleID)){
                        //Local change 
                        
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction)
                            let date = new Date().toLocaleString();
                            console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                            await seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                        }
                      
                        //Do stuff
                        this.regularDriverWithdraw(client, reaction.message.guild.members.cache.get(user.id), seasonData);                          
                    } else if(reaction.emoji.name !== seasonData.getAbmeldeEmoji()) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${seasonData.getLigatitel()} -- ${date}`);
                    } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleID))) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich abzumelden, hat aber die Stammfahrer ` + 
                        `Rolle in ${seasonData.getLigatitel()} nicht -- ${date}`);
                    } else {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl abgemeldet in ${seasonData.getLigatitel()} -- ${date}`);
                    }
                } else {
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte sich abmelden, aber Anmeldung war schon beendet ${seasonData.getLigatitel()} -- ${date}`);
                }
                
                                    
            }
        });
        
        // Entfernen von Rollen
        collectorSubIn.on('remove', async (reaction, user) => {
            //Get information
            //Check new for every reaction
                          
            anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaFR();                                               
            reactedToSubIn = seasonData.getReactedToSubInLigaFR();                  
           
            //Do stuff
            if(reaction.message.partial){
                await reaction.message.fetch();
            }
            if(reaction.partial){
                await reaction.fetch();
            }
            if(user.bot){
                return;
            }
            if(!(reaction.message.guild)){
                return;
            }
            // Entfernen von Anmeldung 
            if(reaction.message.channel.id == anmeldeChannelID){
                if(anmeldungActive == true){
                    if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleID)){
                        if(reaction.emoji.name == seasonData.getAnmeldeEmoji()){
                            reactedToSubIn.delete(user.id);
                            
                            seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                           
                            // Checkt ob Fahrer mit Command abgemeldet wurde
                            if(subDriverInPerCommand.includes(user.id)){
                                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} wurde die Reaktion verweigert, da er per Command abgemeldet ist in ${seasonData.getLigatitel()} -- ${date}`);
                            } else {    
                                // Fahrer ist noch auf Warteliste
                                if(subPersonList.includes(reaction.message.guild.members.cache.get(user.id).user.id)){
                                    this.subDriverRemoveSubInOnWaitlist(client, reaction.message.guild.members.cache.get(user.id), seasonData);
                                }
                                // Fahrer ist nicht mehr auf Warteliste
                                else if(await this.checkDriverInLineup(user.id, seasonData)) {
                                    this.subDriverRemoveSubInInLineup(client, reaction.message.guild.members.cache.get(user.id), seasonData);
                                } else {
                                    let date = new Date().toLocaleString();
                                    console.log(`Der entfernte Fahrer war weder im Lineup noch auf der Warteliste in ${seasonData.getLigatitel()} -- ${date}`)
                                }
                            }                  
                        } else {
                            await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                            let date = new Date().toLocaleString();
                            console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${seasonData.getLigatitel()} -- ${date}`);              
                        }
                    } else {
                        let date = new Date().toLocaleString();
                        console.log(`Die Reaktion von ${user.username} wurde entfernt, allerdings hat er nicht die richtige Rolle gehabt in ${seasonData.getLigatitel()} ` + 
                        `beim Entfernen -- ${date}`)
                    }
                } else {
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte seine Anmeldung entfernen, aber Anmeldung` + 
                    ` war schon beendet in ${seasonData.getLigatitel()} -- ${date}`);
                }
            
                
            }
        });  
        // Entfernen von Abmeldung
        collectorWithdraw.on('remove', async (reaction, user) => {
            //Get information
            //Check new for every reaction
                     
            anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaFR();     
            reactedToSignOut = seasonData.getReactedToSignOutLigaFR();                 
           
            //Do stuff
            if(reaction.message.partial){
                await reaction.message.fetch();
            }
            if(reaction.partial){
                await reaction.fetch();
            }
            if(user.bot){
                return;
            }
            if(!(reaction.message.guild)){
                return;
            }
            if(reaction.message.channel.id == abmeldeChannelID){
                if(anmeldungActive == true){
                    let date = new Date();
                    console.log(`In ${seasonData.getLigatitel()} hat ${user.username} mit ID ${user.id} seine Abmeldung zurückgenommen. Prüfsumme(darf niemals undefined sein): 
                                ID: ${reaction.message.guild.members.cache.get(user.id).id}, DC-Name: ${reaction.message.guild.members.cache.get(user.id).nickname} -- ${date}`)
                    if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleID)){
                        if(reaction.emoji.name == seasonData.getAbmeldeEmoji()){
                            reactedToSignOut.delete(user.id);
                            
                            await seasonData.setReactedToSignOutLigaFR(reactedToSignOut);
                            
                            if(!(withdrawnDriversPerCommand.includes(user.id))){
                                this.regularDriverRemoveWithdraw(client, reaction.message.guild.members.cache.get(user.id), seasonData);
                                let date = new Date();
                                console.log(`Die Reaktion von ${reaction.message.guild.members.cache.get(user.id).nickname} zum Abmelden wurde erfolgreich` + 
                                ` entfernt in ${seasonData.getLigatitel()}. -- ${date}`);
                            } else {
                                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} wurde die Reaktion verweigert, da er schon per Command abgemeldet wurde in ${seasonData.getLigatitel()} -- ${date}`);
                            }
                        }else {
                            await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                            let date = new Date().toLocaleString();
                            console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${seasonData.getLigatitel()} -- ${date}`);   
                        }      
                    } else {
                        let date = new Date().toLocaleString();
                        console.log(`Die Reaktion von ${user.username} wurde entfernt, allerdings hat er nicht die richtige Rolle gehabt in ${seasonData.getLigatitel()} -- ${date}`)
                    }
                } else {
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte seine Anmeldung entfernen, aber Anmeldung` + 
                    ` war schon beendet in ${seasonData.getLigatitel()} -- ${date}`);
                }
            
            }
        });
        var timeTillReminder = timeTillClose - (20 * 1000)
        setTimeout(() => this.reminderOpenCockpits(client, seasonData), timeTillReminder)
        setTimeout(() => this.endFunction(client, seasonData), timeTillClose)
    }

    async endFunction(client, seasonData){
        //Get info
        let anmeldeChannelID = null;
        let abmeldeChannelID = null;
        let currentRaceLocation = null;
        let seasonCalendarRacesDone = new Map();
        
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaFR();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaFR();
        seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaFR();
      
        //Do stuff
        
        seasonData.setAnmeldungActiveLigaFR(false);
       
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(anmeldeChannelID).send(`Die Anmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Anmeldung in ${seasonData.getLigatitel()} wurde beendet`);
        })
        
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(abmeldeChannelID).send(`Die Abmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Abmeldung in ${seasonData.getLigatitel()} wurde beendet`);
        })
        seasonCalendarRacesDone.unshift(currentRaceLocation);
       
        seasonData.setSeasonCalendarRacesDoneLigaFR(seasonCalendarRacesDone);
        seasonData.setCurrentRaceLocationLigaFR(null);
       
        
    }

    async reminderOpenCockpits(client, seasonData){

        var freeCars = seasonData.getFreeCarsLigaFR();
        var waitlist = seasonData.getSubPersonListLigaFR();
        var discordID = seasonData.getDiscordID();
        var anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        var anmeldeChannel =  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelID);
        var ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaFR()

        if(freeCars.length > 0 && waitlist.length == 0){
            await anmeldeChannel.send(`<@&${ersatzfahrerRolleID}> es sind noch Plätze frei, immer schön rein da.`)
            let date = new Date().toLocaleString();
            console.log(`Reminder in Liga X wurde gesendet. -- ${date}`)
        }else{
            console.log(`First not`)
            setTimeout(async () => {
                if(freeCars.length > 0 && waitlist.length == 0){
                    await anmeldeChannel.send(`<@&${ersatzfahrerRolleID}> es sind noch Plätze frei, immer schön rein da.`)
                    let date = new Date().toLocaleString();
                    console.log(`Reminder in Liga X wurde gesendet. -- ${date}`)
                }
            }, 10 * 1000)
        }

    }

    async getMercedesDrivers(client){
        //Get drivers
        var leagueID = -1;
        var mercedesDrivers = new Array();

       
        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Mercedes').then(async function(res){
                console.log(`Query for Team Mercedes ID was successful -- ${new Date().toLocaleString()}`)
                var mercedesTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, mercedesTeamID).then(async function(res){
                    console.log(`Query for drivers from team Mercedes was successful -- ${new Date().toLocaleString()}`)

                    var mercDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            mercDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                mercDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var mercDriversDcID = new Array()

                    await client.getDiscordIDs(mercDriversPersID, mercDriversDcID).then(async function(res){
                        console.log(`Query for drivers Discord IDs from team Mercedes was successful -- ${new Date().toLocaleString()}`)
                        await res.forEach(driver => {
                            mercedesDrivers.push(driver)
                        })

                        if(mercedesDrivers.length == 0){
                            mercedesDrivers.push('entfernt')
                            mercedesDrivers.push('entfernt')
                        } else if(mercedesDrivers.length == 1){
                            mercedesDrivers.push('entfernt')
                        }

                        mercedesDrivers.forEach(driver => {
                            console.log(driver)
                        })
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })

       
        return mercedesDrivers
    }

    async getRedBullDrivers(client){
        //Get drivers
        var leagueID = -1;
        var redBullDrivers = new Array();

       
        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Red Bull').then(async function(res){
                console.log(`Query for Team Red Bull ID was successful -- ${new Date().toLocaleString()}`)
                var redBullTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, redBullTeamID).then(async function(res){
                    console.log(`Query for drivers from team Red Bull was successful -- ${new Date().toLocaleString()}`)

                    var redBullDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            redBullDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                redBullDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var redBullDriversDcID = new Array()

                    await client.getDiscordIDs(redBullDriversPersID, redBullDriversDcID).then(async function(res){
                        console.log(`Query for drivers Discord IDs from team Red Bull was successful -- ${new Date().toLocaleString()}`)
                        await res.forEach(driver => {
                            redBullDrivers.push(driver)
                        })

                        if(redBullDrivers.length == 0){
                            redBullDrivers.push('entfernt')
                            redBullDrivers.push('entfernt')
                        } else if(redBullDrivers.length == 1){
                            redBullDrivers.push('entfernt')
                        }
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })

       

        return redBullDrivers
    }

    async getFerrariDrivers(client){
         //Get drivers
         var leagueID = -1;
         var ferrariDrivers = new Array();
 
        
         await client.getLeagueID('Sonntag 1').then(async function(res){
             console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)
 
             leagueID = res[0].league_id
             
             await client.getTeamID('Ferrari').then(async function(res){
                 console.log(`Query for Team Ferrari ID was successful -- ${new Date().toLocaleString()}`)
                 var ferrariTeamID = res[0].id 
 
                 await client.getTeamDrivers(leagueID, ferrariTeamID).then(async function(res){
                     console.log(`Query for drivers from team Ferrari was successful -- ${new Date().toLocaleString()}`)
 
                     var ferrariDriversPersID = new Array()
                     res.forEach(entry => {
                         if(entry.gueltigbis == 'NULL'){
                            ferrariDriversPersID.push(entry.persid)
                         } else {
                             var currentDate = new Date();
                             var gueltigBisDriver = new Date(entry.gueltigbis)
                             console.log(gueltigBisDriver)
 
                             if(currentDate - gueltigBisDriver < 0){
                                ferrariDriversPersID.push(entry.persid)
                             } else {
                                 console.log('Kein Stamm mehr')
                             }
                         }
                     })
 
                     var ferrariDriversDcID = new Array()
 
                     await client.getDiscordIDs(ferrariDriversPersID, ferrariDriversDcID).then(async function(res){
                         console.log(`Query for drivers Discord IDs from team Ferrari was successful -- ${new Date().toLocaleString()}`)
                         await res.forEach(driver => {
                            ferrariDrivers.push(driver)
                         })

                         if(ferrariDrivers.length == 0){
                            ferrariDrivers.push('entfernt')
                            ferrariDrivers.push('entfernt')
                        } else if(ferrariDrivers.length == 1){
                            ferrariDrivers.push('entfernt')
                        }
                     }, function(err){
                         console.log(err)
                     })
                 }, function(err){
                     console.log(err)
                 })
             }, function(err){
                 console.log(err)
             })
         }, function(err){
             console.log(err)
         })
 
       

        return ferrariDrivers
    }

    async getMcLarenDrivers(client){
                //Get drivers
                var leagueID = -1;
                var mcLarenDrivers = new Array();
        
               
                await client.getLeagueID('Sonntag 1').then(async function(res){
                    console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)
        
                    leagueID = res[0].league_id
                    
                    await client.getTeamID('McLaren').then(async function(res){
                        console.log(`Query for Team McLaren ID was successful -- ${new Date().toLocaleString()}`)
                        var mcLarenTeamID = res[0].id 
        
                        await client.getTeamDrivers(leagueID, mcLarenTeamID).then(async function(res){
                            console.log(`Query for drivers from team McLaren was successful -- ${new Date().toLocaleString()}`)
        
                            var mcLarenDriversPersID = new Array()
                            res.forEach(entry => {
                                if(entry.gueltigbis == 'NULL'){
                                    mcLarenDriversPersID.push(entry.persid)
                                } else {
                                    var currentDate = new Date();
                                    var gueltigBisDriver = new Date(entry.gueltigbis)
                                    console.log(gueltigBisDriver)
        
                                    if(currentDate - gueltigBisDriver < 0){
                                        mcLarenDriversPersID.push(entry.persid)
                                    } else {
                                        console.log('Kein Stamm mehr')
                                    }
                                }
                            })
        
                            var mcLarenDriversDcID = new Array()
        
                            await client.getDiscordIDs(mcLarenDriversPersID, mcLarenDriversDcID).then(async function(res){
                                console.log(`Query for drivers Discord IDs from team McLaren was successful -- ${new Date().toLocaleString()}`)
                                await res.forEach(driver => {
                                    mcLarenDrivers.push(driver)
                                })

                                if(mcLarenDrivers.length == 0){
                                    mcLarenDrivers.push('entfernt')
                                    mcLarenDrivers.push('entfernt')
                                } else if(mcLarenDrivers.length == 1){
                                    mcLarenDrivers.push('entfernt')
                                }
                            }, function(err){
                                console.log(err)
                            })
                        }, function(err){
                            console.log(err)
                        })
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })

              
        
                return mcLarenDrivers
    }

    async getAstonMartinDrivers(client){
         //Get drivers
         var leagueID = -1;
         var astonMartinDrivers = new Array();
 
        
         await client.getLeagueID('Sonntag 1').then(async function(res){
             console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)
 
             leagueID = res[0].league_id
             
             await client.getTeamID('Aston Martin').then(async function(res){
                 console.log(`Query for Team Aston Martin ID was successful -- ${new Date().toLocaleString()}`)
                 var astonMartinTeamID = res[0].id 
 
                 await client.getTeamDrivers(leagueID, astonMartinTeamID).then(async function(res){
                     console.log(`Query for drivers from team Aston Martin was successful -- ${new Date().toLocaleString()}`)
 
                     var astonMartinDriversPersID = new Array()
                     res.forEach(entry => {
                         if(entry.gueltigbis == 'NULL'){
                            astonMartinDriversPersID.push(entry.persid)
                         } else {
                             var currentDate = new Date();
                             var gueltigBisDriver = new Date(entry.gueltigbis)
                             console.log(gueltigBisDriver)
 
                             if(currentDate - gueltigBisDriver < 0){
                                astonMartinDriversPersID.push(entry.persid)
                             } else {
                                 console.log('Kein Stamm mehr')
                             }
                         }
                     })
 
                     var astonMartinDriversDcID = new Array()
 
                     await client.getDiscordIDs(astonMartinDriversPersID, astonMartinDriversDcID).then(async function(res){
                         console.log(`Query for drivers Discord IDs from team Aston Martin was successful -- ${new Date().toLocaleString()}`)
                         await res.forEach(driver => {
                            astonMartinDrivers.push(driver)
                         })

                         if(astonMartinDrivers.length == 0){
                            astonMartinDrivers.push('entfernt')
                            astonMartinDrivers.push('entfernt')
                        } else if(astonMartinDrivers.length == 1){
                            astonMartinDrivers.push('entfernt')
                        }
                     }, function(err){
                         console.log(err)
                     })
                 }, function(err){
                     console.log(err)
                 })
             }, function(err){
                 console.log(err)
             })
         }, function(err){
             console.log(err)
         })
 
        

         return astonMartinDrivers
    }

    async getAlpineDrivers(client){
        //Get drivers
        var leagueID = -1;
        var alpineDrivers = new Array();

        
        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Alpine').then(async function(res){
                console.log(`Query for Team Alpine ID was successful -- ${new Date().toLocaleString()}`)
                var alpineTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, alpineTeamID).then(async function(res){
                    console.log(`Query for drivers from team Alpine was successful -- ${new Date().toLocaleString()}`)

                    var alpineDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            alpineDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                alpineDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var alpineDriversDcID = new Array()

                    await client.getDiscordIDs(alpineDriversPersID, alpineDriversDcID).then(async function(res){
                        console.log(`Query for drivers Discord IDs from team Alpine was successful -- ${new Date().toLocaleString()}`)
                        await res.forEach(driver => {
                            alpineDrivers.push(driver)
                        })

                        if(alpineDrivers.length == 0){
                            alpineDrivers.push('entfernt')
                            alpineDrivers.push('entfernt')
                        } else if(alpineDrivers.length == 1){
                            alpineDrivers.push('entfernt')
                        }
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })

       

        return alpineDrivers
    }

    async getAlphaTauriDrivers(client){
        //Get drivers
        var leagueID = -1;
        var alphaTauriDrivers = new Array();

        
        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Alpha Tauri').then(async function(res){
                console.log(`Query for Team Alpha Tauri ID was successful -- ${new Date().toLocaleString()}`)
                var alphaTauriTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, alphaTauriTeamID).then(async function(res){
                    console.log(`Query for drivers from team Alpha Tauri was successful -- ${new Date().toLocaleString()}`)

                    var alphaTauriDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            alphaTauriDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                alphaTauriDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var alphaTauriDriversDcID = new Array()

                    await client.getDiscordIDs(alphaTauriDriversPersID, alphaTauriDriversDcID).then(async function(res){
                        console.log(`Query for drivers Discord IDs from team Alpha Tauri was successful -- ${new Date().toLocaleString()}`)
                        await res.forEach(driver => {
                            alphaTauriDrivers.push(driver)
                        })

                        if(alphaTauriDrivers.length == 0){
                            alphaTauriDrivers.push('entfernt')
                            alphaTauriDrivers.push('entfernt')
                        } else if(alphaTauriDrivers.length == 1){
                            alphaTauriDrivers.push('entfernt')
                        }
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })

       

        return alphaTauriDrivers
    }

    async getAlfaRomeoDrivers(client){
        //Get drivers
        var leagueID = -1;
        var alfaRomeoDrivers = new Array();

       
        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Alfa Romeo').then(async function(res){
                console.log(`Query for Team Alfa Romeo ID was successful -- ${new Date().toLocaleString()}`)
                var alfaRomeoTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, alfaRomeoTeamID).then(async function(res){
                    console.log(`Query for drivers from team Alfa Romeo was successful -- ${new Date().toLocaleString()}`)

                    var alfaRomeoDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            alfaRomeoDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                alfaRomeoDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var alfaRomeoDriversDcID = new Array()

                    await client.getDiscordIDs(alfaRomeoDriversPersID, alfaRomeoDriversDcID).then(async function(res){
                        console.log(`Query for drivers Discord IDs from team Alfa Romeo was successful -- ${new Date().toLocaleString()}`)
                        await res.forEach(driver => {
                            alfaRomeoDrivers.push(driver)
                        })

                        if(alfaRomeoDrivers.length == 0){
                            alfaRomeoDrivers.push('entfernt')
                            alfaRomeoDrivers.push('entfernt')
                        } else if(alfaRomeoDrivers.length == 1){
                            alfaRomeoDrivers.push('entfernt')
                        }
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })

        

        return alfaRomeoDrivers       
    }

    async getWilliamsDrivers(client){
        //Get drivers
        var leagueID = -1;
        var williamsDrivers = new Array();

       
        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Williams').then(async function(res){
                console.log(`Query for Team Williams ID was successful -- ${new Date().toLocaleString()}`)
                var williamsTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, williamsTeamID).then(async function(res){
                    console.log(`Query for drivers from team Williams was successful -- ${new Date().toLocaleString()}`)

                    var williamsDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            williamsDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                williamsDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var williamsDriversDcID = new Array()

                    await client.getDiscordIDs(williamsDriversPersID, williamsDriversDcID).then(async function(res){
                        console.log(`Query for drivers Discord IDs from team Williams was successful -- ${new Date().toLocaleString()}`)
                        await res.forEach(driver => {
                            williamsDrivers.push(driver)
                        })

                        if(williamsDrivers.length == 0){
                            williamsDrivers.push('entfernt')
                            williamsDrivers.push('entfernt')
                        } else if(williamsDrivers.length == 1){
                            williamsDrivers.push('entfernt')
                        }
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })

        

        return williamsDrivers
    }

    async getHaasDrivers(client){
        //Get drivers
        var leagueID = -1;
        var haasDrivers = new Array();


        await client.getLeagueID('Sonntag 1').then(async function(res){
            console.log(`Query for league ID was successful -- ${new Date().toLocaleString()}`)

            leagueID = res[0].league_id
            
            await client.getTeamID('Haas').then(async function(res){
                console.log(`Query for Team Haas ID was successful -- ${new Date().toLocaleString()}`)
                var haasTeamID = res[0].id 

                await client.getTeamDrivers(leagueID, haasTeamID).then(async function(res){
                    console.log(`Query for drivers from team Haas was successful -- ${new Date().toLocaleString()}`)

                    var haasDriversPersID = new Array()
                    res.forEach(entry => {
                        if(entry.gueltigbis == 'NULL'){
                            haasDriversPersID.push(entry.persid)
                        } else {
                            var currentDate = new Date();
                            var gueltigBisDriver = new Date(entry.gueltigbis)
                            console.log(gueltigBisDriver)

                            if(currentDate - gueltigBisDriver < 0){
                                haasDriversPersID.push(entry.persid)
                            } else {
                                console.log('Kein Stamm mehr')
                            }
                        }
                    })

                    var haasDriversDcID = new Array()

                    await client.getDiscordIDs(haasDriversPersID, haasDriversDcID).then(async function(res){
                        console.log(`Query for drivers Discord IDs from team Haas was successful -- ${new Date().toLocaleString()}`)
                        await res.forEach(driver => {
                            haasDrivers.push(driver)
                        })

                        if(haasDrivers.length == 0){
                            haasDrivers.push('entfernt')
                            haasDrivers.push('entfernt')
                        } else if(haasDrivers.length == 1){
                            haasDrivers.push('entfernt')
                        }
                    }, function(err){
                        console.log(err)
                    })
                }, function(err){
                    console.log(err)
                })
            }, function(err){
                console.log(err)
            })
        }, function(err){
            console.log(err)
        })

        

        return haasDrivers       
    }
}

module.exports = MethodClass