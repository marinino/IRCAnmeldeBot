const { EmbedBuilder, Client } = require('discord.js');
const VariableClass = require('../dataClasses/VariablenDaten.js')

class MethodClass{
    async removeFromCurrentLineup(client, userToRemoveID, freeCar, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        let stammfahrerRolleID = null
      
        currentLineup = seasonData.getCurrentLineupLigaSA2();
        stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA2();
      
        var userToRemove = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(userToRemoveID);
        //Checks if user has stammfahrer
        if(userToRemove.roles.cache.has(stammfahrerRolleID)){
            //Change cockpit locally
            var tempNameString = await this.findMainTeamString(userToRemove, seasonData)
            if(currentLineup.get(tempNameString)[0] == userToRemove.id){
                currentLineup.get(tempNameString)[0] = 'nicht besetzt';
                let date = new Date().toLocaleString();
                console.log(`${userToRemove.nickname} wurde aus dem Lineup entfernt -- ${date}`);
            } else if(currentLineup.get(tempNameString)[1] == userToRemove.id){
                currentLineup.get(tempNameString)[1] = 'nicht besetzt';
                let date = new Date().toLocaleString();
                console.log(`${userToRemove.nickname} wurde aus dem Lineup entfernt -- ${date}`);
            } else {
                let date = new Date().toLocaleString();
                console.log(`Fehler beim Entfernen von ${userToRemove.nickname} aus dem Lineup in ${seasonData.getLigatitel()} -- ${date}`);
            }
            //Change in object
            
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
         
        } else {
            //Get all the information
            let teamNameString = null;
            if(freeCar == null){
                teamNameString = await this.findMainTeamString(userToRemove, seasonData);
            } else {
                let teamID = freeCar;
                teamNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(teamID).name;
            }
            let date = new Date();
            console.log(`Prüfsumme für das Entfernen eines Autos aus dem Lineup (removeFromCurrentLineup) in ${seasonData.getLigatitel()}
                        die ID des Teams welches zu Entfernen war ist ${teamNameString}. Darf nicht null sein -- ${date}`)
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
            
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
           
        }
    }

