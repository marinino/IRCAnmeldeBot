module.exports = async (client, Discord, reaction, user) => {
    
    
    console.log('REACTED VIA EVENT', reaction)

    var anmeldeChannelID = await client.getAnmeldeChannelIDLigaFR();
    var abmeldeChannelID = await client.getAbmeldeChannelIDLigaFR();
    var ersatzfahrerRolleID = await client.getErsatzfahrerRolleIDLigaFR();
    var stammfahrerRolleID = await client.getStammfahrerRolleIDLigaFR();

    //ENTFERNEN VON ANMELDUNG
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
            reactedToSubIn = res[0].reacted_to_sub_in.split(',')
        }
    }, async function(err){
        console.log(`Error while getting last race entry in DB to get drivers reacted to sub in -- ${new Date().toLocaleString()} \n ${err}`)
    })   
    
    var subPersonList = new Array()
    await client.getLastRaceInDatabase().then(async function(res){
        console.log(`Successfully got last race entry in DB to get drivers reacted to sub in -- ${new Date().toLocaleString()}`)
        if(res[0].sub_person_list.length > 0){
            subPersonList = res[0].sub_person_list.split(',')
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
    // Entfernen von Anmeldung 
    if(reaction.message.channel.id == anmeldeChannelID){
        console.log('reaction detected')
        if(anmeldungActive == true){
            if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleID)){
                if(reaction.emoji.name == client.getAnmeldeEmoji()){
                    reactedToSubIn.splice(reactedToSubIn.indexOf(user.id), 1);
                    
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
      
    //ENTFERNEN VON ABMELDUNG
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
            console.log(`In ${client.getLigatitel()} hat ${user.username} mit ID ${user.id} seine Abmeldung zurückgenommen. Prüfsumme(darf niemals undefined sein): 
                        ID: ${reaction.message.guild.members.cache.get(user.id).id}, DC-Name: ${reaction.message.guild.members.cache.get(user.id).nickname} -- ${date}`)
            if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleID)){
                if(reaction.emoji.name == client.getAbmeldeEmoji()){
                    reactedToSignOut.splice(reactedToSignOut.indexOf(user.id), 1);
                    
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
    
}