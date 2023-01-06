const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forcefree_fr')
        .setDescription('Öffnet ein entferntes Cockpit für Ersatzfahrer')
        .addRoleOption(option => 
            option.setName('team')
                .setDescription('Team welches frei gemacht werden soll')
                .setRequired(true)),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der forcefreeFR Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        await interaction.reply(`Öffnen wurde gestartet`);

        const teamRole = interaction.options.getRole('team');

        var tempFreeCars = new Array();
        var tempCurrentLineup = await client.getCurrentLineup();

        await client.getLastRaceInDatabase().then(function(res){
            console.log(`Successfully got last entry in table for forcefree command -- ${new Date().toLocaleString()}`)

            tempFreeCars = res[0].free_cars.split(',')
        }, function(err){
            console.log(`Error getting last entry in table for forcefree command -- ${new Date().toLocaleString()} \n ${err}`)
        })
        
        tempFreeCars.push(teamRole.id);

        var freeCarsAsString = await client.convertArrayToString(tempFreeCars)
        await client.updateReinstatedDrivers(freeCarsAsString, raceID).then(function(res){
            console.log(`Successfully updated free cars list in database -- ${new Date().toLocaleString()}`)
        }, function(err){
            console.log(`Error updating free cars list in database -- ${new Date().toLocaleString()} \n ${err}`)
        })

        if(tempCurrentLineup.get(teamRole.name)[0] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[0] = 'nicht besetzt';
            await client.setCurrentLineup(teamRole.name, tempCurrentLineup)
            await client.checkSubCanBeMade(client, true, 0, null, null);

            console.log(`Cockpit 1 von ${teamRole.name} wurde auf nicht besetzt gestellt -- ${new Date().toLocaleString()}`)
        } else if(tempCurrentLineup.get(teamRole.name)[1] == 'entfernt'){
            tempCurrentLineup.get(teamRole.name)[1] = 'nicht besetzt';
            await client.setCurrentLineup(teamRole.name, tempCurrentLineup)
            await client.checkSubCanBeMade(client, true, 1, null, null);

            console.log(`Cockpit 2 von ${teamRole.name} wurde auf nicht besetzt gestellt -- ${new Date().toLocaleString()}`)
        } else {
            await interaction.channel.send(`Falsches Team übergeben`);

            console.log(`Kein Cockpit von ${teamRole.name} war entfernt -- ${new Date().toLocaleString()}`)
        }
    }  
}