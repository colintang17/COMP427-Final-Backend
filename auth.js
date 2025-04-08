
let sessionUser = {};
let cookieKey = "sid";
const md5 = require('md5');
const mongoose = require('mongoose');
const url = 'mongodb+srv://mjoyner:bEsT1WcgEosNg@cluster0.8xaq1b7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url);
let userObjs = {};

var userSchema = new mongoose.Schema({
    username: String, salt: String, hash: String
});
const User = mongoose.model('user', userSchema);

var profileSchema = new mongoose.Schema({
    username: String, email: String, phone: String, zipcode: String, dob: Date, status: String, following: Array, avatar: String
});
const Profile = mongoose.model('profile', profileSchema);



function isLoggedIn(req, res, next) {
    //console.log(req);
    // likely didn't install cookie parser
    if (!req.cookies) {
       return res.sendStatus(401);
    }

    let sid = req.cookies[cookieKey];
    

    // no sid for cookie key
    if (!sid) {
        return res.sendStatus(401);
    }

    let user = sessionUser[sid];

    if (user) {
        req.user = user;
        next();
    }
    else {
        
        return res.sendStatus(401)
    }
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    var foundUser;
    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }
    // Create hash using md5, user salt and request password, check if hash matches user hash
    User.findOne({ username: username}).exec().then(user => {
        if (!user.username || !user.salt || !user.hash) {
            return res.sendStatus(401)
        } 
        //foundUser = user;
        const hashedPassword = hash(password, user.salt);
            if (hashedPassword !== user.hash) {
                // Passwords don't match
                return res.sendStatus(401);
            }
            let sid = hashedPassword;
            sessionUser[sid] = user;
        
            // Adding cookie for session id
            res.cookie(cookieKey, sid, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true});
            let msg = {username: user.username, result: 'success'};
            res.send(msg);
    });
}

const hash = function(password, salt) {
    return md5(salt + password);
}

function register(req, res) {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let dob = req.body.dob;
    let phone = req.body.phone;
    let zip = req.body.zip;
    let password = req.body.password;
     

    // supply username and password
    if (!username || !password || !email || !dob || !phone || !zip) {
        return res.sendStatus(400);
    }
    
    let salt = username + new Date().getTime();
    let hashedPass = hash(password, salt);
    new User({username: username, salt: salt, hash: hashedPass}).save();
    new Profile({username: username, password: password, email: email, dob: dob, phone: phone, zipcode: zip, status:"no headline", following: [], avatar:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"}).save();
    let msg = {result: 'success', username: username};
    res.send(msg);
}

function logout(req, res) {
    let sid = req.cookies[cookieKey];
    if (sid) {
        delete sessionUser[sid];
        res.clearCookie(cookieKey);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}


module.exports = (app) => {
    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/logout', logout);
}

module.exports.Profile = Profile;

