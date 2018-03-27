//===================================================================================
//Global Variables I will need for functions later
//===================================================================================
// var currentTime = moment.format('HH:mm');
// var childData = snapshot.val();
// var nextArrival = '';
// var minutes Away = '';

//Use to access Firebase below:
//Initialize Firebase

var config = {
    apiKey: "AIzaSyBOWmwcIdNfNHcySjiOO0TkP-nioH3dT98",
    authDomain: "jennp-6f180.firebaseapp.com",
    databaseURL: "https://jennp-6f180.firebaseio.com",
    projectId: "jennp-6f180",
    storageBucket: "jennp-6f180.appspot.com",
    messagingSenderId: "911300040236"
  };

  firebase.initializeApp(config);

  var trainDataInfo = firebase.database();

  //First thing will be to add train information
  //===================================================================

  $("#add-train-button ").on("click", function () {
  	   var trainName = $("#train-Name").val();
  	   var destination = $("#destination").val();
  	   var firstTrainTime = $("#first-train-time").val();
  	   var frequency = $("#frequency").val();
  

    var newTrain = {
    	name: trainName,
    	destination: destination,
    	firstTrain: firstTrainTime,
    	frequency: frequency
    };
     
 //Uploads train information to the database
   trainDataInfo.ref().push(newTrain);

    //Console logs to check to see if everything shows up
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
    alert("Train has been added successfully!");

});