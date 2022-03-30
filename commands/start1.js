const {MessageEmbed} = require('discord.js');

var subPersonListLiga1 = [];
var subPersonListReinstatedDriversLiga1 = [];
var freeCarsLiga1 = [];
var withdrawnDriversLiga1 = [];
var driversWithdrawnPerCommandLiga1 = [];
var driversSubInPerCommandLiga1 = [];
var flag = null;

// Mercedes-Team: Sven / Wie-Sie
var mercedesDriversLiga1 = ['427116609128103947', '382914407153401857'];
// Red Bull-Team: Broncos / Rocketship
var redBullDriversLiga1 = ['604645537882308609', '281100297051570177'];
// Ferrari-Team: Kante / Berkan
var ferrariDriversLiga1 = ['315803566591967243', '390515454583635969'];
// McLaren-Team: Kibu / Pascalus
var mcLarenDriversLiga1 = ['173416598101688320', '254292883492831232'];
// Aston Martin-Team: Charizz / Noryl
var astonMartinDriversLiga1 = ['469926134700703748', '289036587159912448'];
// Alpine-Team: Eriksen / Pala
var alpineDriversLiga1 = ['263760051515293696', '265537845081407489'];
// Alpha Tauri-Team: MRVN / Adman
var alphaTauriDriversLiga1 = ['495721676848496640', '269499201702854667'];
// Alfa Romeo-Team: Achimedes / Korky
var alfaRomeoDriversLiga1 = ['336841703816429570', '380076906172645390'];
// Williams-Team: Bado / Nyrox
var williamsDriversLiga1 = ['449253231621832706', '336885878029025280'];
// Haas-Team: GreatWolf / slowness
var haasDriversLiga1 = ['261399508812955648', '287309914508886016'];

var currentLineupLiga1 = new Map();
var regularDriversLiga1 = new Map();

const anmeldeChannelIDLiga1 = '857658403592863804';
const abmeldeChannelIDLiga1 = '869236783089590342';
const ersatzfahrerRolleIDLiga1 = '479056707104931840';
const stammfahrerRolleIDLiga1 = '841833530933379092';
const rennleiterRolleID = '479053658135461903';
const infoChannelIDLiga1 = '871757845400530974';
const commandChannelID = '901067530012078162';
const logChannelID = '901067704499322890';
const ehemaligerFahrerRolle = '587697224561983516';
const teamsChannelID = '866950218887987221';
const fahrerF1Rolle = '587695833428787240';
const ersatzfahrerRolleIDLiga2 = '734888172097503323';

const discordID = '479053264537649153';

const mercedesRoleIDLiga1 = '656098815492882432';  
const redBullRoleIDLiga1 = '656098821289541633';  
const ferrariRoleIDLiga1 = '656098818290483201'; 
const mcLarenRoleIDLiga1 = '656098834878824469';  
const astonMartinRoleIDLiga1 = '656104213893611522';   
const alpineRoleIDLiga1 = '656098824074428416';  
const alphaTauriRoleIDLiga1 = '656098829497532417';  
const alfaRomeoRoleIDLiga1 = '656098832052125698';  
const williamsRoleIDLiga1 = '656098837965963274'; 
const haasRoleIDLiga1 = '656098826427432963'; 

const anmeldenEmoji = '✅';
const abmeldenEmoji = '❌';

var freeCarMsgIDLiga1 = null;
var waitListMsgIDLiga1 = null;
var msgLineupLiga1 = null;

var currentRegularDriversMsgIDLiga1 = null;

let messageEmbededAnmeldenID = null;
let messageEmbededAbmeldenID = null;


async function removeFromCurrentLineup(user, client, message, freeCar){
  if(user.roles.cache.has(stammfahrerRolleIDLiga1)){
    if(currentLineupLiga1.get(findMainTeamString(user))[0] == user.id){
      currentLineupLiga1.get(findMainTeamString(user))[0] = 'nicht besetzt';
    }else if(currentLineupLiga1.get(findMainTeamString(user))[1] == user.id){
      currentLineupLiga1.get(findMainTeamString(user))[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }
    
  } else {
    let teamID = freeCar;

    let teamNameString = await client.guilds.cache.get(discordID).roles.cache.get(teamID).name;

    let date = new Date();
    console.log(`Prüfsumme für das Entfernen eines Autos aus dem Lineup (removeFromCurrentLineup) in Liga 1
                die ID des Teams welches zu Entfernen war ist ${teamID}. Darf nicht null sein -- ${date}`)

    if(!(teamID)){
      let date = new Date();
      console.log(`In Liga 1 war die TeamID bei einem removeFromCurrentLineup null oder undefined -- ${date}`);
      return;
    }

    if(currentLineupLiga1.get(teamNameString)[0] == user.id){
      currentLineupLiga1.get(teamNameString)[0] = 'nicht besetzt';
    }else if(currentLineupLiga1.get(teamNameString)[1] == user.id){
      currentLineupLiga1.get(teamNameString)[1] = 'nicht besetzt';
    } else {
      let date = new Date().toLocaleString();
      console.log(`Fehler beim Entfernen ${user.username} aus dem Lineup -- ${date}`)
    }


  }
}

async function regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition){

  if(seatOpen == false){

    let mainTeamNameString = await client.guilds.cache.get(discordID).roles.cache.get(mainTeamIDString).name;

    currentLineupLiga1.get(mainTeamNameString)[subDriverPosition] = driverToStart

    let carToTakeNameString = await client.guilds.cache.get(discordID).roles.cache.get(carToTake).name;

    if(currentLineupLiga1.get(carToTakeNameString)[0] == `nicht besetzt`){
      currentLineupLiga1.get(carToTakeNameString)[0] = subDriverID;
    }else if(currentLineupLiga1.get(carToTakeNameString)[1] == `nicht besetzt`){
      currentLineupLiga1.get(carToTakeNameString)[1] = subDriverID;
    } else {
      let date = new Date().toLocaleString();
      console.log(`Method: regularDriverBack, Liga 1 => ${carToTakeNameString} didn't have an open cockpit -- ${date}`);
    }
  
  } else {

    let mainTeamNameString = await client.guilds.cache.get(discordID).roles.cache.get(mainTeamIDString).name;

    currentLineupLiga1.get(mainTeamNameString)[subDriverPosition] = driverToStart;
  }

  
}

