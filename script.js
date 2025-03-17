// Function to fetch multiple food images from the API
let gestureBox = document.getElementById("gestureBox")
const imgButton = document.getElementById("food-btn")

imgButton.addEventListener("touchstart", function(){
    getFoodPics(5);
});

function getFoodPics(amount) {
    let requests = []; // Array to store multiple API requests
  
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

  getFoodPics(5);
  
  function updateScreen(){
    gestureBox.style.backgroundImage = "url('"+ imgList[imageIndex] +"')";
}



