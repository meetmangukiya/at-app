var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ss = require('socket.io-stream');
var path = require('path');

var fs= require('fs')
var User = require('./mongoose/User.js')

var Client= require('./mongoose/Client.js');
var ClientModel= Client.ClientModel;

var ContentCreator= require('./mongoose/ContentCreator.js');
var ContentCreatorModel= ContentCreator.ContentCreatorModel;

var Core= require('./mongoose/Core.js');
var CoreModel= Core.CoreModel;

var Designer= require('./mongoose/Designer.js');
var DesignerModel= Designer.DesignerModel;

var God= require('./mongoose/God.js');
var GodModel= God.GodModel;

var Photographer= require('./mongoose/Photographer.js');
var PhotographerModel= Photographer.PhotographerModel;

var Coordination= require('./mongoose/Coordination.js');
var CoordinationModel= Coordination.CoordinationModel;

var Ad= require('./mongoose/Ad.js');
var AdModel= Ad.AdModel;

var atObjects= require('./mongoose/atObjects.js');

var StrategyModel = atObjects.StrategyModel;
var PostModel = atObjects.PostModel;
var ContentCalendarModel = atObjects.ContentCalendarModel;
var ShootPlanModel = atObjects.ShootPlanModel;
var PhotoShootModel = atObjects.PhotoShootModel;
var InfluencerPlanModel= atObjects.InfluencerPlanModel;
var InfluencerEventModel= atObjects.InfluencerEventModel;
var SurveillanceModel= atObjects.SurveillanceModel;
var AnalyticModel= atObjects.AnalyticModel;

//testcommentchange

app.get('/', function(req, res){
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });});

var authentication = io.of('/authentication');

