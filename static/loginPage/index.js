document.getElementById('signupSubmit').addEventListener('click', createUser);
function createUser() {
    newUser = {
        email: document.getElementById('userEmailSignup').value,
        firstName: document.getElementById('userFirstNameSignup').value,
        lastName: document.getElementById('userLastNameSignup').value,
        address: document.getElementById('userAddressSignup').value,
        password: document.getElementById('userPasswordSignup').value,
        totalHoursTravelled: document.getElementById('userHoursSignup').value,
        couponStatus: document.getElementById('userCouponSignup').value
    }
    console.log(JSON.stringify(newUser))
    const url = "/database/userCreation"
    fetch (url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newUser)
    }).then (res => res.text())
    .then(data => {
        console.log('Success', data);
    })
    .catch(error => console.log("Error: " + error))
}