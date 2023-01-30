const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('placecaronfreecars_fr')
        .setDescription('Setzt einen Auto auf die Liste an die letzte Stelle')
        .addRoleOption(option => 
            option.setName('car')
                .setDescription('Auto welches auf Warteliste soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der placedriveronwaitlistFR Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        const car = interaction.options.getRole('car');
        var tempFreeCarsList = new Array()
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for placedriveronwaitlist command -- ${new Date().toLocaleString()}`)
            if(res[0].free_cars.length > 0){
                tempFreeCarsList = res[0].free_cars.split(',')
            }
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for placedriveronwaitlist command -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        await interaction.reply(`Hinzufügen wurde gestartet`);

        tempFreeCarsList.push(car.id);
        var freeCarsListAsString = await client.convertArrayToString(tempFreeCarsList)
        await client.updateSubPersonList(freeCarsListAsString, raceID).then(function(res){
            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        console.log(`${car.name} wurde erfolgreich auf die Warteliste gepackt -- ${new Date().toLocaleString()}`)
        await client.setWaitlistMsgContent(client);
       

    }  
}