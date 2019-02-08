var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
var ContentCreator= require('./ContentCreator.js');
const fs = require('fs');
//const gridfs = require('mongoose-gridfs');
//const multer = require('multer')
//const bodyParser = require('body-parser')

var ContentCreatorSchema= ContentCreator.ContentCreatorSchema;

var Core= require('./Core.js');
var CoreSchema= Core.CoreSchema;

var atObjects= require('./atObjects.js');

var StrategySchema = atObjects.StrategySchema;
var PostSchema = atObjects.PostSchema;
var ContentCalendarSchema = atObjects.ContentCalendarSchema;
var ShootPlanSchema = atObjects.ShootPlanSchema;
var PhotoShootSchema = atObjects.PhotoShootSchema;
var InfluencerPlanSchema= atObjects.InfluencerPlanSchema;
var InfluencerEventSchema= atObjects.InfluencerEventSchema;
var SurveillanceSchema= atObjects.SurveillanceSchema;
var AnalyticSchema= atObjects.AnalyticSchema;


/*
_connect=async()=>{

   await mongoose.connect('mongodb://localhost/test');
  //mongoose.connect("mongodb://armand_at:#LORDarmand2019@atsocial-shard-00-00-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-01-exfpm.gcp.mongodb.net:27017,atsocial-shard-00-02-exfpm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=AtSocial-shard-0&authSource=admin&retryWrites=true/", { useNewUrlParser: true });

  // instantiate mongoose-gridfs
  const { model: Attachment } = gridfs({
    collection: 'attachments',
    model: 'Attachment',
    mongooseConnection: mongoose.connection
  });

    }
_connect();
*/
mongoose.connect('mongodb://localhost/test');


 var Schema = mongoose.Schema;


