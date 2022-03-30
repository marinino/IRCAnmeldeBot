const {MessageEmbed} = require('discord.js');

var subPersonListLiga2 = [];
var subPersonListReinstatedDriversLiga2 = [];
var freeCarsLiga2 = [];
var withdrawnDriversLiga2 = [];
var driversWithdrawnPerCommandLiga2 = [];
var driversSubInPerCommandLiga2 = [];
var flag = null;

// Mercedes-Team: Rocky / Helim
var mercedesDriversLiga2 = ['176331806839275520', '404664138103652362'];
// Red Bull-Team: Hico / DarkNight
var redBullDriversLiga2 = ['442694360652447755', '756083277512835082'];
// Ferrari-Team: Keto / Zani
var ferrariDriversLiga2 = ['243771257877823488', '751461016583274516']
// McLaren-Team: Finn / kk
var mcLarenDriversLiga2 = ['272073232893345792', '688006080109740070']
// Aston Martin-Team: Cvbby / Scofield
var astonMartinDriversLiga2 = ['259366764121423872', '378256164196188160']
// Alpine-Team: Karrotenzieher / SHDGames
var alpineDriversLiga2 = ['409058381870137371', '284981237645312000']
// Alpha Tauri-Team: PeterFritz / PlayHak
var alphaTauriDriversLiga2 = ['861930115809280041', '299534780595175424']
// Alfa Romeo-Team: Star Rexx / Neigo
var alfaRomeoDriversLiga2 = ['510933838868905995', '311868092840017921']
// Williams-Team: smittyy / MrGolfvirus
var williamsDriversLiga2 = ['154609243033436160', '402107633915658243']
// Haas-Team: Buddy / Dokinix
var haasDriversLiga2 = ['177733474713600000', '790536187587985429']

var currentLineupLiga2 = new Map();
var regularDriversLiga2 = new Map();

const anmeldeChannelIDLiga2 = '857658929226973225';
const abmeldeChannelIDLiga2 = '869237098669043732';
const ersatzfahrerRolleIDLiga2 = '734888172097503323';
const stammfahrerRolleIDLiga2 = '843566503026884608';
const rennleiterRolleID = '479053658135461903';
const infoChannelIDLiga2 = '871758199068430376';
const commandChannelID = '901067530012078162';
const logChannelID = '901067704499322890';
const teamsChannelID = '866950218887987221';
const ehemaligerFahrerRolle = '587697224561983516';
const ersatzfahrerRolleIDLiga1 = '479056707104931840';
const ersatzfahrerRolleIDLiga3 = '843567323981938770';
const fahrerF1Rolle = '587695833428787240';

const discordID = '479053264537649153';

const mercedesRoleIDLiga2 = '656098815492882432';  
const redBullRoleIDLiga2 = '656098821289541633';  
const ferrariRoleIDLiga2 = '656098818290483201'; 
const mcLarenRoleIDLiga2 = '656098834878824469';  
const astonMartinRoleIDLiga2 = '656104213893611522';   
const alpineRoleIDLiga2 = '656098824074428416';  
const alphaTauriRoleIDLiga2 = '656098829497532417';  
const alfaRomeoRoleIDLiga2 = '656098832052125698';  
const williamsRoleIDLiga2 = '656098837965963274'; 
const haasRoleIDLiga2 = '656098826427432963';  


const anmeldenEmoji = '✅';
const abmeldenEmoji = '❌';

var freeCarMsgIDLiga2 = null;
var waitListMsgIDLiga2 = null;
var msgLineupLiga2 = null;
var currentRegularDriversLiga2 = null;

let messageEmbededAnmeldenID = null;
let messageEmbededAbmeldenID = null;

