//===================================================================================
//Global Variables I will need for functions later
//===================================================================================
var currentTime = moment.format('HH:mm');
var childData = snapshot.val();
var trainName = '';
var Destination = '';
var trainFrequency = '';
var nextArrival = '';
var minutes Away = '';

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