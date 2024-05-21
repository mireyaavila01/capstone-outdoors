# bootstrap-starter

parkType = parkType.trim().toLowerCase();
    return nationalParksArray.filter(park => {
    let parkName = park.LocationName.toLowerCase();

    return parkName.indexOf(parkType) >= 0 ;
    });