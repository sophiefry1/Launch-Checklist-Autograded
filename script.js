const {
  formSubmission,
  myFetch,
  pickPlanet,
  addDestinationInfo,
} = require("./scriptHelper");

window.addEventListener("load", function () {
  let button = document.getElementById("formSubmit");

  button.addEventListener("click", function () {
    let pilot = document.getElementById("pilotName").value;
    let copilot = document.getElementById("copilotName").value;
    let fuelLevel = document.getElementById("fuelLevel").value;
    let cargoLevel = document.getElementById("cargoMass").value;

    formSubmission(
      document,
      document.getElementById("faultyItems"),
      pilot,
      copilot,
      fuelLevel,
      cargoLevel
    );

  });

  // Assuming you have the pilot and co-pilot names

  // Update the pilotStatus and copilotStatus <li> elements with pilot and co-pilot names

  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();

  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
      let destination = pickPlanet(listedPlanets);

      addDestinationInfo(
        document,
        destination.name,
        destination.diameter,
        destination.star,
        destination.distance,
        destination.moons,
        destination.image
      );
    });
});
