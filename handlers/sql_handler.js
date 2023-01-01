const mysql = require('mysql')

const connectionAdman = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'adman_dummy_daten'
});

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'db_irc_anmelde_test'
});

module.exports = (client) => {

    /**
     * Creates database for league the bot belongs to
     * 
     * @returns Promise
     */
    client.createBotDataBase = async () => {
        var promCreateBotDataBase = new Promise(function(resolve, reject){
            connection.query(`CREATE TABLE IF NOT EXISTS bot_sonntag_1(
                race_id INT NOT NULL AUTO_INCREMENT,
                sub_person_list MEDIUMTEXT,
                sub_person_list_reinstated_drivers MEDIUMTEXT,
                free_cars MEDIUMTEXT,
                withdrawn_drivers MEDIUMTEXT,
                withdrawn_drivers_per_cmd MEDIUMTEXT,
                sub_in_drivers_per_cmd MEDIUMTEXT,
                race_location MEDIUMTEXT,
                reacted_to_sub_in MEDIUMTEXT,
                reacted_to_sign_out MEDIUMTEXT,
                current_drivers_mercedes MEDIUMTEXT,
                current_drivers_rb MEDIUMTEXT,
                current_drivers_ferrari MEDIUMTEXT,
                current_drivers_mclaren MEDIUMTEXT,
                current_drivers_aston_martin MEDIUMTEXT,
                current_drivers_alpine MEDIUMTEXT,
                current_drivers_alpha_tauri MEDIUMTEXT,
                current_drivers_alfa_romeo MEDIUMTEXT,
                current_drivers_williams MEDIUMTEXT,
                current_drivers_haas MEDIUMTEXT,
                free_car_msg_id MEDIUMTEXT,
                waitlist_msg_id MEDIUMTEXT,
                regular_drivers_msg_id MEDIUMTEXT,
                register_msg_id MEDIUMTEXT,
                deregister_msg_id MEDIUMTEXT,
                lineup_msg_id MEDIUMTEXT,
                registration_active BOOL,
                PRIMARY KEY(race_id)
                )`, function(error, result, fields) {
                    if(error){
                        reject(error)
                    }else{
                        resolve(result)
                    }
                }
            )
        })
        return promCreateBotDataBase
    }

    /**
     * Establishes connection to database for the Bot
     * 
     * @returns Promise
     */
    client.connectToBotDatabase = async () => {
        var promConnectToBotDataBase = new Promise(function(resolve, reject){
            connection.connect(error => {
                if(error){
                  reject(error)
                } else {
                  resolve('Done')
                }
              });
        })
        return promConnectToBotDataBase
    } 

    /**
     * Creates table storing all the IDs for the leagues
     * 
     * @returns Promise
     */
    client.createLeagueIdsTable = async () => {
        var promCreateLeagueIDsTable = new Promise(function(resolve, reject){
            connection.query(`CREATE TABLE IF NOT EXISTS league_ids (
                league_id INT NOT NULL,
                name VARCHAR(255),
                PRIMARY KEY (league_id)
                )`, function(error, result, fields) {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
        return promCreateLeagueIDsTable
    }

    /**
     * Establishes connection to league database 
     * 
     * @returns Promise
     */
    client.connectToLeagueDB = async () => {
        var promConnectToLeagueDatabase = new Promise(function(resolve, reject){
            connectionAdman.connect(async error => {
                if(error){
                    reject(error)
                } else {
                    resolve(`Connection established`)
                }
            })
        })
        return promConnectToLeagueDatabase
    }

    /**
     * Result are all the leagues from the table storing all league IDs
     * 
     * @returns Promise
     */
    client.getLeagues = async () => {
        var promGetLeagues = new Promise(function(resolve, reject){
            connection.query(`SELECT * FROM league_ids`, function(err, res, fields) {
                if(err){
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        })
        return promGetLeagues
    }

    /**
     * Deletes league from table with league IDs if league already exists
     * 
     * @param {Array} tempLeagueIDsWithSameName 
     * @returns Promise
     */
    client.deleteDuplicateLeagues = async (tempLeagueIDsWithSameName) => {
        var promDeleteLeagues = new Promise(function(resolve, reject){
            tempLeagueIDsWithSameName.forEach(async id => {
                connection.query(`DELETE FROM league_ids WHERE league_id = ${id}`, async function(err, res, fields){
                    if(err){
                        reject(err)
                    } else {
                        resolve(res);
                    }
                })
            })
        })
        return promDeleteLeagues
    }

    /**
     * Inserts new league in table with all league IDs
     * 
     * @param {Integer} leagueID 
     * @returns Promise
     */
    client.insertNewLeague = async (leagueID) => {
        var promInsertNewLeague = new Promise(function(resolve, reject){
            connection.query(`INSERT INTO league_ids (league_id, name) VALUES (${leagueID}, 'Sonntag 1')`, function(err, res, fields){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        return promInsertNewLeague
    }

    /**
     * Result are all races from the league
     * 
     * @param {Integer} leagueID 
     * @returns Promise
     */
    client.getRaces = async (leagueID) => {
        var promGetRaces =  new Promise(function(resolve, reject) {
            connectionAdman.query(`SELECT * FROM rennen WHERE lid = ${leagueID}`, function(err, res, fields){
                if(err){
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
        return promGetRaces
    }

    /**
     * Result is the name of all the races in the calendar
     * 
     * @param {Array} calendarSortedByDate 
     * @returns Promise
     */
    client.getNamesOfRaces = async (calendarSortedByDate) => {
        var promGetNamesOfRaces = new Promise(function (resolve, reject){
            var racesNames = new Map()
            calendarSortedByDate.forEach(async element => {
                connectionAdman.query(`SELECT * FROM austragungsort WHERE ausid = ${element.ausid}`, async function(err, res){
                    if(err){
                        reject(err)
                    } else {
                        racesNames.set(res[0], element.datum)
                    }
                })
            })

            setTimeout(function(){
                console.log('SEARCHING FOR NAMES')
                resolve(racesNames);
            }, 2000);
        })
        return promGetNamesOfRaces
    }

    /**
     * Result is the ID of the given league
     * 
     * @param {String} liganame 
     * @returns Promise
     */
    client.getLeagueID = async (liganame) => {
        var promGetLeagueID = new Promise(function (resolve, reject){
            connection.query(`SELECT league_id FROM league_ids WHERE name = '${liganame}'`, async function(err, res){
                if(err){
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        })
        return promGetLeagueID
    }

    /**
     * Result is ID of a given team
     * 
     * @param {String} teamname 
     * @returns Promise
     */
    client.getTeamID = async (teamname) => {
        var promGetTeamID = new Promise(function(resolve, reject){
            connectionAdman.query(`SELECT id FROM team WHERE name = '${teamname}'`, async function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        return promGetTeamID
    }

    /**
     * Result are all drivers from the league in the given team
     * 
     * @param {Integer} leagueID 
     * @param {Integer} teamID 
     * @returns Promise
     */
    client.getTeamDrivers = async (leagueID, teamID) => {
        var promGetTeamDrivers = new Promise(function(resolve, reject){
            connectionAdman.query(`SELECT * FROM ligateamfahrer WHERE ligaid = ${leagueID} AND tid = '${teamID}' AND fahrerrolle = 'Stammfahrer'`, async function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        return promGetTeamDrivers
    }

    /**
     * Result are Discord IDs from drivers in the cockpit of the given team
     * 
     * @param {Integer} teamDriversPersID 
     * @param {Integer} teamDriversDcID 
     * @returns Promise
     */
    client.getDiscordIDs = async (teamDriversPersID, teamDriversDcID) => {
        var promGetDcIDs = new Promise(function(resolve, reject){
            teamDriversPersID.forEach(persID => {
                connectionAdman.query(`SELECT dcid FROM person WHERE id = ${persID}`, function(err, res){
                    if(err){
                        reject(err)
                    } else {
                        teamDriversDcID.push(res[0].dcid)
                    }
                })
            })
            setTimeout(function(){
                console.log('SEARCHING FOR IDS')
                resolve(teamDriversDcID);
            }, 2000); 
            
        })
        return promGetDcIDs
    }

    client.insertNewRace = async (mercedesDrivers, redBullDrivers, ferrariDrivers, mcLarenDrivers, astonMartinDrivers, alpineDrivers, alphaTauriDrivers, alfaRomeoDrivers, 
                                    williamsDrivers, haasDrivers, waitlistMsgID, freeCarsMsgID, regularDriversMsgID, registerMsgID, deregisterMsgID, raceLocation, lineupMsgID) => {
        console.log('CRASHPOINT 1')
        var promInsertNewRace = new Promise(function(resolve, reject){
            console.log('CRASHPOINT 2')
            connection.query(`INSERT INTO bot_sonntag_1 (sub_person_list, sub_person_list_reinstated_drivers, free_cars, withdrawn_drivers,
                            withdrawn_drivers_per_cmd, sub_in_drivers_per_cmd, race_location, reacted_to_sub_in, reacted_to_sign_out, 
                            current_drivers_mercedes, current_drivers_rb, current_drivers_ferrari, current_drivers_mclaren, 
                            current_drivers_aston_martin, current_drivers_alpine, current_drivers_alpha_tauri, current_drivers_alfa_romeo,
                            current_drivers_williams, current_drivers_haas, free_car_msg_id, waitlist_msg_id, regular_drivers_msg_id,
                            register_msg_id, deregister_msg_id, lineup_msg_id, registration_active) VALUES ('', '', '', '', '', '', '${raceLocation}', '', '', '${mercedesDrivers}',
                            '${redBullDrivers}', '${ferrariDrivers}', '${mcLarenDrivers}', '${astonMartinDrivers}', '${alpineDrivers}', 
                            '${alphaTauriDrivers}', '${alfaRomeoDrivers}', '${williamsDrivers}', '${haasDrivers}', '${freeCarsMsgID}', '${waitlistMsgID}',
                            '${regularDriversMsgID}', '${registerMsgID}', '${deregisterMsgID}', '${lineupMsgID}', 1)`, function(err, res){
                console.log('CRASHPOINT 3')
                if(err){
                    reject(err)
                } else {
                    console.log('CRASHPOINT 4')
                    resolve(res)
                    console.log('CRASHPOINT 5')
                }
            })
        })

        return promInsertNewRace
    }

    client.getLastRaceInDatabase = async() => {
        var promGetTeamsMsgID = new Promise(function(resolve, reject){
            connection.query(`SELECT * FROM bot_sonntag_1 ORDER BY race_id DESC LIMIT 1`, function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        return promGetTeamsMsgID
    }

    client.setReactedToSubIn = async(reactedToSubInString, raceID) => {
        var promSetReactedToSubIn = new Promise(function(resolve, reject){
            connection.query(`UPDATE bot_sonntag_1 SET reacted_to_sub_in = '${reactedToSubInString}' WHERE race_id = ${raceID}`, function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        return promSetReactedToSubIn
    }

    client.setReactedToSignOut = async(reactedToSubInString, raceID) => {
        var promSetReactedToSignOut = new Promise(function(resolve, reject){
            connection.query(`UPDATE bot_sonntag_1 SET reacted_to_sign_out = '${reactedToSubInString}' WHERE race_id = ${raceID}`, function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
        return promSetReactedToSignOut
    }

    client.updateCurrentDriversInDatabase = async(field, value, raceID) => {
        var promUpdateCurrentDriversInDatabase = new Promise(function(resolve, reject){
            connection.query(`UPDATE bot_sonntag_1 SET ${field} = '${value}' WHERE race_id = ${raceID}`), function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            }
        })
        return promUpdateCurrentDriversInDatabase
    }

    client.updateCurrentLineupMsg = async (msgID, raceID) => {
        var promUpdateCurrentLineupMsg = new Promise(function(resolve, reject){
            connection.query(`UPDATE bot_sonntag_1 SET lineup_msg_id = '${msgID}' WHERE race_id = ${raceID}`), function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            }
        })
        return promUpdateCurrentLineupMsg
    }

    client.updateFreeCarsList = async (listOfCars, raceID) => {
        var promUpdateFreeCarsList = new Promise(function(resolve, reject){
            connection.query(`UPDATE bot_sonntag_1 SET free_cars = '${listOfCars}' WHERE race_id = ${raceID}`), function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            }
        })
        return promUpdateFreeCarsList
    }

    client.updateSubPersonList = async (listOfSubsReady, raceID) => {
        var promUpdateSubPersonList = new Promise(function(resolve, reject){
            connection.query(`UPDATE bot_sonntag_1 SET sub_person_list = '${listOfSubsReady}' WHERE race_id = ${raceID}`), function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            }
        })
        return promUpdateSubPersonList
    }

    client.updateWithdrawnDrivers = async (listOfDriversWithdrawn, raceID) => {
        var promUpdateWithdrawnDrivers = new Promise(function(resolve, reject){
            connection.query(`UPDATE bot_sonntag_1 SET withdrawn_drivers = '${listOfDriversWithdrawn}' WHERE race_id = ${raceID}`), function(err, res){
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            }
        })
        return promUpdateWithdrawnDrivers
    }

}