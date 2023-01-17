const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('placedriveronwaitlist_fr')
        .setDescription('Setzt einen Fahrer auf die Warteliste an die letzte Stelle')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer welche auf Warteliste soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            console.log(`Der placedriveronwaitlistFR Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        const driver = interaction.options.getUser('driver');
        var tempSubPersonList = new Array()
        var tempReinstatedDrivers = new Array();
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for placedriveronwaitlist command -- ${new Date().toLocaleString()}`)
            if(res[0].sub_person_list.length > 0){
                tempSubPersonList = res[0].sub_person_list.split(',')
            }
            if(res[0].sub_person_list_reinstated_drivers.length > 0){
                tempReinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
            }
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for placedriveronwaitlist command -- ${new Date().toLocaleString()} \n ${err}`)
        })
        

        await interaction.reply(`Hinzufügen wurde gestartet`);

        if(!(tempSubPersonList.includes(driver.id)) && !(tempReinstatedDrivers.includes(driver.id)) && 
            !(await client.checkDriverInLineup(driver.id, client))){
            tempSubPersonList.push(driver.id);
            var subPersonListAsString = await client.convertArrayToString(tempSubPersonList)
            await client.updateSubPersonList(subPersonListAsString, raceID).then(function(res){
                console.log(`Successfully updated sub person list in database -- ${new Date().toLocaleString()}`)
            }, function(err){
                console.log(`Error updating sub person list in database -- ${new Date().toLocaleString()} \n ${err}`)
            })
           
            console.log(`${driver.username} wurde erfolgreich auf die Warteliste gepackt -- ${new Date().toLocaleString()}`)
            await client.setWaitlistMsgContent(client);
        } else {
            await interaction.channel.send(`Fahrer ist schon im Lineup oder auf der Warteliste`);
        }

    }  
}