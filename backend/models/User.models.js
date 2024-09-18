import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import ApiError from '../utils/ApiError.js'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['user', 'doctor', 'patient', 'admin'], default: 'user' },
  lastFivePasswords: [{ type: String }],
  profilePicture:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"

  }
});

userSchema.methods.isPasswordInHistory = async function(newPassword) {
  for (let oldPassword of this.lastFivePasswords) {
    const isMatch = await bcrypt.compare(newPassword, oldPassword);
    if (isMatch) {
      return true;
    }
  }
  return false;
};

userSchema.pre('save', 
  async function(next) {
  if (!this.isModified('password')) return next();

  const isPasswordUsed = await this.isPasswordInHistory(this.password);
  if (isPasswordUsed) {
    throw new ApiError(401,"You cannot use last 5 passwords ")
  }

  this.password = await bcrypt.hash(this.password, 10);

  this.lastFivePasswords.push(this.password);
  if (this.lastFivePasswords.length > 5) {
    this.lastFivePasswords.shift();
  }

  next();
});

// Correct pre 'find' hook to exclude sensitive fields
userSchema.pre('find', function (next) {
  this.select('-password -lastFivePasswords'); // Exclude fields
  next();
});
userSchema.pre('find', function (next) {
  this.select('name email phone role'); // Include specific fields only
  next();
});


userSchema.methods.isPasswordCorrect = async function(password) {
  return bcrypt.compare(password, this.password);
};


// Regular function for proper `this` context
userSchema.methods.generateAccessToken = function() {
  return jwt.sign({
    _id: this._id,
    role: this.role,
    fullname: this.name,
    email: this.email
  },
  process.env.JWT_SECRET, {
    expiresIn: '7h'
  });
};

// Regular function for proper `this` context
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign({
    _id: this._id
  },
  process.env.JWT_SECRET_REFRESH, {
    expiresIn: '7d'
  });
};

userSchema.methods.generateResetToken=()=>{
  return jwt.sign({
    _id:this._id
  },
process.env.JWT_SECRET_RESET,{
  expiresIn:'2h'
})
}


export const User = mongoose.model('User', userSchema);
