const {MessageEmbed} = require('discord.js');

// Contains every driver who is a subdriver ready to driver this race
var subPersonListSupercup = [];
// Contains all the cockpits available for this race
var freeCarsSupercup = [];
// Contains all the starters who already stepped down from their cockpit
var withdrawnDriversSupercup = [];
// Contains all the starters who won't take part and were unable to react
var driversWithdrawnPerCommandSupercup = [];
// Contains all the sub drivers ready to take part this week but were unable to react 
var driversSubInPerCommandSupercup = [];
// Contains all the subs made so far -- <K,V> = <User ID, Id of car role>
var confirmedSubsMadeSupercup = new Map();
// Contains all the subs made so far -- <K,V> = <ID of car role, User ID>
var confirmedSubsMadeInvSupercup = new Map();
// Global variable for the country the race is in
var flag = null;

// Mercedes-Team: Noryl / k.k. 
var mercedesSupercup = ['289036587159912448', '688006080109740070'];
// Red Bull-Team: Finn / Achimedes 
var redBullSupercup = ['272073232893345792', '336841703816429570'];
// Ferrari-Team: Broncos / Adman 
var ferrariSupercup = ['604645537882308609','269499201702854667']
// McLaren-Team: Kibu / Eriksen
var mcLarenSupercup = ['173416598101688320','263760051515293696']
// Aston Martin-Team: Pascalus / Hico  
var astonMartinSupercup = ['254292883492831232','442694360652447755']
// Alpine-Team: Kante / Avix  
var alpineSupercup = ['315803566591967243','671353767232274442']
// Alpha Tauri-Team: Bado / Neigo  
var alphaTauriSupercup = ['449253231621832706','311868092840017921']
// Alfa Romeo-Team: Rocket / Demiyoo  
var alfaRomeoSupercup = ['281100297051570177','356721136467443722']
// Williams-Team: Charizz / DarkNight
var williamsSupercup = ['469926134700703748','756083277512835082']
// Haas-Team: Rocky / Pala  
var haasSupercup = ['176331806839275520','265537845081407489']

// Contains the the linup -- <K,V> = <String of team name, array of drivers>
var currentLineupSupercup = new Map();
var regularDriversSupercup = new Map();

const anmeldeChannelIDSupercup = '886335395925749802'; 
const abmeldeChannelIDSupercup = '886340620845727824';  
const ersatzfahrerRolleIDSupercup = '886337399108538378';  
const stammfahrerRolleIDSupercup = '886338014429712434';  
const rennleiterRolleID = '479053658135461903'; 
const infoChannelIDSupercup = '886335348119056534'; 
const commandChannelID = '901067530012078162';
const logChannelID = '901067704499322890';
const teamsChannelID = '866950218887987221' 

const discordID = '479053264537649153';  

const mercedesRoleIDSupercup = '904761315522916434';  
const redBullRoleIDSupercup = '904762008673583134';  
const ferrariRoleIDSupercup = '904761614354505798'; 
const mcLarenRolleIDSupercup = '904762932410327101';  
const astonMartinRolleIDSupercup = '904763290712936518';   
const alpineRolleIDSupercup = '904762206988697672';  
const alphaTauriRolleIDSupercup = '904762603107123280';  
const alfaRomeoRolleIDSupercup = '904762759181381692';  
const williamsRolleIDSupercup = '904763086571986984'; 
const haasRolleIDSupercup = '904762388924997632';  


const anmeldenEmoji = '✅';
const abmeldenEmoji = '❌';

// Is the message in the channel, displaying the free cars
var freeCarMsgIDSupercup = null;
// Is the message in the channel, displaying all the sub drivers ready to race 
var waitListMsgIDSupercup = null;
// Is the linup message, displaying the lineup
var lineupMsgSupercup = null;
var reservesActivatedSupercup = false;
var currentRegularDriversSupercup = null;

let messageEmbededAnmeldenID = null;
let messageEmbededAbmeldenID = null;


/**
 * Removes a given driver from the current lineup
 * 
 * @param {GuildMember} user 
 * @param {Client} client 
 * @param {Message} message 
 */
async function removeFromCurrentLineup(user, client, message, freeCar){
  if(user.roles.cache.has(stammfahrerRolleIDSupercup)){
    if(currentLineupSupercup.get(findMainTeamString(user))[0] == user.id){
      currentLineupSupercup.get(findMainTeamString(user))[0] = 'nicht besetzt';
    }else if(currentLineupSupercup.get(findMainTeamString(user))[1] == user.id){
      currentLineupSupercup.get(findMainTeamString(user))[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }    
  } else {
    let teamID = freeCar;

    let teamNameString = await client.guilds.cache.get(discordID).roles.cache.get(teamID).name;
    
    if(currentLineupSupercup.get(teamNameString)[0] == user.id){
      currentLineupSupercup.get(teamNameString)[0] = 'nicht besetzt';
    }else if(currentLineupSupercup.get(teamNameString)[1] == user.id){
      currentLineupSupercup.get(teamNameString)[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }
    confirmedSubsMadeSupercup.delete(user.id);
    confirmedSubsMadeInvSupercup.delete(teamID);
  }
}

/**
 * Gets called if a regular driver gets back in and a sub driver has his cockpit, so they need to switch the cockpit
 * so that the regular driver gets his cockpit and the sub driver gets the neewly freed cockpit
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {int} subDriverID 
 * @param {int} carToTake 
 * @param {String} mainTeamIDString 
 * @param {int} driverToStart 
 */
async function changeLineupTripleChange(client, message, subDriverID, carToTake, mainTeamIDString, driverToStart){

  let mainTeamNameString = await client.guilds.cache.get(discordID).roles.cache.get(mainTeamIDString).name;
  
  let positionOfSubDriver;
  if(currentLineupSupercup.get(mainTeamNameString)[0] == subDriverID){
    positionOfSubDriver = 0;
  }else if(currentLineupSupercup.get(mainTeamNameString)[1] == subDriverID){
    positionOfSubDriver = 1;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Die Position von Ersatzfahrers im alten Team konnte nicht ermittelt werden -- ${date}`);
  }
  let carToTakeNameString = await client.guilds.cache.get(discordID).roles.cache.get(carToTake).name

  if(currentLineupSupercup.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupSupercup.get(carToTakeNameString)[0] = subDriverID;
  }else if(currentLineupSupercup.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupSupercup.get(carToTakeNameString)[1] = subDriverID;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Die Position von Ersatzfahrers im neuen Team konnte nicht ermittelt werden -- ${date}`);
  }

  currentLineupSupercup.get(mainTeamNameString)[positionOfSubDriver] = driverToStart;
}

/**
 * Is called if a normal change in the lineup is necessary, so the sub driver just gets the newly freed cockpit
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {int} driverToStart 
 * @param {int} carToTake 
 */
async function changeLineupNormalSub(client, message, driverToStart, carToTake){

  let carToTakeNameString = await client.guilds.cache.get(discordID).roles.cache.get(carToTake).name;
  
  if(currentLineupSupercup.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupSupercup.get(carToTakeNameString)[0] = driverToStart;
  } else  if(currentLineupSupercup.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupSupercup.get(carToTakeNameString)[1] = driverToStart;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Der Tausch im Lineup konnte nicht durchgeführt werden; Normal Sub -- ${date}`);
  }
}

/**
 * Is called if a regualr Driver goes out, another regular one goes in and he gets his spot back
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {int} driverToStart 
 * @param {int} carToTake 
 */
function changeLineupReownSpot(client, message, driverToStart, carToTake){

  let carToTakeNameString = findMainTeamString(driverToStart);

  if(currentLineupSupercup.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupSupercup.get(carToTakeNameString)[0] = driverToStart;
  } else  if(currentLineupSupercup.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupSupercup.get(carToTakeNameString)[1] = driverToStart;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Der Tausch im Lineup konnte nicht durchgeführt werden; Reown Spot-- ${date}`);
  }

}

