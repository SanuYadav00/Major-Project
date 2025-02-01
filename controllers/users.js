const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req,res) => {
  try {
    let {username, email, password} = req.body;
  const newUser = new User({email, username});
  const registeredUser = await User.register(newUser, password); //// registers a new user instance with a given password. Checks if username is unique 
  req.login(registeredUser, (err) => { //passport method which logs in the user automatically
    if(err) {
      return next(err);
    }
  req.flash("success", "Welcome to WanderLust");
  res.redirect("/listings"); 
  });
  }
  catch(e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
  
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login =  async (req,res) => {
  req.flash("success", "Welcome back to Wander Lust!");
  let redirectUrl = res.locals.redirectUrl || "/listings"; //if redirected url is not present, then redirect to /listings
  res.redirect(redirectUrl); //redirects to the url which the user was trying to access but was redirected to login page because he hadnt logged in
};

module.exports.logout = (req, res,next) => {
  req.logout((err) => { //passport method which logs out the user automatically
    if(err) {
      return next(err);
    } 
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};