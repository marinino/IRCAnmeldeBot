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
                race_id INT NOT NULL,
                sub_person_list MEDIUMTEXT,
                sub_person_list_reinstated_drivers MEDIUMTEXT,
                free_cars MEDIUMTEXT,
                withdrawn_drivers MEDIUMTEXT,
                withdrawn_drivers_per_cmd MEDIUMTEXT,
                sub_in_drivers_per_cmd MEDIUMTEXT,
                race_location MEDIUMTEXT,
                reacted_to_sub_in MEDIUMTEXT,
                reacted_to_sign_out MEDIUMTEXT,
                regular_drivers_mercedes MEDIUMTEXT,
                regular_drivers_rb MEDIUMTEXT,
                regular_drivers_ferrari MEDIUMTEXT,
                regular_drivers_mclaren MEDIUMTEXT,
                regular_drivers_aston_martin MEDIUMTEXT,
                regular_drivers_alpine MEDIUMTEXT,
                regular_drivers_alpha_tauri MEDIUMTEXT,
                regular_drivers_alfa_romeo MEDIUMTEXT,
                regular_drivers_williams MEDIUMTEXT,
                regular_drivers_haas MEDIUMTEXT,
                current_lineup MEDIUMTEXT,
                regular_drivers MEDIUMTEXT,
                free_car_msg_id BIGINT,
                waitlist_msg_id BIGINT,
                regular_drivers_msg_id BIGINT,
                register_msg_id BIGINT,
                deregister_msg_id BIGINT,
                registration_active BOOL DEFAULT 0,
                season_active BOOL DEFAULT 0,
                past_race_locations MEDIUMTEXT,
                future_race_locations MEDIUMTEXT,
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
            var racesNames = new Array()
            calendarSortedByDate.forEach(async element => {
                connectionAdman.query(`SELECT * FROM austragungsort WHERE ausid = ${element.ausid}`, async function(err, res){
                    if(err){
                        reject(err)
                    } else {
                        racesNames.push(res)
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
        var promGetDcIDs = new Promise(function(reject, resolve){
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

}