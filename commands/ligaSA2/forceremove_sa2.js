const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const CurrentSeason = require('./startseasonliga_sa2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forceremove_sa2')
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
            console.log(`Der forceremoveSA2 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply(`Entfernung wurde gestartet`);

        const roleGiven = interaction.options.getRole('role');
        const roleName = roleGiven.name
        // Get Array of regular drivers
        let tempTeamDrivers = new Array()
        if(roleName == `Mercedes`){
            tempTeamDrivers = CurrentSeason.seasonData.getMercedesDriversLigaSA2();
        } else if(roleName == `Red Bull`){
            tempTeamDrivers = CurrentSeason.seasonData.getRedBullDriversLigaSA2();
        } else if(roleName == `Ferrari`){
            tempTeamDrivers = CurrentSeason.seasonData.getFerrariDriversLigaSA2();
        } else if(roleName == `McLaren`){
            tempTeamDrivers = CurrentSeason.seasonData.getMcLarenDriversLigaSA2();
        } else if(roleName == `Aston Martin`){
            tempTeamDrivers = CurrentSeason.seasonData.getAstonMartinDriversLigaSA2();
        } else if(roleName == `Alpine`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlpineDriversLigaSA2();
        } else if(roleName == `Alpha Tauri`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlphaTauriDriversLigaSA2();
        } else if(roleName == `Alfa Romeo`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlfaRomeoDriversLigaSA2();
        } else if(roleName == `Williams`){
            tempTeamDrivers = CurrentSeason.seasonData.getWilliamsDriversLigaSA2();
        } else if(roleName == `Haas`){
            tempTeamDrivers = CurrentSeason.seasonData.getHaasDriversLigaSA2();
        }

        var tempLineup = CurrentSeason.seasonData.getCurrentLineupLigaSA2();

        var forceRemoveDriverEmbed = new MessageEmbed()
            .setColor('#ff7272')
            .setTitle('Bitte wähle den Fahrer aus')
            .setDescription(`Du hast Team <@&${roleGiven.id}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
                {name: 'Erster Fahrer', value: `1️⃣ - <@${tempLineup.get(`${roleName}`)[0]}>`},
                {name: `Zweiter Fahrer`, value: `2️⃣ - <@${tempLineup.get(`${roleName}`)[1]}>`},
                {name: 'Abbrechen', value: `${CurrentSeason.seasonData.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
            )

        var messageForceRemoveDriverLineup = await client.channels.cache.get(CurrentSeason.seasonData.getCommandChannelID()).send({ embeds: [forceRemoveDriverEmbed] });

        await messageForceRemoveDriverLineup.react('1️⃣');
        await messageForceRemoveDriverLineup.react('2️⃣');
        await messageForceRemoveDriverLineup.react(CurrentSeason.seasonData.getAbmeldeEmoji());

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
                var driverToRemove = tempLineup.get(roleName)[0];

                // Set new lineup
                tempTeamDrivers[0] = 'entfernt';
                await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);
                tempLineup.get(roleName)[0] = 'entfernt';
                CurrentSeason.seasonData.setCurrentLineupLigaS2(tempLineup)
                // Stammlineup ändern
                await CurrentSeason.methodStorage.printLineup(client, CurrentSeason.seasonData);

                var futureRoleEmbed = new MessageEmbed()
                    .setColor('#ff7272')
                    .setTitle('Bitte wähle den Fahrer aus')
                    .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${roleGiven.id}> gewählt. Was macht der Fahrer in der Zukunft?`)
                    .addFields(
                        {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                        {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                        {name: 'Option 3', value: `3️⃣ - Stammfahrer Liga Sonntag 1`},
                        {name: 'Option 4', value: `4️⃣ - Stammfahrer Liga Samstag 1`},
                        {name: 'Option 5', value: `5️⃣ - Stammfahrer Liga Sonntag 2`},
                        {name: 'Option 6', value: `6️⃣ - Stammfahrer Liga Freitag`},
                        {name: 'Option 7', value: `7️⃣ - Stammfahrer Liga Origin`},
                        {name: 'Option 8', value: `8️⃣ - Nichts davon`},
                        {name: 'Abbrechen', value: `${CurrentSeason.seasonData.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
                    )

                var messageFutureRoleEmbed = await client.channels.cache.get(CurrentSeason.seasonData.getCommandChannelID()).send({ embeds: [futureRoleEmbed] });
                
                await messageFutureRoleEmbed.react('1️⃣');
                await messageFutureRoleEmbed.react('2️⃣');
                await messageFutureRoleEmbed.react('3️⃣');
                await messageFutureRoleEmbed.react('4️⃣');
                await messageFutureRoleEmbed.react('5️⃣');
                await messageFutureRoleEmbed.react('6️⃣');
                await messageFutureRoleEmbed.react('7️⃣');
                await messageFutureRoleEmbed.react('8️⃣');
                await messageFutureRoleEmbed.react(CurrentSeason.seasonData.getAbmeldeEmoji());

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
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getEhemaligerFahrerRolleID());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                        let fahrerF1Role = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getFahrerF1RolleID());
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.remove(fahrerF1Role);
                        await roleRemoveMember.roles.add(futureRole);
                    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ersatzfahrer Liga Sonntag 2
                     * 
                     */
                    else if(reaction.emoji.name == '2️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSA2());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Sonntag 1
                     * 
                     */
                    else if(reaction.emoji.name == '3️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSO1());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
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
                    else if(reaction.emoji.name == '4️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSA1());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
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
                    else if(reaction.emoji.name == '5️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSO2());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Freitag
                     * 
                     */
                    else if(reaction.emoji.name == '6️⃣'){

                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaFR());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Freitag
                     * 
                     */
                    else if(reaction.emoji.name == '7️⃣'){

                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaOrigin());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Nichts davon
                     * 
                     */
                    else if(reaction.emoji.name == '8️⃣'){

                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);

                    }
                    /**
                     * 
                     * Vorgang abbrechen
                     * 
                     */
                    else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                        await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`)
                    } else {
                        await reaction.users.remove(user.id);
                    }

                    // Set drivers
                    
                    if(roleName == `Mercedes`){
                        CurrentSeason.seasonData.setMercedesDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Red Bull`){
                        CurrentSeason.seasonData.setRedBullDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Ferrari`){
                        CurrentSeason.seasonData.setFerrariDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `McLaren`){
                        CurrentSeason.seasonData.setMcLarenDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Aston Martin`){
                        CurrentSeason.seasonData.setAstonMartinDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Alpine`){
                        CurrentSeason.seasonData.setAlpineDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Alpha Tauri`){
                        CurrentSeason.seasonData.setAlphaTauriDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Alfa Romeo`){
                        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Williams`){
                        CurrentSeason.seasonData.setWilliamsDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Haas`){
                        CurrentSeason.seasonData.setHaasDriversLigaSA2(tempTeamDrivers);
                    }

                })

            }
            /**
            * Fahrer 2
            */
            if(reaction.emoji.name == '2️⃣'){
                
                // Get driver to remove
                var driverToRemove = tempLineup.get(roleName)[1];

                // Set new lineup
                tempTeamDrivers[1] = 'entfernt';
                await CurrentSeason.methodStorage.sendTeams(client, CurrentSeason.seasonData);
                tempLineup.get(roleName)[1] = 'entfernt';
                CurrentSeason.seasonData.setCurrentLineupLigaSA2(tempLineup)
                // Stammlineup ändern
                await CurrentSeason.methodStorage.printLineup(client, CurrentSeason.seasonData);

                var futureRoleEmbed = new MessageEmbed()
                    .setColor('#ff7272')
                    .setTitle('Bitte wähle den Fahrer aus')
                    .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${roleGiven.id}> gewählt. Was macht der Fahrer in der Zukunft?`)
                    .addFields(
                        {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                        {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                        {name: 'Option 3', value: `3️⃣ - Stammfahrer Liga Sonntag 1`},
                        {name: 'Option 4', value: `4️⃣ - Stammfahrer Liga Samstag 1`},
                        {name: 'Option 5', value: `5️⃣ - Stammfahrer Liga Sonntag 2`},
                        {name: 'Option 6', value: `6️⃣ - Stammfahrer Liga Freitag`},
                        {name: 'Option 7', value: `7️⃣ - Stammfahrer Liga Origin`},
                        {name: 'Option 8', value: `8️⃣ - Nichts davon`},
                        {name: 'Abbrechen', value: `${CurrentSeason.seasonData.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
                    )

                var messageFutureRoleEmbed = await client.channels.cache.get(CurrentSeason.seasonData.getCommandChannelID()).send({ embeds: [futureRoleEmbed] });
                
                await messageFutureRoleEmbed.react('1️⃣');
                await messageFutureRoleEmbed.react('2️⃣');
                await messageFutureRoleEmbed.react('3️⃣');
                await messageFutureRoleEmbed.react('4️⃣');
                await messageFutureRoleEmbed.react('5️⃣');
                await messageFutureRoleEmbed.react('6️⃣');
                await messageFutureRoleEmbed.react('7️⃣');
                await messageFutureRoleEmbed.react('8️⃣');
                await messageFutureRoleEmbed.react(CurrentSeason.seasonData.getAbmeldeEmoji());

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
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getEhemaligerFahrerRolleID());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                        let fahrerF1Role = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getFahrerF1RolleID());
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.remove(fahrerF1Role);
                        await roleRemoveMember.roles.add(futureRole);
                    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ersatzfahrer Liga Sonntag 2
                     * 
                     */
                    else if(reaction.emoji.name == '2️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSA2());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Sonntag 1
                     * 
                     */
                    else if(reaction.emoji.name == '3️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSO1());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
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
                    else if(reaction.emoji.name == '4️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSA1());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
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
                    else if(reaction.emoji.name == '5️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaSO2());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Freitag
                     * 
                     */
                    else if(reaction.emoji.name == '6️⃣'){

                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaFR());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Freitag
                     * 
                     */
                    else if(reaction.emoji.name == '7️⃣'){

                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLigaOrigin());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Nichts davon
                     * 
                     */
                    else if(reaction.emoji.name == '8️⃣'){

                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLigaSA2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);

                    }
                    /**
                     * 
                     * Vorgang abbrechen
                     * 
                     */
                    else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                        await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`)
                    } else {
                        await reaction.users.remove(user.id);
                    }

                    // Set Array of regular drivers
                    if(roleName == `Mercedes`){
                        CurrentSeason.seasonData.setMercedesDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Red Bull`){
                        CurrentSeason.seasonData.setRedBullDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Ferrari`){
                        CurrentSeason.seasonData.setFerrariDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `McLaren`){
                        CurrentSeason.seasonData.setMcLarenDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Aston Martin`){
                        CurrentSeason.seasonData.setAstonMartinDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Alpine`){
                        CurrentSeason.seasonData.setAlpineDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Alpha Tauri`){
                        CurrentSeason.seasonData.setAlphaTauriDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Alfa Romeo`){
                        CurrentSeason.seasonData.setAlfaRomeoDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Williams`){
                        CurrentSeason.seasonData.setWilliamsDriversLigaSA2(tempTeamDrivers);
                    } else if(roleName == `Haas`){
                        CurrentSeason.seasonData.setHaasDriversLigaSA2(tempTeamDrivers);
                    }

                })

            }
            /**
            * 
            * Vorgang abbrechen
            * 
            */
            else if(reaction.emoji.name == CurrentSeason.seasonData.getAbmeldeEmoji()){
                await interaction.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`)
            } else {
                await reaction.users.remove(user.id);
            }
        })

        
    }  
}