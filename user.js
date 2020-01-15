///email, name, graduated, require name and email. give graduated a default value. 

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email :{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength: 6,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot "password"');
            }
        }
    }
    graduated: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", async function(next) {
    const user = this;
    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 7);
    } 
    next();
});


userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email});
    if (!user){
        throw new Error("unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!match){
        throw new Error("incorrect password");
    }
    return user;
};
//hwhen we send a post or patch request, then 

const User = mongoose.model ("User", userSchema);

module.exports = User;
