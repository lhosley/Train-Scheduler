// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFCUWUCxs9TFaGF7jkpI6A26hFhzP0WqM",
    authDomain: "train-scheduler-smu-bootcamp.firebaseapp.com",
    databaseURL: "https://train-scheduler-smu-bootcamp.firebaseio.com",
    projectId: "train-scheduler-smu-bootcamp",
    storageBucket: "train-scheduler-smu-bootcamp.appspot.com",
    messagingSenderId: "949980386441"
  };


  firebase.initializeApp(config);

  var database = firebase.database();
 

$("#submit").on("click", function (event) {
    event.preventDefault();
   
    var train = $("#trainname").val().trim();
    var dest = $("#destination").val().trim();
    var time = $("#firstTrain").val().trim();
    var freq = $("#trainFreq").val().trim();
    
    
    if(train === "" || dest === "" || time === "" | freq === ""){
        alert("Field is Missing");
    }else{
    
    
    database.ref().push({
        train: train,
        destination: dest,
        time: time,
        freq: freq,
    });

    $("#trainname").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#trainFreq").val("");
}

});


database.ref().on("child_added", function (childSnapshot) {

  
    var train = childSnapshot.val().train;
    var destination = (childSnapshot.val().destination);
    var time = (childSnapshot.val().time);
	var freq = (childSnapshot.val().freq);

	var convertedTime = moment(time, "HH:mm");
   
    var currentTime = moment();
    
    var timeMinutes = currentTime.diff(convertedTime, "minutes");
  
    var frequency = timeMinutes % freq;
    
    var mintuesaway = freq - frequency;
    
    var arrival = (currentTime).add(mintuesaway, "minutes").format("HH:mm");    var convertedTime = moment(time, "HH:mm");
   
    var currentTime = moment();
    
    var timeMinutes = currentTime.diff(convertedTime, "minutes");
  
    var frequency = timeMinutes % freq;
    
    var mintuesaway = freq - frequency;
    
    var arrival = (currentTime).add(mintuesaway, "minutes").format("HH:mm");

    console.log("Train: "+ train, "destination: " + destination, "time" + time,"frequency: "+ freq);
	
	console.log("Converted Time: " + convertedTime.format("HH:mm"));
	
	console.log("Current: " + moment(currentTime).format("HH:mm"));
	
	console.log("Time in Minute: "+timeMinutes);
	
	console.log("Remainder: " +frequency);
	
	console.log("Minutes til next train: " + mintuesaway);
	
	console.log("Next arrivial time: " + arrival);

   

      var addrow = $("<tr>").append(
         $("<td>").text(train),
         $("<td>").text(destination),
         $("<td>").text(freq),
         $("<td>").text(arrival),
         $("<td>").text(mintuesaway)
        );

        $("#trainSchedule").append(addrow);

   
}, function (error) {
    console.log("Errors: " + error.code);
});