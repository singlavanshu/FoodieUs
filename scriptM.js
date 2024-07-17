// Modal handling
const signInModal = document.getElementById("signInModal");
const signUpModal = document.getElementById("signUpModal");
const signInLink = document.getElementById("signInLink");
const signUpLink = document.getElementById("signUpLink");
const closeSignIn = document.getElementById("closeSignIn");
const closeSignUp = document.getElementById("closeSignUp");
const switchToSignUp = document.getElementById("switchToSignUp");
const switchToSignIn = document.getElementById("switchToSignIn");

signInLink.onclick = function() {
    signInModal.style.display = "block";
}

signUpLink.onclick = function() {
    signUpModal.style.display = "block";
}

closeSignIn.onclick = function() {
    signInModal.style.display = "none";
}

closeSignUp.onclick = function() {
    signUpModal.style.display = "none";
}

switchToSignUp.onclick = function() {
    signInModal.style.display = "none";
    signUpModal.style.display = "block";
}

switchToSignIn.onclick = function() {
    signUpModal.style.display = "none";
    signInModal.style.display = "block";
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == signInModal) {
        signInModal.style.display = "none";
    }
    if (event.target == signUpModal) {
        signUpModal.style.display = "none";
    }
}
