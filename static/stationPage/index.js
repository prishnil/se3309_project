//THIS IS WORKING
document.getElementById('createStationSubmit').addEventListener('click', createStation);
function createStation() {
    newStation = {
        stationName: document.getElementById('userStationName').value,
        address: document.getElementById('userAddress').value
    }
    const url = "/database/stationCreation"
    fetch (url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newStation)
    }).then (res => res.text())
    .catch(error => console.log(error))
}

//THIS ONE WORKS 
document.getElementById('searchStationSubmit').addEventListener('click', searchStation);
function searchStation() {
    let stationId = document.getElementById('userStationName').value
    const url = "/database/searchStation/" + stationId;
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(station => {
        item.appendChild(document.createTextNode(`Station Name: ${station.stationName} Address: ${station.address}`))
        list.appendChild(item);
    })   
    }).catch(error => console.log(error)))
}


//THIS ONE WORKS
document.getElementById('searchAllStationSubmit').addEventListener('click', searchStations);
function searchStations() {
    const url = "/database/searchAllStations/";
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(station => {
        item.appendChild(document.createTextNode(`Station Name: ${station.stationName} Address: ${station.address}`))
        list.appendChild(item);
    })   
    }).catch(error => console.log(error)))
}