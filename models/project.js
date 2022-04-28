var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _requestDate: Date,
  _startDate: Date,
  _description: String,
  _productOwner: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  _scrumMaster: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  _team: [{
    type: mongoose.ObjectId,
    ref: 'User'
  }],
  _board: {
    type: mongoose.ObjectId,
    ref: 'Board'
  }
});

class Project {
  constructor(name, requestDate, startDate, description, productOwner,
    scrumMaster, team, board) {
      this._name = name;
      this._requestDate = requestDate;
      this._startDate = startDate;
      this._description = description;
      this._productOwner = productOwner;
      this._scrumMaster = scrumMaster;
      this._team = team;
      this._board = board;
    }

  get name() {
    return this._name;
  }

  get requestDate() {
    return this._requestDate;
  }

  get startDate() {
    return this._startDate;
  }

  get description() {
    return this._description;
  }

  get productOwner() {
    return this._productOwner;
  }

  get scrumMaster() {
    return this._scrumMaster;
  }

  get team() {
    return this._team;
  }

  get board() {
    return this._board;
  }

  callDailyScrum() {}
}

schema.loadClass(Project);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Project', schema);