async function removeFromCurrentLineup(user, client, message, freeCar){
  if(user.roles.cache.has(stammfahrerRolleIDLiga2)){
    if(currentLineupLiga2.get(findMainTeamString(user))[0] == user.id){
      currentLineupLiga2.get(findMainTeamString(user))[0] = 'nicht besetzt';
    }else if(currentLineupLiga2.get(findMainTeamString(user))[1] == user.id){
      currentLineupLiga2.get(findMainTeamString(user))[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }
    
  } else {
    let teamID = freeCar;

    let teamNameString = await client.guilds.cache.get(discordID).roles.cache.get(teamID).name;

    let date = new Date();
    console.log(`Prüfsumme für das Entfernen eines Autos aus dem Lineup (removeFromCurrentLineup) in Liga 2
                die ID des Teams welches zu Entfernen war ist ${teamID}. Darf nicht null sein -- ${date}`)

    if(!(teamID)){
      let date = new Date();
      console.log(`In Liga 2 war die TeamID bei einem removeFromCurrentLineup null oder undefined -- ${date}`);
      return;
    }

    if(currentLineupLiga2.get(teamNameString)[0] == user.id){
      currentLineupLiga2.get(teamNameString)[0] = 'nicht besetzt';
    }else if(currentLineupLiga2.get(teamNameString)[1] == user.id){
      currentLineupLiga2.get(teamNameString)[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }

  }
}

async function regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition){
  if(seatOpen == false){

    let mainTeamNameString = await client.guilds.cache.get(discordID).roles.cache.get(mainTeamIDString).name;

    currentLineupLiga2.get(mainTeamNameString)[subDriverPosition] = driverToStart

    let carToTakeNameString = await client.guilds.cache.get(discordID).roles.cache.get(carToTake).name;

    if(currentLineupLiga2.get(carToTakeNameString)[0] == `nicht besetzt`){
      currentLineupLiga2.get(carToTakeNameString)[0] = subDriverID;
    }else if(currentLineupLiga2.get(carToTakeNameString)[1] == `nicht besetzt`){
      currentLineupLiga2.get(carToTakeNameString)[1] = subDriverID;
    } else {
      let date = new Date().toLocaleString();
      console.log(`Method: regularDriverBack, Liga 1 => ${carToTakeNameString} didn't have an open cockpit -- ${date}`);
    }
  
  } else {

    let mainTeamNameString = await client.guilds.cache.get(discordID).roles.cache.get(mainTeamIDString).name;

    currentLineupLiga2.get(mainTeamNameString)[subDriverPosition] = driverToStart;
  }

  
}

async function changeLineupNormalSub(client, message, driverToStart, carToTake){

  let carToTakeNameString = await client.guilds.cache.get(discordID).roles.cache.get(carToTake).name;

  if(currentLineupLiga2.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupLiga2.get(carToTakeNameString)[0] = driverToStart;
  } else  if(currentLineupLiga2.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupLiga2.get(carToTakeNameString)[1] = driverToStart;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Der Tausch im Lineup konnte nicht durchgeführt werden; Normal Sub -- ${date}`);
  }

}


function changeLineupAfterForceOpen(client, message, driverToStart, carToTake, positionForForce){
  currentLineupLiga2.get(findMainTeamString(carToTake))[positionForForce] = driverToStart;
}

function changeLineupAfterForceDedicated(client, message, driverToStart, carToTake, positionForForce){
  currentLineupLiga2.get(carToTake)[positionForForce] = driverToStart;
}

async function printLineup(client, message){
  
  if(msgLineupLiga2 != null){
    await client.guilds.cache.get(discordID).channels.cache.get(infoChannelIDLiga2).messages.fetch(msgLineupLiga2).then((msg) => {
      msg.delete();
    });
    let date = new Date().toLocaleString();
    console.log(`Das aktuelle Lineup wurde gelöscht -- ${date}`)
  }

  if(currentLineupLiga2.get('Mercedes')[0] && currentLineupLiga2.get('Mercedes')[1] &&
    currentLineupLiga2.get('Red Bull')[0] && currentLineupLiga2.get('Red Bull')[1] &&
    currentLineupLiga2.get('Ferrari')[0] && currentLineupLiga2.get('Ferrari')[1] &&
    currentLineupLiga2.get('McLaren')[0] && currentLineupLiga2.get('McLaren')[1] &&
    currentLineupLiga2.get('Aston Martin')[0] && currentLineupLiga2.get('Aston Martin')[1] &&
    currentLineupLiga2.get('Alpine')[0] && currentLineupLiga2.get('Alpine')[1] &&
    currentLineupLiga2.get('Alpha Tauri')[0] && currentLineupLiga2.get('Alpha Tauri')[1] &&
    currentLineupLiga2.get('Alfa Romeo')[0] && currentLineupLiga2.get('Alfa Romeo')[1] && 
    currentLineupLiga2.get('Williams')[0] && currentLineupLiga2.get('Williams')[1] &&
    currentLineupLiga2.get('Haas')[0] && currentLineupLiga2.get('Haas')[1]){

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

      // Sends actual Message
      await client.channels.cache.get(infoChannelIDLiga2).send({ embeds : [lineupEmbed]}).then((msg) => {
        msgLineupLiga2 = msg.id;
      });
  } else {
    message.reply(`Es ist etwas schiefgelaufen beim ausführen des lineup Command`).then(() => {
      let date = new Date().toLocaleString();
      console.log(`Eines der Elemente in der Liste wurde nicht richtig definiert oder beim ausgeben des Lineups ist ein anderer Fehler aufgetreten. Standard Lineup -- ${date}`);
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
  if(currentLineupLiga2.get(teamName)[seat] == 'nicht besetzt'){
    return '<nicht besetzt>'
  } else {
    return `<@${currentLineupLiga2.get(teamName)[seat]}>`;
  }
}

/**
 * Finds out if there is a free car for a driver on the waitinglist
 * 
 * @param {*} client 
 */
async function checkSubCanBeMade(client, message, fromForceRemove, positionForForce, driverForForce, carForForce){
  if(freeCarsLiga2.length > 0 && ((subPersonListLiga2.length + subPersonListReinstatedDriversLiga2.length) > 0)){
    let driverToStart = null;
    if(subPersonListReinstatedDriversLiga2.length > 0){
      driverToStart = subPersonListReinstatedDriversLiga2.shift();
    } else {
      driverToStart = subPersonListLiga2.shift();
    } 
    let carToTake = freeCarsLiga2.shift();

    if(!(client.guilds.cache.get(discordID).members.cache.get(driverToStart))){
      let date = new Date();
      console.log(`In Liga 2 wurde checkSubCanBeMade ausgeführt, aber der driverToStart war in irgendeiner Weise falsch. 
                  Hier die ID des driverToStart: ${driverToStart}-- ${date}`);
      return;
    }

    let date = new Date();
    console.log(`Prüfsumme für Liga 2, Methode checkSubCanBeMade. Das Auto was gerade belegt wird hat ID ${carToTake}, der 
                Fahrer der es nimmt hat die ID ${driverToStart}. Beides darf nicht null oder undefined sein. -- ${date}`);

    if(!fromForceRemove &&
      client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDLiga2) &&
      checkIfCarIsFree(client, carToTake)){

      var seatOpen = false;

      // ID Team von Stammfahrer der wieder dazu kommt
      let mainTeamNameString = findMainTeamString(client.guilds.cache.get(discordID).members.cache.get(driverToStart));

      let mainTeamIDString = null;
      client.guilds.cache.get(discordID).roles.cache.find(role => {
        if(role.name === mainTeamNameString){
          mainTeamIDString = role.id;
        }
      })

      var subDriverPosition = null
      if(currentLineupLiga2.get(mainTeamNameString)[0] == 'nicht besetzt'){
        subDriverPosition = 0
        seatOpen = true
      } else if(currentLineupLiga2.get(mainTeamNameString)[1] == 'nicht besetzt'){
        subDriverPosition = 1
        seatOpen = true
      } else if(client.guilds.cache.get(discordID).members.cache.get(currentLineupLiga2.get(mainTeamNameString)[0]).roles.cache.has(ersatzfahrerRolleID)){
        subDriverPosition = 0
      } else if(client.guilds.cache.get(discordID).members.cache.get(currentLineupLiga2.get(mainTeamNameString)[1]).roles.cache.has(ersatzfahrerRolleID)){
        subDriverPosition = 1
      }

      if(subDriverPosition != null){
        var subDriverID = currentLineupLiga2.get(mainTeamNameString)[subDriverPosition];
      } else {
        let date = new Date()
        console.log(`Methode: CheckSubCanBeMade, Fall: 1 => Stammfahrer kommt zurück, subDriverPosition war null -- ${date}`)
        return
      }

      await regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition);

      let mainDriverEmbed = new MessageEmbed()
      .setColor('AQUA')
      .setTitle('🔄')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt seinen Stammplatz wieder`}
      )

      if(seatOpen == false){
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

        await client.channels.cache.get(anmeldeChannelIDLiga2).send({embeds : [subDriverEmbed]}).then(() => {
          client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
          client.guilds.cache.get(discordID).members.cache.get(subDriverID).send(`Es ergab sich eine Verschiebung im Lineup, du fährst am Wochenende ` + 
          `den  ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}`);
        });
      }

      await client.channels.cache.get(anmeldeChannelIDLiga2).send({embeds : [mainDriverEmbed]}).then(() => {
        client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
        client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
      });
    
      let date = new Date().toLocaleString();
      if(subDriverID && subDriverID != 'nicht besetzt'){
        console.log(`${client.guilds.cache.get(discordID).members.cache.get(subDriverID).user.username} übernimmt einen ` + 
                      `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} und ` + 
                      `${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt seinen Stammplatz wieder -- ${date}`);
      } else {
        console.log(`${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt seinen Stammplatz wieder -- ${date}`);
      }
      
    } else  if(withdrawnDriversLiga2.length > 0 && !fromForceRemove &&
              client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(ersatzfahrerRolleIDLiga2) &&
              (client.guilds.cache.get(discordID).members.cache.get(withdrawnDrivers[withdrawnDrivers.length - 1]).roles.cache.has(stammfahrerRolleIDLiga2) ||
              client.guilds.cache.get(discordID).members.cache.get(withdrawnDrivers[withdrawnDrivers.length - 1]).roles.cache.has(ersatzfahrerRolleIDLiga2)) &&
              checkIfCarIsFree(client, carToTake)){

      changeLineupNormalSub(client, message, driverToStart, carToTake);

      let subDriverEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('➡️')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt den <@&${carToTake}>`}
      );

      await client.channels.cache.get(anmeldeChannelIDLiga2).send({embeds : [subDriverEmbed]}).then(() => {
         client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
         client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du fährst diese Woche den ` + 
        `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}! Viel Glück beim Rennen 🍀`);
      });


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

      await client.channels.cache.get(anmeldeChannelIDLiga2).send({embeds : [subDriverEmbed]}).then(() => {
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

      await client.channels.cache.get(anmeldeChannelIDLiga2).send({embeds : [subDriverEmbed]}).then(() => {
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
  await setWaitListMsgContent(client);
  await printLineup(client, message);
}

/**
 * Finds team of the absent driver and adds it to the list of free cars

 * @param {*} member 
 */
async function addCarOfWithdrawnDriverToFreeCars(member){
  if(member.roles.cache.has(mercedesRoleIDLiga2)){
    freeCarsLiga2.push(mercedesRoleIDLiga2);
  } else if(member.roles.cache.has(redBullRoleIDLiga2)){
    freeCarsLiga2.push(redBullRoleIDLiga2);
  } else if(member.roles.cache.has(ferrariRoleIDLiga2)){
    freeCarsLiga2.push(ferrariRoleIDLiga2);
  } else if(member.roles.cache.has(mcLarenRoleIDLiga2)){
    freeCarsLiga2.push(mcLarenRoleIDLiga2);
  } else if(member.roles.cache.has(astonMartinRoleIDLiga2)){
    freeCarsLiga2.push(astonMartinRoleIDLiga2);
  } else if(member.roles.cache.has(alpineRoleIDLiga2)){
    freeCarsLiga2.push(alpineRoleIDLiga2);
  } else if(member.roles.cache.has(alphaTauriRoleIDLiga2)){
    freeCarsLiga2.push(alphaTauriRoleIDLiga2);
  } else if(member.roles.cache.has(alfaRomeoRoleIDLiga2)){
    freeCarsLiga2.push(alfaRomeoRoleIDLiga2);
  } else if(member.roles.cache.has(williamsRoleIDLiga2)){
    freeCarsLiga2.push(williamsRoleIDLiga2);
  } else if(member.roles.cache.has(haasRoleIDLiga2)){
    freeCarsLiga2.push(haasRoleIDLiga2);
  } else {
    console.log('No role found');
  }
}

/**
 * Manages waitinglist. Adds and removes drivers by adjusting the messages sent, when the command is called
 * 
 * @param {*} waitListMsg 
 * @param {*} client 
 */
async function setWaitListMsgContent(client){

  var waitListContent = subPersonListReinstatedDriversLiga2.concat(subPersonListLiga2);

  var waitListDefaultMessage = `Warteliste:`;

  for(let i = 0; i < waitListContent.length; i++){
    if(i == 0){
      waitListDefaultMessage += ` <@${waitListContent[i]}>`;
    } else {
      waitListDefaultMessage += `, <@${waitListContent[i]}>`;
    }
  }

  client.channels.cache.get(anmeldeChannelIDLiga2).messages.fetch(waitListMsgIDLiga2).then((msg) => {
     msg.edit(waitListDefaultMessage)
  });

  var freeCarListDefaultMessage = `Freie Autos:`;

  for(let i = 0; i < freeCarsLiga2.length; i++){
    if(i == 0){
      freeCarListDefaultMessage += ` <@&${freeCarsLiga2[i]}>`;
    } else {
      freeCarListDefaultMessage += `, <@&${freeCarsLiga2[i]}>`;
    }
  }

  client.channels.cache.get(anmeldeChannelIDLiga2).messages.fetch(freeCarMsgIDLiga2).then((msg) => {
     msg.edit(freeCarListDefaultMessage)
  });
    
}

function setDefaultLineup(){
  
  currentLineupLiga2.set("Mercedes", []);
  currentLineupLiga2.set("Red Bull", []);
  currentLineupLiga2.set("Ferrari", []);
  currentLineupLiga2.set("McLaren", []);
  currentLineupLiga2.set("Aston Martin", []);
  currentLineupLiga2.set("Alpine", []);
  currentLineupLiga2.set("Alpha Tauri", []);
  currentLineupLiga2.set("Alfa Romeo", []);
  currentLineupLiga2.set("Williams", []);
  currentLineupLiga2.set("Haas", []);

  currentLineupLiga2.get('Mercedes').push(mercedesDriversLiga2[0]);
  currentLineupLiga2.get('Mercedes').push(mercedesDriversLiga2[1]);
  currentLineupLiga2.get('Red Bull').push(redBullDriversLiga2[0]);
  currentLineupLiga2.get('Red Bull').push(redBullDriversLiga2[1]);
  currentLineupLiga2.get('Ferrari').push(ferrariDriversLiga2[0]);
  currentLineupLiga2.get('Ferrari').push(ferrariDriversLiga2[1]);
  currentLineupLiga2.get('McLaren').push(mcLarenDriversLiga2[0]);
  currentLineupLiga2.get('McLaren').push(mcLarenDriversLiga2[1]);
  currentLineupLiga2.get('Aston Martin').push(astonMartinDriversLiga2[0]);
  currentLineupLiga2.get('Aston Martin').push(astonMartinDriversLiga2[1]);
  currentLineupLiga2.get('Alpine').push(alpineDriversLiga2[0]);
  currentLineupLiga2.get('Alpine').push(alpineDriversLiga2[1]);
  currentLineupLiga2.get('Alpha Tauri').push(alphaTauriDriversLiga2[0]);
  currentLineupLiga2.get('Alpha Tauri').push(alphaTauriDriversLiga2[1]);
  currentLineupLiga2.get('Alfa Romeo').push(alfaRomeoDriversLiga2[0]);
  currentLineupLiga2.get('Alfa Romeo').push(alfaRomeoDriversLiga2[1]);
  currentLineupLiga2.get('Williams').push(williamsDriversLiga2[0]);
  currentLineupLiga2.get('Williams').push(williamsDriversLiga2[1]);
  currentLineupLiga2.get('Haas').push(haasDriversLiga2[0]);
  currentLineupLiga2.get('Haas').push(haasDriversLiga2[1]);
  
}

function findMainTeamString(member){
  if(member.roles.cache.has(mercedesRoleIDLiga2)){
    return 'Mercedes';
  } else if(member.roles.cache.has(redBullRoleIDLiga2)){
    return 'Red Bull';
  } else if(member.roles.cache.has(ferrariRoleIDLiga2)){
    return 'Ferrari';
  } else if(member.roles.cache.has(mcLarenRoleIDLiga2)){
    return 'McLaren';
  } else if(member.roles.cache.has(astonMartinRoleIDLiga2)){
    return 'Aston Martin';
  } else if(member.roles.cache.has(alpineRoleIDLiga2)){
    return 'Alpine';
  } else if(member.roles.cache.has(alphaTauriRoleIDLiga2)){
    return 'Alpha Tauri';
  } else if(member.roles.cache.has(alfaRomeoRoleIDLiga2)){
    return 'Alfa Romeo';
  } else if(member.roles.cache.has(williamsRoleIDLiga2)){
    return 'Williams';
  } else if(member.roles.cache.has(haasRoleIDLiga2)){
    return 'Haas';
  } 
}

function checkIfCarIsFree(client, carToTake){
  let teamNameString; 
  client.guilds.cache.get(discordID).roles.cache.find(role => {
    if(role.id == carToTake){
      teamNameString = role.name;             
    }
  });

  if(currentLineupLiga2.get(teamNameString)[0] == `nicht besetzt` || currentLineupLiga2.get(teamNameString)[1] == `nicht besetzt`){
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
  subPersonListLiga2 = [];
  subPersonListReinstatedDriversLiga2 = [];
  freeCarsLiga2 = [];
  withdrawnDriversLiga2 = [];
  driversWithdrawnPerCommandLiga2 = [];
  driversSubInPerCommandLiga2 = [];
  msgLineupLiga2 = null;
  return flag;
}

/**
 * Clears the "Anmeldechannel" and the "Abmeldechannel" to keep the channels current
 * 
 * @param {Client} client 
 */
 async function clearChannels(client){
  await client.channels.cache.get(anmeldeChannelIDLiga2).bulkDelete(100).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Der Anmelde-Channel wurde gecleart -- ${date}`)
  });

  await client.channels.cache.get(abmeldeChannelIDLiga2).bulkDelete(100).then(() => {
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
  await client.channels.cache.get(anmeldeChannelIDLiga2).send(`<@&${ersatzfahrerRolleIDLiga2}> die Anmeldung für das ` + 
                                                              `Ligarennen in ${flag} ist hiermit eröffnet!`).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Die Anmeldung für Liga 2 in ${flag} wurde eröffnet. -- ${date}`);
  });

  // Message for List of waiting drivers
  await client.channels.cache.get(anmeldeChannelIDLiga2).send(`Warteliste:`).then((msg) => {
    waitListMsgIDLiga2 = msg.id;
  });     
  
  // Message for List of free cars
  await client.channels.cache.get(anmeldeChannelIDLiga2).send(`Freie Autos:`).then((msg) => {
    freeCarMsgIDLiga2 = msg.id;
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

  subPersonListLiga2.push(driverObject.user.id);

  // Creates the embed send in the "Anmeldechannel" if sub driver reacted
  let subInEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('➡️')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> hat sich für diese Woche angemeldet`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga2).send({ embeds : [subInEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} hat sich erfolgreich angemeldet -- ${date}`);

  await checkSubCanBeMade(client, message);
}

async function regularDriverWithdraw(client, driverObject, message){

  withdrawnDriversLiga2.push(driverObject.user.id);
  await addCarOfWithdrawnDriverToFreeCars(driverObject);
  await removeFromCurrentLineup(driverObject, client, message, null);

  let withdrawnEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('⬅️')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche nicht dabei`}
  )
                  
  await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga2).send({ embeds : [withdrawnEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawnEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} hat sich erfolgreich abgemeldet -- ${date}`); 

  
  await checkSubCanBeMade(client, message);
}


async function subDriverRemoveSubInOnWaitlist(client, driverObject, message){

  let element = subPersonListLiga2.indexOf(driverObject.user.id);
  subPersonListLiga2.splice(element, 1);  

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga2).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich von der Warteliste entfernt -- ${date}`);
    
  await checkSubCanBeMade(client, message);
}

async function subDriverRemoveSubInInLineup(client, driverObject, message){

  let freeCar = await findCurrentCockpitOfSub(driverObject);
  freeCarsLiga2.push(freeCar);
  await removeFromCurrentLineup(driverObject, client, message, freeCar);

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga2).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich aus Lineup genommen -- ${date}`);

  await checkSubCanBeMade(client, message);
}

