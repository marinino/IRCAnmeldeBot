const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refreshteams_fr')
        .setDescription('Holt aktuelle Stammfahrer aus der DB'),
       
    async execute(client, interaction, command){
        
        if(!interaction.member.roles.cache.has(await client.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(await client.getLigaleiterRolleID())){
            interaction.reply(`Teams werden gesendet.`)
            return;
        }else{
            console.log(`Der placedriveronwaitlistFR Command wurde von ${interaction.user.username} verwendet -- ${new Date().toLocaleString()}`)
        }

        await client.sendTeams(client)

    }
}