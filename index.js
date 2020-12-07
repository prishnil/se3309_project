const { response } = require('express');

const express = require('express'),
    app = express(),
    mysql = require('mysql'),
    router = express.Router();

router.use(express.json())

app.use(express.urlencoded({
    extended: true
}));

app.use("/", express.static("static/landingPage"));
app.use("/static/loginPage/index.html", express.static("static/loginPage"));
app.use("/static/transactionPage/index.html", express.static("static/transactionPage"));
app.use("/static/stationPage/index.html", express.static("static/stationPage"));
app.use("/static/routePage/index.html", express.static("static/routePage"));
app.use("/static/ticketPage/index.html", express.static("static/ticketPage"));
app.use("/static/pointLevelPage/index.html", express.static("static/pointLevelPage"));


app.use('/database', router);

let loggedIn = false;


database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'prishni00',
    database: 'assignment3',
})

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

//CREATE USER
router.post('/userCreation', function(req, res) {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName= req.body.lastName;
    let address = req.body.address;
    let password = req.body.password;
    let totalHoursTraveled = req.body.totalHoursTraveled;
    let couponStatus =  req.body.couponStatus;
    database.query('INSERT INTO userinfo (email, firstName, lastName, address, password, totalHourstraveled, couponStatus) VALUES (' + "'" + email + "'" + "," + "'" + firstName + "'" + "," + "'" + lastName + 
    "'" + "," + "'" + address + "'" + "," + "'" + password + "'" + "," + totalHoursTraveled  + "," + "'" + couponStatus + "'" + ");", function (error, results, fields) {
        res.send("hi");
    });

});

//AUTHENTICATION
router.post('/authentication', function(request, response) {
    let email = request.body.email;
    let password = request.body.password;
    console.log("working")
    if(email && password){
        database.query('SELECT * FROM userinfo WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if(results.length > 0){
                loggedIn = true;
                response.redirect('/');
            } else {
                response.send('Incorrect email and/or password');
            }
        });
    } else {
        response.send('Please enter email and password');
    }
});

//CREATE TRANSACTION 

router.post('/transactionCreation', function(req, res) {
    let transactionId = req.body.transactionId;
    let email = req.body.email;
    let paymentMethod= req.body.paymentMethod;
    let date = req.body.date;
    let time = req.body.time;
    database.query('INSERT INTO transactioninfo (transactionId, email, paymentMethod, date, time) VALUES (' + transactionId  + "," + "'" + email + "'" + "," + "'" + paymentMethod + 
    "'" + "," + "'" + date + "'" + "," + "'" + time + "'"  + ");", function (error, results, fields) {
        console.log(req.body);
        res.send("hi");
    });

});

//GET TRANSACTION BY ID

router.get('/searchTransaction/:transactionId', function (req,res) {
    let transactionId = req.params.transactionId;
    database.query ('SELECT * FROM transactioninfo WHERE transactionId = ?', [transactionId], function (error, results, fields) {
        console.log(transactionId)
        console.log("results:" + results)
        if (results.length > 0) {
            console.log(results);
            res.send(results);
        }
        else {
            res.send("Enter a valid transaction ID.")
        }
    })

})
//GET ALL TRANSACTIONS 

router.get('/searchAllTransactions', function (req,res) {
    database.query ('SELECT * FROM transactioninfo', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(results)
        }
    })

})

//CREATE STATION 

router.post('/stationCreation', function(req, res) {
    let stationName = req.body.stationName;
    let address = req.body.address;
    database.query('INSERT INTO stationinfo (stationName, address) VALUES ('  + "'" + stationName + "'" + "," + "'" + address + 
    "'" + ");", function (error, results, fields) {
        console.log(req.body);
        res.send("hi");
    });

});

//GET STATION BY ID


router.get('/searchStation/:stationName', function (req,res) {
    let stationName = req.params.stationName;
    database.query ('SELECT * FROM stationinfo WHERE stationName = ?', [stationName], function (error, results, fields) {
        console.log(stationName)
        console.log("results:" + results)
        if (results.length > 0) {
            console.log(results);
            res.send(results);
        }
        else {
            res.send("Enter a valid Station Name.")
        }
    })

})

