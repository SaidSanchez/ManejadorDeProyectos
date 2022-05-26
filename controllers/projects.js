const express = require('express');
const {Types} = require('mongoose');
const Project = require('../models/project');
const Board = require('../models/board');
const Backlog = require('../models/backlog');

function list(req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  Project.paginate({}, {page: page, limit: 10})
  .then(obj => {
    if(obj.docs.length == 0) res.status(204).send();
    else res.status(200).json({
      message: res.__n('models.project', obj.docs.length),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Project.findOne({_id: id}).populate('_productOwner').populate('_scrumMaster')
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).render('project/show', {project: obj});
  })
  .catch(err => res.status(500).json(err));
}

function create(req, res, next) {
  const name = req.body.name;
  const requestDate = req.body.requestDate;
  const startDate = req.body.startDate;
  const description = req.body.description;
  const productOwner = Types.ObjectId(req.body.productOwner);
  const scrumMaster = Types.ObjectId(req.body.scrumMaster);
  const team = [].concat(req.body.team || []).map(
    member => Types.ObjectId(member)
  );
  const productBacklog = new Backlog({
    _name: 'Product Backlog'
  });
  productBacklog.save()
  .then(obj => {
    const board = new Board({
      _productBacklog: obj.id
    });
    board.save()
    .then(obj => {
      const project = new Project({
        _name: name,
        _requestDate: requestDate,
        _startDate: startDate,
        _description: description,
        _productOwner: productOwner,
        _scrumMaster: scrumMaster,
        _team: team,
        _board: obj.id
      });
      project.save()
      .then(obj => res.status(201).json({
        message: res.__n('models.project', 1),
        data: obj
      }))
      .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
  })
  .catch(err => res.status(500).json(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const requestDate = req.body.requestDate;
  const startDate = req.body.startDate;
  const description = req.body.description;
  const productOwner = Types.ObjectId(req.body.productOwner);
  const scrumMaster = Types.ObjectId(req.body.scrumMaster);
  const team = [].concat(req.body.team || []).map(
    member => Types.ObjectId(member)
  );
  const project = new Object({
    _name: name,
    _requestDate: requestDate,
    _startDate: startDate,
    _description: description,
    _productOwner: productOwner,
    _scrumMaster: scrumMaster,
    _team: team
  });
  Project.findOneAndUpdate({_id: id}, project, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.project', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  const project = new Object();
  if(req.body.name) project._name = req.body.name;
  if(req.body.requestDate) project._requestDate = req.body.requestDate;
  if(req.body.startDate) project._startDate = req.body.startDate;
  if(req.body.description) project._description = req.body.description;
  if(req.body.productOwner)
    project._productOwner = Types.ObjectId(req.body.productOwner);
  if(req.body.scrumMaster)
    project._scrumMaster = Types.ObjectId(req.body.scrumMaster);
  if(req.body.team) project._team = [].concat(req.body.team || []).map(
    member => Types.ObjectId(member)
  );
  Project.findOneAndUpdate({_id: id}, project, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.project', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Project.findOneAndDelete({_id: id})
  .then(() => res.status(204).send())
  .catch(err => res.status(500).json(err));
}

module.exports = {list, index, create, replace, edit, destroy};
