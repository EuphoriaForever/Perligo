const express = require("express");
const ejs = require("ejs");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mysql = require('mysql')
const session = require('express-session');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: true})
const { worker } = require("cluster");

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

app.post("/register", (req, res)=>{
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.body.password, salt); 
    let qry = 'INSERT INTO users(username, email, password) VALUES("'+req.body.username+'", "'+req.body.email+'", "'+hash+'")';
    connection.query(qry, (err) =>{
        if (err) throw err;
    });
    
    res.redirect("/login");
})

app.post("/login", (req, res)=>{
    sess = req.session;
    let qry = 'SELECT * FROM users WHERE username="'+req.body.username+'"';
    connection.query(qry, (err, response) =>{
        if(err){
            throw err;
        } else if(response.length > 0 && bcrypt.compareSync(req.body.password, response[0]['password'])){
            sess.loggedin = true;
            res.redirect('/');
        } else {
            res.render('login', {loggedin: '', error: true});
        }
    });
});

app.get("/filesharing", (req, res)=>{
    sess = req.session;
    if(sess.loggedin){
        res.render('filesharing', {loggedin: true});
    } else {
        res.render('filesharing', {loggedin: false});
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
    if(req.body.type != "mp3"){
        // do text
        res.redirect('convert');
        const fs = require('fs');
        const sdk = require("microsoft-cognitiveservices-speech-sdk");
        const speechConfig = sdk.SpeechConfig.fromSubscription("0619c56b48914ba3a1601c59eeae3959", "southeastasia");

        function fromFile() {
            let pushStream = sdk.AudioInputStream.createPushStream();

            fs.createReadStream(req.body.url).on('data', function(arrayBuffer) {
                pushStream.write(arrayBuffer.slice());
            }).on('end', function() {
                pushStream.close();
            });

            let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
            let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
            recognizer.recognizeOnceAsync(result => {
                console.log(`RECOGNIZED: Text=${result.text}`);
                recognizer.close();
            });
        }
        fromFile();
    }
    if(req.body.type != "text"){
        // do mp3
        console.log(req.body.url)
        var fs = require('fs'),
        cloudconvert = new (require('cloudconvert'))('stOAoEwArR56SOS47tt2oiNaplPqgIfEgD2YTKNJac2Cc3jlTME55OlSe02qXZtf');
        
        fs.createReadStream(req.body.url)
        .pipe(cloudconvert.convert({
            "inputformat": "mp4",
            "outputformat": "mp3",
        })).pipe(fs.createWriteStream(req.body.OutPutUrl+".mp3"))
        .on('finish', function() {
            console.log("Conversion has finished!");
        });
        console.log("Starting conversion. Please don't quit the webpage until conversion has finished.")
        
        res.redirect('convert');
    }
});

app.post("/converttext", (req, res)=>{
    res.redirect('convert');
    const fs = require('fs');
    const sdk = require("microsoft-cognitiveservices-speech-sdk");
    const speechConfig = sdk.SpeechConfig.fromSubscription("0619c56b48914ba3a1601c59eeae3959", "southeastasia");

    function fromFile() {
    let pushStream = sdk.AudioInputStream.createPushStream();

    fs.createReadStream(req.body.url).on('data', function(arrayBuffer) {
        pushStream.write(arrayBuffer.slice());
    }).on('end', function() {
        pushStream.close();
    });

    let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizeOnceAsync(result => {
        console.log(`RECOGNIZED: Text=${result.text}`);
        recognizer.close();
    });
    }
    fromFile();
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

app.get("/drive", (req, res)=>{
    sess = req.session;
    if(sess.loggedin){
        res.render('drive', {loggedin: true});
    } else {
        res.render('drive', {loggedin: false});
    }
});

app.listen(3000);
console.log('Listening to Port 3000');