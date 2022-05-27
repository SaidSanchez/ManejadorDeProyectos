var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _narrative: String,
  _rol: String,
  _functionality: String,
  _benefit: String,
  _criteria: String,
  _context: String,
  _events: String,
  _results: String,
  _size: Number,
  _priority: Number,
  _validated: Boolean
});

class Card {
  constructor(narrative, rol, functionality, benefit, criteria,
              context, events, results, priority, size, validated) {
    this._narrative = narrative;
    this._rol = rol;
    this._functionality = functionality;
    this._benefit = benefit;
    this._criteria = criteria;
    this._context = context;
    this._events = events;
    this._results = results;
    this._size = size;
    this._priority = priority;
    this._validated = validated;
  }

  set narrative(v) {
    this._narrative = v;
  }
  get narrative() {
    return this._narrative;
  }
  set rol(v) {
    this._rol = v;
  }
  get rol() {
    return this._rol;
  }
  set functionality(v) {
    this._functionality = v;
  }
  get functionality() {
    return this._functionality;
  }
  set benefit(v) {
    this._benefit = v;
  }
  get benefit() {
    return this._benefit;
  }
  set criteria(v) {
    this._criteria = v;
  }
  get criteria() {
    return this._criteria;
  }
  set context(v) {
    this._context = v;
  }
  get context() {
    return this._context;
  }
  set events(v) {
    this._events = v;
  }
  get events() {
    return this._events;
  }

  set results(v) {
    this._results = v;
  }
  get results() {
    return this._results;
  }
  set size(v) {
    this._size = v;
  }
  get size() {
    return this._size;
  }
  set priority(v) {
    this._priority = v;
  }
  get priority() {
    return this._priority;
  }
  set validated(v) {
    this._validated = v;
  }
  get validated() {
    return this._validated ? '👍🏼' : '👎🏼';
  }

}

schema.loadClass(Card);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Card', schema);
