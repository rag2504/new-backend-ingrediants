const recipes = [
  "Plain Roti", "Tandoori Roti", "Butter Naan", "Garlic Naan", "Lachha Paratha", 
  "Aloo Paratha", "Gobi Paratha", "Paneer Paratha", "Methi Paratha", "Missi Roti", 
  "Rumali Roti", "Kulcha (Plain)", "Amritsari Kulcha", "Plain Steamed Rice", 
  "Jeera Rice", "Veg Biryani", "Chicken Biryani", "Mutton Biryani", "Egg Biryani", 
  "Prawn Biryani", "Hyderabadi Biryani (Veg)", "Hyderabadi Biryani (Non-Veg)", 
  "Lemon Rice", "Tamarind Rice", "Coconut Rice", "Khichdi (Plain)", "Masala Khichdi", 
  "Curd Rice", "Vegetable Pulao", "Peas Pulao", "Kashmiri Pulao", "Fried Rice (Veg)", 
  "Fried Rice (Egg)", "Fried Rice (Chicken)", "Schezwan Fried Rice", "Dal Tadka", 
  "Dal Fry", "Dal Makhani", "Moong Dal (Yellow)", "Chana Dal", "Masoor Dal", 
  "Toor Dal", "Gujarati Dal", "Rajma Masala", "Lobia Curry (Black-Eyed Peas)", 
  "Pindi Chole (Chickpeas)", "Dhaba Style Dal", "Dal Panchmel", "Sambar"
]; // Add more as needed

// Function to display the dish list
function displayDishes(searchTerm = "") {
    const dishList = document.getElementById("dish-list");
    dishList.innerHTML = "";

    recipes.filter(dish => dish.toLowerCase().includes(searchTerm.toLowerCase()))
           .forEach(dish => {
               const li = document.createElement("li");
               li.textContent = dish;
               li.classList.add("dish-item");
               li.addEventListener("click", () => fetchDishDetails(dish));
               dishList.appendChild(li);
           });
}

// Function to fetch and display dish details
async function fetchDishDetails(dishName) {
    const response = await fetch("Final1.csv");
    const data = await response.text();
    const rows = data.split("\n").map(row => row.split(","));

    const headers = rows[0];
    const dishIndex = headers.indexOf("Name");
    const dishData = rows.find(row => row[dishIndex] === dishName);

    if (dishData) {
        const detailsDiv = document.getElementById("dish-details");
        detailsDiv.innerHTML = `<h2>${dishData[dishIndex]}</h2>`;
        headers.forEach((header, i) => {
            if (i !== dishIndex) {
                detailsDiv.innerHTML += `<p><strong>${header}:</strong> ${dishData[i]}</p>`;
            }
        });
    }
}

// Event listener for search functionality
document.getElementById("search-input").addEventListener("input", (e) => {
    displayDishes(e.target.value);
});

// Initialize the dish list
displayDishes();
