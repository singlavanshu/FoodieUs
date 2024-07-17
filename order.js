document.addEventListener('DOMContentLoaded', function() {
    const signinModal = document.getElementById('signin-modal');
    const signupModal = document.getElementById('signup-modal');
    const signinBtn = document.getElementById('signin-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeSignin = document.querySelector('#signin-modal .close');
    const closeSignup = document.querySelector('#signup-modal .close');
    const signinLink = document.getElementById('signin-link');
    const signupLink = document.getElementById('signup-link');

    // Function to open sign-in modal
    function openSigninModal() {
        signinModal.style.display = 'block';
    }

    // Function to close sign-in modal
    function closeSigninModal() {
        signinModal.style.display = 'none';
    }

    // Function to open sign-up modal
    function openSignupModal() {
        signupModal.style.display = 'block';
    }

    // Function to close sign-up modal
    function closeSignupModal() {
        signupModal.style.display = 'none';
    }

    // Event listeners for opening modals
    signinBtn.addEventListener('click', openSigninModal);
    signupBtn.addEventListener('click', openSignupModal);

    // Event listeners for closing modals
    closeSignin.addEventListener('click', closeSigninModal);
    closeSignup.addEventListener('click', closeSignupModal);

    // Event listener for switching to sign-up modal from sign-in modal
    signinLink.addEventListener('click', function(event) {
        event.preventDefault();
        closeSigninModal();
        openSignupModal();
    });

    // Event listener for switching to sign-in modal from sign-up modal
    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        closeSignupModal();
        openSigninModal();
    });

    // Close modals when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === signinModal) {
            closeSigninModal();
        } else if (event.target === signupModal) {
            closeSignupModal();
        }
    });

    // Prevent modal from closing when clicking inside the modal content
    signinModal.querySelector('.modal-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });

    signupModal.querySelector('.modal-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


// Show and hide modals
// function showSignIn() {
//     document.getElementById('signin-modal').style.display = 'flex';
// }

// function closeSignIn() {
//     document.getElementById('signin-modal').style.display = 'none';
// }

// function showSignUp() {
//     document.getElementById('signup-modal').style.display = 'flex';
// }

// function closeSignUp() {
//     document.getElementById('signup-modal').style.display = 'none';
// }

// function showSignUpInstead() {
//     closeSignIn();
//     showSignUp();
// }

// function showSignInInstead() {
//     closeSignUp();
//     showSignIn();
// }

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const viewMenuButtons = document.querySelectorAll('.category-item .btn');
    viewMenuButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const categoryName = button.previousElementSibling.textContent;
            alert(`Fetching menu for ${categoryName}`);
            // Example: Redirect to category-specific menu page
            // window.location.href = button.href;
        });
    });

    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cartTotal');
    const cartActions = document.querySelector('.cart-actions');

    // Add event listener for "Add to Cart" buttons
    document.querySelectorAll('.category-item .btn').forEach(button => {
        button.addEventListener('click', addToCartHandler);
    });

    // Function to handle adding item to cart
    function addToCartHandler(event) {
        event.preventDefault();
        const categoryItem = this.parentElement;
        const itemName = categoryItem.querySelector('h3').textContent;
        const itemPrice = parseFloat(categoryItem.querySelector('.item-price').textContent.replace('$', ''));

        addToCart(itemName, itemPrice);
    }

    // Function to add item to cart
    function addToCart(itemName, itemPrice) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="item-name">${itemName}</span>
            <span class="item-price">$${itemPrice.toFixed(2)}</span>
            <button class="btn-remove">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        // Update total amount
        updateCartTotal();
    }

    // Function to update cart total
    function updateCartTotal() {
        const cartItemPrices = Array.from(cartItems.querySelectorAll('.item-price')).map(item => parseFloat(item.textContent.replace('$', '')));
        const totalAmount = cartItemPrices.reduce((acc, curr) => acc + curr, 0);
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    // Event delegation for cart actions (remove, clear, checkout)
    cartActions.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove')) {
            event.target.parentElement.remove();
            updateCartTotal();
        }
    });
});
