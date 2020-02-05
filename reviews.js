const express = require("express");
const Review = require("../models/review");
const router = new express.Router();
const auth = require("../middleware/auth");


router.post("/reviews", auth,async (req, res) => {
  const  review = new Review({
    ...req.body,
    owner: req.user._id
  });
    try {
      await review.save();
      res.send(review);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.get("/reviews", async (req, res) => {
    try{
      let reviews = await Review.find({});
      res.send(reviews);
    }catch (error){
      res.status(500).send(error);
    }
  });
  router.get("reviews/me", auth, async (req,res) => {
    try{
      await req.user.populate("reviews").execPopulate();
      res.send(req.user.reviews);
    }catch(error){
      res.send(error);
    }
  });

  router.get("reviews/me", auth, async(req, res) => {
    try{
      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);
      await req.user
       .populate({
         path: "reviews",
         options: {
          limit: parseInt(limit),
          skip: parseInt(skip)
          }
        })
      .execPopulate();
    }catch(error){
      res.send(error);
    }
  });
    
  router.get("/reviews/:id", async (req, res) => {
    try{
      let reviews = await Review.findById(req.params.id);
      res.send(reviews);
    }catch (error){
      res.status(500).send(error);
    }
  });

  router.get("reviews/:id", async (req, res) => {
    const movie = req.params.id;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort= parseInt(req.query.sort);
    try{
      let reviews = await Review.find({movie: movie}).skip(skip).limit(limit)
      .sort({ createdAt: sort });
      res.send(reviews);
    } catch (error){
      res.status(500).send(error);
    }
  });

  
  router.delete("/reviews/:id", auth, async (req, res)=>{
    try{
      const review = await Review.findByIdAndDelete(req.params.id);
      res.send(review);
    }catch{
      res.status(500).send(error);
    }
  });
  
  router.patch("/reviews/:id", auth, async (req, res) => {
    
    const updates= Object.keys(req.body);
    const allowedUpdates = ["reviewScore", "reviewText"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      res
        .status(400)
        .send({ error: "Invalid Updates, please only update the review" });
    }
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!review) {
        return res.status(404).send();
      }
      res.send(review);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
 module.exports = router;
  