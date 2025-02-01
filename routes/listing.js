const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing= require("../models/listing.js"); //requiring listing model
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js"); //requiring isLoggedIn middleware

const listingController = require("../controllers/listings.js"); //requiring listing controller to use its functions
const multer = require("multer"); //multer is used to upload images in the database
const {storage} = require("../cloudConfig.js"); //requiring storage from cloudConfig.js
const upload = multer({ storage}); //Uploading the images in storage of cloudinary

router //using router to define routes to make sure that we dont define same path twice
.route("/")
.get(  wrapAsync(listingController.index)) //Index Route
.post( //Create Route
  isLoggedIn, //middleware to check if user is logged in
  upload.single("listing[image]") , //uploading the image
  validateListing, // validateListing is middleware which has been defined above
  wrapAsync(listingController.createListing)
);


//New Route // we use this route above otherwise it will be treated as id and error will come
router.get("/new", isLoggedIn, listingController.renderNewForm ); //middleware isLoggedIn is used to check if user is logged in


router.route("/:id")
.get( wrapAsync(listingController.showListing)) //Show Route
.put( //Update Route
  isLoggedIn, //middleware to check if user is logged in
  isOwner, //middleware to check if the user is the owner of the listing
  upload.single("listing[image]") ,
  validateListing,
   wrapAsync (listingController.updateListing))
.delete( 
  isLoggedIn,isOwner, 
  wrapAsync(listingController.destroyListing)); //Delete Route
  

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm)); 

module.exports = router;



// app.get("/testListing", async (req,res) => {
//   let sampleListing= new Listing({
//     title:"My New Villa",
//     description: "By the beach",
//     price:1200,
//     location:"Calangute, Goa",
//     country:"India",
//   });

// await sampleListing.save();
// console.log("Sample was saved");
// res.send("Successful testing");
// });