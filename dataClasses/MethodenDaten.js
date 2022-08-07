const { MessageEmbed, Client } = require('discord.js');
const VariableClass = require('../dataClasses/VariablenDaten.js')

class MethodClass{
    async removeFromCurrentLineup(client, userToRemoveID, freeCar, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        let stammfahrerRolleID = null
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaOrigin();
        }
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
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                await seasonData.setCurrentLineupLigaSO1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                await seasonData.setCurrentLineupLigaSO2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                await seasonData.setCurrentLineupLigaSA1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                await seasonData.setCurrentLineupLigaSA2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga FR'){
                await seasonData.setCurrentLineupLigaFR(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                await seasonData.setCurrentLineupLigaOrigin(currentLineup);
            }
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
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                await seasonData.setCurrentLineupLigaSO1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                await seasonData.setCurrentLineupLigaSO2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                await seasonData.setCurrentLineupLigaSA1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                await seasonData.setCurrentLineupLigaSA2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga FR'){
                await seasonData.setCurrentLineupLigaFR(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                await seasonData.setCurrentLineupLigaOrigin(currentLineup);
            }
        }
    }

    async regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }
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
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                await seasonData.setCurrentLineupLigaSO1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                await seasonData.setCurrentLineupLigaSO2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                await seasonData.setCurrentLineupLigaSA1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                await seasonData.setCurrentLineupLigaSA2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga FR'){
                await seasonData.setCurrentLineupLigaFR(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                await seasonData.setCurrentLineupLigaOrigin(currentLineup);
            }
        } else {
            //Changes cockpit locally
            let mainTeamNameString = await client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(mainTeamIDString).name;
            currentLineup.get(mainTeamNameString)[subDriverPosition] = driverToStart;
            let date = new Date().toLocaleString();
            console.log(`Method: regularDriverBack => Im ${mainTeamNameString} hat ${driverToStart} sein Cockpit wieder, 
                        das Cockpit war noch frei in ${seasonData.getLigatitel()} -- ${date}`);
            //Change content in object
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                await seasonData.setCurrentLineupLigaSO1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                await seasonData.setCurrentLineupLigaSO2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                await seasonData.setCurrentLineupLigaSA1(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                await seasonData.setCurrentLineupLigaSA2(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga FR'){
                await seasonData.setCurrentLineupLigaFR(currentLineup);
            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                await seasonData.setCurrentLineupLigaOrigin(currentLineup);
            }
        }
    }

    async changeLineupNormalSub(client, driverToStart, carToTake, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setCurrentLineupLigaSO1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setCurrentLineupLigaSO2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setCurrentLineupLigaSA1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setCurrentLineupLigaFR(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setCurrentLineupLigaOrigin(currentLineup);
        }
    }

    async changeLineupAfterForceOpen(driverToStart, carToTake, positionForForce, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        let date = new Date().toLocaleString();
        console.log(`Nachdem das Cockpit von ${carToTake} offen geforced wurde ist jetzt der Fahrer mit der
                    der ID ${driverToStart} drin in ${seasonData.getLigatitel()} -- ${date}`);
        //Changes cockpit globally
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setCurrentLineupLigaSO1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setCurrentLineupLigaSO2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setCurrentLineupLigaSA1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setCurrentLineupLigaFR(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setCurrentLineupLigaOrigin(currentLineup);
        }
    }

    async changeLineupAfterForceDedicated(driverToStart, carToTake, positionForForce, seasonData){
        //Gets all the information
        let currentLineup = new Map();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        let date = new Date().toLocaleString();
        console.log(`In das Cockpit von ${carToTake} wurde der Fahrer mit der
                    der ID ${driverToStart} rein geforced in ${seasonData.getLigatitel()} -- ${date}`);
        //Changes cockpit globally
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setCurrentLineupLigaSO1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setCurrentLineupLigaSO2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setCurrentLineupLigaSA1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setCurrentLineupLigaFR(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setCurrentLineupLigaOrigin(currentLineup);
        }
    }

    async printLineup(client, seasonData){
        //Gets all the information
        var currentLineup = new Map();
        let msgLineupID = null;
        let infoChannelID = null;
        let currentRaceLocation = null;
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
            msgLineupID = seasonData.getLineupMsgLigaSO1();
            infoChannelID = seasonData.getInfoChannelIDLigaSO1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
            msgLineupID = seasonData.getLineupMsgLigaSO2();
            infoChannelID = seasonData.getInfoChannelIDLigaSO2();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
            msgLineupID = seasonData.getLineupMsgLigaSA1();
            infoChannelID = seasonData.getInfoChannelIDLigaSA1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
            msgLineupID = seasonData.getLineupMsgLigaSA2();
            infoChannelID = seasonData.getInfoChannelIDLigaSA2();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
            msgLineupID = seasonData.getLineupMsgLigaFR();
            infoChannelID = seasonData.getInfoChannelIDLigaFR();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
            msgLineupID = seasonData.getLineupMsgLigaOrigin();
            infoChannelID = seasonData.getInfoChannelIDLigaOrigin();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaOrigin();
        }
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
            let lineupEmbed = new MessageEmbed()
            .setColor('#b7b7b7')
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
                if(seasonData.getLigatitel() == `Liga SO 1`){
                    seasonData.setLineupMsgLigaSO1(msg.id);
                } else if(seasonData.getLigatitel() == `Liga SO 2`){
                    seasonData.setLineupMsgLigaSO2(msg.id);
                } else if(seasonData.getLigatitel() == `Liga SA 1`){
                    seasonData.setLineupMsgLigaSA1(msg.id);
                } else if(seasonData.getLigatitel() == `Liga SA 2`){
                    seasonData.setLineupMsgLigaSA2(msg.id);
                } else if(seasonData.getLigatitel() == `Liga FR`){
                    seasonData.setLineupMsgLigaFR(msg.id);
                } else if(seasonData.getLigatitel() == `Liga Origin`){
                    seasonData.setLineupMsgLigaOrigin(msg.id);
                }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            freeCars = seasonData.getFreeCarsLigaSO1();
            subPersonList = seasonData.getSubPersonListLigaSO1();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSO1();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO1();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSO1();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSO1();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            freeCars = seasonData.getFreeCarsLigaSO2();
            subPersonList = seasonData.getSubPersonListLigaSO2();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSO2();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO2();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSO2();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSO2();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            freeCars = seasonData.getFreeCarsLigaSA1();
            subPersonList = seasonData.getSubPersonListLigaSA1();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA1();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA1();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA1();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA1();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            freeCars = seasonData.getFreeCarsLigaSA2();
            subPersonList = seasonData.getSubPersonListLigaSA2();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA2();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA2();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA2();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            freeCars = seasonData.getFreeCarsLigaFR();
            subPersonList = seasonData.getSubPersonListLigaFR();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaFR();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaFR();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaFR();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            freeCars = seasonData.getFreeCarsLigaOrigin();
            subPersonList = seasonData.getSubPersonListLigaOrigin();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaOrigin();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaOrigin();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaOrigin();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaOrigin();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }

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
                let regularDriverBackEmbed = new MessageEmbed()
                .setColor('#ffff42')
                .setTitle('🔄')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverToStart.id}> bekommt seinen Stammplatz wieder`}
                )
                if(seatOpen == false){
                    let driverInEmbed = new MessageEmbed()
                    .setColor('#b7f96f')
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
                let driverInEmbed = new MessageEmbed()
                .setColor('#b7f96f')
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
                let subDriverInEmbed = new MessageEmbed()
                .setColor('#b7f96f')
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
                let subDriverInEmbed = new MessageEmbed()
                .setColor('#b7f96f')
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            freeCars = seasonData.getFreeCarsLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            freeCars = seasonData.getFreeCarsLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            freeCars = seasonData.getFreeCarsLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            freeCars = seasonData.getFreeCarsLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            freeCars = seasonData.getFreeCarsLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            freeCars = seasonData.getFreeCarsLigaOrigin();
        }
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
        } else if(member.roles.cache.has(seasonData.getAlfaRomeoRolleID())){
            await freeCars.push(seasonData.getAlfaRomeoRolleID());
        } else if(member.roles.cache.has(seasonData.getWilliamsRolleID())){
            await freeCars.push(seasonData.getWilliamsRolleID());
        } else if(member.roles.cache.has(seasonData.getHaasRolleID())){
            await freeCars.push(seasonData.getHaasRolleID());
        }
        //Makes changes globally
        if(seasonData.getLigatitel() == 'Liga SO1'){
            await seasonData.setFreeCarsLigaSO1(freeCars);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setFreeCarsLigaSO2(freeCars);
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setFreeCarsLigaSA1(freeCars);
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setFreeCarsLigaSA2(freeCars);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setFreeCarsLigaFR(freeCars);
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setFreeCarsLigaOrigin(freeCars);
        }
    }

    async setWaitlistMsgContent(client, seasonData){
        //Gets all the information
        let subPersonList = new Map();
        let subPersonListReinstatedDrivers = new Map();
        let freeCars = new Map();
        let waitListMsgID = null;
        let freeCarsMsgID = null;
        let anmeldeChannelID = null;
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            subPersonList = seasonData.getSubPersonListLigaSO1();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSO1();
            freeCars = seasonData.getFreeCarsLigaSO1();
            waitListMsgID = seasonData.getWaitlistMsgIDLigaSO1();
            freeCarsMsgID = seasonData.getFreeCarMsgIDLigaSO1();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            subPersonList = seasonData.getSubPersonListLigaSO2();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSO2();
            freeCars = seasonData.getFreeCarsLigaSO2();
            waitListMsgID = seasonData.getWaitlistMsgIDLigaSO2();
            freeCarsMsgID = seasonData.getFreeCarMsgIDLigaSO2();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            subPersonList = seasonData.getSubPersonListLigaSA1();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA1();
            freeCars = seasonData.getFreeCarsLigaSA1();
            waitListMsgID = seasonData.getWaitlistMsgIDLigaSA1();
            freeCarsMsgID = seasonData.getFreeCarMsgIDLigaSA1();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            subPersonList = seasonData.getSubPersonListLigaSA2();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA2();
            freeCars = seasonData.getFreeCarsLigaSA2();
            waitListMsgID = seasonData.getWaitlistMsgIDLigaSA2();
            freeCarsMsgID = seasonData.getFreeCarMsgIDLigaSA2();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            subPersonList = seasonData.getSubPersonListLigaFR();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaFR();
            freeCars = seasonData.getFreeCarsLigaFR();
            waitListMsgID = seasonData.getWaitlistMsgIDLigaFR();
            freeCarsMsgID = seasonData.getFreeCarMsgIDLigaFR();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            subPersonList = seasonData.getSubPersonListLigaOrigin();
            subPersonListReinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaOrigin();
            freeCars = seasonData.getFreeCarsLigaOrigin();
            waitListMsgID = seasonData.getWaitlistMsgIDLigaOrigin();
            freeCarsMsgID = seasonData.getFreeCarMsgIDLigaOrigin();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
        }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
            mercedesDriver1 = seasonData.getMercedesDriversLigaSO1()[0];
            mercedesDriver2 = seasonData.getMercedesDriversLigaSO1()[1];
            redBullDriver1 = seasonData.getRedBullDriversLigaSO1()[0];
            redBullDriver2 = seasonData.getRedBullDriversLigaSO1()[1];
            ferrariDriver1 = seasonData.getFerrariDriversLigaSO1()[0];
            ferrariDriver2 = seasonData.getFerrariDriversLigaSO1()[1];
            mcLarenDriver1 = seasonData.getMcLarenDriversLigaSO1()[0];
            mcLarenDriver2 = seasonData.getMcLarenDriversLigaSO1()[1];
            astonMartinDriver1 = seasonData.getAstonMartinDriversLigaSO1()[0];
            astonMartinDriver2 = seasonData.getAstonMartinDriversLigaSO1()[1];
            alpineDriver1 = seasonData.getAlpineDriversLigaSO1()[0];
            alpineDriver2 = seasonData.getAlpineDriversLigaSO1()[1];
            alphaTauriDriver1 = seasonData.getAlphaTauriDriversLigaSO1()[0];
            alphaTauriDriver2 = seasonData.getAlphaTauriDriversLigaSO1()[1];
            alfaRomeoDriver1 = seasonData.getAlfaRomeoDriversLigaSO1()[0];
            alfaRomeoDriver2 = seasonData.getAlfaRomeoDriversLigaSO1()[1];
            williamsDriver1 = seasonData.getWilliamsDriversLigaSO1()[0];
            williamsDriver2 = seasonData.getWilliamsDriversLigaSO1()[1];
            haasDriver1 = seasonData.getHaasDriversLigaSO1()[0];
            haasDriver2 = seasonData.getHaasDriversLigaSO1()[1];
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
            mercedesDriver1 = seasonData.getMercedesDriversLigaSO2()[0];
            mercedesDriver2 = seasonData.getMercedesDriversLigaSO2()[1];
            redBullDriver1 = seasonData.getRedBullDriversLigaSO2()[0];
            redBullDriver2 = seasonData.getRedBullDriversLigaSO2()[1];
            ferrariDriver1 = seasonData.getFerrariDriversLigaSO2()[0];
            ferrariDriver2 = seasonData.getFerrariDriversLigaSO2()[1];
            mcLarenDriver1 = seasonData.getMcLarenDriversLigaSO2()[0];
            mcLarenDriver2 = seasonData.getMcLarenDriversLigaSO2()[1];
            astonMartinDriver1 = seasonData.getAstonMartinDriversLigaSO2()[0];
            astonMartinDriver2 = seasonData.getAstonMartinDriversLigaSO2()[1];
            alpineDriver1 = seasonData.getAlpineDriversLigaSO2()[0];
            alpineDriver2 = seasonData.getAlpineDriversLigaSO2()[1];
            alphaTauriDriver1 = seasonData.getAlphaTauriDriversLigaSO2()[0];
            alphaTauriDriver2 = seasonData.getAlphaTauriDriversLigaSO2()[1];
            alfaRomeoDriver1 = seasonData.getAlfaRomeoDriversLigaSO2()[0];
            alfaRomeoDriver2 = seasonData.getAlfaRomeoDriversLigaSO2()[1];
            williamsDriver1 = seasonData.getWilliamsDriversLigaSO2()[0];
            williamsDriver2 = seasonData.getWilliamsDriversLigaSO2()[1];
            haasDriver1 = seasonData.getHaasDriversLigaSO2()[0];
            haasDriver2 = seasonData.getHaasDriversLigaSO2()[1];
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
            mercedesDriver1 = seasonData.getMercedesDriversLigaSA1()[0];
            mercedesDriver2 = seasonData.getMercedesDriversLigaSA1()[1];
            redBullDriver1 = seasonData.getRedBullDriversLigaSA1()[0];
            redBullDriver2 = seasonData.getRedBullDriversLigaSA1()[1];
            ferrariDriver1 = seasonData.getFerrariDriversLigaSA1()[0];
            ferrariDriver2 = seasonData.getFerrariDriversLigaSA1()[1];
            mcLarenDriver1 = seasonData.getMcLarenDriversLigaSA1()[0];
            mcLarenDriver2 = seasonData.getMcLarenDriversLigaSA1()[1];
            astonMartinDriver1 = seasonData.getAstonMartinDriversLigaSA1()[0];
            astonMartinDriver2 = seasonData.getAstonMartinDriversLigaSA1()[1];
            alpineDriver1 = seasonData.getAlpineDriversLigaSA1()[0];
            alpineDriver2 = seasonData.getAlpineDriversLigaSA1()[1];
            alphaTauriDriver1 = seasonData.getAlphaTauriDriversLigaSA1()[0];
            alphaTauriDriver2 = seasonData.getAlphaTauriDriversLigaSA1()[1];
            alfaRomeoDriver1 = seasonData.getAlfaRomeoDriversLigaSA1()[0];
            alfaRomeoDriver2 = seasonData.getAlfaRomeoDriversLigaSA1()[1];
            williamsDriver1 = seasonData.getWilliamsDriversLigaSA1()[0];
            williamsDriver2 = seasonData.getWilliamsDriversLigaSA1()[1];
            haasDriver1 = seasonData.getHaasDriversLigaSA1()[0];
            haasDriver2 = seasonData.getHaasDriversLigaSA1()[1];
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
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
        } else if(seasonData.getLigatitel() == 'Liga FR'){
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
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
            mercedesDriver1 = seasonData.getMercedesDriversLigaOrigin()[0];
            mercedesDriver2 = seasonData.getMercedesDriversLigaOrigin()[1];
            redBullDriver1 = seasonData.getRedBullDriversLigaOrigin()[0];
            redBullDriver2 = seasonData.getRedBullDriversLigaOrigin()[1];
            ferrariDriver1 = seasonData.getFerrariDriversLigaOrigin()[0];
            ferrariDriver2 = seasonData.getFerrariDriversLigaOrigin()[1];
            mcLarenDriver1 = seasonData.getMcLarenDriversLigaOrigin()[0];
            mcLarenDriver2 = seasonData.getMcLarenDriversLigaOrigin()[1];
            astonMartinDriver1 = seasonData.getAstonMartinDriversLigaOrigin()[0];
            astonMartinDriver2 = seasonData.getAstonMartinDriversLigaOrigin()[1];
            alpineDriver1 = seasonData.getAlpineDriversLigaOrigin()[0];
            alpineDriver2 = seasonData.getAlpineDriversLigaOrigin()[1];
            alphaTauriDriver1 = seasonData.getAlphaTauriDriversLigaOrigin()[0];
            alphaTauriDriver2 = seasonData.getAlphaTauriDriversLigaOrigin()[1];
            alfaRomeoDriver1 = seasonData.getAlfaRomeoDriversLigaOrigin()[0];
            alfaRomeoDriver2 = seasonData.getAlfaRomeoDriversLigaOrigin()[1];
            williamsDriver1 = seasonData.getWilliamsDriversLigaOrigin()[0];
            williamsDriver2 = seasonData.getWilliamsDriversLigaOrigin()[1];
            haasDriver1 = seasonData.getHaasDriversLigaOrigin()[0];
            haasDriver2 = seasonData.getHaasDriversLigaOrigin()[1];
        }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setCurrentLineupLigaSO1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setCurrentLineupLigaSO2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setCurrentLineupLigaSA1(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setCurrentLineupLigaSA2(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setCurrentLineupLigaFR(currentLineup);
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setCurrentLineupLigaOrigin(currentLineup);
        }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }
        let teamNameString = client.guilds.cache.get(seasonData.getDiscordID()).roles.cache.get(carToTake).name;
        if(currentLineup.get(teamNameString)[0] == `nicht besetzt` || currentLineup.get(teamNameString)[1] == `nicht besetzt`){
            return true;
        } else {
            return false;
        }
    }

    async initVariables(currentRaceLocation, seasonData){
        if(seasonData.getLigatitel() == `Liga SO 1`){
            await seasonData.setSubPersonListLigaSO1(new Array());
            await seasonData.setsubPersonListReinstatedDriversLigaSO1(new Array());
            await seasonData.setFreeCarsLigaSO1(new Array());
            await seasonData.setWithdrawnDriversLigaSO1(new Array());
            await seasonData.setWithdrawnDriversPerCommandLigaSO1(new Array());
            await seasonData.setReactedToSignOutLigaSO1(new Map());
            await seasonData.setReactedToSubInLigaSO1(new Map());
            await seasonData.setSubInDriversPerCommandLigaSO1(new Array());
            await seasonData.setLineupMsgLigaSO1(null);
            await seasonData.setAnmeldungActiveLigaSO1(true);
            await seasonData.setCurrentRaceLocationLigaSO1(currentRaceLocation);
        } else if(seasonData.getLigatitel() == `Liga SO 2`){
            await seasonData.setSubPersonListLigaSO2(new Array());
            await seasonData.setsubPersonListReinstatedDriversLigaSO2(new Array());
            await seasonData.setFreeCarsLigaSO2(new Array());
            await seasonData.setWithdrawnDriversLigaSO2(new Array());
            await seasonData.setWithdrawnDriversPerCommandLigaSO2(new Array());
            await seasonData.setSubInDriversPerCommandLigaSO2(new Array());
            await seasonData.setReactedToSignOutLigaSO2(new Map());
            await seasonData.setReactedToSubInLigaSO2(new Map());
            await seasonData.setLineupMsgLigaSO2(null);
            await seasonData.setAnmeldungActiveLigaSO2(true);
            await seasonData.setCurrentRaceLocationLigaSO2(currentRaceLocation);
        } else if(seasonData.getLigatitel() == `Liga SA 1`){
            await seasonData.setSubPersonListLigaSA1(new Array());
            await seasonData.setsubPersonListReinstatedDriversLigaSA1(new Array());
            await seasonData.setFreeCarsLigaSA1(new Array());
            await seasonData.setWithdrawnDriversLigaSA1(new Array());
            await seasonData.setWithdrawnDriversPerCommandLigaSA1(new Array());
            await seasonData.setSubInDriversPerCommandLigaSA1(new Array());
            await seasonData.setReactedToSignOutLigaSA1(new Map());
            await seasonData.setReactedToSubInLigaSA1(new Map());
            await seasonData.setLineupMsgLigaSA1(null);
            await seasonData.setAnmeldungActiveLigaSA1(true);
            await seasonData.setCurrentRaceLocationLigaSA1(currentRaceLocation);
        } else if(seasonData.getLigatitel() == `Liga SA 2`){
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
        } else if(seasonData.getLigatitel() == `Liga FR`){
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
        } else if(seasonData.getLigatitel() == `Liga Origin`){
            await seasonData.setSubPersonListLigaOrigin(new Array());
            await seasonData.setsubPersonListReinstatedDriversLigaOrigin(new Array());
            await seasonData.setFreeCarsLigaOrigin(new Array());
            await seasonData.setWithdrawnDriversLigaOrigin(new Array());
            await seasonData.setWithdrawnDriversPerCommandLigaOrigin(new Array());
            await seasonData.setSubInDriversPerCommandLigaOrigin(new Array());
            await seasonData.setReactedToSignOutLigaOrigin(new Map());
            await seasonData.setReactedToSubInLigaOrigin(new Map());
            await seasonData.setLineupMsgLigaOrigin(null);
            await seasonData.setAnmeldungActiveLigaOrigin(true);
            await seasonData.setCurrentRaceLocationLigaOrigin(currentRaceLocation);
        }
    }

    async clearChannels(client, seasonData){
        //Gets all the information
        let anmeldeChannelID = null;
        let abmeldeChannelID = null;
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaOrigin();
        }
    
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSO1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSO2();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA2();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaFR();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaOrigin();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaOrigin();
        }
        await client.channels.cache.get(anmeldeChannelID).send(`<@&${ersatzfahrerRolleID}> die Anmeldung für das ` + 
                                                              `Ligarennen in ${currentRaceLocation} ist hiermit eröffnet!`).then(() => {
            let date = new Date().toLocaleString();
            console.log(`Die Anmeldung für ${seasonData.getLigatitel()} in ${currentRaceLocation} wurde eröffnet. -- ${date}`);
        });
        // Message for List of waiting drivers
        await client.channels.cache.get(anmeldeChannelID).send(`Warteliste:`).then((msg) => {
            if(seasonData.getLigatitel() == `Liga SO 1`){
                seasonData.setWaitlistMsgIDLigaSO1(msg.id);
            } else if(seasonData.getLigatitel() == `Liga SO 2`){
                seasonData.setWaitlistMsgIDLigaSO2(msg.id);
            } else if(seasonData.getLigatitel() == `Liga SA 1`){
                seasonData.setWaitlistMsgIDLigaSA1(msg.id);
            } else if(seasonData.getLigatitel() == `Liga SA 2`){
                seasonData.setWaitlistMsgIDLigaSA2(msg.id);
            } else if(seasonData.getLigatitel() == `Liga FR`){
                seasonData.setWaitlistMsgIDLigaFR(msg.id);
            } else if(seasonData.getLigatitel() == `Liga Origin`){
                seasonData.setWaitlistMsgIDLigaOrigin(msg.id);
            }
        });            
        // Message for List of free cars
        await client.channels.cache.get(anmeldeChannelID).send(`Freie Autos:`).then((msg) => {
            if(seasonData.getLigatitel() == `Liga SO 1`){
                seasonData.setFreeCarMsgIDLigaSO1(msg.id);
            } else if(seasonData.getLigatitel() == `Liga SO 2`){
                seasonData.setFreeCarMsgIDLigaSO2(msg.id);
            } else if(seasonData.getLigatitel() == `Liga SA 1`){
                seasonData.setFreeCarMsgIDLigaSA1(msg.id);
            } else if(seasonData.getLigatitel() == `Liga SA 2`){
                seasonData.setFreeCarMsgIDLigaSA2(msg.id);
            } else if(seasonData.getLigatitel() == `Liga FR`){
                seasonData.setFreeCarMsgIDLigaFR(msg.id);
            } else if(seasonData.getLigatitel() == `Liga Origin`){
                seasonData.setFreeCarMsgIDLigaOrigin(msg.id);
            }
        })    
        await this.printLineup(client, seasonData);
        let date = new Date().toLocaleString();
        console.log(`Das Standard Lineup wurde gesendet in ${seasonData.getLigatitel()} -- ${date}`);
    }

    async subDriverIn(client, driverObject, seasonData){     
        let anmeldeChannelID = null;     
        let subPersonList = new Array();
        let withdrawnDrivers = new Array();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            subPersonList = seasonData.getSubPersonListLigaSO1();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            subPersonList = seasonData.getSubPersonListLigaSO2();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();//
            subPersonList = seasonData.getSubPersonListLigaSA1();//
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA1();//
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            subPersonList = seasonData.getSubPersonListLigaSA2();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            subPersonList = seasonData.getSubPersonListLigaFR();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();//
            subPersonList = seasonData.getSubPersonListLigaOrigin();//
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaOrigin();//
        }

        if(driverObject.id){
            subPersonList.push(driverObject.id);
        }else{
            return;
        }
        
        if(withdrawnDrivers.includes(driverObject.id)){
            withdrawnDrivers.splice(withdrawnDrivers.indexOf(driverObject.id), 1);
        }
        let subInEmbed = new MessageEmbed()
        .setColor('GREEN')
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setSubPersonListLigaSO1(subPersonList);
            await seasonData.setWithdrawnDriversLigaSO1(withdrawnDrivers);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setSubPersonListLigaSO2(subPersonList);
            await seasonData.setWithdrawnDriversLigaSO2(withdrawnDrivers);      
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setSubPersonListLigaSA1(subPersonList);
            await seasonData.setWithdrawnDriversLigaSA1(withdrawnDrivers);       
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setSubPersonListLigaSA2(subPersonList);
            await seasonData.setWithdrawnDriversLigaSA2(withdrawnDrivers);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setSubPersonListLigaFR(subPersonList);
            await seasonData.setWithdrawnDriversLigaFR(withdrawnDrivers);      
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setSubPersonListLigaOrigin(subPersonList);
            await seasonData.setWithdrawnDriversLigaOrigin(withdrawnDrivers);       
        }

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async regularDriverWithdraw(client, driverObject, seasonData){
        //Get current info
        let abmeldeChannelID = null;
        let withdrawnDrivers = new Array();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO1();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO2();   
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA1();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA2();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaFR();   
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaOrigin();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaOrigin();
        }
        //Do stuff
        withdrawnDrivers.push(driverObject.id);
        await this.addCarOfWithdrawnDriverToFreeCars(driverObject, seasonData, client);
        await this.removeFromCurrentLineup(client, driverObject, null, seasonData);
        let driverWithdrawnEmbed = new MessageEmbed()
        .setColor('RED')
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setWithdrawnDriversLigaSO1(withdrawnDrivers);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setWithdrawnDriversLigaSO2(withdrawnDrivers);      
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setWithdrawnDriversLigaSA1(withdrawnDrivers);       
        } else  if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setWithdrawnDriversLigaSA2(withdrawnDrivers);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setWithdrawnDriversLigaFR(withdrawnDrivers);      
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setWithdrawnDriversLigaOrigin(withdrawnDrivers);       
        }

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async subDriverRemoveSubInOnWaitlist(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;//
        let subPersonList = new Array();//
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            subPersonList = seasonData.getSubPersonListLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            subPersonList = seasonData.getSubPersonListLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            subPersonList = seasonData.getSubPersonListLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            subPersonList = seasonData.getSubPersonListLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            subPersonList = seasonData.getSubPersonListLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            subPersonList = seasonData.getSubPersonListLigaOrigin();
        }
        //Do stuff
        subPersonList.splice(subPersonList.indexOf(driverObject.id), 1); 
        let subInRemoveEmbed = new MessageEmbed()
        .setColor('RED')
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setSubPersonListLigaSO1(subPersonList);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setSubPersonListLigaSO2(subPersonList);     
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setSubPersonListLigaSA1(subPersonList);       
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setSubPersonListLigaSA2(subPersonList);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setSubPersonListLigaFR(subPersonList);     
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setSubPersonListLigaOrigin(subPersonList);       
        }

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async subDriverRemoveSubInInLineup(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;//
        let freeCars = new Array()//
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            freeCars = seasonData.getFreeCarsLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            freeCars = seasonData.getFreeCarsLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            freeCars = seasonData.getFreeCarsLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            freeCars = seasonData.getFreeCarsLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            freeCars = seasonData.getFreeCarsLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            freeCars = seasonData.getFreeCarsLigaOrigin();
        }
        //Do stuff
        let freeCar = await this.findCurrentCockpitOfSub(driverObject, seasonData);
        freeCars.push(freeCar);
        await this.removeFromCurrentLineup(client, driverObject, freeCar, seasonData);
        let subInRemoveEmbed = new MessageEmbed()
        .setColor('RED')
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setFreeCarsLigaSO1(freeCars);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setFreeCarsLigaSO2(freeCars);    
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setFreeCarsLigaSA1(freeCars);      
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setFreeCarsLigaSA2(freeCars);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setFreeCarsLigaFR(freeCars);    
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setFreeCarsLigaOrigin(freeCars);      
        }

        await this.checkSubCanBeMade(client, false, null, null, null, seasonData);
    }

    async regularDriverRemoveWithdraw(client, driverObject, seasonData){
        //Get current info
        let anmeldeChannelID = null;
        let withdrawnDrivers = new Array();
        let reinstatedDrivers = new Array();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO1();
            reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSO2();
            reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA1();
            reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaSA2();
            reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaFR();
            reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            withdrawnDrivers = seasonData.getWithdrawnDriversLigaOrigin();
            reinstatedDrivers = seasonData.getsubPersonListReinstatedDriversLigaOrigin();
        }
        //Do stuff
        reinstatedDrivers.push(driverObject.id);
        withdrawnDrivers.splice(withdrawnDrivers.indexOf(driverObject.id), 1);
        let withdrawRemoveEmbed = new MessageEmbed()
        .setColor('GREEN')
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            await seasonData.setsubPersonListReinstatedDriversLigaSO1(reinstatedDrivers);
            await seasonData.setWithdrawnDriversLigaSO1(withdrawnDrivers);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            await seasonData.setsubPersonListReinstatedDriversLigaSO2(reinstatedDrivers);
            await seasonData.setWithdrawnDriversLigaSO2(withdrawnDrivers);      
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            await seasonData.setsubPersonListReinstatedDriversLigaSA1(reinstatedDrivers);
            await seasonData.setWithdrawnDriversLigaSA1(withdrawnDrivers);   
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            await seasonData.setsubPersonListReinstatedDriversLigaSA2(reinstatedDrivers);
            await seasonData.setWithdrawnDriversLigaSA2(withdrawnDrivers);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            await seasonData.setsubPersonListReinstatedDriversLigaFR(reinstatedDrivers);
            await seasonData.setWithdrawnDriversLigaFR(withdrawnDrivers);      
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            await seasonData.setsubPersonListReinstatedDriversLigaOrigin(reinstatedDrivers);
            await seasonData.setWithdrawnDriversLigaOrigin(withdrawnDrivers);   
        }

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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentRegularDriver = seasonData.getCurrentRegularDriversLigaSO1();
            regularDrivers = seasonData.getRegularDriversLigaSO1();
            mercedesDrivers = seasonData.getMercedesDriversLigaSO1();
            redBullDrivers = seasonData.getRedBullDriversLigaSO1();
            ferrariDrivers = seasonData.getFerrariDriversLigaSO1();
            mcLarenDrivers = seasonData.getMcLarenDriversLigaSO1();
            astonMartinDrivers = seasonData.getAstonMartinDriversLigaSO1();
            alpineDrivers = seasonData.getAlpineDriversLigaSO1();
            alphaTauriDrivers = seasonData.getAlphaTauriDriversLigaSO1();
            alfaRomeoDrivers = seasonData.getAlfaRomeoDriversLigaSO1();
            williamsDrivers = seasonData.getWilliamsDriversLigaSO1();
            haasDrivers = seasonData.getHaasDriversLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentRegularDriver = seasonData.getCurrentRegularDriversLigaSO2();
            regularDrivers = seasonData.getRegularDriversLigaSO2();
            mercedesDrivers = seasonData.getMercedesDriversLigaSO2();
            redBullDrivers = seasonData.getRedBullDriversLigaSO2();
            ferrariDrivers = seasonData.getFerrariDriversLigaSO2();
            mcLarenDrivers = seasonData.getMcLarenDriversLigaSO2();
            astonMartinDrivers = seasonData.getAstonMartinDriversLigaSO2();
            alpineDrivers = seasonData.getAlpineDriversLigaSO2();
            alphaTauriDrivers = seasonData.getAlphaTauriDriversLigaSO2();
            alfaRomeoDrivers = seasonData.getAlfaRomeoDriversLigaSO2();
            williamsDrivers = seasonData.getWilliamsDriversLigaSO2();
            haasDrivers = seasonData.getHaasDriversLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentRegularDriver = seasonData.getCurrentRegularDriversLigaSA1();
            regularDrivers = seasonData.getRegularDriversLigaSA1();
            mercedesDrivers = seasonData.getMercedesDriversLigaSA1();
            redBullDrivers = seasonData.getRedBullDriversLigaSA1();
            ferrariDrivers = seasonData.getFerrariDriversLigaSA1();
            mcLarenDrivers = seasonData.getMcLarenDriversLigaSA1();
            astonMartinDrivers = seasonData.getAstonMartinDriversLigaSA1();
            alpineDrivers = seasonData.getAlpineDriversLigaSA1();
            alphaTauriDrivers = seasonData.getAlphaTauriDriversLigaSA1();
            alfaRomeoDrivers = seasonData.getAlfaRomeoDriversLigaSA1();
            williamsDrivers = seasonData.getWilliamsDriversLigaSA1();
            haasDrivers = seasonData.getHaasDriversLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
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
        } else if(seasonData.getLigatitel() == 'Liga FR'){
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
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentRegularDriver = seasonData.getCurrentRegularDriversLigaOrigin();
            regularDrivers = seasonData.getRegularDriversLigaOrigin();
            mercedesDrivers = seasonData.getMercedesDriversLigaOrigin();
            redBullDrivers = seasonData.getRedBullDriversLigaOrigin();
            ferrariDrivers = seasonData.getFerrariDriversLigaOrigin();
            mcLarenDrivers = seasonData.getMcLarenDriversLigaOrigin();
            astonMartinDrivers = seasonData.getAstonMartinDriversLigaOrigin();
            alpineDrivers = seasonData.getAlpineDriversLigaOrigin();
            alphaTauriDrivers = seasonData.getAlphaTauriDriversLigaOrigin();
            alfaRomeoDrivers = seasonData.getAlfaRomeoDriversLigaOrigin();
            williamsDrivers = seasonData.getWilliamsDriversLigaOrigin();
            haasDrivers = seasonData.getHaasDriversLigaOrigin();
        }

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
        let regularDriverEmbed = new MessageEmbed()
        .setColor('DARK_BLUE')
        .setTitle('️️️️️️️️Stammfahrer Liga 2')
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
            if(seasonData.getLigatitel() == `Liga SO 1`){
                seasonData.setCurrentRegularDriversLigaSO1(msg.id);
                seasonData.setRegularDriversLigaSO1(regularDrivers);
            } else if(seasonData.getLigatitel() == `Liga SO 2`){
                seasonData.setCurrentRegularDriversLigaSO2(msg.id);
                seasonData.setRegularDriversLigaSO2(regularDrivers);
            } else if(seasonData.getLigatitel() == `Liga SA 1`){
                seasonData.setCurrentRegularDriversLigaSA1(msg.id);
                seasonData.setRegularDriversLigaSA1(regularDrivers);
            } else if(seasonData.getLigatitel() == `Liga SA 2`){
                seasonData.setCurrentRegularDriversLigaSA2(msg.id);
                seasonData.setRegularDriversLigaSA2(regularDrivers);
            } else if(seasonData.getLigatitel() == `Liga FR`){
                seasonData.setCurrentRegularDriversLigaFR(msg.id);
                seasonData.setRegularDriversLigaFR(regularDrivers);
            } else if(seasonData.getLigatitel() == `Liga Origin`){
                seasonData.setCurrentRegularDriversLigaOrigin(msg.id);
                seasonData.setRegularDriversLigaOrigin(regularDrivers);
            }
        })
    }

    async findCurrentCockpitOfSub(driverObject, seasonData){
        //Get current info
        let currentLineup = new Array();
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }

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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            currentLineup = seasonData.getCurrentLineupLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            currentLineup = seasonData.getCurrentLineupLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            currentLineup = seasonData.getCurrentLineupLigaSA1();
        } else  if(seasonData.getLigatitel() == 'Liga SA 2'){
            currentLineup = seasonData.getCurrentLineupLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            currentLineup = seasonData.getCurrentLineupLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            currentLineup = seasonData.getCurrentLineupLigaOrigin();
        }

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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            seasonCalendar = seasonData.getSeasonCalendarLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            seasonCalendar = seasonData.getSeasonCalendarLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            seasonCalendar = seasonData.getSeasonCalendarLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            seasonCalendar = seasonData.getSeasonCalendarLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            seasonCalendar = seasonData.getSeasonCalendarLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            seasonCalendar = seasonData.getSeasonCalendarLigaOrigin();
        }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            seasonCalendar = seasonData.getSeasonCalendarLigaSO1();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO1();
            anmeldungActive = seasonData.getAnmeldungActiveLigaSO1();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSO1();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSO1();
            subPersonList = seasonData.getSubPersonListLigaSO1();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSO1();
            reactedToSubIn = seasonData.getReactedToSubInLigaSO1();
            reactedToSignOut = seasonData.getReactedToSignOutLigaSO1();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSO1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            seasonCalendar = seasonData.getSeasonCalendarLigaSO2();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO2();
            anmeldungActive = seasonData.getAnmeldungActiveLigaSO2();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSO2();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSO2();
            subPersonList = seasonData.getSubPersonListLigaSO2();        
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSO2();
            reactedToSubIn = seasonData.getReactedToSubInLigaSO2();
            reactedToSignOut = seasonData.getReactedToSignOutLigaSO2();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSO2();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            seasonCalendar = seasonData.getSeasonCalendarLigaSA1();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA1();
            anmeldungActive = seasonData.getAnmeldungActiveLigaSA1();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA1();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaSA1();
            subPersonList = seasonData.getSubPersonListLigaSA1();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaSA1();
            reactedToSubIn = seasonData.getReactedToSubInLigaSA1();
            reactedToSignOut = seasonData.getReactedToSignOutLigaSA1();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
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
        } else if(seasonData.getLigatitel() == 'Liga FR'){
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
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            seasonCalendar = seasonData.getSeasonCalendarLigaOrigin();
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaOrigin();
            anmeldungActive = seasonData.getAnmeldungActiveLigaOrigin();
            subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaOrigin();
            ersatzfahrerRolleID = seasonData.getErsatzfahrerRolleIDLigaOrigin();
            subPersonList = seasonData.getSubPersonListLigaOrigin();
            stammfahrerRolleID = seasonData.getStammfahrerRolleIDLigaOrigin();
            reactedToSubIn = seasonData.getReactedToSubInLigaOrigin();
            reactedToSignOut = seasonData.getReactedToSignOutLigaOrigin();
            withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaOrigin();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaOrigin();
        } 
        //Do stuff
        
        await this.clearChannels(client, seasonData);
        await this.setDefaultLineup(seasonData);
        await this.sendTeams(client, seasonData);
        await this.sendFreeCarsWaitListDefaultLineup(client, seasonData);
        // get current race location
        
        //
        let embedAnmeldung = new MessageEmbed()
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
        .setFooter('Bei weiteren Fragen bitte den %help-Command ausführen');
        let embedAbmeldung = new MessageEmbed()
        .setColor('#0064fd')
        .setTitle('Abmeldung für Stammfahrer')
        .setDescription(`Diese Nachricht ist NUR für die Stammfahrer relevant. Um euch abzumelden für das Ligarennen in ${currentRaceLocation} bitte mit dem ❌ reagieren, falls ihr ` +
                        `nicht könnt. Falls ihr doch könnt und mitfahren wollt, also eure Abmeldung wieder zurück ziehen wollt, entfernt einfach eure ` +
                        `Reaktion unter dieser Nachricht wieder. Ihr könnt euch NICHT im Anmelde-Channel wieder anmelden. Falls ihr nicht reagieren könnt, ` +
                        `könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch`)
        .setFooter('Bei weiteren Fragen bitte den %help-Command ausführen');
        var collectorSubIn = null;
        
        await client.channels.cache.get(anmeldeChannelID).send({ embeds: [embedAnmeldung] }).then((msg) => {
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                seasonData.setMessageEmbedAnmeldenLigaSO1(msg);
                msg.react(seasonData.getAnmeldeEmoji());
                collectorSubIn = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                seasonData.setMessageEmbedAnmeldenLigaSO2(msg);
                msg.react(seasonData.getAnmeldeEmoji());
                collectorSubIn = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                seasonData.setMessageEmbedAnmeldenLigaSA1(msg);
                msg.react(seasonData.getAnmeldeEmoji());
                collectorSubIn = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                seasonData.setMessageEmbedAnmeldenLigaSA2(msg);
                msg.react(seasonData.getAnmeldeEmoji());
                collectorSubIn = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga FR'){
                seasonData.setMessageEmbedAnmeldenLigaFR(msg);
                msg.react(seasonData.getAnmeldeEmoji());
                collectorSubIn = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                seasonData.setMessageEmbedAnmeldenLigaOrigin(msg);
                msg.react(seasonData.getAnmeldeEmoji());
                collectorSubIn = msg.createReactionCollector({ dispose: true});
            }
        });
        var collectorWithdraw = null;
        await client.channels.cache.get(abmeldeChannelID).send({ embeds: [embedAbmeldung] }).then((msg) => {
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                seasonData.setMessageEmbedAbmeldenLigaSO1(msg);
                msg.react(seasonData.getAbmeldeEmoji());
                collectorWithdraw = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                seasonData.setMessageEmbedAbmeldenLigaSO2(msg);
                msg.react(seasonData.getAbmeldeEmoji());
                collectorWithdraw = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                seasonData.setMessageEmbedAbmeldenLigaSA1(msg);
                msg.react(seasonData.getAbmeldeEmoji());
                collectorWithdraw = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                seasonData.setMessageEmbedAbmeldenLigaSA2(msg);
                msg.react(seasonData.getAbmeldeEmoji());
                collectorWithdraw = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga FR'){
                seasonData.setMessageEmbedAbmeldenLigaFR(msg);
                msg.react(seasonData.getAbmeldeEmoji());
                collectorWithdraw = msg.createReactionCollector({ dispose: true});
            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                seasonData.setMessageEmbedAbmeldenLigaOrigin(msg);
                msg.react(seasonData.getAbmeldeEmoji());
                collectorWithdraw = msg.createReactionCollector({ dispose: true});
            }
        });
    
        // Hinzufügen von Rolle
        collectorSubIn.on('collect', async (reaction, user) => {
            //Get information
            //Check new for every reaction
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO1();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSO1();                                           
                reactedToSubIn = seasonData.getReactedToSubInLigaSO1();                
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO2();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSO2();                                               
                reactedToSubIn = seasonData.getReactedToSubInLigaSO2();                  
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA1();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA1();                              
                reactedToSubIn = seasonData.getReactedToSubInLigaSA1();              
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA2();                                           
                reactedToSubIn = seasonData.getReactedToSubInLigaSA2();                
            } else if(seasonData.getLigatitel() == 'Liga FR'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaFR();                                               
                reactedToSubIn = seasonData.getReactedToSubInLigaFR();                  
            } else if(seasonData.getLigatitel() == 'Liga Origin'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaOrigin();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaOrigin();                              
                reactedToSubIn = seasonData.getReactedToSubInLigaOrigin();              
            }
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
                    if(seasonData.getLigatitel() == 'Liga SO 1'){
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction)
                            let date = new Date().toLocaleString();
                            console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                            await seasonData.setReactedToSubInLigaSO1(reactedToSubIn);
                        }
                    } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction)
                            let date = new Date().toLocaleString();
                            console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                            await seasonData.setReactedToSubInLigaSO2(reactedToSubIn);
                        }
                    } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction)
                            let date = new Date().toLocaleString();
                            console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                            await seasonData.setReactedToSubInLigaSA1(reactedToSubIn);
                        }
                    } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction)
                            let date = new Date().toLocaleString();
                            console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                            await seasonData.setReactedToSubInLigaSA2(reactedToSubIn);
                        }
                    } else if(seasonData.getLigatitel() == 'Liga FR'){
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction)
                            let date = new Date().toLocaleString();
                            console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                            await seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                        }
                    } else if(seasonData.getLigatitel() == 'Liga Origin'){
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction)
                            let date = new Date().toLocaleString();
                            console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                            await seasonData.setReactedToSubInLigaOrigin(reactedToSubIn);
                        }
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
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO1();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSO1();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaSO1();               
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO2();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSO2();     
                reactedToSignOut = seasonData.getReactedToSignOutLigaSO2();                 
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA1();         
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA1();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaSA1();                  
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA2();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaSA2();               
            } else if(seasonData.getLigatitel() == 'Liga FR'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaFR();     
                reactedToSignOut = seasonData.getReactedToSignOutLigaFR();                 
            } else if(seasonData.getLigatitel() == 'Liga Origin'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaOrigin();         
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaOrigin();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaOrigin();                  
            }
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
                        if(seasonData.getLigatitel() == 'Liga SO 1'){
                            if(reactedToSubIn.has(user.id)){
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                            } else {
                                reactedToSubIn.set(user.id, reaction)
                                let date = new Date().toLocaleString();
                                console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                                await seasonData.setReactedToSubInLigaSO1(reactedToSubIn);
                            }
                        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                            if(reactedToSubIn.has(user.id)){
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                            } else {
                                reactedToSubIn.set(user.id, reaction)
                                let date = new Date().toLocaleString();
                                console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                                await seasonData.setReactedToSubInLigaSO2(reactedToSubIn);
                            }
                        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                            if(reactedToSubIn.has(user.id)){
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                            } else {
                                reactedToSubIn.set(user.id, reaction)
                                let date = new Date().toLocaleString();
                                console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                                await seasonData.setReactedToSubInLigaSA1(reactedToSubIn);
                            }
                        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                            if(reactedToSubIn.has(user.id)){
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                            } else {
                                reactedToSubIn.set(user.id, reaction)
                                let date = new Date().toLocaleString();
                                console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                                await seasonData.setReactedToSubInLigaSA2(reactedToSubIn);
                            }
                        } else if(seasonData.getLigatitel() == 'Liga FR'){
                            if(reactedToSubIn.has(user.id)){
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                            } else {
                                reactedToSubIn.set(user.id, reaction)
                                let date = new Date().toLocaleString();
                                console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                                await seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                            }
                        } else if(seasonData.getLigatitel() == 'Liga Origin'){
                            if(reactedToSubIn.has(user.id)){
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${seasonData.getLigatitel()} -- ${date}`);
                            } else {
                                reactedToSubIn.set(user.id, reaction)
                                let date = new Date().toLocaleString();
                                console.log(`New entry to Reacted to sub in key: ${user.id}, value: ${reaction} -- ${date}`)
                                await seasonData.setReactedToSubInLigaOrigin(reactedToSubIn);
                            }
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
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO1();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSO1();                                           
                reactedToSubIn = seasonData.getReactedToSubInLigaSO1();                
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO2();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSO2();                                               
                reactedToSubIn = seasonData.getReactedToSubInLigaSO2();                  
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA1();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA1();                              
                reactedToSubIn = seasonData.getReactedToSubInLigaSA1();              
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaSA2();                                           
                reactedToSubIn = seasonData.getReactedToSubInLigaSA2();                
            } else if(seasonData.getLigatitel() == 'Liga FR'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaFR();                                               
                reactedToSubIn = seasonData.getReactedToSubInLigaFR();                  
            } else if(seasonData.getLigatitel() == 'Liga Origin'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaOrigin();
                subDriverInPerCommand = seasonData.getSubInDriversPerCommandLigaOrigin();                              
                reactedToSubIn = seasonData.getReactedToSubInLigaOrigin();              
            }
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
                            if(seasonData.getLigatitel() == 'Liga SO 1'){
                                seasonData.setReactedToSubInLigaSO1(reactedToSubIn);
                            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                                seasonData.setReactedToSubInLigaSO2(reactedToSubIn);
                            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                                seasonData.setReactedToSubInLigaSA1(reactedToSubIn);
                            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                                seasonData.setReactedToSubInLigaSA2(reactedToSubIn);
                            } else if(seasonData.getLigatitel() == 'Liga FR'){
                                seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                                seasonData.setReactedToSubInLigaOrigin(reactedToSubIn);
                            }
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
            if(seasonData.getLigatitel() == 'Liga SO 1'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO1();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSO1();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaSO1();               
            } else if(seasonData.getLigatitel() == 'Liga SO 2'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaSO2();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSO2();     
                reactedToSignOut = seasonData.getReactedToSignOutLigaSO2();                 
            } else if(seasonData.getLigatitel() == 'Liga SA 1'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA1();         
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA1();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaSA1();                  
            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                anmeldungActive = seasonData.getAnmeldungActiveLigaSA2();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaSA2();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaSA2();               
            } else if(seasonData.getLigatitel() == 'Liga FR'){                   
                anmeldungActive = seasonData.getAnmeldungActiveLigaFR();
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaFR();     
                reactedToSignOut = seasonData.getReactedToSignOutLigaFR();                 
            } else if(seasonData.getLigatitel() == 'Liga Origin'){                
                anmeldungActive = seasonData.getAnmeldungActiveLigaOrigin();         
                withdrawnDriversPerCommand = seasonData.getWithdrawnDriversPerCommandLigaOrigin();  
                reactedToSignOut = seasonData.getReactedToSignOutLigaOrigin();                  
            }
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
                            if(seasonData.getLigatitel() == 'Liga SO 1'){
                                await seasonData.setReactedToSignOutLigaSO1(reactedToSignOut);
                            } else if(seasonData.getLigatitel() == 'Liga SO 2'){
                                await seasonData.setReactedToSignOutLigaSO2(reactedToSignOut);
                            } else if(seasonData.getLigatitel() == 'Liga SA 1'){
                                await seasonData.setReactedToSignOutLigaSA1(reactedToSignOut);
                            } else if(seasonData.getLigatitel() == 'Liga SA 2'){
                                await seasonData.setReactedToSignOutLigaSA2(reactedToSignOut);
                            } else if(seasonData.getLigatitel() == 'Liga FR'){
                                await seasonData.setReactedToSignOutLigaFR(reactedToSignOut);
                            } else if(seasonData.getLigatitel() == 'Liga Origin'){
                                await seasonData.setReactedToSignOutLigaOrigin(reactedToSignOut);
                            }
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
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO1();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO1();
            seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaSO1();
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSO2();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSO2();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSO2();
            seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaSO2();
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA1();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA1();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA1();
            seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaSA1();
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaSA2();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaSA2();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaSA2();
            seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaSA2();
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaFR();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaFR();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaFR();
            seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaFR();
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            anmeldeChannelID = seasonData.getAnmeldeChannelIDLigaOrigin();
            abmeldeChannelID = seasonData.getAbmeldeChannelIDLigaOrigin();
            currentRaceLocation = seasonData.getCurrentRaceLocationLigaOrigin();
            seasonCalendarRacesDone = seasonData.getSeasonCalendarRacesDoneLigaOrigin();
        }
        //Do stuff
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            seasonData.setAnmeldungActiveLigaSO1(false);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            seasonData.setAnmeldungActiveLigaSO2(false);
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            seasonData.setAnmeldungActiveLigaSA1(false);
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            seasonData.setAnmeldungActiveLigaSA2(false);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            seasonData.setAnmeldungActiveLigaFR(false);
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            seasonData.setAnmeldungActiveLigaOrigin(false);
        } 
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(anmeldeChannelID).send(`Die Anmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Anmeldung in ${seasonData.getLigatitel()} wurde beendet`);
        })
        
        await client.guilds.cache.get(seasonData.getDiscordID()).channels.cache.get(abmeldeChannelID).send(`Die Abmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Abmeldung in ${seasonData.getLigatitel()} wurde beendet`);
        })
        seasonCalendarRacesDone.unshift(currentRaceLocation);
        if(seasonData.getLigatitel() == 'Liga SO 1'){
            seasonData.setSeasonCalendarRacesDoneLigaSO1(seasonCalendarRacesDone);
            seasonData.setCurrentRaceLocationLigaSO1(null);
        } else if(seasonData.getLigatitel() == 'Liga SO 2'){
            seasonData.setSeasonCalendarRacesDoneLigaSO2(seasonCalendarRacesDone);
            seasonData.setCurrentRaceLocationLigaSO2(null);
        } else if(seasonData.getLigatitel() == 'Liga SA 1'){
            seasonData.setSeasonCalendarRacesDoneLigaSA1(seasonCalendarRacesDone);
            seasonData.setCurrentRaceLocationLigaSA1(null);
        } else if(seasonData.getLigatitel() == 'Liga SA 2'){
            seasonData.setSeasonCalendarRacesDoneLigaSA2(seasonCalendarRacesDone);
            seasonData.setCurrentRaceLocationLigaSA2(null);
        } else if(seasonData.getLigatitel() == 'Liga FR'){
            seasonData.setSeasonCalendarRacesDoneLigaFR(seasonCalendarRacesDone);
            seasonData.setCurrentRaceLocationLigaFR(null);
        } else if(seasonData.getLigatitel() == 'Liga Origin'){
            seasonData.setSeasonCalendarRacesDoneLigaOrigin(seasonCalendarRacesDone);
            seasonData.setCurrentRaceLocationLigaOrigin(null);
        }
        
    }
}

module.exports = MethodClass