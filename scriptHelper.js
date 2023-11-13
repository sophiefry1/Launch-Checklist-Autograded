// Write your helper functions here!
require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  document.getElementById(
    "missionTarget"
  ).innerHTML = `<h2>Mission Destination</h2>
    <ol>
        <li>Name:${name} </li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star}</li>
        <li>Distance from Earth:${distance} </li>
        <li>Number of Moons: ${moons} </li>
    </ol>
    <img src="${imageUrl}">`;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (!isNaN(testInput)) {
    return "Is a Number";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  /*
  Use validateInput in this function to test the different inputs 
    pilot, copilot, fuelLevel, cargoLevel 
    and alert if something is wrong
  */
  let pilotValidation = validateInput(pilot);
  let copilotValidation = validateInput(copilot);
  let fuelLevelValidation = validateInput(fuelLevel);
  let cargoLevelValidation = validateInput(cargoLevel);

  if (
    pilotValidation === "Empty" ||
    copilotValidation === "Empty" ||
    fuelLevelValidation === "Empty" ||
    cargoLevelValidation === "Empty"
  ) {
    alert("All fields are required!");
    return;
  }

  if(fuelLevelValidation === "Not a Number" || cargoLevelValidation === "Not a Number" || pilotValidation === "Is a Number" || copilotValidation === "Is a Number"){
    alert("Make sure to enter valid information for each field!")
    return;
  }

  list.style["visibility"] = "visible";

  let hasError = false;

  let h2 = document.getElementById("launchStatus");

  let pilotStatus = document.getElementById("pilotStatus");
  pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;

  let copilotStatus = document.getElementById("copilotStatus");
  copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;

  let fuelStatus = document.getElementById("fuelStatus");

  if (fuelLevel < 10000) {
    fuelStatus.textContent = '"Fuel level too low for launch';
    hasError = true;
  } else {
    fuelStatus.textContent = "Fuel level high enough for launch";
  }

  let cargoStatus = document.getElementById("cargoStatus");

  if (cargoLevel > 10000) {
    cargoStatus.textContent = "Cargo mass too heavy for launch";
    hasError = true;
  } else {
    cargoStatus.textContent = "Cargo mass low enough for launch";
  }

  if (hasError) {
    h2.style["color"] = "red";
    h2.textContent = "Shuttle Not Ready for Launch";
  } else {
    h2.style["color"] = "green";
    h2.textContent = "Shuttle is Ready for Launch";
  }
}

async function myFetch() {
  let planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );

  return planetsReturned.json();
}

function pickPlanet(planets) {
  let randomPlanet = Math.floor(Math.random() * (planets.length - 1));

  return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
