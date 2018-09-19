const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post model
const Post = require('../../models/post');
// Load Profile model
const Profile = require('../../models/Profile');

// Load validation
const validationPostInput = require('../../validation/post');

// @route GET api/posts/test
// @dec Tests post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));


// @route GET api/posts
// @dec Get posts
// @access Public
router.get('/', (req,res) => {

    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noPostFound: 'No posts found' }))
});


// @route GET api/posts/:id
// @dec Get posts by ID
// @access Public
router.get('/:id', (req,res) => {

    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ noPostFound: 'No post found with that ID' }));
});


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
});


// @route DELETE api/posts/:id
// @dec Delete post by ID
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req,res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if(post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notAuthorize: 'User not authorized '});
                    }

                    // Delete
                    post.remove().then(() => res.json({ success: true }));

                }).catch(err => res.status(404).json({ postNotFound: 'No post found' }));
        });
});


module.exports = router;