const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  firstname: { type: String, minlength: 4, require: true },
  lastname: { type: String, minlength: 4, require: true },
  email: { type: String, unique: true, match: /.+@.+\..+/ },
  password: { type: String, require: true },
  image: { type: String, require: true },
  isAdmin:{type: Boolean,default: false},
  token: { type: String },
});

const usermodel = mongoose.model("users", userschema);

module.exports = usermodel;
