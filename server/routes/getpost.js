const Tweet = require('../model/tweetScema.js');


const GetPost = async(req,res)=>{
    try {
        const getUser = await Tweet.find();

        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
}

module.exports = GetPost;