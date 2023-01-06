const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forceremove_fr')
        .setDescription('Entfernt ein Fahrer aus dem Stammlineup')
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('Team aus welchem der Fahrer entfernt werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der forceremoveFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        await interaction.reply(`Entfernung wurde gestartet`);

        const roleGiven = interaction.options.getRole('role');
        // Get Array of regular drivers
        let currentTeamDrivers = new Array()
        if(roleGiven.name == 'Mercedes'){
            currentTeamDrivers = await client.getMercedesDrivers(client)
        } else if(roleGiven.name == 'Red Bull'){
            currentTeamDrivers = await client.getRedBullDrivers(client)
        } else if(roleGiven.name == 'Ferrari'){
            currentTeamDrivers = await client.getFerrariDrivers(client)
        } else if(roleGiven.name == 'McLaren'){
            currentTeamDrivers = await client.getMcLarenDrivers(client)
        } else if(roleGiven.name == 'Aston Martin'){
            currentTeamDrivers = await client.getAstonMartinDrivers(client)
        } else if(roleGiven.name == 'Alpine'){
            currentTeamDrivers = await client.getAlpineDrivers(client)
        } else if(roleGiven.name == 'Alpha Tauri'){
            currentTeamDrivers = await client.getAlphaTauriDrivers(client)
        } else if(roleGiven.name == 'Alfa Romeo'){   
            currentTeamDrivers = await client.getAlfaRomeoDrivers(client)
        } else if(roleGiven.name == 'Williams'){
            currentTeamDrivers = await client.getWilliamsDrivers(client)
        } else if(roleGiven.name == 'Haas'){
            currentTeamDrivers = await client.getHaasDrivers(client)
        }

        var currentLineup = await client.getCurrentLineup()

        var forceRemoveDriverEmbed = new EmbedBuilder()
            .setColor('#fff654')
            .setTitle('Bitte wähle den Fahrer aus')
            .setDescription(`Du hast Team <@&${roleGiven.id}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
                {name: 'Erster Fahrer', value: `1️⃣ - <@${currentTeamDrivers[0]}>`},
                {name: `Zweiter Fahrer`, value: `2️⃣ - <@${currentTeamDrivers[1]}>`},
                {name: 'Abbrechen', value: `${await client.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
            )

        var messageForceRemoveDriverLineup = await client.channels.cache.get(await client.getCommandChannelID()).send({ embeds: [forceRemoveDriverEmbed] });

        await messageForceRemoveDriverLineup.react('1️⃣');
        await messageForceRemoveDriverLineup.react('2️⃣');
        await messageForceRemoveDriverLineup.react(await client.getAbmeldeEmoji());

        const collectorConfirmSelectDriver = messageForceRemoveDriverLineup.createReactionCollector({ dispose: true });

        collectorConfirmSelectDriver.on('collect', async (reaction, user) => {
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
            /**
             * Fahrer 1
             */
            if(reaction.emoji.name == '1️⃣'){

                // Get driver to remove
                var driverToRemove = currentTeamDrivers[0];

                // Set new lineup
                if(currentLineup.get(roleGiven.name).includes(driverToRemove)){
                    currentLineup.get(roleGiven.name)[currentLineup.get(roleGiven.name).indexOf(`${driverToRemove}`)] = 'entfernt'
                }
                await client.setCurrentLineup(roleGiven, currentLineup)
                await client.printLineup(client)

                // SQL STATEMENT
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
                
                await client.updateRegularDriver(finalDateString, teamID, persID, ligaID).then(function(res){
                    console.log(`Successfully updated new regular driver -- ${new Date().toLocaleString()}`)
                }, function(err){
                    console.log(`Error updating new regular driver -- ${new Date().toLocaleString()} \n ${err}`)
                })

                await client.sendTeams(client);
               

                var futureRoleEmbed = new EmbedBuilder()
                    .setColor('#fff654')
                    .setTitle('Bitte wähle den Fahrer aus')
                    .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${roleGiven.id}> gewählt. Was macht der Fahrer in der Zukunft?`)
                    .addFields(
                        {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                        {name: 'Option 2', value: `2️⃣ - Stammfahrer Liga Sonntag 1`},
                        {name: 'Option 3', value: `3️⃣ - Stammfahrer Liga Sonntag 2`},
                        {name: 'Option 4', value: `4️⃣ - Stammfahrer Liga Samstag 1`},
                        {name: 'Option 5', value: `5️⃣ - Stammfahrer Liga Samstag 2`},
                        {name: 'Option 6', value: `6️⃣ - Nichts davon`},
                        {name: 'Abbrechen', value: `${await client.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
                    )

                var messageFutureRoleEmbed = await client.channels.cache.get(await client.getCommandChannelID()).send({ embeds: [futureRoleEmbed] });
                
                await messageFutureRoleEmbed.react('1️⃣');
                await messageFutureRoleEmbed.react('2️⃣');
                await messageFutureRoleEmbed.react('3️⃣');
                await messageFutureRoleEmbed.react('4️⃣');
                await messageFutureRoleEmbed.react('5️⃣');
                await messageFutureRoleEmbed.react('6️⃣');
                await messageFutureRoleEmbed.react(await client.getAbmeldeEmoji());

                const collectorConfirmFutureRoles = messageFutureRoleEmbed.createReactionCollector({ dispose: true});

                collectorConfirmFutureRoles.on('collect', async (reaction, user) => {
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
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ehemaliger Fahrer
                     * 
                     */
                    if(reaction.emoji.name == '1️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getEhemaligerFahrerRolleID());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                        let fahrerF1Role = await interaction.guild.roles.cache.find(async role => role.id === await client.getFahrerF1RolleID());
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.remove(fahrerF1Role);
                        await roleRemoveMember.roles.add(futureRole);
                    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ersatzfahrer SO 1
                     * 
                     */
                    else if(reaction.emoji.name == '2️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSO1());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer SO 2
                     * 
                     */
                    else if(reaction.emoji.name == '3️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSO2());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer SA 1
                     * 
                     */
                    else if(reaction.emoji.name == '4️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSA1());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Samstag 2
                     * 
                     */
                    else if(reaction.emoji.name == '5️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSA2());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Samstag 1
                     * 
                     */
                    else if(reaction.emoji.name == '6️⃣'){

                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => await role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);

                    }
                    /**
                     * 
                     * Vorgang abbrechen
                     * 
                     */
                    else if(reaction.emoji.name == await client.getAbmeldeEmoji()){
                        await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`)
                    } else {
                        await reaction.users.remove(user.id);
                    }

                })

            }
            /**
            * Fahrer 2
            */
            if(reaction.emoji.name == '2️⃣'){
                
                // Get driver to remove
                var driverToRemove = currentTeamDrivers[1];

                // Set new lineup
                if(currentLineup.get(roleGiven.name).includes(driverToRemove)){
                    currentLineup.get(roleGiven.name)[currentLineup.get(roleGiven.name).indexOf(`${driverToRemove}`)] = 'entfernt'
                }
                await client.setCurrentLineup(roleGiven, currentLineup)
                await client.printLineup(client)

                // SQL STATEMENT
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
                
                await client.updateRegularDriver(finalDateString, teamID, persID, ligaID).then(function(res){
                    console.log(`Successfully updated new regular driver -- ${new Date().toLocaleString()}`)
                }, function(err){
                    console.log(`Error updating new regular driver -- ${new Date().toLocaleString()} \n ${err}`)
                })

                await client.sendTeams(client);
               

                var futureRoleEmbed = new EmbedBuilder()
                    .setColor('#fff654')
                    .setTitle('Bitte wähle den Fahrer aus')
                    .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${roleGiven.id}> gewählt. Was macht der Fahrer in der Zukunft?`)
                    .addFields(
                        {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                        {name: 'Option 2', value: `2️⃣ - Stammfahrer Liga Sonntag 1`},
                        {name: 'Option 3', value: `3️⃣ - Stammfahrer Liga Sonntag 2`},
                        {name: 'Option 4', value: `4️⃣ - Stammfahrer Liga Samstag 1`},
                        {name: 'Option 5', value: `5️⃣ - Stammfahrer Liga Samstag 2`},
                        {name: 'Option 6', value: `6️⃣ - Nichts davon`},
                        {name: 'Abbrechen', value: `${await client.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
                    )

                var messageFutureRoleEmbed = await client.channels.cache.get(await client.getCommandChannelID()).send({ embeds: [futureRoleEmbed] });
                
                await messageFutureRoleEmbed.react('1️⃣');
                await messageFutureRoleEmbed.react('2️⃣');
                await messageFutureRoleEmbed.react('3️⃣');
                await messageFutureRoleEmbed.react('4️⃣');
                await messageFutureRoleEmbed.react('5️⃣');
                await messageFutureRoleEmbed.react('6️⃣');
                await messageFutureRoleEmbed.react(await client.getAbmeldeEmoji());

                const collectorConfirmFutureRoles = messageFutureRoleEmbed.createReactionCollector({ dispose: true});

                collectorConfirmFutureRoles.on('collect', async (reaction, user) => {
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
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ehemaliger Fahrer
                     * 
                     */
                     if(reaction.emoji.name == '1️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getEhemaligerFahrerRolleID());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                        let fahrerF1Role = await interaction.guild.roles.cache.find(async role => role.id === await client.getFahrerF1RolleID());
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.remove(fahrerF1Role);
                        await roleRemoveMember.roles.add(futureRole);
                    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ersatzfahrer SO 1
                     * 
                     */
                    else if(reaction.emoji.name == '2️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSO1());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Sonntag 2
                     * 
                     */
                    else if(reaction.emoji.name == '3️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSO2());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer SA 1
                     * 
                     */
                    else if(reaction.emoji.name == '4️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSA1());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Samstag 2
                     * 
                     */
                    else if(reaction.emoji.name == '5️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getErsatzfahrerRolleIDLigaSA2());
                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Samstag
                     * 
                     */
                    else if(reaction.emoji.name == '6️⃣'){

                        let regDriverRole = await interaction.guild.roles.cache.find(async role => role.id === await client.getStammfahrerRolleIDLigaFR());
                        let teamRole = await interaction.guild.roles.cache.find(async role => role.id === await roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);

                    }
                    /**
                     * 
                     * Vorgang abbrechen
                     * 
                     */
                    else if(reaction.emoji.name == await client.getAbmeldeEmoji()){
                        await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`)
                    } else {
                        await reaction.users.remove(user.id);
                    }
                })

            }
            /**
            * 
            * Vorgang abbrechen
            * 
            */
            else if(reaction.emoji.name == await client.getAbmeldeEmoji()){
                await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`)
            } else {
                await reaction.users.remove(user.id);
            }
        })

        
    }  
}