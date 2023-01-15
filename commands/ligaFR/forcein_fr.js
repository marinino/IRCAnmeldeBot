const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcein_fr')
        .setDescription('Belegt ein Cockpit welches vorher gecleart wurde')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Driver welcher eingesetzt werden soll')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('team')
                .setDescription('Team welches den offenen Platz hat')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der forceinFR Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        interaction.reply(`Ersetzten wurde gestartet`);

        const driverInUser = interaction.options.getUser('driver');
        const driverIn = interaction.guild.members.cache.get(driverInUser.id)
        const teamRole = interaction.options.getRole('team');
        var tempLineup = await client.getCurrentLineup();
        var tempSubPersonList = new Array();
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for forcein command -- ${new Date().toLocaleString()}`)
            if(res[0].sub_person_list.length > 0){
                tempSubPersonList = res[0].sub_person_list.split(',')
            }
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for forcein command -- ${new Date().toLocaleString()} \n ${err}`)
        })
     

        if(!(driverIn.roles.cache.has(await client.getErsatzfahrerRolleIDLigaFR()))){
            interaction.channel.send(`Fahrer braucht Ersatzfahrerrolle von Liga SA 1`);
            console.log(`${driverInUser.username} hat nicht die Ersatzfahrerolle für Liga FR -- ${new Date().toLocaleString()}`)
            return;
        }

        if(tempLineup.get(teamRole.name)[0] != 'entfernt' && tempLineup.get(teamRole.name)[1] != 'entfernt'){
            interaction.channel.send(`Falsches Team wurde übergeben`);
            console.log(`${teamRole.name} hat kein entferntes Cockpit in Liga FR -- ${new Date().toLocaleString()}`)
            return;
        }

        if(tempLineup.get(teamRole.name)[0] == 'entfernt'){
            
            let subInRole = await interaction.guild.roles.cache.find(role => role.id === client.getErsatzfahrerRolleIDLigaFR());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === client.getStammfahrerRolleIDLigaFR());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);

                var subPersonListAsString = await client.convertArrayToString(tempSubPersonList)
                await client.updateSubPersonList(subPersonListAsString, raceID).then(function(res){
                    console.log(`Successfully updated sub person list in database -- ${new Date().toLocaleString()}`)
                }, function(err){
                    console.log(`Error updating sub person list in database -- ${new Date().toLocaleString()} \n ${err}`)
                })
            }

            await client.checkSubCanBeMade(client, true, 0, driverIn.id, teamRole.name);

            //SQL STATEMENT
            var teamID = -1
            var ligaID = -1
            var persID = -1

            await client.getTeamID(teamRole.name).then(function(res){
                console.log(`Successfully got teamID of team ${teamRole.name} -- ${new Date().toLocaleString()}`)

                teamID = res[0].id
            }, function(err){
                console.log(`Error getting teamID of team ${teamRole.name} -- ${new Date().toLocaleString()} \n ${err}`)
            })

            await client.getPersID(driverIn.id).then(function(res){
                console.log(`Successfully got persID of ${driverIn.user.username} -- ${new Date().toLocaleString()} \n ${res[0]}`)

                persID = res[0].id
            }, function(err){
                console.log(`Error getting teamID of ${teamRole.name} -- ${new Date().toLocaleString()} \n ${err}`)
            })

            await client.getLigaID(await client.getLigatitel()).then(async function(res){
                console.log(`Successfully got ligaID of ${await client.getLigatitel()} -- ${new Date().toLocaleString()}`)

                ligaID = res[0].league_id
            }, async function(err){
                console.log(`Error getting ligaID of team ${await client.getLigatitel()} -- ${new Date().toLocaleString()} \n ${err}`)
            })

            var dateGueltigAb = new Date()
            var dateGueltigAbYear = dateGueltigAb.getFullYear()
            var dateGueltigAbMonth = dateGueltigAb.getMonth() + 1
            var dateGueltigAbMonthFormatted = -1
            if(dateGueltigAbMonth < 10){
                dateGueltigAbMonthFormatted = dateGueltigAbMonth.toString().padStart(2, '0')
            } else {
                dateGueltigAbMonthFormatted = dateGueltigAbMonth
            }
            var dateGueltigAbDay = dateGueltigAb.getDay() + 1
            var dateGueltigAbDayFormatted = -1
            if(dateGueltigAbDay < 10){
                dateGueltigAbDayFormatted = dateGueltigAbDay.toString().padStart(2, '0')
            } else {
                dateGueltigAbDayFormatted = dateGueltigAbDay
            }
            var dateGueltigAbHours = dateGueltigAb.getHours()
            var dateGueltigAbHoursFormatted = -1
            if(dateGueltigAbHours < 10){
                dateGueltigAbHoursFormatted = dateGueltigAbHours.toString().padStart(2, '0')
            } else {
                dateGueltigAbHoursFormatted = dateGueltigAbHours
            }
            var dateGueltigAbMinutes = dateGueltigAb.getMinutes()
            var dateGueltigAbMinutesFormatted = -1
            if(dateGueltigAbMinutes < 10){
                dateGueltigAbMinutesFormatted = dateGueltigAbMinutes.toString().padStart(2, '0')
            } else {
                dateGueltigAbMinutesFormatted = dateGueltigAbMinutes
            }
            var dateGueltigAbSeconds = dateGueltigAb.getSeconds()
            var dateGueltigAbSecondsFormatted = -1
            if(dateGueltigAbSeconds < 10){
                dateGueltigAbSecondsFormatted = dateGueltigAbSeconds.toString().padStart(2, '0')
            } else {
                dateGueltigAbSecondsFormatted = dateGueltigAbSeconds
            } 

            var finalDateString = `${dateGueltigAbYear}-${dateGueltigAbMonthFormatted}-${dateGueltigAbDayFormatted} `+
                                    `${dateGueltigAbHoursFormatted}:${dateGueltigAbMinutesFormatted}:${dateGueltigAbSecondsFormatted}`

            await client.insertNewRegularDriver(dateGueltigAb, teamID, persID, ligaID).then(function(res){
                console.log(`Successfully inserted new regular driver -- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error inserting new regular driver -- ${new Date().toLocaleString()} \n ${err}`)
            })

            await client.sendTeams(client);
        } else if(tempLineup.get(teamRole.name)[1] == 'entfernt'){
            

            let subInRole = await interaction.guild.roles.cache.find(role => role.id === client.getErsatzfahrerRolleIDLigaFR());
            let regularDriverRole = await interaction.guild.roles.cache.find(role => role.id === client.getStammfahrerRolleIDLigaFR());

            driverIn.roles.remove(subInRole);
            driverIn.roles.add(regularDriverRole);
            driverIn.roles.add(teamRole);

            if(tempSubPersonList.includes(driverIn.id)){
                tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1);

                var subPersonListAsString = await client.convertArrayToString(tempSubPersonList)
                await client.updateSubPersonList(subPersonListAsString, raceID).then(function(res){
                    console.log(`Successfully updated sub person list in database -- ${new Date().toLocaleString()}`)
                }, function(err){
                    console.log(`Error updating sub person list in database -- ${new Date().toLocaleString()} \n ${err}`)
                })
            }
            
            await client.checkSubCanBeMade(client, true, 1, driverIn.id, teamRole.name);

            //SQL STATEMENT
            var teamID = -1
            var ligaID = -1
            var persID = -1


           var dateGueltigAb = new Date()
            /**
             *   
            var dateGueltigAbYear = dateGueltigAb.getFullYear()
            var dateGueltigAbMonth = dateGueltigAb.getMonth() + 1
            var dateGueltigAbMonthFormatted = -1
            if(dateGueltigAbMonth < 10){
                dateGueltigAbMonthFormatted = dateGueltigAbMonth.toString().padStart(2, '0')
            } else {
                dateGueltigAbMonthFormatted = dateGueltigAbMonth
            }
            var dateGueltigAbDay = dateGueltigAb.getDay() + 1
            var dateGueltigAbDayFormatted = -1
            if(dateGueltigAbDay < 10){
                dateGueltigAbDayFormatted = dateGueltigAbDay.toString().padStart(2, '0')
            } else {
                dateGueltigAbDayFormatted = dateGueltigAbDay
            }
            var dateGueltigAbHours = dateGueltigAb.getHours()
            var dateGueltigAbHoursFormatted = -1
            if(dateGueltigAbHours < 10){
                dateGueltigAbHoursFormatted = dateGueltigAbHours.toString().padStart(2, '0')
            } else {
                dateGueltigAbHoursFormatted = dateGueltigAbHours
            }
            var dateGueltigAbMinutes = dateGueltigAb.getMinutes()
            var dateGueltigAbMinutesFormatted = -1
            if(dateGueltigAbMinutes < 10){
                dateGueltigAbMinutesFormatted = dateGueltigAbMinutes.toString().padStart(2, '0')
            } else {
                dateGueltigAbMinutesFormatted = dateGueltigAbMinutes
            }
            var dateGueltigAbSeconds = dateGueltigAb.getSeconds()
            var dateGueltigAbSecondsFormatted = -1
            if(dateGueltigAbSeconds < 10){
                dateGueltigAbSecondsFormatted = dateGueltigAbSeconds.toString().padStart(2, '0')
            } else {
                dateGueltigAbSecondsFormatted = dateGueltigAbSeconds
            } 

            var finalDateString = `${dateGueltigAbYear}-${dateGueltigAbMonthFormatted}-${dateGueltigAbDayFormatted} `+
                                    `${dateGueltigAbHoursFormatted}:${dateGueltigAbMinutesFormatted}:${dateGueltigAbSecondsFormatted}`
             */

            await client.getTeamID(teamRole.name).then(function(res){
                console.log(`Successfully got teamID of team ${teamRole.name} -- ${new Date().toLocaleString()}`)

                teamID = res[0].id
            }, function(err){
                console.log(`Error getting teamID of team ${teamRole.name} -- ${new Date().toLocaleString()} \n ${err}`)
            })

            await client.getPersID(driverIn.id).then(function(res){
                console.log(`Successfully got persID of ${driverIn.username} -- ${new Date().toLocaleString()}`)

                persID = res[0].id
            }, function(err){
                console.log(`Error getting teamID of ${teamRole.name} -- ${new Date().toLocaleString()} \n ${err}`)
            })

            await client.getLigaID(await client.getLigatitel()).then(async function(res){
                console.log(`Successfully got ligaID of ${await client.getLigatitel()} -- ${new Date().toLocaleString()}`)

                ligaID = res[0].id
            }, async function(err){
                console.log(`Error getting ligaID of team ${await client.getLigatitel()} -- ${new Date().toLocaleString()} \n ${err}`)
            })

          

            await client.insertNewRegularDriver(dateGueltigAb, teamID, persID, ligaID).then(function(res){
                console.log(`Successfully inserted new regular driver -- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error inserting new regular driver -- ${new Date().toLocaleString()} \n ${err}`)
            })

            await client.sendTeams(client);
        }      
    }  
}