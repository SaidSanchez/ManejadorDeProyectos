var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _priority: Number,
  _size: Number,
  _feature: String,
  _validated: Boolean
});

class Priority {
  static LOW = new Priority(0);
  static MEDIUM = new Priority(1);
  static HIGH = new Priority(2);
  constructor(priority) {
    this.priority = priority;
  }
}

class Story {
  constructor(name, priority, size, feature, validated) {
    this._name = name;
    this._priority = priority;
    this._size = size;
    this._feature = feature;
    this._validated = validated;
  }

  get name() {
    return this._name;
  }

  get priority() {
    return this._priority;
  }
  set priority(v) {
    this._priority = v;
  }

  get size() {
    return this._size;
  }
  set size(v) {
    this._size = v;
  }

  get feature() {
    return this._feature;
  }

  get validated() {
    return this._validated ? '👍🏼' : '👎🏼';
  }
  set validated(v) {
    this._validated = v;
  }
}

schema.loadClass(Story);
schema.plugin(mongoosePaginate);
module.exports = {
  Story: mongoose.model('Story', schema),
  Priority: Priority
};
