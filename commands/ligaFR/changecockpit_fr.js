const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changecockpit_fr')
        .setDescription('Hiermit können maunelle Änderungen im Lineup gemacht werden.')
        .addRoleOption(option => 
            option.setName('team')
                .setDescription('Team welches geändert werden soll')
                .setRequired(true))
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer welcher ein Cockpit übernehmen soll(OPTIONAL)')
                .setRequired(false)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der changecockpitFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const driverIn = interaction.options.getUser('driver');
        const teamObject = interaction.options.getRole('team');
        const abmeldeChannel = await client.getAbmeldeChannelIDLigaFR();
        const logChannelID = await client.getLogChannelID();
        const discordID = await client.getDiscordID();

        var messageEmbededAnmelden = -1
        var raceID = -1
        var tempCurrentLineup = new Map();
        var tempReactedToSubIn = new Map();
        var tempSubPersonList = new Array();
        var tempSubInPerCmd = new Array();
        var tempFreeCars = new Array();
        var tempWithdrawnDrivers = new Array();
        var tempReinstatedDrivers = new Array();

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for changecockpit command -- ${new Date().toLocaleString()}`)

            messageEmbededAnmelden = res[0].register_msg_id
            raceID = res[0].race_id
            tempCurrentLineup = await client.getCurrentLineup();
            var reactedToSubInString = res[0].reacted_to_sub_in
            tempReactedToSubIn = await client.convertStringToMap(reactedToSubInString)
            tempSubPersonList = res[0].sub_person_list.split(',')
            tempSubInPerCmd = res[0].sub_in_drivers_per_cmd.split(',')
            tempFreeCars = res[0].free_cars.split(',')
            tempWithdrawnDrivers = res[0].withdrawn_drivers.split(',')
            tempReinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
        }, function(err){
            console.log(`Error getting last entry in table for changecockpit command -- ${new Date().toLocaleString()} \n ${err}`)
        })
       

        if(driverIn != null){
            if(await client.checkDriverInLineup(driverIn.id)){
                interaction.reply('Fahrer ist schon in Lineup oder auf Warteliste');
                return
            }
        }
    
        await interaction.reply(`Tausch wurde gestartet`);

        let forceRemoveDriverEmbed = new EmbedBuilder()
            .setColor('#e0e0e0')
            .setTitle('Bitte wähle den Fahrer aus')
            .setDescription(`Du hast Team <@&${teamObject.id}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'Erster Fahrer', value: `1️⃣ - <@${tempCurrentLineup.get(`${teamObject.name}`)[0]}>`},
              {name: `Zweiter Fahrer`, value: `2️⃣ - <@${tempCurrentLineup.get(`${teamObject.name}`)[1]}>`},
              {name: 'Abbrechen', value: `${await client.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
            )
  
        let messageForceRemoveDriverEmbed = await client.channels.cache.get(await client.getCommandChannelID()).send({ embeds: [forceRemoveDriverEmbed] });

        await messageForceRemoveDriverEmbed.react('1️⃣');
        await messageForceRemoveDriverEmbed.react('2️⃣');
        await messageForceRemoveDriverEmbed.react(await client.getAbmeldeEmoji());

        const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});

        collectorConfirm.on('collect', async (reaction, user) => {
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
            * Fahrer 1
            * 
            */
            else if(reaction.emoji.name == '1️⃣'){
                if(driverIn){
                    let preCmdDriver = tempCurrentLineup.get(`${teamObject.name}`)[0];

                    if(preCmdDriver != 'nicht besetzt'){
                        let clearCockpitRemoveEmbed = new EmbedBuilder()
                            .setColor('#ff4d4d')
                            .setTitle('️️️️️️️️️️️️️️️↩')
                            .addFields(
                                {name: `Update im Lineup`, value: `<@${preCmdDriver}> ist diese Woche nicht dabei`}
                            );

                        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannel).send({ embeds : [clearCockpitRemoveEmbed]}).then(() => {
                            client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [clearCockpitRemoveEmbed]});
                        });

                        tempWithdrawnDrivers.push(preCmdDriver);
                        var withdrawnDriversAsString = await client.convertArrayToString(tempWithdrawnDrivers)
                        await client.updateWithdrawnDrivers(withdrawnDriversAsString, raceID).then(function(res){
                            console.log(`Successfully updated withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
   
                        console.log(`changecockpitFR wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(await client.getDiscordID()).members.cache.get(preCmdDriver).username} wurde entfernt -- ${new Date().toLocaleString()}`);
                    }

                    tempSubInPerCmd.push(driverIn.id)
                    var subInAsString = await client.convertArrayToString(tempSubInPerCmd)
                    await client.updateSubInDriversPerCmd(subInAsString, raceID).then(function(res){
                        console.log(`Successfully updated sub in drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating sub in drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    console.log(`changecockpitFR wurde verwendet und der Fahrer ${driverIn.username} wurde erfolgreich ins Lineup genommen -- ${new Date().toLocaleString()}`);

                    if(tempSubPersonList.includes(driverIn.id)){
                        tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1)
                    }

                    if(tempReinstatedDrivers.includes(driverIn.id)){
                        tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driverIn.id), 1)
                    }

                    tempReinstatedDrivers.unshift(driverIn.id);

                    if(preCmdDriver != 'nicht besetzt'){
                        tempFreeCars.unshift(teamObject.id);
                    } else {
                        tempFreeCars.splice(tempFreeCars.indexOf(teamObject.id), 1);
                        tempFreeCars.unshift(teamObject.id);
                    }

                    if(tempReactedToSubIn.has(preCmdDriver)){
                        messageEmbededAnmelden.reactions.resolve(tempReactedToSubIn.get(preCmdDriver)).users.remove(preCmdDriver);
                        tempReactedToSubIn.delete(preCmdDriver);

                        var reactedToSubInAsString = await client.convertMapToString(tempReactedToSubIn)
                        await client.setReactedToSubIn(reactedToSubInAsString, raceID).then(function(res){
                            console.log(`Successfully updated reacted to sub in list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating reacted to sub in list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })

                        CurrentSeason.seasonData.setReactedToSubInLigaFR(tempReactedToSubIn);
                    }

                    var freeCarsAsString = await client.convertArrayToString(tempFreeCars)
                    await client.updateFreeCarsList(freeCarsAsString, raceID).then(function(res){
                        console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    var subPersonListAsString = await client.convertArrayToString(tempSubPersonList)
                    await client.updateSubPersonList(subPersonListAsString, raceID).then(function(res){
                        console.log(`Successfully updated sub person list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating sub person list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    var reinstatedDriversAsString = await client.convertArrayToString(tempReinstatedDrivers)
                    await client.updateReinstatedDrivers(reinstatedDriversAsString, raceID).then(function(res){
                        console.log(`Successfully updated reinstated drivers list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating reinstated drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    if(preCmdDriver != 'nicht besetzt'){
                        await client.removeFromCurrentLineup(client, preCmdDriver, teamObject.id);
                    }
                    await client.checkSubCanBeMade(client, false, null, null, null)
                }else{

                    var driverOutID = tempCurrentLineup.get(`${teamObject.name}`)[0]
                    
                    if(driverOutID != 'nicht besetzt'){
                        let driverOutObject = await interaction.guild.members.fetch(driverOutID)

                        let clearCockpitRemoveEmbed = new EmbedBuilder()
                            .setColor('#ff4d4d')
                            .setTitle('️️️️️️️️️️️️️️️↩')
                            .addFields(
                                {name: `Update im Lineup`, value: `<@${driverOutID}> ist diese Woche nicht dabei`}
                            );

                        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannel).send({ embeds : [clearCockpitRemoveEmbed]}).then(() => {
                            client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [clearCockpitRemoveEmbed]});
                        });


                        tempWithdrawnDrivers.push(driverOutID);
                        var withdrawnDriversAsString = await client.convertArrayToString(tempWithdrawnDrivers)
                        await client.updateWithdrawnDrivers(withdrawnDriversAsString, raceID).then(function(res){
                            console.log(`Successfully updated withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })

                        console.log(`changecockpitFR wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(await client.getDiscordID()).members.cache.get(driverOutID).nickname} wurde entfernt -- ${new Date().toLocaleString()}`);

                        tempFreeCars.push(teamObject.id);         
                        
                        if(tempSubInPerCmd.includes(driverOutID)){
                            tempSubInPerCmd.splice(tempSubInPerCmd.indexOf(driverOutID), 1);
                        }
    
                        var freeCarsAsString = await client.convertArrayToString(tempFreeCars)
                        await client.updateFreeCarsList(freeCarsAsString, raceID).then(function(res){
                            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
                        var subPersonPerCmdListAsString = await client.convertArrayToString(tempSubInPerCmd)
                        await client.updateSubInDriversPerCmd(subPersonPerCmdListAsString, raceID).then(function(res){
                            console.log(`Successfully updated sub person per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating sub person per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
    
                        await client.removeFromCurrentLineup(client, driverOutObject, teamObject.id);
                        await client.checkSubCanBeMade(client, false, null, null, null)
                    } else {
                        await interaction.channel.send(`Leeres Cockpit kann nicht enfernt werden`)
                    }
                    
                }
            }
            /**
            * 
            * Fahrer 2
            * 
            */
             else if(reaction.emoji.name == '2️⃣'){
                if(driverIn){
                    let preCmdDriver = tempCurrentLineup.get(`${teamObject.name}`)[1]

                    if(preCmdDriver != 'nicht besetzt'){
                        let clearCockpitRemoveEmbed = new EmbedBuilder()
                            .setColor('#ff4d4d')
                            .setTitle('️️️️️️️️️️️️️️️↩')
                            .addFields(
                                {name: `Update im Lineup`, value: `<@${preCmdDriver}> ist diese Woche nicht dabei`}
                            );

                        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannel).send({ embeds : [clearCockpitRemoveEmbed]}).then(() => {
                            client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [clearCockpitRemoveEmbed]});
                        });

                        tempWithdrawnDrivers.push(preCmdDriver);
                        var withdrawnDriversAsString = await client.convertArrayToString(tempWithdrawnDrivers)
                        await client.updateWithdrawnDrivers(withdrawnDriversAsString, raceID).then(function(res){
                            console.log(`Successfully updated withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })

                        console.log(`changecockpitFR wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(preCmdDriver).nickname} wurde entfernt -- ${new Date().toLocaleString()}`);
                    }

                    tempSubInPerCmd.push(driverIn.id)
                    var subInAsString = await client.convertArrayToString(tempSubInPerCmd)
                    await client.updateSubInDriversPerCmd(subInAsString, raceID).then(function(res){
                        console.log(`Successfully updated sub in drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating sub in drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    console.log(`changecockpitFR wurde verwendet und der Fahrer ${driverIn.username} wurde erfolgreich ins Lineup genommen -- ${new Date().toLocaleString()}`);

                    if(tempSubPersonList.includes(driverIn.id)){
                        tempSubPersonList.splice(tempSubPersonList.indexOf(driverIn.id), 1)
                    }

                    if(tempReinstatedDrivers.includes(driverIn.id)){
                        tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driverIn.id), 1)
                    }

                    tempReinstatedDrivers.unshift(driverIn.id);

                    if(preCmdDriver != 'nicht besetzt'){
                        tempFreeCars.unshift(teamObject.id);
                    } else {
                        tempFreeCars.splice(tempFreeCars.indexOf(teamObject.id), 1);
                        tempFreeCars.unshift(teamObject.id);
                    }

                    if(tempReactedToSubIn.has(preCmdDriver)){
                        messageEmbededAnmelden.reactions.resolve(tempReactedToSubIn.get(preCmdDriver)).users.remove(preCmdDriver);
                        tempReactedToSubIn.delete(preCmdDriver);
                        var reactedToSubInAsString = await client.convertMapToString(tempReactedToSubIn)
                        await client.setReactedToSubIn(reactedToSubInAsString, raceID).then(function(res){
                            console.log(`Successfully updated reacted to sub in list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating reacted to sub in list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
                    }

                    var freeCarsAsString = await client.convertArrayToString(tempFreeCars)
                    await client.updateFreeCarsList(freeCarsAsString, raceID).then(function(res){
                        console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    var subPersonListAsString = await client.convertArrayToString(tempSubPersonList)
                    await client.updateSubPersonList(subPersonListAsString, raceID).then(function(res){
                        console.log(`Successfully updated sub person list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating sub person list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })

                    var reinstatedDriversAsString = await client.convertArrayToString(tempReinstatedDrivers)
                    await client.updateReinstatedDrivers(reinstatedDriversAsString, raceID).then(function(res){
                        console.log(`Successfully updated reinstated drivers list in database -- ${new Date().toLocaleString()}`)
                    }, function(err){
                        console.log(`Error updating reinstated drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
                    })
                    
                    if(preCmdDriver != 'nicht besetzt'){
                        await client.removeFromCurrentLineup(client, preCmdDriver, teamObject.id);
                    }
                    await client.checkSubCanBeMade(client, false, null, null, null)
                }else{
                
                    let driverOutID = tempCurrentLineup.get(`${teamObject.name}`)[1]
                    

                    if(driverOutID != 'nicht besetzt'){
                        let driverOutObject = await interaction.guild.members.fetch(driverOutID)

                        let clearCockpitRemoveEmbed = new EmbedBuilder()
                            .setColor('#ff4d4d')
                            .setTitle('️️️️️️️️️️️️️️️↩')
                            .addFields(
                                {name: `Update im Lineup`, value: `<@${driverOutID}> ist diese Woche nicht dabei`}
                            );

                        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannel).send({ embeds : [clearCockpitRemoveEmbed]}).then(() => {
                            client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [clearCockpitRemoveEmbed]});
                        });

                        tempWithdrawnDrivers.push(driverOutID);
                        var withdrawnDriversAsString = await client.convertArrayToString(tempWithdrawnDrivers)
                        await client.updateWithdrawnDrivers(withdrawnDriversAsString, raceID).then(function(res){
                            console.log(`Successfully updated withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating withdrawn drivers per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })

                        console.log(`changecockpitFR wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(driverOutID).nickname} wurde entfernt -- ${new Date().toLocaleString()}`);

                        tempFreeCars.push(teamObject.id);
                        if(tempSubInPerCmd.includes(driverOutID)){
                            tempSubInPerCmd.splice(tempSubInPerCmd.indexOf(driverOutID), 1);
                        }
    
                        var freeCarsAsString = await client.convertArrayToString(tempFreeCars)
                        await client.updateFreeCarsList(freeCarsAsString, raceID).then(function(res){
                            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
                        var subPersonPerCmdListAsString = await client.convertArrayToString(tempSubInPerCmd)
                        await client.updateSubInDriversPerCmd(subPersonPerCmdListAsString, raceID).then(function(res){
                            console.log(`Successfully updated sub person per cmd list in database -- ${new Date().toLocaleString()}`)
                        }, function(err){
                            console.log(`Error updating sub person per cmd list in database -- ${new Date().toLocaleString()} \n ${err}`)
                        })
    
                        await client.removeFromCurrentLineup(client, driverOutObject, teamObject.id);
                        await client.checkSubCanBeMade(client, false, null, null, null)
                    }else {
                        await interaction.channel.send(`Leeres Cockpit kann nicht enfernt werden`)
                    }
                    
                   
                }
            }
        })
        
    }  
}