//GET ALL STATIONS 

router.get('/searchAllStations', function (req,res) {
    database.query ('SELECT * FROM stationinfo', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(results)
        }
    })

})

//CREATE ROUTE 

router.post('/routeCreation', function(req, res) {
    let routeId = req.body.routeId;
    let departureTime = req.body.departureTime;
    let arrivalTime= req.body.arrivalTime;
    let dayOfWeek = req.body.dayOfWeek;
    database.query('INSERT INTO routeinfo (routeId, departureTime, arrivalTime, dayOfWeek) VALUES (' + routeId  + "," + "'" + departureTime + "'" + "," + "'" + arrivalTime + 
    "'" + "," + "'" + dayOfWeek + "'"  + ");", function (error, results, fields) {
        console.log(req.body);
        res.send("hi");
    });

});

//GET ROUTE BY ID


router.get('/searchRoute/:routeId', function (req,res) {
    let routeId = req.params.routeId;
    database.query ('SELECT * FROM routeinfo WHERE routeId = ?', [routeId], function (error, results, fields) {
        console.log(routeId)
        console.log("results:" + results)
        if (results.length > 0) {
            console.log(results);
            res.send(results);
        }
        else {
            res.send("Enter a valid Route Id.")
        }
    })

})

//GET ALL ROUTES 

router.get('/searchAllRoutes', function (req,res) {
    database.query ('SELECT * FROM routeinfo', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(results)
        }
    })

})

//CREATE TICKET 

router.post('/ticketCreation', function(req, res) {
    let ticketNumber = req.body.ticketNumber;
    let routeId = req.body.routeId;
    let departureStop= req.body.departureStop;
    let arrivalStop= req.body.arrivalStop;
    let transactionId = req.body.transactionId;
    database.query('INSERT INTO ticketinfo (ticketNumber, routeId, departureStop, arrivalStop, transactionId) VALUES (' + ticketNumber  + ","  + routeId + "," + "'" + departureStop + 
    "'" + "," + "'" + arrivalStop + "'" + "," + transactionId + ");", function (error, results, fields) {
        console.log(req.body);
        res.send("hi");
    });

});


//GET TICKET BY ID
router.get('/searchTicket/:ticketNumber', function (req,res) {
    let ticketNumber = req.params.ticketNumber;
    database.query ('SELECT * FROM ticketinfo WHERE ticketNumber = ?', [ticketNumber], function (error, results, fields) {
        console.log(ticketNumber)
        console.log("results:" + results)
        if (results.length > 0) {
            console.log(results);
            res.send(results);
        }
        else {
            res.send("Enter a valid Ticker Numbers.")
        }
    })

})

//GET ALL TICKETS

router.get('/searchAllTickets', function (req,res) {
    database.query ('SELECT * FROM ticketinfo', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(results)
        }
    })

})

//CREATE POINTS 
router.post('/pointLevelCreation', function(req, res) {
    let minPoints = req.body.minPoints;
    let maxPoints = req.body.maxPoints;
    let achievementLevel= req.body.acheivementLevel;
    database.query('INSERT INTO pointslevel (minPoints, maxPoints, achievementLevel) VALUES (' + minPoints  + ","  + maxPoints + "," + "'" + achievementLevel + 
    "'" + ");", function (error, results, fields) {
        console.log(req.body);
        res.send("hi");
    });

});

//GET POINTS BY ID

router.get('/searchPointLevel/:achievementLevel', function (req,res) {
    let achievementLevel = req.params.acheivementLevel;
    database.query ('SELECT * FROM pointslevel WHERE achievementLevel = ?', [achievementLevel], function (error, results, fields) {
        console.log(achievementLevel)
        console.log("results:" + results)
        if (results) {
            console.log(results);
            res.send(results);
        }
        else {
            res.send("Enter a valid acheivement level")
        }
    })

})

//GET ALL POINTS

router.get('/searchAllPointLevels', function (req,res) {
    database.query ('SELECT * FROM pointslevel', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(results)
        }
    })

})


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
  