/**
 * Regualr driver goes back in without his place beeing taken
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {int} driverToStart 
 * @param {int} carToTake 
 */
function regularDriverBackCockpitFree(client, message, driverToStart, carToTake){

  let teamNameMainDriver = findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart))

  let positionOfEmptySpot;

  if(currentLineupSupercup.get(teamNameMainDriver)[0] == 'nicht besetzt'){
    positionOfEmptySpot = 0;
  }else if(currentLineupSupercup.get(teamNameMainDriver)[1] == 'nicht besetzt'){
    positionOfEmptySpot = 1;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Die Position von Ersatzfahrers im alten Team konnte nicht ermittelt werden -- ${date}`);
  }

  currentLineupSupercup.get(teamNameMainDriver)[positionOfEmptySpot] = driverToStart;
  freeCarsSupercup.unshift(carToTake);
  freeCarsSupercup.splice(freeCarsSupercup.indexOf(client.guilds.cache.get(discordID).roles.cache.find(role => role.name == teamNameMainDriver).id),1);
}

/**
 * Just prints out the current lineup, it sets the the content, deletes the old message if there is one and displays the new message
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
async function printLineup(client, message){
    if(lineupMsgSupercup != null){
      await client.guilds.cache.get(discordID).channels.cache.get(infoChannelIDSupercup).messages.fetch(lineupMsgSupercup).then((msg) => {
         msg.delete();
      });
      let date = new Date().toLocaleString();
      console.log(`Das aktuelle Lineup wurde gelöscht -- ${date}`)
    }

    if(currentLineupSupercup.get('Mercedes Supercup')[0] && currentLineupSupercup.get('Mercedes Supercup')[1] &&
    currentLineupSupercup.get('Red Bull Supercup')[0] && currentLineupSupercup.get('Red Bull Supercup')[1] &&
    currentLineupSupercup.get('Ferrari Supercup')[0] && currentLineupSupercup.get('Ferrari Supercup')[1] &&
    currentLineupSupercup.get('McLaren Supercup')[0] && currentLineupSupercup.get('McLaren Supercup')[1] &&
    currentLineupSupercup.get('Aston Martin Supercup')[0] && currentLineupSupercup.get('Aston Martin Supercup')[1] &&
    currentLineupSupercup.get('Alpine Supercup')[0] && currentLineupSupercup.get('Alpine Supercup')[1] &&
    currentLineupSupercup.get('Alpha Tauri Supercup')[0] && currentLineupSupercup.get('Alpha Tauri Supercup')[1] &&
    currentLineupSupercup.get('Alfa Romeo Supercup')[0] && currentLineupSupercup.get('Alfa Romeo Supercup')[1] && 
    currentLineupSupercup.get('Williams Supercup')[0] && currentLineupSupercup.get('Williams Supercup')[1] &&
    currentLineupSupercup.get('Haas Supercup')[0] && currentLineupSupercup.get('Haas Supercup')[1]){

          let lineupEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Aktuelles Lineup')
          .setDescription(`Die AKTUELLEN Fahrer aller Teams für das Rennen in ${flag} sind hier aufgelistet`)
          .addFields(
            {name: 'Mercedes \<:GMercedes:505085044621180938>', value: `${setContentForLineup('Mercedes Supercup', 0)} und ${setContentForLineup('Mercedes Supercup', 1)}`},
            {name: 'Red Bull \<:GRedBull:654751184158195782>', value: `${setContentForLineup('Red Bull Supercup', 0)} und ${setContentForLineup('Red Bull Supercup', 1)}`},
            {name: 'Ferrari \<:GFerrari:505085825558773780>', value: `${setContentForLineup('Ferrari Supercup', 0)} und ${setContentForLineup('Ferrari Supercup', 1)}`},
            {name: 'McLaren \<:GMcLaren:654751856006004797>', value: `${setContentForLineup('McLaren Supercup', 0)} und ${setContentForLineup('McLaren Supercup', 1)}`},
            {name: 'Aston Martin \<:Aston:880493034171682836>', value: `${setContentForLineup('Aston Martin Supercup', 0)} und ${setContentForLineup('Aston Martin Supercup', 1)}`},
            {name: 'Alpine \<:Alpine:880493051183788052>', value: `${setContentForLineup('Alpine Supercup', 0)} und ${setContentForLineup('Alpine Supercup', 1)}`},
            {name: 'Alpha Tauri \<:alphatauri:778383962825293834>', value: `${setContentForLineup('Alpha Tauri Supercup', 0)} und ${setContentForLineup('Alpha Tauri Supercup', 1)}`},
            {name: 'Alfa Romeo \<:GAlfaRomeo:654752598213132325>', value: `${setContentForLineup('Alfa Romeo Supercup', 0)} und ${setContentForLineup('Alfa Romeo Supercup', 1)}`},
            {name: 'Williams \<:Williams:880493063225610241>', value: `${setContentForLineup('Williams Supercup', 0)} und ${setContentForLineup('Williams Supercup', 1)}`},
            {name: 'Haas \<:GHaas:654752084771733508>', value: `${setContentForLineup('Haas Supercup', 0)} und ${setContentForLineup('Haas Supercup', 1)}`}
          )


      // Sends actual Lineup
      await client.channels.cache.get(infoChannelIDSupercup).send({ embeds : [lineupEmbed]}).then((msg) => {
        lineupMsgSupercup = msg.id;
      });
    } else {
      message.reply(`Es ist etwas schiefgelaufen beim ausführen des lineup Command`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`Eines der Elemente in der Liste wurde nicht richtig definiert oder beim ausgeben des Lineups ist ein anderer Fehler ` + 
        `aufgetreten. Modifiziertes Lineup -- ${date}`);
      })
    }  
  
}

/**
 * Sets the content for the selected field of the lineup map
 * 
 * @param {String} teamName 
 * @param {int} seat 
 * @returns content for selected field
 */
function setContentForLineup(teamName, seat){
  if(currentLineupSupercup.get(teamName)[seat] == 'nicht besetzt'){
    return '<nicht besetzt>'
  } else {
    return `<@${currentLineupSupercup.get(teamName)[seat]}>`;
  }
}

/**
 * Finds out if there is the possiblity for a change, if so it changes it 
 * 
 * @param {Client} client 
 * @param {Message} message
 */
async function checkSubCanBeMade(client, message){
  if(freeCarsSupercup.length > 0 && subPersonListSupercup.length > 0){
    let driverToStart = subPersonListSupercup.shift();
    let carToTake = freeCarsSupercup.shift();

    if(!(client.guilds.cache.get(discordID).members.cache.get(driverToStart))){
      let date = new Date();
      console.log(`In Liga 2 wurde checkSubCanBeMade ausgeführt, aber der driverToStart war in irgendeiner Weise falsch. 
                  Hier die ID des driverToStart: ${driverToStart}-- ${date}`);
      return;
    }

    let date = new Date();
    console.log(`Prüfsumme für den Supercup, Methode checkSubCanBeMade. Das Auto was gerade belegt wird hat ID ${carToTake}, der 
                Fahrer der es nimmt hat die ID ${driverToStart}. Beides darf nicht null oder undefined sein. -- ${date}`);

      if(withdrawnDriversSupercup.length > 0 &&
          client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDSupercup) &&
          client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversSupercup[withdrawnDriversSupercup.length - 1]).roles.cache.has(stammfahrerRolleIDSupercup) &&
          !(client.guilds.cache.get(discordID).members.cache.get(driverToStart) == client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversSupercup[withdrawnDriversSupercup.length - 1])) &&
          checkIfCarIsFree(client, carToTake)){

        // ID Team von Stammfahrer der wieder dazu kommt
        let mainTeamNameString = findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart));

        let mainTeamIDString = null;
        client.guilds.cache.get(discordID).roles.cache.find(role => {
          if(role.name === mainTeamNameString){
            mainTeamIDString = role.id;
          }
        })

        let subDriverID = confirmedSubsMadeInvSupercup.get(mainTeamIDString);

        let subDriverToReplace = currentLineupSupercup.get(mainTeamNameString).indexOf(subDriverID);
        currentLineupSupercup.get(mainTeamNameString)[subDriverToReplace] = driverToStart;

        confirmedSubsMadeSupercup.delete(subDriverID);
        confirmedSubsMadeInvSupercup.delete(carToTake);

        confirmedSubsMadeSupercup.set(subDriverID.toString(), carToTake);
        confirmedSubsMadeInvSupercup.set(carToTake.toString(), subDriverID);

        let mainDriverEmbed = new MessageEmbed()
        .setColor('AQUA')
        .setTitle('🔄')
        .addFields(
          {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt seinen Stammplatz wieder`}
        )

        let subDriverEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('➡️')

        if(carToTake == mainTeamIDString){ 
          subDriverEmbed.addFields(
            {name: `Update im Lineup`, value: `<@${subDriverID}> bekommt den anderen <@&${carToTake}>`}
          )
        }else{
          subDriverEmbed.addFields(
            {name: `Update im Lineup`, value: `<@${subDriverID}> bekommt den <@&${carToTake}>`}
          )
        }

        await changeLineupTripleChange(client, message, subDriverID, carToTake, mainTeamIDString, driverToStart);

        await client.channels.cache.get(anmeldeChannelIDSupercup).send({embeds : [mainDriverEmbed]}).then(() => {
           client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
           client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
        });
        await client.channels.cache.get(anmeldeChannelIDSupercup).send({embeds : [subDriverEmbed]}).then(() => {
           client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
           client.guilds.cache.get(discordID).members.cache.get(subDriverID).send(`Es ergab sich eine Verschiebung im Lineup, du fährst am Wochenende ` + 
          `den  ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}`);
        });

        let date = new Date().toLocaleString();
        console.log(`${client.guilds.cache.get(discordID).members.cache.get(subDriverID).user.username} übernimmt einen ` + 
                        `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} und ` + 
                        `${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt seinen Stammplatz wieder -- ${date}`);
      } else  if(withdrawnDriversSupercup.length > 0 &&
                  !(client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDSupercup)) &&
                  client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversSupercup[withdrawnDriversSupercup.length - 1]).roles.cache.has(stammfahrerRolleIDSupercup) &&
                  checkIfCarIsFree(client, carToTake)){

        let subDriverEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('➡️')
        .addFields(
          {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt den <@&${carToTake}>`}
        );

        confirmedSubsMadeSupercup.set(driverToStart.toString(), carToTake);
        confirmedSubsMadeInvSupercup.set(carToTake.toString(), driverToStart);

        await client.channels.cache.get(anmeldeChannelIDSupercup).send({embeds : [subDriverEmbed]}).then(() => {
           client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
           client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du fährst diese Woche den ` + 
          `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
        });

        changeLineupNormalSub(client, message, driverToStart, carToTake);

        let date = new Date().toLocaleString();
        console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt` + 
                    ` den ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} -- ${date}`);
      } else if(withdrawnDriversSupercup.length > 0 &&
                client.guilds.cache.get(discordID).members.cache.get(driverToStart) == 
                client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversSupercup[withdrawnDriversSupercup.length - 1]) &&
                checkIfCarIsFree(client, carToTake)){
        
        let mainDriverEmbed = new MessageEmbed()
        .setColor('AQUA')
        .setTitle('🔄')
        .addFields(
          {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt seinen Stammplatz wieder`}
        )

        changeLineupReownSpot(client, message, driverToStart, carToTake);

        await client.channels.cache.get(anmeldeChannelIDSupercup).send({embeds : [mainDriverEmbed]}).then(() => {
           client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
           client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
        });

        let date = new Date().toLocaleString();
        console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt seinen Stammplatz wieder -- ${date}`);
      } else if(client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDSupercup) &&
                (currentLineupSupercup.get(findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart)))[0] != 'nicht besetzt' ||
                currentLineupSupercup.get(findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart)))[1] != 'nicht besetzt' )){

        let mainDriverEmbed = new MessageEmbed()
        .setColor('AQUA')
        .setTitle('🔄')
        .addFields(
          {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt seinen Stammplatz wieder`}
        )
        regularDriverBackCockpitFree(client, message, driverToStart, carToTake)
            
        await client.channels.cache.get(anmeldeChannelIDSupercup).send({embeds : [mainDriverEmbed]}).then(() => {
           client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
           client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
        });

        let date = new Date().toLocaleString();
        console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt` + 
                    ` seinen Stammplatz wieder -- ${date}`);
      } 
  }
  setWaitListMsgContent(client);
  printLineup(client, message);
}

