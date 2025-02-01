const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res) => {
  let listing=await Listing.findById(req.params.id);
  let newReview=new Review(req.body.review);
  newReview.author=req.user._id; //author of the review is the user who is logged in
  listing.reviews.push(newReview);
 
  await newReview.save(); // to save the changes in database and await is used since it is asynchronous process 
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req,res) => {
  let {id, reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};