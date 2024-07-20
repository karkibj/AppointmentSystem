import mongoose  from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:{type:"String",required:true},
  role: { type: String, enum: ['user', 'doctor', 'patient', 'admin'], default: 'user' },
  lastFivePasswords: [{ type: String }] 
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.lastFivePasswords.push(this.password);

  if (this.lastFivePasswords.length > 5) {
    this.lastFivePasswords.shift(); 
  }

  next();
});

userSchema.pre('find', function (next) {
    this.select('-password -lastFivePasswords');
    next();
  });


  
userSchema.methods.isPasswordCorrect=async (password)=>{
    return bcrypt.compareSync(password,this.password);

}


userSchema.methods.generateAccessToken=async ()=>{
    return jwt.sign({
        _id:this._id,
        role:this.role,
        fullname:this.name,
        email:this.email
    },
    process.env.JWT_SECRET,{
        expiresIn:'7h'
    }
    )
}


userSchema.method.generateRefreshToken=async ()=>{
    return jwt.sign({
        _id:this._id
    },
process.env.JWT_SECRET_REFRESH,
{expiresIn:'7d'})
}


export const User= mongoose.model('User', userSchema);
