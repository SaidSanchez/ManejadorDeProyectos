const express = require('express');
const {Skill, Rank} = require('../models/skill');

function list(req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  Skill.paginate({}, {page: page, limit: 10})
  .then(obj => {
    if(obj.docs.length == 0) res.status(204).send();
    else res.status(200).json({
      message: res.__n('models.skill', obj.docs.length),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Skill.findOne({_id: id})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.skill', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function create(req, res, next) {
  const name = req.body.name;
  const rank = eval(`Rank.${req.body.rank}.rank`);
  const skill = new Skill({
    _name: name,
    _rank: rank
  });
  skill.save()
  .then(obj => res.status(201).json({
    message: res.__n('models.skill', 1),
    data: obj
  }))
  .catch(err => res.status(500).json(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const rank = eval(`Rank.${req.body.rank}.rank`);
  const skill = new Object({
    _name: name,
    _rank: rank
  });
  Skill.findOneAndUpdate({_id: id}, skill, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.skill', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  const skill = new Object();
  if(req.body.name) skill._name = req.body.name;
  if(req.body.rank) skill._rank = eval(`Rank.${req.body.rank}.rank`);
  Skill.findOneAndUpdate({_id: id}, skill, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.skill', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Skill.findOneAndDelete({_id: id})
  .then(() => res.status(204).send())
  .catch(err => res.status(500).json(err));
}

module.exports = {list, index, create, replace, edit, destroy};
