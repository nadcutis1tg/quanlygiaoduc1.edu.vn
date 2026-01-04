// Notifications Module
const Notifications = {
    currentFilter: 'all',

    render() {
        const contentArea = document.getElementById('content-area');
        const notifications = this.getFilteredNotifications();
        const unreadCount = Database.getUnreadNotifications().length;

        contentArea.innerHTML = `
            <div class="notifications-page">
                <div class="page-header">
                    <h1>🔔 Thông báo</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="Notifications.markAllAsRead()">
                            <i class="fas fa-check-double"></i> Đánh dấu đã đọc tất cả
                        </button>
                    </div>
                </div>

                <!-- Stats -->
                <div class="stats-row">
                    <div class="stat-mini">
                        <div class="stat-value">${Database.getAllNotifications().length}</div>
                        <div class="stat-label">Tổng thông báo</div>
                    </div>
                    <div class="stat-mini warning">
                        <div class="stat-value">${unreadCount}</div>
                        <div class="stat-label">Chưa đọc</div>
                    </div>
                    <div class="stat-mini success">
                        <div class="stat-value">${Database.getAllNotifications().length - unreadCount}</div>
                        <div class="stat-label">Đã đọc</div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="notification-filters">
                    <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" 
                            onclick="Notifications.filterBy('all')">
                        Tất cả
                    </button>
                    <button class="filter-btn ${this.currentFilter === 'unread' ? 'active' : ''}" 
                            onclick="Notifications.filterBy('unread')">
                        Chưa đọc (${unreadCount})
                    </button>
                    <button class="filter-btn ${this.currentFilter === 'system' ? 'active' : ''}" 
                            onclick="Notifications.filterBy('system')">
                        Hệ thống
                    </button>
                    <button class="filter-btn ${this.currentFilter === 'academic' ? 'active' : ''}" 
                            onclick="Notifications.filterBy('academic')">
                        Học tập
                    </button>
                    <button class="filter-btn ${this.currentFilter === 'finance' ? 'active' : ''}" 
                            onclick="Notifications.filterBy('finance')">
                        Tài chính
                    </button>
                </div>

                <!-- Notifications List -->
                <div class="notifications-list">
                    ${notifications.length > 0 
                        ? notifications.map(n => this.renderNotificationCard(n)).join('') 
                        : '<div class="empty-state"><i class="fas fa-bell-slash"></i><p>Không có thông báo</p></div>'}
                </div>
            </div>
        `;
    },

    renderNotificationCard(notification) {
        const icon = this.getNotificationIcon(notification.type);
        const color = this.getNotificationColor(notification.type);
        
        return `
            <div class="notification-card ${notification.read ? 'read' : 'unread'}" 
                 onclick="Notifications.markAsRead('${notification.id}')">
                <div class="notification-icon" style="background: ${color}">
                    <i class="${icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-header">
                        <h4>${notification.title}</h4>
                        <span class="notification-time">${this.formatTime(notification.date)}</span>
                    </div>
                    <p class="notification-message">${notification.message}</p>
                    <div class="notification-meta">
                        <span class="notification-type">${this.getTypeLabel(notification.type)}</span>
                        ${!notification.read ? '<span class="unread-badge">Mới</span>' : ''}
                    </div>
                </div>
                ${!notification.read ? '<div class="unread-indicator"></div>' : ''}
            </div>
        `;
    },

    getFilteredNotifications() {
        let notifications = Database.getAllNotifications();

        switch(this.currentFilter) {
            case 'unread':
                notifications = notifications.filter(n => !n.read);
                break;
            case 'system':
            case 'academic':
            case 'finance':
                notifications = notifications.filter(n => n.type === this.currentFilter);
                break;
        }

        // Sắp xếp: chưa đọc trước, mới nhất trước
        return notifications.sort((a, b) => {
            if (a.read !== b.read) return a.read ? 1 : -1;
            return new Date(b.date) - new Date(a.date);
        });
    },

    filterBy(filter) {
        this.currentFilter = filter;
        this.render();
    },

    markAsRead(id) {
        Database.markNotificationAsRead(id);
        this.render();
    },

    markAllAsRead() {
        const unread = Database.getUnreadNotifications();
        unread.forEach(n => Database.markNotificationAsRead(n.id));
        Utils.showToast('Đã đánh dấu tất cả là đã đọc', 'success');
        this.render();
    },

    getNotificationIcon(type) {
        const icons = {
            'system': 'fas fa-cog',
            'academic': 'fas fa-graduation-cap',
            'finance': 'fas fa-dollar-sign',
            'event': 'fas fa-calendar',
            'alert': 'fas fa-exclamation-triangle'
        };
        return icons[type] || 'fas fa-bell';
    },

    getNotificationColor(type) {
        const colors = {
            'system': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'academic': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'finance': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'event': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'alert': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        };
        return colors[type] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    },

    getTypeLabel(type) {
        const labels = {
            'system': 'Hệ thống',
            'academic': 'Học tập',
            'finance': 'Tài chính',
            'event': 'Sự kiện',
            'alert': 'Cảnh báo'
        };
        return labels[type] || type;
    },

    formatTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'Vừa xong';
        if (minutes < 60) return `${minutes} phút trước`;
        if (hours < 24) return `${hours} giờ trước`;
        if (days < 7) return `${days} ngày trước`;
        
        return date.toLocaleDateString('vi-VN');
    }
};
