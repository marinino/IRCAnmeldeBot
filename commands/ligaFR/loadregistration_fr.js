const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');


var racesPlanned = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loadregistartion_fr')
        .setDescription('Gets last entry in DB, to reopen that registration'),

    async execute(client, interaction, command){

        

        if(!interaction.member.roles.cache.has(client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(client.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            //console.log('ack')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der startseason_fr Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        // Gets parameter
        interaction.reply(`Lädt letzte Anmeldung`)

        // Put reaction listeners back in place with all the func

       
      
        //Do stuff
       
        // get current race location
        var registerMsg = null;
        var deregisterMsg = null;
       
        var nextRaceDate = new Date()
        // Register msg ID to init reaction collector
        await client.getLastRaceInDatabase().then(async function(res){
            console.log(`Successfully got last race entry in DB for register message -- ${new Date().toLocaleString()}`)
            registerMsg = await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getAnmeldeChannelIDLigaFR()).messages.fetch(`${res[0].register_msg_id}`)
            console.log(`Successfully got last race entry in DB for deregister message -- ${new Date().toLocaleString()}`)
            deregisterMsg = await client.guilds.cache.get(client.getDiscordID()).channels.cache.get(client.getAbmeldeChannelIDLigaFR()).messages.fetch(`${res[0].deregister_msg_id}`)
            nextRaceDate = new Date(res[0].event_end_time)
        }, async function(err){
            console.log(`Error while getting last race entry in DB for register message -- ${new Date().toLocaleString()} \n ${err}`)
        })

        var collectorSubIn = registerMsg.createReactionCollector({ dispose: true});
        var collectorWithdraw = deregisterMsg.createReactionCollector({ dispose: true});
       
        // block all reacted 
       
    
    
        var timeTillClose = nextRaceDate - new Date()
        console.log(timeTillClose)
        var timeTillReminder = timeTillClose - (20 * 1000)
        setTimeout(async () => await client.reminderOpenCockpits(client), timeTillReminder)
        setTimeout(async () => await client.endFunction(client, currentRaceLocation), timeTillClose)

        // sendTeams
        // set lists
        await client.setWaitlistMsgContent(client);
        await client.printLineup(client);
        await client.sendTeams(client)
      
    }
}