async function regularDriverRemoveWithdraw(client, driverObject, message){        
  
  subPersonListReinstatedDriversLiga2.push(driverObject.user.id);
  withdrawnDriversLiga2.splice(withdrawnDriversLiga2.indexOf(driverObject.user.id), 1);

  let withdrawRemoveEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('️️️️️️️️↪')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> ist diese Woche doch dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga2).send({ embeds : [withdrawRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawRemoveEmbed]});
  })

  let date = new Date().toLocaleString();
  console.log(`Die Abmeldung von ${driverObject.user.username} wurde erfolgreich zurückgenommen -- ${date}`);
  
  await checkSubCanBeMade(client, message);
}

async function sendTeams(client){
  if(currentRegularDriversLiga2 != null){
    await client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).messages.fetch(currentRegularDriversLiga2).then((msg) => {
      msg.delete();
    })
  }
  regularDriversLiga2.set("Mercedes", mercedesDriversLiga2);
  regularDriversLiga2.set("Red Bull", redBullDriversLiga2);
  regularDriversLiga2.set("Ferrari", ferrariDriversLiga2);
  regularDriversLiga2.set("McLaren", mcLarenDriversLiga2);
  regularDriversLiga2.set("Aston Martin", astonMartinDriversLiga2);
  regularDriversLiga2.set("Alpine", alpineDriversLiga2);
  regularDriversLiga2.set("Alpha Tauri", alphaTauriDriversLiga2);
  regularDriversLiga2.set("Alfa Romeo", alfaRomeoDriversLiga2);
  regularDriversLiga2.set("Williams", williamsDriversLiga2);
  regularDriversLiga2.set("Haas", haasDriversLiga2);

  let regularDriverEmbed = new MessageEmbed()
  .setColor('DARK_BLUE')
  .setTitle('️️️️️️️️Stammfahrer Liga 2')
  .addFields(
    {name: `Mercedes`, value: `<@${regularDriversLiga2.get('Mercedes')[0]}> und <@${regularDriversLiga2.get('Mercedes')[1]}>`},
    {name: `Red Bull`, value: `<@${regularDriversLiga2.get('Red Bull')[0]}> und <@${regularDriversLiga2.get('Red Bull')[1]}>`},
    {name: `Ferrari`, value: `<@${regularDriversLiga2.get('Ferrari')[0]}> und <@${regularDriversLiga2.get('Ferrari')[1]}>`},
    {name: `McLaren`, value: `<@${regularDriversLiga2.get('McLaren')[0]}> und <@${regularDriversLiga2.get('McLaren')[1]}>`},
    {name: `Aston Martin`, value: `<@${regularDriversLiga2.get('Aston Martin')[0]}> und <@${regularDriversLiga2.get('Aston Martin')[1]}>`},
    {name: `Alpine`, value: `<@${regularDriversLiga2.get('Alpine')[0]}> und <@${regularDriversLiga2.get('Alpine')[1]}>`},
    {name: `Alpha Tauri`, value: `<@${regularDriversLiga2.get('Alpha Tauri')[0]}> und <@${regularDriversLiga2.get('Alpha Tauri')[1]}>`},
    {name: `Alfa Romeo`, value: `<@${regularDriversLiga2.get('Alfa Romeo')[0]}> und <@${regularDriversLiga2.get('Alfa Romeo')[1]}>`},
    {name: `Williams`, value: `<@${regularDriversLiga2.get('Williams')[0]}> und <@${regularDriversLiga2.get('Williams')[1]}>`},
    {name: `Haas`, value: `<@${regularDriversLiga2.get('Haas')[0]}> und <@${regularDriversLiga2.get('Haas')[1]}>`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).send({ embeds : [regularDriverEmbed]}).then((msg) => {
    currentRegularDriversLiga2 = msg.id;
  })
}

