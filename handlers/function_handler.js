const { EmbedBuilder } = require('discord.js');
const cli = require('npm/lib/cli');

module.exports = (client) => {

    client.setCurrentLineup = async (teamName, currentLineupAsMap) => {
        var currentRaceID = -1
        var databaseFieldNameForTeam = ''

        client.getLastRaceInDatabase().then(function(res){
            console.log(`Successfully got last entry in table for ID -- ${new Date().toLocaleString()}`)

            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for ID -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(teamName == 'Mercedes'){
            databaseFieldNameForTeam = current_drivers_mercedes

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Mercedes')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Red Bull'){
            databaseFieldNameForTeam = current_drivers_rb

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Red Bull')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Ferrari'){
            databaseFieldNameForTeam = current_drivers_ferrari

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Ferrari')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'McLaren'){
            databaseFieldNameForTeam = current_drivers_mclaren

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('McLaren')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Aston Martin'){
            databaseFieldNameForTeam = current_drivers_aston_martin

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Aston Martin')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Alpine'){
            databaseFieldNameForTeam = current_drivers_alpine

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Alpine')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Alpha Tauri'){
            databaseFieldNameForTeam = current_drivers_alpha_tauri

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Alpha Tauri')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Alfa Romeo'){
            databaseFieldNameForTeam = current_drivers_alfa_romeo

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Alfa Romeo')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Williams'){
            databaseFieldNameForTeam = current_drivers_williams

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Williams')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(teamName == 'Haas'){
            databaseFieldNameForTeam = current_drivers_haas

            var newValueForDatabaseAsArray = new Array()
            newValueForDatabaseAsArray = currentLineupAsMap.get('Haas')

            var newValueForDatabaseAsString = `${newValueForDatabaseAsArray[0]},${newValueForDatabaseAsArray[1]}`

            await client.updateCurrentDriversInDatabase(databaseFieldNameForTeam, newValueForDatabaseAsString, currentRaceID).then(function(res){
                console.log(`Successfully set ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error setting ${databaseFieldNameForTeam} to ${newValueForDatabaseAsString} for event with race_id ${currentRaceID} ` + 
                             `-- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else {
            console.log(`Database field for team could not be detected, as the given parameter didnt match any teams -- ${new Date().toLocaleString()}`)
        }


    } 

    client.getCurrentLineup = async () => {

        var currentLineupAsMap = new Map()

        var mercedesDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Mercedes drivers -- ${new Date().toLocaleString()}`)

            mercedesDriversAsString = res[0].current_drivers_mercedes
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Mercedes drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var redBullDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Red Bull drivers -- ${new Date().toLocaleString()}`)

            redBullDriversAsString = res[0].current_drivers_rb
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Red Bull drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var ferrariDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Ferrari drivers -- ${new Date().toLocaleString()}`)

            ferrariDriversAsString = res[0].current_drivers_ferrari
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Ferrari drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var mcLarenDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for McLaren drivers -- ${new Date().toLocaleString()}`)

            mcLarenDriversAsString = res[0].current_drivers_mclaren
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for McLaren drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var astonMartinDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Aston Martin drivers -- ${new Date().toLocaleString()}`)

            astonMartinDriversAsString = res[0].current_drivers_aston_martin
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Aston Martin drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var alpineDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Alpine drivers -- ${new Date().toLocaleString()}`)

            alpineDriversAsString = res[0].current_drivers_alpine
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Alpine drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var alphaTauriDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Alpha Tauri drivers -- ${new Date().toLocaleString()}`)

            alphaTauriDriversAsString = res[0].current_drivers_alpha_tauri
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Alpha Tauri drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var alfaRomeoDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Alfa Romeo drivers -- ${new Date().toLocaleString()}`)

            alfaRomeoDriversAsString = res[0].current_drivers_alfa_romeo
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Alfa Romeo drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var williamsDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Williams drivers -- ${new Date().toLocaleString()}`)

            williamsDriversAsString = res[0].current_drivers_williams
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Williams drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var haasDriversAsString = ''
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current Lineup for Haas drivers -- ${new Date().toLocaleString()}`)

            haasDriversAsString = res[0].current_drivers_haas
        }, function(err){
            console.log(`Error getting last entry in table for current Lineup for Haas drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var mercedesDriversAsArray = mercedesDriversAsString.split(',')
        var redBullDriversAsArray = redBullDriversAsString.split(',')
        var ferrariDriversAsArray = ferrariDriversAsString.split(',')
        var mcLarenDriversAsArray = mcLarenDriversAsString.split(',')
        var astonMartinDriversAsArray = astonMartinDriversAsString.split(',')
        var alpineDriversAsArray = alpineDriversAsString.split(',')
        var alphaTauriDriversAsArray = alphaTauriDriversAsString.split(',')
        var alfaRomeoDriversAsArray = alfaRomeoDriversAsString.split(',')
        var williamsDriversAsArray = williamsDriversAsString.split(',')
        var haasDriversAsArray = haasDriversAsString.split(',')

        currentLineupAsMap.set('Mercedes', mercedesDriversAsArray)
        currentLineupAsMap.set('Red Bull', redBullDriversAsArray)
        currentLineupAsMap.set('Ferrari', ferrariDriversAsArray)
        currentLineupAsMap.set('McLaren', mcLarenDriversAsArray)
        currentLineupAsMap.set('Aston Martin', astonMartinDriversAsArray)
        currentLineupAsMap.set('Alpine', alpineDriversAsArray)
        currentLineupAsMap.set('Alpha Tauri', alphaTauriDriversAsArray)
        currentLineupAsMap.set('Alfa Romeo', alfaRomeoDriversAsArray)
        currentLineupAsMap.set('Williams', williamsDriversAsArray)
        currentLineupAsMap.set('Haas', haasDriversAsArray)

        return currentLineupAsMap;
    }

    client.removeFromCurrentLineup = async (client, userToRemoveID, freeCar) => {
        console.log(`Die Methode removeFromCurrentLineup wurde aufgerufen. Parameter: userToRemoveID: ${userToRemoveID}, freeCar: ${freeCar} ` + 
                    `In Liga FR -- ${new Date().toLocaleString()}`);
        //Gets all the information
        var stammfahrerRolleID = client.getStammfahrerRolleIDLigaFR();
        var currentLineup = await client.getCurrentLineup();
       
        var userToRemove = await client.guilds.cache.get(client.getDiscordID()).members.fetch(userToRemoveID);
        //Checks if user has stammfahrer
        if(userToRemove.roles.cache.has(stammfahrerRolleID)){
            console.log(`${userToRemove.user.username} soll aus dem Lineup entfernt werden, ${userToRemove.user.username} hat die Stammfahrer Rolle für Liga FR. ` + 
                        `In Liga FR -- ${new Date().toLocaleString()}`);
            //Change cockpit locally
            var tempNameString = await client.findMainTeamString(userToRemove)
            if(currentLineup.get(tempNameString)[0] == userToRemove.id){
                currentLineup.get(tempNameString)[0] = 'nicht besetzt';
                console.log(`${userToRemove.user.username} wurde aus dem Lineup entfernt -- ${new Date().toLocaleString()}`);
            } else if(currentLineup.get(tempNameString)[1] == userToRemove.id){
                currentLineup.get(tempNameString)[1] = 'nicht besetzt';
                console.log(`${userToRemove.user.username} wurde aus dem Lineup entfernt -- ${new Date().toLocaleString()}`);
            } else {
                console.log(`${userToRemove.user.username} konnte nicht aus dem Lineup entfernt werden, da er in keinem der beiden Cockpits saß. ` + 
                            `In Liga FR -- ${new Date().toLocaleString()}`);
            }
            //Change in object
            await client.setCurrentLineup(tempNameString, currentLineup);
           
        } else {
            console.log(`${userToRemove.user.username} soll aus dem Lineup entfernt werden, ${userToRemove.user.username} hat die Ersatzfahrer Rolle für Liga FR. ` + 
                        `In Liga FR -- ${new Date().toLocaleString()}`);
            //Get all the information
            let teamNameString = null;
            if(freeCar == null){
                teamNameString = await client.findMainTeamString(userToRemove);
            } else {
                let teamID = freeCar;
                teamNameString = await client.guilds.cache.get(client.getDiscordID()).roles.cache.get(teamID).name;
            }
            console.log(`Das Team aus dem ${userToRemove.user.username} entfernt werden soll ist ${teamNameString}. -- ${new Date().toLocaleString()}`)
            //Change cockpit locally
            if(currentLineup.get(teamNameString)[0] == userToRemove.id){
                currentLineup.get(teamNameString)[0] = 'nicht besetzt';
                console.log(`${userToRemove.username} wurde aus dem Lineup entfernt  in ${client.getLigatitel()}-- ${new Date().toLocaleString()}`);
            } else if(currentLineup.get(teamNameString)[1] == userToRemove.id){
                currentLineup.get(teamNameString)[1] = 'nicht besetzt';
                console.log(`${userToRemove.username} wurde aus dem Lineup entfernt  in ${client.getLigatitel()}-- ${new Date().toLocaleString()}`);
            } else {
                console.log(`Fehler beim Entfernen ${userToRemove.username} aus dem Lineup  in ${seasonData.getLigatitel()}-- ${new Date().toLocaleString()}`);
            }
            //Change content in object
            await client.setCurrentLineup(teamNameString, currentLineup);
           
        }
    }

    client.regularDriverBack = async (client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition) => {
        //Gets all the information
        var currentLineup = await client.getCurrentLineup()
        
        //Checks if seat is open
        if(seatOpen == false){
            //Changes cockpit locally
            let mainTeamNameString = await client.guilds.cache.get(client.getDiscordID()).roles.cache.get(mainTeamIDString).name;
            currentLineup.get(mainTeamNameString)[subDriverPosition] = driverToStart;
            console.log(`Method: regularDriverBack => Im ${mainTeamNameString} hat ${driverToStart} sein Cockpit wieder -- ${new Date().toLocaleString()}`);
            let carToTakeNameString = await client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name;
            if(currentLineup.get(carToTakeNameString)[0] == 'nicht besetzt'){
                currentLineup.get(carToTakeNameString)[0] = subDriverID;
                console.log(`Method: regularDriverBack => Das erste Cockpit von ${carToTakeNameString} war offen, 
                            Fahrer mit ID ${subDriverID} ist nun im ${carToTakeNameString} in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
            } else if(currentLineup.get(carToTakeNameString)[1] == 'nicht besetzt'){
                currentLineup.get(carToTakeNameString)[1] = subDriverID;
                console.log(`Method: regularDriverBack => Das zweite Cockpit von ${carToTakeNameString} war offen, 
                            Fahrer mit ID ${subDriverID} ist nun im ${carToTakeNameString} in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
            } else {
                console.log(`Method: regularDriverBack => ${carToTakeNameString} hatte kein offenes Cockpit in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
            }
            //Change content in object
            await client.setCurrentLineup(carToTakeNameString, currentLineup);
            
        } else {
            //Changes cockpit locally
            let mainTeamNameString = await client.guilds.cache.get(client.getDiscordID()).roles.cache.get(mainTeamIDString).name;
            currentLineup.get(mainTeamNameString)[subDriverPosition] = driverToStart;
            console.log(`Method: regularDriverBack => Im ${mainTeamNameString} hat ${driverToStart} sein Cockpit wieder, 
                        das Cockpit war noch frei in ${seasonData.getLigatitel()} -- ${new Date().toLocaleString()}`);
            //Change content in object
           
            await client.setCurrentLineup(mainTeamNameString, currentLineup);
          
        }
    }

    client.changeLineupNormalSub = async (client, driverToStart, carToTake) => {
        //Gets all the information
        var currentLineup = await client.getCurrentLineup()
       
        //Checks if seat i
        let carToTakeNameString = await client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name;
        if(currentLineup.get(carToTakeNameString)[0] == 'nicht besetzt'){
            currentLineup.get(carToTakeNameString)[0] = driverToStart;
            console.log(`Der Tausch im Lineup wurde im Team ${carToTakeNameString} an der ersten Stelle 
                        durchgeführt; Normal Sub in ${seasonData.getLigatitel()} -- ${new Date().toLocaleString()}`);
        } else if(currentLineup.get(carToTakeNameString)[1] == 'nicht besetzt'){
            currentLineup.get(carToTakeNameString)[1] = driverToStart;
            console.log(`Der Tausch im Lineup wurde im Team ${carToTakeNameString} an der zweiten Stelle 
                        durchgeführt; Normal Sub in ${seasonData.getLigatitel()} -- ${new Date().toLocaleString()}`);
        } else {
            console.log(`Der Tausch im Lineup konnte nicht durchgeführt werden; Normal Sub. EVTL GEWOLLT in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
        }
        //Changes cockpit globally
       
        await client.setCurrentLineup(carToTakeNameString, currentLineup);
        
    }

    client.changeLineupAfterForceOpen = async (driverToStart, carToTake, positionForForce) => {
        //Gets all the information
        let currentLineup = await client.getCurrentLineup()
       
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        console.log(`Nachdem das Cockpit von ${carToTake} offen geforced wurde ist jetzt der Fahrer mit der
                    der ID ${driverToStart} drin in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
        //Changes cockpit globally
       
        await client.setCurrentLineup(carToTake, currentLineup);
       
    }

    client.changeLineupAfterForceDedicated = async (driverToStart, carToTake, positionForForce) => {
        //Gets all the information
        let currentLineup = await client.getCurrentLineup()
      
        //Changes locally
        currentLineup.get(carToTake)[positionForForce] = driverToStart;
        let date = new Date().toLocaleString();
        console.log(`In das Cockpit von ${carToTake} wurde der Fahrer mit der
                    der ID ${driverToStart} rein geforced in ${client.getLigatitel()} -- ${date}`);
        //Changes cockpit globally
       
        await client.setCurrentLineup(carToTake, currentLineup);
        
    }

    client.printInitialLineup = async (client, currentRaceLocation) => {

        console.log('CRASHPOINT 1')

        //Gets all the information
        let infoChannelID = null;

        console.log('CRASHPOINT 2')
    
        infoChannelID = client.getInfoChannelIDLigaFR();

        var returnValue = -1

        var mercedesDrivers = await client.getMercedesDrivers(client);
        var redBullDrivers = await client.getRedBullDrivers(client);
        var ferrariDrivers = await client.getFerrariDrivers(client)
        var mcLarenDrivers = await client.getMcLarenDrivers(client);
        var astonMartinDrivers = await client.getAstonMartinDrivers(client);
        var alpineDrivers = await client.getAlpineDrivers(client);
        var alphaTauriDrivers = await client.getAlphaTauriDrivers(client);
        var alfaRomeoDrivers = await client.getAlfaRomeoDrivers(client);
        var williamsDrivers = await client.getWilliamsDrivers(client);
        var haasDrivers = await client.getHaasDrivers(client);     
        
        //Sets content for new messag
        let lineupEmbed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Aktuelles Lineup')
        .setDescription(`Die AKTUELLEN Fahrer aller Teams für das Rennen in ${currentRaceLocation} sind hier aufgelistet`)
        .addFields(
            {name: 'Mercedes ', value: `${await client.setContentForLineup(mercedesDrivers[0], client)} und ${await client.setContentForLineup(mercedesDrivers[1], client)}`},
            {name: 'Red Bull ', value: `${await client.setContentForLineup(redBullDrivers[0], client)} und ${await client.setContentForLineup(redBullDrivers[1], client)}`},
            {name: 'Ferrari ', value: `${await client.setContentForLineup(ferrariDrivers[0], client)} und ${await client.setContentForLineup(ferrariDrivers[1], client)}`},
            {name: 'McLaren ', value: `${await client.setContentForLineup(mcLarenDrivers[0], client)} und ${await client.setContentForLineup(mcLarenDrivers[1], client)}`},
            {name: 'Aston Martin ', value: `${await client.setContentForLineup(astonMartinDrivers[0], client)} und ${await client.setContentForLineup(astonMartinDrivers[1], client)}`},
            {name: 'Alpine ', value: `${await client.setContentForLineup(alpineDrivers[0], client)} und ${await client.setContentForLineup(alpineDrivers[1], client)}`},
            {name: 'Alpha Tauri ', value: `${await client.setContentForLineup(alphaTauriDrivers[0], client)} und ${await client.setContentForLineup(alphaTauriDrivers[1], client)}`},
            {name: 'Alfa Romeo ', value: `${await  client.setContentForLineup(alfaRomeoDrivers[0], client)} und ${await client.setContentForLineup(alfaRomeoDrivers[1], client)}`},
            {name: 'Williams ', value: `${await client.setContentForLineup(williamsDrivers[0], client)} und ${await client.setContentForLineup(williamsDrivers[1], client,)}`},
            {name: 'Haas ', value: `${await client.setContentForLineup(haasDrivers[0], client)} und ${await client.setContentForLineup(haasDrivers[1], client)}`}
        )
        let date = new Date().toLocaleString();   
        console.log(`Das initiale Lineup wurde gesendet. Für Liga ${client.getLigatitel()} -- ${date}`);
        await client.channels.cache.get(infoChannelID).send({ embeds : [lineupEmbed]}).then((msg) => {
            //Set Waitlist Msg ID
            
            returnValue = msg.id;
            
        });
        return returnValue
    }

    client.printLineup = async (client) => {
        //Gets all the information
        var msgLineupID = -1;
        var infoChannelID = await client.getInfoChannelIDLigaFR();
        var currentRaceLocation = 'k.A.';
        var currentLineup = await client.getCurrentLineup()
       
       
        // SQL FOR msgLineupID = client.getLineupMsgLigaFR();
        client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for lineup message ID -- ${new Date().toLocaleString()}`)

            msgLineupID = res[0].lineup_msg_id
        }, function(err){
            console.log(`Error getting last entry in table for lineup message ID -- ${new Date().toLocaleString()} \n ${err}`)
        })

        // SQL FORcurrentRaceLocation = client.getCurrentRaceLocationLigaFR();
        client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for current race location -- ${new Date().toLocaleString()}`)

            currentRaceLocation = res[0].race_location
        }, function(err){
            console.log(`Error getting last entry in table for current race location -- ${new Date().toLocaleString()} \n ${err}`)
        })

        //Sets content for new message
        let lineupEmbed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Aktuelles Lineup')
        .setDescription(`Die AKTUELLEN Fahrer aller Teams für das Rennen in ${currentRaceLocation} sind hier aufgelistet`)
        .addFields(
            {name: 'Mercedes ', value: `${await client.setContentForLineup(currentLineup.get('Mercedes')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Mercedes')[1], client)}`},
            {name: 'Red Bull ', value: `${await client.setContentForLineup(currentLineup.get('Red Bull')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Red Bull')[1], client)}`},
            {name: 'Ferrari ', value: `${await client.setContentForLineup(currentLineup.get('Ferrari')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Ferrari')[1], client)}`},
            {name: 'McLaren ', value: `${await client.setContentForLineup(currentLineup.get('McLaren')[0], client)} und ${await client.setContentForLineup(currentLineup.get('McLaren')[1], client)}`},
            {name: 'Aston Martin ', value: `${await client.setContentForLineup(currentLineup.get('Aston Martin')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Aston Martin')[1], client)}`},
            {name: 'Alpine ', value: `${await client.setContentForLineup(currentLineup.get('Alpine')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Alpine')[1], client)}`},
            {name: 'Alpha Tauri ', value: `${await client.setContentForLineup(currentLineup.get('Alpha Tauri')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Alpha Tauri')[1], client)}`},
            {name: 'Alfa Romeo ', value: `${await  client.setContentForLineup(currentLineup.get('Alfa Romeo')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Alfa Romeo')[1], client)}`},
            {name: 'Williams ', value: `${await client.setContentForLineup(currentLineup.get('Williams')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Williams')[1], client)}`},
            {name: 'Haas ', value: `${await client.setContentForLineup(currentLineup.get('Haas')[0], client)} und ${await client.setContentForLineup(currentLineup.get('Haas')[1], client)}`}
        )

         //Deletes lineup currently displayed in channel
         if(msgLineupID != null){
            await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(infoChannelID).messages.fetch(msgLineupID).then(async (msg) => {
                await msg.edit({ embeds: [lineupEmbed]});
                console.log(`Das aktuelle Lineup wurde bearbeitet. In ${client.getLigatitel()} -- ${new Date().toLocaleString()}`)
            })
        } else {  
            console.log(`Das aktuelle Lineup wurde nochmal gesendet. Da die alte Lineupnachricht nicht gefunden wurde -- ${date}`);
            await client.channels.cache.get(infoChannelID).send({ embeds : [lineupEmbed]}).then(async (msg) => {
                //Set Waitlist Msg ID
                var currentRaceID = -1
                await client.getLastRaceInDatabase().then(async function(res){
                    console.log(`Successfully got last entry in table for race ID -- ${new Date().toLocaleString()}`)
        
                    currentRaceID = res[0].race_id
                }, function(err){
                    console.log(`Error getting last entry in table for race ID -- ${new Date().toLocaleString()} \n ${err}`)
                })
                
                await client.updateCurrentLineupMsg(msg.id, currentRaceID).then(async function(res){
                    console.log(`Successfully got last entry in table for current race location -- ${new Date().toLocaleString()}`)
                }, function(err){
                    console.log(`Error getting last entry in table for current race location -- ${new Date().toLocaleString()} \n ${err}`)
                })
                
            });
        }
    }

    client.setContentForLineup = async (cockpitValue, client) => {       
        
        //Yields return value
        if(cockpitValue == 'nicht besetzt'){
            return `nicht besetzt`;
        } else if(cockpitValue == 'entfernt'){
            return `entfernt`;
        } else {
            var driverInSeat = await client.guilds.cache.get(client.getDiscordID()).members.fetch(cockpitValue);

            if(driverInSeat.roles.cache.has(client.getSteamRolleID())){
                return `<@${cockpitValue}> <:steam:1032252108772229142>`;
            } else if(driverInSeat.roles.cache.has(client.getOriginRolleID())){
                return `<@${cockpitValue}> <:origin:1032252076169900082>`;
            }
            // if XBox
            // if PS
        }
    }

    client.checkSubCanBeMade = async (client, fromForceRemove, positionForForce, driverForForce, carForForce) => {
        //Gets all the information

        var freeCars = new Array();
        var subPersonList = new Array();
        var subPersonListReinstatedDrivers = new Array();
        var withdrawnDrivers = new Array();
        var currentLineup = new Map();

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for all information for checkSubCanBeMade -- ${new Date().toLocaleString()}`)

            freeCars = res[0].free_cars.split(',')
            subPersonList = res[0].sub_person_list.split(',')
            subPersonListReinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
            withdrawnDrivers = res[0].withdrawn_drivers.split(',')
            currentLineup = await client.getCurrentLineup();
        }, function(err){
            console.log(`Error getting last entry in table for all information for checkSubCanBeMade -- ${new Date().toLocaleString()} \n ${err}`)
        })
       
        var stammfahrerRolleID = client.getStammfahrerRolleIDLigaFR();
        var ersatzfahrerRolleID = client.getErsatzfahrerRolleIDLigaFR();
        var anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();

        if(freeCars.length > 0 && ((subPersonList.length + subPersonListReinstatedDrivers.length) > 0)){
            
            let driverToStart = null;
            if(subPersonListReinstatedDrivers.length > 0){
                var driverToStartTemp = subPersonListReinstatedDrivers.shift();
                driverToStart = await client.guilds.cache.get(client.getDiscordID()).members.fetch(driverToStartTemp);
            } else {
                var driverToStartTemp = subPersonList.shift();
                driverToStart = await client.guilds.cache.get(client.getDiscordID()).members.fetch(driverToStartTemp);
            }
            let carToTake = freeCars.shift();
            if(driverToStart == null){
                console.log(`Wurde checkSubCanBeMade ausgeführt, aber der driverToStart war in irgendeiner Weise falsch. `+
                            `DriverToStart war null. In ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
                return;
            }
            console.log(`Prüfsumme für ${client.getLigatitel()}, Methode checkSubCanBeMade. Das Auto was gerade belegt wird hat ID ${carToTake}, der `+
                        `Fahrer der es nimmt hat die ID ${driverToStartTemp}. Beides darf nicht null oder undefined sein in ${client.getLigatitel()}. ` + 
                        `-- ${new Date().toLocaleString()}`);
            if(!fromForceRemove && await driverToStart.roles.cache.has(stammfahrerRolleID) && await client.checkIfCarisFree(client, carToTake)){
                let mainTeamNameString = await client.findMainTeamString(driverToStart);
                var seatOpen = false;
                let mainTeamIDString = null;
                client.guilds.cache.get(client.getDiscordID()).roles.cache.find(role => {
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
                    var driverOfMainTeamOne = await client.guilds.cache.get(client.getDiscordID()).members.fetch(currentLineup.get(mainTeamNameString)[0])
                    var driverOfMainTeamTwo = await client.guilds.cache.get(client.getDiscordID()).members.fetch(currentLineup.get(mainTeamNameString)[1])

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
                    console.log(`Methode: CheckSubCanBeMade, Fall: 1 => Stammfahrer kommt zurück, subDriverPosition war null in ${client.getLigatitel()} ` + 
                                `-- ${new Date().toLocaleString()}`)
                    return;
                }
                await client.regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart.id, seatOpen, subDriverPosition);
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
                        await client.guilds.cache.get(client.getDiscordID()).members.cache.get(subDriverID).send(`Es ergab sich eine ` +
                        `Verschiebung im Lineup, du fährst am Wochenende den ${client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name}`);
                    }
                    await client.channels.cache.get(anmeldeChannelID).send({embeds : [driverInEmbed]}).then(() => {
                        client.channels.cache.get(client.getLogChannelID()).send({embeds : [driverInEmbed]});
                    });
                }
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [regularDriverBackEmbed]}).then(() => {
                    client.channels.cache.get(client.getLogChannelID()).send({embeds : [regularDriverBackEmbed]});
                    driverToStart.send(`Gute Nachrichten, ` +
                    `du hast deinen Stammplatz für diese Woche wieder! 😄`);
                });
                if(subDriverID && subDriverID != 'nicht besetzt'){
                    console.log(`${client.guilds.cache.get(client.getDiscordID()).members.cache.get(subDriverID).nickname} übernimmt einen ` + 
                                `${client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name} und ` + 
                                `${driverToStart.nickname} bekommt seinen Stammplatz wieder -- ${new Date().toLocaleString()}`);
                } else {
                    console.log(`${driverToStart.nickname} bekommt seinen Stammplatz wieder -- ${new Date().toLocaleString()}`);
                }
            
            } else if(!fromForceRemove && driverToStart.roles.cache.has(ersatzfahrerRolleID) && await client.checkIfCarisFree(client, carToTake)){
                await client.changeLineupNormalSub(client, driverToStart.id, carToTake);
                let driverInEmbed = new EmbedBuilder()
                .setColor('#fff654')
                .setTitle('➡️')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverToStart.id}> bekommt den <@&${carToTake}>`}
                );
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [driverInEmbed]}).then(() => {
                    client.channels.cache.get(client.getLogChannelID()).send({embeds : [driverInEmbed]});
                    driverToStart.send(`Gute Nachrichten, du fährst diese Woche den ` + 
                    `${client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
                });
                let date = new Date().toLocaleString();
                console.log(`${driverToStart.nickname} bekommt ` + 
                            `den ${client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name} -- ${date}`);
            } else if(fromForceRemove && driverForForce == null && carForForce == null){
                await client.changeLineupAfterForceOpen(driverToStart.id, client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name, positionForForce, seasonData);
                let subDriverInEmbed = new EmbedBuilder()
                .setColor('#fff654')
                .setTitle('➡️')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverToStart.id}> bekommt den <@&${carToTake}>`}
                );
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [subDriverInEmbed]}).then(() => {
                    client.channels.cache.get(client.getLogChannelID()).send({embeds : [subDriverInEmbed]});
                    driverToStart.send(`Gute Nachrichten, du fährst diese Woche den ` + 
                    `${client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
                });
                console.log(`${driverToStart.nickname} bekommt` + 
                            ` den ${client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name} -- ${new Date().toLocaleString()}`);
            }
        } else {
            if(fromForceRemove && driverForForce != null && carForForce != null){
                await client.changeLineupAfterForceDedicated(driverForForce, carForForce, positionForForce);
                let subDriverInEmbed = new EmbedBuilder()
                .setColor('#fff654')
                .setTitle('➡️')
                .addFields(
                    {name: `Update im Lineup`, value: `<@${driverForForce}> bekommt den ${carForForce}`}
                );
                await client.channels.cache.get(anmeldeChannelID).send({embeds : [subDriverInEmbed]}).then(() => {
                    client.channels.cache.get(client.getLogChannelID()).send({embeds : [subDriverInEmbed]});
                    client.guilds.cache.get(client.getDiscordID()).members.cache.get(driverForForce).send(`Gute Nachrichten, du fährst diese Woche den ` + 
                    `${(carForForce)}! Viel Glück beim Rennen 🍀`);
                });
                console.log(`${client.guilds.cache.get(client.getDiscordID()).members.cache.get(driverForForce).user.username} bekommt` + 
                            ` den ${carForForce} -- ${new Date().toLocaleString()}`);
            }
        }
        await client.setWaitlistMsgContent(client);
        await client.printLineup(client)
    }

    client.addCarOfWithdrawnDriverToFreeCars = async (memberUser, client) => {
        //Gets all the information
        var freeCars = new Array();
        var currentRaceID = -1
       
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for information to add car to free cars list -- ${new Date().toLocaleString()}`)

            freeCars = res[0].free_cars.split(',')
            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for information to add car to free cars list -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        //Changes locally
        var member = await client.guilds.cache.get(client.getDiscordID()).members.fetch(memberUser.id);
        if(member.roles.cache.has(client.getMercedesRolleID())){
            freeCars.unshift(client.getMercedesRolleID());
        } else if(member.roles.cache.has(client.getRedBullRolleID())){
            freeCars.unshift(client.getRedBullRolleID());
        } else if(member.roles.cache.has(client.getFerrariRolleID())){
            freeCars.unshift(client.getFerrariRolleID());
        } else if(member.roles.cache.has(client.getMcLarenRolleID())){
            freeCars.unshift(client.getMcLarenRolleID());
        } else if(member.roles.cache.has(client.getAstonMartinRolleID())){
            freeCars.unshift(client.getAstonMartinRolleID());
        }  else if(member.roles.cache.has(client.getAlpineRolleID())){
            freeCars.unshift(client.getAlpineRolleID());
        } else if(member.roles.cache.has(client.getAlphaTauriRolleID())){
            freeCars.unshift(client.getAlphaTauriRolleID());
        } else if(member.roles.cache.has(client.getAlfaRomeoRolleID())){
            freeCars.unshift(client.getAlfaRomeoRolleID());
        } else if(member.roles.cache.has(client.getWilliamsRolleID())){
            freeCars.unshift(client.getWilliamsRolleID());
        } else if(member.roles.cache.has(client.getHaasRolleID())){
            freeCars.unshift(client.getHaasRolleID());
        }
        //Makes changes globally
        
        var freeCarsAsString = await client.convertArrayToString(freeCars)
        await client.updateFreeCarsList(freeCarsAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })

       
    }

    client.setWaitlistMsgContent = async (client, seasonData) => {
        //Gets all the information
        let subPersonList = new Array();
        let subPersonListReinstatedDrivers = new Array();
        let freeCars = new Array();
        let waitListMsgID = -1;
        let freeCarsMsgID = -1;

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for all information for checkSubCanBeMade -- ${new Date().toLocaleString()}`)

            freeCars = res[0].free_cars.split(',')
            subPersonList = res[0].sub_person_list.split(',')
            subPersonListReinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
            waitListMsgID = res[0].waitlist_msg_id
            freeCarsMsgID = res[0].free_car_msg_id
        }, function(err){
            console.log(`Error getting last entry in table for all information for checkSubCanBeMade -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();
       
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

    client.findMainTeamString = async (member) => {
        if(member.roles.cache.has(client.getMercedesRolleID())){
            return 'Mercedes';
        } else if(member.roles.cache.has(client.getRedBullRolleID())){
            return 'Red Bull';
        } else if(member.roles.cache.has(client.getFerrariRolleID())){
            return 'Ferrari';
        } else if(member.roles.cache.has(client.getMcLarenRolleID())){
            return 'McLaren';
        } else if(member.roles.cache.has(client.getAstonMartinRolleID())){
            return 'Aston Martin';
        } else if(member.roles.cache.has(client.getAlpineRolleID())){
            return 'Alpine';
        } else if(member.roles.cache.has(client.getAlphaTauriRolleID())){
            return 'Alpha Tauri';
        } else if(member.roles.cache.has(client.getAlfaRomeoRolleID())){
            return 'Alfa Romeo';
        } else if(member.roles.cache.has(client.getWilliamsRolleID())){
            return 'Williams';
        } else if(member.roles.cache.has(client.getHaasRolleID())){
            return 'Haas';
        }
    }

    client.checkIfCarisFree = async (client, carToTake) => {
        //Gets all the information
        let currentLineup = await client.getCurrentLineup();
        
        let teamNameString = client.guilds.cache.get(client.getDiscordID()).roles.cache.get(carToTake).name;
        if(currentLineup.get(teamNameString)[0] == `nicht besetzt` || currentLineup.get(teamNameString)[1] == `nicht besetzt`){
            return true;
        } else {
            return false;
        }
    }

    client.createRaceInDatabase = async (currentRaceLocation, client) => {

        var mercedesDrivers = await client.getMercedesDrivers(client);
        var redBullDrivers = await client.getRedBullDrivers(client);
        var ferrariDrivers = await client.getFerrariDrivers(client);
        var mcLarenDrivers = await client.getMcLarenDrivers(client);
        var astonMartinDrivers = await client.getAstonMartinDrivers(client);
        var alpineDrivers = await client.getAlpineDrivers(client);
        var alphaTauriDrivers = await client.getAlphaTauriDrivers(client);
        var alfaRomeoDrivers = await client.getAlfaRomeoDrivers(client);
        var williamsDrivers = await client.getWilliamsDrivers(client);
        var haasDrivers = await client.getHaasDrivers(client);

        var mercedesDriversAsString = `${mercedesDrivers[0]},${mercedesDrivers[1]}`
        var redBullDriversAsString = `${redBullDrivers[0]},${redBullDrivers[1]}`
        var ferrariDriversAsString = `${ferrariDrivers[0]},${ferrariDrivers[1]}`
        var mcLarenDriversAsString = `${mcLarenDrivers[0]},${mcLarenDrivers[1]}`
        var astonMartinDriversAsString = `${astonMartinDrivers[0]},${astonMartinDrivers[1]}`
        var alpineDriversAsString = `${alpineDrivers[0]},${alpineDrivers[1]}`
        var alphaTauriDriversAsString = `${alphaTauriDrivers[0]},${alphaTauriDrivers[1]}`
        var alfaRomeoDriversAsString = `${alfaRomeoDrivers[0]},${alfaRomeoDrivers[1]}`
        var williamsDriversAsString = `${williamsDrivers[0]},${williamsDrivers[1]}`
        var haasDriversAsString = `${haasDrivers[0]},${haasDrivers[1]}`

        await client.clearChannels(client);
        
        await client.sendOpenMsg(client, currentRaceLocation);

        console.log('CRASHPOINT 1')

        var waitlistMsgID = await client.sendWaitlistMsg(client)

        console.log('Warteliste: ' + waitlistMsgID)

        var freeCarsMsgID = await client.sendFreeCarsMsg(client)

        console.log('Free Cars: ' + freeCarsMsgID)

        var regularDriversMsgID = await client.sendTeams(client);

        console.log('Stammfahrer: ' + regularDriversMsgID)

        var registerMsgID = await client.sendRegisterMsg(client, currentRaceLocation)

        console.log('Anmeldenachricht: ' + registerMsgID)

        var deregisterMsgID = await client.sendDeregisterMsg(client, currentRaceLocation)

        console.log('Abmeldenachricht: ' + deregisterMsgID)

        var lineupMsgID =  await client.printInitialLineup(client, currentRaceLocation);
        console.log(`Das Standard Lineup wurde gesendet in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
        console.log('Lineup: ' + lineupMsgID)

        await client.insertNewRace(mercedesDriversAsString, redBullDriversAsString, ferrariDriversAsString,
            mcLarenDriversAsString, astonMartinDriversAsString, alpineDriversAsString, alphaTauriDriversAsString,
            alfaRomeoDriversAsString, williamsDriversAsString, haasDriversAsString, waitlistMsgID, freeCarsMsgID,
            regularDriversMsgID, registerMsgID, deregisterMsgID, currentRaceLocation, lineupMsgID).then(async function(res){
            console.log(`New race in ${currentRaceLocation} inserted -- ${new Date().toLocaleString()}`)
        }, async function(err){
            console.log(`New race could not be inserted -- ${new Date().toLocaleString()} \n ${err}`)
        })
       
    }

    client.clearChannels = async (client) => {
        //Gets all the information
        let anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();
        let abmeldeChannelID = client.getAbmeldeChannelIDLigaFR();     
    
        await client.channels.cache.get(anmeldeChannelID).bulkDelete(100).then(() => {
            console.log(`Der Anmelde-Channel in ${client.getLigatitel()} wurde gecleart -- ${new Date().toLocaleString()}`)
        });
        await client.channels.cache.get(abmeldeChannelID).bulkDelete(100).then(() => {
            console.log(`Der Abmelde-Channel in ${client.getLigatitel()} wurde gecleart -- ${new Date().toLocaleString()}`)
        });
    }

    client.sendWaitlistMsg = async (client) => {
        let anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();;

        var returnValue = -1

         // Message for List of waiting drivers
        await client.channels.cache.get(anmeldeChannelID).send(`Warteliste:`).then((msg) => {
            returnValue =  msg.id;
        });    
        return returnValue      
    }

    client.sendFreeCarsMsg = async (client) => {
        let anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();

        var returnValue = -1

        // Message for List of free cars
        await client.channels.cache.get(anmeldeChannelID).send(`Freie Autos:`).then((msg) => {
            returnValue = msg.id;
        })    
        return returnValue
    }

    client.sendOpenMsg = async (client, currentRaceLocation) => { 
        //Gets all the information
        let ersatzfahrerRolleID = client.getAnmeldeChannelIDLigaFR();
        let anmeldeChannelID = client.getErsatzfahrerRolleIDLigaFR()
       
        await client.channels.cache.get(anmeldeChannelID).send(`<@&${ersatzfahrerRolleID}> die Anmeldung für das ` + 
                                                              `Ligarennen in ${currentRaceLocation} ist hiermit eröffnet!`).then(() => {
            console.log(`Die Anmeldung für ${client.getLigatitel()} in ${currentRaceLocation} wurde eröffnet. -- ${new Date().toLocaleString()}`);
        });
    }

    client.subDriverIn = async (client, driverObject) => {     
        var anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();     
        let subPersonList = new Array();
        let withdrawnDrivers = new Array();
        var currentRaceID = -1
       
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for all information for checkSubCanBeMade -- ${new Date().toLocaleString()}`)

            subPersonList = res[0].sub_person_list.split(',')
            withdrawnDrivers = res[0].withdrawn_drivers.split(',')
            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for all information for checkSubCanBeMade -- ${new Date().toLocaleString()} \n ${err}`)
        })
       

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
        await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [subInEmbed]}).then(() => {
            client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getLogChannelID()).send({ embeds : [subInEmbed]});
        });
        console.log(`${driverObject.username} hat sich erfolgreich angemeldet in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
        
        //Make changes global
        var subPersonListAsString = await client.convertArrayToString(subPersonList)
        var withdrawnDriversAsString = await client.convertArrayToString(withdrawnDrivers)
        await client.updateSubPersonList(subPersonListAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated subs list list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating free subs list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })
        await client.updateWithdrawnDrivers(withdrawnDriversAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated withdrawn drivers list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating withdrawn drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })     
       

        await client.checkSubCanBeMade(client, false, null, null, null);
    }
// HIER WEITERMACHEN

    client.regularDriverWithdraw = async (client, driverObject) => {
        //Get current info
        var abmeldeChannelID = client.getAbmeldeChannelIDLigaFR();
        var withdrawnDrivers = new Array();
        var currentRaceID = -1
        
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table to withdraw drivers -- ${new Date().toLocaleString()}`)

            withdrawnDrivers = res[0].free_cars.split(',')
            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table to withdraw drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
       
        //Do stuff
        withdrawnDrivers.push(driverObject.id);
        await client.addCarOfWithdrawnDriverToFreeCars(driverObject, client);
        await client.removeFromCurrentLineup(client, driverObject, null);
        let driverWithdrawnEmbed = new EmbedBuilder()
        .setColor('#ff4d4d')
        .setTitle('⬅️')
        .addFields(
            {name: `Update im Lineup`, value: `<@${driverObject.id}> ist diese Woche nicht dabei`}
        )
        await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(abmeldeChannelID).send({ embeds : [driverWithdrawnEmbed]}).then(() => {
            client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getLogChannelID()).send({ embeds : [driverWithdrawnEmbed]});
        });
        console.log(`${driverObject.username} hat sich erfolgreich abgemeldet in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`); 
        
        //Make changes global
        var withdrawnDriversAsString = await client.convertArrayToString(withdrawnDrivers)
        await client.updateWithdrawnDrivers(withdrawnDriversAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated withdrawn drivers list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating withdrawn drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })
       
        await client.checkSubCanBeMade(client, false, null, null, null);
    }

    client.subDriverRemoveSubInOnWaitlist = async (client, driverObject) => {
        //Get current info
        var anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();//
        var subPersonList = new Array();//
        var currentRaceID = -1;

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table to withdraw drivers -- ${new Date().toLocaleString()}`)

            subPersonList = res[0].sub_person_list.split(',')
            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table to withdraw drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        //Do stuff
        subPersonList.splice(subPersonList.indexOf(driverObject.id), 1); 
        let subInRemoveEmbed = new EmbedBuilder()
        .setColor('#ff4d4d')
        .setTitle('️️️️️️️️️️️️️️️↩')
        .addFields(
            {name: `Update im Lineup`, value: `<@${driverObject.id}> ist diese Woche doch nicht dabei`}
        );
        await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [subInRemoveEmbed]}).then(() => {
            client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getLogChannelID()).send({ embeds : [subInRemoveEmbed]});
        });
        console.log(`${driverObject.username} wurde erfolgreich von der Warteliste entfernt in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
        
        //Make changes global
        var subPersonListAsString = await client.convertArrayToString(subPersonList)
        await client.updateSubPersonList(subPersonListAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated sub person list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating sub person list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })    
        

        await client.checkSubCanBeMade(client, false, null, null, null);
    }

    client.subDriverRemoveSubInInLineup = async (client, driverObject) => {
        //Get current info
        var anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();//
        var freeCars = new Array()//
        var currentRaceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table to withdraw drivers -- ${new Date().toLocaleString()}`)

            freeCars = res[0].free_cars.split(',')
            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table to withdraw drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })
      
        //Do stuff
        var freeCar = await client.findCurrentCockpitOfSub(driverObject);
        freeCars.unshift(freeCar);
        await client.removeFromCurrentLineup(client, driverObject, freeCar);
        var subInRemoveEmbed = new EmbedBuilder()
        .setColor('#ff4d4d')
        .setTitle('️️️️️️️️️️️️️️️↩')
        .addFields(
            {name: `Update im Lineup`, value: `<@${driverObject.id}> ist diese Woche doch nicht dabei`}
        );
        await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [subInRemoveEmbed]}).then(() => {
            client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getLogChannelID()).send({ embeds : [subInRemoveEmbed]});
        });
        console.log(`${driverObject.nickname} wurde erfolgreich aus Lineup genommen in ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
        
        //Make changes global
        var freeCarsAsString = await client.convertArrayToString(freeCars)
        await client.updateFreeCarsList(freeCarsAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })  
        
        await client.checkSubCanBeMade(client, false, null, null, null);
    }

    client.regularDriverRemoveWithdraw = async (client, driverObject) => {
        //Get current info
        var anmeldeChannelID = await seasonData.getAnmeldeChannelIDLigaFR();
        var withdrawnDrivers = new Array();
        var reinstatedDrivers = new Array();
        var currentRaceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table to withdraw drivers -- ${new Date().toLocaleString()}`)

            withdrawnDrivers = res[0].withdrawn_drivers.split(',')
            reinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table to withdraw drivers -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        //Do stuff
        reinstatedDrivers.push(driverObject.id);
        withdrawnDrivers.splice(withdrawnDrivers.indexOf(driverObject.id), 1);
        let withdrawRemoveEmbed = new EmbedBuilder()
        .setColor('#4ef57b')
        .setTitle('️️️️️️️️↪')
        .addFields(
            {name: `Update`, value: `<@${driverObject.id}> ist diese Woche doch dabei`}
        );
        await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(anmeldeChannelID).send({ embeds : [withdrawRemoveEmbed]}).then(() => {
            client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getLogChannelID()).send({ embeds : [withdrawRemoveEmbed]});
        })
        console.log(`Die Abmeldung von ${driverObject.username} wurde erfolgreich zurückgenommen  ${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
        
        //Make changes global

        var reinstatedDriversAsString = await client.convertArrayToString(reinstatedDrivers)
        var withdrawnDriverAsString = await client.convertArrayToString(withdrawnDrivers)

        await client.updateWithdrawnDrivers(withdrawnDriverAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated withdrawn drivers list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating withdrawn drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })
        await client.updateReinstatedDrivers(reinstatedDriversAsString, currentRaceID).then(function(res){
            console.log(`Successfully updated reinstated drivers list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating reinstated drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })

        await client.checkSubCanBeMade(client, false, null, null, null);
    }

    client.sendTeams = async (client) => {

        var returnValue = -1

        // SQL Statement to get ID of teams msg id
        // Get msg from race before, if exists, if not return null
        await client.getLastRaceInDatabase().then(async function(currentRegularDriver){
            console.log(`Successfully got last entry in table -- ${new Date().toLocaleString()} \n  ${currentRegularDriver.length}`)

            mercedesDrivers = await client.getMercedesDrivers(client);
            redBullDrivers = await client.getRedBullDrivers(client);
            ferrariDrivers = await client.getFerrariDrivers(client);
            mcLarenDrivers = await client.getMcLarenDrivers(client);
            astonMartinDrivers = await client.getAstonMartinDrivers(client);
            alpineDrivers = await client.getAlpineDrivers(client);
            alphaTauriDrivers = await client.getAlphaTauriDrivers(client);
            alfaRomeoDrivers = await client.getAlfaRomeoDrivers(client);
            williamsDrivers = await client.getWilliamsDrivers(client);
            haasDrivers = await client.getHaasDrivers(client);

            let regularDriverEmbed = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle('️️️️️️️️Stammfahrer Liga Freitag')
            .addFields(
                {name: `Mercedes`, value: `<@${mercedesDrivers[0]}> und <@${mercedesDrivers[1]}>`},
                {name: `Red Bull`, value: `<@${redBullDrivers[0]}> und <@${redBullDrivers[1]}>`},
                {name: `Ferrari`, value: `<@${ferrariDrivers[0]}> und <@${ferrariDrivers[1]}>`},
                {name: `McLaren`, value: `<@${mcLarenDrivers[0]}> und <@${mcLarenDrivers[1]}>`},
                {name: `Aston Martin`, value: `<@${astonMartinDrivers[0]}> und <@${astonMartinDrivers[1]}>`},
                {name: `Alpine`, value: `<@${alpineDrivers[0]}> und <@${alpineDrivers[1]}>`},
                {name: `Alpha Tauri`, value: `<@${alphaTauriDrivers[0]}> und <@${alphaTauriDrivers[1]}>`},
                {name: `Alfa Romeo`, value: `<@${alfaRomeoDrivers[0]}> und <@${alfaRomeoDrivers[1]}>`},
                {name: `Williams`, value: `<@${williamsDrivers[0]}> und <@${williamsDrivers[1]}>`},
                {name: `Haas`, value: `<@${haasDrivers[0]}> und <@${haasDrivers[1]}>`}
            );
            
            

            if(currentRegularDriver.length > 0){
                console.log(currentRegularDriver[0].regular_drivers_msg_id)
                console.log('PIMMEL' + await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getTeamsChannelID()).messages.fetch(`${currentRegularDriver[0].regular_drivers_msg_id}`))
                await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getTeamsChannelID()).messages.fetch(`${currentRegularDriver[0].regular_drivers_msg_id}`).then((msg) => {
                    msg.edit({ embeds: [regularDriverEmbed] });
                    returnValue = msg.id;
                })
            } else {
                await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getTeamsChannelID()).send({ embeds : [regularDriverEmbed]}).then((msg) => {
                    console.log('HI')
                    returnValue = msg.id;
                })
                
            }
            
        }, async function(err){
            console.log(`Error getting last entry in table -- ${new Date().toLocaleString()} \n  ${err}`)
        })
        //Get current info
        console.log('PIMMEL: ' + returnValue)
        return returnValue
    }

    client.findCurrentCockpitOfSub = async (driverObject) => {
        //Get current info
        var currentLineup = await client.getCurrentLineup();        

        //Do stuff
        if(currentLineup.get('Mercedes').includes(driverObject.id)){
            return client.getMercedesRolleID();
        } else if(currentLineup.get('Red Bull').includes(driverObject.id)){
            return client.getRedBullRolleID();
        } else if(currentLineup.get('Ferrari').includes(driverObject.id)){
            return client.getFerrariRolleID();
        } else if(currentLineup.get('McLaren').includes(driverObject.id)){
            return client.getMcLarenRolleID();
        } else if(currentLineup.get('Aston Martin').includes(driverObject.id)){
            return client.getAstonMartinRolleID();
        } else if(currentLineup.get('Alpine').includes(driverObject.id)){
            return client.getAlpineRolleID();
        } else if(currentLineup.get('Alpha Tauri').includes(driverObject.id)){
            return client.getAlphaTauriRolleID();
        } else if(currentLineup.get('Alfa Romeo').includes(driverObject.id)){
            return client.getAlfaRomeoRolleID();
        } else if(currentLineup.get('Williams').includes(driverObject.id)){
            return client.getWilliamsRolleID();
        } else if(currentLineup.get('Haas').includes(driverObject.id)){
            return client.getHaasRolleID();
        } else {
            console.log(`WIR SIND DURCH GEFALLEN! findCurrentCockpitOfSub in ${client.getLigatitel()}`)
        }
    }

    client.checkDriverInLineup = async (driverID, client) => {
        //Get current info
        var currentLineup = await client.getCurrentLineup();

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

    client.sendRegisterMsg = async (client, currentRaceLocation) => {

        var anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();

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

        var returnValue = -1 

        await client.channels.cache.get(anmeldeChannelID).send({ embeds: [embedAnmeldung] }).then((msg) => {
           
            msg.react(client.getAnmeldeEmoji());
            returnValue = msg.id;
            
        });
        return returnValue 

    }

    client.sendDeregisterMsg = async (client, currentRaceLocation) => {

        var abmeldeChannelID = client.getAbmeldeChannelIDLigaFR();

        let embedAbmeldung = new EmbedBuilder()
        .setColor('#0064fd')
        .setTitle('Abmeldung für Stammfahrer')
        .setDescription(`Diese Nachricht ist NUR für die Stammfahrer relevant. Um euch abzumelden für das Ligarennen in ${currentRaceLocation} bitte mit dem ❌ reagieren, falls ihr ` +
                        `nicht könnt. Falls ihr doch könnt und mitfahren wollt, also eure Abmeldung wieder zurück ziehen wollt, entfernt einfach eure ` +
                        `Reaktion unter dieser Nachricht wieder. Ihr könnt euch NICHT im Anmelde-Channel wieder anmelden. Falls ihr nicht reagieren könnt, ` +
                        `könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch`)
        
        var returnValue = -1 

        await client.channels.cache.get(abmeldeChannelID).send({ embeds: [embedAbmeldung] }).then((msg) => {
           
            msg.react(client.getAbmeldeEmoji());
            returnValue = msg.id;
          
        });
        return returnValue
    }

    client.startFunction = async (client, message, timeTillClose, currentRaceLocation) => {
       
        //Init
        console.log('STARTFUNCTION')
        await client.createRaceInDatabase(currentRaceLocation, client);
        //Get information
        //Only check at begining
        
        anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();
        abmeldeChannelID = client.getAbmeldeChannelIDLigaFR();
        ersatzfahrerRolleID = client.getErsatzfahrerRolleIDLigaFR();
        stammfahrerRolleID = client.getStammfahrerRolleIDLigaFR();
      
        //Do stuff
       
        // get current race location
        var registerMsg = null
        // Register msg ID to init reaction collector
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last race entry in DB for register message -- ${new Date().toLocaleString()}`)
            registerMsg = await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getAnmeldeChannelIDLigaFR()).messages.fetch(`${res[0].register_msg_id}`)
        }, async function(err){
            console.log(`Error while getting last race entry in DB for register message -- ${new Date().toLocaleString()} \n ${err}`)
        })
        collectorSubIn = registerMsg.createReactionCollector({ dispose: true});
       
        // Same for deregister
        var deregisterMsg = null
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last race entry in DB for deregister message -- ${new Date().toLocaleString()}`)
            deregisterMsg = await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getAbmeldeChannelIDLigaFR()).messages.fetch(`${res[0].deregister_msg_id}`)
        }, async function(err){
            console.log(`Error while getting last race entry in DB for deregister message -- ${new Date().toLocaleString()} \n ${err}`)
        })
        collectorWithdraw = deregisterMsg.createReactionCollector({ dispose: true});
       
    
        // Hinzufügen von Rolle
        collectorSubIn.on('collect', async (reaction, user) => {
            //Get information
            //Check new for every reaction

            var anmeldungActive = true
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to check if registration is active -- ${new Date().toLocaleString()}`)
                if(res[0].registration_active == 0){
                    anmeldungActive = false;
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to check if registration is active -- ${new Date().toLocaleString()} \n ${err}`)
            })
                 
            var subDriverInPerCommand = new Array()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers subbed in per command -- ${new Date().toLocaleString()}`)
                if(res[0].sub_in_drivers_per_cmd.length > 0){
                    subDriverInPerCommand = res[0].sub_in_drivers_per_cmd.split(',');
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers subbed in per command -- ${new Date().toLocaleString()} \n ${err}`)
            })

            var reactedToSubIn = new Map()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers reacted to sub in -- ${new Date().toLocaleString()}`)
               
                client.convertStringToMap(res[0].reacted_to_sub_in)
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers reacted to sub in -- ${new Date().toLocaleString()} \n ${err}`)
            })       
           
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
                        console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${client.getLigatitel()} ` + 
                                    `-- ${new Date().toLocaleString()}`);
                    } else {
                        reactedToSubIn.set(user.id, reaction.id)

                        //await seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                        var IDofCurrentRaceEvent = -1
                        await client.getLastRaceInDatabase().then(async function(res){
                            console.log(`Successfully got last race entry in DB to get ID -- ${new Date().toLocaleString()}`)
                            IDofCurrentRaceEvent = res[0].race_id

                            var stringForDatabase = await client.convertMapToString(reactedToSubIn)

                            await client.setReactedToSubIn(stringForDatabase, IDofCurrentRaceEvent).then(async function(res){
                                console.log(`Successfully set reacted_to_sub_in to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                            `-- ${new Date().toLocaleString()}`)
                            }, async function(err){
                                console.log(`Error while setting reacted_to_sub_in to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                `-- ${new Date().toLocaleString()} \n ${err}`)
                            })

                        }, function(err){
                            console.log(`Error while getting last race entry in DB to get ID -- ${new Date().toLocaleString()} \n ${err}`)
                        })
                    }
                    

                    if(reaction.emoji.name === client.getAnmeldeEmoji() && !subDriverInPerCommand.includes(user.id) &&
                        reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleID)){                          
                            client.subDriverIn(client, reaction.message.guild.members.cache.get(user.id));
                    } else if(reaction.emoji.name != client.getAnmeldeEmoji()) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${client.getLigatitel()}-- ${date}`);
                    } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleID))) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich anzumelden, hat aber die Stammfahrer ` + 
                        `Rolle in ${client.getLigatitel()} nicht -- ${date}`);
                    } else {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl angemeldet in ${client.getLigatitel()} -- ${date}`);
                    }             
                }else{
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte sich abmelden, aber Anmeldung war schon beendet ${client.getLigatitel()} -- ${date}`);
                }
            
            }
        });
        // Abmeldevorgang
        collectorWithdraw.on('collect', async (reaction, user) => {
            //Get information
            //Check new for every reaction
            
            var anmeldungActive = true
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to check if registration is active -- ${new Date().toLocaleString()}`)
                if(res[0].registration_active == 0){
                    anmeldungActive = false;
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to check if registration is active -- ${new Date().toLocaleString()} \n ${err}`)
            })
                 
            var withdrawnDriversPerCommand = new Array()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers withdrawn per command -- ${new Date().toLocaleString()}`)
                if(res[0].withdrawn_drivers_per_cmd.length > 0){
                    withdrawnDriversPerCommand = res[0].withdrawn_drivers_per_cmd.split(',');
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers withdrawn per command -- ${new Date().toLocaleString()} \n ${err}`)
            })

            var reactedToSignOut = new Map()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers reacted to sign out -- ${new Date().toLocaleString()}`)
                reactedToSignOut = client.convertStringToMap(res[0].reacted_to_sign_out)
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers reacted to sign out -- ${new Date().toLocaleString()} \n ${err}`)
            })       
           
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
                    if(reaction.emoji.name === client.getAbmeldeEmoji() && !(withdrawnDriversPerCommand.includes(user.id)) &&
                        reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleID)){
                        //Local change 
                        
                        if(reactedToSubIn.has(user.id)){
                            let date = new Date().toLocaleString();
                            console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${client.getLigatitel()} -- ${date}`);
                        } else {
                            reactedToSubIn.set(user.id, reaction.id)

                            //await seasonData.setReactedToSignOutLigaFR(reactedToSubIn);
                            var IDofCurrentRaceEvent = -1
                            await client.getLastRaceInDatabase().then(async function(res){
                                console.log(`Successfully got last race entry in DB to get ID -- ${new Date().toLocaleString()}`)
                                IDofCurrentRaceEvent = res[0].race_id

                                var stringForDatabase = await client.convertMapToString(reactedToSubIn)

                                await client.setReactedToSignOut(stringForDatabase, IDofCurrentRaceEvent).then(async function(res){
                                    console.log(`Successfully set reacted_to_sign_out to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                                `-- ${new Date().toLocaleString()}`)
                                }, async function(err){
                                    console.log(`Error while setting reacted_to_sign_out to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                    `-- ${new Date().toLocaleString()} \n ${err}`)
                                })

                            }, function(err){
                                console.log(`Error while getting last race entry in DB to get ID -- ${new Date().toLocaleString()} \n ${err}`)
                            })
                           
                        }
                      
                        //Do stuff
                        client.regularDriverWithdraw(client, reaction.message.guild.members.cache.get(user.id));                          
                    } else if(reaction.emoji.name !== client.getAbmeldeEmoji()) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${client.getLigatitel()} -- ${date}`);
                    } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleID))) {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich abzumelden, hat aber die Stammfahrer ` + 
                        `Rolle in ${client.getLigatitel()} nicht -- ${date}`);
                    } else {
                        await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                        let date = new Date().toLocaleString();
                        console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl abgemeldet in ${client.getLigatitel()} -- ${date}`);
                    }
                } else {
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte sich abmelden, aber Anmeldung war schon beendet ${client.getLigatitel()} -- ${date}`);
                }
                
                                    
            }
        });
        
        // Entfernen von Rollen
        collectorSubIn.on('remove', async (reaction, user) => {
            //Get information
            //Check new for every reaction
            
            var anmeldungActive = true
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to check if registration is active -- ${new Date().toLocaleString()}`)
                if(res[0].registration_active == 0){
                    anmeldungActive = false;
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to check if registration is active -- ${new Date().toLocaleString()} \n ${err}`)
            })
                 
            var subDriverInPerCommand = new Array()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers subbed in per command -- ${new Date().toLocaleString()}`)
                if(res[0].sub_in_drivers_per_cmd.length > 0){
                    subDriverInPerCommand = res[0].sub_in_drivers_per_cmd.split(',');
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers subbed in per command -- ${new Date().toLocaleString()} \n ${err}`)
            })

            var reactedToSubIn = new Map()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers reacted to sub in -- ${new Date().toLocaleString()}`)
               
                reactedToSubIn = client.convertStringToMap(res[0].reacted_to_sub_in)
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers reacted to sub in -- ${new Date().toLocaleString()} \n ${err}`)
            })       
           
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
                        if(reaction.emoji.name == client.getAnmeldeEmoji()){
                            reactedToSubIn.delete(user.id);
                            
                            var IDofCurrentRaceEvent = -1
                            await client.getLastRaceInDatabase().then(async function(res){
                                console.log(`Successfully got last race entry in DB to get ID -- ${new Date().toLocaleString()}`)
                                IDofCurrentRaceEvent = res[0].race_id

                                var stringForDatabase = await client.convertMapToString(reactedToSubIn)

                                await client.setReactedToSubIn(stringForDatabase, IDofCurrentRaceEvent).then(async function(res){
                                    console.log(`Successfully set reacted_to_sub_in to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                                `-- ${new Date().toLocaleString()}`)
                                }, async function(err){
                                    console.log(`Error while setting reacted_to_sub_in to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                    `-- ${new Date().toLocaleString()} \n ${err}`)
                                })

                            }, function(err){
                                console.log(`Error while getting last race entry in DB to get ID -- ${new Date().toLocaleString()} \n ${err}`)
                            })
                           
                            // Checkt ob Fahrer mit Command abgemeldet wurde
                            if(subDriverInPerCommand.includes(user.id)){
                                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} wurde die Reaktion verweigert, da er per Command abgemeldet ist in ${client.getLigatitel()} -- ${date}`);
                            } else {    
                                // Fahrer ist noch auf Warteliste
                                if(subPersonList.includes(reaction.message.guild.members.cache.get(user.id).user.id)){
                                    client.subDriverRemoveSubInOnWaitlist(client, reaction.message.guild.members.cache.get(user.id));
                                }
                                // Fahrer ist nicht mehr auf Warteliste
                                else if(await client.checkDriverInLineup(user.id, client)) {
                                    client.subDriverRemoveSubInInLineup(client, reaction.message.guild.members.cache.get(user.id));
                                } else {
                                    let date = new Date().toLocaleString();
                                    console.log(`Der entfernte Fahrer war weder im Lineup noch auf der Warteliste in ${client.getLigatitel()} -- ${date}`)
                                }
                            }                  
                        } else {
                            await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                            let date = new Date().toLocaleString();
                            console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${client.getLigatitel()} -- ${date}`);              
                        }
                    } else {
                        let date = new Date().toLocaleString();
                        console.log(`Die Reaktion von ${user.username} wurde entfernt, allerdings hat er nicht die richtige Rolle gehabt in ${client.getLigatitel()} ` + 
                        `beim Entfernen -- ${date}`)
                    }
                } else {
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte seine Anmeldung entfernen, aber Anmeldung` + 
                    ` war schon beendet in ${client.getLigatitel()} -- ${date}`);
                }
            
                
            }
        });  
        // Entfernen von Abmeldung
        collectorWithdraw.on('remove', async (reaction, user) => {
            //Get information
            //Check new for every reaction
                     
            var anmeldungActive = true
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to check if registration is active -- ${new Date().toLocaleString()}`)
                if(res[0].registration_active == 0){
                    anmeldungActive = false;
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to check if registration is active -- ${new Date().toLocaleString()} \n ${err}`)
            })
                 
            var withdrawnDriversPerCommand = new Array()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers withdrawn per command -- ${new Date().toLocaleString()}`)
                if(res[0].withdrawn_drivers_per_cmd.length > 0){
                    withdrawnDriversPerCommand = res[0].withdrawn_drivers_per_cmd.split(',');
                }
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers withdrawn per command -- ${new Date().toLocaleString()} \n ${err}`)
            })

            var reactedToSignOut = new Map()
            await client.getLastRaceInDatabase().then(async function(res){
                console.log(`Successfully got last race entry in DB to get drivers reacted to sign out -- ${new Date().toLocaleString()}`)
                reactedToSignOut = client.convertStringToMap(res[0].reacted_to_sign_out)
            }, async function(err){
                console.log(`Error while getting last race entry in DB to get drivers reacted to sign out -- ${new Date().toLocaleString()} \n ${err}`)
            })                       
           
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
                        if(reaction.emoji.name == client.getAbmeldeEmoji()){
                            reactedToSignOut.delete(user.id);
                            
                            var IDofCurrentRaceEvent = -1
                            await client.getLastRaceInDatabase().then(async function(res){
                                console.log(`Successfully got last race entry in DB to get ID -- ${new Date().toLocaleString()}`)
                                IDofCurrentRaceEvent = res[0].race_id

                                var stringForDatabase = await client.convertMapToString(reactedToSubIn)

                                await client.setReactedToSignOut(stringForDatabase, IDofCurrentRaceEvent).then(async function(res){
                                    console.log(`Successfully set reacted_to_sign_out to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                                `-- ${new Date().toLocaleString()}`)
                                }, async function(err){
                                    console.log(`Error while setting reacted_to_sign_out to ${stringForDatabase} for event with race_id ${IDofCurrentRaceEvent} ` + 
                                    `-- ${new Date().toLocaleString()} \n ${err}`)
                                })

                            }, function(err){
                                console.log(`Error while getting last race entry in DB to get ID -- ${new Date().toLocaleString()} \n ${err}`)
                            })
                            
                            if(!(withdrawnDriversPerCommand.includes(user.id))){
                                client.regularDriverRemoveWithdraw(client, reaction.message.guild.members.cache.get(user.id));
                                let date = new Date();
                                console.log(`Die Reaktion von ${reaction.message.guild.members.cache.get(user.id).username} zum Abmelden wurde erfolgreich` + 
                                ` entfernt in ${client.getLigatitel()}. -- ${date}`);
                            } else {
                                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                                let date = new Date().toLocaleString();
                                console.log(`${user.username} wurde die Reaktion verweigert, da er schon per Command abgemeldet wurde in ${client.getLigatitel()} -- ${date}`);
                            }
                        }else {
                            await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                            let date = new Date().toLocaleString();
                            console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ${client.getLigatitel()} -- ${date}`);   
                        }      
                    } else {
                        let date = new Date().toLocaleString();
                        console.log(`Die Reaktion von ${user.username} wurde entfernt, allerdings hat er nicht die richtige Rolle gehabt in ${client.getLigatitel()} -- ${date}`)
                    }
                } else {
                    await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                    let date = new Date().toLocaleString();
                    console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte seine Anmeldung entfernen, aber Anmeldung` + 
                    ` war schon beendet in ${client.getLigatitel()} -- ${date}`);
                }
            
            }
        });
        var timeTillReminder = timeTillClose - (20 * 1000)
        setTimeout(() => client.reminderOpenCockpits(client), timeTillReminder)
        setTimeout(() => client.endFunction(client), timeTillClose)
    }

    client.endFunction = async (client, currentRaceLocation) => {
        //Get info
        var anmeldeChannelID = client.getAnmeldeChannelIDLigaFR();
        var abmeldeChannelID = client.getAbmeldeChannelIDLigaFR();
        var currentRaceID = -1
      
        //Do stuff
        await client.getLastRaceInDatabase().then(function(res){
            console.log(`Successfully got last entry in table for ID of current race -- ${new Date().toLocaleString()}`)

            currentRaceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for ID of current race -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        await client.updateRegistration(0, currentRaceID).then(function(res){
            console.log(`Successfully set registartion_active to false for event with race_id ${currentRaceID} ` + 
                         `-- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error setting registartion_active to false for event with race_id ${currentRaceID} ` + 
                         `-- ${new Date().toLocaleString()} \n ${err}`)
        })
       
        await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(anmeldeChannelID).send(`Die Anmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Anmeldung in ${client.getLigatitel()} wurde beendet`);
        })
        
        await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(abmeldeChannelID).send(`Die Abmeldung für das Rennen in ${currentRaceLocation} wurde beendet`).then(() => {
            console.log(`Die Abmeldung in ${client.getLigatitel()} wurde beendet`);
        })     
    }










    // HIER WEITERMACHEN












    client.reminderOpenCockpits = async (client) => {

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

    client.getMercedesDrivers = async (client) => {
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

    client.getRedBullDrivers = async (client) => {
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

    client.getFerrariDrivers = async (client) => {
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

    client.getMcLarenDrivers = async (client) => {
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

    client.getAstonMartinDrivers = async (client) => {
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

    client.getAlpineDrivers = async (client) => {
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

    client.getAlphaTauriDrivers = async (client) => {
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

    client.getAlfaRomeoDrivers = async (client) => {
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

    client.getWilliamsDrivers = async (client) => {
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

    client.getHaasDrivers = async (client) => {
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

    client.convertMapToString = async(mapToConvert) => {
        var stringToReturn = ''

        mapToConvert.forEach((value, key) => {
            stringToReturn.concat(`{${key}:${value}},`)
        })
        if(stringToReturn.length > 0){
            stringToReturn = stringToReturn.slice(0, -1)
        }
        
        return stringToReturn
    }

    client.convertStringToMap = async(stringToConvert) => {
        var mapToReturn = new Map()

        if(stringToConvert.length > 0){
            var reactedToSubInArray = stringToConvert.split(',');
            reactedToSubInArray.forEach((entry) => {
                var entryTrimmedEnd = entry.slice(0, -1);
                var entryTrimmedEndAndStart = entryTrimmedEnd.slice(1)
                var entryKeyValueArray = entryTrimmedEndAndStart.split(':')
                mapToReturn.set(entryKeyValueArray[0], entryKeyValueArray[1])
            })
        }

        return mapToReturn
    }

    client.convertArrayToString = async(arrayToConvert) => {
        var stringToReturn = '';

        arrayToConvert.forEach(entry => {
            stringToReturn.concat(`${entry},`)
        })
        stringToReturn = stringToReturn.slice(0, -1)

        return stringToReturn
    }
}
