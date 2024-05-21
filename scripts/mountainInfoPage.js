"use strict";

const mountainOptions = document.getElementById("mountainOptions");
const mountainCard = document.getElementById("mountainCard");




window.onload = () => {
addMountainDropdown();
mountainOptions.onchange = getSelectedMountain;
hideOrShowCard(false);


}

function addMountainDropdown(){
    console.log("window loaded");

    mountainOptions.innerHTML = "";

    let newOption = document.createElement("option");
    newOption.textContent = "Select One";
    newOption.value = "";
    mountainOptions.appendChild(newOption);

    for (let i = 0; i < mountainsArray.length; i++) {
        let option = mountainsArray[i].name;
        let newOption = document.createElement("option");
        newOption.value = option;
        newOption.textContent = option;
        mountainOptions.appendChild(newOption);
    }
}
// getting the selected value from the dropdown
function getSelectedMountain(){
    let selectedMountain = mountainOptions.value.trim().toLowerCase();


    let mountain = mountainsArray.find(m => m.name.trim().toLowerCase() === selectedMountain);

    if(mountain){
       mountainCard.innerHTML = "";
       let card = createMountainCard(mountain); 
       mountainCard.appendChild(card);
       hideOrShowCard(true);
    
    }
    else{
        console.log("No matching mountain was found");
        hideOrShowCard(false);
    }
    
}

// create a card to display the value's info
function createMountainCard(mountain){

    console.log("test");

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";
    mountainCard.appendChild(cardBodyDiv);


    let mountainImage = document.createElement("img");
    mountainImage.src = "images/" + mountain.img;
    mountainImage.className = "card-img-top";
    mountainImage.alt = mountain.name;
    cardBodyDiv.appendChild(mountainImage);


    let mountainHeadedTag = document.createElement("h5");
    mountainHeadedTag.className = "card-title";
    mountainHeadedTag.innerHTML = mountain.name;
    cardBodyDiv.appendChild(mountainHeadedTag);

    let paraDescription = document.createElement("p");
    paraDescription.className = "card-text";
    paraDescription.innerHTML = "Description: " + mountain.desc;
    cardBodyDiv.appendChild(paraDescription);

    let listGroup = document.createElement("ul");
    listGroup.className = "list-group list-group-flush";
    cardBodyDiv.appendChild(listGroup);

    let listItemElevation = document.createElement("li");
    listItemElevation.className = "list-group-item";
    listItemElevation.innerHTML = "Elevation: " + mountain.elevation;
    listGroup.appendChild(listItemElevation);

    let listItemEffort = document.createElement("li");
    listItemEffort.className = "list-group-item";
    listItemEffort.innerHTML = "Effort Level: " + mountain.effort;
    listGroup.appendChild(listItemEffort);
 
    return cardBodyDiv;


}

function hideOrShowCard(show){
    if (show) {
        mountainCard.style.display = "block";
    } else {
        mountainCard.style.display = "none";
    }
}