const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();

// load schema
require('../model/Ideas');
const Idea = mongoose.model('ideas');

//ideas index page
router.get('/', (req, res) => {
    Idea.find({}).sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        })

});


//ideas page
router.post('/', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please add a title!' });
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add some details!' });
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(
                Idea => { res.redirect('/ideas') }
            )
    }
});

//Add idea page
router.get('/add', (req, res) => {
    req.flash('success_msg','Your idea added.');
    res.render('ideas/add');
});

//Edit idea page
router.get('/edit/:id', (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(idea => {
            req.flash('success_msg','Your idea updated.');
            res.render('ideas/edit', {
                idea: idea
            });
        })
});

//update idea page process
router.put('/:id', (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(idea => {
            idea.title = req.body.title;
            idea.details = req.body.details;
            console.log(idea)
            idea.save()
                .then(idea => {
                    res.redirect('/ideas');
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
        
});

//delete idea
router.delete('/:id', (req,res) =>{
    Idea.deleteOne({_id:req.params.id})
    .then(() => {
        req.flash('success_msg','Your idea removed.');
        res.redirect('/ideas');
    })
})

module.exports = router;