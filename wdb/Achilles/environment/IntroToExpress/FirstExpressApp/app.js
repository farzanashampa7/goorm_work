var express= require("express");
var app= express();

app.get("/", function(req, res){
    res.send("Hi There, Welcome to my assignment!!");
});

app.get("/speak/pig", function(req,res){
    res.send("Oink!!");
});

app.get("/speak/cow", function(req,res){
    res.send("Moo!!");
});

app.get("/speak/dog", function(req,res){
    res.send("Woof  Woof!!");
});

//app.get("/dogs", function(req,res){
    //console.log("SOMEONE MADE A REQUEST TO /DOG");
    //res.send("MEOW!!");
//});

app.get("/repeat/:name/:id", function(req,res){
    res.send(name);
});

app.get("*", function(req,res){
   res.send("Page not found!! What are you doing with your life?") ;
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!");
});