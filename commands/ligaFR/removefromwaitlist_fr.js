const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removefromwaitlist_fr')
        .setDescription('Entfernt einen Fahrer von der Warteliste')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer welcher von der Warteliste entfernt werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der removefromwaitlistFR Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        await interaction.reply(`Entfernen wurde gestartet`);

        const driverRemove = interaction.options.getUser('driver');
        var tempReinstatedDrivers = new Array()
        var tempSubDrivers = new Array()
        var messageEmbededAnmelden = -1
        var tempReactedToSubIn = new Array()
        var raceID = -1 

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for removefromwaitlist command -- ${new Date().toLocaleString()}`)
            if(res[0].sub_person_list_reinstated_drivers.length > 0){
                tempReinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
            }
            if(res[0].sub_person_list.length > 0){
                tempSubDrivers = res[0].sub_person_list.split(',')
            } 
            messageEmbededAnmelden = res[0].register_msg_id
            if(res[0].reacted_to_sub_in.length > 0){
                tempReactedToSubIn = res[0].reacted_to_sub_in.split(',')
            }
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for removefromwaitlist command -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(tempReinstatedDrivers.includes(driverRemove.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driverRemove.id), 1);

            var reinstatedDriversAsString = await client.convertArrayToString(tempReinstatedDrivers)
            await client.updateReinstatedDrivers(reinstatedDriversAsString, raceID).then(function(res){
                console.log(`Successfully updated reinstated drivers list in database -- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error updating reinstated drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
            })
        } else if(tempSubDrivers.includes(driverRemove.id)){
            tempSubDrivers.splice(tempSubDrivers.indexOf(driverRemove.id), 1);

            var subDriversAsString = await client.convertArrayToString(tempSubDrivers)
            await client.updateSubPersonList(subDriversAsString, raceID).then(function(res){
                console.log(`Successfully updated sub in drivers list in database -- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error updating sub in drivers list in database -- ${new Date().toLocaleString()} \n ${err}`)
            })

            if(tempReactedToSubIn.includes(driverRemove.id)){
                var userReactions = await client.guilds.cache.get(await client.getDiscordID()).channels.cache.get(await client.getAnmeldeChannelIDLigaFR()).messages.fetch(`${messageEmbededAnmelden}`).
                                    reactions.cache.filter(reaction => reaction.users.cache.has(driverRemove.id));

                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(driverRemove.id);
                }

                tempReactedToSubIn.splice(tempReactedToSubIn.indexOf(driverRemove.id), 1);

                var reactedToSubInAsString = await client.convertArrayToString(tempReactedToSubIn)
                await client.setReactedToSubIn(reactedToSubInAsString, raceID).then(function(res){
                    console.log(`Successfully updated reacted to sub in list in database -- ${new Date().toLocaleString()}`)
                }, function(err){
                    console.log(`Error updating reacted to sub in list in database -- ${new Date().toLocaleString()} \n ${err}`)
                })
            }
        } else{
            await interaction.channel.send(`Fahrer ist nicht auf der Warteliste`)
            return;
        }

        let embedRemoveWaitlist = new EmbedBuilder()
            .setColor('#ff4d4d')
            .setTitle('↩')
            .addFields({name:'Update', value:`<@${driverRemove.id}> wurde von der Warteliste enfernt`});
        
        await client.channels.cache.get(await client.getAnmeldeChannelIDLigaFR()).send({ embeds: [embedRemoveWaitlist] })

        await client.setWaitlistMsgContent(client)
    }  
}