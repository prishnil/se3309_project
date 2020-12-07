//THIS IS WORKING
document.getElementById('createRouteSubmit').addEventListener('click', createRoute);
function createRoute() {
    newRoute = {
        routeId: document.getElementById('userRouteId').value,
        departureTime: document.getElementById('userDepartureTime').value,
        arrivalTime: document.getElementById('userArrivalTime').value,
        dayOfWeek: document.getElementById('userDayOfWeek').value,
    }
    const url = "/database/routeCreation"
    fetch (url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newRoute)
    }).then (res => res.text())
    .catch(error => console.log(error))
}


//THIS IS WORKING
document.getElementById('searchRouteSubmit').addEventListener('click', searchRoute);
function searchRoute() {
    let routeId = document.getElementById('userRouteId').value
    const url = "/database/searchRoute/" + routeId;
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(route => {
        item.appendChild(document.createTextNode(`Route Id: ${route.routeID} Departure Time: ${route.departureTime} Arrival Time: ${route.arrivalTime} Day of Week: ${route.dayOfWeek}`))
        list.appendChild(item);
    })   
    }).catch(error => console.log(error)))
}


//THIS IS WORKING
document.getElementById('searchAllRouteSubmit').addEventListener('click', searchRoutes);
function searchRoutes() {
    let routeId = document.getElementById('userRouteId').value
    const url = "/database/searchAllRoutes";
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(route => {
        item.appendChild(document.createTextNode(`Route Id: ${route.routeID} Departure Time: ${route.departureTime} Arrival Time: ${route.arrivalTime} Day of Week: ${route.dayOfWeek}`))
        list.appendChild(item);
    })   
    }).catch(error => console.log(error)))
}
