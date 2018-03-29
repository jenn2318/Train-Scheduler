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
       var nextArrival = $("#firstTrainStart").val();
  

      var newTrain = {
    	name: trainName,
    	destination: destination,
    	firstTrain: firstTrainStart,
    	frequency: frequency
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
    var trName = childSnapshot.val().trainName;
    var trDestination = childSnapshot.val().destination;
    var trFirstTrain = childSnapshot.val().firstTrainStart;
    var trFrequency = childSnapshot.val().frequency
  });

  // Frequency that train comes to the station
    var tFrequency = 45;

    // Time is 8:30 AM
    var firstTime = "08:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //Add train data to the table
    //===========================================================================================
$(".table").append("<td>" +trainName + "</td>" + "<td>" +destination + "</td>" + "<td>" +firstTrainStart + "</div>" + "<td>" +frequency + "</td>" + "<td>" +nextArrival + "</td>");
