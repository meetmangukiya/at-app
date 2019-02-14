socket.on('assignCore', async function(data){
      var msg='';
      var clientObj;
      await  ClientModel.findOne({username:data.clientUsername}, function(err, user) {
        if (err || user==undefined){
          msg+="error";
        }
        else{

          if(user.coreUsername!=undefined||user.coreUsername!=null||user.coreUsername!=''){
            user.coreUsername=data.coreUsername;
            var coreOldUsername="none";
          }
          else if(user.coreUsername==data.coreUsername){
            socket.emit('CoreAssignedMsg', 'This content creator is already assigned to this client'); // emit an event to the socket
            return;
          }
          else{
            var coreOldUsername=user.coreUsername;
            user.coreUsername=data.coreUsername;
          }


          msg+=user.coreUsername+" assigned to "+user.businessName;
          if(data.configClicked!='true'){
            user.popAndAdd(user.signUpQueue,"God","Assign A Core");

          }


        clientObj={key:user.username,username:user.username,businessName:user.businessName};
          user.save();

        }
      })

      CoreModel.findOne({username:data.coreUsername}, function(err, user) {
        if (err || user== undefined){
          msg+="error";
        }
        else{

          var clients=user.clients;
          var clientArr=[];
          console.log("clients:"+clients);

          if (clients==undefined || clients==""){
            clientArr.push(clientObj);
            user.clients=clientArr;
            console.log("user.clients:"+user.clients);
          }
          else{
            //on old client
            clients.push(clientObj);
          }
        user.clientUsername=data.clientUsername;
        msg+= "assigned clients:"+user.clients;
        }

        user.save();

        socket.emit('CoreAssignedMsg', msg); // emit an event to the socket

      })

    if(coreOldUsername!='none'){
      CoreModel.findOne({username:coreOldUsername}, function(err, user) {
        if (err || user== undefined){
          msg+="error";
        }
        else{

          var clients=user.clients;
          console.log("clients:"+clients);
            //on old client

            var foundClient = clients.find(function(element) {
              if(element.username==data.clientUsername){
              return element;
              }
            });

            var index = foundClient.indexOf(foundClient);
            clients.splice(index, 1);
            user.clients=clients;

          }
        user.clientUsername='';

        user.save();


      })
    }


    });
