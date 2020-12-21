const express = require("express");
const ejs = require("ejs");
const app = express();

const mysql = require('mysql')
const session = require('express-session');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: true})
const { worker } = require("cluster");

const userControl = require('./controllers/userController');
const gDriveControl = require('./controllers/Gdrive.js');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'fletcher', saveUninitialized: true, resave: true}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'perligo',
    multipleStatements: true
})

var sess

app.get("/", (req, res)=>{
    sess = req.session;
    if(sess.loggedin){
        res.render('convert', {loggedin:true});
    } else {
        res.render('convert', {loggedin:false});
    }
});

app.get("/login", (req, res)=>{
    res.render('login', {loggedin: '', error: false});
});

app.get("/register", (req, res)=>{
    res.render('register', {loggedin: ''});
});

app.post("/register",urlEncodedParser,async(req,res)=>{
  let issOkay= await userControl.createAccount(req);
  if(issOkay==true){

    res.redirect("/login");
  }else{
      res.redirect('/register');
  }

})

app.post("/login", urlEncodedParser,async(req, res)=>{
  sess = req.session;
   
  let isOkay = await userControl.authentication(req);

    if(isOkay==true){
        sess.loggedin = true;
        gDriveControl.setUpToken();
        res.redirect('/');
    }else{
        res.render('login', {loggedin: '', error: true});
    }
});


app.get("/convert", (req, res)=>{
    sess = req.session;
    if(sess.loggedin){
        res.render('convert', {loggedin: true});
    } else {
        res.render('convert', {loggedin: false});
    }
});

app.get('/logout',(req,res) => {
    sess = req.session;
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
});

app.post("/convert", (req, res)=>{
     sess = req.session;
    if(req.body.type != "text"){
        // do mp3
        let inputFile=req.body.url+".mp4";
        console.log(inputFile);
        var fs = require('fs'),
        cloudconvert = new (require('cloudconvert'))('stOAoEwArR56SOS47tt2oiNaplPqgIfEgD2YTKNJac2Cc3jlTME55OlSe02qXZtf');
        
        fs.createReadStream(inputFile)
        .pipe(cloudconvert.convert({
            "inputformat": "mp4",
            "outputformat": "mp3",
        })).pipe(fs.createWriteStream(req.body.OutPutUrl+".mp3"))
        .on('finish', function() {
            console.log("Conversion has finished!");
            if(sess.loggedin==true){
                gDriveControl.storeToGDrive(req.body.OutPutUrl+".mp3");
            }
        });
        console.log("Starting conversion. Please don't quit the webpage until conversion has finished.")

        res.redirect('convert');
    }
});



app.get("/convertMP3", (req, res)=>{
    res.redirect('convert');
    var fs = require('fs'),
    cloudconvert = new (require('cloudconvert'))('stOAoEwArR56SOS47tt2oiNaplPqgIfEgD2YTKNJac2Cc3jlTME55OlSe02qXZtf');

    fs.createReadStream('inputfile.mp4')
    .pipe(cloudconvert.convert({
    "inputformat": "mp4",
    "outputformat": "mp3",
    }))
    console.log("Starting conversion. Please don't quit the webpage until conversion has finished.")
    .pipe(fs.createWriteStream(req.body.OutPutUrl+".mp3"))
    .on('finish', function() {
        console.log("Conversion has finished!");
    });

});


app.listen(3000);
console.log('Listening to Port 3000');