/**
 * Finds team of the absent driver and adds it to the list of free cars
 *
 * @param {*} member 
 */
async function addCarOfWithdrawnDriverToFreeCars(member){
  if(member.roles.cache.has(mercedesRoleIDSupercup)){
    freeCarsSupercup.push(mercedesRoleIDSupercup);
  } else if(member.roles.cache.has(redBullRoleIDSupercup)){
    freeCarsSupercup.push(redBullRoleIDSupercup);
  } else if(member.roles.cache.has(ferrariRoleIDSupercup)){
    freeCarsSupercup.push(ferrariRoleIDSupercup);
  } else if(member.roles.cache.has(mcLarenRolleIDSupercup)){
    freeCarsSupercup.push(mcLarenRolleIDSupercup);
  } else if(member.roles.cache.has(astonMartinRolleIDSupercup)){
    freeCarsSupercup.push(astonMartinRolleIDSupercup);
  } else if(member.roles.cache.has(alpineRolleIDSupercup)){
    freeCarsSupercup.push(alpineRolleIDSupercup);
  } else if(member.roles.cache.has(alphaTauriRolleIDSupercup)){
    freeCarsSupercup.push(alphaTauriRolleIDSupercup);
  } else if(member.roles.cache.has(alfaRomeoRolleIDSupercup)){
    freeCarsSupercup.push(alfaRomeoRolleIDSupercup);
  } else if(member.roles.cache.has(williamsRolleIDSupercup)){
    freeCarsSupercup.push(williamsRolleIDSupercup);
  } else if(member.roles.cache.has(haasRolleIDSupercup)){
    freeCarsSupercup.push(haasRolleIDSupercup);
  } else {
    console.log('No role found');
  }
}

