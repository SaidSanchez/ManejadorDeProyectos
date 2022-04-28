const express = require('express');
const Board = require('../models/board');
const Backlog = require('../models/backlog');

function list(req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  Board.paginate({}, {page: page, limit: 10})
  .then(obj => {
    if(obj.docs.length == 0) res.status(204).send();
    else res.status(200).json({
      message: res.__n('models.board', obj.docs.length),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Board.findOne({_id: id}).populate('_productBacklog')
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.board', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function create(req, res, next) {
  const productBacklog = new Backlog({
    _name: 'Product Backlog'
  });
  productBacklog.save()
  .then(obj => {
    const board = new Board({
      _productBacklog: obj.id
    });
    board.save()
    .then(obj => res.status(201).json({
      message: res.__n('models.board', 1),
      data: obj
    }))
    .catch(err => res.status(500).json(err));
  })
  .catch(err => res.status(500).json(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  const board = new Object();
  Board.findOneAndUpdate({_id: id}, board, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.board', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  const board = new Object();
  Board.findOneAndUpdate({_id: id}, board, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.board', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Board.findOneAndDelete({_id: id})
  .then(() => res.status(204).send())
  .catch(err => res.status(500).json(err));
}

module.exports = {list, index, create, replace, edit, destroy};
