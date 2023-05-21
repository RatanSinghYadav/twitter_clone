const { Router } = require('express');
const Register = require('./signup');
const Login = require('./login');
const route = Router();
const multer = require("multer");
const Tweet = require('../model/tweetScema.js');
const GetPost = require('./getpost');
const authenticate = require('../middleware/authenticate');
const ProfilePic = require('../model/profileScema');
const userSchema = require('../model/userScema.js');

route.post('/signup', Register);
route.post('/login', Login);
route.get('/getpost', GetPost);


// img storage path
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/")
    },
    filename: (req, file, callback) => {
        const date = new Date().toISOString().replace(/:/g, '-');
        callback(null, `${date}-${file.originalname}`);
    }
})


const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true)
        } else {
            callback(new Error("only images is allowd"))
        }
    }
});

route.post("/profilePic/${id}", upload.single('file'), async (req, res) => {

    try {
        const user = req.params; // assuming you've set up authentication middleware that sets req.user
        const imagePath = req.file.path;
        const profilePic = new ProfilePic({ user: user._id, imagePath: imagePath });
        await profilePic.save();
        res.status(201).json(profilePic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

})

route.post('/post', upload.single('file'), async (req, res) => {
    const { author, content } = req.body;

    const { filename } = req.file;

    try {
        const tweet = new Tweet({
            author: author,
            content: content,
            media: filename,
        });
        userTweet = await tweet.save();
        res.status(201).json(userTweet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// for userlogout

route.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("twitterUser", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});


module.exports = route;




