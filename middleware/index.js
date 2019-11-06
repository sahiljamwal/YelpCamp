var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

//this will contain all middle ware as objects
var middlewareObject ={};


middlewareObject.isLoggedIn=function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error","Please Login First!!!");
  res.redirect("/login");
}

middlewareObject.checkCampgroundOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(error,foundCampground){
      if(error || !foundCampground){
        req.flash("error", "Campground not found");
        res.redirect("back");
      }else{
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        }else{
           req.flash("error", "You don't have permission to do that");  
           res.redirect("back");
        }
      }
    });
  }
  else{
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObject.checkCommentOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(error,foundComment){
      if(error){
        res.redirect("back");
      }else{
        if(foundComment.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  }
  else{
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}


module.exports=middlewareObject;
