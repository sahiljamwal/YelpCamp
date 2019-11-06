var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");//it willby default take index.js



//INDEX - show all campgrounds
router.get("/",function(req,res){
	Campground.find({},function(error,allCamps){
		if(error)
			console.log(error);
		else{
			res.render("campgrounds/index",{campgrounds:allCamps,currentUser:req.user,page: 'campgrounds'});
		}
	});
});



//CREATE - add new campground to DB
router.post("/",middleware.isLoggedIn,function(req,res){
	//fetch the form data and add it to campgrounds array
	var campName=req.body.name;
	var image=req.body.imageurl;
	var desc=req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	};
	var CampgroundObject={name:campName,image:image,description:desc,author:author};
	//campgrounds.push(imageObject);
	//add new Campground to DB
	Campground.create(CampgroundObject,function(error,newCamp){
		if (error) {
			console.log(error);
		}
		else{
			//redirect to suitable page
			res.redirect("/campgrounds");
		}
	});

});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});


// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
        if(error || !foundCampground){
            req.flash("error", "Campground not found");
        	res.redirect("back");	
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campgrounds: foundCampground});
        }
    });
})

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(error,foundCampground){
		if(error){
			console.log(error);
		}else {
			res.render("campgrounds/edit",{campground:foundCampground});
		}
	});
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find campground by id and update
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(error,updatedCampGround){
		if(error){
			res.redirect("/campgrounds");
		}else{
			//if update successfull redirect somewhere
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

// DELETE CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(error){
		if(error){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
