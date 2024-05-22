"use script";

const searchTypeOptions = document.getElementById("searchTypeOptions");
const listDropdown = document.getElementById("listDropdown");
const locationOrParkType = document.getElementById("locationOrParkType");
const matchingOptionsDropdown = document.getElementById("matchingOptionsDropdown");
const matchingParks = document.getElementById("matchingParks");


window.onload = () => {
    
searchTypeOptions.onchange = onSearchTypeDropdown;
locationOrParkType.onchange = getMatchingOptionsDropdown;

};

function onSearchTypeDropdown(){
   clearResults(matchingParks);

let selectedSearchType = searchTypeOptions.value;

if (selectedSearchType == "by_location"){
    listDropdown.style.display = "block"
    matchingOptionsDropdown.style.display = "block"
    populateDropdown(locationsArray);
 
}
else if (selectedSearchType == "by_parkType"){
    listDropdown.style.display = "block"
    matchingOptionsDropdown.style.display = "block"
    populateDropdown(parkTypesArray);
   
}
else {
    listDropdown.style.display = "none"
    matchingOptionsDropdown.style.display = "none"
   
}

}


function populateDropdown(optionsArray){
    clearResults(locationOrParkType);  //to clear previous options

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

function getMatchingOptionsDropdown(){
    clearResults(matchingParks);
   
     let selectedValue = locationOrParkType.value.trim();
     
    let searchType;

    if(searchTypeOptions.value === "by_location"){
        searchType = "state";
    }
    else if (searchTypeOptions.value === "by_parkType"){
        searchType = "type";
    }
    else{
        console.log("Invaid search type");
        return;
    }
    let parksSelected = findParks(selectedValue, searchType);
    addOptionsToDropdown(parksSelected , matchingParks);
}

function addOptionsToDropdown(parks , dropdown){

    clearResults(dropdown);

    let newOption = document.createElement("option");
    newOption.textContent = "View Options";
    newOption.value = "";
    dropdown.appendChild(newOption);

    for(let i = 0; i < parks.length; i++){
        let park = parks[i];
        let newOption = document.createElement("option");
        newOption.value = park.LocationID;
        newOption.textContent = park.LocationName;
        dropdown.appendChild(newOption);
    }
}

function findParks(optionSelected, searchType){

    optionSelected = optionSelected.trim().toLowerCase();

    if(searchType === "type"){
        return nationalParksArray.filter(park => {
            let parkType = park.LocationName.toLowerCase();
            return parkType.indexOf(optionSelected) != -1;
        });
            
        
    }
    else if(searchType === "state"){
        return nationalParksArray.filter(park => {
          let parkState = park.State.trim().toLowerCase();
          return parkState === optionSelected; 
        });
        
    }
    else{
        console.log("Invalid search type:", searchType);
        return [];
    }

}

function clearResults(dropdown){
    dropdown.innerHTML = "";

    let newOption = document.createElement("option");
    newOption.textContent = "View Options";
    newOption.value = "";
    dropdown.appendChild(newOption);
}

function parkInfoCard(park){
    let parkColumnDiv = document.createElement("div");
    parkColumnDiv.className = "col order-md-last";

    let parkHeadedTag1 = document.createElement("h4");
    parkHeadedTag1.innerHTML = "Park Details";
    parkColumnDiv.appendChild = (parkHeadedTag1);

    let parkCardDiv = document.createElement("div");
    parkCardDiv.className = "card-parkInfo";
    parkColumnDiv.appendChild(parkCardDiv);

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    parkCardDiv.appendChild(cardBodyDiv);

    let bodyTitle = document.createElement("h5")
    bodyTitle.className = "card-title";
    bodyTitle.innerHTML = park.LocationName;
    cardBodyDiv.appendChild(bodyTitle);

    let bodySubtitle = document.createElement("h6");
    bodySubtitle.className = "card-subtitle mb-2 text-body-secondary";
    bodySubtitle.innerHTML = park.LocationID;
    cardBodyDiv.appendChild(bodySubtitle);

    let paraAddress = document.createElement("p");
    paraAddress.className = "card-text";
    paraAddress.innerHTML = `Address: ${park.Address}, ${park.City}, ${park.State}, ${park.ZipCode || "N/A"}`;
    cardBodyDiv.appendChild(paraAddress);

    let paraPhone = document.createElement("p");
    paraPhone.className ="card-text";
    paraPhone.innerHTML ="Phone Number: " + (park.Phone || "N/A");
    cardBodyDiv.appendChild(paraPhone);

    let paraFax = document.createElement("p");
    paraFax.className = "card-text";
    paraFax.innerHTML = "Fax Number: " + (park.Fax || "N/A");
    cardBodyDiv.appendChild(paraFax);

    let vistLink = document.createElement("a");
    vistLink.href = park.Visit || "N/A"
    vistLink.className = "card-link";
    vistLink.innerHTML = "Visit Website " + parkColumnDiv.Visit;
    cardBodyDiv.appendChild(vistLink);




}