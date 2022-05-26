var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _rank: Number
});

class Rank {
  static JUNIOR = new Rank(0);
  static SENIOR = new Rank(1);
  static MASTER = new Rank(2);
  constructor(rank) {
    this.rank = rank;
  }
  static toString(rank) {
    if(rank == 0) return 'junior';
    if(rank == 1) return 'senior';
    if(rank == 2) return 'master';
  }
}

class Skill {
  constructor(name, rank) {
    this._name = name;
    this._rank = rank;
  }

  get name() {
    return this._name;
  }

  get rank() {
    return Rank.toString(this._rank);
  }
}

schema.loadClass(Skill);
schema.plugin(mongoosePaginate);

module.exports = {
  Skill: mongoose.model('Skill', schema),
  Rank: Rank
};
