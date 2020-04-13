var mongoose= require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post= require("./Models/post");
var User= require("./Models/user");



Post.create({
	title: "How to make the best burger pt.3",
	content: "Awesome Burger!!"
},function(err,post){
	User.findOne({email: "bob@gmail.com"}, function(err,foundUser){
		if(err){
			console.log(err);
		}else{
			foundUser.posts.push(post);
			foundUser.save(function(err,data){
				if(err){
					console.log(err);
				}else{
					console.log(data);
				}
			});
		}
	});
	
});

//Find user
//Find all posts for that user

/*User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err,user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});*/

/*User.create({
	email: "bob@gmail.com",
	name: "Bob belcher"
});*/


