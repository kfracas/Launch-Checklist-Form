// Write your JavaScript code here!

window.addEventListener("load", function() {
   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
      response.json().then(function(json) {
         let form = document.querySelector("form");
         form.addEventListener("submit", function(event){
            let pilotNameInput = document.querySelector("input[name=pilotName]");
            let copilotNameInput = document.querySelector("input[name=copilotName]");
            let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
            let cargoMassInput = document.querySelector("input[name=cargoMass]");
            let pilotStatusUpdate = document.getElementById("pilotStatus");
            let copilotStatusUpdate = document.getElementById("copilotStatus");
            let fuelStatusUpdate = document.getElementById("fuelStatus");
            let cargoStatusUpdate = document.getElementById("cargoSatus");
            let missionTarget = document.getElementById("missionTarget");
            if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
               alert("All fields are required!");
               event.preventDefault();
               return
            } else if (isNaN(Number(pilotNameInput.value)) !== true || isNaN(Number(copilotNameInput.value)) !== true || isNaN(Number(fuelLevelInput.value)) !== false || isNaN(Number(cargoMassInput.value)) !== false) {
               alert("Must use a valid entry for all fields!");
               event.preventDefault();
               return
            }

            pilotStatusUpdate.innerHTML = `
               <li id="pilotStatus">Pilot ${pilotNameInput.value} is Ready</li>
               `;
            copilotStatusUpdate.innerHTML = `
               <li id="copilotStatus">Co-pilot ${copilotNameInput.value} is Ready</li>
               `;

            let index = Math.floor(Math.random()*6)
               missionTarget.innerHTML = `
               <div id="missionTarget">
                  <h2>Mission Destination</h2>
                     <ol>
                        <li>Name: ${json[index].name}</li>
                        <li>Diameter: ${json[index].diameter}</li>
                        <li>Star: ${json[index].star}</li>
                        <li>Distance from Earth: ${json[index].distance}</li>
                        <li>Number of Moons: ${json[index].moons}</li>
                     </ol>
                  <img src="${json[index].image}">
               </div>
               `;
      
            if (Number(fuelLevelInput.value) < 10000) {
               document.getElementById("faultyItems").style.visibility = "visible";
               fuelStatusUpdate.innerHTML = `
                  <li id="fuelStatus">There is not enough fuel for the journey!</li>
                  `;
               launchStatus.innerHTML = `
                  <h2 id="launchStatus">Shuttle not ready for launch</h2>
                  `;
               document.getElementById("launchStatus").style.color = "red";
               event.preventDefault();
            }
      
            if (Number(cargoMassInput.value) > 10000) {
               document.getElementById("faultyItems").style.visibility = "visible";
               cargoStatusUpdate.innerHTML = `
                  <li id="cargoStatus">Too much mass for the shuttle to take off!</li>
                  `;
               launchStatus.innerHTML = `
                  <h2 id="launchStatus">Shuttle not ready for launch</h2>
                  `;
               document.getElementById("launchStatus").style.color = "red";
               event.preventDefault();
            }
      
            if (Number(fuelLevelInput.value) >= 10000 && Number(cargoMassInput.value) <= 10000) {
               document.getElementById("faultyItems").style.visibility = "visible";
               launchStatus.innerHTML = `
                  <h2 id="launchStatus">Shuttle is ready for launch!</h2>
                  `;
               document.getElementById("launchStatus").style.color = "green";
               event.preventDefault();
            }
         })
      })
   })
})

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
