var mongoose = require('mongoose'),
	Campground = require("./models/campgrounds"),
	Comment =require("./models/comments");

var data=[
 	{
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }


];


function seedDB(){

	//Remove all campgrounds
	Campground.remove({},function(error){

		// if (error) {
		// 	console.log(error)
		// }
		// else{
		// 	console.log("Removed all Campgrounds");
		// 	//add a few campGrounds
		// 	data.forEach(function(seed){
		// 		Campground.create(seed,function(error,campground){
		// 			if (error) {
		// 				console.log(error);
		// 			}
		// 			else
		// 			{
		// 				console.log("Campground Added!!!");
		//
		// 				//Add comments to campgrounds
		// 				Comment.create({
		// 					text:"This is a great plae for trekking,but it would be nice to have internet.",
		// 					author:"John Doe"
		// 				},function(error,comment){
		// 					if(error){
		// 						console.log(error);
		// 					}
		// 					else{
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log("Comment Added");
		// 					}
		// 				});
		// 			}
		// 		});
		// 	})
		//
		//
		// }
		// 

		});

}


module.exports=seedDB;
