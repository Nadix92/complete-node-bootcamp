const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  photo: String,
  role: {
    type: String,
    emit: ["user", "guide", "lead-guide", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must have minimum 8 characters"],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function(el) {
        // This will only work on .save() and .create()
        return el === this.password; // check userSchema.password === current element password aka passwordConfirm
      },
      message: "Passwords are not the same!"
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

// Encryption
userSchema.pre("save", async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash (userSchema.password, 12 rounds)
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password Confirm field
  this.passwordConfirm = undefined;
  next();
});

// This trigger on all query that starts with "find" findAndUpdate ect and so on
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// this.password don't work because it is set to: select: false
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  return false; // false = NOT Changed
};

// Generate the random token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10min from now

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
