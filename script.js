// id's/
const FoodBtn = document.getElementById("food-btn");
const gestureBox = document.getElementById("gestureBox");
const output = document.getElementById("output");
const modeToggleBtn = document.getElementById("mode-toggle");
let numPics = 0;
let startX, startY, endX, endY;
let imageIndexLength = 0;

// Sound effects
const swipeSound = new Audio("swipe.mp3");
const clickSound = new Audio("click.mp3");

// Food API

// Update screen
function updateScreen(){
    gestureBox.style.backgroundImage = "url('"+ imgList[imageIndex]+"')";
    gestureBox.style.backgroundSize = "cover";
    gestureBox.style.backgroundPosition = "center";
    console.log(imgList[imageIndex]);
    imageIndexLength = imgList.length;
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
    imageIndex = Math.floor(Math.random() * numPics); // Start at a random image
    updateScreen(); // Display the first image
    clickSound.play(); // Play click sound when generating images
  });
}

// Touch Events
FoodBtn.addEventListener("touchstart", function(){
    getFoodPics(15);
    FoodBtn.style.display = "none";
});

// Detects swipe 
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
    let imageIndexLength = imgList.length;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            console.log("User Swiped Right");
            output.textContent = "You've Swiped Right";
            swipeSound.play();
            if (numPics > 0) {
                imageIndex = Math.floor(Math.random() * numPics);
                updateScreen();
            } else {
                output.textContent = "You've reached the end!";
            }
        } else {
            console.log("User Swiped Left");
            output.textContent = "You've Swiped Left";
            swipeSound.play();
            if (numPics > 0) {
                imageIndex = Math.floor(Math.random() * numPics);
                updateScreen();
            } else {
                output.textContent = "You've reached the beginning!";
            }
        }
    }
});
console.log(imageIndexLength);

// Dark Mode Toggle
modeToggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    clickSound.play();
});