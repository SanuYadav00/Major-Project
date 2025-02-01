const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js"); //middleware to save the redirected url in locals so that it can be accessed in other routes as it is not deleted like data in sessions

const userController = require("../controllers/users.js");

router.route("/signup")
.get( userController.renderSignupForm)
.post( wrapAsync(userController.signup));

router.route("/login")
.get( userController.renderLoginForm)
.post(
  saveRedirectUrl, //middleware to save the redirected url in locals so that it can be accessed in other routes as it is not deleted like data in sessions 
  passport.authenticate("local", //it is a middleware which checks if the login credentials are accurate
    {failureRedirect: '/login',
       failureFlash:true
      }),
      userController.login
       );

  router.get("/logout",userController.logout);  

module.exports = router;


// app.get("/demouser", async (req,res) => {
//   let fakeUser = new User({
//     email:"student@gmail.com",
//     username:"delta-student",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld"); // helloworld is password and fakeUser is user
//   // registers a new user instance with a given password. Checks if username is unique
//   res.send(registeredUser); //user is registered with username, email, password and salt
// });
