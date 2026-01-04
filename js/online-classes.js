// Online Classes Management Module
const OnlineClasses = {
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    filterStatus: 'all',

    render() {
        const contentArea = document.getElementById('content-area');
        const classes = this.getOnlineClasses();
        const paginated = Utils.paginate(classes, this.currentPage, this.itemsPerPage);

        contentArea.innerHTML = `
            <div class="online-classes-page">
                <div class="page-header">
                    <h1>💻 Lớp học Online</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="OnlineClasses.viewSchedule()">
                            <i class="fas fa-calendar"></i> Lịch học
                        </button>
                        <button class="btn btn-primary" onclick="OnlineClasses.createClass()">
                            <i class="fas fa-plus"></i> Tạo lớp mới
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <i class="fas fa-video"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${classes.length}</h3>
                            <p>Tổng lớp học</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            <i class="fas fa-play-circle"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${classes.filter(c => c.status === 'live').length}</h3>
                            <p>Đang diễn ra</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${classes.filter(c => c.status === 'scheduled').length}</h3>
                            <p>Sắp diễn ra</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${classes.reduce((sum, c) => sum + c.participants, 0)}</h3>
                            <p>Tổng học viên</p>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm lớp học..." 
                               value="${this.searchQuery}" onkeyup="OnlineClasses.handleSearch(this.value)">
                    </div>
                    <select onchange="OnlineClasses.filterByStatus(this.value)">
                        <option value="all">Tất cả trạng thái</option>
                        <option value="live" ${this.filterStatus === 'live' ? 'selected' : ''}>Đang diễn ra</option>
                        <option value="scheduled" ${this.filterStatus === 'scheduled' ? 'selected' : ''}>Sắp diễn ra</option>
                        <option value="ended" ${this.filterStatus === 'ended' ? 'selected' : ''}>Đã kết thúc</option>
                    </select>
                </div>

                <!-- Classes Grid -->
                <div class="online-classes-grid">
                    ${paginated.data.map(cls => this.renderClassCard(cls)).join('')}
                </div>

                <!-- Pagination -->
                ${this.renderPagination(paginated)}
            </div>
        `;
    },

    renderClassCard(cls) {
        return `
            <div class="online-class-card ${cls.status}">
                <div class="class-header">
                    <div class="class-status ${cls.status}">
                        ${this.getStatusIcon(cls.status)} ${this.getStatusText(cls.status)}
                    </div>
                    <div class="class-actions">
                        <button class="btn-icon" onclick="OnlineClasses.editClass('${cls.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="OnlineClasses.deleteClass('${cls.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="class-info">
                    <h3>${cls.subject}</h3>
                    <p class="class-name">${cls.className}</p>
                    <div class="class-teacher">
                        <i class="fas fa-chalkboard-teacher"></i>
                        ${cls.teacherName}
                    </div>
                </div>

                <div class="class-schedule">
                    <div class="schedule-item">
                        <i class="fas fa-calendar"></i>
                        ${cls.date}
                    </div>
                    <div class="schedule-item">
                        <i class="fas fa-clock"></i>
                        ${cls.time}
                    </div>
                    <div class="schedule-item">
                        <i class="fas fa-users"></i>
                        ${cls.participants} học viên
                    </div>
                </div>

                <div class="class-platform">
                    <img src="${this.getPlatformIcon(cls.platform)}" alt="${cls.platform}">
                    <span>${cls.platform}</span>
                </div>

                <div class="class-footer">
                    ${cls.status === 'live' ? `
                        <button class="btn btn-success btn-block" onclick="OnlineClasses.joinClass('${cls.id}')">
                            <i class="fas fa-video"></i> Tham gia ngay
                        </button>
                    ` : cls.status === 'scheduled' ? `
                        <button class="btn btn-primary btn-block" onclick="OnlineClasses.viewDetails('${cls.id}')">
                            <i class="fas fa-info-circle"></i> Xem chi tiết
                        </button>
                    ` : `
                        <button class="btn btn-secondary btn-block" onclick="OnlineClasses.viewRecording('${cls.id}')">
                            <i class="fas fa-play"></i> Xem ghi hình
                        </button>
                    `}
                </div>

                ${cls.recording ? `
                    <div class="class-recording">
                        <i class="fas fa-video"></i> Có ghi hình
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderPagination(paginated) {
        if (paginated.totalPages <= 1) return '';

        let pages = '';
        for (let i = 1; i <= paginated.totalPages; i++) {
            pages += `
                <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="OnlineClasses.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        return `
            <div class="pagination">
                <button class="page-btn" onclick="OnlineClasses.goToPage(${this.currentPage - 1})" 
                        ${this.currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                ${pages}
                <button class="page-btn" onclick="OnlineClasses.goToPage(${this.currentPage + 1})" 
                        ${this.currentPage === paginated.totalPages ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    },

    getOnlineClasses() {
        // Mock data - sẽ lấy từ Database sau
        return [
            {
                id: 'OC001',
                subject: 'Lập trình Web',
                className: 'CNTT-K18A',
                teacherName: 'TS. Nguyễn Văn An',
                date: '04/01/2026',
                time: '14:00 - 16:00',
                participants: 65,
                platform: 'Zoom',
                status: 'live',
                meetingLink: 'https://zoom.us/j/123456789',
                recording: false
            },
            {
                id: 'OC002',
                subject: 'Cơ sở dữ liệu',
                className: 'CNTT-K18B',
                teacherName: 'PGS.TS. Trần Thị Bình',
                date: '04/01/2026',
                time: '16:00 - 18:00',
                participants: 68,
                platform: 'Google Meet',
                status: 'scheduled',
                meetingLink: 'https://meet.google.com/abc-defg-hij',
                recording: false
            },
            {
                id: 'OC003',
                subject: 'Quản trị Marketing',
                className: 'QTKD-K19A',
                teacherName: 'ThS. Lê Văn Cường',
                date: '03/01/2026',
                time: '09:00 - 11:00',
                participants: 70,
                platform: 'Microsoft Teams',
                status: 'ended',
                meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
                recording: true,
                recordingLink: 'https://drive.google.com/file/d/...'
            }
        ];
    },

    getStatusIcon(status) {
        const icons = {
            'live': '🔴',
            'scheduled': '🕐',
            'ended': '✓'
        };
        return icons[status] || '•';
    },

    getStatusText(status) {
        const texts = {
            'live': 'Đang diễn ra',
            'scheduled': 'Sắp diễn ra',
            'ended': 'Đã kết thúc'
        };
        return texts[status] || status;
    },

    getPlatformIcon(platform) {
        const icons = {
            'Zoom': 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png',
            'Google Meet': 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
            'Microsoft Teams': 'https://cdn-icons-png.flaticon.com/512/906/906349.png'
        };
        return icons[platform] || 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png';
    },

    handleSearch(query) {
        this.searchQuery = query;
        this.currentPage = 1;
        this.render();
    },

    filterByStatus(status) {
        this.filterStatus = status;
        this.currentPage = 1;
        this.render();
    },

    goToPage(page) {
        const classes = this.getOnlineClasses();
        const totalPages = Math.ceil(classes.length / this.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
        }
    },

    createClass() {
        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) OnlineClasses.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-plus"></i> Tạo Lớp Học Online</h3>
                        <button class="close-btn" onclick="OnlineClasses.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="OnlineClasses.saveNewClass(event)" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Môn học <span class="required">*</span></label>
                                <input type="text" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label>Lớp <span class="required">*</span></label>
                                <select name="className" required>
                                    ${Database.classes.map(c => `<option value="${c.name}">${c.name} - ${c.faculty}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Giảng viên <span class="required">*</span></label>
                                <select name="teacherId" required>
                                    ${Database.getAllTeachers().map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Ngày học <span class="required">*</span></label>
                                <input type="date" name="date" required>
                            </div>
                            <div class="form-group">
                                <label>Giờ bắt đầu <span class="required">*</span></label>
                                <input type="time" name="startTime" required>
                            </div>
                            <div class="form-group">
                                <label>Giờ kết thúc <span class="required">*</span></label>
                                <input type="time" name="endTime" required>
                            </div>
                            <div class="form-group">
                                <label>Nền tảng <span class="required">*</span></label>
                                <select name="platform" required>
                                    <option value="Zoom">Zoom</option>
                                    <option value="Google Meet">Google Meet</option>
                                    <option value="Microsoft Teams">Microsoft Teams</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Link meeting <span class="required">*</span></label>
                                <input type="url" name="meetingLink" placeholder="https://..." required>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="OnlineClasses.closeModal()">
                                <i class="fas fa-times"></i> Hủy
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Tạo lớp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    saveNewClass(event) {
        event.preventDefault();
        Utils.showToast('Đã tạo lớp học online', 'success');
        this.closeModal();
        this.render();
    },

    joinClass(id) {
        const cls = this.getOnlineClasses().find(c => c.id === id);
        if (cls && cls.meetingLink) {
            window.open(cls.meetingLink, '_blank');
            Utils.showToast('Đang mở link meeting...', 'info');
        }
    },

    viewDetails(id) {
        const cls = this.getOnlineClasses().find(c => c.id === id);
        if (!cls) return;

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) OnlineClasses.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-info-circle"></i> Chi Tiết Lớp Học</h3>
                        <button class="close-btn" onclick="OnlineClasses.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="class-detail">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Môn học:</label>
                                <span>${cls.subject}</span>
                            </div>
                            <div class="detail-item">
                                <label>Lớp:</label>
                                <span>${cls.className}</span>
                            </div>
                            <div class="detail-item">
                                <label>Giảng viên:</label>
                                <span>${cls.teacherName}</span>
                            </div>
                            <div class="detail-item">
                                <label>Ngày học:</label>
                                <span>${cls.date}</span>
                            </div>
                            <div class="detail-item">
                                <label>Thời gian:</label>
                                <span>${cls.time}</span>
                            </div>
                            <div class="detail-item">
                                <label>Nền tảng:</label>
                                <span>${cls.platform}</span>
                            </div>
                            <div class="detail-item">
                                <label>Số học viên:</label>
                                <span>${cls.participants}</span>
                            </div>
                            <div class="detail-item">
                                <label>Link meeting:</label>
                                <a href="${cls.meetingLink}" target="_blank">${cls.meetingLink}</a>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-secondary" onclick="OnlineClasses.closeModal()">
                                <i class="fas fa-times"></i> Đóng
                            </button>
                            <button class="btn btn-primary" onclick="window.open('${cls.meetingLink}', '_blank')">
                                <i class="fas fa-external-link-alt"></i> Mở link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    viewRecording(id) {
        const cls = this.getOnlineClasses().find(c => c.id === id);
        if (cls && cls.recording && cls.recordingLink) {
            window.open(cls.recordingLink, '_blank');
            Utils.showToast('Đang mở ghi hình...', 'info');
        } else {
            Utils.showToast('Chưa có ghi hình cho lớp này', 'warning');
        }
    },

    editClass(id) {
        Utils.showToast('Chức năng chỉnh sửa đang phát triển', 'info');
    },

    deleteClass(id) {
        if (confirm('Bạn có chắc muốn xóa lớp học này?')) {
            Utils.showToast('Đã xóa lớp học', 'success');
            this.render();
        }
    },

    viewSchedule() {
        Utils.showToast('Hiển thị lịch học online', 'info');
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    }
};
