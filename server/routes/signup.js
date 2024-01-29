const register = require('../model/userScema.js');

async function Register(req, res) {
    const { name, email, uname, pass } = req.body;
    
    if (!name || !email || !uname || !pass) {
        res.status(402).json({ error: "fill the all details" })
        console.log("fill the all details");
    }

    try {
        const preuser = await register.findOne({ email: email })

        if (preuser) {
            res.status(402).json({ erorr: "This email is already exist" })
        } else {
            const finaluser = new register({ name, email, uname, pass })

            const storedata = await finaluser.save();
            // console.log(storedata);
            res.status(201).json(storedata)

        }


    } catch (error) {
        console.log("error found" + error.message);
        res.status(422).send(error);
    }
}

module.exports = Register