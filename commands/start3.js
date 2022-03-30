const {MessageEmbed} = require('discord.js');

// contains all drivers who are on the waitlist, waiting fpr a car to free up for this event and had the "Ersatzfahrer"-role
var subPersonListLiga3 = [];

var subPersonListReinstatedDriversLiga3 = [];
// contains all cars who are free at this moment for the current event
var freeCarsLiga3 = [];
// contains all drivers who have already stepped down from their regular cockpit for this week
var withdrawnDriversLiga3 = [];
// contains all drivers who the "Ligaleiter" made step down from their cockpit because they couldnt
var driversWithdrawnPerCommandLiga3 = [];
var driversSubInPerCommandLiga3 = [];
var confirmedSubsMadeLiga3 = new Map();
var confirmedSubsMadeInvLiga3 = new Map();
var flag = null;

// Mercedes-Team: Duffy / Ghostvali 
var mercedesDriversLiga3 = ['345671793924767754', '650625652407402496'];
// Red Bull-Team: fire(AVIX) / Tim White  
var redBullDriversLiga3 = ['671353767232274442', '653676539174453258'];
// Ferrari-Team: arango / faxbxo 
var ferrariDriversLiga3 = ['645299363375087616','480222830466695180'];
// McLaren-Team: Delacium / Matters 
var mcLarenDriversLiga3 = ['689532105029713943','339842173065232387'];
// Aston Martin-Team: Jojo / Tobii  
var astonMartinDriversLiga3 = ['695583838042325042','470950121564143616'];
// Alpine-Team: Shepard / rdck  
var alpineDriversLiga3 = ['636122554796474368','336169879013163008'];
// Alpha Tauri-Team: Fleischwolf / Klaus 
var alphaTauriDriversLiga3 = ['598253459216662634','595695198596759593'];
// Alfa Romeo-Team: frosti / josia  
var alfaRomeoDriversLiga3 = ['663084750256209950','469239617590132737'];
// Williams-Team: Demiyoo / Martin 
var williamsDriversLiga3 = ['356721136467443722','268398200749031425'];
// Haas-Team: Frosdedje / Vaskoo  
var haasDriversLiga3 = ['245617912436490241','251905736529936384'];

var currentLineupLiga3 = new Map();
var regularDrivers = new Map();

const anmeldeChannelIDLiga3 = '857673238100574228'; 
const abmeldeChannelIDLiga3 = '857673345347485747'; 
const infoChannelIDLiga3 = '871758332061446214'; 
const commandChannelID = '901067530012078162';
const logChannelID = '901067704499322890';  
const teamsChannelID = '866950218887987221';

const discordID = '479053264537649153'; 

const ersatzfahrerRolleIDLiga3 = '843567323981938770';  
const wartelisteRolleIDLiga3 = '869931237177954365';
const stammfahrerRolleIDLiga3 = '843566505840214016';  
const rennleiterRolleID = '479053658135461903'; 
const ersatzfahrerRolleIDLiga2 = '734888172097503323';
const fahrerF1RolleID = '587695833428787240';
const ehemaligerFahrerRolleID = '587697224561983516';

const mercedesRoleIDLiga3 = '656098815492882432';  
const redBullRoleIDLiga3 = '656098821289541633';  
const ferrariRoleIDLiga3 = '656098818290483201'; 
const mcLarenRoleIDLiga3 = '656098834878824469';  
const astonMartinRoleIDLiga3 = '656104213893611522';   
const alpineRoleIDLiga3 = '656098824074428416';  
const alphaTauriRoleIDLiga3 = '656098829497532417';  
const alfaRomeoRoleIDLiga3 = '656098832052125698';  
const williamsRoleIDLiga3 = '656098837965963274'; 
const haasRoleIDLiga3 = '656098826427432963';  

const anmeldenEmoji = '✅';
const abmeldenEmoji = '❌';