/**
 * Manages waitinglist. Adds and removes drivers by adjusting the messages sent, when the command is called
 * 
 * @param {*} client 
 */
async function setWaitListMsgContent(client){

  var waitListDefaultMessage = `Warteliste:`;

  for(let i = 0; i < subPersonListSupercup.length; i++){
    if(i == 0){
      waitListDefaultMessage += ` <@${subPersonListSupercup[i]}>`;
    } else {
      waitListDefaultMessage += `, <@${subPersonListSupercup[i]}>`;
    }
  }

  await client.channels.cache.get(anmeldeChannelIDSupercup).messages.fetch(waitListMsgIDSupercup).then((msg) => {
    msg.edit(waitListDefaultMessage)
  });

  var freeCarListDefaultMessage = `Freie Autos:`;

  for(let i = 0; i < freeCarsSupercup.length; i++){
    if(i == 0){
      freeCarListDefaultMessage += ` <@&${freeCarsSupercup[i]}>`;
    } else {
      freeCarListDefaultMessage += `, <@&${freeCarsSupercup[i]}>`;
    }
  }

  await client.channels.cache.get(anmeldeChannelIDSupercup).messages.fetch(freeCarMsgIDSupercup).then((msg) => {
    msg.edit(freeCarListDefaultMessage)
  });
    
}

/**
 * Adds the the drivers to the respective teams at init
 */
function setDefaultLineup(){
  
  currentLineupSupercup.set('Mercedes Supercup', []);
  currentLineupSupercup.set('Red Bull Supercup', []);
  currentLineupSupercup.set('Ferrari Supercup', []);
  currentLineupSupercup.set('McLaren Supercup', []);
  currentLineupSupercup.set('Aston Martin Supercup', []);
  currentLineupSupercup.set('Alpine Supercup', []);
  currentLineupSupercup.set('Alpha Tauri Supercup', []);
  currentLineupSupercup.set('Alfa Romeo Supercup', []);
  currentLineupSupercup.set('Williams Supercup', []);
  currentLineupSupercup.set('Haas Supercup', []);

  currentLineupSupercup.get('Mercedes Supercup').push(mercedesSupercup[0])
  currentLineupSupercup.get('Mercedes Supercup').push(mercedesSupercup[1])
  currentLineupSupercup.get('Red Bull Supercup').push(redBullSupercup[0])
  currentLineupSupercup.get('Red Bull Supercup').push(redBullSupercup[1])
  currentLineupSupercup.get('Ferrari Supercup').push(ferrariSupercup[0])
  currentLineupSupercup.get('Ferrari Supercup').push(ferrariSupercup[1])
  currentLineupSupercup.get('McLaren Supercup').push(mcLarenSupercup[0])
  currentLineupSupercup.get('McLaren Supercup').push(mcLarenSupercup[1])
  currentLineupSupercup.get('Aston Martin Supercup').push(astonMartinSupercup[0])
  currentLineupSupercup.get('Aston Martin Supercup').push(astonMartinSupercup[1])
  currentLineupSupercup.get('Alpine Supercup').push(alpineSupercup[0])
  currentLineupSupercup.get('Alpine Supercup').push(alpineSupercup[1])
  currentLineupSupercup.get('Alpha Tauri Supercup').push(alphaTauriSupercup[0])
  currentLineupSupercup.get('Alpha Tauri Supercup').push(alphaTauriSupercup[1])
  currentLineupSupercup.get('Alfa Romeo Supercup').push(alfaRomeoSupercup[0])
  currentLineupSupercup.get('Alfa Romeo Supercup').push(alfaRomeoSupercup[1])
  currentLineupSupercup.get('Williams Supercup').push(williamsSupercup[0])
  currentLineupSupercup.get('Williams Supercup').push(williamsSupercup[1])
  currentLineupSupercup.get('Haas Supercup').push(haasSupercup[0])
  currentLineupSupercup.get('Haas Supercup').push(haasSupercup[1])
  
}

/**
 * Finds the team of a given driver and returns String of the name
 * 
 * @param {Member} member 
 * @returns String of the team name
 */
function findMainTeamString(member){
  if(member.roles.cache.has(mercedesRoleIDSupercup)){
    return 'Mercedes Supercup';
  } else if(member.roles.cache.has(redBullRoleIDSupercup)){
    return 'Red Bull Supercup';
  } else if(member.roles.cache.has(ferrariRoleIDSupercup)){
    return 'Ferrari Supercup';
  } else if(member.roles.cache.has(mcLarenRolleIDSupercup)){
    return 'McLaren Supercup';
  } else if(member.roles.cache.has(astonMartinRolleIDSupercup)){
    return 'Aston Martin Supercup';
  } else if(member.roles.cache.has(alpineRolleIDSupercup)){
    return 'Alpine Supercup';
  } else if(member.roles.cache.has(alphaTauriRolleIDSupercup)){
    return 'Alpha Tauri Supercup';
  } else if(member.roles.cache.has(alfaRomeoRolleIDSupercup)){
    return 'Alfa Romeo Supercup';
  } else if(member.roles.cache.has(williamsRolleIDSupercup)){
    return 'Williams Supercup';
  } else if(member.roles.cache.has(haasRolleIDSupercup)){
    return 'Haas Supercup';
  } 
}

/**
 * Checks if the given team has at least one free cockpit and returns the according boolean
 * 
 * @param {Client} client 
 * @param {int} carToTake 
 * @returns Boolean if car is free
 */
function checkIfCarIsFree(client, carToTake){
  let teamNameString; 
  client.guilds.cache.get(discordID).roles.cache.find(role => {
    if(role.id == carToTake){
      teamNameString = role.name;             
    }
  });

  if(currentLineupSupercup.get(teamNameString)[0] == `nicht besetzt` || currentLineupSupercup.get(teamNameString)[1] == `nicht besetzt`){
    return true;
  } else {
    return false;
  }
}

/**
 * Sets all the varables to start a new race event
 * 
 * @param {Emoji} flag 
 */
function initVariables(flag){
  subPersonListSupercup = [];
  freeCarsSupercup = [];
  withdrawnDriversSupercup = [];
  driversWithdrawnPerCommandSupercup = [];
  driversSubInPerCommandSupercup = [];
  confirmedSubsMadeSupercup = new Map();
  confirmedSubsMadeInvSupercup = new Map();
  lineupMsgSupercup = null;
  reservesActivatedSupercup = false;
  return flag
}

/**
 * Clears the "Anmeldechannel" and the "Abmeldechannel" to keep the channels current
 * 
 * @param {Client} client 
 */
