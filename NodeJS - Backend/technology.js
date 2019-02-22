var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TechnologySchema =new Schema({
	

	skillid:{
		type:Number,
		unique:true
	},
	
	skill:{
		
		type:String	
	}
	
	
	
});
	module.exports= mongoose.model('Technology',TechnologySchema);
		