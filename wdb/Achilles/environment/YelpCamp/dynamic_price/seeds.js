var mongoose= require("mongoose");
var Campground= require("./models/campground");
var Comment = require("./models/comment");

var data= [
	{name: "Cloud's Rest", image:"https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970_1280.jpg",
	description: "Cloud's Rest is known for its natural environment and surrounded by mountains, dense forest, and grasslands hill tracks. Many small rivers flow through the mountains among which Kachalong and Machalong are notable. On the way to Sajek valley, one has to cross the Mayni range and Mayni river. The road to Sajek has high picks and falls."
	},
	{name: "North Aurora", image: "https://cdn.pixabay.com/photo/2020/01/11/07/39/north-4756774_1280.jpg",
	description: "Sajek valley is known for its natural environment and surrounded by mountains, dense forest, and grasslands hill tracks. Many small rivers flow through the mountains among which Kachalong and Machalong are notable. On the way to Sajek valley, one has to cross the Mayni range and Mayni river. The road to Sajek has high picks and falls." 
	},
	{name: "Canyon Floor", image:"https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_1280.jpg",
	description: "Sajek valley is known for its natural environment and surrounded by mountains, dense forest, and grasslands hill tracks. Many small rivers flow through the mountains among which Kachalong and Machalong are notable. On the way to Sajek valley, one has to cross the Mayni range and Mayni river. The road to Sajek has high picks and falls." 
	}
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Removed campgrounds!");
			// Add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				}else{
					console.log("Added a campground");
					//Create a comment
					Comment.create(
						{text: "This place is great, but I wish there was internet!",
						author: "Somer"
						}, function(err, comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment!!");
							}
						});	
			}
		});
	});
		}
	});
	
	//Add a few comments
}

module.exports = seedDB;