async function clearChannels(client){
  await client.channels.cache.get(anmeldeChannelIDSupercup).bulkDelete(100).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Der Anmelde-Channel wurde gecleart -- ${date}`)
  });
  

  await client.channels.cache.get(abmeldeChannelIDSupercup).bulkDelete(100).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Der Abmelde-Channel wurde gecleart -- ${date}`)
  });
}

/**
 * Sends all the messages to start the Bot, the wait list, the free cars and the inital lineup
 * 
 * @param {Client} client 
 */
async function sendFreeCarsWaitListDefaultLineup(client, message, flag){
  // Overall header, that with the mention of the subdrivers and the flag
  await client.channels.cache.get(anmeldeChannelIDSupercup).send(`<@&${ersatzfahrerRolleIDSupercup}> die Anmeldung für das Ligarennen in ${flag} ist hiermit eröffnet!`).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Die Anmeldung für den Supercup in ${flag} wurde eröffnet. -- ${date}`);
  });

  // Message for List of waiting drivers
  await client.channels.cache.get(anmeldeChannelIDSupercup).send(`Warteliste:`).then((msg) => {
    waitListMsgIDSupercup = msg.id;
  });     
  
  // Message for List of free cars
  await client.channels.cache.get(anmeldeChannelIDSupercup).send(`Freie Autos:`).then((msg) => {
    freeCarMsgIDSupercup = msg.id;
  })

  await printLineup(client, message);
  let date = new Date().toLocaleString();
  console.log(`Das Standard Lineup wurde gesendet -- ${date}`);
}

/**
 * Gets called if sub driver has reacted with the white checkmark on the right message and everthing else went smoothly
 * 
 * @param {Client} client 
 */
async function subDriverIn(client, driverObject, message){

  subPersonListSupercup.push(driverObject.user.id);

  // Creates the embed send in the "Anmeldechannel" if sub driver reacted
  let subInEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('➡️')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> hat sich für diese Woche angemeldet`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDSupercup).send({ embeds : [subInEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} hat sich erfolgreich angemeldet -- ${date}`);

  await checkSubCanBeMade(client, message);
}

async function regularDriverWithdraw(client, driverObject, message){

  withdrawnDriversSupercup.push(driverObject.user.id);
  await addCarOfWithdrawnDriverToFreeCars(driverObject);
  await removeFromCurrentLineup(driverObject, client, message, null);

  let withdrawnEmbed = new MessageEmbed()
    .setColor('RED')
    .setTitle('⬅️')
    .addFields(
      {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche nicht dabei`}
    )
                  
    await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDSupercup).send({ embeds : [withdrawnEmbed]}).then(() => {
       client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawnEmbed]});
    });

    let date = new Date().toLocaleString();
    console.log(`${driverObject.user.username} hat sich erfolgreich abgemeldet -- ${date}`); 

    
    await checkSubCanBeMade(client, message);
  
}

async function regularDriverRemoveWithdraw(client, driverObject, message){

  subPersonListSupercup.unshift(driverObject.user.id);
  withdrawnDriversSupercup.splice(withdrawnDriversSupercup.indexOf(driverObject.user.id), 1);

  let withdrawRemoveEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('️️️️️️️️↪')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> ist diese Woche doch dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDSupercup).send({ embeds : [withdrawRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawRemoveEmbed]});
  })

  let date = new Date().toLocaleString();
  console.log(`Die Abmeldung von ${driverObject.user.username} wurde erfolgreich zurückgenommen -- ${date}`);

  await checkSubCanBeMade(client, message);
  
}

async function subDriverRemoveSubInOnWaitlist(client, driverObject, message){

  let element = subPersonListSupercup.indexOf(driverObject.user.id);
  subPersonListSupercup.splice(element, 1);       

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDSupercup).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich von der Warteliste entfernt -- ${date}`);

  await checkSubCanBeMade(client, message);
}

async function subDriverRemoveSubInInLineup(client, driverObject, message){

  let freeCar = await findCurrentCockpitOfSub(driverObject);
  freeCarsSupercup.push(freeCar);
  await removeFromCurrentLineup(driverObject, client, message, driverObject);

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDSupercup).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich aus Lineup genommen -- ${date}`);

  await checkSubCanBeMade(client, message);
}

async function sendTeams(client){
  if(currentRegularDriversSupercup != null){
     client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).messages.fetch(currentRegularDriversSupercup).then((msg) => {
      msg.delete();
    })
  }
  regularDriversSupercup.set("Mercedes Supercup", mercedesSupercup);
  regularDriversSupercup.set("Red Bull Supercup", redBullSupercup);
  regularDriversSupercup.set("Ferrari Supercup", ferrariSupercup);
  regularDriversSupercup.set("McLaren Supercup", mcLarenSupercup);
  regularDriversSupercup.set("Aston Martin Supercup", astonMartinSupercup);
  regularDriversSupercup.set("Alpine Supercup", alpineSupercup);
  regularDriversSupercup.set("Alpha Tauri Supercup", alphaTauriSupercup);
  regularDriversSupercup.set("Alfa Romeo Supercup", alfaRomeoSupercup);
  regularDriversSupercup.set("Williams Supercup", williamsSupercup);
  regularDriversSupercup.set("Haas Supercup", haasSupercup);

  let regularDriverEmbed = new MessageEmbed()
  .setColor('YELLOW')
  .setTitle('️️️️️️️️Stammfahrer Supercup')
  .addFields(
    {name: `Mercedes Supercup`, value: `<@${regularDriversSupercup.get('Mercedes Supercup')[0]}> und <@${regularDriversSupercup.get('Mercedes Supercup')[1]}>`},
    {name: `Red Bull Supercup`, value: `<@${regularDriversSupercup.get('Red Bull Supercup')[0]}> und <@${regularDriversSupercup.get('Red Bull Supercup')[1]}>`},
    {name: `Ferrari Supercup`, value: `<@${regularDriversSupercup.get('Ferrari Supercup')[0]}> und <@${regularDriversSupercup.get('Ferrari Supercup')[1]}>`},
    {name: `McLaren Supercup`, value: `<@${regularDriversSupercup.get('McLaren Supercup')[0]}> und <@${regularDriversSupercup.get('McLaren Supercup')[1]}>`},
    {name: `Aston Martin Supercup`, value: `<@${regularDriversSupercup.get('Aston Martin Supercup')[0]}> und <@${regularDriversSupercup.get('Aston Martin Supercup')[1]}>`},
    {name: `Alpine Supercup`, value: `<@${regularDriversSupercup.get('Alpine Supercup')[0]}> und <@${regularDriversSupercup.get('Alpine Supercup')[1]}>`},
    {name: `Alpha Tauri Supercup`, value: `<@${regularDriversSupercup.get('Alpha Tauri Supercup')[0]}> und <@${regularDriversSupercup.get('Alpha Tauri Supercup')[1]}>`},
    {name: `Alfa Romeo Supercup`, value: `<@${regularDriversSupercup.get('Alfa Romeo Supercup')[0]}> und <@${regularDriversSupercup.get('Alfa Romeo Supercup')[1]}>`},
    {name: `Williams Supercup`, value: `<@${regularDriversSupercup.get('Williams Supercup')[0]}> und <@${regularDriversSupercup.get('Williams Supercup')[1]}>`},
    {name: `Haas Supercup`, value: `<@${regularDriversSupercup.get('Haas Supercup')[0]}> und <@${regularDriversSupercup.get('Haas Supercup')[1]}>`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).send({ embeds : [regularDriverEmbed]}).then((msg) => {
    currentRegularDriversSupercup = msg.id;
  })
}

