const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflewaitlistlast_fr')
        .setDescription('Schiebt einen Fahrer auf den letzten Platz auf der Warteliste')
        .addUserOption(option => 
            option.setName('driver')
                .setDescription('Fahrer der Verschoben werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der shufflewaitlistlastFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply('Prozess gestartet')

        const driver = interaction.options.getUser('driver');
        var tempReinstatedDrivers = new Array();
        var tempSubPersonList = new Array();
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for shufflewaitlistlast command -- ${new Date().toLocaleString()}`)
            if(res[0].sub_person_list_reinstated_drivers.length > 0){
                tempReinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
            }
            if(res[0].sub_person_list.length > 0){
                tempSubPersonList = res[0].sub_person_list.split(',')
            }
            
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for shufflewaitlistlast command -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(tempReinstatedDrivers.includes(driver.id)){
            tempReinstatedDrivers.splice(tempReinstatedDrivers.indexOf(driver.id), 1)
        } else if(tempSubPersonList.includes(driver.id)){
            tempSubPersonList.splice(tempSubPersonList.indexOf(driver.id), 1);
        } else {
            await interaction.channel.send(`Fahrer nicht auf Warteliste`);
            return;
        }

        tempSubPersonList.push(driver.id);

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

        await client.setWaitlistMsgContent(client);

    }  
}