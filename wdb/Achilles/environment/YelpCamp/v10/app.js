var express			= require("express"),
 	app				= express(),
 	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	methodOverride	= require("method-override"),
	Campground  	= require("./models/campground"),
		Comment		= require("./models/comment"),
	User 			= require("./models/user"),
	seedDB			= require("./seeds")


//requiring routes
var commentRoutes 		=require("./routes/comments"),
	campgroundRoutes 	=  require("./routes/campgrounds"),
	indexRoutes 			= require("./routes/index")
	
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp_v10");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//seed the database
//seedDB();

/*Campground.create(
	{
		name:"Granite Hill", 
image:"https://cdn.pixabay.com/photo/2017/06/07/12/59/poland-2380290_1280.jpg",
		description:"This is a huge granite hill. No bathrooms, no water. Beautiful granite!"
		
	}, function(err, campground){
		if(err){
			console.log("ERROR!!");
		}else{
			console.log("NEWLY CREATED CAMPGROUND:")
			console.log(campground);
		}
	});*/

/*var campgrounds=[
        {name:"Salmon Creek", image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_1280.jpg"},
        {name:"Mountain Hill Rest", image:"https://cdn.pixabay.com/photo/2017/06/07/12/59/poland-2380290_1280.jpg"},
        {name:"Granite Hill", image:"https://cdn.pixabay.com/photo/2016/03/30/02/57/camping-1289930_1280.jpg"}
    ];*/
    
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Rusty is the cutest dog!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){		
		res.locals.currentUser= req.user;
		next();
		});	

app.use("/" ,indexRoutes);
app.use("/campgrounds" ,campgroundRoutes);
app.use(commentRoutes);


app.listen(3000, process.env.IP,function(){
    console.log("YelpCamp is started!!");
});