const mongoose  = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Access_token_key = process.env.accessKey
const Refresh_token_key = process.env.refreshKey

const userSchema = new mongoose.Schema({
    uname : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('not valid email')
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    cpassword : {
        type : String,
        required : true,
        minlength : 6
    },
    mobile : {
        type : Number,
        required : true,
        maxlength : 11,
        unique : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    refreshTokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    carts : Array,
    resetPasswordToken : String,
    resetPasswordExpire : Date

});

userSchema.pre("save", async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

userSchema.methods.generateToken = async function (){
    try {
        let AccessToken = jwt.sign({_id: this._id}, Access_token_key, {expiresIn : '1h'})
        let RefreshToken = jwt.sign({_id: this._id}, Refresh_token_key, {expiresIn : '7d'})
        this.refreshTokens = this.refreshTokens.concat({token : RefreshToken})
        await this.save()
        return {AccessToken, RefreshToken}
        
    } catch (error) {
        console.log(error)
    }
};


userSchema.methods.addToCart = async function (cart) {
    try {
        this.carts = await this.carts.concat(cart);
        await this.save();
        return this.carts
    } catch (error) {
        
    }
}
        

const USER = new mongoose.model("USER", userSchema);
module.exports = USER;


