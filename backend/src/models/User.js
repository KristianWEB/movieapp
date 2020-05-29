const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hash } = require("bcryptjs");

const AdminSchema = new Schema({
  email: { required: true, type: String },
  password: { required: true, type: String },
});

AdminSchema.methods.add = function() {
  return new Promise(resolve => {
    hash(this.password, 10, (err, hash) => {
      if (err) throw err;
      this.password = hash;

      this.save((error, savedObj) => {
        if (error) throw error;
        resolve(savedObj);
      });
    });
  });
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
