var mongoose= require('mongoose');

//set schema
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]

});

//set model
module.exports=mongoose.model("Campground",campgroundSchema);
