// Authentication Module
const Auth = {
    // Login with Email
    async loginWithEmail(email, password) {
        try {
            // Simulate API call
            const response = await this.mockAPICall({
                email,
                password
            });

            if (response.success) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                App.currentUser = response.user;
                App.showDashboard();
                return { success: true };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Register with Email
    async registerWithEmail(userData) {
        try {
            const response = await this.mockAPICall(userData);
            
            if (response.success) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                App.currentUser = response.user;
                App.showDashboard();
                return { success: true };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Login with Google
    async loginWithGoogle() {
        // Simulate Google OAuth
        const googleUser = {
            email: 'user@gmail.com',
            name: 'Google User',
            avatar: 'https://via.placeholder.com/150',
            provider: 'google'
        };

        const token = 'google_token_' + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(googleUser));
        App.currentUser = googleUser;
        App.showDashboard();
    },

    // Login with Apple
    async loginWithApple() {
        // Simulate Apple OAuth
        const appleUser = {
            email: 'user@icloud.com',
            name: 'Apple User',
            avatar: 'https://via.placeholder.com/150',
            provider: 'apple'
        };

        const token = 'apple_token_' + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(appleUser));
        App.currentUser = appleUser;
        App.showDashboard();
    },

    // Logout
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        App.currentUser = null;
        App.showAuthPage();
    },

    // Mock API Call
    mockAPICall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    token: 'mock_token_' + Date.now(),
                    user: {
                        id: Math.random().toString(36).substr(2, 9),
                        email: data.email,
                        name: data.name || 'User',
                        role: data.role || 'student',
                        avatar: 'https://via.placeholder.com/150'
                    }
                });
            }, 1000);
        });
    }
};

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    Auth.loginWithEmail(email, password);
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const role = document.getElementById('register-role').value;

    if (password !== confirm) {
        alert('Mật khẩu không khớp!');
        return;
    }

    Auth.registerWithEmail({ name, email, password, role });
}

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function loginWithGoogle() {
    Auth.loginWithGoogle();
}

function loginWithApple() {
    Auth.loginWithApple();
}

function registerWithGoogle() {
    Auth.loginWithGoogle();
}

function registerWithApple() {
    Auth.loginWithApple();
}

// Password Strength Indicator
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('register-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            const strength = calculatePasswordStrength(e.target.value);
            updatePasswordStrength(strength);
        });
    }
});

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    return strength;
}

function updatePasswordStrength(strength) {
    const indicator = document.getElementById('password-strength');
    if (indicator) {
        indicator.style.width = strength + '%';
        if (strength < 50) {
            indicator.style.background = '#EF4444';
        } else if (strength < 75) {
            indicator.style.background = '#F59E0B';
        } else {
            indicator.style.background = '#10B981';
        }
    }
}
