module.exports = async (client, Discord, reaction, user) => {
    
    
    console.log('REACTED VIA EVENT', reaction, 'USER', user)
    var anmeldeChannelID = await client.getAnmeldeChannelIDLigaFR();
    var abmeldeChannelID = await client.getAbmeldeChannelIDLigaFR();
    var ersatzfahrerRolleID = await client.getErsatzfahrerRolleIDLigaFR();
    var stammfahrerRolleID = await client.getStammfahrerRolleIDLigaFR();

    //HINZUFÜGEN VON ANMELDUNG
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

    var reactedToSubIn = new Array()
    await client.getLastRaceInDatabase().then(async function(res){
        console.log(`Successfully got last race entry in DB to get drivers reacted to sub in -- ${new Date().toLocaleString()}`)
        if(res[0].reacted_to_sub_in.length > 0){
            reactedToSubIn = await res[0].reacted_to_sub_in.split(',')
        }
        
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
            
            if(reactedToSubIn.includes(user.id)){
                console.log(`${user.username} hat auf Anmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${client.getLigatitel()} ` + 
                            `-- ${new Date().toLocaleString()}`);
            } else {
                reactedToSubIn.push(user.id)

                //await seasonData.setReactedToSubInLigaFR(reactedToSubIn);
                var IDofCurrentRaceEvent = -1
                await client.getLastRaceInDatabase().then(async function(res){
                    console.log(`Successfully got last race entry in DB to get ID -- ${new Date().toLocaleString()}`)
                    IDofCurrentRaceEvent = res[0].race_id

                    var stringForDatabase = await client.convertArrayToString(reactedToSubIn)

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
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert in ` + 
                            `${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
            } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleID))) {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich anzumelden, hat aber die Stammfahrer ` + 
                            `Rolle in ${client.getLigatitel()} nicht -- ${new Date().toLocaleString()}`);
            } else {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl angemeldet in ` + 
                            `${client.getLigatitel()} -- ${new Date().toLocaleString()}`);
            }             
        }else{
            await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
            let date = new Date().toLocaleString();
            console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wollte sich abmelden, aber Anmeldung war schon beendet ${client.getLigatitel()} -- ${date}`);
        }
    
    }

    //HINZUFÜGEN VON ABMELDUNG
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

    var reactedToSignOut = new Array()
    await client.getLastRaceInDatabase().then(async function(res){
        console.log(`Successfully got last race entry in DB to get drivers reacted to sign out -- ${new Date().toLocaleString()}`)
        if(res[0].reacted_to_sign_out.length > 0){
            reactedToSignOut = await res[0].reacted_to_sign_out.split(',')
        }
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
                
                if(reactedToSignOut.includes(user.id)){
                    let date = new Date().toLocaleString();
                    console.log(`${user.username} hat auf Abmelden reagiert, wurde aber nicht in die Liste hinzugefügt  ${client.getLigatitel()} -- ${date}`);
                } else {
                    reactedToSignOut.push(user.id)
                    console.log('Array ', reactedToSignOut)
                    //await seasonData.setReactedToSignOutLigaFR(reactedToSubIn);
                    var IDofCurrentRaceEvent = -1
                    await client.getLastRaceInDatabase().then(async function(res){
                        console.log(`Successfully got last race entry in DB to get ID -- ${new Date().toLocaleString()}`)
                        IDofCurrentRaceEvent = res[0].race_id

                        var stringForDatabase = await client.convertArrayToString(reactedToSignOut)

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
       
 
     
 }