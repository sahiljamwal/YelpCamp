var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/",function(req,res){
	res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//REGISTRATION logic
router.post("/register",function(req,res){
	var userNew = new User({username:req.body.username});
	User.register(userNew,req.body.password,function(error,user){
		if(error){
			//req.flash("error", error.message);
			console.log(error);
			return res.render("register",{error:error.message});
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});



//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//LOGIN logic
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){

});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Successfully Logged you Out!");
	res.redirect("/campgrounds");
});

module.exports=router;
