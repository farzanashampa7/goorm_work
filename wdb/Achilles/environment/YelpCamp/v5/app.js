var express		= require("express"),
 	app			= express(),
 	bodyParser	= require("body-parser"),
	mongoose	= require("mongoose"),
	Campground  = require("./models/campground"),
	Comment		= require("./models/comment"),
	seedDB		= require("./seeds")
	
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

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
    
app.get("/", function(req,res){
    res.render("landing");
});

//INDEX-SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req,res){
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
 app.post("/campgrounds", function(req,res){
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
 app.get("/campgrounds/new", function(req,res){
     res.render("Campgrounds/new");
 });
 
//SHOW- SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req,res){
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

//COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("Comments/new", {campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req,res){
	//lookup campground using id
	Campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//create new comment
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
	//connect new comment to campground
	//redirect to showpage
});

app.listen(3000, process.env.IP,function(){
    console.log("YelpCamp is started!!");
});