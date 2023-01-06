const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shufflewaitlistup_fr')
        .setDescription('Schiebt einen Fahrer einen Platz nach hinten auf der Warteliste')
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
            console.log(`Der shufflewaitlistupFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        interaction.reply('Prozess gestartet')

        const driver = interaction.options.getUser('driver');
        var tempReinstatedDrivers = new Array();
        var tempSubPersonList = new Array();
        var indexDriver = null
        var onReinstate = false
        var onNormal = false
        var raceID = -1

        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last entry in table for shufflewaitlistlast command -- ${new Date().toLocaleString()}`)
            
            tempReinstatedDrivers = res[0].sub_person_list_reinstated_drivers.split(',')
            tempSubPersonList = res[0].sub_person_list
            raceID = res[0].race_id
        }, function(err){
            console.log(`Error getting last entry in table for shufflewaitlistlast command -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(tempReinstatedDrivers.includes(driver.id)){
            indexDriver = tempReinstatedDrivers.indexOf(driver.id);
            onReinstate = true
        } else if(tempSubPersonList.includes(driver.id)){
            indexDriver = tempSubPersonList.indexOf(driver.id);
            onNormal = true
        } else {
            await interaction.channel.send(`Fahrer nicht auf Warteliste`);
            return;
        }

        if(indexDriver != null){
            if(onReinstate){
                if(indexDriver == tempReinstatedDrivers.length - 1){
                    tempReinstatedDrivers[indexDriver] = tempSubPersonList[0];
                    tempSubPersonList[0] = driver.id
                } else {
                    tempReinstatedDrivers[indexDriver] = tempReinstatedDrivers[indexDriver + 1];
                    tempReinstatedDrivers[indexDriver + 1] = driver.id;
                }
            } else if(onNormal){
                if(indexDriver == tempSubPersonList.length - 1){
                    await interaction.channel.send(`Fahrer ist schon ganz hinten`)
                } else {
                    tempSubPersonList[indexDriver] = tempSubPersonList[indexDriver + 1];
                    tempSubPersonList[indexDriver + 1] = driver.id;
                }
            }
        }

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