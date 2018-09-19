const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post model
const Post = require('../../models/post');

// Load validation
const validationPostInput = require('../../validation/post');

// @route GET api/posts/test
// @dec Tests post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));


// @route POST api/posts
// @dec Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {

    const { errors, isValid } = validationPostInput(req.body);

    // Check validation
    if(!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
})


module.exports = router;