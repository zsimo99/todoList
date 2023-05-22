const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [isEmail, "please enter a valide eamil"],
    required: [true, "please enter ur email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter ur password"],
    minlength: [6, "min password length is 6 chararcters"],
  },
  name: {
    type: String,
    required: [true, "please enter ur full name"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password,next) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
      throw new Error("incorrect password");
  }
    throw new Error("incorrect email");
};

module.exports = mongoose.model("User", userSchema);
