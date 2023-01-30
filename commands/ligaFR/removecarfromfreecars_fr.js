const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removecarfromfreecars_fr')
        .setDescription('Entfernt ein Auto von der Liste')
        .addNumberOption(option => 
            option.setName('id')
                .setDescription('Index des Autos welches entfernt werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der removecarfromfreecars_fr Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        const id = interaction.options.getNumber('id');
        var tempFreeCarsList = new Array()
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for removecarfromfreecars_fr command -- ${new Date().toLocaleString()}`)
            if(res[0].free_cars.length > 0){
                tempFreeCarsList = res[0].free_cars.split(',')
            }
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for removecarfromfreecars_fr command -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        await interaction.reply(`Hinzufügen wurde gestartet`);

        tempFreeCarsList.splice(id - 1, 1);
        var freeCarsListAsString = await client.convertArrayToString(tempFreeCarsList)
        await client.updateSubPersonList(freeCarsListAsString, raceID).then(function(res){
            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        console.log(`Auto an der Stelle ${id} wurde erfolgreich von der Warteliste entfernt -- ${new Date().toLocaleString()}`)
        await client.setWaitlistMsgContent(client);
       

    }  
}