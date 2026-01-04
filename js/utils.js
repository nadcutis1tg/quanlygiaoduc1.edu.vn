// Utility Functions for EduManager Pro

const Utils = {
    // Format currency
    formatCurrency(amount, currency = 'VND') {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format date
    formatDate(date, format = 'dd/MM/yyyy') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        switch(format) {
            case 'dd/MM/yyyy':
                return `${day}/${month}/${year}`;
            case 'MM/dd/yyyy':
                return `${month}/${day}/${year}`;
            case 'yyyy-MM-dd':
                return `${year}-${month}-${day}`;
            default:
                return `${day}/${month}/${year}`;
        }
    },

    // Format time ago
    timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        const intervals = {
            'năm': 31536000,
            'tháng': 2592000,
            'tuần': 604800,
            'ngày': 86400,
            'giờ': 3600,
            'phút': 60,
            'giây': 1
        };

        for (let [name, value] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / value);
            if (interval >= 1) {
                return `${interval} ${name} trước`;
            }
        }
        return 'Vừa xong';
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone
    validatePhone(phone) {
        const re = /^[0-9]{10,11}$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    // Generate random ID
    generateId(prefix = '') {
        return prefix + Math.random().toString(36).substr(2, 9).toUpperCase();
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Show toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    getToastIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    },

    // Show loading
    showLoading(message = 'Đang xử lý...') {
        const loading = document.createElement('div');
        loading.id = 'global-loading';
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="loader"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loading);
    },

    hideLoading() {
        document.getElementById('global-loading')?.remove();
    },

    // Confirm dialog
    confirm(message, callback) {
        if (window.confirm(message)) {
            callback();
        }
    },

    // Download file
    downloadFile(data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },

    // Export to Excel
    exportToExcel(data, filename) {
        // Simple CSV export (would use library like xlsx in production)
        const csv = this.convertToCSV(data);
        this.downloadFile(csv, filename + '.csv', 'text/csv');
    },

    convertToCSV(data) {
        if (!data || !data.length) return '';
        
        const headers = Object.keys(data[0]);
        const rows = data.map(row => 
            headers.map(header => JSON.stringify(row[header] || '')).join(',')
        );
        
        return [headers.join(','), ...rows].join('\n');
    },

    // Local storage helpers
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Storage error:', e);
                return defaultValue;
            }
        },

        remove(key) {
            localStorage.removeItem(key);
        },

        clear() {
            localStorage.clear();
        }
    },

    // API helpers
    api: {
        async get(url) {
            try {
                const response = await fetch(url);
                return await response.json();
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        },

        async post(url, data) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
    },

    // Calculate GPA
    calculateGPA(grades) {
        if (!grades || !grades.length) return 0;
        const total = grades.reduce((sum, grade) => sum + grade.value, 0);
        return (total / grades.length).toFixed(2);
    },

    // Get grade letter
    getGradeLetter(gpa) {
        if (gpa >= 3.7) return 'A';
        if (gpa >= 3.3) return 'A-';
        if (gpa >= 3.0) return 'B+';
        if (gpa >= 2.7) return 'B';
        if (gpa >= 2.3) return 'B-';
        if (gpa >= 2.0) return 'C+';
        if (gpa >= 1.7) return 'C';
        if (gpa >= 1.3) return 'C-';
        if (gpa >= 1.0) return 'D';
        return 'F';
    },

    // Truncate text
    truncate(text, length = 100) {
        if (text.length <= length) return text;
        return text.substr(0, length) + '...';
    },

    // Capitalize first letter
    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },

    // Remove Vietnamese accents
    removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    },

    // Search in array
    search(array, query, fields) {
        const normalizedQuery = this.removeAccents(query.toLowerCase());
        return array.filter(item => {
            return fields.some(field => {
                const value = item[field];
                if (!value) return false;
                return this.removeAccents(value.toString().toLowerCase())
                    .includes(normalizedQuery);
            });
        });
    },

    // Sort array
    sortBy(array, field, order = 'asc') {
        return [...array].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            
            if (order === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    },

    // Paginate array
    paginate(array, page = 1, perPage = 10) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        
        return {
            data: array.slice(start, end),
            total: array.length,
            page: page,
            perPage: perPage,
            totalPages: Math.ceil(array.length / perPage)
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
