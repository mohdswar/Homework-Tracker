const express = require('express');

const User = require('../models/user.js');

const home = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('homeworks/index.ejs', { title: 'My App', homeworks: user.homeworks })
}

const newHomework = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('homeworks/new.ejs', { title: 'My App' })
}

const createHomework = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        req.body.user = req.params.userId;
        user.homeworks.push(req.body);
        await user.save();
        res.redirect(`/users/${req.params.userId}/homeworks`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

const showHomework = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const homework = user.homeworks.id(req.params.homeworkId);
        const homeworkOwner = await User.findById(homework.user);
        res.render('homeworks/show.ejs', { title: 'My App', homework, owner: homeworkOwner })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}


module.exports = {
    home,
    newHomework,
    createHomework,
    showHomework,
}