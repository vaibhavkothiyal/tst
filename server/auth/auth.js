const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

const newToken=async(user)=>{
    return await jwt.sign({_id:user._id},process.env.SECRET_KEY)
}

register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ error: "user not found" });

        const match = await user.checkPassword(req.body.password);
        let token=newToken(user)
        console.log(token)
        if (!match) {
            return res.status(401).send("user not found")
        }
        res.status(200).send({stats:"success",token})

    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = { register, login }