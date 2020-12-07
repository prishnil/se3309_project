//THIS ONE WORKS
document.getElementById('createTransactionSubmit').addEventListener('click', createTransaction);
function createTransaction() {
    newTransaction = {
        transactionId: document.getElementById('userTransactionId').value,
        email: document.getElementById('userEmail').value,
        paymentMethod: document.getElementById('userPaymentMethod').value,
        date: document.getElementById('userDate').value,
        time: document.getElementById('userTime').value
    }
    const url = "/database/transactionCreation"
    fetch (url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newTransaction)
    }).then (res => res.text())
    .catch(error => console.log(error))
}


//THIS ONE WORKS
document.getElementById('searchTransactionSubmit').addEventListener('click', searchTransactions);
function searchTransactions() {
    let transactionId = document.getElementById('userTransactionId').value
    const url = "/database/searchTransaction/" + transactionId;
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results")
        const item = document.createElement('li');
    data.forEach(transaction => {
        item.appendChild(document.createTextNode(`Transaction Id: ${transaction.transactionID} Email: ${transaction.email} Payment Method: ${transaction.paymentMethd} Date: ${transaction.date} Time: ${transaction.time}`))
        list.appendChild(item);
    })
    }).catch(error => console.log(error)))
}

//THIS ONE WORKS
document.getElementById('searchAllTransactionSubmit').addEventListener('click', searchTransaction);
function searchTransaction() {
    const url = "/database/searchAllTransactions";
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results")
        const item = document.createElement('li');
    data.forEach(transaction => {
        item.appendChild(document.createTextNode(`Transaction Id: ${transaction.transactionID} Email: ${transaction.email} Payment Method: ${transaction.paymentMethd} Date: ${transaction.date} Time: ${transaction.time}`))
        list.appendChild(item);
    })
    }).catch(error => console.log(error)))
}