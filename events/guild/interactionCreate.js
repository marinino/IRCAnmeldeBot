module.exports = async (client, Discord, connection, interaction) => {
    
    
    if(!interaction.isCommand()) return;
    
    const cmd = client.commands.get(interaction.commandName);
    
    if(!cmd) return;
    
    try {
        console.log('start')
        await cmd.execute(client, interaction, cmd.data.name, connection)
    } catch (error) {
        console.log(error)
    }
      

    
}