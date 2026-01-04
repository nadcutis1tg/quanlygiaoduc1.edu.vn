// Main Application Controller
const App = {
    currentUser: null,
    currentPage: 'dashboard',

    init() {
        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.checkAuth();
        }, 2000);
    },

    showLoading() {
        document.getElementById('loading-screen').style.display = 'flex';
    },

    hideLoading() {
        document.getElementById('loading-screen').style.display = 'none';
    },

    checkAuth() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.currentUser = JSON.parse(localStorage.getItem('user'));
            this.showDashboard();
        } else {
            this.showAuthPage();
        }
    },

    showAuthPage() {
        document.getElementById('auth-page').style.display = 'flex';
        document.getElementById('main-dashboard').style.display = 'none';
    },

    showDashboard() {
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('main-dashboard').style.display = 'flex';
        this.loadDashboard();
    },

    loadDashboard() {
        Dashboard.render();
    }
};

// Navigation
function navigateTo(page) {
    App.currentPage = page;
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');

    // Load page content
    const contentArea = document.getElementById('content-area');
    
    switch(page) {
        case 'dashboard':
            Dashboard.render();
            break;
        case 'students':
            Students.render();
            break;
        case 'teachers':
            Teachers.render();
            break;
        case 'schedule':
            Schedule.render();
            break;
        case 'finance':
            Finance.render();
            break;
        case 'research':
            Research.render();
            break;
        case 'attendance':
            Attendance.render();
            break;
        case 'reports':
            Reports.render();
            break;
        case 'notifications':
            Notifications.render();
            break;
        case 'lms':
            OnlineClasses.render();
            break;
    }
}

// Toggle Sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Toggle Notifications
function toggleNotifications() {
    alert('Notification panel will open here');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