async function findCurrentCockpitOfSub(driverObject){
  if(currentLineupSupercup.get('Mercedes').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Mercedes`);
    return mercedesRoleIDSupercup;
  }else if(currentLineupSupercup.get('Red Bull').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Red Bull`);
    return redBullRoleIDSupercup;
  }else if(currentLineupSupercup.get('Ferrari').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Ferrari`);
    return ferrariRoleIDSupercup;
  }else if(currentLineupSupercup.get('McLaren').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im McLaren`);
    return mcLarenRolleIDSupercup;
  }else if(currentLineupSupercup.get('Aston Martin').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Aston Martin`);
    return astonMartinRolleIDSupercup;
  }else if(currentLineupSupercup.get('Alpine').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpine`);
    return alpineRolleIDSupercup;
  }else if(currentLineupSupercup.get('Alpha Tauri').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpha Tauri`);
    return alphaTauriRolleIDSupercup;
  }else if(currentLineupSupercup.get('Alfa Romeo').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alfa Romeo`);
    return alfaRomeoRolleIDSupercup;
  }else if(currentLineupSupercup.get('Williams').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Williams`);
    return williamsRolleIDSupercup;
  }else if(currentLineupSupercup.get('Haas').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Haas`);
    return haasRolleIDSupercup;
  }
}

