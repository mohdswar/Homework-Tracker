const express = require('express');

const User = require('../models/user.js');

const home = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('homeworks/index.ejs', { title: 'My App' })
}

const newHomework = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('homeworks/new.ejs', { title: 'My App' })
}

const createHomework = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.homeworks.push(req.body);
        await user.save();
        res.redirect(`/users/${req.params.userId}/homeworks`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}
module.exports = {
    home,
    newHomework,
    createHomework,
}