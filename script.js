// Get form elements
const form = document.getElementById('registerForm');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordHint = document.querySelector('.password-hint');
const passwordMatch = document.querySelector('.password-match');

// Password strength checker
function checkPasswordStrength(pass) {
    let strength = 0;
    
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
    
    return strength;
}

// Update password hint
password.addEventListener('input', function() {
    const strength = checkPasswordStrength(this.value);
    
    if (this.value.length === 0) {
        passwordHint.textContent = '';
        passwordHint.className = 'password-hint';
        return;
    }
    
    if (strength <= 2) {
        passwordHint.textContent = '✿ Weak password - add more characters and variety';
        passwordHint.className = 'password-hint weak';
    } else if (strength <= 3) {
        passwordHint.textContent = '✿ Medium password - getting better!';
        passwordHint.className = 'password-hint medium';
    } else {
        passwordHint.textContent = '✿ Strong password - perfect!';
        passwordHint.className = 'password-hint strong';
    }
    
    // Also check if passwords match when typing in password field
    if (confirmPassword.value) {
        checkPasswordsMatch();
    }
});

// Check if passwords match
function checkPasswordsMatch() {
    if (confirmPassword.value.length === 0) {
        passwordMatch.textContent = '';
        passwordMatch.className = 'password-match';
        return;
    }
    
    if (password.value === confirmPassword.value) {
        passwordMatch.textContent = '✿ Passwords match!';
        passwordMatch.className = 'password-match success';
        confirmPassword.classList.remove('error');
        confirmPassword.classList.add('success');
    } else {
        passwordMatch.textContent = '✿ Passwords do not match';
        passwordMatch.className = 'password-match error';
        confirmPassword.classList.add('error');
        confirmPassword.classList.remove('success');
    }
}

// Check password match on confirm password input
confirmPassword.addEventListener('input', checkPasswordsMatch);

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check if passwords match
    if (password.value !== confirmPassword.value) {
        alert('♡ Please make sure your passwords match!');
        confirmPassword.focus();
        return;
    }
    
    // Check password strength
    if (checkPasswordStrength(password.value) < 2) {
        alert('♡ Please use a stronger password for your security!');
        password.focus();
        return;
    }
    
    // Check terms and conditions
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('♡ Please accept the terms & conditions to continue!');
        termsCheckbox.focus();
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    console.log('Form submitted successfully! ✿', data);
    
    // Show success message
    showSuccessMessage();
});

// Show success message
function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 182, 193, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.5s ease;
    `;
    
    const message = document.createElement('div');
    message.style.cssText = `
        background: white;
        padding: 50px;
        border-radius: 30px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        animation: scaleIn 0.5s ease;
    `;
    
    message.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px;">🎀</div>
        <h2 style="font-family: 'Playfair Display', serif; color: #d17a9e; font-size: 32px; margin-bottom: 15px;">
            Registration Successful!
        </h2>
        <p style="font-family: 'Cormorant Garamond', serif; color: #9b7b8c; font-size: 18px;">
            Welcome to our lovely community ♡
        </p>
    `;
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove overlay after 3 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeIn 0.5s ease reverse';
        setTimeout(() => {
            overlay.remove();
            form.reset();
            passwordHint.textContent = '';
            passwordMatch.textContent = '';
        }, 500);
    }, 3000);
}

// Add input validation styling
const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
            if (this.value.trim() !== '') {
                this.classList.add('success');
            }
        }
    });
    
    input.addEventListener('focus', function() {
        this.classList.remove('error');
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value) && this.value !== '') {
        this.classList.add('error');
    } else if (this.value !== '') {
        this.classList.add('success');
    }
});

// Phone validation (basic)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
    // Remove non-numeric characters except + and -
    this.value = this.value.replace(/[^\d+\-() ]/g, '');
});

// Prevent form submission on Enter key in text inputs (except submit button)
form.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.type !== 'submit') {
        e.preventDefault();
    }
});

console.log('✿ Coquette registration form loaded successfully! ♡');