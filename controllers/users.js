const express = require('express');
const async = require('async');
const bcrypt = require('bcrypt');
const {Types} = require('mongoose');
const User = require('../models/user');

function list(req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  User.paginate({}, {page: page, limit: 10})
  .then(obj => {
    if(obj.docs.length == 0) res.status(204).send();
    else res.status(200).json({
      message: res.__n('models.user', obj.docs.length),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function index(req, res, next) {
  const id = req.params.id;
  User.findOne({_id: id}).populate('_skills')
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.user', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function create(req, res, next) {
  const name = req.body.name;
  const dadLastName = req.body.dadLastName;
  const momLastName = req.body.momLastName;
  const birthday = Date.parse(req.body.birthday);
  const curp = req.body.curp;
  const rfc = req.body.rfc;
  const address = req.body.address;
  const skills = [].concat(req.body.skills || []).map(
    skill => Types.ObjectId(skill)
  );
  const password = req.body.password;
  async.parallel({
    salt: callback => bcrypt.genSalt(10, callback)
  }, (err, result) => {
    bcrypt.hash(password, result.salt, (err, hash) => {
      const user = new User({
        _name: name,
        _dadLastName: dadLastName,
        _momLastName: momLastName,
        _birthday: birthday,
        _curp: curp,
        _rfc: rfc,
        _address: address,
        _skills: skills,
        _password: hash,
        _salt: result.salt
      });
      user.save()
      .then(obj => res.status(201).json({
        message: res.__n('models.user', 1),
        data: obj
      }))
      .catch(err => res.status(500).json(err));
    });
  });
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const dadLastName = req.body.dadLastName;
  const momLastName = req.body.momLastName;
  const birthday = Date.parse(req.body.birthday);
  const curp = req.body.curp;
  const rfc = req.body.rfc;
  const address = req.body.address;
  const skills = [].concat(req.body.skills || []).map(
    skill => Types.ObjectId(skill)
  );
  const user = new Object({
    _name: name,
    _dadLastName: dadLastName,
    _momLastName: momLastName,
    _birthday: birthday,
    _curp: curp,
    _rfc: rfc,
    _address: address,
    _skills: skills
  });
  User.findOneAndUpdate({_id: id}, user, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.user', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  const user = new Object();
  if(req.body.name) user._name = req.body.name;
  if(req.body.dadLastName) user._dadLastName = req.body.dadLastName;
  if(req.body.momLastName) user._momLastName = req.body.momLastName;
  if(req.body.birthday) user._birthday = Date.parse(req.body.birthday);
  if(req.body.curp) user._curp = req.body.curp;
  if(req.body.rfc) user._rfc = req.body.rfc;
  if(req.body.address) user._address = req.body.address;
  if(req.body.skills) user._skills = [].concat(req.body.skills || []).map(
    skill => Types.ObjectId(skill)
  );
  User.findOneAndUpdate({_id: id}, user, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.user', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  User.findOneAndDelete({_id: id})
  .then(() => res.status(204).send())
  .catch(err => res.status(500).json(err));
}

module.exports = {list, index, create, replace, edit, destroy};
