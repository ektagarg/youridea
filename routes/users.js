const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//user login route
router.get('/login',(req,res) => {
    res.render("users/login");
})

//user register route
router.get('/register',(req,res) => {
    res.render("users/register");
})

//register form post
router.post('/register', (req,res) => {
    let errors = [];
    if(req.body.password != req.body.password2){
        errors.push({text : "Passwords do not match!"})
    }
    if(req.body.password.length < 4){
        errors.push({text : "Passwords must have atleast 4 characters"})
    }

    if(errors.length > 0){
        res.render('users/register',{
            errors : errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
    }else{
        const newuser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newuser.password, salt, (err, hash) => {
                // Store hash in your password DB.
                if(error) throw error;
                newuser.password = hash;
            });
        });
    }
})

module.exports = router;