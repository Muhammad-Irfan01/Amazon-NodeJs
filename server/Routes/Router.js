const express = require('express');
const Products = require('../Models/ProductSchema');
const USER = require ('../Models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Router = new express.Router();
const authenticate = require('../Middleware/Authentication');
const crypto = require('crypto');
const sendEmail = require('../utils/SendEmail')
const key = process.env.KEY;


// Routes
Router.get('/getproducts', async(req, res) =>{
    try {
        const AllProducts = await Products.find();
        console.log(AllProducts);
        
        res.status(201).json(AllProducts);
    } catch (error) {
        res.status(400).json(error);
    }
});

Router.get('/getproductone/:id', async(req, res) =>{

    try {
        const {id} = req.params
     
        const singleData = await Products.findOne({id:id});
      
        res.status(200).json(singleData);
    } catch (error) {
        res.status(400).json(error);
    }
})


Router.post('/register', async(req, res) =>{
    const {uname, email, password, cpassword, mobile} = req.body;

    if(!uname || !email || !password || !cpassword || !mobile){
        res.status(400).json({error: 'Fill all fields'});
        console.log('Something is missing');
    };

    try {
        const chkEmail = await USER.findOne({email:email});
        if(chkEmail){
            res.status(400).json({error: 'User already exist'});
        }else if(password !== cpassword){
            res.status(400).json({error: 'Password do not match'})
        }else {
            const newUser = new USER({uname, email, password, cpassword, mobile});
            
            const storeUserData = await newUser.save();
            res.status(200).json(storeUserData);
        }
        
    } catch (error) {
        res.status(400).send({error : 'something wrong'})
        console.log(error.message)
    }
})


Router.post('/login', async(req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({error: 'Fill Data'});
    }

    try {
        const chkLogin = await USER.findOne({email});
        console.log(chkLogin);
        if(chkLogin){
            const chkPassword = await bcrypt.compare(password, chkLogin.password);

            if(!chkPassword){
                res.status(400).json({error: 'Invalid Password'})
            }else{
                const {AccessToken, RefreshToken} = await chkLogin.generateToken();

                res.status(200).json({message: 'Login Successful', AccessToken, RefreshToken});
            }
        }else{
            res.status(400).json({error: 'Invalid Email'})
        }

    } catch (error) {
        res.status(400).json({error: 'Invalid Details'});
    }
})
    

  Router.post('/addcart/:id', authenticate, async(req, res) =>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id});
        if(!cart) return res.status(404).json({error : 'product not found'})

        const User = req.user;
        
        if(User){
            const cartData = await User.addToCart(cart);
            await User.save();
            console.log(cartData);
            res.status(200).json(User)
        }else{  
            res.status(400).json({error : 'Invalid user'});
        }
        
    } catch (error) {
        res.status(400).json({error : 'Invalid data'});
    }
  })  
     
  
  Router.get('/checkout', authenticate, async(req, res) =>{
    try {
        const buyer = await USER.findOne({_id:req.userID});
        res.status(200).json(buyer);
    } catch (error) {
        res.status(400).json(error + "error");
    }
  })


  Router.get('/validuser', authenticate, async(req, res) =>{
    try {
        const validateUser = await USER.findOne({_id:req.userID});
        res.status(200).json(validateUser);
    } catch (error) {
        res.status(400).json(error + "error");
    }
  })


  Router.delete('/remove/:id', authenticate, async(req, res) =>{
    try {
        const {id} = req.params;

         req.compareID.cart = req.compareID.cart.filter((currentValue) =>{
            return currentValue.id != id
        });
        req.compareID.save();
        res.status(200).json(req.compareID);
    } catch (error) {
        res.status(400).json(req.compareID);
    }
  })

  Router.post('/change-password', authenticate, async(req, res) =>{
   try {
    const {oldPassword, newPassword} = req.body;
    
    const compareId = await USER.findOne({_id : req.user.id});
    if(!compareId) return res.status(401).json({error : 'invalid user'});

    const isMatch = await bcrypt.compare(oldPassword, compareId.password);
    if(!isMatch) return res.status(401).json({error : 'old password did not match'});
    
    compareId.password = newPassword
    await compareId.save(); 	
    res.status(200).json({message : 'password update successfully'});
    console.log(compareId.password);
    
   } catch (error) {
    res.status(400).json({error : 'error to update password'});
   }
  })

  Router.post('/forgot-password', async(req, res) =>{
        const {email} = req.body
    try {
       if(!email) return console.log('email required');
       const user = await USER.findOne({email})
       if(!user){
        return res.status(400).json({message : 'user not found'})
       }

       const resetToken = crypto.randomBytes(20).toString('hex');
       const resetExpire = Date.now() + 3600000;

       user.resetPasswordToken = resetToken
       user.resetPasswordExpire = resetExpire
       await user.save();

       const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
       await sendEmail({
        to : user.email,
        subject : 'password reset request',
        text : `click here to reset password ${resetUrl}` 
       })

       res.status(200).json({message : 'reset link send'})
    } catch (error) {
        res.status(400).json({message : 'error send link'})
    }
  })

  Router.post('/reset-password/:token', async(req, res) =>{
    try {
        const user  = await USER.findOne({
            resetPasswordToken : req.body.token,
            resetPasswordExpire : {$gt : Date.now()}
        })
        if(!user) return res.status(400).json('invalid Token')

        user.password = await bcrypt.hash(req.body.password, 12);
        resetPasswordToken = undefined;
        resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json('password reset successfully')
    } catch (error) {
        res.status(400).json('fail to reset password')
    }
  })

  Router.get('/logout', authenticate, async(req,res) =>{
      try {
        const refreshToken = req.headers['refresh-token'];
        if(!refreshToken){
            return res.status(401).json({error : 'refresh token required'})
        }
        req.user.tokens = req.user.tokens.filter((currElem) =>{
            return currElem.token !== req.token
        })

        req.user.refreshTokens = req.user.refreshTokens.filter((currElem) =>{

            return currElem.token !== req.body.refreshToken;
        }) 

        res.clearCookie('Amazonweb',{path : '/'});
        req.user.save();
        res.status(200).json(req.user.token);
        console.log("User Logout");
        
    } catch (error) {
        console.log("Error for logout");
        
    }
  })
  
module.exports = Router;