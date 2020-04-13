var express= require("express");
var app= express();
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds=[
        {name:"Salmon Creek", image:"https://www.photosforclass.com/download/pixabay-1031360?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e0d6424954ac14f6da8c7dda20367d1c3ed9e04e507441702a7bd4924acd_1280.jpg&user=Free-Photos"},
        {name:"Mountain Hill Rest", image:"https://www.photosforclass.com/download/pixabay-1031360?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e0d6424954ac14f6da8c7dda20367d1c3ed9e04e507441702a7bd4924acd_1280.jpg&user=Free-Photos"},
        {name:"Granite Hill", image:"https://www.photosforclass.com/download/pixabay-2581242?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F54e5dd424856ae14f6da8c7dda20367d1c3ed9e04e507441702a7bd4924acd_1280.jpg&user=6091236"}
    ];
    
app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
});
 
 app.post("/campgrounds", function(req,res){
     //get data from form and add to camgrounds array
     var name= req.body.name;
     var image= req.body.image;
     var newCampground= {name:name, image:image};
     campgrounds.push(newCampground);
     // redirect back to campgrounds page
 
     res.redirect("/campgrounds");
 });
 
 app.get("/campgrounds/new", function(req,res){
     res.render("new");
 });
 
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp is started!!");
});