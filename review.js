document.addEventListener("DOMContentLoaded", () => {
    function popupMsg(message) {
        const modal = document.getElementById("popupModal");
        const popupMessage = document.getElementById("popupMessage");
        
        // Set the message for the modal
        popupMessage.textContent = message;
        
        // Display the modal
        modal.style.display = "flex";
    
        setTimeout(() => {
          const modal = document.getElementById("popupModal");
          modal.style.display = "none";
        }, 2500);
    }

    const stars = document.querySelectorAll('.star');
    
    // Ensure stars are clickable
    stars.forEach(function(star) {
        star.addEventListener('click', function() {
            const value = parseInt(star.getAttribute('data-value'), 10);
            
            // Loop through all stars and add or remove the 'selected' class based on click
            stars.forEach(function(s) {
                if (parseInt(s.getAttribute('data-value'), 10) <= value) {
                    s.classList.add('selected'); // Add the selected class for stars up to the clicked one
                } else {
                    s.classList.remove('selected'); // Remove the selected class for stars after the clicked one
                }
            });
        });
    });

    // Handle review form submission
    document.getElementById('reviewForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const productSelect = document.getElementById('product'); // Define productSelect
        const product = productSelect.value;
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const productImageUrl = selectedOption ? selectedOption.getAttribute('data-image') : ''; // Get product image URL
        const rating = document.querySelectorAll('.stars .selected').length; // Get the count of selected stars
        const reviewText = document.getElementById('reviewText').value;

        // Validate form inputs
        if (rating === 0) {
            popupMsg('Please provide a rating!');
            return;
        }

        // Create new review in the format similar to cart items
        const reviewsContainer = document.getElementById('reviews');
        const newReview = `
        <div class="review">
            <div class="review-details">
                <div class="review-name">${name}</div>               
                <img class="review-product-image" src="${productImageUrl}" alt="${product}" />
                <h3 class="review-product">${product}</h3>
                <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                <p class="review-text">${reviewText}</p>
            </div>
        </div>`;

        // Append the new review to the reviews container
        reviewsContainer.innerHTML += newReview;

        // Save the review to localStorage for persistence
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ name, product, rating, reviewText, productImageUrl }); // Save the name
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Clear the form after submission
        document.getElementById('reviewForm').reset();

        // Remove the selected stars after submission
        stars.forEach(function(star) {
            star.classList.remove('selected');
        });
    });

    // Load saved reviews from localStorage (if any) and display them
    const reviewsFromStorage = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewsContainer = document.getElementById('reviews');

    reviewsFromStorage.forEach(function (review) {
        const reviewHTML = `
        <div class="review">
            <div class="review-details">
                <div class="review-name">${review.name}</div>
                <img class="review-product-image" src="${review.productImageUrl}" alt="${review.product}" />
                <h3 class="review-product">${review.product}</h3>
                <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p class="review-text">${review.reviewText}</p>
            </div>
        </div>`;
        reviewsContainer.innerHTML += reviewHTML;
    });
});
