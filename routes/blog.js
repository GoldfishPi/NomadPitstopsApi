const express = require('express');
const router = express.Router();
const model = require('./../models/blog');
const moment = require('moment');
const fs = require('fs');

const marked = require('marked');
const renderer = new marked.Renderer();
const base64Img = require('base64-img');
const jsdom = require('jsdom');

const access = require('../middleware/access');

//routes
router.post('/', access.ADMIN, addPost);
router.get('/', getPosts);
router.post('/:id', access.ADMIN, updatePost);
router.get('/:id', getPost);

function addPost(req, res, next) {
    model.findOne({ id: req.body.id }, (err, post) => {
        if (post) {
            return res.json({
                msg: `Blog post already exists under id "${req.body.id}"`
            });
        }
        const blog = new model({
            id: req.body.id,
            name: req.body.name,
            title: req.body.title,
            body: req.body.body,
            dateCreated: moment().unix(),
            snippet: req.body.snippet,
            thumbnail: req.body.thumbnail
        });
        blog.save().then(model => {
            if (!model.errors) {
                res.json({ success: true, msg: 'Blog Post Added!' });
            } else {
                res.json({
                    success: false,
                    msg: 'Failed to add blog post'
                });
            }
        });
    });
}

function getPosts(req, res, next) {
    model.find({}, function(err, posts) {
        res.json({
            posts: posts.map(post => {
                return {
                    id: post.id,
                    name: post.name,
                    title: post.title,
                    dateCreated: post.dateCreated,
                    snippet: post.snippet,
                    thumbnail: post.thumbnail
                };
            })
        });
    });
}
function updatePost(req, res) {
    model.findOneAndUpdate(
        { id: String(req.params.id) },
        req.body,
        { upsert: true },
        (err, post) => {
            if (err) {
                return res.json({ err, err, success: false });
            }
            res.json({ err, err, success: true });
        }
    );
}
function getPost(req, res, next) {
    model.findOne({ id: String(req.params.id) }, (err, post) => {
        if (err || !post) {
            return res.json({ err: true });
        }
        // post = post[0];
        res.json({
            id: post.id,
            name: post.name,
            title: post.title,
            body: post.body,
            dateCreated: post.dateCreated,
            snippet: post.snippet,
            thumbnail: post.thumbnail
        });
    });
}

module.exports = router;
