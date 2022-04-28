var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _productBacklog: {
    type: mongoose.ObjectId,
    ref: 'Backlog'
  },
  _releases: [{
    type: mongoose.ObjectId,
    ref: 'Backlog'
  }],
  _sprints: [{
    type: mongoose.ObjectId,
    ref: 'Backlog'
  }]
});

class Board {
  constructor(productBacklog, releases, sprints) {
    this._productBacklog = productBacklog;
    this._releases = releases;
    this._sprints = sprints;
  }

  get productBacklog() {
    return this._productBacklog;
  }

  get releases() {
    return this._releases;
  }

  get sprints() {
    return this._sprints;
  }

  postStory(id) {}
  moveToRelease(id) {}
  moveToSprint(id) {}
  startRelease() {}
  startSprint() {}
}

schema.loadClass(Board);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Board', schema);
