window.onload = function () {
  getAllProductsByCategory ()
}

function getAllProductsByCategory() {
  return fetch("http://localhost:8081/api/categories")
    .then(response => response.json())
    .then(categories => {
      loadDropdownlistforCategories(categories); // Pass the categories data to the function
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}

// Category ID
const selectedCategory = document.querySelector('#search-cat')

function loadDropdownlistforCategories(categories) {
  // RESET THE LIST
  selectedCategory.replaceChildren();
  // Troubleshoot for arguments
  // console.log(categories); 
  selectedCategory.onchange = showAllProductsbyCategory
  for (const item of categories) {
    const option = document.createElement('option')
    option.value = item.categoryId;
    option.innerText = item.name;
    selectedCategory.append(option)
  }    
}

function showAllProductsbyCategory () {
  const categoryId = selectedCategory.value
  return fetch("http://localhost:8081/api/categories/" + categoryId)
    .then(response => response.json())
    .then(loadDropdownlistforAll)
}

function loadDropdownlistforAll(products) {
  const selectedProduct = document.querySelector('#productById')
  // RESET THE LIST
  selectedProduct.replaceChildren();
  
  for (const product of products) {
    const option = document.createElement('option')
    option.value = product.productId;
    option.innerText = product.productName;
    selectedProduct.append(option)
  }
  // Troubleshoot for arguments
  console.log(products);
  selectedProduct.onchange = displayModalofProduct
}

// Modal Box Location
const parentElement = document.querySelector("main")

function displayModalofProduct (element) {
  const mainCard = document.createElement("div");
  mainCard.classList.add("main-card");

  const titleText = document.createElement("h2");
  titleText.innerText = element.productName;
  console.log(titleText.innerText)
  mainCard.appendChild(titleText);

  parentElement.appendChild(mainCard)

}