authentication.on('connection', function(socket){
        socket.on('signUp', function(data){

          User.findOne({ username: data.screenUserName }, function(err, user) {
            console.log(user);
          if (user!=null){
            var usernameStatus={status:"username already exists"}
           socket.emit('loginStatus', usernameStatus); // emit an event to the socket
         }
           else{

             var newUser= new User();
             newUser.username=data.screenUserName ;
             newUser.password=data.screenPassword;
             newUser.firstName=data.screenFirstName;
             newUser.lastName=data.screenLastName;
             newUser.businessName=data.screenBusinessName;
             newUser.save();

             if (newUser.businessName=="ContentCreator"){
               var newContentCreator=new ContentCreatorModel();
               newContentCreator.username=data.screenUserName ;
               newContentCreator.firstName=data.screenFirstName;
               newContentCreator.lastName=data.screenLastName;
               newContentCreator.businessName=data.screenBusinessName;
               newContentCreator.save();
             }

             else if (newUser.businessName=="Core"){
               var newCore=new CoreModel();
               newCore.username=data.screenUserName ;
               newCore.firstName=data.screenFirstName;
               newCore.lastName=data.screenLastName;
               newCore.businessName=data.screenBusinessName;
               newCore.save();

             }

             else if (newUser.businessName=="Photographer"){
               var newPhotographer=new PhotographerModel();
               newPhotographer.username=data.screenUserName ;
               newPhotographer.firstName=data.screenFirstName;
               newPhotographer.lastName=data.screenLastName;
               newPhotographer.businessName=data.screenBusinessName;
               newPhotographer.save();

             }


             else if (newUser.businessName=="Coordination"){
               var newCoordination=new CoordinationModel();
               newCoordination.username=data.screenUserName ;
               newCoordination.firstName=data.screenFirstName;
               newCoordination.lastName=data.screenLastName;
               newCoordination.businessName=data.screenBusinessName;
               newCoordination.save();

             }
             else if (newUser.businessName=="God"){
               var newGod=new GodModel();
               newGod.username=data.screenUserName ;
               newGod.firstName=data.screenFirstName;
               newGod.lastName=data.screenLastName;
               newGod.businessName=data.screenBusinessName;
               newGod.save();

             }

             else if (newUser.businessName=="Designer"){
               var newDesigner=new DesignerModel();
               newDesigner.username=data.screenUserName ;
               newDesigner.firstName=data.screenFirstName;
               newDesigner.lastName=data.screenLastName;
               newDesigner.businessName=data.screenBusinessName;
               newDesigner.save();

             }

             else if (newUser.businessName=="Ad"){
               var newAd=new AdModel();
               newAd.username=data.screenUserName ;
               newAd.firstName=data.screenFirstName;
               newAd.lastName=data.screenLastName;
               newAd.businessName=data.screenBusinessName;
               newAd.save();

             }

             else {
               var newClient=new ClientModel();
               newClient.username=data.screenUserName ;
               newClient.firstName=data.screenFirstName;
               newClient.lastName=data.screenLastName;
               newClient.businessName=data.screenBusinessName;
               newClient.save();

             }

             var usernameStatus="good to go";
             socket.emit('loginStatus', usernameStatus); // emit an event to the socket
               }


               });
          })

          socket.on('signIn', async(data)=>{
            // fetch user and test password verification
           User.findOne({ username: data.screenUserName }, function(err, user) {
           if (err || user==null){
             var LoginStatus={status:"no such username"}
            socket.emit('loginStatus', LoginStatus); // emit an event to the socket
          }
            else{


          // test a matching password
          user.comparePassword(data.screenPassword, function(err, isMatch) {


              if (isMatch){
                var LoginStatus={status:"success",businessName:user.businessName};
              }
              else{
                var LoginStatus={status:"incorect password"};

              }
              socket.emit('loginStatus', LoginStatus); // emit an event to the socket
                  });
                }

                });

            })

    });


    var entities = io.of('/entities');

    entities.on('connection', function(socket){
        socket.on('requestAllClients', function(data){

          GodModel.findOne({ username: data }, function(err, user) {
            var clients;
            if (err){
              //
            }
            else{
              ClientModel.find({}, function(err, users) {
                socket.emit('gottenAllClients', users); // emit an event to the socket
              })
            }
          });

          //if creator
          //if core ..


        });

        socket.on('requestClient', function(data){

              ClientModel.find({username:data}, function(err, user) {
                if (err){
                  console.log(err);
                }
                else{

                socket.emit('gottenClient', user); // emit an event to the socket
                }
              })
            });

          //if creator
          //if core ..


              socket.on('requestAllContentCreators', function(data){
                    ContentCreatorModel.find({}, function(err, users) {

                      socket.emit('gottenAllContentCreators', users); // emit an event to the socket
                    })
                  });

                  socket.on('requestAllCores', function(data){
                        CoreModel.find({}, function(err, users) {
                          socket.emit('gottenAllCores', users); // emit an event to the socket
                        })
                      });

                //if creator
                //if core ..



              socket.on('requestClient', function(data){

                    ClientModel.findOne({username:data}, function(err, user) {
                      if (err){
                        console.log(err);
                      }
                      else{

                      socket.emit('gottenClient', user); // emit an event to the socket
                      }
                    })
                  });

                  socket.on('assignContentCreator', function(data){
                        var msg='';
                        ClientModel.findOne({username:data.clientUsername}, function(err, user) {
                          if (err || user==undefined){
                            msg+="error";
                          }
                          else{

                          user.contentCreatorUsername=data.contentCreatorUsername;
                            msg+=user.contentCreatorUsername+" assigned to "+user.businessName;
                            user.popAndAdd(user.motherQueue,"Core","Assign A Content Creator");
                            user.save();

                          }
                        })
                        ContentCreatorModel.findOne({username:data.contentCreatorUsername}, function(err, user) {
                          if (err || user== undefined){
                            msg+="error";
                          }
                          else{
                          user.clientUsername=data.clientUsername;
                          msg+= " & vice versa"


                          }

                          socket.emit('ContentCreatorAssignedMsg', msg); // emit an event to the socket

                        })

                      });

                      socket.on('assignCore', function(data){

                            var msg='';
                            ClientModel.findOne({username:data.clientUsername}, function(err, user) {
                              console.log(user);

                              if (err || user==undefined){
                                msg+="error";
                              }
                              else{
                                console.log("try");

                              console.log(user);

                              user.coreUsername=data.coreUsername;
                                msg+=user.coreUsername+" assigned to "+user.businessName;

                                user.popAndAdd(user.motherQueue,"God","Assign A Core");

                              }
                              user.save();

                            })
                            CoreModel.findOne({username:data.coreUsername}, function(err, user) {
                              if (err || user== undefined){
                                msg+="error";
                              }
                              else{
                              user.clientUsername=data.clientUsername;
                              msg+= " & vice versa"

                              }

                              socket.emit('CoreAssignedMsg', msg); // emit an event to the socket

                            })

                          });


                });



    var calendar = io.of('/calendar');

    calendar.on('connection', function(socket){
      socket.on('createCalendarItem', function(data){
          ClientModel.findOne({ username: data }, function(err, user) {
          var items;
          if (user.getApprovalItems==undefined || user.getApprovalItems==[]){
             items={needed:"none"};
          }
          else{
            items={needed:user.getApprovalItems};
          }
          socket.emit('gottenApprovalItems', items); // emit an event to the socket

          });
        });

    });



    var getClient = io.of('/client');

    calendar.on('connection', function(socket){
      socket.on('createCalendarItem', function(data){
          ClientModel.findOne({ username: data }, function(err, user) {
          var items;
          if (user.getApprovalItems==undefined || user.getApprovalItems==[]){
             items={needed:"none"};
          }
          else{
            items={needed:user.getApprovalItems};
          }
          socket.emit('gottenApprovalItems', items); // emit an event to the socket

          });
        });

    });


    var clientConfig = io.of('/clientConfig');

    clientConfig.on('connection', function(socket){
        socket.on('requestAllServices', function(data){
              ClientModel.findOne({username:data}, function(err, user) {
                socket.emit('gottenAllServices', user.services); // emit an event to the socket
              })
            });
          });

