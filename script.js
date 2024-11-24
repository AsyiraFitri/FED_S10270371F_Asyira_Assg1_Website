document.addEventListener("DOMContentLoaded", () => {
    const carouselImages = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-image");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
  
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
  });