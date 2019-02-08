var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/test');
var Client= require('./Client.js');
var ClientSchema= Client.ClientSchema;

var ContentCreator= require('./ContentCreator.js');
var ContentCreatorSchema= ContentCreator.ContentCreatorSchema;

mongoose.connect('mongodb://localhost/test');
//mongoose.connect("mongodb://armand_at:#LORDarmand2019@atsocial-shard-00-00-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-01-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-02-exfpm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=AtSocial-shard-0&authSource=admin&retryWrites=true/", { useNewUrlParser: true });


 var Schema = mongoose.Schema;

 var CoreSchema = new Schema({
   username:String,
   firstName: String,
   lastName:String,
   businessName:{
     type:String,
     required: true},
     clients: [String],
     contentCreators:[String],
 });


 var CoreModel = mongoose.model('Core', CoreSchema);

 module.exports = {
     CoreModel: CoreModel, // or whatever you want to assign it to
     CoreSchema: CoreSchema // again, set it to what you like
 };
