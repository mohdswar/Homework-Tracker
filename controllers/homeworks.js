const express = require('express');

const User = require('../models/user.js');

const home = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('homeworks/index.ejs', { title: 'home page', homeworks: user.homeworks })
}

const newHomework = async (req, res) => {
    res.render('homeworks/new.ejs', { title: 'Add New homework' })
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
        res.render('homeworks/show.ejs', { title: 'Show Homework', homework, owner: homeworkOwner })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

const deleteHomework = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.homeworks.id(req.params.homeworkId).deleteOne();
        await user.save();
        res.redirect(`/users/${req.params.userId}/homeworks`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

const editHomework = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const homework = user.homeworks.id(req.params.homeworkId);
    
    
        console.log(homework)
        res.render('homeworks/edit.ejs', { title: 'Edit this homework', homework })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

const updateHomework = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId);
        if (req.body.completed === "on") {
            req.body.completed = true;
        } else {
            req.body.completed = false;
        }
        const homework = user.homeworks.id(req.params.homeworkId);
        homework.set(req.body);
        await user.save();
        res.redirect(`/users/${req.params.userId}/homeworks/${req.params.homeworkId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

const markAsComplete = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const homework = user.homeworks.id(req.params.homeworkId);
        homework.completed = true;
        await user.save();
        res.redirect(`/users/${req.params.userId}/homeworks/${req.params.homeworkId}`);
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
    deleteHomework,
    editHomework,
    updateHomework,
    markAsComplete,
}