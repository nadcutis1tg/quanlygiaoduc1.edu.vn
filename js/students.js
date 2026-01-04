// Students Management Module với Database thực tế
const Students = {
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    filterClass: 'all',
    filterStatus: 'all',

    render() {
        const contentArea = document.getElementById('content-area');
        const students = this.getFilteredStudents();
        const paginated = Utils.paginate(students, this.currentPage, this.itemsPerPage);
        const allStudents = Database.getAllStudents();

        contentArea.innerHTML = `
            <div class="students-page">
                <div class="page-header">
                    <h1>👨‍🎓 Quản lý Học viên</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="Students.importData()">
                            <i class="fas fa-file-import"></i> Import Excel
                        </button>
                        <button class="btn btn-primary" onclick="Students.addNew()">
                            <i class="fas fa-plus"></i> Thêm học viên
                        </button>
                    </div>
                </div>

                <!-- AI Insights -->
                <div class="ai-insights-banner">
                    <div class="insight-icon">🤖</div>
                    <div class="insight-content">
                        <h3>AI Phát hiện: ${allStudents.filter(s => s.status === 'at-risk').length} sinh viên có nguy cơ bỏ học</h3>
                        <p>Dựa trên phân tích điểm số, tham gia và hành vi, AI đã xác định các sinh viên cần hỗ trợ đặc biệt</p>
                        <button class="btn-link" onclick="Students.showAtRiskStudents()">
                            Xem danh sách chi tiết →
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allStudents.length}</h3>
                            <p>Tổng học viên</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allStudents.filter(s => s.status === 'active').length}</h3>
                            <p>Đang học</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allStudents.filter(s => s.status === 'at-risk').length}</h3>
                            <p>Nguy cơ bỏ học</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${(allStudents.reduce((sum, s) => sum + s.gpa, 0) / allStudents.length).toFixed(2)}</h3>
                            <p>GPA trung bình</p>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="student-search" placeholder="Tìm kiếm theo tên, mã SV..." 
                               value="${this.searchQuery}" onkeyup="Students.handleSearch(this.value)">
                    </div>
                    <select id="class-filter" onchange="Students.filterByClass(this.value)">
                        <option value="all">Tất cả lớp</option>
                        ${Database.classes.map(c => `<option value="${c.name}" ${this.filterClass === c.name ? 'selected' : ''}>${c.name} - ${c.faculty}</option>`).join('')}
                    </select>
                        <option value="10A2" ${this.filterClass === '10A2' ? 'selected' : ''}>Lớp 10A2</option>
                        <option value="10A3" ${this.filterClass === '10A3' ? 'selected' : ''}>Lớp 10A3</option>
                    </select>
                    <select id="status-filter" onchange="Students.filterByStatus(this.value)">
                        <option value="all">Tất cả trạng thái</option>
                        <option value="active" ${this.filterStatus === 'active' ? 'selected' : ''}>Đang học</option>
                        <option value="at-risk" ${this.filterStatus === 'at-risk' ? 'selected' : ''}>Có nguy cơ</option>
                        <option value="excellent" ${this.filterStatus === 'excellent' ? 'selected' : ''}>Xuất sắc</option>
                    </select>
                </div>

                <!-- Students Table -->
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Mã SV</th>
                                <th>Họ tên</th>
                                <th>Lớp/Khoa</th>
                                <th>GPA</th>
                                <th>Tham gia</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${paginated.data.map(student => this.renderStudentRow(student)).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                ${this.renderPagination(paginated)}
            </div>
        `;
    },

    renderStudentRow(student) {
        return `
            <tr>
                <td>${student.id}</td>
                <td>
                    <div class="student-info">
                        <img src="${student.avatar}" alt="${student.name}" class="student-avatar">
                        <div>
                            <div class="student-name">${student.name}</div>
                            <div class="student-email">${student.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge badge-info">${student.class}</span>
                    ${student.faculty ? `<br><small style="color: #666;">${student.faculty}</small>` : ''}
                    ${student.year ? `<br><small style="color: #666;">Năm ${student.year}</small>` : ''}
                </td>
                <td>
                    <span class="gpa-badge ${this.getGPAClass(student.gpa)}">
                        ${student.gpa.toFixed(2)}
                    </span>
                </td>
                <td>
                    <div class="progress-bar-small">
                        <div class="progress-fill" style="width: ${student.attendance}%; background: ${this.getAttendanceColor(student.attendance)}"></div>
                    </div>
                    <span class="progress-text">${student.attendance}%</span>
                </td>
                <td>
                    <span class="badge ${this.getStatusBadgeClass(student.status)}">
                        ${this.getStatusText(student.status)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="Students.viewAnalysis('${student.id}')" title="Phân tích AI">
                            <i class="fas fa-robot"></i>
                        </button>
                        <button class="btn-icon" onclick="Students.edit('${student.id}')" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="Students.deleteStudent('${student.id}')" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    renderPagination(paginated) {
        if (paginated.totalPages <= 1) return '';

        let pages = '';
        for (let i = 1; i <= paginated.totalPages; i++) {
            pages += `
                <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="Students.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        return `
            <div class="pagination">
                <button class="page-btn" onclick="Students.goToPage(${this.currentPage - 1})" 
                        ${this.currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                ${pages}
                <button class="page-btn" onclick="Students.goToPage(${this.currentPage + 1})" 
                        ${this.currentPage === paginated.totalPages ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    },

    getFilteredStudents() {
        let students = Database.getAllStudents();

        // Search filter
        if (this.searchQuery) {
            students = Utils.search(students, this.searchQuery, ['name', 'id', 'email', 'class']);
        }

        // Class filter
        if (this.filterClass !== 'all') {
            students = students.filter(s => s.class === this.filterClass);
        }

        // Status filter
        if (this.filterStatus !== 'all') {
            students = students.filter(s => s.status === this.filterStatus);
        }

        return students;
    },

    handleSearch(query) {
        this.searchQuery = query;
        this.currentPage = 1;
        this.render();
    },

    filterByClass(className) {
        this.filterClass = className;
        this.currentPage = 1;
        this.render();
    },

    filterByStatus(status) {
        this.filterStatus = status;
        this.currentPage = 1;
        this.render();
    },

    goToPage(page) {
        const students = this.getFilteredStudents();
        const totalPages = Math.ceil(students.length / this.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
        }
    },

    getGPAClass(gpa) {
        if (gpa >= 3.5) return 'excellent';
        if (gpa >= 3.0) return 'good';
        if (gpa >= 2.5) return 'average';
        return 'poor';
    },

    getAttendanceColor(attendance) {
        if (attendance >= 90) return '#10B981';
        if (attendance >= 75) return '#F59E0B';
        return '#EF4444';
    },

    getStatusBadgeClass(status) {
        const classes = {
            'active': 'badge-success',
            'at-risk': 'badge-warning',
            'suspended': 'badge-danger',
            'graduated': 'badge-info',
            'excellent': 'badge-success'
        };
        return classes[status] || 'badge-secondary';
    },

    getStatusText(status) {
        const texts = {
            'active': 'Đang học',
            'at-risk': 'Nguy cơ',
            'suspended': 'Đình chỉ',
            'graduated': 'Tốt nghiệp',
            'excellent': 'Xuất sắc'
        };
        return texts[status] || status;
    },

    viewAnalysis(id) {
        console.log('Opening AI Analyzer for student:', id);
        if (typeof AIStudentAnalyzer === 'undefined') {
            console.error('AIStudentAnalyzer is not defined!');
            Utils.showToast('Lỗi: AI Analyzer chưa được tải. Vui lòng tải lại trang.', 'error');
            return;
        }
        AIStudentAnalyzer.open(id);
    },

    edit(id) {
        Utils.showToast('Chức năng chỉnh sửa đang được phát triển', 'info');
    },

    deleteStudent(id) {
        Utils.confirm('Bạn có chắc muốn xóa học viên này?', () => {
            Utils.showToast('Đã xóa học viên', 'success');
            this.render();
        });
    },

    addNew() {
        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Students.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user-plus"></i> Thêm Học Viên Mới</h3>
                        <button class="close-btn" onclick="Students.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Students.saveNewStudent(event)" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Họ và tên <span class="required">*</span></label>
                                <input type="text" name="name" required>
                            </div>
                            <div class="form-group">
                                <label>Lớp <span class="required">*</span></label>
                                <select name="class" required>
                                    ${Database.classes.map(c => `<option value="${c.name}">${c.name} - ${c.faculty} - Năm ${c.year}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Email <span class="required">*</span></label>
                                <input type="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại</label>
                                <input type="tel" name="phone">
                            </div>
                            <div class="form-group">
                                <label>Ngày sinh</label>
                                <input type="date" name="dateOfBirth">
                            </div>
                            <div class="form-group">
                                <label>Địa chỉ</label>
                                <input type="text" name="address">
                            </div>
                            <div class="form-group">
                                <label>Tên phụ huynh</label>
                                <input type="text" name="parentName">
                            </div>
                            <div class="form-group">
                                <label>SĐT phụ huynh</label>
                                <input type="tel" name="parentPhone">
                            </div>
                            <div class="form-group">
                                <label>Email phụ huynh</label>
                                <input type="email" name="parentEmail">
                            </div>
                            <div class="form-group">
                                <label>GPA</label>
                                <input type="number" name="gpa" step="0.01" min="0" max="4" value="0">
                            </div>
                            <div class="form-group">
                                <label>Tín chỉ</label>
                                <input type="number" name="credits" min="0" value="0">
                            </div>
                            <div class="form-group">
                                <label style="color: #666;">Tỷ lệ tham gia</label>
                                <input type="text" value="Tự động tính từ hoạt động" disabled style="background: #f5f5f5; color: #666;">
                                <small style="color: #666;">Được tính dựa trên hoạt động ngoại khóa</small>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Students.closeModal()">
                                <i class="fas fa-times"></i> Hủy
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    saveNewStudent(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedClass = Database.classes.find(c => c.name === formData.get('class'));
        
        const studentData = {
            name: formData.get('name'),
            class: formData.get('class'),
            classId: selectedClass?.id,
            faculty: selectedClass?.faculty,
            year: selectedClass?.year,
            email: formData.get('email'),
            phone: formData.get('phone'),
            dateOfBirth: formData.get('dateOfBirth'),
            address: formData.get('address'),
            parentName: formData.get('parentName'),
            parentPhone: formData.get('parentPhone'),
            parentEmail: formData.get('parentEmail'),
            gpa: parseFloat(formData.get('gpa')) || 0,
            // attendance sẽ được tính tự động trong Database.addStudent
            credits: parseInt(formData.get('credits')) || 0,
            enrollmentDate: new Date().toISOString().split('T')[0]
        };

        const newStudent = Database.addStudent(studentData);
        this.closeModal();
        Utils.showToast(`Đã thêm học viên ${newStudent.name}`, 'success');
        this.render();
    },

    edit(id) {
        const student = Database.getStudent(id);
        if (!student) {
            Utils.showToast('Không tìm thấy học viên', 'error');
            return;
        }

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Students.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-edit"></i> Chỉnh Sửa Học Viên</h3>
                        <button class="close-btn" onclick="Students.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Students.saveEditStudent(event, '${id}')" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Họ và tên <span class="required">*</span></label>
                                <input type="text" name="name" value="${student.name}" required>
                            </div>
                            <div class="form-group">
                                <label>Lớp <span class="required">*</span></label>
                                <select name="class" required>
                                    ${Database.classes.map(c => `<option value="${c.name}" ${c.name === student.class ? 'selected' : ''}>${c.name} - ${c.faculty} - Năm ${c.year}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Email <span class="required">*</span></label>
                                <input type="email" name="email" value="${student.email}" required>
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại</label>
                                <input type="tel" name="phone" value="${student.phone}">
                            </div>
                            <div class="form-group">
                                <label>Ngày sinh</label>
                                <input type="date" name="dateOfBirth" value="${student.dateOfBirth}">
                            </div>
                            <div class="form-group">
                                <label>Địa chỉ</label>
                                <input type="text" name="address" value="${student.address}">
                            </div>
                            <div class="form-group">
                                <label>Tên phụ huynh</label>
                                <input type="text" name="parentName" value="${student.parentName}">
                            </div>
                            <div class="form-group">
                                <label>SĐT phụ huynh</label>
                                <input type="tel" name="parentPhone" value="${student.parentPhone}">
                            </div>
                            <div class="form-group">
                                <label>Email phụ huynh</label>
                                <input type="email" name="parentEmail" value="${student.parentEmail || ''}">
                            </div>
                            <div class="form-group">
                                <label>GPA</label>
                                <input type="number" name="gpa" step="0.01" min="0" max="4" value="${student.gpa}">
                            </div>
                            <div class="form-group">
                                <label>Tín chỉ</label>
                                <input type="number" name="credits" min="0" value="${student.credits}">
                            </div>
                            <div class="form-group">
                                <label style="color: #666;">Tỷ lệ tham gia</label>
                                <input type="text" value="${student.attendance}% (Tự động)" disabled style="background: #f5f5f5; color: #666;">
                                <small style="color: #666;">Được tính dựa trên hoạt động ngoại khóa</small>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Students.closeModal()">
                                <i class="fas fa-times"></i> Hủy
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    saveEditStudent(event, id) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedClass = Database.classes.find(c => c.name === formData.get('class'));
        
        const studentData = {
            name: formData.get('name'),
            class: formData.get('class'),
            classId: selectedClass?.id,
            faculty: selectedClass?.faculty,
            year: selectedClass?.year,
            email: formData.get('email'),
            phone: formData.get('phone'),
            dateOfBirth: formData.get('dateOfBirth'),
            address: formData.get('address'),
            parentName: formData.get('parentName'),
            parentPhone: formData.get('parentPhone'),
            parentEmail: formData.get('parentEmail'),
            gpa: parseFloat(formData.get('gpa')),
            // attendance không được update từ form, giữ nguyên giá trị cũ
            credits: parseInt(formData.get('credits'))
        };

        const updated = Database.updateStudent(id, studentData);
        if (updated) {
            this.closeModal();
            Utils.showToast(`Đã cập nhật thông tin ${updated.name}`, 'success');
            this.render();
        } else {
            Utils.showToast('Cập nhật thất bại', 'error');
        }
    },

    deleteStudent(id) {
        const student = Database.getStudent(id);
        if (!student) return;

        if (confirm(`Bạn có chắc muốn xóa học viên ${student.name}?`)) {
            const deleted = Database.deleteStudent(id);
            if (deleted) {
                Utils.showToast(`Đã xóa học viên ${student.name}`, 'success');
                this.render();
            } else {
                Utils.showToast('Xóa thất bại', 'error');
            }
        }
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    },

    importData() {
        Utils.showToast('Chức năng import Excel đang được phát triển', 'info');
    },

    showAtRiskStudents() {
        this.filterStatus = 'at-risk';
        this.currentPage = 1;
        this.render();
        Utils.showToast('Hiển thị học viên có nguy cơ bỏ học', 'info');
    }
};
