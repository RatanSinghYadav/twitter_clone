const USER = require('../model/userScema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = "abcdefghijklmnopqrstuvwxyzabcdef";


const Login = async (req,res)=>{
    try {
        const { email, pass } = req.body;

        if (!email || !pass) {
            res.status(400).json({ error: "fill the details" });
        }



        const userlogin = await USER.findOne({ email });

        if (!userlogin) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const match = await bcrypt.compare(String(pass), String(userlogin.pass));


        // console.log(match);



        if (!match) {
            res.status(401).json({ error: "Match Authentication failed" });
        }


        // Genrate JWT Token

        const authToken = await userlogin.genAuthtoken();
        // console.log(authToken);

        res.cookie("AmazonWeb", authToken, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        });
        res.status(201).json(userlogin);
    } catch (error) {
       res.status(401).json("Your Session is expired!");
    }



}

module.exports = Login;