    async regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        
        currentLineup = seasonData.getCurrentLineupLigaSA2();
        
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
          
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
           
        } else {
            //Changes cockpit locally
            let mainTeamNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(mainTeamIDString).name;
            currentLineup.get(mainTeamNameString)[subDriverPosition] = driverToStart;
            let date = new Date().toLocaleString();
            console.log(`Method: regularDriverBack => Im ${mainTeamNameString} hat ${driverToStart} sein Cockpit wieder, 
                        das Cockpit war noch frei in ${seasonData.getLigatitel()} -- ${date}`);
            //Change content in object
           
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
            
        }
    }

    async changeLineupNormalSub(client, driverToStart, carToTake, seasonData){
        //Gets all the information
        let currentLineup = new Map();
       
        currentLineup = seasonData.getCurrentLineupLigaSA2();
       
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
      
        await seasonData.setCurrentLineupLigaSA2(currentLineup);
       
    }

    async changeLineupAfterForceOpen(driverToStart, carToTake, positionForForce, seasonData){
        //Gets all the information
        let currentLineup = new Map();
       
        currentLineup = seasonData.getCurrentLineupLigaSA2();
        
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        let date = new Date().toLocaleString();
        console.log(`Nachdem das Cockpit von ${carToTake} offen geforced wurde ist jetzt der Fahrer mit der
                    der ID ${driverToStart} drin in ${seasonData.getLigatitel()} -- ${date}`);
        //Changes cockpit globally
       
        await seasonData.setCurrentLineupLigaSA2(currentLineup);
        
    }

    async changeLineupAfterForceDedicated(driverToStart, carToTake, positionForForce, seasonData){
        //Gets all the information
        let currentLineup = new Map();
       
        currentLineup = seasonData.getCurrentLineupLigaSA2();
      
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        let date = new Date().toLocaleString();
        console.log(`In das Cockpit von ${carToTake} wurde der Fahrer mit der
                    der ID ${driverToStart} rein geforced in ${seasonData.getLigatitel()} -- ${date}`);
        //Changes cockpit globally
        
        await seasonData.setCurrentLineupLigaSA2(currentLineup);
       
    }

    async printLineup(client, seasonData){
        //Gets all the information
        var currentLineup = new Map();
        let msgLineupID = null;
        let infoChannelID = null;
        let currentRaceLocation = null;
       
        currentLineup = seasonData.getCurrentLineupLigaSA2();
        msgLineupID = seasonData.getLineupMsgLigaSA2();
        infoChannelID = seasonData.getInfoChannelIDLigaSA2();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA2();
      
        //Deletes lineup currently displayed in channel
        if(msgLineupID != null){
            await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(infoChannelID).messages.fetch(msgLineupID).then((msg) => {
                msg.delete();
                let date = new Date().toLocaleString();
                console.log(`Das aktuelle Lineup wurde gelöscht. In ${seasonData.getLigatitel()} -- ${date}`)
            })
        }
        //Sets content for new message
        if(currentLineup.get('Mercedes')[0] && currentLineup.get('Mercedes')[1] &&
            currentLineup.get('Red Bull')[0] && currentLineup.get('Red Bull')[1] &&
            currentLineup.get('Ferrari')[0] && currentLineup.get('Ferrari')[1] &&
            currentLineup.get('McLaren')[0] && currentLineup.get('McLaren')[1] &&
            currentLineup.get('Aston Martin')[0] && currentLineup.get('Aston Martin')[1] &&
            currentLineup.get('Alpine')[0] && currentLineup.get('Alpine')[1] &&
            currentLineup.get('Alpha Tauri')[0] && currentLineup.get('Alpha Tauri')[1] &&
            currentLineup.get('Alfa Romeo')[0] && currentLineup.get('Alfa Romeo')[1] &&
            currentLineup.get('Williams')[0] && currentLineup.get('Williams')[1] &&
            currentLineup.get('Haas')[0] && currentLineup.get('Haas')[1]){
            let lineupEmbed = new EmbedBuilder()
            .setColor('Purple')
            .setTitle('Aktuelles Lineup')
            .setDescription(`Die AKTUELLEN Fahrer aller Teams für das Rennen in ${currentRaceLocation} sind hier aufgelistet`)
            .addFields(
                {name: 'Mercedes ', value: `${this.setContentForLineup('Mercedes', 0, seasonData)} und ${this.setContentForLineup('Mercedes', 1, seasonData)}`},
                {name: 'Red Bull ', value: `${this.setContentForLineup('Red Bull', 0, seasonData)} und ${this.setContentForLineup('Red Bull', 1, seasonData)}`},
                {name: 'Ferrari ', value: `${this.setContentForLineup('Ferrari', 0, seasonData)} und ${this.setContentForLineup('Ferrari', 1, seasonData)}`},
                {name: 'McLaren ', value: `${this.setContentForLineup('McLaren', 0, seasonData)} und ${this.setContentForLineup('McLaren', 1, seasonData)}`},
                {name: 'Aston Martin ', value: `${this.setContentForLineup('Aston Martin', 0, seasonData)} und ${this.setContentForLineup('Aston Martin', 1, seasonData)}`},
                {name: 'Alpine ', value: `${this.setContentForLineup('Alpine', 0, seasonData)} und ${this.setContentForLineup('Alpine', 1, seasonData)}`},
                {name: 'Alpha Tauri ', value: `${this.setContentForLineup('Alpha Tauri', 0, seasonData)} und ${this.setContentForLineup('Alpha Tauri', 1, seasonData)}`},
                {name: 'Alfa Romeo ', value: `${this.setContentForLineup('Alfa Romeo', 0, seasonData)} und ${this.setContentForLineup('Alfa Romeo', 1, seasonData)}`},
                {name: 'Williams ', value: `${this.setContentForLineup('Williams', 0, seasonData)} und ${this.setContentForLineup('Williams', 1, seasonData)}`},
                {name: 'Haas ', value: `${this.setContentForLineup('Haas', 0, seasonData)} und ${this.setContentForLineup('Haas', 1, seasonData)}`}
            )
            let date = new Date().toLocaleString();   
            console.log(`Das aktuelle Lineup wurde gesendet. Für Liga ${seasonData.getLigatitel()} -- ${date}`);
            await client.channels.cache.get(infoChannelID).send({ embeds : [lineupEmbed]}).then((msg) => {
                //Set Waitlist Msg ID
                
                seasonData.setLineupMsgLigaSA2(msg.id);
                
            });
        } else {
            let date = new Date().toLocaleString();
            console.log(`Eines der Elemente in der Liste wurde nicht richtig definiert oder beim ausgeben des Lineups ist ein 
                        anderer Fehler aufgetreten in ${seasonData.getLigatitel()} -- ${date}`);
        }
    }

    setContentForLineup(teamName, seat, seasonData){
        //Gets all the information
        let currentLineup = new Map();
       
        currentLineup = seasonData.getCurrentLineupLigaSA2();
       
        //Yields return value
        if(currentLineup.get(teamName)[seat] == 'nicht besetzt'){
            return `nicht besetzt`;
        } else if(currentLineup.get(teamName)[seat] == 'entfernt'){
            return `entfernt`;
        } else {
            return `<@${currentLineup.get(teamName)[seat]}>`;
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
       
        freeCars = seasonData.getFreeCarsLigaSA2();
        subPersonList = seasonData.getSubPersonListLigaSA2();
        subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA2();
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
        stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA2();
        ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA2();
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        currentLineup = seasonData.getCurrentLineupLigaSA2();
      

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
        
        
        freeCars = seasonData.getFreeCarsLigaSA2();
     
        //Changes locally
        var member = await client.guilds.cache.get(seasonData.getDiscordID()).members.fetch(memberUser.id);
        if(member.roles.cache.has(seasonData.getMercedesRolleID())){
            await freeCars.push(seasonData.getMercedesRolleID());
        } else if(member.roles.cache.has(seasonData.getRedBullRolleID())){
            await freeCars.push(seasonData.getRedBullRolleID());
        } else if(member.roles.cache.has(seasonData.getFerrariRolleID())){
            await freeCars.push(seasonData.getFerrariRolleID());
        } else if(member.roles.cache.has(seasonData.getMcLarenRolleID())){
            await freeCars.push(seasonData.getMcLarenRolleID());
        } else if(member.roles.cache.has(seasonData.getAstonMartinRolleID())){
            await freeCars.push(seasonData.getAstonMartinRolleID());
        }  else if(member.roles.cache.has(seasonData.getAlpineRolleID())){
            await freeCars.push(seasonData.getAlpineRolleID());
        } else if(member.roles.cache.has(seasonData.getAlphaTauriRolleID())){
            await freeCars.push(seasonData.getAlphaTauriRolleID());
        } else if(member.roles.cache.has(seasonData.getAlfaRomeoRolleID())){
            await freeCars.push(seasonData.getAlfaRomeoRolleID());
        } else if(member.roles.cache.has(seasonData.getWilliamsRolleID())){
            await freeCars.push(seasonData.getWilliamsRolleID());
        } else if(member.roles.cache.has(seasonData.getHaasRolleID())){
            await freeCars.push(seasonData.getHaasRolleID());
        }
        //Makes changes globally
       
        await seasonData.setFreeCarsLigaSA2(freeCars);
       
    }

    async setWaitlistMsgContent(client, seasonData){
        //Gets all the information
        let subPersonList = new Map();
        let subPersonListReinstatedDrivers = new Map();
        let freeCars = new Map();
        let waitListMsgID = null;
        let freeCarsMsgID = null;
        let anmeldeChannelID = null;
       
        subPersonList = seasonData.getSubPersonListLigaSA2();
        subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA2();
        freeCars = seasonData.getFreeCarsLigaSA2();
        waitListMsgID = seasonData.getWaitlistMsgIDLigaSA2();
        freeCarsMsgID = seasonData.getFreeCarMsgIDLigaSA2();
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
       
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
        
        currentLineup = seasonData.getCurrentLineupLigaSA2();
        mercedesDriver1 = seasonData.getMercedesDriversLigaSA2()[0];
        mercedesDriver2 = seasonData.getMercedesDriversLigaSA2()[1];
        redBullDriver1 = seasonData.getRedBullDriversLigaSA2()[0];
        redBullDriver2 = seasonData.getRedBullDriversLigaSA2()[1];
        ferrariDriver1 = seasonData.getFerrariDriversLigaSA2()[0];
        ferrariDriver2 = seasonData.getFerrariDriversLigaSA2()[1];
        mcLarenDriver1 = seasonData.getMcLarenDriversLigaSA2()[0];
        mcLarenDriver2 = seasonData.getMcLarenDriversLigaSA2()[1];
        astonMartinDriver1 = seasonData.getAstonMartinDriversLigaSA2()[0];
        astonMartinDriver2 = seasonData.getAstonMartinDriversLigaSA2()[1];
        alpineDriver1 = seasonData.getAlpineDriversLigaSA2()[0];
        alpineDriver2 = seasonData.getAlpineDriversLigaSA2()[1];
        alphaTauriDriver1 = seasonData.getAlphaTauriDriversLigaSA2()[0];
        alphaTauriDriver2 = seasonData.getAlphaTauriDriversLigaSA2()[1];
        alfaRomeoDriver1 = seasonData.getAlfaRomeoDriversLigaSA2()[0];
        alfaRomeoDriver2 = seasonData.getAlfaRomeoDriversLigaSA2()[1];
        williamsDriver1 = seasonData.getWilliamsDriversLigaSA2()[0];
        williamsDriver2 = seasonData.getWilliamsDriversLigaSA2()[1];
        haasDriver1 = seasonData.getHaasDriversLigaSA2()[0];
        haasDriver2 = seasonData.getHaasDriversLigaSA2()[1];
       
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
        
        await seasonData.setCurrentLineupLigaSA2(currentLineup);
      
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
      
        currentLineup = seasonData.getCurrentLineupLigaSA2();
       
        let teamNameString = client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name;
        if(currentLineup.get(teamNameString)[0] == `nicht besetzt` || currentLineup.get(teamNameString)[1] == `nicht besetzt`){
            return true;
        } else {
            return false;
        }
    }

    async initVariables(currentRaceLocation, seasonData){
       
            
        await seasonData.setSubPersonListLigaSA2(new Array());
        await seasonData.setsubPersonListReinstatedDriversLigaSA2(new Array());
        await seasonData.setFreeCarsLigaSA2(new Array());
        await seasonData.setWithdrawnDriversLigaSA2(new Array());
        await seasonData.setWithdrawnDriversPerCommandLigaSA2(new Array());
        await seasonData.setReactedToSignOutLigaSA2(new Map());
        await seasonData.setReactedToSubInLigaSA2(new Map());
        await seasonData.setSubInDriversPerCommandLigaSA2(new Array());
        await seasonData.setLineupMsgLigaSA2(null);
        await seasonData.setAnmeldungActiveLigaSA2(true);
        await seasonData.setCurrentRaceLocationLigaSA2(currentRaceLocation);
       
    }

    async clearChannels(client, seasonData){
        //Gets all the information
        let anmeldeChannelID = null;
        let abmeldeChannelID = null;
       
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA2();
      
    
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
       
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA2();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA2();
      
        await client.channels.cache.get(anmeldeChannelID).send(`<@&${ersatzfahrerRolleID}> die Anmeldung für das ` + 
                                                              `Ligarennen in ${currentRaceLocation} ist hiermit eröffnet!`).then(() => {
            let date = new Date().toLocaleString();
            console.log(`Die Anmeldung für ${seasonData.getLigatitel()} in ${currentRaceLocation} wurde eröffnet. -- ${date}`);
        });
        // Message for List of waiting drivers
        await client.channels.cache.get(anmeldeChannelID).send(`Warteliste:`).then((msg) => {
          
            seasonData.setWaitlistMsgIDLigaSA2(msg.id);
         
        });            
        // Message for List of free cars
        await client.channels.cache.get(anmeldeChannelID).send(`Freie Autos:`).then((msg) => {
        
            seasonData.setFreeCarMsgIDLigaSA2(msg.id);
           
        })    
        await this.printLineup(client, seasonData);
        let date = new Date().toLocaleString();
        console.log(`Das Standard Lineup wurde gesendet in ${seasonData.getLigatitel()} -- ${date}`);
    }

    async subDriverIn(client, driverObject, seasonData){     
        let anmeldeChannelID = null;     
        let subPersonList = new Array();
        let withdrawnDrivers = new Array();
        
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        subPersonList = seasonData.getSubPersonListLigaSA2();
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
        

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
       
        await seasonData.setSubPersonListLigaSA2(subPersonList);
        await seasonData.setWithdrawnDriversLigaSA2(withdrawnDrivers);
        

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async regularDriverWithdraw(client, driverObject, seasonData){
        //Get current info
        let abmeldeChannelID = null;
        let withdrawnDrivers = new Array();
        
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA2();
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
       
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
      
        await seasonData.setWithdrawnDriversLigaSA2(withdrawnDrivers);
       

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async subDriverRemoveSubInOnWaitlist(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;//
        let subPersonList = new Array();//
       
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        subPersonList = seasonData.getSubPersonListLigaSA2();
        
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
        
        await seasonData.setSubPersonListLigaSA2(subPersonList);
       

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async subDriverRemoveSubInInLineup(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;//
        let freeCars = new Array()//
        
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        freeCars = seasonData.getFreeCarsLigaSA2();
       
        //Do stuff
        let freeCar = await this.findCurrentCockpitOfSub(driverObject, seasonData);
        freeCars.push(freeCar);
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
        
        await seasonData.setFreeCarsLigaSA2(freeCars);
       

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async regularDriverRemoveWithdraw(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;
        let withdrawnDrivers = new Array();
        let reinstatedDrivers = new Array();
      
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
        reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA2();
       
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
       
        await seasonData.setsubPersonListReinstatedDriversLigaSA2(reinstatedDrivers);
        await seasonData.setWithdrawnDriversLigaSA2(withdrawnDrivers);
       

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
       
        currentRegularDriver = seasonData.getCurrentRegularDriversLigaSA2();
        regularDrivers = seasonData.getRegularDriversLigaSA2();
        mercedesDrivers = seasonData.getMercedesDriversLigaSA2();
        redBullDrivers = seasonData.getRedBullDriversLigaSA2();
        ferrariDrivers = seasonData.getFerrariDriversLigaSA2();
        mcLarenDrivers = seasonData.getMcLarenDriversLigaSA2();
        astonMartinDrivers = seasonData.getAstonMartinDriversLigaSA2();
        alpineDrivers = seasonData.getAlpineDriversLigaSA2();
        alphaTauriDrivers = seasonData.getAlphaTauriDriversLigaSA2();
        alfaRomeoDrivers = seasonData.getAlfaRomeoDriversLigaSA2();
        williamsDrivers = seasonData.getWilliamsDriversLigaSA2();
        haasDrivers = seasonData.getHaasDriversLigaSA2();
       

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
        .setColor('Purple')
        .setTitle('️️️️️️️️Stammfahrer Liga Samstag 2')
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
            
            seasonData.setCurrentRegularDriversLigaSA2(msg.id);
            seasonData.setRegularDriversLigaSA2(regularDrivers);
           
        })
    }

    async findCurrentCockpitOfSub(driverObject, seasonData){
        //Get current info
        let currentLineup = new Array();
        
        currentLineup = seasonData.getCurrentLineupLigaSA2();
        

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
        
        currentLineup = seasonData.getCurrentLineupLigaSA2();
       

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
        
        seasonCalendar = seasonData.getSeasonCalendarLigaSA2();
       
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
        
        seasonCalendar = seasonData.getSeasonCalendarLigaSA2();
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA2();
        anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
        subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA2();
        ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA2();
        subPersonList = seasonData.getSubPersonListLigaSA2();
        stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA2();
        reactedToSubIn = seasonData.getReactedToSubInLigaSA2();
        reactedToSignOut = seasonData.getReactedToSignOutLigaSA2();
        withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA2();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA2();
       
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
           
            
            seasonData.setMessageEmbedAnmeldenLigaSA2(msg);
            msg.react(seasonData.getAnmeldeEmoji());
            collectorSubIn = msg.createReactionCollector({ dispose: true});
           
        });
        var collectorWithdraw = null;
        await client.channels.cache.get(abmeldeChannelID).send({ embeds: [embedAbmeldung] }).then((msg) => {
            
            seasonData.setMessageEmbedAbmeldenLigaSA2(msg);
            msg.react(seasonData.getAbmeldeEmoji());
            collectorWithdraw = msg.createReactionCollector({ dispose: true});
            
        });
    
        // Hinzufügen von Rolle
        collectorSubIn.on('collect', async (reaction, user) => {
            //Get information
            //Check new for every reaction
        
            anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA2();                                           
            reactedToSubIn = seasonData.getReactedToSubInLigaSA2();                
           
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
                        await seasonData.setReactedToSubInLigaSA2(reactedToSubIn);
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
          
            anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA2();  
            reactedToSignOut = seasonData.getReactedToSignOutLigaSA2();               
       
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
                            await seasonData.setReactedToSubInLigaSA2(reactedToSubIn);
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

            console.log(`${user.username} hat wollte seine Anmeldung zurücknehmen`)

            //Get information
            //Check new for every reaction
           
            anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA2();                                           
            reactedToSubIn = seasonData.getReactedToSubInLigaSA2();                
          
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
                           
                            seasonData.setReactedToSubInLigaSA2(reactedToSubIn);
                            
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
            
            anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA2();  
            reactedToSignOut = seasonData.getReactedToSignOutLigaSA2();               
            
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
                           
                            await seasonData.setReactedToSignOutLigaSA2(reactedToSignOut);
                        
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
        
        setTimeout(() => this.endFunction(client, seasonData), timeTillClose)
    }

    async endFunction(client, seasonData){
        //Get info
        let anmeldeChannelID = null;
        let abmeldeChannelID = null;
        let currentRaceLocation = null;
        let seasonCalendarRacesDone = new Map();
       
        anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA2();
        currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA2();
        seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaSA2();
       
        //Do stuff
       
        seasonData.setAnmeldungActiveLigaSA2(false);
      
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(anmeldeChannelID).send(`Die Anmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Anmeldung in ${seasonData.getLigatitel()} wurde beendet`);
        })
        
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(abmeldeChannelID).send(`Die Abmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Abmeldung in ${seasonData.getLigatitel()} wurde beendet`);
        })
        seasonCalendarRacesDone.unshift(currentRaceLocation);
      
        seasonData.setSeasonCalendarRacesDoneLigaSA2(seasonCalendarRacesDone);
        seasonData.setCurrentRaceLocationLigaSA2(null);
       
        
    }
}

module.exports = MethodClass