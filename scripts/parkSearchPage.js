"use script";

const searchTypeOptions = document.getElementById("searchTypeOptions");


const listDropdown = document.getElementById("listDropdown");
const locationOrParkType = document.getElementById("locationOrParkType");




window.onload = () => {
    
    searchTypeOptions.onchange = onSearchTypeDropdown;
    
};

function onSearchTypeDropdown(){
let selectedSearchType = searchTypeOptions.value;


if (selectedSearchType == "by_location"){
    listDropdown.style.visibility = "visible"
    return populateDropDown(locationsArray);
}
else if (selectedSearchType == "by_parkType"){
    listDropdown.style.visibility = "visible"
    return populateDropDown(parkTypesArray);
}
else {
    listDropdown.style.visibility = "hidden";
}
    
}


function populateDropDown(optionsArray){
    locationOrParkType.innerHTML = "";

    let newOption = document.createElement("option");
    newOption.textContent = "Select One";
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

function displayInfo(){
    
}