async function changeLineupNormalSub(client, message, driverToStart, carToTake){

  let carToTakeNameString = await client.guilds.cache.get(discordID).roles.cache.get(carToTake).name;

  if(currentLineupLiga1.get(carToTakeNameString)[0] == `nicht besetzt`){
    currentLineupLiga1.get(carToTakeNameString)[0] = driverToStart;
  } else  if(currentLineupLiga1.get(carToTakeNameString)[1] == `nicht besetzt`){
    currentLineupLiga1.get(carToTakeNameString)[1] = driverToStart;
  } else {
    let date = new Date().toLocaleString();
    console.log(`Der Tausch im Lineup konnte nicht durchgeführt werden; Normal Sub -- ${date}`);
  }

}

function changeLineupAfterForceOpen(client, message, driverToStart, carToTake, positionForForce){
  currentLineupLiga1.get(findMainTeamString(carToTake))[positionForForce] = driverToStart;
}

function changeLineupAfterForceDedicated(client, message, driverToStart, carToTake, positionForForce){
  currentLineupLiga1.get(carToTake)[positionForForce] = driverToStart;
}

async function printLineup(client, message){
  
  if(msgLineupLiga1 != null){
    await client.guilds.cache.get(discordID).channels.cache.get(infoChannelIDLiga1).messages.fetch(msgLineupLiga1).then((msg) => {
      msg.delete();
    });
    let date = new Date().toLocaleString();
    console.log(`Das aktuelle Lineup wurde gelöscht -- ${date}`)
  }
  if(currentLineupLiga1.get('Mercedes')[0] && currentLineupLiga1.get('Mercedes')[1] &&
    currentLineupLiga1.get('Red Bull')[0] && currentLineupLiga1.get('Red Bull')[1] &&
    currentLineupLiga1.get('Ferrari')[0] && currentLineupLiga1.get('Ferrari')[1] &&
    currentLineupLiga1.get('McLaren')[0] && currentLineupLiga1.get('McLaren')[1] &&
    currentLineupLiga1.get('Aston Martin')[0] && currentLineupLiga1.get('Aston Martin')[1] &&
    currentLineupLiga1.get('Alpine')[0] && currentLineupLiga1.get('Alpine')[1] &&
    currentLineupLiga1.get('Alpha Tauri')[0] && currentLineupLiga1.get('Alpha Tauri')[1] &&
    currentLineupLiga1.get('Alfa Romeo')[0] && currentLineupLiga1.get('Alfa Romeo')[1] && 
    currentLineupLiga1.get('Williams')[0] && currentLineupLiga1.get('Williams')[1] &&
    currentLineupLiga1.get('Haas')[0] && currentLineupLiga1.get('Haas')[1]){

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
      await client.channels.cache.get(infoChannelIDLiga1).send({ embeds : [lineupEmbed]}).then((msg) => {
        msgLineupLiga1 = msg.id;
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
  if(currentLineupLiga1.get(teamName)[seat] == 'nicht besetzt'){
    return '<nicht besetzt>'
  } else if(currentLineupLiga1.get(teamName)[seat] == 'entfernt'){
    return '<entfernt>';
  } else {
    return `<@${currentLineupLiga1.get(teamName)[seat]}>`;
  }
}

/**
 * Finds out if there is a free car for a driver on the waitinglist
 * 
 * @param {*} client 
 */
async function checkSubCanBeMade(client, message, fromForceRemove, positionForForce, driverForForce, carForForce){
  if(freeCarsLiga1.length > 0 && ((subPersonListLiga1.length + subPersonListReinstatedDriversLiga1.length) > 0)){
    let driverToStart = null;
    if(subPersonListReinstatedDriversLiga1.length > 0){
      driverToStart = subPersonListReinstatedDriversLiga1.shift();
    } else {
      driverToStart = subPersonListLiga1.shift();
    } 
    let carToTake = freeCarsLiga1.shift();

    if(!(client.guilds.cache.get(discordID).members.cache.get(driverToStart))){
      let date = new Date();
      console.log(`In Liga 1 wurde checkSubCanBeMade ausgeführt, aber der driverToStart war in irgendeiner Weise falsch. 
                  Hier die ID des driverToStart: ${driverToStart}-- ${date}`);
      return
    }

    let date = new Date();
    console.log(`Prüfsumme für Liga 1, Methode checkSubCanBeMade. Das Auto was gerade belegt wird hat ID ${carToTake}, der 
                Fahrer der es nimmt hat die ID ${driverToStart}. Beides darf nicht null oder undefined sein. -- ${date}`);

    if(!fromForceRemove &&
      client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(stammfahrerRolleIDLiga1) &&
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
      if(currentLineupLiga1.get(mainTeamNameString)[0] == 'nicht besetzt'){
        subDriverPosition = 0
        seatOpen = true
      } else if(currentLineupLiga1.get(mainTeamNameString)[1] == 'nicht besetzt'){
        subDriverPosition = 1
        seatOpen = true
      } else if(client.guilds.cache.get(discordID).members.cache.get(currentLineupLiga1.get(mainTeamNameString)[0]).roles.cache.has(ersatzfahrerRolleIDLiga1)){
        subDriverPosition = 0
      } else if(client.guilds.cache.get(discordID).members.cache.get(currentLineupLiga1.get(mainTeamNameString)[1]).roles.cache.has(ersatzfahrerRolleIDLiga1)){
        subDriverPosition = 1
      }

      if(subDriverPosition != null && seatOpen == false){
        var subDriverID = currentLineupLiga1.get(mainTeamNameString)[subDriverPosition];
      } else {
        let date = new Date()
        console.log(`Methode: CheckSubCanBeMade, Fall: 1 => Stammfahrer kommt zurück, subDriverPosition war null -- ${date}`)
        return
      }

      regularDriverBack(client, subDriverID, carToTake, mainTeamIDString, driverToStart, seatOpen, subDriverPosition);

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
      }
      
      

      await client.channels.cache.get(anmeldeChannelIDLiga1).send({embeds : [mainDriverEmbed]}).then(() => {
        client.channels.cache.get(logChannelID).send({embeds : [mainDriverEmbed]});
        client.guilds.cache.get(discordID).members.cache.get(driverToStart).send(`Gute Nachrichten, du hast deinen Stammplatz für diese Woche wieder! 😄`);
      });
      await client.channels.cache.get(anmeldeChannelIDLiga1).send({embeds : [subDriverEmbed]}).then(() => {
        client.channels.cache.get(logChannelID).send({embeds : [subDriverEmbed]});
        client.guilds.cache.get(discordID).members.cache.get(subDriverID).send(`Es ergab sich eine Verschiebung im Lineup, du fährst am Wochenende ` + 
        `den  ${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name}`);
      });

      let date = new Date().toLocaleString();
      console.log(`${client.guilds.cache.get(discordID).members.cache.get(subDriverID).user.username} übernimmt einen ` + 
                      `${client.guilds.cache.get(discordID).roles.cache.get(carToTake).name} und ` + 
                      `${client.guilds.cache.get(discordID).members.cache.get(driverToStart).user.username} bekommt seinen Stammplatz wieder -- ${date}`);
    } else  if(withdrawnDriversLiga1.length > 0 && !fromForceRemove &&
              client.guilds.cache.get(discordID).members.cache.get(driverToStart).roles.cache.has(ersatzfahrerRolleIDLiga1) &&
              (client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversLiga1[withdrawnDriversLiga1.length - 1]).roles.cache.has(stammfahrerRolleIDLiga1) ||
              client.guilds.cache.get(discordID).members.cache.get(withdrawnDriversLiga1[withdrawnDriversLiga1.length - 1]).roles.cache.has(stammfahrerRolleIDLiga1)) &&
              checkIfCarIsFree(client, carToTake)){

      changeLineupNormalSub(client, message, driverToStart, carToTake);
      
      let subDriverEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('➡️')
      .addFields(
        {name: `Update im Lineup`, value: `<@${driverToStart}> bekommt den <@&${carToTake}>`}
      );

      await client.channels.cache.get(anmeldeChannelIDLiga1).send({embeds : [subDriverEmbed]}).then(() => {
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

      await client.channels.cache.get(anmeldeChannelIDLiga1).send({embeds : [subDriverEmbed]}).then(() => {
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

      await client.channels.cache.get(anmeldeChannelIDLiga1).send({embeds : [subDriverEmbed]}).then(() => {
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
  if(member.roles.cache.has(mercedesRoleIDLiga1)){
    freeCarsLiga1.push(mercedesRoleIDLiga1);
  } else if(member.roles.cache.has(redBullRoleIDLiga1)){
    freeCarsLiga1.push(redBullRoleIDLiga1);
  } else if(member.roles.cache.has(ferrariRoleIDLiga1)){
    freeCarsLiga1.push(ferrariRoleIDLiga1);
  } else if(member.roles.cache.has(mcLarenRoleIDLiga1)){
    freeCarsLiga1.push(mcLarenRoleIDLiga1);
  } else if(member.roles.cache.has(astonMartinRoleIDLiga1)){
    freeCarsLiga1.push(astonMartinRoleIDLiga1);
  } else if(member.roles.cache.has(alpineRoleIDLiga1)){
    freeCarsLiga1.push(alpineRoleIDLiga1);
  } else if(member.roles.cache.has(alphaTauriRoleIDLiga1)){
    freeCarsLiga1.push(alphaTauriRoleIDLiga1);
  } else if(member.roles.cache.has(alfaRomeoRoleIDLiga1)){
    freeCarsLiga1.push(alfaRomeoRoleIDLiga1);
  } else if(member.roles.cache.has(williamsRoleIDLiga1)){
    freeCarsLiga1.push(williamsRoleIDLiga1);
  } else if(member.roles.cache.has(haasRoleIDLiga1)){
    freeCarsLiga1.push(haasRoleIDLiga1);
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

  var waitListContent = subPersonListReinstatedDriversLiga1.concat(subPersonListLiga1);

  var waitListDefaultMessage = `Warteliste:`;

  for(let i = 0; i < waitListContent.length; i++){
    if(i == 0){
      waitListDefaultMessage += ` <@${waitListContent[i]}>`;
    } else {
      waitListDefaultMessage += `, <@${waitListContent[i]}>`;
    }
  }

  await client.channels.cache.get(anmeldeChannelIDLiga1).messages.fetch(waitListMsgIDLiga1).then((msg) => {
     msg.edit(waitListDefaultMessage)
  });

  var freeCarListDefaultMessage = `Freie Autos:`;

  for(let i = 0; i < freeCarsLiga1.length; i++){
    if(i == 0){
      freeCarListDefaultMessage += ` <@&${freeCarsLiga1[i]}>`;
    } else {
      freeCarListDefaultMessage += `, <@&${freeCarsLiga1[i]}>`;
    }
  }

  await client.channels.cache.get(anmeldeChannelIDLiga1).messages.fetch(freeCarMsgIDLiga1).then((msg) => {
     msg.edit(freeCarListDefaultMessage)
  });
    
}

function setDefaultLineup(){
  
  currentLineupLiga1.set("Mercedes", []);
  currentLineupLiga1.set("Red Bull", []);
  currentLineupLiga1.set("Ferrari", []);
  currentLineupLiga1.set("McLaren", []);
  currentLineupLiga1.set("Aston Martin", []);
  currentLineupLiga1.set("Alpine", []);
  currentLineupLiga1.set("Alpha Tauri", []);
  currentLineupLiga1.set("Alfa Romeo", []);
  currentLineupLiga1.set("Williams", []);
  currentLineupLiga1.set("Haas", []);

  currentLineupLiga1.get('Mercedes').push(mercedesDriversLiga1[0]);
  currentLineupLiga1.get('Mercedes').push(mercedesDriversLiga1[1]);
  currentLineupLiga1.get('Red Bull').push(redBullDriversLiga1[0]);
  currentLineupLiga1.get('Red Bull').push(redBullDriversLiga1[1]);
  currentLineupLiga1.get('Ferrari').push(ferrariDriversLiga1[0]);
  currentLineupLiga1.get('Ferrari').push(ferrariDriversLiga1[1]);
  currentLineupLiga1.get('McLaren').push(mcLarenDriversLiga1[0]);
  currentLineupLiga1.get('McLaren').push(mcLarenDriversLiga1[1]);
  currentLineupLiga1.get('Aston Martin').push(astonMartinDriversLiga1[0]);
  currentLineupLiga1.get('Aston Martin').push(astonMartinDriversLiga1[1]);
  currentLineupLiga1.get('Alpine').push(alpineDriversLiga1[0]);
  currentLineupLiga1.get('Alpine').push(alpineDriversLiga1[1]);
  currentLineupLiga1.get('Alpha Tauri').push(alphaTauriDriversLiga1[0]);
  currentLineupLiga1.get('Alpha Tauri').push(alphaTauriDriversLiga1[1]);
  currentLineupLiga1.get('Alfa Romeo').push(alfaRomeoDriversLiga1[0]);
  currentLineupLiga1.get('Alfa Romeo').push(alfaRomeoDriversLiga1[1]);
  currentLineupLiga1.get('Williams').push(williamsDriversLiga1[0]);
  currentLineupLiga1.get('Williams').push(williamsDriversLiga1[1]);
  currentLineupLiga1.get('Haas').push(haasDriversLiga1[0]);
  currentLineupLiga1.get('Haas').push(haasDriversLiga1[1]);
  
}

function findMainTeamString(member){
  if(member.roles.cache.has(mercedesRoleIDLiga1)){
    return 'Mercedes';
  } else if(member.roles.cache.has(redBullRoleIDLiga1)){
    return 'Red Bull';
  } else if(member.roles.cache.has(ferrariRoleIDLiga1)){
    return 'Ferrari';
  } else if(member.roles.cache.has(mcLarenRoleIDLiga1)){
    return 'McLaren';
  } else if(member.roles.cache.has(astonMartinRoleIDLiga1)){
    return 'Aston Martin';
  } else if(member.roles.cache.has(alpineRoleIDLiga1)){
    return 'Alpine';
  } else if(member.roles.cache.has(alphaTauriRoleIDLiga1)){
    return 'Alpha Tauri';
  } else if(member.roles.cache.has(alfaRomeoRoleIDLiga1)){
    return 'Alfa Romeo';
  } else if(member.roles.cache.has(williamsRoleIDLiga1)){
    return 'Williams';
  } else if(member.roles.cache.has(haasRoleIDLiga1)){
    return 'Haas';
  } 
}

function checkIfCarIsFree(client, carToTake){
  let teamNameString = client.guilds.cache.get(discordID).roles.cache.get(carToTake).name; 

  if(currentLineupLiga1.get(teamNameString)[0] == `nicht besetzt` || currentLineupLiga1.get(teamNameString)[1] == `nicht besetzt`){
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
  subPersonListLiga1 = [];
  freeCarsLiga1 = [];
  withdrawnDriversLiga1 = [];
  subPersonListReinstatedDriversLiga1 = [];
  driversWithdrawnPerCommandLiga1 = [];
  driversSubInPerCommandLiga1 = [];
  msgLineupLiga1 = null;
  return flag;
}

/**
 * Clears the "Anmeldechannel" and the "Abmeldechannel" to keep the channels current
 * 
 * @param {Client} client 
 */
 async function clearChannels(client){
  await client.channels.cache.get(anmeldeChannelIDLiga1).bulkDelete(100).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Der Anmelde-Channel wurde gecleart -- ${date}`)
  });

  await client.channels.cache.get(abmeldeChannelIDLiga1).bulkDelete(100).then(() => {
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
  await client.channels.cache.get(anmeldeChannelIDLiga1).send(`<@&${ersatzfahrerRolleIDLiga1}> die Anmeldung für das ` + 
                                                              `Ligarennen in ${flag} ist hiermit eröffnet!`).then(() => {
    let date = new Date().toLocaleString();
    console.log(`Die Anmeldung für Liga 1 in ${flag} wurde eröffnet. -- ${date}`);
  });

  // Message for List of waiting drivers
  await client.channels.cache.get(anmeldeChannelIDLiga1).send(`Warteliste:`).then((msg) => {
    waitListMsgIDLiga1 = msg.id;
  });     
  
  // Message for List of free cars
  await client.channels.cache.get(anmeldeChannelIDLiga1).send(`Freie Autos:`).then((msg) => {
    freeCarMsgIDLiga1 = msg.id;
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

  subPersonListLiga1.push(driverObject.user.id);

  // Creates the embed send in the "Anmeldechannel" if sub driver reacted
  let subInEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('➡️')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> hat sich für diese Woche angemeldet`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga1).send({ embeds : [subInEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} hat sich erfolgreich angemeldet -- ${date}`);

  await checkSubCanBeMade(client, message, false, null, null, null);
}

async function regularDriverWithdraw(client, driverObject, message){

  withdrawnDriversLiga1.push(driverObject.user.id);
  await addCarOfWithdrawnDriverToFreeCars(driverObject);
  await removeFromCurrentLineup(driverObject, client, message, null);

  let withdrawnEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('⬅️')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche nicht dabei`}
  )
                  
  await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga1).send({ embeds : [withdrawnEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawnEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} hat sich erfolgreich abgemeldet -- ${date}`); 

  
  await checkSubCanBeMade(client, message, false, null, null, null);
}


async function subDriverRemoveSubInOnWaitlist(client, driverObject, message){

  let element = subPersonListLiga1.indexOf(driverObject.user.id);
  subPersonListLiga1.splice(element, 1);   

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga1).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich von der Warteliste entfernt -- ${date}`);

      
  await checkSubCanBeMade(client, message, null, null, null);
}

async function subDriverRemoveSubInInLineup(client, driverObject, message){

  let freeCar = await findCurrentCockpitOfSub(driverObject);
  freeCarsLiga1.push(freeCar);
  await removeFromCurrentLineup(driverObject, client, message, freeCar);

  let subInRemoveEmbed = new MessageEmbed()
  .setColor('RED')
  .setTitle('️️️️️️️️️️️️️️️↩')
  .addFields(
    {name: `Update im Lineup`, value: `<@${driverObject.user.id}> ist diese Woche doch nicht dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga1).send({ embeds : [subInRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [subInRemoveEmbed]});
  });

  let date = new Date().toLocaleString();
  console.log(`${driverObject.user.username} wurde erfolgreich aus Lineup genommen -- ${date}`);

  await checkSubCanBeMade(client, message);
}

async function regularDriverRemoveWithdraw(client, driverObject, message){ 
  
  subPersonListReinstatedDriversLiga1.push(driverObject.user.id);
  withdrawnDriversLiga1.splice(withdrawnDriversLiga1.indexOf(driverObject.user.id), 1);

  let withdrawRemoveEmbed = new MessageEmbed()
  .setColor('GREEN')
  .setTitle('️️️️️️️️↪')
  .addFields(
    {name: `Update`, value: `<@${driverObject.user.id}> ist diese Woche doch dabei`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga1).send({ embeds : [withdrawRemoveEmbed]}).then(() => {
     client.guilds.cache.get(discordID).channels.cache.get(logChannelID).send({ embeds : [withdrawRemoveEmbed]});
  })

  let date = new Date().toLocaleString();
  console.log(`Die Abmeldung von ${driverObject.user.username} wurde erfolgreich zurückgenommen -- ${date}`);

  await checkSubCanBeMade(client, message, false, null, null, null);
}

async function sendTeams(client){
  if(currentRegularDriversMsgIDLiga1 != null){
    await client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).messages.fetch(currentRegularDriversMsgIDLiga1).then((msg) => {
      msg.delete();
    })
  }
  regularDriversLiga1.set("Mercedes", mercedesDriversLiga1);
  regularDriversLiga1.set("Red Bull", redBullDriversLiga1);
  regularDriversLiga1.set("Ferrari", ferrariDriversLiga1);
  regularDriversLiga1.set("McLaren", mcLarenDriversLiga1);
  regularDriversLiga1.set("Aston Martin", astonMartinDriversLiga1);
  regularDriversLiga1.set("Alpine", alpineDriversLiga1);
  regularDriversLiga1.set("Alpha Tauri", alphaTauriDriversLiga1);
  regularDriversLiga1.set("Alfa Romeo", alfaRomeoDriversLiga1);
  regularDriversLiga1.set("Williams", williamsDriversLiga1);
  regularDriversLiga1.set("Haas", haasDriversLiga1);

  let regularDriverEmbed = new MessageEmbed()
  .setColor('DARK_BLUE')
  .setTitle('️️️️️️️️Stammfahrer Liga 1')
  .addFields(
    {name: `Mercedes`, value: `<@${regularDriversLiga1.get('Mercedes')[0]}> und <@${regularDriversLiga1.get('Mercedes')[1]}>`},
    {name: `Red Bull`, value: `<@${regularDriversLiga1.get('Red Bull')[0]}> und <@${regularDriversLiga1.get('Red Bull')[1]}>`},
    {name: `Ferrari`, value: `<@${regularDriversLiga1.get('Ferrari')[0]}> und <@${regularDriversLiga1.get('Ferrari')[1]}>`},
    {name: `McLaren`, value: `<@${regularDriversLiga1.get('McLaren')[0]}> und <@${regularDriversLiga1.get('McLaren')[1]}>`},
    {name: `Aston Martin`, value: `<@${regularDriversLiga1.get('Aston Martin')[0]}> und <@${regularDriversLiga1.get('Aston Martin')[1]}>`},
    {name: `Alpine`, value: `<@${regularDriversLiga1.get('Alpine')[0]}> und <@${regularDriversLiga1.get('Alpine')[1]}>`},
    {name: `Alpha Tauri`, value: `<@${regularDriversLiga1.get('Alpha Tauri')[0]}> und <@${regularDriversLiga1.get('Alpha Tauri')[1]}>`},
    {name: `Alfa Romeo`, value: `<@${regularDriversLiga1.get('Alfa Romeo')[0]}> und <@${regularDriversLiga1.get('Alfa Romeo')[1]}>`},
    {name: `Williams`, value: `<@${regularDriversLiga1.get('Williams')[0]}> und <@${regularDriversLiga1.get('Williams')[1]}>`},
    {name: `Haas`, value: `<@${regularDriversLiga1.get('Haas')[0]}> und <@${regularDriversLiga1.get('Haas')[1]}>`}
  );

  await client.guilds.cache.get(discordID).channels.cache.get(teamsChannelID).send({ embeds : [regularDriverEmbed]}).then((msg) => {
    currentRegularDriversMsgIDLiga1 = msg.id;
  })
}

async function findCurrentCockpitOfSub(driverObject){
  if(currentLineupLiga1.get('Mercedes').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Mercedes`);
    return mercedesRoleIDLiga1;
  }else if(currentLineupLiga1.get('Red Bull').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Red Bull`);
    return redBullRoleIDLiga1;
  }else if(currentLineupLiga1.get('Ferrari').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Ferrari`);
    return ferrariRoleIDLiga1;
  }else if(currentLineupLiga1.get('McLaren').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im McLaren`);
    return mcLarenRoleIDLiga1;
  }else if(currentLineupLiga1.get('Aston Martin').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Aston Martin`);
    return astonMartinRoleIDLiga2;
  }else if(currentLineupLiga1.get('Alpine').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpine`);
    return alpineRoleIDLiga1;
  }else if(currentLineupLiga1.get('Alpha Tauri').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alpha Tauri`);
    return alphaTauriRoleIDLiga1;
  }else if(currentLineupLiga1.get('Alfa Romeo').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Alfa Romeo`);
    return alfaRomeoRoleIDLiga1;
  }else if(currentLineupLiga1.get('Williams').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Williams`);
    return williamsRoleIDLiga1;
  }else if(currentLineupLiga1.get('Haas').includes(driverObject.id)){
    console.log(`${driverObject.user.username} war im Haas`);
    return haasRoleIDLiga1;
  }
}

module.exports = {
    name: 'start1',
    aliases: ['anmelden1', 'abmelden1', 'removeabmeldung1', 'removeanmeldung1', 'forceremove1',
              'forcein1', 'forcefree1', 'end1', 'removefromwaitlist1'],
    description: 'Can manage driverswaps for F1 league races. Used for IRC League 2',
    async execute(client, message, cmd, args, Discord){
      // Starts the main command of the bot
      if(cmd === 'start1' && message.member.roles.cache.has(rennleiterRolleID)){
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
          await client.channels.cache.get(anmeldeChannelIDLiga1).send({ embeds: [embedAnmeldung] }).then((msg) => {
            messageEmbededAnmelden = msg;
            messageEmbededAnmeldenID = msg.id;
          });

          let messageEmbededAbmelden = null
          await client.channels.cache.get(abmeldeChannelIDLiga1).send({ embeds: [embedAbmeldung] }).then((msg) => {
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
            if(reaction.message.channel.id == anmeldeChannelIDLiga1){
              if(reaction.emoji.name === anmeldenEmoji && !(driversSubInPerCommandLiga1.includes(user.id)) && 
                  reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga1)){
                subDriverIn(client, reaction.message.guild.members.cache.get(user.id), message);
              } else if(reaction.emoji.name != anmeldenEmoji) {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
              } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga1))) {
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
            if(reaction.message.channel.id == abmeldeChannelIDLiga1){
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
              if(reaction.emoji.name === abmeldenEmoji && !(driversWithdrawnPerCommandLiga1.includes(user.id)) &&
                    reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga1)){
                regularDriverWithdraw(client, reaction.message.guild.members.cache.get(user.id), message);                          
              } else if(reaction.emoji.name !== abmeldenEmoji) {
                await reaction.users.remove(reaction.message.guild.members.cache.get(user.id).user.id);
                let date = new Date().toLocaleString();
                console.log(`${reaction.message.guild.members.cache.get(user.id).user.username} hat mit falschen Emoji reagiert -- ${date}`);
              } else if(!(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga1))) {
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
            if(reaction.message.channel.id == anmeldeChannelIDLiga1){
              if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(ersatzfahrerRolleIDLiga1)){
                if(reaction.emoji.name == anmeldenEmoji){
                  // Fahrer ist noch auf Warteliste
                  if(driversSubInPerCommandLiga1.includes(user.id)){
                    let date = new Date().toLocaleString();
                    console.log(`${user.username} wurde die Reaktion verweigert, da er per Command abgemeldet ist -- ${date}`);
                  } else {
                    if(subPersonListLiga1.includes(reaction.message.guild.members.cache.get(user.id).user.id)){
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
            if(reaction.message.channel.id == abmeldeChannelIDLiga1){
              if(reaction.message.guild.members.cache.get(user.id).roles.cache.has(stammfahrerRolleIDLiga1)){
                if(reaction.emoji.name == abmeldenEmoji){
                  if(!(driversWithdrawnPerCommandLiga1.includes(user.id))){
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
      if(cmd === 'start1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply('Dieser Command kann nur von der Rennleitung ausgeführt werden').then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den start Command auszuführen hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
      
      if(cmd === 'anmelden1' && message.member.roles.cache.has(rennleiterRolleID)){
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


              if(markedUserObjectSubIn && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDLiga1)){                

                subDriverIn(client, markedUserObjectSubIn, message);
                driversSubInPerCommandLiga1.push(markedUserObjectSubIn.user.id);
                  
              }else if(markedUserObjectSubIn && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(ersatzfahrerRolleIDLiga1))){
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
      if(cmd === 'anmelden1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der anmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den anmelden Command auszuführen, hat aber `+ 
          `keine Berechtigung dafür -- ${date}`);
        })
      }
      if(cmd === 'abmelden1' && message.member.roles.cache.has(rennleiterRolleID)){
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
          
              if(markedUserObjectWithdraw && client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDLiga1)){

                regularDriverWithdraw(client, markedUserObjectWithdraw, message);
                driversWithdrawnPerCommandLiga1.push(markedUserObjectWithdraw.user.id);           
                
                
                
              } else if (markedUserObjectWithdraw && !(client.guilds.cache.get(discordID).members.cache.get(markedUserID).roles.cache.has(stammfahrerRolleIDLiga1))){
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
      if(cmd === 'abmelden1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeabmeldung1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeanmeldung1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der abmelden Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den abmelden remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd === 'removeanmeldung1' && (message.member.roles.cache.has(rennleiterRolleID))){
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

          if(markedUserObjectSubInRemove.roles.cache.has(ersatzfahrerRolleIDLiga1)){
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
                if(client.guilds.cache.get(discordID).members.cache.get(markedUserIDSubInRemove).roles.cache.has(ersatzfahrerRolleIDLiga1)){
                  if(subPersonListLiga1.includes(markedUserObjectSubInRemove.user.id)){
                    
                    subDriverRemoveSubInOnWaitlist(client, markedUserObjectSubInRemove, message);
                    driversSubInPerCommandLiga1.splice(driversSubInPerCommandLiga1.indexOf(markedUserObjectSubInRemove.user.id), 1);

                    
                  } else if(!(subPersonListLiga1.includes(markedUserObjectSubInRemove.user.id))){
                    
                    subDriverRemoveSubInInLineup(client, markedUserObjectSubInRemove, message);
                    driversSubInPerCommandLiga1.splice(driversSubInPerCommandLiga1.indexOf(markedUserObjectSubInRemove.user.id), 1);
                    

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

      if(cmd === 'removeabmeldung1' && message.member.roles.cache.has(rennleiterRolleID)){

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

              if(markedUserObjectWithdrawRemove.roles.cache.has(stammfahrerRolleIDLiga1)){

                regularDriverRemoveWithdraw(client, markedUserObjectWithdrawRemove, message);
                driversWithdrawnPerCommandLiga1.splice(driversWithdrawnPerCommandLiga1.indexOf(markedUserObjectWithdrawRemove.user.id), 1);
                await confirmMessage.delete();

    
              } else {
                let date = new Date().toLocaleString();
                message.reply(`Fahrer braucht die Liga 1-Stammfahrerrolle -- ${date}`);
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

    

      if(cmd == 'forceremove1' && message.member.roles.cache.has(rennleiterRolleID)){
        let forceRemoveTeamEmbed = new MessageEmbed()
        .setColor('#fd5100')
        .setTitle('Bitte wähle das Team aus')
        .setDescription('Hier wird das Team gewählt aus welchem der Fahrer entfernt wird')
        .addFields(
          {name: 'Row 1', value: `0️⃣ - <@&${mercedesRoleIDLiga1}> und 1️⃣ - <@&${redBullRoleIDLiga1}>`},
          {name: 'Row 2', value: `2️⃣ - <@&${ferrariRoleIDLiga1}> und 3️⃣ - <@&${mcLarenRoleIDLiga1}>`},
          {name: 'Row 3', value: `4️⃣ - <@&${astonMartinRoleIDLiga1}> und 5️⃣ - <@&${alpineRoleIDLiga1}>`},
          {name: 'Row 4', value: `6️⃣ - <@&${alphaTauriRoleIDLiga1}> und 7️⃣ - <@&${alfaRomeoRoleIDLiga1}>`},
          {name: 'Row 5', value: `8️⃣ - <@&${williamsRoleIDLiga1}> und 9️⃣ - <@&${haasRoleIDLiga1}>`},
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
            .setDescription(`Du hast Team <@&${mercedesRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Mercedes')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Mercedes')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Mercedes')[0];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mercedesRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    mercedesDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Mercedes')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
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
  
                    mercedesDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Mercedes')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  } 
                  /**
                  * 
                  * Team Mercedes, Fahrer 1, Stammfahrer Liga 2
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    mercedesDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Mercedes')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
            
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
  
                    mercedesDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Team 1')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
            
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
                let driverToRemove = currentLineupLiga1.get('Mercedes')[1];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mercedesRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    mercedesDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
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
  
                    mercedesDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Mercedes, Fahrer 2, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    mercedesDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
            
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
  
                    mercedesDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Mercedes')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mercedesRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${redBullRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Red Bull')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Red Bull')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Red Bull')[0];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${redBullRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    redBullDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
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
  
                    redBullDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Red Bull, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
              
                    redBullDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
            
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
  
                    redBullDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
            
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
                let driverToRemove = currentLineupLiga1.get('Red Bull')[1];
  
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${redBullRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    redBullDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
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
  
                    redBullDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Red Bull, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    redBullDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
            
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
  
                    redBullDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Red Bull')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === redBullRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${ferrariRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Ferrari')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Ferrari')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Ferrari')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${ferrariRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    ferrariDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
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
  
                    ferrariDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team Ferrari, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    ferrariDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineup1.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
                      
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
  
                    ferrariDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Ferrari')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('Ferrari')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${ferrariRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    ferrariDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
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
  
                    ferrariDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Ferrari, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    ferrariDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
            
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
  
                    ferrariDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Ferrari')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === ferrariRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${mcLarenRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('McLaren')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('McLaren')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('McLaren')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mcLarenRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    mcLarenDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
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
  
                    mcLarenDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team McLaren, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    mcLarenDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
                      
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
  
                    mcLarenDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('McLaren')[1];
          
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${mcLarenRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    mcLarenDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
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
  
                    mcLarenDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
              
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team McLaren, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    mcLarenDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
              
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
  
                    mcLarenDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('McLaren')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === mcLarenRoleIDLiga1);
              
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
            .setDescription(`Du hast Team <@&${astonMartinRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Aston Martin')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Aston Martin')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Aston Martin')[0];
            
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${astonMartinRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    astonMartinDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
              
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
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
  
                    astonMartinDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team Aston Martin, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    astonMartinDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
                      
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
  
                    astonMartinDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('Aston Martin')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${astonMartinRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    astonMartinDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
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
  
                    astonMartinDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
            
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
  
                    message.reply(`Exisitiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Aston Martin, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    astonMartinDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
            
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
  
                    astonMartinDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Aston Martin')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === astonMartinRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${alpineRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Alpine')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Alpine')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Alpine')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alpineRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    alpineDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
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
  
                    alpineDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team Alpine, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    alpineDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
                      
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
  
                    alpineDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('Alpine')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alpineRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    alpineDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
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
  
                    alpineDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Alpine, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    alpineDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
            
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
  
                    alpineDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpine')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alpineRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${alphaTauriRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Alpha Tauri')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Alpha Tauri')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Alpha Tauri')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alphaTauriRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    alphaTauriDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
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
  
                    alphaTauriDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team Alpha Tauri, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    alphaTauriDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
                      
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
  
                    alphaTauriDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('Alpha Tauri')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alphaTauriRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    alphaTauriDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
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
  
                    alphaTauriDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Alpha Tauri, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    alphaTauriDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
            
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
  
                    alphaTauriDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alpha Tauri')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alphaTauriRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${alfaRomeoRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen?`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Alfa Romeo')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Alfa Romeo')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Alfa Romeo')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alfaRomeoRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    alfaRomeoDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
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
  
                    alfaRomeoDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team Alfa Romeo, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    alfaRomeoDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
                      
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
  
                    alfaRomeoDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('Alfa Romeo')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${alfaRomeoRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    alfaRomeoDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
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
  
                    alfaRomeoDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Alfa Romeo, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    alfaRomeoDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
            
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
  
                    alfaRomeoDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Alfa Romeo')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === alfaRomeoRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${williamsRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen?`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Williams')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Williams')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Williams')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${williamsRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    williamsDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
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
  
                    williamsDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team Williams, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    williamsDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
                      
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
  
                    williamsDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('Williams')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${williamsRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    williamsDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
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
  
                    williamsDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Williams, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    williamsDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
            
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
  
                    williamsDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Williams')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === williamsRoleIDLiga1);
            
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
            .setDescription(`Du hast Team <@&${haasRoleIDLiga1}> gewählt. Welchen Fahrer willst du entfernen?`)
            .addFields(
              {name: 'First Driver', value: `1️⃣ - <@${currentLineupLiga1.get('Haas')[0]}>`},
              {name: `SecondDriver`, value: `2️⃣ - <@${currentLineupLiga1.get('Haas')[1]}>`},
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
                let driverToRemove = currentLineupLiga1.get('Haas')[0];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${haasRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    haasDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
            
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
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
  
                    haasDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
                      
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
          
                    message.reply(`Existiert nicht`)
          
                  }
                  /**
                  * 
                  * Team Haas, Fahrer 1, Stammfahrer Liga 4 EXISTIERT NICHT
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
          
                    haasDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
                      
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
  
                    haasDriversLiga1[0] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[0] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
          
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
                      
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
                let driverToRemove = currentLineupLiga1.get('Haas')[1];
        
                let forceRemoveFutureRole = new MessageEmbed()
                .setColor('#fd5100')
                .setTitle('Bitte wähle den Fahrer aus')
                .setDescription(`Du hast Fahrer <@${driverToRemove}> von Team <@&${haasRoleIDLiga1}> gewählt. Was macht der Fahrer in der Zukunft?`)
                .addFields(
                  {name: 'Option 1', value: `1️⃣ - Ehemaliger Fahrer`},
                  {name: 'Option 2', value: `2️⃣ - Ersatzfahrer für diese Liga`},
                  {name: 'Option 3', value: `3️⃣ - Stammfahrer eine Liga 0`},
                  {name: 'Option 4', value: `4️⃣ - Stammfahrer eine Liga 2`},
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
  
                    haasDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
        
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ehemaligerFahrerRolle);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
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
  
                    haasDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
            
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
  
                    message.reply(`Existiert nicht`)
  
                  }
                  /**
                  * 
                  * Team Haas, Fahrer 2, Stammfahrer Liga 4
                  * 
                  */
                  else if(reaction.emoji.name == '4️⃣'){
  
                    haasDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let futureRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga2);
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
            
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
  
                    haasDriversLiga1[1] = 'entfernt';
                    await sendTeams(client);
                    currentLineupLiga1.get('Haas')[1] = 'entfernt';
                    // Stammlineup ändern
                    printLineup(client, message);
  
                    let regDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
                    let teamRole = await message.guild.roles.cache.find(role => role.id === haasRoleIDLiga1);
            
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
      if(cmd == 'forcein1' && message.member.roles.cache.has(rennleiterRolleID)){
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
  
          if(driverObject.roles.cache.has(ersatzfahrerRolleIDLiga1)){
           
            if(currentLineupLiga1.get(teamObject.name)[0] == 'entfernt'){
  
              if(teamObject.name == 'Mercedes'){
                mercedesDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Red Bull'){
                redBullDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Ferrari'){
                ferrariDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'McLaren'){
                mcLarenDriversLiga1[0] = driverID;
                sendTeams(client);
              } else  if(teamObject.name == 'Aston Martin'){
                astonMartinDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpine'){
                alpineDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpha Tauri'){
                alphaTauriDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alfa Romeo'){
                alfaRomeoDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Williams'){
                williamsDriversLiga1[0] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Haas'){
                haasDriversLiga1[0] = driverID;
                sendTeams(client);
              } else {
                console.log(`Errör`)
              }
  
              let subInRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
              let regularDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
  
              driverObject.roles.remove(subInRole);
              driverObject.roles.add(regularDriverRole);
              driverObject.roles.add(teamObject);
              if(subPersonListLiga1.includes(driverID)){
                subPersonListLiga1.splice(subPersonListLiga1.indexOf(driverObject), 1)
              }
              checkSubCanBeMade(client, message, true, 0, driverObject.user.id, teamObject.name);
            } else if(currentLineupLiga1.get(teamObject.name)[1] == 'entfernt'){
  
              if(teamObject.name == 'Mercedes'){
                mercedesDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Red Bull'){
                redBullDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Ferrari'){
                ferrariDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'McLaren'){
                mcLarenDriversLiga1[1] = driverID;
                sendTeams(client);
              } else  if(teamObject.name == 'Aston Martin'){
                astonMartinDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpine'){
                alpineDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alpha Tauri'){
                alphaTauriDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Alfa Romeo'){
                alfaRomeoDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Williams'){
                williamsDriversLiga1[1] = driverID;
                sendTeams(client);
              } else if(teamObject.name == 'Haas'){
                haasDriversLiga1[1] = driverID;
                sendTeams(client);
              } else {
                console.log(`Errör`)
              }
  
              let subInRole = await message.guild.roles.cache.find(role => role.id === ersatzfahrerRolleIDLiga1);
              let regularDriverRole = await message.guild.roles.cache.find(role => role.id === stammfahrerRolleIDLiga1);
  
              driverObject.roles.remove(subInRole);
              driverObject.roles.add(regularDriverRole);
              driverObject.roles.add(teamObject);
              if(subPersonListLiga1.includes(driverID)){
                subPersonListLiga1.splice(subPersonListLiga1.indexOf(driverObject), 1)
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
      if(cmd == 'forcefree1' && message.member.roles.cache.has(rennleiterRolleID)){
          
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
  
          freeCarsLiga1.push(teamID);
  
          if(currentLineupLiga1.get(teamObject.name)[0] == 'entfernt'){
            currentLineupLiga1.get(teamObject.name)[0] = 'nicht besetzt';
            checkSubCanBeMade(client, message, true, 0, null, null);
          } else if(currentLineupLiga1.get(teamObject.name)[1] == 'entfernt'){
            currentLineupLiga1.get(teamObject.name)[1] = 'nicht besetzt';
            checkSubCanBeMade(client, message, true, 1, null, null);
          } else {
            message.reply(`Falsches Team übergeben`)
          }
        }
        
        
      }
  
      if(cmd == 'forcefree1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceFree Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
  
      if(cmd == 'forcein1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceIn Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceIn remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
  
      if(cmd == 'forceremove1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd == 'end1' && message.member.roles.cache.has(rennleiterRolleID)){
        await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga1).messages.fetch(messageEmbededAnmeldenID).then((msg) => {
          msg.delete();
        });
  
        await client.guilds.cache.get(discordID).channels.cache.get(anmeldeChannelIDLiga1).send(`Die Anmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
          console.log(`Die Anmeldung in Liga 1 wurde beendet`);
        })
  
        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga1).messages.fetch(messageEmbededAbmeldenID).then((msg) => {
          msg.delete();
        });
  
        await client.guilds.cache.get(discordID).channels.cache.get(abmeldeChannelIDLiga1).send(`Die Abmeldung für das Rennen in ${flag} wurde beendet`).then(() => {
          console.log(`Die Abmeldung in Liga 1 wurde beendet`);
        })
      }
  
      if(cmd == 'end1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }

      if(cmd == 'removefromwaitlist1' && !(message.member.roles.cache.has(rennleiterRolleID))){
        message.reply(`Der forceRemove Command kann nur von der Rennleitung ausgeführt werden`).then(() => {
          let date = new Date().toLocaleString();
          console.log(`${message.member.user.username} hat probiert den forceRemove remove Command auszuführen, hat aber keine Berechtigung dafür -- ${date}`);
        })
      }
  
      if(cmd == 'removefromwaitlist1' && (message.member.roles.cache.has(rennleiterRolleID))){
        if(args[0]){
          var positionToRemove = args[0];
          var lengthSubs = subPersonListLiga1.length;
          var lengthReinstated = subPersonListReinstatedDriversLiga1.length;
          console.log(lengthReinstated + lengthSubs)
          if(positionToRemove <= lengthReinstated + lengthSubs){
            if(positionToRemove <= lengthReinstated && lengthReinstated > 0){
              subPersonListReinstatedDriversLiga1.splice(positionToRemove - 1, 1);
            } else {
              positionToRemove = positionToRemove - lengthReinstated;
              subPersonListLiga1.splice(positionToRemove - 1, 1)
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
