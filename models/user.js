var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var schema = new mongoose.Schema({
  _name: String,
  _dadLastName: String,
  _momLastName: String,
  _birthday: Date,
  _curp: String,
  _rfc: String,
  _address: String,
  _skills: [{
    type: mongoose.ObjectId,
    ref: 'Skill'
  }],
  _password: String,
  _salt: String
});

class User {
  constructor(name, dadLastName, momLastName, birthday, curp, rfc, address,
    skills, password, salt) {
    this._name = name;
    this._dadLastName = dadLastName;
    this._momLastName = momLastName;
    this._birthday = birthday;
    this._curp = curp;
    this._rfc = rfc;
    this._address = address;
    this._skills = skills;
    this._password = password;
    this._salt = salt;
  }

  get name() {
    return this._name;
  }

  get dadLastName() {
    return this._dadLastName;
  }

  get momLastName() {
    return this._momLastName;
  }

  get birthday() {
    return this._birthday.toDateString();
  }

  get curp() {
    return this._curp;
  }

  get rfc() {
    return this._rfc;
  }

  get address() {
    return this._address;
  }

  get skills() {
    return this._skills;
  }

  get password() {
    return this._password;
  }
  set password(v) {
    this._password = v;
  }

  get salt() {
    return this._salt;
  }

  getFullName() {
    return `${this._name} ${this._dadLastName} ${this._momLastName}`;
  }
  addSkill(id) {}
  removeSkill(id) {}

  authN(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, this.salt, (err, hash) => {
        if(err) reject(err);
        else {
          if(hash != this.password) resolve(null);
          else jwt.sign({
            userId: this.id
          }, 'key', (err, token) => {
            if(err) reject(err);
            else resolve(token);
          });
        }
      });
    });
  }
}

schema.loadClass(User);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', schema);