async function findCurrentCockpitOfSub(driverObject){
  if(currentLineupLiga2.get('Mercedes').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Mercedes`);
    return mercedesRoleIDLiga2;
  }else if(currentLineupLiga2.get('Red Bull').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Red Bull`);
    return redBullRoleIDLiga2;
  }else if(currentLineupLiga2.get('Ferrari').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Ferrari`);
    return ferrariRoleIDLiga2;
  }else if(currentLineupLiga2.get('McLaren').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im McLaren`);
    return mcLarenRoleIDLiga2;
  }else if(currentLineupLiga2.get('Aston Martin').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Aston Martin`);
    return astonMartinRoleIDLiga2;
  }else if(currentLineupLiga2.get('Alpine').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpine`);
    return alpineRoleIDLiga2;
  }else if(currentLineupLiga2.get('Alpha Tauri').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpha Tauri`);
    return alphaTauriRoleIDLiga2;
  }else if(currentLineupLiga2.get('Alfa Romeo').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alfa Romeo`);
    return alfaRomeoRoleIDLiga2;
  }else if(currentLineupLiga2.get('Williams').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Williams`);
    return williamsRoleIDLiga2;
  }else if(currentLineupLiga2.get('Haas').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Haas`);
    return haasRoleIDLiga2;
  }
}

