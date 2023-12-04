import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";
// const secretKey = process.env.JWT_SECRET || 'fallbackSecretKey';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, provide a valid name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please, provide a valid lastName"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please, provide a valid email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please, provide a valid email",
    },
  },
  pwd: {
    type: String,
    required: [true, "Please, provide a valid password"],
    minlength: 6,
    select: false,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please, provide a valid phone number"],
    minlength: 9,
  },
  isAdmin: {
    type: Boolean,
    default: true,
    required: [false],
  },
  bio: {
    type: String,
    required: [false],
  },
  savedPets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Pet",
      required: [false],
    },
  ],
  ownedPets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Pet",
      required: [false],
    },
  ],
});

// const generateToken = id => {
//   return jwt.sign({ id }, "anykey", { expiresIn: "10d" });
// };

// userSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id }, '45bffcf39e2d9d6b7a6d3c5d53a7e64a5d263c1a04341277472b8581dac5863d', {
//     expiresIn: '1h'
//   });
// };

// userSchema.methods.createJWT = function () {
//   return jwt.sign({ userId: this._id }, "anykey", {
//     expiresIn: '1h'
//   });
// };

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default mongoose.model("User", userSchema);
