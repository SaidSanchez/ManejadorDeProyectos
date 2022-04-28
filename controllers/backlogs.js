const express = require('express');
const Backlog = require('../models/backlog');

function list(req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  Backlog.paginate({}, {page: page, limit: 10})
  .then(obj => {
    if(obj.docs.length == 0) res.status(204).send();
    else res.status(200).json({
      message: res.__n('models.backlog', obj.docs.length),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Backlog.findOne({_id: id}).populate('_stories')
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.backlog', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function create(req, res, next) {
  const name = req.body.name;
  const backlog = new Backlog({
    _name: name
  });
  backlog.save()
  .then(obj => res.status(201).json({
    message: res.__n('models.backlog', 1),
    data: obj
  }))
  .catch(err => res.status(500).json(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const backlog = new Object({
    _name: name
  });
  Backlog.findOneAndUpdate({_id: id}, backlog, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.backlog', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  const backlog = new Object();
  if(req.body.name) backlog._name = req.body.name;
  Backlog.findOneAndUpdate({_id: id}, backlog, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.backlog', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Backlog.findOneAndDelete({_id: id})
  .then(() => res.status(204).send())
  .catch(err => res.status(500).json(err));
}

module.exports = {list, index, create, replace, edit, destroy};
