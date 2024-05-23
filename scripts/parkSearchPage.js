"use script";

const searchTypeOptions = document.getElementById("searchTypeOptions");
const listDropdown = document.getElementById("listDropdown");
const locationOrParkType = document.getElementById("locationOrParkType");
const matchingOptionsDropdown = document.getElementById("matchingOptionsDropdown");
const matchingParks = document.getElementById("matchingParks");

const parkCardRow = document.getElementById("parkCardRow");


window.onload = () => {
    
searchTypeOptions.onchange = onSearchTypeDropdown;
locationOrParkType.onchange = getMatchingOptionsDropdown;
matchingParks.onchange = showSelectedPark;

};

function onSearchTypeDropdown(){
// clears exsisting results and park card
   clearResults(matchingParks);
   parkCardRow.innerHTML = "" ;

//Gets the selected search type from the searchTypeOptions dropdown
let selectedSearchType = searchTypeOptions.value;

//If the user chooses to search by location
if (selectedSearchType == "by_location"){
    listDropdown.style.display = "block"
    matchingOptionsDropdown.style.display = "block"
    //calls the fuction with the argument of locationsArray to create new dropdown
    populateDropdown(locationsArray);
 
}
//If the user chooses to search by park type
else if (selectedSearchType == "by_parkType"){
    listDropdown.style.display = "block"
    matchingOptionsDropdown.style.display = "block"
    //calls the fuction with the argument of parkTypesArray to create new dropdown
    populateDropdown(parkTypesArray);
   
}
else {
    listDropdown.style.display = "none"
    matchingOptionsDropdown.style.display = "none"
   
}

}


function populateDropdown(optionsArray){
    clearResults(locationOrParkType);  
    

    for (let i = 0; i < optionsArray.length; i++) {
        let option = optionsArray[i];
        let newOption = document.createElement("option");
        newOption.value = option;
        newOption.textContent = option;
        locationOrParkType.appendChild(newOption);
    }

}

function getMatchingOptionsDropdown(){
    // clears exsisting results and park card
    clearResults(matchingParks);
    parkCardRow.innerHTML = "" ;
   
    //gets the selected value from the location or park type dropdown
     let selectedValue = locationOrParkType.value.trim();
     
    let searchType;

    //Uses if statement with a condition to determine the search type
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

    //get results from the findParks function with two agruments 
    let parksSelected = findParks(selectedValue, searchType);

    //calls the function with the results and adds it to the dropdwown
    addOptionsToDropdown(parksSelected , matchingParks);
   
}

function addOptionsToDropdown(parks , dropdown){

    clearResults(dropdown);

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
function showSelectedPark(){
    
    let selectedParkValue = matchingParks.value.trim().toLowerCase();


    let selectedPark = nationalParksArray.find(park => park.LocationID.trim().toLowerCase() === selectedParkValue);



    if(selectedPark){
        parkCardRow.innerHTML = "";
        let parkCard = parkInfoCard(selectedPark);
        parkCardRow.appendChild(parkCard);
   
    }
    else{
        console.log("No Matching Park");
       
    }
    
}
function parkInfoCard(park){
    

    let parkColumnDiv = document.createElement("div");
    parkColumnDiv.className = "col-md-6 offset-md-6";

    let parkHeadedTag1 = document.createElement("h4");
    parkHeadedTag1.innerHTML = "Park Details";
    parkColumnDiv.appendChild(parkHeadedTag1);

    let parkCardDiv = document.createElement("div");
    parkCardDiv.className = "card";
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
    bodySubtitle.innerHTML = "LocationID: " + park.LocationID;
    cardBodyDiv.appendChild(bodySubtitle);

    let paraAddress = document.createElement("p");
    paraAddress.className = "card-text";
    paraAddress.innerHTML = "Address: " + (park.Address || "N/A");
    cardBodyDiv.appendChild(paraAddress);

    let paraCityStateZip = document.createElement("p")
    paraCityStateZip.className = "card-text";
    paraCityStateZip.innerHTML = `City:  ${park.City}<br> State:  ${park.State} <br> Zip:  ${park.ZipCode}`;
    cardBodyDiv.appendChild(paraCityStateZip);

    let paraPhone = document.createElement("p");
    paraPhone.className ="card-text";
    paraPhone.innerHTML ="Phone Number: " + (park.Phone || "N/A");
    cardBodyDiv.appendChild(paraPhone);

    let paraFax = document.createElement("p");
    paraFax.className = "card-text";
    paraFax.innerHTML = "Fax Number: " + (park.Fax || "N/A");
    cardBodyDiv.appendChild(paraFax);

    if(park.Visit){
    let visitLink = document.createElement("a");
    visitLink.href = park.Visit;
    visitLink.className = "btn btn-olive-green";
    visitLink.innerHTML = "Visit Website" ;
    visitLink.target = "_blank";
    cardBodyDiv.appendChild(visitLink); 
    }
    
    
    return parkColumnDiv;

}

