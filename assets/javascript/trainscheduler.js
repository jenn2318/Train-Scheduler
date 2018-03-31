//===================================================================================
//Global Variables I will need for functions later/Decided to change these
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

  //First thing will be to add train information/Variables to pull train data
  //=========================================================================

  $("#add-train-btn").on("click", function () {
  	   var trainName = $("#train-Name").val();
  	   var destination = $("#destination").val();
  	   // var firstTrainTime = $("#first-train-time").val();
  	   var frequency = $("#frequency").val();
       var nextArrival = $("#firstTrain").val();
  

      var newTrain = {
    	name: trainName,
    	destination: destination,
    	firstTrain: firstTrain,
    	frequency: frequency 
      // nextArrival: nextArrival 
    
    };

     
 //Uploads train information to the database
   trainDataInfo.ref().push(newTrain);
    //Console logs to check to see if everything shows up
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainStart);
    console.log(newTrain.frequency);
    alert("Train has been added successfully!");

  //Clear out data from train entered
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainStart").val("");
  $("#frequency").val("");

  //Next train arrives
  return false;
});  

  //Moment Functions Below for figuring time of Trains
  //==================================================

  trainDataInfo.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

    //Making variables for the data
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().destination;
    var trFirstTrain = childSnapshot.val().firstTrain;
    var trFrequency = childSnapshot.val().frequency
    var trnextArrival = childSnapshot.val().nextArrival
    var trminutesAway = '';
 

  // Frequency that train comes to the station
    var tFrequency = 20;

    // Time is 8:30 AM
    var firstTime = "08:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current 
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minutes Before Train
    var trminutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trminutesAway);

    // Next Train
    var nextTrain = moment().add(trminutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    //Add train data to the table
    //===========================================================================================
$(".table").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" + trFirstTrain + "</div>" + "<td>" + trFrequency + "</td><td>" + trminutesAway + "</td></tr>");

});