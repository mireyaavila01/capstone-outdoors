"use script";

const searchTypeOptions = document.getElementById("searchTypeOptions");
const listDropdown = document.getElementById("listDropdown");
const locationOrParkType = document.getElementById("locationOrParkType");
const matchingOptionsDropdown = document.getElementById("matchingOptionsDropdown");
const matchingParks = document.getElementById("matchingParks");

const matchingParkTypeDropdown = document.getElementById("matchingParkTypeDropdown");
const matchingParksByType = document.getElementById("matchingParksByType");


window.onload = () => {
    
searchTypeOptions.onchange = onSearchTypeDropdown;
locationOrParkType.onchange = populateMatchingDropdowns;
   
};

function onSearchTypeDropdown(){
let selectedSearchType = searchTypeOptions.value;


if (selectedSearchType == "by_location"){
    listDropdown.style.display = "block"
    matchingOptionsDropdown.style.display = "block"
    matchingParkTypeDropdown.style.display = "none"
    populateDropdown(locationsArray);
 
}
else if (selectedSearchType == "by_parkType"){
    listDropdown.style.display = "block"
    matchingParkTypeDropdown.style.display = "block"
    matchingOptionsDropdown.style.display = "none"
    populateDropdown(parkTypesArray);
   
}
else {
    listDropdown.style.display = "none"
    matchingOptionsDropdown.style.display = "none"
    matchingParkTypeDropdown.style.display = "none"
}

    
}


function populateDropdown(optionsArray){
    locationOrParkType.innerHTML = "";  //to clear previous options
    console.log(locationOrParkType);
    let newOption = document.createElement("option");
    newOption.textContent = "View Options";
    newOption.value = "";
    locationOrParkType.appendChild(newOption);

    for (let i = 0; i < optionsArray.length; i++) {
        let option = optionsArray[i];
        let newOption = document.createElement("option");
        newOption.value = option;
        newOption.textContent = option;
        locationOrParkType.appendChild(newOption);
    }


}

function populateMatchingStateDropdown(){
    let selectedState = locationOrParkType.value.trim();
    matchingParks.innerHTML = "";  //to clear previous options
    
    let parksInState = findParksByState(selectedState);

    let newOption = document.createElement("option");
    newOption.textContent = "View Options";
    newOption.value = "";
    matchingParks.appendChild(newOption);

    for(let i = 0; i < parksInState.length; i++){
        let park = parksInState[i];
        let newOption = document.createElement("option");
        newOption.value = park.LocationID;
        newOption.textContent = park.LocationName;
        matchingParks.appendChild(newOption); 
        //populates the dropdown with the matching results from function findParksByState

    }
    
}

function findParksByState(state){
    state = state.trim().toLowerCase(); //Coverts to lowercase
    return nationalParksArray.filter(park => park.State.trim().toLowerCase() === state);
    //compares the state in lowercase to the states listed in the array to find matching ones 
}

function populateMatchingParkTypeDropdown(){
    let selectedType = locationOrParkType.value.trim();

    matchingParksByType.innerHTML = ""; 

    console.log("Selected Park Type:", selectedType); 

    let parksByType = findParksByType(selectedType);

    let newOption = document.createElement("option");
    newOption.textContent = "View Options";
    newOption.value = "";
    matchingParksByType.appendChild(newOption);

    for(let i = 0; i < parksByType.length; i++){
        let parkFound = parksByType[i];
        let newOption = document.createElement("option");
        newOption.value = parkFound.LocationID;
        newOption.textContent = parkFound.LocationName;
       matchingParksByType.appendChild(newOption); 
    }

}

function findParksByType(parkType){
    parkType = parkType.trim().toLowerCase();
    return nationalParksArray.filter(park => {
    let parkNameLowerCase = park.LocationName.toLowerCase();

    return parkNameLowerCase.indexOf(parkType) != -1;
    });
}

function populateMatchingDropdowns(){
    populateMatchingParkTypeDropdown();
    populateMatchingStateDropdown();
}