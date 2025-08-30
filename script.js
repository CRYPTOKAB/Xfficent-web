// ===== DARK MODE =====
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// ===== SCROLL TO PRODUCTS =====
function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior:'smooth' });
}

// ===== BUY NOW PLACEHOLDER =====
function buyNow(product) {
  alert(`Buying Specimen X ${product} coming soon!`);
}

// ===== SCROLL ANIMATION FOR CARDS =====
const cards = document.querySelectorAll('[data-animate]');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight / 5 * 4;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});

// ===== GOOGLE SIGN-IN =====
function handleCredentialResponse(response) {
  // Decode JWT to get user info
  const base64Url = response.credential.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const user = JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')));
  
  const userDiv = document.getElementById('userInfo');
  userDiv.innerHTML = `
    <p>Signed in as: <strong>${user.name}</strong></p>
    <img src="${user.picture}" alt="Profile Picture" style="width:50px; border-radius:50%;">
  `;
  
  // Hide Google Sign-in button after login
  document.getElementById('signinBtn').style.display = 'none';
}

// Initialize Google Sign-In
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "YOUR_CLIENT_ID_HERE", // <-- Replace with your actual client ID
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("signinBtn"), 
    { theme: "outline", size: "large" }
  );

  google.accounts.id.prompt(); // Optional: show One Tap
};
