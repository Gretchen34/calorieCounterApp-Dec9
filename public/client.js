var input = "";
var totalCals = "";
var calNum = 0;
var numOfCards = 0;

function setInput() {
  input = document.getElementById("uI").value;
  var enterInput = document.getElementById("uI");
  enterInput.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("inButtn").click();
    }
  });
  document.getElementById("top").innerHTML = "";
  everythingElse();
} //setInput

function everythingElse() {
  //Backup key
  //q1dRculyOX8TvH5PMJxPVFx2KdfJd6aZHfNE2gb6

  //  Food Central General Search
  const url_fd =
    "https://api.nal.usda.gov/fdc/v1/search?api_key=6AKY2I3uUXFL2W0I4kLI40cEfI4OZ9oEweD3G3Ft"; //q1dRculyOX8TvH5PMJxPVFx2KdfJd6aZHfNE2gb6";

  let fetchData = {
    method: "POST",
    body: '{"generalSearchInput":"' + input + '"}',
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(url_fd, fetchData) //fetch((proxyUrl + url_fd), fetchData)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(req) {})
    .catch(function(error) {
      //  console.log("Error with Food Central API: " + error);
    });

  fetch(url_fd, fetchData) //fetch((proxyUrl + url_fd), fetchData)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      document.getElementById("top").innerHTML =
        "<div id='sr'>Search Results: </div>";
      for (var i = 0; i < data.foods.length; i++) {
        var list = document.getElementById("top");
        if (data.foods[i].description) {
          list.innerHTML +=
            "<div onclick='nutrientFacts(" +
            data.foods[i].fdcId +
            ")' id='gs" +
            i +
            "' class='listItem'>" +
            "<div class='cardHead'>" +
            data.foods[i].description +
            "</div>";
          list = document.getElementById("gs" + i);

          if (data.foods[i].brandOwner) {
            list.innerHTML +=
              "<p class='listSH'>Brand: " + data.foods[i].brandOwner + "</p>";
          }

          if (data.foods[i].additionalDescriptions) {
            list.innerHTML +=
              "<p class ='listSH'>" +
              data.foods[i].additionalDescriptions +
              "</p>";
          } //if brand owner

          list.innerHTML += "</div><br>";
        } //if title
      } //for

      //load(data);
    })
    .catch(function(error) {
      // console.log("Error with Food Central API: " + error);
    });
} //everythingElse

function nutrientFacts(iD) {
  //  Food Central Specific Item
  const url_fd2 =
    "https://api.nal.usda.gov/fdc/v1/" +
    iD +
    "?api_key=6AKY2I3uUXFL2W0I4kLI40cEfI4OZ9oEweD3G3Ft"; //q1dRculyOX8TvH5PMJxPVFx2KdfJd6aZHfNE2gb6";

  fetch(url_fd2) // fetch((proxyUrl + url_fd2))
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data2) {
      document.getElementById("c").innerHTML = "Chosen Foods:";
      var visible = document.getElementById("toper");

      if (data2.description) {
        visible.innerHTML +=
          "<div class= 'card' id=r" +
          numOfCards +
          "> " +
          " <div class='cardHead'>" +
          data2.description +
          "</div class='cardHead'>";
        visible = document.getElementById("r" + numOfCards);
        if (data2.foodNutrients[3]) {
          visible.innerHTML +=
            "<p>Calories: " + data2.foodNutrients[3].amount + "</p>";
          calNum += parseInt(data2.foodNutrients[3].amount);
          totalCals = calNum;
        } //set calories

        if (data2.foodNutrients[1]) {
          visible.innerHTML +=
            "<p>Fat: " + data2.foodNutrients[1].amount + "</p>";
        } //set fat

        if (data2.foodNutrients[15]) {
          visible.innerHTML +=
            "<p>Sodium: " + data2.foodNutrients[15].amount + "g</p>";
        } //set sodium

        if (data2.foodNutrients[2]) {
          visible.innerHTML +=
            "<p>Carbohydrates: " + data2.foodNutrients[2].amount + "</p>";
        } //set carbs

        if (data2.foodNutrients[8]) {
          visible.innerHTML +=
            "<p>Sugar: " + data2.foodNutrients[8].amount + "g</p>";
        } //set sugar

        if (data2.foodNutrients[0]) {
          visible.innerHTML +=
            "<p>Protein: " + data2.foodNutrients[0].amount + "</p>";
        } //set protein

        visible.innerHTML += "</div>";

        document.getElementById("tCal").innerHTML = totalCals + " ";

        numOfCards += 1;
      } // set name
    }) //.then
    .catch(function(error) {
      //  console.log("Error with Food Central API: " + error);
    }); //catch
} //nutrientFacts
