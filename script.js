document.addEventListener("DOMContentLoaded", () => {
  //Menu for navigation bar on media view
  const MenuItems = document.getElementById("MenuItems");
  MenuItems.style.maxHeight = "0px";

  const menuIcon = document.querySelector(".menu-icon");
  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      if (MenuItems.style.maxHeight === "0px") {
        MenuItems.style.maxHeight = "980px";
      } else {
        MenuItems.style.maxHeight = "0px";
      }
    });
  }

  //Carousell image function on HOME
  const carouselImages = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-image");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  if (carouselImages && images.length > 0 && prevButton && nextButton) {
    let currentIndex = 0;


    // Function to update the carousel position
    const updateCarousel = () => {
      const imageWidth = images[0].clientWidth;
      carouselImages.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    };

    // Show the previous image
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      updateCarousel();
    });

    // Show the next image
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    });

    // Auto-slide the carousel every 3 seconds
    setInterval(() => {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    }, 3000);

    // Adjust the carousel on window resize
    window.addEventListener("resize", updateCarousel);
  }

  // PRODUCT FILTER
  const categoryFilter = document.getElementById("category-filter");
  const productCards = document.querySelectorAll(".product-card");
  
  if (categoryFilter && productCards) {
    categoryFilter.addEventListener("change", () => {
      const selectedCategory = categoryFilter.value.toLowerCase(); // Dropdown value
  
      productCards.forEach((card) => {
        const cardCategories = card.getAttribute("data-category").toLowerCase(); // Categories in card
  
        if (!selectedCategory || cardCategories.split(" ").includes(selectedCategory)){
          card.style.display = "block"; // Show matching cards
        } else {
          card.style.display = "none"; // Hide non-matching cards
        }
      });
    });
  } 

  //INDIVIDUAL PRODUCT FUNCTIONS--- color options, image match with color-update image, item quantity and size, {add to cart}
  // Selecting the small images and main image
  const smallImages = document.querySelectorAll('.smallimg');
  const mainImage = document.querySelector('.main-image img');
  const colorOptions = document.querySelectorAll(".color-option");
  // Function to update the main image
  function updateMainImage(newSrc) {
    if (newSrc) {
      mainImage.src = newSrc;
    }
  }
  // Add event listeners to small images
  smallImages.forEach((img) => {
    img.addEventListener("click", () => {
      // Update the main image to match the small image
      updateMainImage(img.getAttribute('data-image'));

      //highlight selected small image
      smallImages.forEach((img) => img.classList.remove("active"));
      img.classList.add("active");

      // Update the color options to match the selected small image
      const selectedColor = img.getAttribute("data-color");
      colorOptions.forEach((opt) => {
        if (opt.getAttribute("data-color") === selectedColor) {
          opt.classList.add("active");
        } else {
          opt.classList.remove("active");
        }
      });
    });
  });

  // Add event listeners to color options
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Get the selected color
      const color = option.getAttribute("data-color");
  
      // Find the corresponding small image for the selected color
      const matchingSmallImage = Array.from(smallImages).find(
        (img) => img.getAttribute("data-color") === color
      );
  
      // Update the main image to match the selected color's image
      if (matchingSmallImage) {
        updateMainImage(matchingSmallImage.getAttribute('data-image'));
  
        // Highlight the selected color option
        colorOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
      }
    });
  });

  // ADD TO CART FUNCTON
  const addToCartButton = document.querySelector(".add-to-cart");

  if (addToCartButton && colorOptions.length > 0) {
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      colorOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");


      // Update the main image based on the selected color
      const newImage = option.dataset.image;
      updateMainImage(newImage);

      smallImages.forEach((img) => img.classList.remove("active"));
      });
    });
  }

  function getSelectedColor() {
    const selectedColor = document.querySelector(".color-option.active");
    return selectedColor ? selectedColor.dataset.color : "Not selected";
  }
  function getSelectedSize() {
    const selectedSize = document.querySelector("#size");
    return selectedSize ? selectedSize.value : "Not selected";
  }

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const product = {
        name: document.querySelector(".indivprod-title").innerText,
        price: parseFloat(
          document.querySelector(".indivprod-price-discounted") 
            ? document.querySelector(".indivprod-price-discounted").innerText.replace("$", "")
            : document.querySelector(".indivprod-price").innerText.replace("$", "")
        ),
        color: getSelectedColor(),
        size: getSelectedSize(),
        image: document.querySelector(".main-image img").src,
        quantity: parseInt(document.querySelector(".quantity").value) || 1,
      };

      if (product.color === "Not selected") {
        alert("Please select a color.");
        return;
      }

      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = cartItems.findIndex(
        (item) => item.name === product.name && item.color === product.color && item.size === product.size
      );

      if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += product.quantity;
      } else {
        cartItems.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert("Item added to cart!");
    });
  }

  // CART-- product details and cart summary
  const cartContainer = document.querySelector(".cart-items");
  const cartSummary = document.querySelector(".cart-summary");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const checkoutContainer = document.querySelector(".checkout");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if cart is empty
  if (cartItems.length === 0) {
    // If cart is empty, show the "empty cart" message
    emptyCartMessage.style.display = "block";
    cartContainer.style.display = "none";
    cartSummary.style.display = "none";
    checkoutContainer.style.display = "none";
  } else {
    // If cart has items, populate them
    emptyCartMessage.style.display = "none";
    cartContainer.style.display = "block";
    cartSummary.style.display = "block";
    checkoutContainer.style.display = "block";
      let subtotal = 0;
    cartItems.forEach((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      cartContainer.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-img-container">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            </div>
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <p class="cart-item-color">Color: <span>${item.size}</span></p>
              <p class="cart-item-color">Color: <span>${item.color}</span></p>
              <p class="cart-item-price">Price: <span>$${item.price}</span></p>
              <a href="#" class="remove-link" data-index="${index}">Remove</a>
            </div>
            <div class="cart-item-quantity">
              <label for="quantity-${index}">Quantity:</label>
              <input type="number" value="${item.quantity}" class="quantity-input" data-index="${index}" min="1" id="quantity-${index}">
            </div>
            <div class="cart-item-subtotal">
              <p>$${itemSubtotal.toFixed(2)}</p>
            </div>
        </div>`;
    });

    const gst = subtotal * 0.07;
    const total = subtotal + gst;

    cartSummary.innerHTML = `
    <div class="cart-summary">
      <p class="summary-item"><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
      <p class="summary-item"><strong>7% GST:</strong> $${gst.toFixed(2)}</p>
      <p class="summary-item total"><strong>Total:</strong> $${total.toFixed(2)}</p>
    </div>`;
    document.querySelectorAll(".remove-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const index = event.target.dataset.index;
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        location.reload();
      });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (event) => {
        const index = event.target.dataset.index;
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) {
          cartItems[index].quantity = newQuantity;
          localStorage.setItem("cart", JSON.stringify(cartItems));
          location.reload();
        }
      });
    });
  }
});