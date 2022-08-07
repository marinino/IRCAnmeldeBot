const {SlashCommandBuilder} = require('@discordjs/builders');
const CurrentSeason = require('./startseasonligaSA1.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resumeseasonSA1')
        .setDescription('Führt den Ligabertieb fort'),

    async execute(client, interaction, command){

        if(!interaction.member.roles.cache.has(CurrentSeason.seasonData.getRennleiterRolleID()) &&
            !interaction.member.roles.cache.has(CurrentSeason.seasonData.getLigaleiterRolleID())){
            interaction.reply('Du hast keine Berechtigung diesen Command auszuführen')
            return;
        }else{
            var date = new Date().toLocaleString()
            console.log(`Der resumeseasonSA1 Command wurde von ${interaction.user.username} verwendet -- ${date}`)
        }

        if(!(CurrentSeason.seasonData.getSeasonActiveLigaSA1())){
            CurrentSeason.seasonData.setSeasonActiveLigaSA1(true);
        }

        interaction.reply(`Saison läuft wieder`);
    }  
}