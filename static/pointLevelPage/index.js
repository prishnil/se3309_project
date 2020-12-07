document.getElementById('createPointLevelSubmit').addEventListener('click', createPointLevel);
function createPointLevel() {
    newPointLevel = {
        minPoints: document.getElementById('userMinPoints').value,
        maxPoints: document.getElementById('userMaxPoints').value,
        achievementLevel: document.getElementById('userAchievementLevel').value
    }
    const url = "/database/pointLevelCreation"
    fetch (url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newPointLevel)
    }).then (res => res.text())
    .catch(error => console.log(error))
}


document.getElementById('searchPointLevelSubmit').addEventListener('click', searchPointLevel);
function searchPointLevel() {
    let acheivementLevel = document.getElementById('userAchievementLevel').value
    const url = "/database/SearchPointLevel/" + acheivementLevel;
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(point => {
        item.appendChild(document.createTextNode(`Minimum Points: ${point.minPoints} Maximum Points: ${point.maxPoints} Achievement Level: ${point.acheivementLevel}`))
        list.appendChild(item);

    })   
    }).catch(error => console.log(error)))
}


document.getElementById('searchAllPointLevelSubmit').addEventListener('click', searchPointLevels);
function searchPointLevels() {
    let acheivementLevel = document.getElementById('userAchievementLevel').value
    const url = "/database/searchAlllPointLevels/";
    fetch(url)
    .then(res => res.json()
    .then(data => {
        const list = document.getElementById("results");
        const item = document.createElement('li');
    data.forEach(point => {
        item.appendChild(document.createTextNode(`Minimum Points: ${point.minPoints} Maximum Points: ${point.maxPoints} Achievement Level: ${point.acheivementLevel}`))
        list.appendChild(item);

    })   
    }).catch(error => console.log(error)))
}