var freeCarMsgIDLiga3 = null;
var waitListMsgIDLiga3 = null;
var msgLineupLiga3 = null;
var reservesActivatedLiga3 = false;
var currentRegularDrivers = null;

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
  if(user.roles.cache.has(stammfahrerRolleIDLiga3)){
    if(currentLineupLiga3.get(findMainTeamString(user))[0] == user.id){
      currentLineupLiga3.get(findMainTeamString(user))[0] = 'nicht besetzt';
    }else if(currentLineupLiga3.get(findMainTeamString(user))[1] == user.id){
      currentLineupLiga3.get(findMainTeamString(user))[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }
  } else {
    let teamID = freeCar;

    let teamNameString = await client.guilds.cache.get(discordID).roles.cache.get(teamID).name;

    let date = new Date();
    console.log(`Prüfsumme für das Entfernen eines Autos aus dem Lineup (removeFromCurrentLineup) in Liga 3
                die ID des Teams welches zu Entfernen war ist ${teamID}. Darf nicht null sein -- ${date}`)

    if(!(teamID)){
      let date = new Date();
      console.log(`In Liga 3 war die TeamID bei einem removeFromCurrentLineup null oder undefined -- ${date}`);
      return;
    }

    if(currentLineupLiga3.get(teamNameString)[0] == user.id){
      currentLineupLiga3.get(teamNameString)[0] = 'nicht besetzt';
    }else if(currentLineupLiga3.get(teamNameString)[1] == user.id){
      currentLineupLiga3.get(teamNameString)[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }
    confirmedSubsMadeLiga3.delete(user.id);
    confirmedSubsMadeInvLiga3.delete(teamID);
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

  if(currentLineupLiga3.get(mainTeamNameString)[0] == subDriverID){
    positionOfSubDriver = 0;
  }else if(currentLineupLiga3.get(mainTeamNameString)[1] == subDriverID){
    positionOfSubDriver = 1;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Die Position von Ersatzfahrers im alten Team konnte nicht ermittelt werden -- ${date}`);
  }

  let carToTakeNameString;
  client.guilds.cache.get(discordID).roles.cache.find(role => {
    if(role.id == carToTake){
      carToTakeNameString = role.name;             
    }
  });

  if(currentLineupLiga3.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupLiga3.get(carToTakeNameString)[0] = subDriverID;
  }else if(currentLineupLiga3.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupLiga3.get(carToTakeNameString)[1] = subDriverID;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Die Position von Ersatzfahrers im neuen Team konnte nicht ermittelt werden -- ${date}`);
  }

  currentLineupLiga3.get(mainTeamNameString)[positionOfSubDriver] = driverToStart;
}

/**
 * Is called if a normal change in the lineup is necessary, so the sub driver just gets the newly freed cockpit
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {int} driverToStart 
 * @param {int} carToTake 
 */
function changeLineupNormalSub(client, message, driverToStart, carToTake){

  let carToTakeNameString = client.guilds.cache.get(discordID).roles.cache.get(carToTake).name;

  if(currentLineupLiga3.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupLiga3.get(carToTakeNameString)[0] = driverToStart;
  } else  if(currentLineupLiga3.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupLiga3.get(carToTakeNameString)[1] = driverToStart;
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

  let carToTakeNameString = client.guilds.cache.get(discordID).roles.cache.get(carToTake).name;
  

  if(currentLineupLiga3.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupLiga3.get(carToTakeNameString)[0] = driverToStart;
  } else  if(currentLineupLiga3.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupLiga3.get(carToTakeNameString)[1] = driverToStart;
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

  if(currentLineupLiga3.get(teamNameMainDriver)[0] == 'nicht besetzt'){
    positionOfEmptySpot = 0;
  }else if(currentLineupLiga3.get(teamNameMainDriver)[1] == 'nicht besetzt'){
    positionOfEmptySpot = 1;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Die Position von Ersatzfahrers im alten Team konnte nicht ermittelt werden -- ${date}`);
  }

  currentLineupLiga3.get(teamNameMainDriver)[positionOfEmptySpot] = driverToStart;
  freeCarsLiga3.unshift(carToTake);
  freeCarsLiga3.splice(freeCarsLiga3.indexOf(client.guilds.cache.get(discordID).roles.cache.find(role => role.name == teamNameMainDriver).id),1);
}

function changeLineupAfterForceOpen(client, message, driverToStart, carToTake, positionForForce){
  currentLineupLiga3.get(findMainTeamString(carToTake))[positionForForce] = driverToStart;
}

function changeLineupAfterForceDedicated(client, message, driverToStart, carToTake, positionForForce){
  currentLineupLiga3.get(carToTake)[positionForForce] = driverToStart;
}

/**
 * Just prints out the current lineup, it sets the the content, deletes the old message if there is one and displays the new message
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
async function printLineup(client, message){
    if(msgLineupLiga3 != null){
      await client.guilds.cache.get(discordID).channels.cache.get(infoChannelIDLiga3).messages.fetch(msgLineupLiga3).then((msg) => {
         msg.delete();
      });
      let date = new Date().toLocaleString();
      console.log(`Das aktuelle Lineup wurde gelöscht -- ${date}`)
    }

    if(currentLineupLiga3.get('Mercedes')[0] && currentLineupLiga3.get('Mercedes')[1] &&
    currentLineupLiga3.get('Red Bull')[0] && currentLineupLiga3.get('Red Bull')[1] &&
    currentLineupLiga3.get('Ferrari')[0] && currentLineupLiga3.get('Ferrari')[1] &&
    currentLineupLiga3.get('McLaren')[0] && currentLineupLiga3.get('McLaren')[1] &&
    currentLineupLiga3.get('Aston Martin')[0] && currentLineupLiga3.get('Aston Martin')[1] &&
    currentLineupLiga3.get('Alpine')[0] && currentLineupLiga3.get('Alpine')[1] &&
    currentLineupLiga3.get('Alpha Tauri')[0] && currentLineupLiga3.get('Alpha Tauri')[1] &&
    currentLineupLiga3.get('Alfa Romeo')[0] && currentLineupLiga3.get('Alfa Romeo')[1] && 
    currentLineupLiga3.get('Williams')[0] && currentLineupLiga3.get('Williams')[1] &&
    currentLineupLiga3.get('Haas')[0] && currentLineupLiga3.get('Haas')[1]){

      let lineupEmbed = new MessageEmbed()
      .setColor('#fd5100')
      .setTitle('Aktuelles Lineup')
      .setDescription(`Die AKTUELLEN Fahrer aller Teams für das Rennen in ${flag} sind hier aufgelistet`)
      .addFields(
        {name: 'Mercedes \<:GMercedes:505085044621180938>', value: `${setContentForLineup('Mercedes', 0)} und ${setContentForLineup('Mercedes', 1)}`},
        {name: 'Red Bull \<:GRedBull:654751184158195782>', value: `${setContentForLineup('Red Bull', 0)} und ${setContentForLineup('Red Bull', 1)}`},
        {name: 'Ferrari \<:GFerrari:505085825558773780>', value: `${setContentForLineup('Ferrari', 0)} und ${setContentForLineup('Ferrari', 1)}`},
        {name: 'McLaren \<:GMcLaren:654751856006004797>', value: `${setContentForLineup('McLaren', 0)} und ${setContentForLineup('McLaren', 1)}`},
        {name: 'Aston Martin \<:Aston:880493034171682836>', value: `${setContentForLineup('Aston Martin', 0)} und ${setContentForLineup('Aston Martin', 1)}`},
        {name: 'Alpine \<:Alpine:880493051183788052>', value: `${setContentForLineup('Alpine', 0)} und ${setContentForLineup('Alpine', 1)}`},
        {name: 'Alpha Tauri \<:alphatauri:778383962825293834>', value: `${setContentForLineup('Alpha Tauri', 0)} und ${setContentForLineup('Alpha Tauri', 1)}`},
        {name: 'Alfa Romeo \<:GAlfaRomeo:654752598213132325>', value: `${setContentForLineup('Alfa Romeo', 0)} und ${setContentForLineup('Alfa Romeo', 1)}`},
        {name: 'Williams \<:Williams:880493063225610241>', value: `${setContentForLineup('Williams', 0)} und ${setContentForLineup('Williams', 1)}`},
        {name: 'Haas \<:GHaas:654752084771733508>', value: `${setContentForLineup('Haas', 0)} und ${setContentForLineup('Haas', 1)}`}
      )

      let date = new Date().toLocaleString();   
      console.log(`Das aktuelle Lineup wurde gesendet -- ${date}`)
    
      // Sends actual Lineup
      await client.channels.cache.get(infoChannelIDLiga3).send({ embeds : [lineupEmbed]}).then((msg) => {
        msgLineupLiga3 = msg.id;
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
  if(currentLineupLiga3.get(teamName)[seat] == 'nicht besetzt'){
    return '<nicht besetzt>'
  } else {
    return `<@${currentLineupLiga3.get(teamName)[seat]}>`;
  }
}

/**
 * Finds out if there is the possiblity for a change, if so it changes it 
 * 
 * @param {Client} client 
 * @param {Message} message
 */
async function checkSubCanBeMade(client, message, fromForceRemove, positionForForce, driverForForce, carForForce){
  if(freeCarsLiga3.length > 0 && ((subPersonListLiga3.length + subPersonListReinstatedDriversLiga3.length) > 0)){
    let driverToStart = null;
    if(subPersonListReinstatedDriversLiga3.length > 0){
      driverToStart = subPersonListReinstatedDriversLiga3.shift();
    } else {
      driverToStart = subPersonListLiga3.shift();
    } 
    let carToTake = freeCarsLiga3.shift();

    if(!(client.guilds.cache.get(discordID).members.cache.get(driverToStart))){
      let date = new Date();
      console.log(`In Liga 3 wurde checkSubCanBeMade ausgeführt, aber der driverToStart war in irgendeiner Weise falsch. 
                  Hier die ID des driverToStart: ${driverToStart}-- ${date}`);
      return
    }

    let date = new Date();
    console.log(`Prüfsumme für Liga 3, Methode checkSubCanBeMade. Das Auto was gerade belegt wird hat ID ${carToTake}, der 
                Fahrer der es nimmt hat die ID ${driverToStart}. Beides darf nicht null oder undefined sein. -- ${date}`);

    if(withdrawnDriversLiga3.length > 0 && !fromForceRemove &&
      client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDLiga3) &&
      client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversLiga3[withdrawnDriversLiga3.length - 1]).roles.cache.has(stammfahrerRolleIDLiga3) &&
      currentLineupLiga3.get(findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart)))[0] != 'nicht besetzt' && 
      currentLineupLiga3.get(findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart)))[1] != 'nicht besetzt' &&
      checkIfCarIsFree(client, carToTake)){
        // ID Team von Stammfahrer der wieder dazu kommt
      let mainTeamNameString = findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart));

      let mainTeamIDString = null;
      client.guilds.cache.get(discordID).roles.cache.find(role => {
        if(role.name === mainTeamNameString){
          mainTeamIDString = role.id;
        }
      })

      let subDriverID = confirmedSubsMadeInvLiga3.get(mainTeamIDString);
      let subDriverToReplace = currentLineupLiga3.get(mainTeamNameString).indexOf(subDriverID);
      currentLineupLiga3.get(mainTeamNameString)[subDriverToReplace] = driverToStart;

      confirmedSubsMadeLiga3.delete(subDriverID);
      confirmedSubsMadeInvLiga3.delete(carToTake);

      confirmedSubsMadeLiga3.set(subDriverID.toString(), carToTake);
      confirmedSubsMadeInvLiga3.set(carToTake.toString(), subDriverID);

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

      changeLineupTripleChange(client, message, subDriverID, carToTake, mainTeamIDString, driverToStart);

      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [mainDriverEmbed]}).then(() => {
         client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
         client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
      });
      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [subDriverEmbed]}).then(() => {
         client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
         client.guilds.cache.get(discordID).members.cache.get(subDriverID).send(`Es ergab sich eine Verschiebung im Lineup, du fährst am Wochenende ` + 
        `den ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}`);
      });

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(subDriverID).user.username} übernimmt einen ` + 
                      `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} und ` + 
                      `${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt seinen Stammplatz wieder -- ${date}`);
    } else  if(withdrawnDriversLiga3.length > 0 && !fromForceRemove &&
    !(client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDLiga3)) &&
    client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversLiga3[withdrawnDriversLiga3.length - 1]).roles.cache.has(stammfahrerRolleIDLiga3) &&
    checkIfCarIsFree(client, carToTake)){

      let subDriverEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('➡️')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt den <@&${carToTake}>`}
      );

      confirmedSubsMadeLiga3.set(driverToStart.toString(), carToTake);
      confirmedSubsMadeInvLiga3.set(carToTake.toString(), driverToStart);

      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [subDriverEmbed]}).then(() => {
         client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
         client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du fährst diese Woche den ` + 
        `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
      });

      changeLineupNormalSub(client, message, driverToStart, carToTake);

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt` + 
                  ` den ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} -- ${date}`);
    } else if(withdrawnDriversLiga3.length > 0 && !fromForceRemove &&
    client.guilds.cache.get(discordID).members.cache.get(driverToStart) == 
    client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversLiga3[withdrawnDriversLiga3.length - 1]) &&
    checkIfCarIsFree(client, carToTake)){
        
      let mainDriverEmbed = new MessageEmbed()
      .setColor('AQUA')
      .setTitle('🔄')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt seinen Stammplatz wieder`}
      )

      changeLineupReownSpot(client, message, driverToStart, carToTake);

      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [mainDriverEmbed]}).then(() => {
         client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
         client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
      });

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt seinen Stammplatz wieder -- ${date}`);
    } else if(client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDLiga3) && !fromForceRemove &&
    (currentLineupLiga3.get(findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart)))[0] != 'nicht besetzt' ||
    currentLineupLiga3.get(findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart)))[1] != 'nicht besetzt' )){

      let mainDriverEmbed = new MessageEmbed()
      .setColor('AQUA')
      .setTitle('🔄')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt seinen Stammplatz wieder`}
      )
      regularDriverBackCockpitFree(client, message, driverToStart, carToTake);
            
      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [mainDriverEmbed]}).then(() => {
         client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
         client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
      });

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt` + 
                  ` seinen Stammplatz wieder -- ${date}`);
    }  else if((client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDLiga3) ||
                  client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(ersatzfahrerRolleIDLiga3) ||
                  client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(wartelisteRolleIDLiga3))
                  && withdrawnDriversLiga3.length == 0 && !fromForceRemove){

      let subDriverEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('➡️')
      .addFields(
      {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt den <@&${carToTake}>`}
      );

      confirmedSubsMade.set(driverToStart.toString(), carToTake);
      confirmedSubsMadeInv.set(carToTake.toString(), driverToStart);

      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [subDriverEmbed]}).then(() => {
      client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
      client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du fährst diese Woche den ` + 
      `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
      });

      changeLineupNormalSub(client, message, driverToStart, carToTake);

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt` + 
              ` den ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} -- ${date}`);

    } else if(fromForceRemove && driverForForce == null && carForForce == null){
      let subDriverEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('➡️')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt den <@&${carToTake}>`}
      );

      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [subDriverEmbed]}).then(() => {
        client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
        client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du fährst diese Woche den ` + 
        `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
      });

      changeLineupAfterForceOpen(client, message, driverToStart, carToTake, positionForForce);

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt` + 
                  ` den ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} -- ${date}`);
    }
  } else {
    if(fromForceRemove && driverForForce != null && carForForce != null){
      let subDriverEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('➡️')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverForForce}> bekommt den ${carForForce}`}
      );

      await client.channels.cache.get(anmeldeChannelIDLiga3).send({embeds : [subDriverEmbed]}).then(() => {
        client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
        client.guilds.cache.get(discordID).members.cache.get(driverForForce).send(`Gute Nachrichten, du fährst diese Woche den ` + 
        `${(carForForce)}! Viel Glück beim Rennen 🍀`);
      });

      changeLineupAfterForceDedicated(client, message, driverForForce, carForForce, positionForForce);

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverForForce).user.username} bekommt` + 
                  ` den ${carForForce} -- ${date}`);
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
  if(member.roles.cache.has(mercedesRoleIDLiga3)){
    freeCarsLiga3.push(mercedesRoleIDLiga3);
  } else if(member.roles.cache.has(redBullRoleIDLiga3)){
    freeCarsLiga3.push(redBullRoleIDLiga3);
  } else if(member.roles.cache.has(ferrariRoleIDLiga3)){
    freeCarsLiga3.push(ferrariRoleIDLiga3);
  } else if(member.roles.cache.has(mcLarenRoleIDLiga3)){
    freeCarsLiga3.push(mcLarenRoleIDLiga3);
  } else if(member.roles.cache.has(astonMartinRoleIDLiga3)){
    freeCarsLiga3.push(astonMartinRoleIDLiga3);
  } else if(member.roles.cache.has(alpineRoleIDLiga3)){
    freeCarsLiga3.push(alpineRoleIDLiga3);
  } else if(member.roles.cache.has(alphaTauriRoleIDLiga3)){
    freeCarsLiga3.push(alphaTauriRoleIDLiga3);
  } else if(member.roles.cache.has(alfaRomeoRoleIDLiga3)){
    freeCarsLiga3.push(alfaRomeoRoleIDLiga3);
  } else if(member.roles.cache.has(williamsRoleIDLiga3)){
    freeCarsLiga3.push(williamsRoleIDLiga3);
  } else if(member.roles.cache.has(haasRoleIDLiga3)){
    freeCarsLiga3.push(haasRoleIDLiga3);
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

  var waitListContent = subPersonListReinstatedDriversLiga3.concat(subPersonListLiga3);

  var waitListDefaultMessage = `Warteliste:`;

  for(let i = 0; i < waitListContent.length; i++){
    if(i == 0){
      waitListDefaultMessage += ` <@${waitListContent[i]}>`;
    } else {
      waitListDefaultMessage += `, <@${waitListContent[i]}>`;
    }
  }

  await client.channels.cache.get(anmeldeChannelIDLiga3).messages.fetch(waitListMsgIDLiga3).then((msg) => {
     msg.edit(waitListDefaultMessage);
  });

  var freeCarListDefaultMessage = `Freie Autos:`;

  for(let i = 0; i < freeCarsLiga3.length; i++){
    if(i == 0){
      freeCarListDefaultMessage += ` <@&${freeCarsLiga3[i]}>`;
    } else {
      freeCarListDefaultMessage += `, <@&${freeCarsLiga3[i]}>`;
    }
  }

  await client.channels.cache.get(anmeldeChannelIDLiga3).messages.fetch(freeCarMsgIDLiga3).then((msg) => {
     msg.edit(freeCarListDefaultMessage);
  });
    
  

}

