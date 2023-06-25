const User = require("../models/User")
const jwt = require("jsonwebtoken")

// handle errors
const handleError = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''}

    // Duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered'
        return errors
    }

    // Validate error
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// jwt
const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'ehma secret', {
        expiresIn: maxAge,
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id});

    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({errors})
    }
    
}

module.exports.login_post = (req, res) => {
    const {email, password} = req.body

    console.log(`email: ${email}, password: ${password}`)
    res.send('new login')
}