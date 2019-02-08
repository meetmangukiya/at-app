var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
var ContentCreator= require('./ContentCreator.js');
var ContentCreatorSchema= ContentCreator.ContentCreatorSchema;

var Core= require('./Core.js');
var CoreSchema= Core.CoreSchema;


mongoose.connect('mongodb://localhost/test');
//mongoose.connect("mongodb://armand_at:#LORDarmand2019@atsocial-shard-00-00-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-01-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-02-exfpm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=AtSocial-shard-0&authSource=admin&retryWrites=true/", { useNewUrlParser: true });


 var Schema = mongoose.Schema;

 var StrategySchema = new Schema({
    ObjectID:String,
    clientApprovalNeeded:Boolean,
    coreApprovalNeeded:Boolean,
    clientApprovalGiven:Boolean,
    coreApprovalGiven:Boolean,
    done:Boolean,
    clientApprovalDeadline: Date,
    coreApprovalDeadline: Date,
    contentDeadline: Date,
    description:String,
    image:{ data: String, contentType: String },
    texts: {
      text1:String,
      text2:String,
      text3:String,
    },
    images:{
       image1:{ data: Buffer, contentType: String },
       image2:{ data: Buffer, contentType: String },
       image3:{ data: Buffer, contentType: String }
     },
 });

 var PostSchema = new Schema({
   ObjectID:String,
   base64:String,
   tags:String,
   caption:String,
   hashtags:String,
    location:String,
    facebook:String,
    instagram:String,
    date:String,
    time:String
 });



 var ContentCalendarSchema = new Schema({
   ObjectID:String,
   clientApprovalNeeded:Boolean,
   coreApprovalNeeded:Boolean,
   clientApprovalGiven:Boolean,
   coreApprovalGiven:Boolean,
   done:Boolean,
   clientApprovalDeadline: Date,
   coreApprovalDeadline: Date,
   contentDeadline: Date,
   posts:[PostSchema],
 });




 var ShootPlanSchema = new Schema({
   ObjectID:String,
   clientApprovalNeeded:Boolean,
   coreApprovalNeeded:Boolean,
   clientApprovalGiven:Boolean,
   coreApprovalGiven:Boolean,
   done:Boolean,
   clientApprovalDeadline: Date,
   coreApprovalDeadline: Date,
   contentDeadline: Date,
 });

 var PhotoShootSchema = new Schema({
   ObjectID:String,
   clientApprovalNeeded:Boolean,
   coreApprovalNeeded:Boolean,
   clientApprovalGiven:Boolean,
   coreApprovalGiven:Boolean,
   done:Boolean,
   clientApprovalDeadline: Date,
   coreApprovalDeadline: Date,
   contentDeadline: Date,
   schedulingDeadline:Date,
   shootPlan:ShootPlanSchema,
 });

 var InfluencerPlanSchema = new Schema({
   ObjectID:String,
   clientApprovalNeeded:Boolean,
   coreApprovalNeeded:Boolean,
   clientApprovalGiven:Boolean,
   coreApprovalGiven:Boolean,
   done:Boolean,
   clientApprovalDeadline: Date,
   coreApprovalDeadline: Date,
   contentDeadline: Date,
 });


 var InfluencerEventSchema = new Schema({
   ObjectID:String,
   shootPlan:String,
   clientApprovalNeeded:Boolean,
   coreApprovalNeeded:Boolean,
   clientApprovalGiven:Boolean,
   coreApprovalGiven:Boolean,
   done:Boolean,
   clientApprovalDeadline: Date,
   coreApprovalDeadline: Date,
   contentDeadline: Date,
   schedulingDeadline:Date,
   influencerPlan:InfluencerPlanSchema,
 });



 var SurveillanceSchema = new Schema({
   ObjectID:String,
   clientInput:String,
   done:Boolean,
 });

 var AnalyticSchema = new Schema({
   ObjectID:String,
   clientInput:String,
   done:Boolean,
 });



 var StrategyModel = mongoose.model('Strategy', StrategySchema);
 var PostModel = mongoose.model('Post', PostSchema);
 var ContentCalendarModel = mongoose.model('ContentCalendar', ContentCalendarSchema);
 var ShootPlanModel = mongoose.model('ShootPlan', ShootPlanSchema);
 var PhotoShootModel = mongoose.model('PhotoShoot', PhotoShootSchema);
 var InfluencerPlanModel= mongoose.model('InfluencerPlan', InfluencerPlanSchema);
 var InfluencerEventModel= mongoose.model('InfluencerEvent', InfluencerEventSchema);
 var SurveillanceModel= mongoose.model('Surveillance', SurveillanceSchema);
 var AnalyticModel= mongoose.model('Analytic', AnalyticSchema);



 module.exports = {
     StrategySchema: StrategySchema,
     PostSchema: PostSchema,
     ContentCalendarSchema: ContentCalendarSchema,
     ShootPlanSchema: ShootPlanSchema,
     PhotoShootSchema: PhotoShootSchema,
     InfluencerPlanSchema: InfluencerPlanSchema,
     InfluencerEventSchema: InfluencerEventSchema,
     SurveillanceSchema: SurveillanceSchema,
     AnalyticSchema: AnalyticSchema,

     StrategyModel: StrategyModel,
     PostModel: PostModel,
     ContentCalendarModel: ContentCalendarModel,
     ShootPlanModel: ShootPlanModel,
     PhotoShootModel: PhotoShootModel,
     InfluencerPlanModel: InfluencerPlanModel,
     InfluencerEventModel: InfluencerEventModel,
     SurveillanceModel: SurveillanceModel,
     AnalyticModel: AnalyticModel,
 };
