const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load User model
const User = require('../../models/User');


// @route GET api/users/test
// @dec Tests user route
// @access Public
router.get('/test', (req, res) => res.json({msg: "User works"}));


// @route GET api/users/register
// @dec Register user
// @access Public
router.post('/register', (req,res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({ email: 'Email already exists' });
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                    })
                })
            }
        })
})


// @route GET api/users/login
// @dec Login user - Return JWT token
// @access Public
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user my email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if(!user) {
                return res.status(404).json({ email: 'Email or password not valid'})
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User match

                        const payload = { // Create JWT payload
                            id: user.id, 
                            name: user.name, 
                            avatar: user.avatar 
                        }

                        // Sign Token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });

                    } else {
                        return res.status(400).json({ password: 'Email or password not valid' })
                    }
                });
        });
});



module.exports = router;