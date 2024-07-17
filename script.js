// JavaScript for expanding testimonials
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('show-more-btn');
    const testimonials = document.querySelectorAll('.testimonials-grid blockquote');

    const maxVisibleTestimonials = 3; // Number of testimonials initially visible
    let currentVisibleTestimonials = maxVisibleTestimonials;

    // Hide testimonials initially
    for (let i = maxVisibleTestimonials; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
    }

    // Toggle visibility of additional testimonials on button click
    showMoreBtn.addEventListener('click', function() {
        for (let i = maxVisibleTestimonials; i < testimonials.length; i++) {
            if (testimonials[i].style.display === 'none') {
                testimonials[i].style.display = 'block';
            } else {
                testimonials[i].style.display = 'none';
            }
        }

        // Toggle button text based on current visibility
        if (currentVisibleTestimonials === maxVisibleTestimonials) {
            showMoreBtn.textContent = 'Show Less';
            currentVisibleTestimonials = testimonials.length;
        } else {
            showMoreBtn.textContent = 'Show More';
            currentVisibleTestimonials = maxVisibleTestimonials;
        }
    });
});

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
function showSignIn() {
    document.getElementById('signin-modal').style.display = 'flex';
}

function closeSignIn() {
    document.getElementById('signin-modal').style.display = 'none';
}

function showSignUp() {
    document.getElementById('signup-modal').style.display = 'flex';
}

function closeSignUp() {
    document.getElementById('signup-modal').style.display = 'none';
}

function showSignUpInstead() {
    closeSignIn();
    showSignUp();
}

function showSignInInstead() {
    closeSignUp();
    showSignIn();
}

// Handle Sign-In Form Submission
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            updateNav();
            closeSignIn();
            alert('Sign in successful!');
        } else {
            alert('Sign in failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign in failed!');
    });
}

// Handle Sign-Up Form Submission
function handleSignUp(event) {
    event.preventDefault();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Sign up successful! Please sign in.');
            showSignInInstead();
        } else {
            alert('Sign up failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign up failed!');
    });
}

// Update Navigation Bar after Sign-In
function updateNav() {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('authLinks').style.display = 'none';
        document.getElementById('profileDropdown').style.display = 'block';
    } else {
        document.getElementById('authLinks').style.display = 'block';
        document.getElementById('profileDropdown').style.display = 'none';
    }
}

// Log Out
function logout() {
    localStorage.removeItem('token');
    updateNav();
    alert('Logged out successfully!');
}

// Toggle profile dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('profileMenu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Initialize
document.addEventListener('DOMContentLoaded', updateNav);

