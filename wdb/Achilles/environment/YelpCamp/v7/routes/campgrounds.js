var express= require("express");
var router = express.Router();
var Campground =require("../models/campground");

//INDEX-SHOW ALL CAMPGROUNDS
router.get("/", function(req,res){
	//Get all campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("Campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
    
});

 //CREATE- ADD NEW CAMPGROUND TO DB
 router.post("/", function(req,res){
     //get data from form and add to camgrounds array
     var name= req.body.name;
     var image= req.body.image;
	 var desc= req.body.description;
     var newCampground= {name:name, image:image,description:desc};
     //campgrounds.push(newCampground);
	 //Create a new campground and save it to DB
	 Campground.create(newCampground,function(err,newlyCreated){
		 if(err){
			 console.log(err);
		 }else{
			 // redirect back to campgrounds page
			 res.redirect("/campgrounds");
		 }
	 });
     
 });
 
//NEW- SHOW FORM TO CREATE A NEW CAMPGROUND
 router.get("/new", function(req,res){
     res.render("Campgrounds/new");
 });
 
//SHOW- SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id", function(req,res){
	//find the campground with provided ID
Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			//render show template with the campground
			res.render("Campgrounds/show",{campground: foundCampground});
		}
	});
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
