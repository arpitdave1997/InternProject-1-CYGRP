var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var employeeSchema =new Schema({
	
	name:{
        type:String
    },
	email:{
		type:String,
		unique:true
	},
	
	password:
	{
		
		type:String,
		required:true
	},
	
	skill:{
		
		type:Array
		
		
	},
	
	admin:
	{type:Boolean
		
	}
		
		
	});
	module.exports= mongoose.model('Employee',employeeSchema);

	
	
