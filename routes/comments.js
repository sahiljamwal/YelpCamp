var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware");



//Comment NEW Route
router.get("/new", middleware.isLoggedIn ,function(req,res){

	Campground.findById(req.params.id,function(error,campground){
		res.render("comments/new",{campground:campground});
	});
});


//Comment CREATE Route
router.post("/" , middleware.isLoggedIn , function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id,function(error,campground){
		if(error){
			console.log(error);
			res.redirect("/campgrounds");
		}else{
			//create a new comment
			Comment.create(req.body.comment,function(error,comment){
				if(error){
					req.flash("error", "Something went wrong");
				}else{
					//add username to comment
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					//save comment
					comment.save();
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();

					//redirect to campground show page
					req.flash("success", "Successfully added comment");
					res.redirect("/campgrounds/"+req.params.id);
				}
			})
		}
	});
});

//EDIT COMMENT Route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(error,foundComment){
		if(error || !foundComment){
			req.flash("error","Comment not Found!");
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id , comment:foundComment } );
		}
	});
});


//UPDATE COMMENT Route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(error,updateComment){
		if(error){
			res.redirect("/campgrounds/"+req.params.id);
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DELETE COMMENT Route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(error){
		if(error){
			res.redirect("/campgrounds/"+req.params.id);
		}else{
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;