var package = io.of('/package');

  package.on('connection', function(socket){
    socket.on('startFreeTrial',  function(data){
      console.log(data);
      var msg='';


      ClientModel.findOne({username:data.clientUsername}, async function(err, user) {
        if(user==undefined || err){
          console.log("no model error")
        }
        else{


      await user.startFreeTrial(data.selectedPackage);

        msg+="successfully added:";


        user.save(function (err) {
          if(err) {
            msg+=err;
          }
        });

        socket.emit('selectPackageMsg', msg); // emit an event to the socket


                      }


                    })
                  });
                });


var calendarHome = io.of('/calendarHome');
calendarHome.on('connection', function(socket){
  socket.on('getAllCalendarItems', function(data){


      ClientModel.findOne({ username: data.clientUsername}, function(err, user) {

        var neededCalendar=user.getCalendarAndToDos(data.entity)["neededCalendar"];


        socket.emit('gottenAllCalendarItems', neededCalendar); // emit an event to the socket

        });
    });

});


var kyc = io.of('/kyc');

kyc.on('connection', function(socket){
    socket.on('submitKYC', function(data){
          ClientModel.findOne({username:data.clientUsername}, function(err, user) {
            user.kyc["age"]=data.age;

            user.popAndAdd(user.motherQueue,"Client","KYC");

            user.save();

            socket.emit('submittedKYC', "age="+user.kyc["age"]); // emit an event to the socket

          })
        });
      });


var toDos = io.of('/toDos');

toDos.on('connection', function(socket){
  socket.on('requestToDos', function(data){
    ClientModel.findOne({ username: data.clientUsername }, async function(err, user) {
      var newToDosArr=[];

      await user.initializeWithDate();

      var neededToDos=user.getCalendarAndToDos(data.entity)["neededToDos"];

      if(neededToDos!=undefined){
          for(var i=0; i<neededToDos.length;i++){
          var item= neededToDos[i];
          var calendarMessage= item["calendarMessage"];
          var screen=  item["screen"];
          newToDosArr.push({screen:screen,calendarMessage:calendarMessage});

          }
      }
      user.save();



  socket.emit('gottenToDos', newToDosArr); // emit an event to the socket


    });
      });
    });




    var call = io.of('/call');

    call.on('connection', function(socket){
      socket.on('doneCall', function(data){

        ClientModel.findOne({ username: data.clientUsername }, function(err, user) {
          if(data.entity=="Client"){
            user.popAndAdd(user.callQueue,"Client","Monthly Call");

          }
          if(data.entity=="Content Creator"){
            user.popAndAdd(user.callQueue,"ContentCreator","Monthly Call");

          }

          user.save();

            });
          });
        });


        var done = io.of('/done');

        done.on('connection', function(socket){
          socket.on('done', function(data){
            console.log(data);

            ClientModel.findOne({ username: data.clientUsername }, function(err, user) {

                user.popAndAdd(user.motherQueue,data.entity,data.msg);
                user.save();

                });
              });
            });


            var strategy = io.of('/strategy');

            strategy.on('connection', function(socket){
              socket.on('createStrategy', function(data){

                ClientModel.findOne({ username: data.clientUsername }, function(err, user) {

                  console.log(user);

                    user.popAndAdd(user.motherQueue,data.entity,data.msg);

                    var strat={description:data.description,image:{contentType:'image/png',data:data.base64}}

                    user.strategy=strat;


                    user.save();
                    console.log(user.strategy);

                    });
                  });

                  socket.on('getStrategy', function(data){

                    ClientModel.findOne({ username: data.clientUsername }, function(err, user) {
                      console.log({image:user.strategy["image"], description:user.strategy["description"]});
                      socket.emit('gottenStrategy', {image:user.strategy["image"], description:user.strategy["description"]}); // emit an event to the socket


                        });
                      });


                });


                var content = io.of('/content');

                content.on('connection', function(socket){


                  socket.on('createPost', function(data){
                    console.log(data);

                    ClientModel.findOne({ username: data.clientUsername }, function(err, user) {


                //        user.popAndAdd(user.motherQueue,data.entity,data.msg);

                        var post={base64:data.base64,tags:data.tags,caption:data.caption,hashtags:data.hashtags,
                                location:data.location,facebook:data.facebook,instagram:data.instagram,date:data.date,
                                time:data.time }


                        if(user.contentCalendar==undefined){
                          var contentCalendar= {posts:[post]};
                          user.contentCalendar=contentCalendar;
                        }

                        user.contentCalendar["posts"].unshift(post);

                        user.save();

                        });
                      });

                      socket.on('getCalendar', function(data){

                        ClientModel.findOne({ username: data.clientUsername }, function(err, user) {
                          console.log(user);
                          console.log(user.contentCalendar);

                          socket.emit('gottenCalendar', user.contentCalendar["posts"]); // emit an event to the socket


                            });
                          });

                        });




io.on('connection',function(socket){
  console.log('there is a new connection');

});

http.listen('3000', function(){
  console.log('listening on *:3000');
});