module.exports = {
    name: 'start2',
    aliases: ['lineup2', 'anmelden2', 'abmelden2', 'removeabmeldung2', 'removeanmeldung2',
              'forceremove2', 'forcein2', 'forcefree2', 'end2', 'removefromwaitlist2'],
    description: 'Can manage driverswaps for F1 league races. Used for IRC League 2',
    async execute(client, message, cmd, args, Discord){
      // Starts the main command of the bot
      if(cmd === 'start2' && message.member.roles.cache.has(rennleiterRolleID)){
        if(!(args[0])){
          message.reply(`Du musst das Land der Strecke als Emoji mitübergben`)
        }else{
          flag = await initVariables(args[0]);

          await clearChannels(client);

          setDefaultLineup();
          await sendTeams(client);
          
          await sendFreeCarsWaitListDefaultLineup(client, message, flag);
          // Init block end

          let embedAnmeldung = new MessageEmbed()
          .setColor('#0064fd')
          .setTitle('Anmeldung für Ersatzfahrer')
          .setDescription(`Diese Nachricht ist NUR für Ersatzfahrer relevant. Um euch anzumelden für das Ligarennen in ${flag} bitte mit ` +
                        `dem ✅ unter dieser Nachricht reagieren, falls ihr mitfahren wollt. `+
                        `Die Ersatzfahrer werden, sobald ein Cockpit frei wird, eingefügt. Hier gilt, wer sich zuerst anmeldet kriegt zuerst ein Cockpit. ` +
                        `Wenn ihr ein Cockpit habt, kriegt ihr vom Bot eine Privatnachricht. Trotzdem bitte hin ` +
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
          await client.channels.cache.get(anmeldeChannelIDLiga2).send({ embeds: [embedAnmeldung] }).then((msg) => {
            messageEmbededAnmelden = msg;
            messageEmbededAnmeldenID = msg.id;
          });

          let messageEmbededAbmelden = null
          await client.channels.cache.get(abmeldeChannelIDLiga2).send({ embeds: [embedAbmeldung] }).then((msg) => {
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
            if(reaction.message.channel.id == anmeldeChannelIDLiga2){
              if(reaction.emoji.name === anmeldenEmoji && !(driversSubInPerCommandLiga2.includes(user.id)) && 
                  reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga2)){
                subDriverIn(client, reaction.message.guild.members.cache.get(user.id), message);
              
              } else if(reaction.emoji.name != anmeldenEmoji) {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
              
              } else {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} wurde schon per Befehl hinzugefügt -- ${date}`);
              }             
            }
          });
            // Abmeldevorgang
          collectorWithdraw.on('collect', async (reaction, user) => {
            if(reaction.message.channel.id == abmeldeChannelIDLiga2){
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
              if(reaction.emoji.name === abmeldenEmoji && !(driversWithdrawnPerCommandLiga2.includes(user.id)) &&
                    reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga2)){
                regularDriverWithdraw(client, reaction.message.guild.members.cache.get(user.id), message);                          
              } else if(reaction.emoji.name !== abmeldenEmoji) {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
              } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga2))) {
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
            if(reaction.message.channel.id == anmeldeChannelIDLiga2){
              if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga2)){
                if(reaction.emoji.name == anmeldenEmoji){
                  // Fahrer ist noch auf Warteliste
                  if(driversSubInPerCommandLiga2.includes(user.id)){
                    let date = new Date().toLocaleString();
                    console.log(`${user.username} wurde die Reaktion verweigert, da er per Command abgemeldet ist -- ${date}`);
                  } else {
                    if(subPersonListLiga2.includes(reaction.message.guild.members.cache.get(user.id).user.id)){
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
            if(reaction.message.channel.id == abmeldeChannelIDLiga2){
              let date = new Date();
              console.log(`In Liga 2 hat ${user.username} mit ID ${user.id} seine Abmeldung zurückgenommen. Prüfsumme(darf niemals undefined sein): 
                          ID: ${reaction.message.guild.members.cache.get(user.id).id}, DC-Name: ${reaction.message.guild.members.cache.get(user.id).nickname} -- ${date}`)
              if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga2)){
                if(reaction.emoji.name == abmeldenEmoji){
                  if(!(driversWithdrawnPerCommandLiga2.includes(user.id))){
                    regularDriverRemoveWithdraw(client, reaction.message.guild.members.cache.get(user.id), message);
                    let date = new Date();
                    console.log(`Die Reaktion von ${reaction.message.guild.members.cache.get(user.id).nickname} tum Abmelden wurde erfolgreich entfernt. -- ${date}`);
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
      if(cmd === 'start2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply('Dieser Command kann nur von der Rennleitung ausgeführt werden').then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den start Command auszuführen hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
      
      if(cmd === 'anmelden2' && message.member.roles.cache.has(rennleiterRolleID)){
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
            if(reaction.emoji.name == anmeldenEmoji){


              if(markedUserObjectSubIn && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDLiga2)){                

                subDriverIn(client, markedUserObjectSubIn, message);
                driversSubInPerCommandLiga2.push(markedUserObjectSubIn.user.id);

                
                
                  
              }else if(markedUserObjectSubIn && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDLiga2))){
                message.reply(`Etwas ist schief gelaufen. Der markiert User hat nicht die richtige Rolle`).then(() => {
                  let date = new Date().toLocaleString();
                  console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
                  `Fahrer: ${markedUserObjectSubIn.user.username} -- ${date}`);
                })  
              }else{
                message.reply(`Etwas ist schief gelaufen. Stelle sicher, dass du den Command in der Form: %anmelden1 @Usertag ausgeführt hast`).then(() => {
                  let date = new Date().toLocaleString();
                  console.log(`Es ist etwas schiefgelaufen beim anmelden Command. Das Userobjekt war wahrscheinlich ` + 
                  `entweder undefiniert oder null -- ${date}`);
                })  
              }
              await confirmMessage.delete();
            } else if(reaction.emoji.name == abmeldenEmoji){
              await confirmMessage.reply('Der Vorgang wurde erfolgreich abgebrochen!').then(() => {
                let date = new Date().toLocaleString();
                console.log(`Der manuelle Anmeldeprozess wurde gestartet und abgebrochen -- ${date}`)
              });
              await confirmMessage.delete();
            } else {
              await confirmMessage.reply('Es wurde mit dem falschen Emoji reagiert').then(() => {
                let date = new Date().toLocaleString();
                console.log(`Der manuelle Abmeldeprozess wurde gestartet und es wurde mit dem flaschen Emoji reagiert -- ${date}`)
              })
              await reaction.users.remove(user.id);
            }
          })
        }
      }
      if(cmd === 'anmelden2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der anmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den anmelden Command auszuführen, hat aber `+ 
          `keine Berechtigung dafür -- ${date}`);
        })
      }
      if(cmd === 'abmelden2' && message.member.roles.cache.has(rennleiterRolleID)){
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
          
              if(markedUserObjectWithdraw && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDLiga2)){

                regularDriverWithdraw(client, markedUserObjectWithdraw, message);
                driversWithdrawnPerCommandLiga2.push(markedUserObjectWithdraw.user.id);           
                
                
                
              } else if (markedUserObjectWithdraw && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDLiga2))){
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
      if(cmd === 'abmelden2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeabmeldung2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeanmeldung2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeanmeldung2' && (message.member.roles.cache.has(rennleiterRolleID))){
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

          if(markedUserObjectSubInRemove.roles.cache.has(ersatzfahrerRolleIDLiga2)){
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
                if(client.guilds.cache.get(discordID).members.cache.get(markedUserIDSubInRemove).roles.cache.has(ersatzfahrerRolleIDLiga2)){
                  if(subPersonListLiga2.includes(markedUserObjectSubInRemove.user.id)){
                    
                    subDriverRemoveSubInOnWaitlist(client, markedUserObjectSubInRemove, message);
                    driversSubInPerCommandLiga2.splice(driversSubInPerCommandLiga2.indexOf(markedUserObjectSubInRemove.user.id), 1);

                    
                  } else if(!(subPersonListLiga2.includes(markedUserObjectSubInRemove.user.id))){
                    
                    subDriverRemoveSubInInLineup(client, markedUserObjectSubInRemove, message);
                    driversSubInPerCommandLiga2.splice(driversSubInPerCommandLiga2.indexOf(markedUserObjectSubInRemove.user.id), 1);
                    

                  } else {
                    let date = new Date().toLocaleString();
                    console.log(`${markedUserObjectSubInRemove.user.username} Es ist ein Fehler aufgetreten beim Versuch einen Fahrer wieder abzumelden -- ${date}`);
                  }
                  await confirmMessage.delete();
                } else {
                  message.reply(`Etwas ist schief gelaufen. Der markiert User hat nicht die richtige Rolle`).then(() => {
                    let date = new Date().toLocaleString();
                    console.log(`Es ist etwas schiefgelaufen beim removeAbmelden Command. Der markierte User hat nicht die richtige Rolle. ` + 
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
          }
        }
      }

      if(cmd === 'removeabmeldung2' && message.member.roles.cache.has(rennleiterRolleID)){

        if(!args[0]){
          message.reply('Bitte gebe den User an')
        }else{

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

              
              let markedUserIDRemove = args[0].slice(3, 21);

              let markedUserObjectWithdrawRemove = null;
              client.guilds.cache.get(discordID).members.cache.find(member => {
                // Finds the whole object of the member given in message
                if(member.id === markedUserIDRemove){
                  markedUserObjectWithdrawRemove = member;
                }
              })

              if(markedUserObjectWithdrawRemove.roles.cache.has(stammfahrerRolleIDLiga2)){

                regularDriverRemoveWithdraw(client, markedUserObjectWithdrawRemove, message);
                driversWithdrawnPerCommandLiga2.splice(driversWithdrawnPerCommandLiga2.indexOf(markedUserObjectWithdrawRemove.user.id), 1);
                await confirmMessage.delete();

    
              } else {
                let date = new Date().toLocaleString();
                message.reply(`Fahrer braucht die Liga 2-Stammfahrerrolle -- ${date}`);
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
        }
      }

     
      if(cmd == 'forceremove2' && message.member.roles.cache.has(rennleiterRolleID)){
        let forceRemoveTeamEmbed = new MessageEmbed()
        .setColor('#fd5100')
        .setTitle('Bitte wähle das Team aus')
        .setDescription('Hier wird das Team gewählt aus welchem der Fahrer entfernt wird')
        .addFields(
          {name: 'Row 1', value: `0️⃣ - <@&${mercedesRoleIDLiga2}> und 1️⃣ - <@&${redBullRoleIDLiga2}>`},
          {name: 'Row 2', value: `2️⃣ - <@&${ferrariRoleIDLiga2}> und 3️⃣ - <@&${mcLarenRoleIDLiga2}>`},
          {name: 'Row 3', value: `4️⃣ - <@&${astonMartinRoleIDLiga2}> und 5️⃣ - <@&${alpineRoleIDLiga2}>`},
          {name: 'Row 4', value: `6️⃣ - <@&${alphaTauriRoleIDLiga2}> und 7️⃣ - <@&${alfaRomeoRoleIDLiga2}>`},
          {name: 'Row 5', value: `8️⃣ - <@&${williamsRoleIDLiga2}> und 9️⃣ - <@&${haasRoleIDLiga2}>`},
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
            .setDescription(`Du hast Team <@&${mercedesRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Mercedes')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Mercedes')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Mercedes')[0];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mercedesRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    mercedesDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
            
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
  
                    mercedesDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
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
  
                    mercedesDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
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
  
                    mercedesDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  } 
                  /**
                  * 
                  * Team Mercedes, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    mercedesDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Team 1')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
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
                let driverToRemove = currentLineupLiga2.get('Mercedes')[1];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mercedesRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    mercedesDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
            
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
  
                    mercedesDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
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
  
                    mercedesDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
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
  
                    mercedesDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Mercedes, Fahrer 2, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    mercedesDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${redBullRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Red Bull')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Red Bull')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Red Bull')[0];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${redBullRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    redBullDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
            
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
  
                    redBullDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
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
  
                    redBullDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
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
  
              
                    redBullDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
                    
  
                  }
                  /**
                  * 
                  * Team Red Bull, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    redBullDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
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
                let driverToRemove = currentLineupLiga2.get('Red Bull')[1];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${redBullRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    redBullDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
            
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
  
                    redBullDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
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
  
                    redBullDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
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
  
                    redBullDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Red Bull, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    redBullDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${ferrariRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Ferrari')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Ferrari')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Ferrari')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${ferrariRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    ferrariDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                        
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
  
                    ferrariDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
                      
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
          
                    ferrariDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineup2.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
                      
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
          
                    ferrariDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineup2.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
                  }
                  /**
                  * 
                  * Team Ferrari, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    ferrariDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
                      
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
                let driverToRemove = currentLineupLiga2.get('Ferrari')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${ferrariRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    ferrariDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                  
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
  
                    ferrariDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
            
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
  
                    ferrariDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
            
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
  
                    ferrariDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Ferrari, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    ferrariDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${mcLarenRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('McLaren')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('McLaren')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('McLaren')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mcLarenRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    mcLarenDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                        
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
  
                    mcLarenDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
                      
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
          
                    mcLarenDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
                      
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
          
                    mcLarenDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
          
                  }
                  /**
                  * 
                  * Team McLaren, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    mcLarenDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
                      
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
                let driverToRemove = currentLineupLiga2.get('McLaren')[1];
          
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mcLarenRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    mcLarenDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                    
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
  
                    mcLarenDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
              
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
  
                    mcLarenDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
              
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
  
                    mcLarenDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
              
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team McLaren, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    mcLarenDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga2);
              
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
            .setDescription(`Du hast Team <@&${astonMartinRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Aston Martin')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Aston Martin')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Aston Martin')[0];
            
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${astonMartinRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    astonMartinDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
              
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                          
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
  
                    astonMartinDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
                      
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
          
                    astonMartinDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
                      
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
          
                    astonMartinDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
                  }
                  /**
                  * 
                  * Team Aston Martin, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    astonMartinDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
                      
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
                let driverToRemove = currentLineupLiga2.get('Aston Martin')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${astonMartinRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    astonMartinDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                  
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
  
                    astonMartinDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
            
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
  
                    astonMartinDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
            
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
  
                    astonMartinDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
                  }
                  /**
                  * 
                  * Team Aston Martin, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    astonMartinDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${alpineRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Alpine')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Alpine')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Alpine')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alpineRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    alpineDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                        
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
  
                    alpineDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
                      
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
          
                    alpineDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
                      
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
          
                    alpineDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
                  }
                  /**
                  * 
                  * Team Alpine, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    alpineDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
                      
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
             ///////////////////////////////////////////////////////////////AB HIERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
              } else if(reaction.emoji.name == '2️⃣'){
                let driverToRemove = currentLineupLiga2.get('Alpine')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alpineRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    alpineDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                  
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
  
                    alpineDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
            
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
  
                    alpineDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
            
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
  
                    alpineDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Alpine, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    alpineDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${alphaTauriRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Alpha Tauri')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Alpha Tauri')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Alpha Tauri')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alphaTauriRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    alphaTauriDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                        
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
  
                    alphaTauriDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
                      
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
          
                    alphaTauriDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
                      
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
          
                    alphaTauriDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
                  }
                  /**
                  * 
                  * Team Alpha Tauri, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    alphaTauriDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
                      
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
                let driverToRemove = currentLineupLiga2.get('Alpha Tauri')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alphaTauriRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    alphaTauriDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                  
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
  
                    alphaTauriDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
            
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
  
                    alphaTauriDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
            
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
  
                    alphaTauriDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Alpha Tauri, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    alphaTauriDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${alfaRomeoRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen?`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Alfa Romeo')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Alfa Romeo')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Alfa Romeo')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alfaRomeoRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    alfaRomeoDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                        
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
  
                    alfaRomeoDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
                      
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
          
                    alfaRomeoDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
                      
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
          
                    alfaRomeoDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
                  }
                  /**
                  * 
                  * Team Alfa Romeo, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    alfaRomeoDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
                      
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
                let driverToRemove = currentLineupLiga2.get('Alfa Romeo')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alfaRomeoRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    alfaRomeoDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                  
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
  
                    alfaRomeoDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
            
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
  
                    alfaRomeoDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
            
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
  
                    alfaRomeoDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Alfa Romeo, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    alfaRomeoDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${williamsRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen?`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Williams')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Williams')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Williams')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${williamsRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    williamsDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                        
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
  
                    williamsDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
                      
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
          
                    williamsDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
                      
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
          
                    williamsDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
                  }
                  /**
                  * 
                  * Team Williams, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    williamsDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
                      
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
                let driverToRemove = currentLineupLiga2.get('Williams')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${williamsRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    williamsDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                  
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
  
                    williamsDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
            
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
  
                    williamsDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
            
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
  
                    williamsDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Williams, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    williamsDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga2);
            
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
            .setDescription(`Du hast Team <@&${haasRoleIDLiga2}> gewählt. Welchen Fahrer willst du entfernen?`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga2.get('Haas')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga2.get('Haas')[1]}>`},
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
                let driverToRemove = currentLineupLiga2.get('Haas')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${haasRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    haasDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                        
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
  
                    haasDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
                      
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
          
                    haasDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
                      
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
          
                    haasDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
                      
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
          
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
          
                  }
                  /**
                  * 
                  * Team Haas, Fahrer 1, Nichts davon
                  * 
                  */
                  else if(reaction.emoji.name == '5️⃣'){
  
                    haasDriversLiga2[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
                      
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
                let driverToRemove = currentLineupLiga2.get('Haas')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${haasRoleIDLiga2}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 1`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 3`},
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
  
                    haasDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
                    let fahrerF1Role = await message.guild.roles.cache.find(role => role.id === fahrerF1Rolle);
                  
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
  
                    haasDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
            
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
  
                    haasDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
            
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
  
                    haasDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga3);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
            
                    let roleRemoveMember = await client.guilds.cache.get(discordID).members.fetch(driverToRemove);
  
                    roleRemoveMember.roles.remove(regDriverRole);
                    roleRemoveMember.roles.remove(teamRole);
                    roleRemoveMember.roles.add(futureRole);
  
                  }
                  /**
                  * 
                  * Team Haas, Fahrer 2, Nichts davon
                  * 
                  */ 
                  else if(reaction.emoji.name == '5️⃣'){
  
                    haasDriversLiga2[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga2.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga2);
            
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
      if(cmd == 'forcein2' && message.member.roles.cache.has(rennleiterRolleID)){
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
  
          if(driverObject.roles.cache.has(ersatzfahrerRolleIDLiga2)){
           
            if(currentLineupLiga2.get(teamObject.name)[0] == 'entfernt'){
  
              if(teamObject.name == 'Mercedes'){
                mercedesDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Red Bull'){
                redBullDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Ferrari'){
                ferrariDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'McLaren'){
                mcLarenDriversLiga2[0] = driverID;
                sendTeams(client);
              } else  if(teamObject.name == 'Aston Martin'){
                astonMartinDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpine'){
                alpineDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpha Tauri'){
                alphaTauriDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alfa Romeo'){
                alfaRomeoDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Williams'){
                williamsDriversLiga2[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Haas'){
                haasDriversLiga2[0] = driverID;
                sendTeams(client);
              } else {
                console.log(`Errör`)
              }
  
              let subInRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
              let regularDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
  
              driverObject.roles.remove(subInRole);
              driverObject.roles.add(regularDriverRole);
              driverObject.roles.add(teamObject);
              if(subPersonListLiga2.includes(driverID)){
                subPersonListLiga2.splice(subPersonListLiga2.indexOf(driverObject), 1)
              }
              checkSubCanBeMade(client, message, true, 0, driverObject.user.id, teamObject.name);
            } else if(currentLineupLiga2.get(teamObject.name)[1] == 'entfernt'){
  
              if(teamObject.name == 'Mercedes'){
                mercedesDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Red Bull'){
                redBullDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Ferrari'){
                ferrariDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'McLaren'){
                mcLarenDriversLiga2[1] = driverID;
                sendTeams(client);
              } else  if(teamObject.name == 'Aston Martin'){
                astonMartinDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpine'){
                alpineDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpha Tauri'){
                alphaTauriDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alfa Romeo'){
                alfaRomeoDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Williams'){
                williamsDriversLiga2[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Haas'){
                haasDriversLiga2[1] = driverID;
                sendTeams(client);
              } else {
                console.log(`Errör`)
              }
  
              let subInRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
              let regularDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga2);
  
              driverObject.roles.remove(subInRole);
              driverObject.roles.add(regularDriverRole);
              driverObject.roles.add(teamObject);
              if(subPersonListLiga2.includes(driverID)){
                subPersonListLiga2.splice(subPersonListLiga2.indexOf(driverObject), 1)
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
      if(cmd == 'forcefree2' && message.member.roles.cache.has(rennleiterRolleID)){
          
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
  
          freeCarsLiga2.push(teamID);
  
          if(currentLineupLiga2.get(teamObject.name)[0] == 'entfernt'){
            currentLineupLiga2.get(teamObject.name)[0] = 'nicht besetzt';
            checkSubCanBeMade(client, message, true, 0, null, null);
          } else if(currentLineupLiga2.get(teamObject.name)[1] == 'entfernt'){
            currentLineupLiga2.get(teamObject.name)[1] = 'nicht besetzt';
            checkSubCanBeMade(client, message, true, 1, null, null);
          } else {
            message.reply(`Falsches Team übergeben`)
          }
        }
        
        
      }
  
      if(cmd == 'forcefree2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceFree Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
  
      if(cmd == 'forcein2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceIn Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceIn remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
  
      if(cmd == 'forceremove2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd == 'end2' && message.member.roles.cache.has(rennleiterRolleID)){
        await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga2).messages.fetch(messageEmbededAnmeldenID).then((msg) => {
          msg.delete();
        });
  
        await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga2).send(`Die Anmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
          console.log(`Die Anmeldung in Liga 2 wurde beendet`);
        })
  
        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga2).messages.fetch(messageEmbededAbmeldenID).then((msg) => {
          msg.delete();
        });
  
        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga2).send(`Die Abmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
          console.log(`Die Abmeldung in Liga 2 wurde beendet`);
        })
      }
  
      if(cmd == 'end2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
  

      if(cmd == 'removefromwaitlist2' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
  
      if(cmd == 'removefromwaitlist2' && (message.member.roles.cache.has(rennleiterRolleID))){
        if(args[0]){
          var positionToRemove = args[0];
          var lengthSubs = subPersonListLiga2.length;
          var lengthReinstated = subPersonListReinstatedDriversLiga2.length;
          console.log(lengthReinstated + lengthSubs)
          if(positionToRemove <= lengthReinstated + lengthSubs){
            if(positionToRemove <= lengthReinstated && lengthReinstated > 0){
              subPersonListReinstatedDriversLiga2.splice(positionToRemove - 1, 1);
            } else {
              positionToRemove = positionToRemove - lengthReinstated;
              subPersonListLiga2.splice(positionToRemove - 1, 1)
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
