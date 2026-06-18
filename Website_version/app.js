// app.js

// 1. Custom Alert System
function showAlert(title, message, type = 'info') {
    const container = document.getElementById('alertContainer');
    if (!container) return;

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        </div>
        <div class="alert-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
}

// 2. Authentication Check (Protect Routes)
async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = user;
    
    // Fetch user profile
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
    if (error) {
        console.error('Profile fetch error:', error);
    } else {
        userProfile = data;
        updateUserUI();
    }
}

// 3. Update UI with User Data
function updateUserUI() {
    if (!userProfile) return;
    
    const userName = document.querySelector('.user-name');
    const userRole = document.querySelector('.user-role');
    const userImg = document.querySelector('.user-profile img');
    
    if (userName) userName.textContent = `${userProfile.first_name} ${userProfile.last_name}`;
    if (userRole) userRole.textContent = userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1);
    if (userImg) {
        userImg.src = `https://ui-avatars.com/api/?name=${userProfile.first_name}+${userProfile.last_name}&background=6366f1&color=fff`;
    }
}

// 4. Number Animation for Stats
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// 5. Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Trigger animations if on landing page
    if (document.querySelector('.hero')) {
        animateNumbers();
    }
});