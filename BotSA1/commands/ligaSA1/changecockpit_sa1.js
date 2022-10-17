const CurrentSeason = require('./startseasonliga_sa1.js')
const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changecockpit_sa1')
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
            console.log(`Der changecockpitSA1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        const driverIn = interaction.options.getUser('driver');
        const teamObject = interaction.options.getRole('team');
        const abmeldeChannel = CurrentSeason.seasonData.getAbmeldeChannelIDLigaSA1();
        const logChannelID = CurrentSeason.seasonData.getLogChannelID();
        const discordID = CurrentSeason.seasonData.getDiscordID();
        const messageEmbededAnmelden = CurrentSeason.seasonData.getMessageEmbedAnmeldenLigaSA1();
        var tempCurrentLineup = CurrentSeason.seasonData.getCurrentLineupLigaSA1();
        var tempReactedToSubIn = CurrentSeason.seasonData.getReactedToSubInLigaSA1();
        var tempSubPersonList = CurrentSeason.seasonData.getSubPersonListLigaSA1();
        var tempSubInPerCmd = CurrentSeason.seasonData.getSubInDriversPerCommandLigaSA1();
        var tempFreeCars = CurrentSeason.seasonData.getFreeCarsLigaSA1();
        var tempWithdrawnDrivers = CurrentSeason.seasonData.getWithdrawnDriversLigaSA1();
        var tempReinstatedDrivers = CurrentSeason.seasonData.getsubPersonListReinstatedDriversLigaSA1();

        if(driverIn != null){
            if(await CurrentSeason.methodStorage.checkDriverInLineup(driverIn.id, CurrentSeason.seasonData)){
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
              {name: 'Abbrechen', value: `${CurrentSeason.seasonData.getAbmeldeEmoji()} - Um Vorgang abzubrechen`}
            )
  
        let messageForceRemoveDriverEmbed = await client.channels.cache.get(CurrentSeason.seasonData.getCommandChannelID()).send({ embeds: [forceRemoveDriverEmbed] });

        await messageForceRemoveDriverEmbed.react('1️⃣');
        await messageForceRemoveDriverEmbed.react('2️⃣');
        await messageForceRemoveDriverEmbed.react(CurrentSeason.seasonData.getAbmeldeEmoji());

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
                        CurrentSeason.seasonData.setWithdrawnDriversLigaSA1(tempWithdrawnDrivers);

                        let dateRemove = new Date().toLocaleString();
                        console.log(`changecockpitSA1 wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(preCmdDriver).nickname} wurde entfernt -- ${dateRemove}`);
                    }

                    tempSubInPerCmd.push(driverIn.id)
                    CurrentSeason.seasonData.setSubInDriversPerCommandLigaSA1(tempSubInPerCmd);

                    let dateIn = new Date().toLocaleString();
                    console.log(`changecockpitSA1 wurde verwendet und der Fahrer ${driverIn.username} wurde erfolgreich ins Lineup genommen -- ${dateIn}`);

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
                        CurrentSeason.seasonData.setReactedToSubInLigaSA1(tempReactedToSubIn);
                    }

                    CurrentSeason.seasonData.setFreeCarsLigaSA1(tempFreeCars);
                    CurrentSeason.seasonData.setSubPersonListLigaSA1(tempSubPersonList);
                    CurrentSeason.seasonData.setsubPersonListReinstatedDriversLigaSA1(tempReinstatedDrivers);

                    if(preCmdDriver != 'nicht besetzt'){
                        await CurrentSeason.methodStorage.removeFromCurrentLineup(client, preCmdDriver, teamObject.id, CurrentSeason.seasonData);
                    }
                    await CurrentSeason.methodStorage.checkSubCanBeMade(client, false, null, null, null, CurrentSeason.seasonData)
                }else{

                    let driverOutID = tempCurrentLineup.get(`${teamObject.name}`)[0]
                    
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
                        CurrentSeason.seasonData.setWithdrawnDriversLigaSA1(tempWithdrawnDrivers);

                        let dateRemove = new Date().toLocaleString();
                        console.log(`changecockpitSA1 wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(driverOutID).nickname} wurde entfernt -- ${dateRemove}`);

                        tempFreeCars.push(teamObject.id);         
                        
                        if(tempSubInPerCmd.includes(driverOutID)){
                            tempSubInPerCmd.splice(tempSubInPerCmd.indexOf(driverOutID), 1);
                        }
    
                        CurrentSeason.seasonData.setFreeCarsLigaSA1(tempFreeCars);
                        CurrentSeason.seasonData.setSubInDriversPerCommandLigaSA1(tempSubInPerCmd);
    
                        await CurrentSeason.methodStorage.removeFromCurrentLineup(client, driverOutObject, teamObject.id, CurrentSeason.seasonData);
                        await CurrentSeason.methodStorage.checkSubCanBeMade(client, false, null, null, null, CurrentSeason.seasonData)
                    } else {
                        interaction.channel.send(`Leeres Cockpit kann nicht enfernt werden`)
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
                        CurrentSeason.seasonData.setWithdrawnDriversLigaSA1(tempWithdrawnDrivers);

                        let dateRemove = new Date().toLocaleString();
                        console.log(`changecockpitSA1 wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(preCmdDriver).nickname} wurde entfernt -- ${dateRemove}`);
                    }

                    tempSubInPerCmd.push(driverIn.id)
                    CurrentSeason.seasonData.setSubInDriversPerCommandLigaSA1(tempSubInPerCmd);

                    let dateIn = new Date().toLocaleString();
                    console.log(`changecockpitSA1 wurde verwendet und der Fahrer ${driverIn.username} wurde erfolgreich ins Lineup genommen -- ${dateIn}`);

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
                        CurrentSeason.seasonData.setReactedToSubInLigaSA1(tempReactedToSubIn);
                    }

                    CurrentSeason.seasonData.setFreeCarsLigaSA1(tempFreeCars);
                    CurrentSeason.seasonData.setSubPersonListLigaSA1(tempSubPersonList);
                    CurrentSeason.seasonData.setsubPersonListReinstatedDriversLigaSA1(tempReinstatedDrivers);
                    
                    if(preCmdDriver != 'nicht besetzt'){
                        await CurrentSeason.methodStorage.removeFromCurrentLineup(client, preCmdDriver, teamObject.id, CurrentSeason.seasonData);
                    }
                    await CurrentSeason.methodStorage.checkSubCanBeMade(client, false, null, null, null, CurrentSeason.seasonData)
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
                        CurrentSeason.seasonData.setWithdrawnDriversLigaSA1(tempWithdrawnDrivers);

                        let dateRemove = new Date().toLocaleString();
                        console.log(`changecockpitSA1 wurde verwendet und der Fahrer` +
                            `${client.guilds.cache.get(CurrentSeason.seasonData.getDiscordID()).members.cache.get(driverOutID).nickname} wurde entfernt -- ${dateRemove}`);

                        tempFreeCars.push(teamObject.id);
                        if(tempSubInPerCmd.includes(driverOutID)){
                            tempSubInPerCmd.splice(tempSubInPerCmd.indexOf(driverOutID), 1);
                        }
    
                        CurrentSeason.seasonData.setFreeCarsLigaSA1(tempFreeCars);
                        CurrentSeason.seasonData.setSubInDriversPerCommandLigaSA1(tempSubInPerCmd);
    
                        await CurrentSeason.methodStorage.removeFromCurrentLineup(client, driverOutObject, teamObject.id, CurrentSeason.seasonData);
                        await CurrentSeason.methodStorage.checkSubCanBeMade(client, false, null, null, null, CurrentSeason.seasonData)
                    }else {
                        interaction.channel.send(`Leeres Cockpit kann nicht enfernt werden`)
                    }
                    
                   
                }
            }
        })
        
    }  
}