var  express 		= require('express'),
	 app 			= express(),
	 bodyParser		= require('body-parser'),
	 mongoose		= require('mongoose'),
	 passport   	= require("passport"),
	 localStrategy  = require("passport-local"),
	 Campground 	= require("./models/campgrounds"),
	 Comment 		= require("./models/comments"),
	 User 			= require("./models/user"),
	 methodOverride = require("method-override"),
	 flash 			= require("connect-flash"),
	 seedDB			= require("./seeds");

//requiring routes
var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");


mongoose.set('useUnifiedTopology', true); //to remove the deprecation in new mongoose version
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});

//mongoose.connect("mongodb+srv://root:admin@123@cluster0-g1cp3.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


//===================================================
//PASSPORT Configuration
//===================================================
app.use(require("express-session")({
	secret: "I am loving it",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//===================================================
//===================================================

//call to seed function
//seedDB();

//passing currentUser object to every reponse
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});




app.use("/",indexRoutes);
app.use("/campgrounds/",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);




//===================================================
//LISTENERS
//===================================================

app.listen(3000,function(req,res){
	console.log("Yelp Camp Server is up and running.!!!!");
});

// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp Server Has Started!");
// });

//===================================================
//===================================================
