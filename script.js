// id's/
const FoodBtn = document.getElementById("food-btn");
const gestureBox = document.getElementById("gestureBox");
const output = document.getElementById("output");
let numPics = 0;
let startX, startY, endX, endY;
let imageIndexLength = 0

// Food APi

// Update screen
function updateScreen(){
    gestureBox.style.backgroundImage = "url('"+ imgList[imageIndex]+"')"
    console.log(imgList[imageIndex])
    imageIndexLength = imageIndex.length
}

// Function to fetch multiple food images from the API
function getFoodPics(amount) {
  let requests = []; // Array to store multiple API requests
  numPics = amount;
  for (let i = 0; i < amount; i++) {
    let request = fetch("https://foodish-api.com/api/") // Fetch a random food image
      .then(response => response.json())
      .then(data => data.image)
      .catch(error => console.error("Error fetching image:", error));

    requests.push(request);
  }

  Promise.all(requests).then((images) => { // Wait for all fetch requests to complete
    imgList = images; // Store the fetched images in a list
    imageIndex = 0; // Start at the first image in the list
    updateScreen(); // Display the first image
  });
}


// Touch Events
FoodBtn.addEventListener("touchstart", function(){
    getFoodPics(15);
    FoodBtn.style.display = "none";
});

//detects swipe 
gestureBox.addEventListener("touchstart", function(event) {
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
    output.textContent = "Touch started";
});

gestureBox.addEventListener("touchend", function(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    let diffX = endX - startX;
    let diffY = endY - startY;
    let imageIndexLength = imageIndex.length
    
    if (Math.abs(diffX) > Math.abs(diffY)) {


        if (diffX > 0) {
            console.log("User Swiped right")
            output.textContent = "You've Swiped Right";
            if (imageIndex <= numPics) {
              imageIndex += 1;
            }
            updateScreen()
            let length = imageIndex.length;
        } else {
            console.log("User Swiped left")
            output.textContent = "You've Swiped Left";

          if (imageIndex > 0) {
              imageIndex -= 1;
              updateScreen();
            }
        }
    }
});
console.log(imageIndexLength)