/**
 * Adds the the drivers to the respective teams at init
 */
function setDefaultLineup(){
  
  currentLineupLiga3.set("Mercedes", []);
  currentLineupLiga3.set("Red Bull", []);
  currentLineupLiga3.set("Ferrari", []);
  currentLineupLiga3.set("McLaren", []);
  currentLineupLiga3.set("Aston Martin", []);
  currentLineupLiga3.set("Alpine", []);
  currentLineupLiga3.set("Alpha Tauri", []);
  currentLineupLiga3.set("Alfa Romeo", []);
  currentLineupLiga3.set("Williams", []);
  currentLineupLiga3.set("Haas", []);

  currentLineupLiga3.get('Mercedes').push(mercedesDriversLiga3[0]);
  currentLineupLiga3.get('Mercedes').push(mercedesDriversLiga3[1]);
  currentLineupLiga3.get('Red Bull').push(redBullDriversLiga3[0]);
  currentLineupLiga3.get('Red Bull').push(redBullDriversLiga3[1]);
  currentLineupLiga3.get('Ferrari').push(ferrariDriversLiga3[0]);
  currentLineupLiga3.get('Ferrari').push(ferrariDriversLiga3[1]);
  currentLineupLiga3.get('McLaren').push(mcLarenDriversLiga3[0]);
  currentLineupLiga3.get('McLaren').push(mcLarenDriversLiga3[1]);
  currentLineupLiga3.get('Aston Martin').push(astonMartinDriversLiga3[0]);
  currentLineupLiga3.get('Aston Martin').push(astonMartinDriversLiga3[1]);
  currentLineupLiga3.get('Alpine').push(alpineDriversLiga3[0]);
  currentLineupLiga3.get('Alpine').push(alpineDriversLiga3[1]);
  currentLineupLiga3.get('Alpha Tauri').push(alphaTauriDriversLiga3[0]);
  currentLineupLiga3.get('Alpha Tauri').push(alphaTauriDriversLiga3[1]);
  currentLineupLiga3.get('Alfa Romeo').push(alfaRomeoDriversLiga3[0]);
  currentLineupLiga3.get('Alfa Romeo').push(alfaRomeoDriversLiga3[1]);
  currentLineupLiga3.get('Williams').push(williamsDriversLiga3[0]);
  currentLineupLiga3.get('Williams').push(williamsDriversLiga3[1]);
  currentLineupLiga3.get('Haas').push(haasDriversLiga3[0]);
  currentLineupLiga3.get('Haas').push(haasDriversLiga3[1]);
  
}

/**
 * Finds the team of a given driver and returns String of the name
 * 
 * @param {Member} member 
 * @returns String of the team name
 */
function findMainTeamString(member){
  if(member.roles.cache.has(mercedesRoleIDLiga3)){
    return 'Mercedes';
  } else if(member.roles.cache.has(redBullRoleIDLiga3)){
    return 'Red Bull';
  } else if(member.roles.cache.has(ferrariRoleIDLiga3)){
    return 'Ferrari';
  } else if(member.roles.cache.has(mcLarenRoleIDLiga3)){
    return 'McLaren';
  } else if(member.roles.cache.has(astonMartinRoleIDLiga3)){
    return 'Aston Martin';
  } else if(member.roles.cache.has(alpineRoleIDLiga3)){
    return 'Alpine';
  } else if(member.roles.cache.has(alphaTauriRoleIDLiga3)){
    return 'Alpha Tauri';
  } else if(member.roles.cache.has(alfaRomeoRoleIDLiga3)){
    return 'Alfa Romeo';
  } else if(member.roles.cache.has(williamsRoleIDLiga3)){
    return 'Williams';
  } else if(member.roles.cache.has(haasRoleIDLiga3)){
    return 'Haas';
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

  if(currentLineupLiga3.get(teamNameString)[0] == `nicht besetzt` || currentLineupLiga3.get(teamNameString)[1] == `nicht besetzt`){
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
  subPersonListLiga3 = [];
  subPersonListReinstatedDriversLiga3 = [];
  freeCarsLiga3 = [];
  withdrawnDriversLiga3 = [];
  driversWithdrawnPerCommandLiga3 = [];
  driversSubInPerCommandLiga3 = [];
  confirmedSubsMadeLiga3 = new Map();
  confirmedSubsMadeInvLiga3 = new Map();
  msgLineupLiga3 = null;
  reservesActivatedLiga3 = false;
  return flag;
}

/**
 * Clears the "Anmeldechannel" and the "Abmeldechannel" to keep the channels current
 * 
 * @param {Client} client 
 */
async function clearChannels(client){
  await client.channels.cache.get(anmeldeChannelIDLiga3).bulkDelete(100).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Der Anmelde-Channel wurde gecleart -- ${date}`)
  });
  

  await client.channels.cache.get(abmeldeChannelIDLiga3).bulkDelete(100).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Der Abmelde-Channel wurde gecleart -- ${date}`)
  });
}

/**
 * Sends all the messages to start the Bot, the wait list, the free cars and the inital lineup
 * 
 * @param {Client} client 
 */
async function sendFreeCarsWaitListDefaultLineup(client, message){
  // Overall header, that with the mention of the subdrivers and the flag
  await client.channels.cache.get(anmeldeChannelIDLiga3).send(`<@&${ersatzfahrerRolleIDLiga3}> die Anmeldung für das ` + 
                                                              `Ligarennen in ${flag} ist hiermit eröffnet!`).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Die Anmeldung für Liga 3 in ${flag} wurde eröffnet. -- ${date}`);
  });

  // Message for List of waiting drivers
  await client.channels.cache.get(anmeldeChannelIDLiga3).send(`Warteliste:`).then((msg) => {
    waitListMsgIDLiga3 = msg.id;
  });     
  
  // Message for List of free cars
  await client.channels.cache.get(anmeldeChannelIDLiga3).send(`Freie Autos:`).then((msg) => {
    freeCarMsgIDLiga3 = msg.id;
  })


  printLineup(client, message);
  let date = new Date().toLocaleString();
  console.log(`Das Standard Lineup wurde gesendet -- ${date}`);
}

/**
 * Gets called if sub driver has reacted with the white checkmark on the right message and everthing else went smoothly
 * 
 * @param {Client} client 
 */
async function subDriverIn(client, driverObject, message){

  subPersonListLiga3.push(driverObject.user.id);

  // Creates the embed send in the "Anmeldechannel" if sub driver reacted
  let subInEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('➡️')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> hat sich für diese Woche angemeldet`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga3).send({ embeds : [subInEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} hat sich erfolgreich angemeldet -- ${date}`);

  await checkSubCanBeMade(client, message, false, null, null, null);
}

async function regularDriverWithdraw(client, driverObject, message){

  withdrawnDriversLiga3.push(driverObject.user.id);
  await addCarOfWithdrawnDriverToFreeCars(driverObject);
  await removeFromCurrentLineup(driverObject, client, message, null);

  let withdrawnEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('⬅️')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche nicht dabei`}
  )
                  
  await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga3).send({ embeds : [withdrawnEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawnEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} hat sich erfolgreich abgemeldet -- ${date}`); 

  await checkSubCanBeMade(client, message, false, null, null, null);
}

async function subDriverRemoveSubInOnWaitlist(client, driverObject, message){

  let element = subPersonListLiga3.indexOf(driverObject.user.id);
  subPersonListLiga3.splice(element, 1);  

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga3).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich von der Warteliste entfernt -- ${date}`);

       
  await checkSubCanBeMade(client, message, false, null, null, null);
}

