const express = require('express');
const User = require('../models/user');

function index(req, res, next) {
  res.render('index', { title: 'Express' });
}

function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({_email: email})
  .then(obj => {
    obj.authN(password)
    .then(obj => {
      if(obj === null) res.status(401).send();
      else res.status(200).json({
        token: obj
      });
    })
    .catch(err => res.status(500).json(err));
  })
  .catch(err => res.status(500).json(err));
}

module.exports = {index, login};
