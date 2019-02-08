var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/test');
var Client= require('./Client.js');
var ClientSchema= Client.ClientSchema;

var ContentCreator= require('./ContentCreator.js');
var ContentCreatorSchema= ContentCreator.ContentCreatorSchema;

var Core= require('./Core.js');
var CoreSchema= Core.CoreSchema;


mongoose.connect('mongodb://localhost/test');
//mongoose.connect("mongodb://armand_at:#LORDarmand2019@atsocial-shard-00-00-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-01-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-02-exfpm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=AtSocial-shard-0&authSource=admin&retryWrites=true/", { useNewUrlParser: true });


 var Schema = mongoose.Schema;

 var AdSchema = new Schema({
   username:String,
   firstName: String,
   lastName:String,
   businessName:{
     type:String,
     required: true},
  // clients: [ClientSchema],
  // contentCreator:[ContentCreatorSchema],
  // core:CoreSchema,
 });


 var AdModel = mongoose.model('Ad', AdSchema);

 module.exports = {
     AdModel: AdModel, // or whatever you want to assign it to
     AdSchema: AdSchema // again, set it to what you like
 };
