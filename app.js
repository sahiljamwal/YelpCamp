const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  Campground = require("./models/campgrounds"),
  Comment = require("./models/comments"),
  User = require("./models/user"),
  methodOverride = require("method-override"),
  flash = require("connect-flash"),
  seedDB = require("./seeds");

const dotnev = require("dotenv");
dotnev.config();
const morgan = require("morgan");

//requiring routes
const indexRoutes = require("./routes/index");
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");

const url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";

mongoose.set("useUnifiedTopology", true); //to remove the deprecation in new mongoose version
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err.message));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//===================================================
//PASSPORT Configuration
//===================================================
app.use(
  require("express-session")({
    secret: "I am loving it",
    resave: false,
    saveUninitialized: false,
  })
);
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
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ")
  )
);

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("The YelpCamp Server Has Started!");
});
