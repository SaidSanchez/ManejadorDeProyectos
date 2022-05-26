const express = require('express');
const {Story, Priority} = require('../models/story');

function list(req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  Story.paginate({}, {page: page, limit: 10})
  .then(obj => {
    if(obj.docs.length == 0) res.status(204).send();
    else res.status(200).json({
      message: res.__n('models.story', obj.docs.length),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function index(req, res, next) {
  const id = req.params.id;
  Story.findOne({_id: id})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).render('story/show', {story: obj});
  })
  .catch(err => res.status(500).json(err));
}

function create(req, res, next) {
  const name = req.body.name;
  const priority = eval(`Priority.${req.body.priority}.priority`);
  const size = req.body.size;
  const feature = req.body.feature;
  const story = new Story({
    _name: name,
    _priority: priority,
    _size: size,
    _feature: feature
  });
  story.save()
  .then(obj => res.status(201).json({
    message: res.__n('models.story', 1),
    data: obj
  }))
  .catch(err => res.status(500).json(err));
}

function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const priority = eval(`Priority.${req.body.priority}.priority`);
  const size = req.body.size;
  const feature = req.body.feature;
  const story = new Object({
    _name: name,
    _priority: priority,
    _size: size,
    _feature: feature
  });
  Story.findOneAndUpdate({_id: id}, story, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.story', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function edit(req, res, next) {
  const id = req.params.id;
  const story = new Object();
  if(req.body.name) story._name = req.body.name;
  if(req.body.priority)
    story._priority = eval(`Priority.${req.body.priority}.priority`);
  if(req.body.size) story._size = req.body.size;
  if(req.body.feature) story._feature = req.body.feature;
  Story.findOneAndUpdate({_id: id}, story, {new: true})
  .then(obj => {
    if(obj === null) res.status(404).send();
    else res.status(200).json({
      message: res.__n('models.story', 1),
      data: obj
    });
  })
  .catch(err => res.status(500).json(err));
}

function destroy(req, res, next) {
  const id = req.params.id;
  Story.findOneAndDelete({_id: id})
  .then(() => res.status(204).send())
  .catch(err => res.status(500).json(err));
}

module.exports = {list, index, create, replace, edit, destroy};
