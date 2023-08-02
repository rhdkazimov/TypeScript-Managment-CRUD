const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema({
    id:String,
    firstName:String,
    lastName:String,
    email:String,
    age :Number,
    password:String,
    roles: String
  });

  module.exports = mongoose.model("users",userSchema)