module.exports = {
    name: 'startsupercup',
    aliases: ['anmeldensupercup', 'abmeldensupercup', 'removeanmeldungsupercup', 'removeabmeldungsupercup', 'endsupercup'],
    description: 'Can manage driverswaps for F1 league races. Used for IRC League Supercup',
    async execute(client, message, cmd, args, Discord){
      // Starts the main command of the bot
      if(cmd === 'startsupercup' && message.member.roles.cache.has(rennleiterRolleID)){
        if(!(args[0])){
          message.reply(`Du musst das Land der Strecke als Emoji mitübergben`)
        }else{
          
          // Init block start
          flag = await initVariables(args[0]);

          await clearChannels(client);
          
          setDefaultLineup();
          await sendTeams(client);

          await sendFreeCarsWaitListDefaultLineup(client, message, flag);
          // Init block end

          let embedAnmeldung = new MessageEmbed()
          .setColor('#0064fd')
          .setTitle('Anmeldung für Ersatzfahrer')
          .setDescription(`Diese Nachricht ist NUR für Ersatzfahrer. Um euch anzumelden für das Ligarennen in ${flag} bitte mit ` +
                          `dem ✅ unter dieser Nachricht reagieren, falls ihr mitfahren wollt. Die Ersatzfahrer werden sobald ein Cockpit frei wird eingefügt` +
                          `. Wenn ihr ein Cockpit habt, kriegt ihr vom Bot eine Privatnachricht. Trotzdem bitte hin und wieder mal auf den ` +
                          `Discord schauen. Wenn ihr ein Cockpit habt wird euer Name ins Lineup, im Infochannel, eingetragen. ` +
                          `Wenn ihr doch keine Zeit habt, könnt ihr ganz einfach eure Reaktion unter dieser Nachricht wieder entfernen ` +
                          `und seid nicht mehr angemeldet. Ihr könnt NICHT im Abmelde-Channel reagieren. Bei Unklarheit bitte den %help-Command ausführen. Falls ihr nicht ` +
                          `reagieren könnt, könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch.`)
          .setFooter('Bei weiteren Fragen bitte den %help-Command ausführen');

          let embedAbmeldung = new MessageEmbed()
          .setColor('#0064fd')
          .setTitle('Abmeldung für Stammfahrer')
          .setDescription(`Diese Nachricht ist NUR für die Stammfahrer relevant. Um euch abzumelden für das Ligarennen in ${flag} bitte mit dem ❌ reagieren, falls ihr ` +
                          `nicht könnt. Falls ihr doch könnt und mitfahren wollt, also eure Abmeldung wieder zurück ziehen wollt, entfernt einfach eure ` +
                          `Reaktion unter dieser Nachricht wieder. Ihr könnt euch NICHT im Anmelde-Channel wieder anmelden. Falls ihr nicht reagieren könnt, ` +
                          `könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch.`)
          .setFooter('Bei weiteren Fragen bitte den %help-Command ausführen');
      
          
          let messageEmbededAnmelden = null
          await client.channels.cache.get(anmeldeChannelIDSupercup).send({ embeds: [embedAnmeldung] }).then((msg) => {
            messageEmbededAnmelden = msg;
            messageEmbededAnmeldenID = msg.id;
          });

          let messageEmbededAbmelden = null
          await client.channels.cache.get(abmeldeChannelIDSupercup).send({ embeds: [embedAbmeldung] }).then((msg) => {
            messageEmbededAbmelden = msg;
            messageEmbededAbmeldenID = msg.id;
          });
            
          await messageEmbededAnmelden.react(anmeldenEmoji);
          await messageEmbededAbmelden.react(abmeldenEmoji);

          const collectorSubIn = messageEmbededAnmelden.createReactionCollector({ dispose: true});

          const collectorWithdraw = messageEmbededAbmelden.createReactionCollector({ dispose: true});

          // Hinzufügen von Rolle
          collectorSubIn.on('collect', async (reaction, user) => {
            if(reaction.message.partial){
              await reaction.message.fetch();
            }
            if(reaction.partial){
              await reaction.fetch();
            }
            if(user.bot){
              return;
            }
            if(!(reaction.message.guild)){
              return;
            }
            // Anmeldevorgang
            if(reaction.message.channel.id == anmeldeChannelIDSupercup){
              // Ersatzfahrer meldet sich an
              if(reaction.emoji.name === anmeldenEmoji && !(driversSubInPerCommandSupercup.includes(user.id)) && 
                  reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDSupercup)){
                subDriverIn(client, reaction.message.guild.members.cache.get(user.id), message);
              } else if(reaction.emoji.name != anmeldenEmoji) {
                reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
              } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDSupercup))) {
                reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich anzumelden, hat aber die richtige ` +
                `Rolle nicht -- ${date}`);
              } else {
                reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl hinzugefügt -- ${date}`);
              }        
          }
          });
            // Abmeldevorgang
          collectorWithdraw.on('collect', async (reaction, user) => {
            if(reaction.message.channel.id == abmeldeChannelIDSupercup){
              if(reaction.message.partial){
                await reaction.message.fetch();
              }
              if(reaction.partial){
                await reaction.fetch();
              }
              if(user.bot){
                return;
              }
              if(!(reaction.message.guild)){
                return;
              }
              if(reaction.message.channel.id == abmeldeChannelIDSupercup){
                // Stammfahrer meldet sich ab
                if(reaction.emoji.name === abmeldenEmoji && !(driversWithdrawnPerCommandSupercup.includes(user.id)) &&
                    reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDSupercup)){
                  regularDriverWithdraw(client, reaction.message.guild.members.cache.get(user.id), message);                          
                } else if(reaction.emoji.name !== abmeldenEmoji) {
                  reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                  let date = new Date().toLocaleString();
                  console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
                } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDSupercup))) {
                  reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                  let date = new Date().toLocaleString();
                  console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich abzumelden, hat aber die richtige ` + 
                  `Rolle nicht -- ${date}`);
                } else {
                  reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                  let date = new Date().toLocaleString();
                  console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl abgemeldet -- ${date}`);
                }             
              }
            }
          });
          
          // Entfernen von Rollen
          collectorSubIn.on('remove', async (reaction, user) => {
            if(reaction.message.partial){
              await reaction.message.fetch();
            }
            if(reaction.partial){
              await reaction.fetch();
            }
            if(user.bot){
              return;
            }
            if(!(reaction.message.guild)){
              return;
            }
            // Entfernen von Anmeldung
            if(reaction.message.channel.id == anmeldeChannelIDSupercup){
              if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDSupercup)){
                if(reaction.emoji.name == anmeldenEmoji){
                  // Fahrer ist noch auf Warteliste
                  if(driversSubInPerCommandSupercup.includes(user.id)){
                    let date = new Date().toLocaleString();
                    console.log(`${user.username} wurde die Reaktion verweigert, da er per Command abgemeldet ist -- ${date}`);
                  } else {
                    if(subPersonListSupercup.includes(reaction.message.guild.members.cache.get(user.id).user.id)){
                      subDriverRemoveSubInOnWaitlist(client, reaction.message.guild.members.cache.get(user.id), message);
                    }
                  // Fahrer ist nicht mehr auf Warteliste
                    else {
                      subDriverRemoveSubInInLineup(client, reaction.message.guild.members.cache.get(user.id), message);
                    }
                  }                
                } else {
                  reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                  let date = new Date().toLocaleString();
                  console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);       
                }       
              }else {
                let date = new Date().toLocaleString();
                console.log(`Fehler beim Entfernen der Abmeldung von ${user.username} -- ${date}`);
              }
              
            }
          });  
          // Entfernen von Abmeldung
          collectorWithdraw.on('remove', async (reaction, user) => {
            if(reaction.message.channel.id == abmeldeChannelIDSupercup){
              if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDSupercup)){
                if(reaction.emoji.name == abmeldenEmoji){
                  if(!(driversWithdrawnPerCommandSupercup.includes(user.id)) && !(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDSupercup))){
                    regularDriverRemoveWithdraw(client, reaction.message.guild.members.cache.get(user.id) ,message);
                  } else if(driversWithdrawnPerCommandSupercup.includes(user.id) && !(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDSupercup))){
                    let date = new Date().toLocaleString();
                    console.log(`${user.username} wurde die Reaktion verweigert, da er schon per Command abgemeldet wurde -- ${date}`);
                  } else if(!(driversWithdrawnPerCommandSupercup.includes(user.id)) && reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDSupercup)){
                    let date = new Date().toLocaleString();
                    console.log(`Eine illegale Abmeldung von ${user.username} wurde entfernt -- ${date}`);
                  }
                }else{
                  let date = new Date().toLocaleString();
                  console.log(`Fehler beim Entfernen der Anmeldung von ${user.username} -- ${date}`);
                  return;
                }
              }
            }
          });
        }
      } 
      // Start command was typed by permissions were insufficient
      if(cmd === 'startsupercup' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply('Dieser Command kann nur von der Rennleitung ausgeführt werden').then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den start Command auszuführen hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
      
      if(cmd === 'anmeldensupercup' && message.member.roles.cache.has(rennleiterRolleID)){
        // IF executed if parameter not is defined
        // ELSE if defined
        if(!args[0]){
          message.reply('Bitte gebe den User an')
        } else{
          let markedUserID = args[0].slice(3, 21);

          let markedUserObjectSubIn = await client.guilds.cache.get(discordID).members.cache.get(markedUserID);

          if(markedUserObjectSubIn && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDSupercup))){
            message.reply(`Etwas ist schief gelaufen. Der markiert User hat nicht die richtige Rolle`).then(() => {
              let date = new Date().toLocaleString();
              console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
              `Fahrer: ${markedUserObjectSubIn.user.username} -- ${date}`);
            })  
          } else {
            let confirmMessage = await message.reply(`Bist du sicher, dass du ${args[0]} anmelden möchtest?`);
            await confirmMessage.react(anmeldenEmoji);
            await confirmMessage.react(abmeldenEmoji);
  
            const collectorConfirm = confirmMessage.createReactionCollector({ dispose: true});   

            collectorConfirm.on('collect', async (reaction, user) => {
              if(reaction.message.partial){
                await reaction.message.fetch();
              }
              if(reaction.partial){
                await reaction.fetch();
              }
              if(user.bot){
                return;
              }
              if(!(reaction.message.guild)){
                return;
              }
              if(reaction.emoji.name == anmeldenEmoji){
  
                if(markedUserObjectSubIn && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDSupercup)){                
  
                  subDriverIn(client, markedUserObjectSubIn, message);
                  driversSubInPerCommandSupercup.push(markedUserObjectSubIn.user.id);

                  await confirmMessage.delete();
                              
                }else{
                  message.reply(`Etwas ist schief gelaufen. Stelle sicher, dass du den Command in der Form: %anmelden1 @Usertag ausgeführt hast`).then(() => {
                    let date = new Date().toLocaleString();
                    console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Das Userobjekt war wahrscheinlich ` + 
                    `entweder undefiniert oder null -- ${date}`);
                  })  
                }
              } else if(reaction.emoji.name == abmeldenEmoji){
                await client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                  let date = new Date().toLocaleString();
                  console.log(`Der manuelle Anmeldeprozess wurde gestartet und abgebrochen -- ${date}`)
                });
                await confirmMessage.delete();
              } else {
                await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then((msg) => {
                  let date = new Date().toLocaleString();
                  console.log(`Der manuelle Abmeldeprozess wurde gestartet und es wurde mit dem flaschen Emoji reagiert -- ${date}`);
                })
              }
            })
          }
        }
      }
      if(cmd === 'anmeldensupercup' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der anmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den anmelden Command auszuführen, hat aber `+ 
          `keine Berechtigung dafür -- ${date}`);
        })
      }
      if(cmd === 'abmeldensupercup' && message.member.roles.cache.has(rennleiterRolleID)){
        // IF executed if parameter not is defined
        // ELSE if defined
        if(!args[0]){
          message.reply('Bitte gebe den User an')
        }else{
          let markedUserID = args[0].slice(3, 21);

          let markedUserObjectWithdraw = client.guilds.cache.get(discordID).members.cache.get(markedUserID);

          if(markedUserObjectWithdraw && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDSupercup))){
            message.reply(`Etwas ist schief gelaufen. Der markiert User hat nicht die richtige Rolle`).then(() => {
              let date = new Date().toLocaleString();
              console.log(`Es ist etwas schiefgelaufen beim abmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
              `Fahrer: ${markedUserObjectWithdraw.user.username} -- ${date}`);
            })  
          } else {

            let confirmMessage = await message.reply(`Bist du sicher, dass du ${args[0]} anmelden möchtest?`);
            await confirmMessage.react(anmeldenEmoji);
            await confirmMessage.react(abmeldenEmoji);
  
            const collectorConfirm = confirmMessage.createReactionCollector({ dispose: true});   

            collectorConfirm.on('collect', async (reaction, user) => {
              if(reaction.message.partial){
                await reaction.message.fetch();
              }
              if(reaction.partial){
                await reaction.fetch();
              }
              if(user.bot){
                return;
              }
              if(!(reaction.message.guild)){
                return;
              }
              if(reaction.emoji.name == anmeldenEmoji){
         
                if(markedUserObjectWithdraw && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDSupercup)){
                
                  regularDriverWithdraw(client, markedUserObjectWithdraw, message);          
                  driversWithdrawnPerCommandSupercup.push(markedUserObjectWithdraw.user.id);      
                  
                  await confirmMessage.delete();
                  
                } else {
                  message.reply(`Etwas ist schief gelaufen. Stelle sicher, dass du den Command in der Form: %abmelden1 @Usertag ausgeführt hast`).then(() => {
                    let date = new Date().toLocaleString();
                    console.log(`Es ist etwas schiefgelaufen beim abmelden Command. Das Userobjekt war entweder undefiniert oder null -- ${date}`);
                  })
                }
              }
            })
          }
        }
      }
      if(cmd === 'abmeldensupercup' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeabmeldungsupercup' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeanmeldungsupercup' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeanmeldungsupercup' && (message.member.roles.cache.has(rennleiterRolleID))){
        if(!args[0]){
          message.reply('Bitte gebe den User an')
        }else{

          let markedUserIDSubInRemove = args[0].slice(3, 21);

          let markedUserObjectSubInRemove = null;
            client.guilds.cache.get(discordID).members.cache.find(member => {
            // Finds the whole object of the member given in message
            if(member.id === markedUserIDSubInRemove){
              markedUserObjectSubInRemove = member;
            }
          })

          if(markedUserObjectSubInRemove.roles.cache.has(ersatzfahrerRolleIDSupercup)){
            let confirmMessage = await message.channel.send(`Bist du sicher, dass du die Abmeldung von ${args[0]} zurück nehmen möchtest?`);
            await confirmMessage.react(anmeldenEmoji);
            await confirmMessage.react(abmeldenEmoji);

            const collectorConfirm = confirmMessage.createReactionCollector({ dispose: true});

            collectorConfirm.on('collect', async (reaction, user) => {
              if(reaction.message.partial){
                await reaction.message.fetch();
              }
              if(reaction.partial){
                await reaction.fetch();
              }
              if(user.bot){
                return;
              }
              if(!(reaction.message.guild)){
                return;
              }
              if(reaction.emoji.name == anmeldenEmoji){
                if(subPersonListSupercup.includes(markedUserObjectSubInRemove.user.id)){
                  
                  subDriverRemoveSubInOnWaitlist(client, markedUserObjectSubInRemove, message);
                  driversSubInPerCommandSupercup.splice(driversSubInPerCommandSupercup.indexOf(markedUserObjectSubInRemove.user.id), 1);

                } else if(!(subPersonListSupercup.includes(markedUserObjectSubInRemove.user.id))){
                  
                  subDriverRemoveSubInInLineup(client, markedUserObjectSubInRemove, message);
                  driversSubInPerCommandSupercup.splice(driversSubInPerCommandSupercup.indexOf(markedUserObjectSubInRemove.user.id), 1);

                } else {
                  let date = new Date().toLocaleString();
                  console.log(`${markedUserObjectSubInRemove.user.username} Es ist ein Fehler aufgetreten beim Versuch einen Fahrer wieder abzumelden -- ${date}`);
                }
                await confirmMessage.delete();
              
              } else if(reaction.emoji.name == abmeldenEmoji){
                confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                  let date = new Date().toLocaleString();
                  console.log(`Der manuelle Anmeldeentfernungsprozess wurde gestartet und abgebrochen -- ${date}`)
                });
                await confirmMessage.delete();
              } else {
                confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                  let date = new Date().toLocaleString();
                  console.log(`Der manuelle Abmeldeprozess wurde gestartet und es wurde mit dem falschen Emoji reagiert -- ${date}`)
                  reaction.users.remove(user.id);
                })
              }
            })
          }
        }
      }

      if(cmd === 'removeabmeldungsupercup' && message.member.roles.cache.has(rennleiterRolleID)){

        if(!args[0]){
          message.reply('Bitte gebe den User an')
        }else{

          let confirmMessage = await message.channel.send(`Bist du sicher, dass du die Abmeldung von ${args[0]} zurück nehmen möchtest?`);
          await confirmMessage.react(anmeldenEmoji);
          await confirmMessage.react(abmeldenEmoji);

          const collectorConfirm = confirmMessage.createReactionCollector({ dispose: true});

          collectorConfirm.on('collect', async (reaction, user) => {
            if(reaction.message.partial){
              await reaction.message.fetch();
            }
            if(reaction.partial){
              await reaction.fetch();
            }
            if(user.bot){
              return;
            }
            if(!(reaction.message.guild)){
              return;
            }
            if(reaction.emoji.name == anmeldenEmoji){

              
              let markedUserIDRemove = args[0].slice(3, 21);

              let markedUserObjectWithdrawRemove = null;
              client.guilds.cache.get(discordID).members.cache.find(member => {
                // Finds the whole object of the member given in message
                if(member.id === markedUserIDRemove){
                  markedUserObjectWithdrawRemove = member;
                }
              })

              if(markedUserObjectWithdrawRemove.roles.cache.has(stammfahrerRolleIDSupercup)){

                regularDriverRemoveWithdraw(client, markedUserObjectWithdrawRemove, message);
                driversWithdrawnPerCommandSupercup.splice(driversWithdrawnPerCommandSupercup.indexOf(markedUserObjectWithdrawRemove.user.id), 1);                
                await confirmMessage.delete();

              } else {
                message.reply('Fahrer braucht die Supercup-Stammfahrerrolle');
              }
            }else if(reaction.emoji.name == abmeldenEmoji){
              confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                let date = new Date().toLocaleString();
                console.log(`Der manuelle Abmeldungsentfernungsprozess wurde gestartet und abgebrochen -- ${date}`)
              });
              await confirmMessage.delete();
            } else {
              confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                let date = new Date().toLocaleString();
                console.log(`Der manuelle Abmeldeprozess wurde gestartet und es wurde mit dem falschen Emoji reagiert -- ${date}`)
                reaction.users.remove(user.id);
              })
            }
          })
        }
      }

      if(cmd == 'endsupercup' && message.member.roles.cache.has(rennleiterRolleID)){
        await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDSupercup).messages.fetch(messageEmbededAnmeldenID).then((msg) => {
          msg.delete();
        });
  
        await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDSupercup).send(`Die Anmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
          console.log(`Die Anmeldung im Supercup wurde beendet`);
        })
  
        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDSupercup).messages.fetch(messageEmbededAbmeldenID).then((msg) => {
          msg.delete();
        });
  
        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDSupercup).send(`Die Abmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
          console.log(`Die Abmeldung im Supercup wurde beendet`);
        })
      }
  
      if(cmd == 'endsupercup' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
    }
  
}
