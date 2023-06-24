const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //create user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      // save db
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) =>{
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "60s" }
    )
  },
  // GENERATE REFRESH TOKEN
  generateRefreshToken :(user)=>{
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "2d" }
    )
  },
  // login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Wrong username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong Password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user)
        const refreshToken = authController.generateRefreshToken(user)
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path:'/',
          secure: false,
          sameSite: 'strict'
        })
        //k lo bcrypt pass
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      console.log(err);
    }
    
  },
  // refresgh token
  requestRefreshToken: async(req, res)=>{
    // lay refresh token
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json("u r not authenticated")
    if(!refreshToken.includes(refreshToken)){
      return res.status(403).json("Refresh token is not valid")
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err , user)=>{
      if(err){
        console.log(err)
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user)
      refreshTokens.push(newRefreshToken)
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path:'/',
        secure: false,
        sameSite: 'strict'
      })
      res.status(200).json({accessToken: newAccessToken})
    })
  },
  //logout
  userLogout: async(req, res)=>{
    res.clearCookie("refreshToken")
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
    res.status(200).json('logout success')
  }
};
module.exports = authController;
