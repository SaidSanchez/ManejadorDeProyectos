var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _stories: [{
    type: mongoose.ObjectId,
    ref: 'Story'
  }],
  _burndown: [Number]
});

class Backlog {
  constructor(name, stories, burndown) {
    this._name = name;
    this._stories = stories;
    this._burndown = burndown;
  }

  get name() {
    return this._name;
  }

  get stories() {
    return this._stories;
  }

  get burndown() {
    return this._burndown;
  }

  estimateRemaining() {}
  estimateSpeed() {}
}

schema.loadClass(Backlog);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Backlog', schema);
