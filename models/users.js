const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  firstname: { type: String, minlength: 3, require: true,maxlength:15 },
  lastname: { type: String, minlength: 3, require: true,maxlength:15 },
  email: { type: String, unique: true, match: /.+@.+\..+/ },
  password: { type: String, require: true },
  image: { type: String},
  isAdmin: { type: Boolean, default: false },
  token: { type: String },
});

const usermodel = mongoose.model("users", userschema);

module.exports = usermodel;
