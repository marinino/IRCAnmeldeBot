const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflefreecarsup_fr')
        .setDescription('Schiebt einen Auto einen Platz nach hinten bei freien Autos')
        .addNumberOption(option => 
            option.setName('id')
                .setDescription('Index des Autos das verschoben werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der shufflefreecarsup_fr Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        interaction.reply('Prozess startet')

        const id = interaction.options.getNumber('id');
        var tempFreeCarsList = new Array()
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for removefromwaitlist command -- ${new Date().toLocaleString()}`)
            if(res[0].free_cars.length > 0){
                tempFreeCarsList = res[0].free_cars.split(',')
            }
            
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for removefromwaitlist command -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var carToMoveUp = tempFreeCarsList[id - 1]

        if(id > 0 && id < tempFreeCarsList - 1){
           
            tempFreeCarsList[id - 1] = tempFreeCarsList[id];
            tempFreeCarsList[id] = carToMoveUp;
            
        } else {
            interaction.channel.send(`Illegale ID`)
        }

        var freeCarsListAsString = await client.convertArrayToString(tempFreeCarsList)
        await client.updateSubPersonList(freeCarsListAsString, raceID).then(function(res){
            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        console.log(`Auto an ${id} wurde nach vorne verschoben -- ${new Date().toLocaleString()}`)
        await client.setWaitlistMsgContent(client);
       

    }  
}