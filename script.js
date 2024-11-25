document.addEventListener("DOMContentLoaded", () => {
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
});
