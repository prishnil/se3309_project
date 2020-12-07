document.getElementById('createTicketSubmit').addEventListener('click', createTicket);
function createTicket() {
    newTicket = {
        ticketNumber: document.getElementById('userTicketNumber').value,
        routeId: document.getElementById('userRouteId').value,
        departureStop: document.getElementById('userDepartureStop').value,
        arrivalStpo: document.getElementById('userArrivalStop').value,
        transactionId: document.getElementById('userTransactionId').value,
    }
    const url = "/database/ticketCreation"
    fetch (url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newTicket)
    }).then (res => res.text())
    .catch(error => console.log(error))
}

//THIS ONE WORKS
document.getElementById('searchTicketSubmit').addEventListener('click', searchTicket);
function searchTicket() {
    let ticketNumber = document.getElementById('userTicketNumber').value
    const url = "/database/searchTicket/" + ticketNumber;
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(ticket => {
        item.appendChild(document.createTextNode(`Ticket Number: ${ticket.ticketNumber} Route Id: ${ticket.routeID} Departure Stop: ${ticket.departureStop} Arrival Stop: ${ticket.arrivalStop} Transaction Id: ${ticket.transactionID}`))
        list.appendChild(item);

    })   
    }).catch(error => console.log(error)))
}

//THIS ONE WORKS
document.getElementById('searchAllTicketSubmit').addEventListener('click', searchTickets);
function searchTickets() {
    const url = "/database/searchAllTickets/";
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(ticket => {
        item.appendChild(document.createTextNode(`Ticket Number: ${ticket.ticketNumber} Route Id: ${ticket.routeID} Departure Stop: ${ticket.departureStop} Arrival Stop: ${ticket.arrivalStop} Transaction Id: ${ticket.transactionID}`))
        list.appendChild(item);

    })   
    }).catch(error => console.log(error)))
}