const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Provides basic help',
    execute(client, message, cmd, args, Discord){
        const embedHelp = new MessageEmbed()
        .setColor('#fd5100')
        .setTitle('Hilfe')
        .setDescription('Kurze Erklärung der Funktionen')
        .addFields(
        {name: 'Anmeldung der Fahrer mit Warteliste-Rolle', value: 'Für den Fall, dass es zu wenige Anmeldungen gibt, kann die Warteliste aktiviert werden. ' +
                                                                'Das bedeutet, dass die Fahrer die auf der Warteliste stehen auch mitfahren können diese Woche. ' +
                                                                'Diese Möglichkeit wird von der Rennleitung per Command freigeschaltet, ab dem Zeitpunkt der Aktivierung ' +
                                                                'werden Fahrer auf der Warteliste wie Ersatzfahrer behandelt. Fahrer auf der Warteliste können sich zu Beginn ' +
                                                                'der Anmeldung zwar schon anmelden, aber erst bei Aktivierung der Warteliste werden die Leute auch für die Anmeldung '+
                                                                'des jeweiligen Rennens erkannt. Allerdings werden sie in der Reihenfolge wie sie sich angemeldet in betracht gezogen. ' +
                                                                'Es gilt also das gleiche Prinzip wie bei den Ersatzfahrern, wer sich als erstes anmeldet kriegt am ehesten ein Cockpit'},
        {name: 'An- bzw Abmelden per Command', value: 'Wer keine Möglichkeit hat zu reagieren, weil man im Urlaub ist o.ä. kann man sich bei seinem ' +
                                                        'Ligaleiter melden und dieser kann den Fahrer per Command an- oder abmelden. Die Funktion ist aber nur für ' +
                                                        'den "Notfall" gedacht.'}                      
        )
        .setFooter('Für weitere Fragen das Fragentool verwenden.')

        // Sends actual Embed
        message.channel.send({ embeds: [embedHelp] });
    }
  }