async function subDriverRemoveSubInInLineup(client, driverObject, message){

  let freeCar = await findCurrentCockpitOfSub(driverObject);
  freeCarsLiga3.push(freeCar);
  await removeFromCurrentLineup(driverObject, client, message, freeCar);

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga3).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich aus Lineup genommen -- ${date}`);

  await checkSubCanBeMade(client, message, false, null, null, null);
}

async function regularDriverRemoveWithdraw(client, driverObject, message){     
  
  subPersonListReinstatedDriversLiga3.push(driverObject.user.id);
  withdrawnDriversLiga3.splice(withdrawnDriversLiga3.indexOf(driverObject.user.id), 1);

  let withdrawRemoveEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('️️️️️️️️↪')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> ist diese Woche doch dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga3).send({ embeds : [withdrawRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawRemoveEmbed]});
  })

  let date = new Date().toLocaleString();
  console.log(`Die Abmeldung von ${driverObject.user.username} wurde erfolgreich zurückgenommen -- ${date}`);

  
  await checkSubCanBeMade(client, message);
}

async function sendTeams(client){
  if(currentRegularDrivers != null){
    await client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).messages.fetch(currentRegularDrivers).then((msg) => {
      console.log('delete', msg.id)
      msg.delete();
    })
  }
  regularDrivers.set("Mercedes", mercedesDriversLiga3);
  regularDrivers.set("Red Bull", redBullDriversLiga3);
  regularDrivers.set("Ferrari", ferrariDriversLiga3);
  regularDrivers.set("McLaren", mcLarenDriversLiga3);
  regularDrivers.set("Aston Martin", astonMartinDriversLiga3);
  regularDrivers.set("Alpine", alpineDriversLiga3);
  regularDrivers.set("Alpha Tauri", alphaTauriDriversLiga3);
  regularDrivers.set("Alfa Romeo", alfaRomeoDriversLiga3);
  regularDrivers.set("Williams", williamsDriversLiga3);
  regularDrivers.set("Haas", haasDriversLiga3);

  let regularDriverEmbed = new MessageEmbed()
  .setColor('DARK_GREEN')
  .setTitle('️️️️️️️️Stammfahrer Liga 3')
  .addFields(
    {name: `Mercedes`, value: `<@${regularDrivers.get('Mercedes')[0]}> und <@${regularDrivers.get('Mercedes')[1]}>`},
    {name: `Red Bull`, value: `<@${regularDrivers.get('Red Bull')[0]}> und <@${regularDrivers.get('Red Bull')[1]}>`},
    {name: `Ferrari`, value: `<@${regularDrivers.get('Ferrari')[0]}> und <@${regularDrivers.get('Ferrari')[1]}>`},
    {name: `McLaren`, value: `<@${regularDrivers.get('McLaren')[0]}> und <@${regularDrivers.get('McLaren')[1]}>`},
    {name: `Aston Martin`, value: `<@${regularDrivers.get('Aston Martin')[0]}> und <@${regularDrivers.get('Aston Martin')[1]}>`},
    {name: `Alpine`, value: `<@${regularDrivers.get('Alpine')[0]}> und <@${regularDrivers.get('Alpine')[1]}>`},
    {name: `Alpha Tauri`, value: `<@${regularDrivers.get('Alpha Tauri')[0]}> und <@${regularDrivers.get('Alpha Tauri')[1]}>`},
    {name: `Alfa Romeo`, value: `<@${regularDrivers.get('Alfa Romeo')[0]}> und <@${regularDrivers.get('Alfa Romeo')[1]}>`},
    {name: `Williams`, value: `<@${regularDrivers.get('Williams')[0]}> und <@${regularDrivers.get('Williams')[1]}>`},
    {name: `Haas`, value: `<@${regularDrivers.get('Haas')[0]}> und <@${regularDrivers.get('Haas')[1]}>`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).send({ embeds : [regularDriverEmbed]}).then((msg) => {
    currentRegularDrivers = msg.id;
  })
}

async function findCurrentCockpitOfSub(driverObject){
  if(currentLineupLiga3.get('Mercedes').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Mercedes`);
    return mercedesRoleIDLiga3;
  }else if(currentLineupLiga3.get('Red Bull').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Red Bull`);
    return redBullRoleIDLiga3;
  }else if(currentLineupLiga3.get('Ferrari').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Ferrari`);
    return ferrariRoleIDLiga3;
  }else if(currentLineupLiga3.get('McLaren').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im McLaren`);
    return mcLarenRoleIDLiga3;
  }else if(currentLineupLiga3.get('Aston Martin').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Aston Martin`);
    return astonMartinRoleIDLiga3;
  }else if(currentLineupLiga3.get('Alpine').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpine`);
    return alpineRoleIDLiga3;
  }else if(currentLineupLiga3.get('Alpha Tauri').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpha Tauri`);
    return alphaTauriRoleIDLiga3;
  }else if(currentLineupLiga3.get('Alfa Romeo').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alfa Romeo`);
    return alfaRomeoRoleIDLiga3;
  }else if(currentLineupLiga3.get('Williams').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Williams`);
    return williamsRoleIDLiga3;
  }else if(currentLineupLiga3.get('Haas').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Haas`);
    return haasRoleIDLiga3;
  }
}

module.exports = {
  name: 'start3',
  aliases: ['anmelden3', 'abmelden3', 'removeanmeldung3', 'removeabmeldung3', 'activatereserves3', 'forceremove3',
           'forcein3', 'forcefree3', 'end3', 'removefromwaitlist3'],
  description: 'Can manage driverswaps for F1 league races. Used for IRC League 3',
  async execute(client, message, cmd, args, Discord){
    // Starts the main command of the bot
    if(cmd === 'start3' && message.member.roles.cache.has(rennleiterRolleID)){
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
        .setTitle('Anmeldung für Ersatzfahrer und Fahrer auf der Warteliste')
        .setDescription(`Diese Nachricht ist NUR für Ersatzfahrer und Fahrer auf der Warteliste relevant. Um euch anzumelden für das Ligarennen in ${flag} bitte mit ` +
                        `dem ✅ unter dieser Nachricht reagieren, falls ihr mitfahren wollt. Das gilt für Ersatzfahrer und Fahrer auf der Warteliste, Ersatzfahrer ` +
                        `können sich ab sofort anmelden, die Warteliste erst ab dem Moment, in dem sie freigeschaltet. Wenn die Warteliste aktiviert wurde, wird sie im Anmeldechannel markiert. ` +
                        `Die Ersatzfahrer werden, sobald ein Cockpit frei wird, eingefügt. ` +
                        `Für die Warteliste gilt das Gleiche, sobald sie freigeschaltet wurde. Wenn ihr ein Cockpit habt, kriegt ihr vom Bot eine Privatnachricht. Trotzdem bitte hin ` +
                        `und wieder mal auf den Discord schauen. Wenn ihr ein Cockpit habt wird euer Name ins Lineup, im Infochannel, eingetragen. \n \n` +
                        `Wenn ihr doch keine Zeit habt, könnt ihr ganz einfach eure Reaktion unter dieser Nachricht wieder entfernen ` +
                        `und seid nicht mehr angemeldet. Ihr könnt NICHT im Abmelde-Channel reagieren. \n \n Bei Unklarheit bitte den %help-Command ausführen. Falls ihr nicht ` +
                        `reagieren könnt, könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch.`)
        .setFooter('Bei weiteren Fragen bitte den %help-Command ausführen');

        let embedAbmeldung = new MessageEmbed()
        .setColor('#0064fd')
        .setTitle('Abmeldung für Stammfahrer')
        .setDescription(`Diese Nachricht ist NUR für die Stammfahrer relevant. Um euch abzumelden für das Ligarennen in ${flag} bitte mit dem ❌ reagieren, falls ihr ` +
                        `nicht könnt. Falls ihr doch könnt und mitfahren wollt, also eure Abmeldung wieder zurück ziehen wollt, entfernt einfach eure ` +
                        `Reaktion unter dieser Nachricht wieder. Ihr könnt euch NICHT im Anmelde-Channel wieder anmelden. Falls ihr nicht reagieren könnt, ` +
                        `könnt ihr im Notfall auch eurem Ligaleiter schreiben, der regelt das dann für euch`)
        .setFooter('Bei weiteren Fragen bitte den %help-Command ausführen');
    
        
        let messageEmbededAnmelden = null
        await client.channels.cache.get(anmeldeChannelIDLiga3).send({ embeds: [embedAnmeldung] }).then((msg) => {
          messageEmbededAnmelden = msg;
          messageEmbededAnmeldenID = msg.id;
        });

        let messageEmbededAbmelden = null
        await client.channels.cache.get(abmeldeChannelIDLiga3).send({ embeds: [embedAbmeldung] }).then((msg) => {
          messageEmbededAbmelden = msg;
          messageEmbededAbmeldenID = msg.id;
        });
          
        messageEmbededAnmelden.react(anmeldenEmoji);
        messageEmbededAbmelden.react(abmeldenEmoji);

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
          if(reaction.message.channel.id == anmeldeChannelIDLiga3){
            // Ersatzfahrer meldet sich an
            if(reaction.emoji.name === anmeldenEmoji && !(driversSubInPerCommandLiga3.includes(user.id)) && 
                reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga3)){
              subDriverIn(client, reaction.message.guild.members.cache.get(user.id), message);
            } else if (reaction.emoji.name === anmeldenEmoji && !(driversSubInPerCommandLiga3.includes(user.id)) &&
                        (reaction.message.guild.members.cache.get(user.id).roles.cache.has(wartelisteRolleIDLiga3)) && 
                        reservesActivatedLiga3){
              subDriverIn(client, reaction.message.guild.members.cache.get(user.id), message);                
            } else if(reaction.emoji.name === anmeldenEmoji && !(driversSubInPerCommandLiga3.includes(user.id)) &&
                      reaction.message.guild.members.cache.get(user.id).roles.cache.has(wartelisteRolleIDLiga3) &&
                      !(reservesActivatedLiga3)){
              await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
              await reaction.message.guild.members.cache.get(user.id).user.send(`Die Warteliste wurde noch nicht aktiviert, erst wenn sie aktiviert wurde, kann ` +
                                                                          `sich die Warteliste anmelden. Danke für deine Geduld.`);
            } else if(reaction.emoji.name != anmeldenEmoji) {
              await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
              let date = new Date().toLocaleString();
              console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
            } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga3))) {
              await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
              let date = new Date().toLocaleString();
              console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich anzumelden, hat aber die richtige ` +
              `Rolle nicht -- ${date}`);
            } else {
              await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
              let date = new Date().toLocaleString();
              console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl hinzugefügt -- ${date}`);
            }             
          }
        });
          // Abmeldevorgang
        collectorWithdraw.on('collect', async (reaction, user) => {
          if(reaction.message.channel.id == abmeldeChannelIDLiga3){
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
            if(reaction.message.channel.id == abmeldeChannelIDLiga3){
              // Stammfahrer meldet sich ab
              if(reaction.emoji.name === abmeldenEmoji && !(driversWithdrawnPerCommandLiga3.includes(user.id)) &&
                  reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga3)){
                regularDriverWithdraw(client, reaction.message.guild.members.cache.get(user.id), message);                          
              } else if(reaction.emoji.name !== abmeldenEmoji) {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
              } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga3))) {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat probiert sich abzumelden, hat aber die richtige ` + 
                `Rolle nicht -- ${date}`);
              } else {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
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
          if(reaction.message.channel.id == anmeldeChannelIDLiga3){
            if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga3) ||
              (reaction.message.guild.members.cache.get(user.id).roles.cache.has(wartelisteRolleIDLiga3) && reservesActivatedLiga3)){
              if(reaction.emoji.name == anmeldenEmoji){
                // Fahrer ist noch auf Warteliste
                if(driversSubInPerCommandLiga3.includes(user.id)){
                  let date = new Date().toLocaleString();
                  console.log(`${user.username} wurde die Reaktion verweigert, da er per Command abgemeldet ist -- ${date}`);
                } else {
                  if(subPersonListLiga3.includes(reaction.message.guild.members.cache.get(user.id).user.id)){
                    subDriverRemoveSubInOnWaitlist(client, reaction.message.guild.members.cache.get(user.id), message);
                  }
                  // Fahrer ist nicht mehr auf Warteliste
                  else {
                    subDriverRemoveSubInInLineup(client, reaction.message.guild.members.cache.get(user.id), message);
                  } 
                }                  
              } else {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);              
              }           
            } else {
              let date = new Date().toLocaleString();
              console.log(`Die Reaktion von ${user.username} wurde entfernt, allerdings hat er nicht die richtige Rolle gehabt -- ${date}`)
            }
          }
        });  
        // Entfernen von Abmeldung
        collectorWithdraw.on('remove', async (reaction, user) => {
          if(reaction.message.channel.id == abmeldeChannelIDLiga3){
            if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga3)){
              if(reaction.emoji.name == abmeldenEmoji){
                if(!(driversWithdrawnPerCommandLiga3.includes(user.id))){
                  regularDriverRemoveWithdraw(client, reaction.message.guild.members.cache.get(user.id), message);
                } else {
                  let date = new Date().toLocaleString();
                  console.log(`${user.username} wurde die Reaktion verweigert, da er schon per Command abgemeldet wurde -- ${date}`);
                }
              }else {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);   
              }      
            } else {
              let date = new Date().toLocaleString();
              console.log(`Die Reaktion von ${user.username} wurde entfernt, allerdings hat er nicht die richtige Rolle gehabt -- ${date}`)
            }
          }
        });
      }
    } 
    // Start command was typed by permissions were insufficient
    if(cmd === 'start3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply('Dieser Command kann nur von der Rennleitung ausgeführt werden').then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den start Command auszuführen hat aber keine Berechtigung dafür -- ${date}`);
      })
    }
    
    if(cmd === 'anmelden3' && message.member.roles.cache.has(rennleiterRolleID)){
      // IF executed if parameter not is defined
      // ELSE if defined
      if(!args[0]){
        message.reply('Bitte gebe den User an')
      }else{
        let markedUserID = args[0].slice(3, 21);

        let markedUserObjectSubIn = await client.guilds.cache.get(discordID).members.cache.get(markedUserID);

        let confirmMessage = await message.channel.send(`Bist du sicher, dass du ${args[0]} anmelden möchtest?`);
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

            if(markedUserObjectSubIn && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDLiga3)){                

              subDriverIn(client, markedUserObjectSubIn, message);
              driversSubInPerCommandLiga3.push(markedUserObjectSubIn.user.id);
              
                
            }else if(markedUserObjectSubIn && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDLiga3))){
              message.reply(`Etwas ist schief gelaufen. Der markiert User hat nicht die richtige Rolle`).then(() => {
                let date = new Date().toLocaleString();
                console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
                `Fahrer: ${markedUserObjectSubIn.user.username} -- ${date}`);
              })  
            }else{
              message.reply(`Etwas ist schief gelaufen. Stelle sicher, dass du den Command in der Form: %anmelden3 @Usertag ausgeführt hast`).then(() => {
                let date = new Date().toLocaleString();
                console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Das Userobjekt war wahrscheinlich ` + 
                `entweder undefiniert oder null -- ${date}`);
              })  
            }
            await confirmMessage.delete();
          } else if(reaction.emoji.name == abmeldenEmoji){
            await client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
              let date = new Date().toLocaleString();
              console.log(`Der manuelle Anmeldeprozess wurde gestartet und abgebrochen -- ${date}`)
            });
            await confirmMessage.delete();
          } else {
            confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
              let date = new Date().toLocaleString();
              console.log(`Der manuelle Abmeldeprozess wurde gestartet und es wurde mit dem flaschen Emoji reagiert -- ${date}`)
            })
            await reaction.users.remove(user.id);
          }
        })
      }
    }
    if(cmd === 'anmelden3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der anmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den anmelden Command auszuführen, hat aber `+ 
        `keine Berechtigung dafür -- ${date}`);
      })
    }
    if(cmd === 'abmelden3' && message.member.roles.cache.has(rennleiterRolleID)){
      // IF executed if parameter not is defined
      // ELSE if defined
      if(!args[0]){
        message.reply('Bitte gebe den User an')
      }else{
        let markedUserID = args[0].slice(3, 21);

        let markedUserObjectWithdraw = client.guilds.cache.get(discordID).members.cache.get(markedUserID);
        
        let confirmMessage = await message.channel.send(`Bist du sicher, dass du ${args[0]} abmelden möchtest?`);
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
        
            if(markedUserObjectWithdraw && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDLiga3)){

              regularDriverWithdraw(client, markedUserObjectWithdraw, message);
              driversWithdrawnPerCommandLiga3.push(markedUserObjectWithdraw.user.id);           
              
              
              
            } else if (markedUserObjectWithdraw && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDLiga3))){
              message.reply(`Etwas ist schief gelaufen. Der markiert User hat nicht die richtige Rolle`).then(() => {
                let date = new Date().toLocaleString();
                console.log(`Es ist etwas schiefgelaufen beim abmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
                `Fahrer: ${markedUserObjectWithdraw.user.username} -- ${date}`);
              })  
              
            } else {
              message.reply(`Etwas ist schief gelaufen. Stelle sicher, dass du den Command in der Form: %abmelden1 @Usertag ausgeführt hast`).then(() => {
                let date = new Date().toLocaleString();
                console.log(`Es ist etwas schiefgelaufen beim abmelden Command. Das Userobjekt war entweder undefiniert oder null -- ${date}`);
              })
            }
            await confirmMessage.delete();
          } else if(reaction.emoji.name == abmeldenEmoji){
            confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
              let date = new Date().toLocaleString();
              console.log(`Der manuelle Abmeldeprozess wurde gestartet und abgebrochen -- ${date}`)
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
    if(cmd === 'abmelden3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den abmelden Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd === 'removeabmeldung3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd === 'removeanmeldung3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd === 'removeanmeldung3' && (message.member.roles.cache.has(rennleiterRolleID))){
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

        if(markedUserObjectSubInRemove.roles.cache.has(ersatzfahrerRolleIDLiga3)){
          let confirmMessage = await message.channel.send(`Bist du sicher, dass du die Abmeldung von ${args[0]} zurück nehmen möchtest?`);
          confirmMessage.react(anmeldenEmoji);
          confirmMessage.react(abmeldenEmoji);

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
              if(driversSubInPerCommandLiga3.includes(markedUserObjectSubInRemove.user.id)){
                if(subPersonListLiga3.includes(markedUserObjectSubInRemove.user.id)){
                  
                  subDriverRemoveSubInOnWaitlist(client, markedUserObjectSubInRemove, message);
                  driversSubInPerCommandLiga3.splice(driversSubInPerCommandLiga3.indexOf(markedUserObjectSubInRemove.user.id), 1);

                  
                } else if(!(subPersonListLiga3.includes(markedUserObjectSubInRemove.user.id))){
                  
                  subDriverRemoveSubInInLineup(client, markedUserObjectSubInRemove, message);
                  driversSubInPerCommandLiga3.splice(driversSubInPerCommandLiga3.indexOf(markedUserObjectSubInRemove.user.id), 1);
                  

                } else {
                  let date = new Date().toLocaleString();
                  console.log(`${markedUserObjectSubInRemove.user.username} Es ist ein Fehler aufgetreten beim Versuch einen Fahrer wieder abzumelden -- ${date}`);
                }
                
              } else {
                message.reply(`Fahrer wurde vorher per Command nicht angemeldet`).then(() => {
                  let date = new Date().toLocaleString();
                  console.log(`Fahrer wurde vorher per Command angemeldet. ` + 
                  `Fahrer: ${markedUserObjectWithdraw.user.username} -- ${date}`);
                })  
                await confirmMessage.delete();
              }             
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
        } else {
          message.reply('Der Fahrer hat die Ersatzfahrer-Rolle nicht').then(() => {
            let date = new Date().toLocaleString();
            console.log(`Es wurde ein Fahrer mit der flaschen Rolle probiert anzumelden -- ${date}`)
          });
        }
      }
    }

    if(cmd === 'removeabmeldung3' && message.member.roles.cache.has(rennleiterRolleID)){

      if(!args[0]){
        message.reply('Bitte gebe den User an')
      }else{

        let markedUserIDRemove = args[0].slice(3, 21);

        let markedUserObjectWithdrawRemove = null;
        client.guilds.cache.get(discordID).members.cache.find(member => {
          // Finds the whole object of the member given in message
          if(member.id === markedUserIDRemove){
            markedUserObjectWithdrawRemove = member;
          }
        })

        if(markedUserObjectWithdrawRemove.roles.cache.has(stammfahrerRolleIDLiga3)){

          let confirmMessage = await message.channel.send(`Bist du sicher, dass du die Abmeldung von ${args[0]} zurück nehmen möchtest?`);
          confirmMessage.react(anmeldenEmoji);
          confirmMessage.react(abmeldenEmoji);

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

              if(markedUserObjectWithdrawRemove.roles.cache.has(stammfahrerRolleIDLiga3)){

                regularDriverRemoveWithdraw(client, markedUserObjectWithdrawRemove, message);
                driversWithdrawnPerCommandLiga3.splice(driversWithdrawnPerCommandLiga3.indexOf(markedUserObjectWithdrawRemove.user.id), 1);
                await confirmMessage.delete();
    
              } else {
                let date = new Date().toLocaleString();
                message.reply(`Fahrer braucht die Liga 3-Stammfahrerrolle -- ${date}`);
                await confirmMessage.delete();
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
        } else {
          message.reply('Der Fahrer hat die Stammfahrer-Rolle nicht').then(() => {
            let date = new Date().toLocaleString();
            console.log(`Es wurde probiert ein Fahrer mit der falschen Rolle die Abmeldung entfernt zu werden -- ${date}`)
          });
        }
      }
    }
    if(cmd == 'activatereserves3' && message.member.roles.cache.has(rennleiterRolleID)){
      if(reservesActivatedLiga3){
        await message.reply(`Die Warteliste wurde schon aktiviert`);
      } else {
        let confirmMessage = await message.reply(`Bist du sicher, dass du die Abmeldung für die Warteliste öffnen möchtest? Der Vorgang lässt sich` + 
                                              ` nicht rückgängig machen`);
        confirmMessage.react(anmeldenEmoji);
        confirmMessage.react(abmeldenEmoji);

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

            reservesActivatedLiga3 = true;
            await client.channels.cache.get(anmeldeChannelIDLiga3).send(`Die <@&${wartelisteRolleIDLiga3}> kann sich ab jetzt anmelden`);
            confirmMessage.delete();
          } else if(reaction.emoji.name == abmeldenEmoji){
            await message.channel.send(`Der Vorgang wurde erfolgreich abgebrochen`);
            confirmMessage.delete();
          } else {
            reaction.users.remove(user.id);
          }
        })
      }
    }
    if(cmd == 'activatereserves3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der activeReserve Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den activeReserve remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    /*
    
    start
    -----------------------------------------------------------------------------------------------------------------------------------
    
    */


    if(cmd == 'forceremove3' && message.member.roles.cache.has(rennleiterRolleID)){
      let forceRemoveTeamEmbed = new MessageEmbed()
      .setColor('#fd5100')
      .setTitle('Bitte wähle das Team aus')
      .setDescription('Hier wird das Team gewählt aus welchem der Fahrer entfernt wird')
      .addFields(
        {name: 'Row 1', value: `0️⃣ - <@&${mercedesRoleIDLiga3}> und 1️⃣ - <@&${redBullRoleIDLiga3}>`},
        {name: 'Row 2', value: `2️⃣ - <@&${ferrariRoleIDLiga3}> und 3️⃣ - <@&${mcLarenRoleIDLiga3}>`},
        {name: 'Row 2', value: `4️⃣ - <@&${astonMartinRoleIDLiga3}> und 5️⃣ - <@&${alpineRoleIDLiga3}>`},
        {name: 'Row 2', value: `6️⃣ - <@&${alphaTauriRoleIDLiga3}> und 7️⃣ - <@&${alfaRomeoRoleIDLiga3}>`},
        {name: 'Row 2', value: `8️⃣ - <@&${williamsRoleIDLiga3}> und 9️⃣ - <@&${haasRoleIDLiga3}>`},
        {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
      )

      let messageForceRemoveTeamEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveTeamEmbed] });

      await messageForceRemoveTeamEmbed.react('0️⃣');
      await messageForceRemoveTeamEmbed.react('1️⃣');
      await messageForceRemoveTeamEmbed.react('2️⃣');
      await messageForceRemoveTeamEmbed.react('3️⃣');
      await messageForceRemoveTeamEmbed.react('4️⃣');
      await messageForceRemoveTeamEmbed.react('5️⃣');
      await messageForceRemoveTeamEmbed.react('6️⃣');
      await messageForceRemoveTeamEmbed.react('7️⃣');
      await messageForceRemoveTeamEmbed.react('8️⃣');
      await messageForceRemoveTeamEmbed.react('9️⃣');
      await messageForceRemoveTeamEmbed.react(abmeldenEmoji);
      

      await messageForceRemoveTeamEmbed.react(abmeldenEmoji);

      const collectorConfirm = messageForceRemoveTeamEmbed.createReactionCollector({ dispose: true});

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
        /**
         * 
         * Team Mercedes
         * 
         */
        if(reaction.emoji.name == '0️⃣'){

          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${mercedesRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Mercedes')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Mercedes')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )

          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });

          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);

          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});

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
            /**
            * 
            * Team Mercedes, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Mercedes')[0];

              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mercedesRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )

              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });

              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);

              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});

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
                /**
                * 
                * Team Mercedes, Fahrer 1, ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  mercedesDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Mercedes')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                  

                } 
                /**
                * 
                * Team Mercedes, Fahrer 1, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  mercedesDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Mercedes')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Mercedes, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  mercedesDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Mercedes')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                } 
                /**
                * 
                * Team Mercedes, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                } 
                /**
                * 
                * Team Mercedes, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  mercedesDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Team 1')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })

            } 
            /**
            * 
            * Team Mercedes, Fahrer 2
            * 
            */
            else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Mercedes')[1];

              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mercedesRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )

              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });

              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);

              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});

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
                /**
                * 
                * Team Mercedes, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  mercedesDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Mercedes')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                  

                }
                /**
                * 
                * Team Mercedes, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  mercedesDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Mercedes')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Mercedes, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  mercedesDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Mercedes')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Mercedes, Fahrer 2, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Mercedes, Fahrer 2, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  mercedesDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Mercedes')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  await reaction.users.remove(user.id);
                }
              })
            } else if(reaction.emoji.name === abmeldenEmoji){
              await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
            } else {
              reaction.users.remove(user.id);
            }
          })
          

        /**
         * 
         * Team Red Bull
         * 
         */
        }else if(reaction.emoji.name == '1️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${redBullRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Red Bull')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Red Bull')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )

          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });

          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);

          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});

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
            /**
            * 
            * Team Red Bull, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Red Bull')[0];

              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${redBullRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )

              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });

              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);

              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});

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
                /**
                * 
                * Team Red Bull, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  redBullDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                  

                }
                /**
                * 
                * Team Red Bull, Fahrer 1, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  redBullDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Red Bull, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  redBullDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Red Bull, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

            
                  await message.reply(`Liga existiert nicht`);
                  

                }
                /**
                * 
                * Team Red Bull, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  redBullDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            /**
            * 
            * Team Red Bull, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Red Bull')[1];

              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${redBullRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga + 1`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga - 1`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )

              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });

              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);

              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});

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
                /**
                * 
                * Team Red Bull, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  redBullDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                  

                } 
                /**
                * 
                * Team Red Bull, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  redBullDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Red Bull, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  redBullDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Red Bull, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Red Bull, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  redBullDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Red Bull')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            } else if(reaction.emoji.name == abmeldenEmoji){
              await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
            } else {
              reaction.users.remove(user.id);
            }
          })
        
        
        /**
         * 
         * Team Ferrari
         * 
         */
        }else if(reaction.emoji.name == '2️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${ferrariRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Ferrari')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Ferrari')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
      
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
      
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
      
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
      
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
            /**
            * 
            * Team Ferrari, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Ferrari')[0];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${ferrariRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
      
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
      
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
      
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
                /**
                * 
                * Team Ferrari, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  ferrariDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Ferrari')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
          
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                      
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                              
        
                }
                /**
                * 
                * Team Ferrari, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  ferrariDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Ferrari')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Ferrari, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  ferrariDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineup.get('Ferrari')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team Ferrari, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team Ferrari, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  ferrariDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Ferrari')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
              /**
              * 
              * Team Ferrari, Fahrer 2
              * 
              */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Ferrari')[1];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${ferrariRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
      
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
        
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
      
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
                /**
                * 
                * Team Ferrari, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  ferrariDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Ferrari')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
      
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
      
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                          
      
                } 
                /**
                * 
                * Team Ferrari, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  ferrariDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Ferrari')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Ferrari, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  ferrariDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Ferrari')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Ferrari, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Ferrari, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  ferrariDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Ferrari')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            } else if(reaction.emoji.name == abmeldenEmoji){
              await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
            } else {
              reaction.users.remove(user.id);
            }
          })

        /**
         * 
         * Team McLaren
         * 
         */
        }else if(reaction.emoji.name == '3️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${mcLarenRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('McLaren')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('McLaren')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
          
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
      
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
      
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
      
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
            /**
            * 
            * Team McLaren, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('McLaren')[0];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mcLarenRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
      
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
      
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
      
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
                /**
                * 
                * Team McLaren, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  mcLarenDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
          
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                      
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                }
                /**
                * 
                * Team McLaren, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  mcLarenDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team McLaren, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  mcLarenDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team McLaren, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team McLaren, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  mcLarenDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            
            /**
            * 
            * Team McLaren, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('McLaren')[1];
        
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mcLarenRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
        
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
        
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
        
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
        
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
                /**
                * 
                * Team McLaren, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  mcLarenDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                  
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                } 
                /**
                * 
                * Team McLaren, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  mcLarenDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
            
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team McLaren, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  mcLarenDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
            
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team McLaren, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team McLaren, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  mcLarenDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('McLaren')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga3);
            
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                    reaction.users.remove(user.id);
                }
              })
            } else if(reaction.emoji.name == abmeldenEmoji){
              await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
            } else {
              reaction.users.remove(user.id);
            }
          })
        

        /**
        * 
        * Team Aston Martin
        * 
        */
        }else if(reaction.emoji.name == '4️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${astonMartinRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Aston Martin')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Aston Martin')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
          
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
          
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
          
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
          
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
            /**
            * 
            * Team Aston Martin, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Aston Martin')[0];
          
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${astonMartinRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
          
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
          
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
          
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
          
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
                /**
                * 
                * Team Aston Martin, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  astonMartinDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
            
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                        
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
            
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                              
          
                }
                /**
                * 
                * Team Aston Martin, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  astonMartinDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Aston Martin, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  astonMartinDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team Aston Martin, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team Aston Martin, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  astonMartinDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            /**
            * 
            * Team Aston Martin, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Aston Martin')[1];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${astonMartinRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
        
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
      
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
        
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
                /**
                * 
                * Team Aston Martin, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  astonMartinDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
      
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                } 
                /**
                * 
                * Team Aston Martin, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  astonMartinDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Aston Martin, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  astonMartinDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Aston Martin, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Aston Martin, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  astonMartinDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Aston Martin')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            } else if(reaction.emoji.name == abmeldenEmoji){
              await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
            } else {
              reaction.users.remove(user.id);
            }
          })
      
        /**
        * 
        * Team Alpine
        * 
        */
        }else if(reaction.emoji.name == '5️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${alpineRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Alpine')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Alpine')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
      
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
      
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
      
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
            
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
            /**
            * 
            * Team Alpine, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Alpine')[0];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alpineRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
      
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
            
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
      
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
                /**
                * 
                * Team Alpine, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  alpineDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
          
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                      
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                }
                /**
                * 
                * Team Alpine, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  alpineDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Alpine, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  alpineDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team Alpine, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team Alpine, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  alpineDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            /**
            * 
            * Team Alpine, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Alpine')[1];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alpineRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
      
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
      
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
      
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
                /**
                * 
                * Team Alpine, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  alpineDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
      
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
      
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                          
      
                } 
                /**
                * 
                * Team Alpine, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  alpineDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Alpine, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  alpineDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Alpine, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Alpine, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  alpineDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpine')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            } else if(reaction.emoji.name == abmeldenEmoji){
              await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
            } else {
              reaction.users.remove(user.id);
            }
          })
        
                

        /**
        * 
        * Team Alpha Tauri
        * 
        */
        }else if(reaction.emoji.name == '6️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${alphaTauriRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Alpha Tauri')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Alpha Tauri')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
              
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
      
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
      
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
              
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
            /**
            * 
            * Team Alpha Tauri, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Alpha Tauri')[0];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alphaTauriRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Alpha Tauri, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  alphaTauriDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
          
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                      
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                }
                /**
                * 
                * Team Alpha Tauri, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  alphaTauriDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Alpha Tauri, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  alphaTauriDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team Alpha Tauri, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team Alpha Tauri, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  alphaTauriDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            /**
            * 
            * Team Alpha Tauri, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Alpha Tauri')[1];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alphaTauriRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Alpha Tauri, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  alphaTauriDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
      
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
      
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                          
      
                } 
                /**
                * 
                * Team Alpha Tauri, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  alphaTauriDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Alpha Tauri, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  alphaTauriDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Alpha Tauri, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Alpha Tauri, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  alphaTauriDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alpha Tauri')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            }
          })

        /**
        * 
        * Team Alfa Romeo
        * 
        */
        }else if(reaction.emoji.name == '7️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${alfaRomeoRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen?`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Alfa Romeo')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Alfa Romeo')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
              
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
      
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
      
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
              
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
            /**
            * 
            * Team Alfa Romeo, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Alfa Romeo')[0];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alfaRomeoRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Alfa Romeo, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  alfaRomeoDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
          
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                      
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                }
                /**
                * 
                * Team Alfa Romeo, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  alfaRomeoDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Alfa Romeo, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  alfaRomeoDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team Alfa Romeo, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team Alfa Romeo, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  alfaRomeoDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            /**
            * 
            * Team Alfa Romeo, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Alfa Romeo')[1];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alfaRomeoRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Alfa Romeo, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  alfaRomeoDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
      
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
      
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                          
      
                } 
                /**
                * 
                * Team Alfa Romeo, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  alfaRomeoDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Alfa Romeo, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  alfaRomeoDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Alfa Romeo, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Alfa Romeo, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  alfaRomeoDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Alfa Romeo')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            }
          })

        /**
        * 
        * Team Williams
        * 
        */
        }else if(reaction.emoji.name == '8️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${williamsRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen?`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Williams')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Williams')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
              
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
      
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
      
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
              
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
            /**
            * 
            * Team Williams, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Williams')[0];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${williamsRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Williams, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  williamsDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
          
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                      
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                }
                /**
                * 
                * Team Williams, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  williamsDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Williams, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  williamsDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team Williams, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team Williams, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  williamsDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            /**
            * 
            * Team Williams, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Williams')[1];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${williamsRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Williams, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  williamsDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
      
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
      
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                          
      
                } 
                /**
                * 
                * Team Williams, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  williamsDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Williams, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  williamsDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Williams, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Williams, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  williamsDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Williams')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            }
          })

        /**
        * 
        * Team Haas
        * 
        */
        }else if(reaction.emoji.name == '9️⃣'){
          let forceRemoveDriverEmbed = new MessageEmbed()
          .setColor('#fd5100')
          .setTitle('Bitte wähle den Fahrer aus')
          .setDescription(`Du hast Team <@&${haasRoleIDLiga3}> gewählt. Welchen Fahrer willst du entfernen?`)
          .addFields(
            {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga3.get('Haas')[0]}>`},
            {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga3.get('Haas')[1]}>`},
            {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
          )
              
          let messageForceRemoveDriverEmbed = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveDriverEmbed] });
      
          await messageForceRemoveDriverEmbed.react('1️⃣');
          await messageForceRemoveDriverEmbed.react('2️⃣');
          await messageForceRemoveDriverEmbed.react(abmeldenEmoji);
      
          const collectorConfirm = messageForceRemoveDriverEmbed.createReactionCollector({ dispose: true});
              
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
            /**
            * 
            * Team Haas, Fahrer 1
            * 
            */
            if(reaction.emoji.name == '1️⃣'){
              let driverToRemove = currentLineupLiga3.get('Haas')[0];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${haasRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Haas, Fahrer 1, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  haasDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
          
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                      
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                            
        
                }
                /**
                * 
                * Team Haas, Fahrer 1, Ersatzfahrer Liga 3
                *
                */
                else if(reaction.emoji.name == '2️⃣'){

                  haasDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                }
                /**
                * 
                * Team Haas, Fahrer 1, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){
        
                  haasDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
        
                }
                /**
                * 
                * Team Haas, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){
        
                  await message.reply(`Liga existiert nicht`);
        
                }
                /**
                * 
                * Team Haas, Fahrer 1, Nichts davon
                * 
                */
                else if(reaction.emoji.name == '5️⃣'){

                  haasDriversLiga3[0] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[0] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
        
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
                    
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
        
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`)
                } else {
                  reaction.users.remove(user.id);
                }
              })
            /**
            * 
            * Team Haas, Fahrer 2
            * 
            */
            } else if(reaction.emoji.name == '2️⃣'){
              let driverToRemove = currentLineupLiga3.get('Haas')[1];
      
              let forceRemoveFutureRole = new MessageEmbed()
              .setColor('#fd5100')
              .setTitle('Bitte wähle den Fahrer aus')
              .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${haasRoleIDLiga3}> gewählt. Was macht der Fahrer in der Zukunft?`)
              .addFields(
                {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 2`},
                {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 4`},
                {name: 'Option 5', value: `5️⃣ - Nichts davon`},
                {name: 'Abbrechen', value: `${abmeldenEmoji} - Um Vorgang abzubrechen`}
              )
              
              let messageForceRemoveFutureRole = await client.channels.cache.get(commandChannelID).send({ embeds: [forceRemoveFutureRole] });
      
              await messageForceRemoveFutureRole.react('1️⃣');
              await messageForceRemoveFutureRole.react('2️⃣');
              await messageForceRemoveFutureRole.react('3️⃣');
              await messageForceRemoveFutureRole.react('4️⃣');
              await messageForceRemoveFutureRole.react('5️⃣');
              await messageForceRemoveFutureRole.react(abmeldenEmoji);
              
              const collectorConfirm = messageForceRemoveFutureRole.createReactionCollector({ dispose: true});
              
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
                /**
                * 
                * Team Haas, Fahrer 2, Ehemaliger Fahrer
                * 
                */
                if(reaction.emoji.name == '1️⃣'){

                  haasDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);
      
                  let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolleID);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
                  let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1RolleID);
                
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
      
                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.remove(fahrerF1Role);
                  roleRemoveMember.roles.add(futureRole);
                          
      
                } 
                /**
                * 
                * Team Haas, Fahrer 2, Ersatzfahrer Liga 3
                * 
                */
                else if(reaction.emoji.name == '2️⃣'){

                  haasDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);
                } 
                /**
                * 
                * Team Haas, Fahrer 2, Stammfahrer Liga 2
                * 
                */
                else if(reaction.emoji.name == '3️⃣'){

                  haasDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                  roleRemoveMember.roles.add(futureRole);

                }
                /**
                * 
                * Team Haas, Fahrer 2, Stammfahrer Liga 4
                * 
                */
                else if(reaction.emoji.name == '4️⃣'){

                  await message.reply(`Liga existiert nicht`);

                }
                /**
                * 
                * Team Haas, Fahrer 2, Nichts davon
                * 
                */ 
                else if(reaction.emoji.name == '5️⃣'){

                  haasDriversLiga3[1] = 'entfernt';
                  await sendTeams(client);
                  currentLineupLiga3.get('Haas')[1] = 'entfernt';
                  // Stammlineup ändern
                  printLineup(client, message);

                  let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);
                  let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga3);
          
                  let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);

                  roleRemoveMember.roles.remove(regDriverRole);
                  roleRemoveMember.roles.remove(teamRole);
                } else if(reaction.emoji.name == abmeldenEmoji){
                  await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
                } else {
                  reaction.users.remove(user.id);
                }
              })
            }
          })
        } else if(reaction.emoji.name == abmeldenEmoji){
          await message.reply(`Der Vorgang wurde erfolgreich abgebrochen`);
        } else {
          reaction.users.remove(user.id);
        }
      })
    }  
    if(cmd == 'forcein3' && message.member.roles.cache.has(rennleiterRolleID)){
      if(args[0] && args[1]){
        let teamID = args[0].slice(3, 21);
        let driverID = args[1].slice(3, 21);

        let teamObject = null;
        client.guilds.cache.get(discordID).roles.cache.find(role => {
          if(role.id == teamID){
            teamObject = role;
          }
        })

        let driverObject = null;
        client.guilds.cache.get(discordID).members.cache.find(member => {
          if(member.id == driverID){
            driverObject = member;
          }
        })

        if(driverObject.roles.cache.has(ersatzfahrerRolleIDLiga3)){
         
          if(currentLineupLiga3.get(teamObject.name)[0] == 'entfernt'){

            if(teamObject.name == 'Mercedes'){
              mercedesDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Red Bull'){
              redBullDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Ferrari'){
              ferrariDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'McLaren'){
              mcLarenDriversLiga3[0] = driverID;
              sendTeams(client);
            } else  if(teamObject.name == 'Aston Martin'){
              astonMartinDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Alpine'){
              alpineDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Alpha Tauri'){
              alphaTauriDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Alfa Romeo'){
              alfaRomeoDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Williams'){
              williamsDriversLiga3[0] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Haas'){
              haasDriversLiga3[0] = driverID;
              sendTeams(client);
            } else {
              console.log(`Errör`)
            }

            let subInRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
            let regularDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);

            driverObject.roles.remove(subInRole);
            driverObject.roles.add(regularDriverRole);
            driverObject.roles.add(teamObject);
            if(subPersonListLiga3.includes(driverID)){
              subPersonListLiga3.splice(subPersonListLiga3.indexOf(driverObject), 1)
            }
            checkSubCanBeMade(client, message, true, 0, driverObject.user.id, teamObject.name);
          } else if(currentLineupLiga3.get(teamObject.name)[1] == 'entfernt'){

            if(teamObject.name == 'Mercedes'){
              mercedesDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Red Bull'){
              redBullDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Ferrari'){
              ferrariDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'McLaren'){
              mcLarenDriversLiga3[1] = driverID;
              sendTeams(client);
            } else  if(teamObject.name == 'Aston Martin'){
              astonMartinDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Alpine'){
              alpineDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Alpha Tauri'){
              alphaTauriDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Alfa Romeo'){
              alfaRomeoDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Williams'){
              williamsDriversLiga3[1] = driverID;
              sendTeams(client);
            } else if(teamObject.name == 'Haas'){
              haasDriversLiga3[1] = driverID;
              sendTeams(client);
            } else {
              console.log(`Errör`)
            }

            let subInRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
            let regularDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga3);

            driverObject.roles.remove(subInRole);
            driverObject.roles.add(regularDriverRole);
            driverObject.roles.add(teamObject);
            if(subPersonListLiga3.includes(driverID)){
              subPersonListLiga3.splice(subPersonListLiga3.indexOf(driverObject), 1)
            }
            checkSubCanBeMade(client, message, true, 1, driverObject.user.id, teamObject.name);
          } else {
            message.reply(`Falsches Team übergeben`)
          }
        } else {
          message.reply(`Fahrer hat Rolle nicht`);
        }
      } else {
        await message.reply(`Das Team und der Fahrer wurde nicht beides übergeben`);
      }
      
    }
    if(cmd == 'forcefree3' && message.member.roles.cache.has(rennleiterRolleID)){
        
      if(!args[0]){
        await message.reply(`Das Team wurde nicht übergeben`);
      } else {
        let teamID = args[0].slice(3, 21);

        let teamObject = null;
        client.guilds.cache.get(discordID).roles.cache.find(role => {
          if(role.id == teamID){
            teamObject = role;
          }
        })

        freeCarsLiga3.push(teamID);

        if(currentLineupLiga3.get(teamObject.name)[0] == 'entfernt'){
          currentLineupLiga3.get(teamObject.name)[0] = 'nicht besetzt';
          checkSubCanBeMade(client, message, true, 0, null, null);
        } else if(currentLineupLiga3.get(teamObject.name)[1] == 'entfernt'){
          currentLineupLiga3.get(teamObject.name)[1] = 'nicht besetzt';
          checkSubCanBeMade(client, message, true, 1, null, null);
        } else {
          message.reply(`Falsches Team übergeben`)
        }
      }
      
      
    }

    if(cmd == 'forcefree3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der forceFree Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd == 'forcein3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der forceIn Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den forceIn remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd == 'forceremove3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd == 'end3' && message.member.roles.cache.has(rennleiterRolleID)){
      await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga3).messages.fetch(messageEmbededAnmeldenID).then((msg) => {
        msg.delete();
      });

      await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga3).send(`Die Anmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
        console.log(`Die Anmeldung in Liga 3 wurde beendet`);
      })

      await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga3).messages.fetch(messageEmbededAbmeldenID).then((msg) => {
        msg.delete();
      });

      await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga3).send(`Die Abmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
        console.log(`Die Abmeldung in Liga 3 wurde beendet`);
      })
    }

    if(cmd == 'end3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd == 'removefromwaitlist3' && !(message.member.roles.cache.has(rennleiterRolleID))){
      message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
        let date = new Date().toLocaleString();
        console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
      })
    }

    if(cmd == 'removefromwaitlist3' && (message.member.roles.cache.has(rennleiterRolleID))){
      if(args[0]){
        var positionToRemove = args[0];
        var lengthSubs = subPersonListLiga3.length;
        var lengthReinstated = subPersonListReinstatedDriversLiga3.length;
        console.log(lengthReinstated + lengthSubs)
        if(positionToRemove <= lengthReinstated + lengthSubs){
          if(positionToRemove <= lengthReinstated && lengthReinstated > 0){
            subPersonListReinstatedDriversLiga3.splice(positionToRemove - 1, 1);
          } else {
            positionToRemove = positionToRemove - lengthReinstated;
            subPersonListLiga3.splice(positionToRemove - 1, 1)
          }
          console.log(lengthReinstated + lengthSubs)
          await setWaitListMsgContent(client)
        }else {
          console.log(positionToRemove)
          message.reply('Die Position existiert nicht')
        }
        
      }else{
        message.reply('Es muss eine Position übergeben werden')
      }
      
    }

  }
}