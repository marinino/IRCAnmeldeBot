const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'commandlist',
  description: 'Shows list of all Commands',
  execute(client, message, cmd, args, Discord){
    const commandListEmbed = new MessageEmbed()
    .setColor('#fd5100')
    .setTitle('Command Liste')
    .setDescription('Auflistung aller Commands')
    .addFields(
      {name: '%start1/%start2/%start3/%startSupercup', value: 'Der Command eröffnet die Anmeldung für die jeweiligen Ligen. Die Zahl hinter dem Command steht für die Liga ' +
                                                              'für welche die Anmeldung eröffnet werden soll. Dieser Command kann nur von der Rennleitung ausgeführt werden.'},
      {name: '%anmelden1/%anmelden2/%anmelden3/%anmeldenSupercup @User', value: 'Der Command meldet den Fahrer an, welcher als User markiert wird. Der markierte Benutzer kann ' + 
                                                                                'danach nicht mehr reagieren'},
      {name: '%abmelden1/%abmelden2/%abmelden3/%abmeldenSupercup @User', value: 'Der Command meldet den Fahrer ab, welcher als User markiert wird. Der markierte Benutzer kann danach' + 
                                                                                ' nicht mehr reagieren'},
      {name: '%removeAnmeldung1/%removeAnmeldung2/%removeAnmeldung3/%removeAnmeldungSupercup @User', value: 'Der Command entfernt die Anmeldung des Fahrer an, welcher als User markiert' +
                                                                                                            ' wird. Der Fahrer musste vorher angemeldet worden sein und zwar manuell.'},
      {name: '%removeAbmeldung1/%removeAbmeldung2/%removeAbmeldung3/%removeAbmeldungSupercup @User', value: 'Der Command entfernt die Abmeldung des Fahrer an, welcher als User markiert' +
                                                                                                            ' wird. Der Fahrer musste vorher abgemeldet worden sein und zwar manuell.'},
      {name: '%forceRemove1/%forceRemove2/%forceRemove3/%forceRemoveSupercup', value: 'Muss benutzt werden, falls ein Stammfahrer während der Woche zurück tritt.'},
      {name: '%forceIn1/%forceIn2/%forceIn3/%forceInSupercup @Team @User', value: 'Fügt einen Fahrer in ein freies Cockpit vom übergeben Team ein.'},
      {name: '%forceFree1/%forceFree2/%forceFree3/%forceFreeSupercup @Team', value: 'Öffnet das Cockpit für den nächsten Ersatzfahrer auf der Warteliste.'},
      {name: '%help', value: 'Der help Command kann Lösungen für einfach Probleme liefern. Dieser Command kann von jedem ausgeführt werden.'},
      {name: 'Generell' , value: 'Jeder Command muss mit einem %-Zeichen beginnen'}
    )
    .setFooter('Für weitere Fragen das Fragentool verwenden.');

    message.channel.send({ embeds : [commandListEmbed]});
  }
}