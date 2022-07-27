const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const CurrentSeason = require('./startseasonliga2.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forceremove2')
        .setDescription('Entfernt ein Fahrer aus dem Stammlineup')
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('Team aus welchem der Fahrer entfernt werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID())){
            interaction.reply('Permission denied')
            return;
        }else{
            console.log('all good')
        }

        interaction.reply(`Entfernung wurde gestartet`);

        const roleGiven = interaction.options.getRole('role');
        console.log(roleGiven)
        const roleName = roleGiven.name
        console.log(roleName)
        // Get Array of regular drivers
        let tempTeamDrivers = new Array()
        if(roleName == `Mercedes`){
            tempTeamDrivers = CurrentSeason.seasonData.getMercedesDriversLiga2();
        } else if(roleName == `Red Bull`){
            tempTeamDrivers = CurrentSeason.seasonData.getRedBullDriversLiga2();
        } else if(roleName == `Ferrari`){
            tempTeamDrivers = CurrentSeason.seasonData.getFerrariDriversLiga2();
        } else if(roleName == `McLaren`){
            tempTeamDrivers = CurrentSeason.seasonData.getMcLarenDriversLiga2();
        } else if(roleName == `Aston Martin`){
            tempTeamDrivers = CurrentSeason.seasonData.getAstonMartinDriversLiga2();
        } else if(roleName == `Alpine`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlpineDriversLiga2();
        } else if(roleName == `Alpha Tauri`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlphaTauriDriversLiga2();
        } else if(roleName == `Alfa Romeo`){
            tempTeamDrivers = CurrentSeason.seasonData.getAlfaRomeoDriversLiga2();
        } else if(roleName == `Williams`){
            tempTeamDrivers = CurrentSeason.seasonData.getWilliamsDriversLiga2();
        } else if(roleName == `Haas`){
            tempTeamDrivers = CurrentSeason.seasonData.getHaasDriversLiga2();
        }
        console.log(tempTeamDrivers)

        var tempLineup = CurrentSeason.seasonData.getCurrentLineupLiga2();

        var forceRemoveDriverEmbed = new MessageEmbed()
            .setColor('#66ff99')
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
                CurrentSeason.seasonData.setCurrentLineupLiga2(tempLineup)
                // Stammlineup ändern
                await CurrentSeason.methodStorage.printLineup(client, CurrentSeason.seasonData);

                var futureRoleEmbed = new MessageEmbed()
                    .setColor('#fd5100')
                    .setTitle('Bitte wähle den Fahrer aus')
                    .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${roleGiven.id}> gewählt. Was macht der Fahrer in der Zukunft?`)
                    .addFields(
                        {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                        {name: 'Option 2', value: `2️⃣ - Ersatzfahrer Liga 2`},
                        {name: 'Option 3', value: `3️⃣ - Stammfahrer Liga 1`},
                        {name: 'Option 4', value: `4️⃣ - Stammfahrer Liga 3`},
                        {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                        {name: 'Abbrechen', value: `${CurrentSeason.seasonData.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
                    )

                var messageFutureRoleEmbed = await client.channels.cache.get(CurrentSeason.seasonData.getCommandChannelID()).send({ embeds: [futureRoleEmbed] });
                
                await messageFutureRoleEmbed.react('1️⃣');
                await messageFutureRoleEmbed.react('2️⃣');
                await messageFutureRoleEmbed.react('3️⃣');
                await messageFutureRoleEmbed.react('4️⃣');
                await messageFutureRoleEmbed.react('5️⃣');
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
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                        let fahrerF1Role = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getFahrerF1RolleID());
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.remove(fahrerF1Role);
                        await roleRemoveMember.roles.add(futureRole);
                    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ersatzfahrer Liga 2
                     * 
                     */
                    else if(reaction.emoji.name == '2️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Stammfahrer Liga 1
                     * 
                     */
                    else if(reaction.emoji.name == '3️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga1());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await interaction.guild.members.fetch(driverToRemove);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Ersatzfahrer Liga 3
                     * 
                     */
                    else if(reaction.emoji.name == '4️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga3());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga1());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 1, Nichts davon
                     * 
                     */
                    else if(reaction.emoji.name == '5️⃣'){
        
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
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
                        CurrentSeason.seasonData.setMercedesDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Red Bull`){
                        CurrentSeason.seasonData.setRedBullDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Ferrari`){
                        CurrentSeason.seasonData.setFerrariDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `McLaren`){
                        CurrentSeason.seasonData.setMcLarenDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Aston Martin`){
                        CurrentSeason.seasonData.setAstonMartinDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Alpine`){
                        CurrentSeason.seasonData.setAlpineDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Alpha Tauri`){
                        CurrentSeason.seasonData.setAlphaTauriDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Alfa Romeo`){
                        CurrentSeason.seasonData.setAlfaRomeoDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Williams`){
                        CurrentSeason.seasonData.setWilliamsDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Haas`){
                        CurrentSeason.seasonData.setHaasDriversLiga2(tempTeamDrivers);
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
                CurrentSeason.seasonData.setCurrentLineupLiga2(tempLineup)
                // Stammlineup ändern
                await CurrentSeason.methodStorage.printLineup(client, CurrentSeason.seasonData);

                var futureRoleEmbed = new MessageEmbed()
                    .setColor('#fd5100')
                    .setTitle('Bitte wähle den Fahrer aus')
                    .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${roleGiven.id}> gewählt. Was macht der Fahrer in der Zukunft?`)
                    .addFields(
                        {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                        {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für Liga 2`},
                        {name: 'Option 3', value: `3️⃣ - Stammfahrer Liga 1`},
                        {name: 'Option 4', value: `4️⃣ - Stammfahrer Liga 3`},
                        {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                        {name: 'Abbrechen', value: `${CurrentSeason.seasonData.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
                    )

                var messageFutureRoleEmbed = await client.channels.cache.get(CurrentSeason.seasonData.getCommandChannelID()).send({ embeds: [futureRoleEmbed] });
                
                await messageFutureRoleEmbed.react('1️⃣');
                await messageFutureRoleEmbed.react('2️⃣');
                await messageFutureRoleEmbed.react('3️⃣');
                await messageFutureRoleEmbed.react('4️⃣');
                await messageFutureRoleEmbed.react('5️⃣');
                await messageFutureRoleEmbed.react(CurrentSeason.seasonData.getAbmeldeEmoji());

                const collectorConfirmFutureRoles = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});

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
                     * Team Mercedes, Fahrer 2, Ehemaliger Fahrer
                     * 
                     */
                    if(reaction.emoji.name == '1️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getEhemaligerFahrerRolleID());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                        let fahrerF1Role = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getFahrerF1RolleID());
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.remove(fahrerF1Role);
                        await roleRemoveMember.roles.add(futureRole);
                    
                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 2, Ersatzfahrer Liga 2
                     * 
                     */
                    else if(reaction.emoji.name == '2️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga2());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);
                    }
                    /**
                     * 
                     * Team Mercedes, Fahrer 2, Stammfahrer Liga 1
                     * 
                     */
                    else if(reaction.emoji.name == '3️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga1());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 2, Ersatzfahrer Liga 3
                     * 
                     */
                    else if(reaction.emoji.name == '4️⃣'){
        
                        let futureRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getErsatzfahrerRolleIDLiga3());
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
                        await roleRemoveMember.roles.remove(regDriverRole);
                        await roleRemoveMember.roles.remove(teamRole);
                        await roleRemoveMember.roles.add(futureRole);

                    } 
                    /**
                     * 
                     * Team Mercedes, Fahrer 2, Nichts davon
                     * 
                     */
                    else if(reaction.emoji.name == '5️⃣'){
        
                        let regDriverRole = await interaction.guild.roles.cache.find(role => role.id === CurrentSeason.seasonData.getStammfahrerRolleIDLiga2());
                        let teamRole = await interaction.guild.roles.cache.find(role => role.id === roleGiven.id);
                
                        let roleRemoveMember = await client.users.cache.find(user => user.id == `${driverToRemove}`);
        
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
                        CurrentSeason.seasonData.setMercedesDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Red Bull`){
                        CurrentSeason.seasonData.setRedBullDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Ferrari`){
                        CurrentSeason.seasonData.setFerrariDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `McLaren`){
                        CurrentSeason.seasonData.setMcLarenDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Aston Martin`){
                        CurrentSeason.seasonData.setAstonMartinDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Alpine`){
                        CurrentSeason.seasonData.setAlpineDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Alpha Tauri`){
                        CurrentSeason.seasonData.setAlphaTauriDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Alfa Romeo`){
                        CurrentSeason.seasonData.setAlfaRomeoDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Williams`){
                        CurrentSeason.seasonData.setWilliamsDriversLiga2(tempTeamDrivers);
                    } else if(roleName == `Haas`){
                        CurrentSeason.seasonData.setHaasDriversLiga2(tempTeamDrivers);
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