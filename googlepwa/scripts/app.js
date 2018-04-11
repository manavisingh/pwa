
(function() {
  'use strict';

var injectedData = [{
    ImageUrl: "https://www.hindustantimes.com///rf///image_size_960x540///HT///p2///2018///04///10///Pictures///supporter-sharma-dhingra-struggles-rjaiv-depression-kapil_a8bef8b0-3c87-11e8-bac8-9a0e74ac6915.JPG/",
    Title: "Preeti Simoes drove Kapil Sharma into depression, says comedian’s friend"
},
{
    Title: "Jimmy Kimmel tries to end verbal spat with Sean Hannity", ImageUrl: "https://indianexpressonline.files.wordpress.com/2018/04/jimmy-kimmel-759.jpg"
}]

  var weatherAPIUrlBase = 'https://publicdata-weather.firebaseio.com/';

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    spinnerContent: document.querySelector('.spinner-content'),
    container: document.querySelector('.main'),
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  /* Event listener for refresh button */
  document.getElementById('butRefresh').addEventListener('click', function() {
      console.log("you clicked refreshed");
    app.updateForecasts();
      //populateData();
  });

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/
    
  // Updates a weather card with the latest weather forecast. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateForecastCard = function(data) {
    
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };

function populateData(json){
    if (!json){
        console.log("no json found!");
    }
    else{
        //var cont = document.getElementById('cont');
        //var imgDiv = document.getElementById('imgDiv');
	
    for (var i = 0;i < json.length; i++){
        //inserting img tag
        var img = document.createElement('img');
        img.src = json[i].ImageUrl;
        app.container.appendChild(img);

        //inserting Text
        var textDiv = document.createElement('div');
        textDiv.id = "textDiv";
        var p = document.createElement('p');
        p.innerHTML = json[i].Title;
        textDiv.appendChild(p);
        app.container.appendChild(textDiv); 
        }
    }
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.spinnerContent.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
}
    
  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'http://ec2-18-218-237-27.us-east-2.compute.amazonaws.com:8080/provider-service/api/v1/newsList?idList=3' , true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
            //app.spinnerContent.style.display = "none";
            //app.spinner.style.display = "none";
          }
    };
   
    xobj.setRequestHeader("X-AUTH", "fef09984-cd7a-4a03-9588-8ecaf2f50a3c");
    xobj.send();  
    console.log("request sent");
 }

function load() {
    
    loadJSON("data.json", function(response) {
        var actual_JSON = JSON.parse(response);
        //console.log(response);
        var actual_data = JSON.parse(actual_JSON[3]);
        console.log(actual_data);
        populateData(actual_data);
    });
}

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updateForecasts = function() {
    load();
  };

populateData(injectedData);

      if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/testdir/googlepwa/service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
    
})();
