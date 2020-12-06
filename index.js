const express = require('express'),
    app = express(),
    mysql = require('mysql'),
    router = express.Router();

app.use(express.urlencoded({
    extended: true
}));

app.use("/", express.static("static/landingPage"));
app.use("/static/loginPage/index.html", express.static("static/loginPage"));



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



app.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
  