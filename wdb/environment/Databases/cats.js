var mongoose= require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/cat_app");

var catSchema= new mongoose.Schema({
	name:String,
	age:Number,
	temperament:String
});

var Cat= mongoose.model("Cat", catSchema);

//adding a new cat to the mongodb

/*var george= new Cat({
	name:"Mrs. Norris",
	age:7,
	temperament:"Evil"
});

george.save(function(err, cat){
	if(err){
		console.log("ERROR!")
	}
	else{
	console.log("WE JUST SAVED A NEW CAT")
	console.log(cat);
	}
});*/

//retrieve all cats from the DB and console.log each

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Grouchy",
}, function(err, cat){
	if(err){
		console.log("ERROR!");
	} else{
	console.log(cat);
	}
});

Cat.find({}, function(err, cats){
	if(err){
		console.log("ERROR!!");
		console.log(err);
	} else{
		console.log("ALL THE CATS");
		console.log(cats);
	}
});