var itemSchema= new Schema({
  entity:String,
  calendarMessage:String,
  screen:String,
  startDate:String,
  endDate:String,
});


 var ClientSchema = new Schema({
   username:String,
   firstName: String,
   lastName:String,
   businessName:{
     type:String,
     required: true},
   strategy: StrategySchema,
   contentCalendar:ContentCalendarSchema,

   currentPhotography: PhotoShootSchema,
   upcomingPhotography: PhotoShootSchema,
   currentPhotography: PhotoShootSchema,
   upcomingPhotography: PhotoShootSchema,
   currentContentCalendar:ContentCalendarSchema,
   upcomingContentCalendar:ContentCalendarSchema,
   contentCreatorUsername: String,
   core:CoreSchema,
   selectedPackage:String,
   services:[String],
    motherQueue:[itemSchema],
    adQueue:[itemSchema],
    influencerQueue:[itemSchema],
    engagementCampaignQueue:[itemSchema],
    callQueue:[itemSchema],

    motherCalendar: {
     type: Map,
     of: [String],
     default:{ 'def': ['defo']},
   },
   godCalendar: {
    type: Map,
    of: [String],
    default:{ 'def': ['defo']},
  },
   clientCalendar: {
    type: Map,
    of: [String],
    default:{ 'def': ['defo']},
  },
  contentCreatorCalendar:{
    type: Map,
    of: [String],
    default:{ 'def': ['defo']},
  },
  coreCalendar:{
    type: Map,
    of: [String],
    default:{ 'def': ['defo']},
  },
  coordinationCalendar:{
    type: Map,
    of: [String],
    default:{ 'def': ['defo']},
  },
  adCalendar:{
    type: Map,
    of: [String],
    default:{ 'def': ['defo']},
  },
  kyc:{
    age:String,
  },
  clientToDos:[itemSchema],
  contentCreatorToDos:[itemSchema],
  coreToDos:[itemSchema],
  coordinationToDos:[itemSchema],
  godToDos:[itemSchema],
  adToDos:[itemSchema],
  intitializerCalendar:{
    type: Map,
    of: [itemSchema],
    default:{ 'def': [{entity:'defo'}]},
  },

 });

 ClientSchema.methods.getCalendarAndToDos =function(entity) {
   if(entity==="Client"){
     var calendar=this.clientCalendar;
     var todos=this.clientToDos;
   }
   else if(entity==="ContentCreator"){
     var calendar=this.contentCreatorCalendar;
     var todos=this.contentCreatorToDos;

   }
   else if(entity==="Core"){
     var calendar=this.coreCalendar;
     var todos=this.coreToDos;

   }
   else if(entity==="Coordination"){
     var calendar=this.coordinationCalendar;
     var todos=this.cooridnationToDos;

   }
   else if(entity==="Ad"){
     var calendar=this.adCalendar;
     var todos=this.adToDos;

   }
   else if(entity==="God"){
     var calendar=this.godCalendar;
     var todos=this.godToDos;

   }
   return({neededCalendar:calendar, neededToDos:todos});

  };


  ClientSchema.methods.startFreeTrial =function(selectedPackage,cb) {

    this.selectedPackage=selectedPackage;
    if(selectedPackage==500){
      this.services=["Strategy","2HourPhotography","15Posts","Ads","Surveillance","Analytics"]
    }
    if(selectedPackage==750){
      this.services=["Strategy","4HourPhotography","30Posts","Ads","Surveillance","Analytics"]
    }
    if(selectedPackage==1000){
      this.services=["Strategy","4HourPhotography","30Posts","Ads","Surveillance","Analytics","Engagement Campaign"]
    }

    var today = new Date();
    var IndiaDateToday=today.toLocaleDateString('en-US', {timeZone: "Asia/Kolkata"}); //1/27/2019
    var arrayDayHelper=IndiaDateToday.split("/");
    var thisMonth=parseInt(arrayDayHelper[0]);
    var thisDay=parseInt(arrayDayHelper[1]);
    var thisYear=parseInt(arrayDayHelper[2]);


    /*var options = { timezone:"Asia/Kolkata",year: 'numeric', month: '2-digit', day: '2-digit' };
    var today = new Date();
    var IndiaDateToday=today.toLocaleDateString('zh-Hans-CN', options);*/


    var thisCycleStart;
    if(thisDay>15 && thisDay<32){
      thisCycleStart=1;
    }
    else{
      thisCycleStart=16;
    }


  var addQueueCalendarValue=function(entity,queue,cycleStart,month,startDay,endDay,year,calendarMessage,screen,initializer){


      var calendar=this.getCalendarAndToDos(entity)["neededCalendar"];

      if(cycleStart==1 && calendarMessage=="KYC"){

      var startMonth=month;
      var endMonth=month+1;

      }

      else if(cycleStart==1){
      var startMonth=month+1;
      var endMonth=month+1;

      }

      else{
        var startDay=startDay+16;
        var endDay=endDay+16;

        var startMonth=month;
        var endMonth=month;

        if(startDay>30){
          var startDay=startDay-30;
          var startMonth=month+1;

        }

        if(endDay>30){

          var endMonth=month+1;
          var endDay=endDay-30;
        }
      }

      if(endMonth<10){
        endMonth="0"+endMonth;
      }
      if(startMonth<10){
        startMonth="0"+startMonth;
      }

      if(endDay<10){
        endDay="0"+endDay;
      }
      if(startDay<10){
        startDay="0"+startDay;
      }

      var startDate=year+"-"+startMonth+"-"+startDay;
      var endDate=year+"-"+endMonth+"-"+endDay;

      var startValueArr=calendar.get(startDate);
      if (startValueArr===undefined){
        startValueArr=[calendarMessage+"(Start)"];


        calendar.set(startDate,startValueArr);

      }
      else{
        startValueArr.push(calendarMessage+"(Start)");

        calendar.set(startDate,startValueArr);


      }


      var endValueArr=calendar.get(endDate);
      if (endValueArr===undefined){

        endValueArr=[calendarMessage+"(Deadline)"];
        calendar.set(endDate,endValueArr);

      }
      else if(endValueArr!=undefined && endValueArr !=null ){

        endValueArr.push(calendarMessage+"(Deadline)");

        calendar.set(endDate,endValueArr);
      }

      queueItem={entity:entity,calendarMessage:calendarMessage,screen:screen,startDate:startDate,endDate:endDate};

      queue.push(queueItem);

      if(screen=="KYC"){
        this.clientToDos.push(queueItem);
      }

      if(initializer==true){
        var initializerValue=this.intitializerCalendar.get(startDate);
        if (initializerValue===undefined){
          var initializerArr=[queueItem];

          this.intitializerCalendar.set(startDate,initializerArr);
        }

        else{
          initializerValue.push(queueItem);

          this.intitializerCalendar.set(startDate,initializerValue);

        }

      }


    };

    var boundAddQueueCalendarValue= addQueueCalendarValue.bind(this);



  //first time

  boundAddQueueCalendarValue("Client",this.motherQueue,thisCycleStart,thisMonth,thisDay,1,thisYear,"Fill the KYC","KYC",false);

  boundAddQueueCalendarValue("God",this.motherQueue,thisCycleStart,thisMonth,1,1,thisYear,"Assign A Core","ClientAssign",false );

  boundAddQueueCalendarValue("Core",this.motherQueue,thisCycleStart,thisMonth,1,1,thisYear,"Assign A Content Creator", "ClientAssign",false);

    //cycle starts

  boundAddQueueCalendarValue("Client",this.callQueue,thisCycleStart,thisMonth,1,2,thisYear,"Monthly Call","MonthlyCall",true); //needs adding
  boundAddQueueCalendarValue("ContentCreator",this.callQueue,thisCycleStart,thisMonth,1,2,thisYear,"Monthly Call", "MonthlyCall",false);

  boundAddQueueCalendarValue("ContentCreator",this.motherQueue,thisCycleStart,thisMonth,2,5,thisYear,"Brainstorm","Brainstorm",false);//needs adding
  boundAddQueueCalendarValue("Core",this.motherQueue,thisCycleStart,thisMonth,2,5,thisYear,"Brainstorm","Brainstorm",false);

//checking services to include or not
      for (var i=0;i<this.services.length;i++){

        if (this.services[i]==="Ads"){

          boundAddQueueCalendarValue("ContentCreator",this.adQueue,thisCycleStart,thisMonth,5,5,thisYear,"Create Ad Plan","AdPlan", true );

          boundAddQueueCalendarValue("Ad",this.adQueue,thisCycleStart,thisMonth,5,5,thisYear,"Create Ad Plan","AdPlan",false);

          //leaving this incomplete

        }

        if (this.services[i]==="Strategy"){

          boundAddQueueCalendarValue("ContentCreator",this.motherQueue,thisCycleStart,thisMonth,5,7,thisYear,"Create Strategy Plan","Strategy",false);

          boundAddQueueCalendarValue("Core",this.motherQueue,thisCycleStart,thisMonth,7,8,thisYear,"Approve Strategy Plan","Strategy",false);

          boundAddQueueCalendarValue("Client",this.motherQueue,thisCycleStart,thisMonth,8,10,thisYear,"Approve Strategy Plan","Strategy",false);

        }

        if (this.services[i]==="2HourPhotography" || this.services[i]==="4HourPhotography"){

          boundAddQueueCalendarValue("ContentCreator",this.motherQueue,thisCycleStart,thisMonth,10,12,thisYear,"Create Shoot Plan","ShootPlan",false);

          boundAddQueueCalendarValue("Core",this.motherQueue,thisCycleStart,thisMonth,12,13,thisYear,"Approve Shoot Plan","ShootPlan",false);

          boundAddQueueCalendarValue("Coordination",this.motherQueue,thisCycleStart,thisMonth,13,14,thisYear,"Schedule Shoot","SchedulingShoot",false);

          boundAddQueueCalendarValue("Client",this.motherQueue,thisCycleStart,thisMonth,14,15,thisYear,"Approve Shoot Plan","ShootPlan",false);

        }

        if (this.services[i]==="15Posts" || this.services[i]==="30Posts"){

          boundAddQueueCalendarValue("ContentCreator",this.motherQueue,thisCycleStart,thisMonth,21,26,thisYear,"Create Content Calendar","IGcalendar",false);

          boundAddQueueCalendarValue("Core",this.motherQueue,thisCycleStart,thisMonth,26,28,thisYear,"Approve Content Calendar","IGcalendar",false);

          boundAddQueueCalendarValue("Client",this.motherQueue,thisCycleStart,thisMonth,28,30,thisYear,"Approve Content Calendar","IGcalendar",false);

        }


        if (this.services[i]==="Influencers"){


          boundAddQueueCalendarValue("ContentCreator",this.influencerQueue,thisCycleStart,thisMonth,10,20,thisYear,"Create Influencer Plan","InfluencerPlan",true);

          boundAddQueueCalendarValue("Core",this.influencerQueue,thisCycleStart,thisMonth,20,21,thisYear,"Approve Influencer Plan","InfluencerPlan",false);

          boundAddQueueCalendarValue("Client",this.influencerQueue,thisCycleStart,thisMonth,21,22,thisYear,"Approve Influencer Plan","InfluencerPlan",false);

          boundAddQueueCalendarValue("Coordination",this.influencerQueue,thisCycleStart,thisMonth,23,28,thisYear,"Schedule Influencers","SchedulingInfluencer",false);

          boundAddQueueCalendarValue("Client",this.influencerQueue,thisCycleStart,thisMonth,28,30,thisYear,"Approve Influencer Scheduling","SchedulingInfluencer",false);

        }

      }

     }



    ClientSchema.methods.popAndAdd =function(queue,entity,calendarMessage) {

      //first removing item from queue and calendar because it's done

      var neededToDos=this.getCalendarAndToDos(entity)["neededToDos"];
      var neededCalendar=this.getCalendarAndToDos(entity)["neededCalendar"];

        var foundToDo = neededToDos.find(function(element) {
          if(element.calendarMessage==calendarMessage){
          return element;
          }
        });

        var index = neededToDos.indexOf(foundToDo);
        neededToDos.splice(index, 1);

        neededQueueItem=queue[0];

        var getCalendarIndex= function(arr,thisElement){
          var index=arr.find(function(element) {
            if(element==thisElement){
            return arr.indexOf(element);
            }
          });
          return index;
        }

        neededStartDate=neededQueueItem["startDate"];
        neededEndDate=neededQueueItem["endDate"];
        neededCalendarMessage=neededQueueItem["calendarMessage"];

        var neededStartArray=neededCalendar.get(neededStartDate);

//        console.log("OtherneededStartArray:"+OtherneededStartArray+" neededCalendar:"+neededCalendar+ " neededStartDate:"+neededStartDate+ " neededstartarr:"+neededStartArray);

        var foundStartElementIndex = getCalendarIndex(neededStartArray,neededCalendarMessage+"(Start)");
        neededStartArray.splice(foundStartElementIndex, 1);

        if(neededStartArray==""){
          neededCalendar.delete(neededStartDate);
        }
        else{
        neededCalendar.set(neededStartDate,neededStartArray);
        }


        var neededEndArray=neededCalendar.get(neededEndDate);

        console.log("neededendarr: "+neededEndArray);

        var foundEndElementIndex = getCalendarIndex(neededEndArray,neededCalendarMessage+"(Deadline)")
        neededEndArray.splice(foundEndElementIndex, 1);

        console.log("neededendarr: "+neededEndArray);

        if(neededEndArray==""){
          neededCalendar.delete(neededEndDate);
        }
        else{
          neededCalendar.set(neededEndDate,neededEndArray);
        }
        var foundEndElementIndex = getCalendarIndex(neededEndArray,neededCalendarMessage+"(Deadline)")




      queue.shift();

      var nextItem=queue[0];

      if(nextItem!=undefined){

      var nextEntity=nextItem["entity"];

      neededNextCalendarMessage=nextItem["calendarMessage"];
      var neededNextItemStartDate=nextItem["startDate"];
      var nextCalendar=this.getCalendarAndToDos(nextEntity)["neededCalendar"];
      var neededNextStartArray=nextCalendar.get(neededNextItemStartDate);

      var foundNextStartElementIndex = getCalendarIndex(neededNextStartArray,neededNextCalendarMessage+"(Start)");
      neededNextStartArray.splice(foundNextStartElementIndex, 1);


      if(neededNextStartArray==""){
        nextCalendar.delete(neededNextItemStartDate);

      }
      else{
      nextCalendar.set(neededNextItemStartDate,neededNextStartArray);
    }

      var today = new Date();
      var IndiaDateToday=today.toLocaleDateString('en-US', {timeZone: "Asia/Kolkata"}); //1/27/2019
      var arrayDayHelper=IndiaDateToday.split("/");
      var thisMonth=parseInt(arrayDayHelper[0]);
      var thisDay=parseInt(arrayDayHelper[1]);
      var thisYear=parseInt(arrayDayHelper[2]);
      if(thisDay<10){
        thisDay="0"+thisDay;
      }
      if(thisMonth<10){
        thisMonth="0"+thisMonth;
      }

      var replaceStartDate=thisYear+"-"+thisMonth+"-"+thisDay;

      var nextNeededStartArr=nextCalendar.get(replaceStartDate);

      if(nextNeededStartArr==undefined){
        nextCalendar.set(replaceStartDate,[neededNextCalendarMessage+"(Start)"]);
      }
      else{
        nextNeededStartArr.push(neededNextCalendarMessage+"(Start)");
        nextCalendar.set(replaceStartDate,nextNeededStartArr);
      }


      nextItem["startDate"]=replaceStartDate;

      var nextNeededToDos=this.getCalendarAndToDos(nextEntity)["neededToDos"];

      nextNeededToDos.push({entity:nextItem.entity,startDate:nextItem.startDate, screen:nextItem.screen, endDate:nextItem.endDate,calendarMessage:nextItem.calendarMessage+"(Start)"});


      }

    };


    ClientSchema.methods.initializeWithDate =function() {

      //if item non-mother queue, then use ifs to catch this.

      var generateDay=function(minus){

        var today = new Date();
        today.setDate(today.getDate() - minus);
        var IndiaDateToday=today.toLocaleDateString('en-US', {timeZone: "Asia/Kolkata"}); //1/27/2019
        var arrayDayHelper=IndiaDateToday.split("/");

        var thisMonth=parseInt(arrayDayHelper[0]);

        var thisDay=parseInt(arrayDayHelper[1]);
        var thisYear=parseInt(arrayDayHelper[2]);

        if(thisDay<10){
          thisDay="0"+thisDay;
        }
        if(thisMonth<10){
          thisMonth="0"+thisMonth;
        }

        var todayRightFormat=thisYear+"-"+thisMonth+"-"+thisDay;

        return todayRightFormat;

      }

      var today = generateDay(0);
      var yesterday = generateDay(1);
      var TwoBefore = generateDay(2);
      var ThreeBefore = generateDay(3);
      var FourBefore = generateDay(4);
      var FiveBefore = generateDay(5);

      var daysArr=[today,yesterday,TwoBefore,ThreeBefore,FourBefore,FiveBefore]


      for(var q=0;q<daysArr.length;q++){

      var thisDay=daysArr[q];
      var initializerValue=this.intitializerCalendar.get(thisDay);

      if(initializerValue!=undefined && initializerValue[0]!=null){
        for(var i=0; i<initializerValue.length;i++){
          var item=initializerValue[i];
          var entity=itemStringSplit["entity"];
          var neededToDos=this.getCalendarAndToDos(entity)["neededToDos"];
            neededToDos.push(item);

        }

          this.intitializerCalendar.set(thisDay,undefined);

      }

    }



    };


/*
    ClientSchema.methods.writeGrid =function(options,readStream) {

//    const readStream = fs.createReadStream('/some/path/sample.txt');
//    const options = ({ filename: 'sample.txt', contentType: 'text/plain' });
    Attachment.write(options, readStream, (error, file) => {});

}

ClientSchema.methods.readGrid =function(size,objectID) {

// for larger file size, read a file and receive a readable stream
return readStream = Attachment.readById(objectid);

// for smaller file size, read a file and receive a buffer
//Attachment.readById(objectid, (error, buffer) => { ... });

}
*/

 var ClientModel = mongoose.model('Client', ClientSchema);


 module.exports = {
     ClientModel: ClientModel, // or whatever you want to assign it to
     ClientSchema: ClientSchema, // again, set it to what you like
 };
