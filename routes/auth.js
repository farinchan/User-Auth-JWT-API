const router = require("express").Router()
const User = require("../model/user")
const validation = require("../validation")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



router.post('/register', async (req, res) => {

    //validation Data Check Before create new user
    const validationError = validation.registerValidation(req.body).error

    // check if email is already in databases
    const emailExist = await User.findOne({ email: req.body.email })

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashingPassword = await bcrypt.hash(req.body.password, salt)

    if (validationError) {
        res.status(400).json({ message: validationError.details[0].message })
    } else {
        if (emailExist) {
            res.status(400).json({ message: "Email already use" })
        } else {
            //Register
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashingPassword
            })
            try {
                //Create new user on DB
                const saveduser = await user.save()
                res.send(saveduser);

            } catch (error) {
                res.status(400).send(error)
            }
        }
    }
});

router.post('/login', async (req, res) => {

    //validation Data Check Before create new user
    const validationError = validation.loginValidation(req.body).error
    if (validationError) return res.status(400).json({ message: validationError.details[0].message })

    // check user with email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: "Email or password wrong!" })
    //check password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({ message: "Email or password wrong!" })
    
    //create an assign a token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET)
    res.header("auth-token", token)

    res.json({
        messsage: "loggedd In ",
        token : token,
        name: user.name,
        email: user.email
    });
});

module.exports = router