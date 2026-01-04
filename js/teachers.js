// Teachers Management Module
const Teachers = {
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    filterSubject: 'all',

    render() {
        const contentArea = document.getElementById('content-area');
        const teachers = this.getFilteredTeachers();
        const paginated = Utils.paginate(teachers, this.currentPage, this.itemsPerPage);
        const allTeachers = Database.getAllTeachers();

        contentArea.innerHTML = `
            <div class="teachers-page">
                <div class="page-header">
                    <h1>👨‍🏫 Quản lý Giảng viên</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="Teachers.addNew()">
                            <i class="fas fa-plus"></i> Thêm giảng viên
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <i class="fas fa-chalkboard-teacher"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allTeachers.length}</h3>
                            <p>Tổng giảng viên</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${[...new Set(allTeachers.map(t => t.subject))].length}</h3>
                            <p>Môn học</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allTeachers.filter(t => t.degree === 'Tiến sĩ').length}</h3>
                            <p>Tiến sĩ</p>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="teacher-search" placeholder="Tìm kiếm giảng viên..." 
                               value="${this.searchQuery}" onkeyup="Teachers.handleSearch(this.value)">
                    </div>
                    <select id="subject-filter" onchange="Teachers.filterBySubject(this.value)">
                        <option value="all">Tất cả môn học</option>
                        ${[...new Set(allTeachers.map(t => t.subject))].map(subject => 
                            `<option value="${subject}" ${this.filterSubject === subject ? 'selected' : ''}>${subject}</option>`
                        ).join('')}
                    </select>
                </div>

                <!-- Teachers Table -->
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Mã GV</th>
                                <th>Họ tên</th>
                                <th>Môn dạy</th>
                                <th>Lớp phụ trách</th>
                                <th>Kinh nghiệm</th>
                                <th>Học vị</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${paginated.data.map(teacher => this.renderTeacherRow(teacher)).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                ${this.renderPagination(paginated)}
            </div>
        `;
    },

    renderTeacherRow(teacher) {
        return `
            <tr>
                <td>${teacher.id}</td>
                <td>
                    <div class="student-info">
                        <img src="${teacher.avatar}" alt="${teacher.name}" class="student-avatar">
                        <div>
                            <div class="student-name">${teacher.name}</div>
                            <div class="student-email">${teacher.email}</div>
                        </div>
                    </div>
                </td>
                <td><span class="badge badge-info">${teacher.subject}</span></td>
                <td>${teacher.classes.join(', ')}</td>
                <td>${teacher.experience} năm</td>
                <td><span class="badge ${this.getDegreeBadge(teacher.degree)}">${teacher.degree}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="Teachers.view('${teacher.id}')" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="Teachers.edit('${teacher.id}')" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="Teachers.deleteTeacher('${teacher.id}')" title="Xóa">
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
                        onclick="Teachers.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        return `
            <div class="pagination">
                <button class="page-btn" onclick="Teachers.goToPage(${this.currentPage - 1})" 
                        ${this.currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                ${pages}
                <button class="page-btn" onclick="Teachers.goToPage(${this.currentPage + 1})" 
                        ${this.currentPage === paginated.totalPages ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    },

    getFilteredTeachers() {
        let teachers = Database.getAllTeachers();

        if (this.searchQuery) {
            teachers = Utils.search(teachers, this.searchQuery, ['name', 'id', 'email', 'subject']);
        }

        if (this.filterSubject !== 'all') {
            teachers = teachers.filter(t => t.subject === this.filterSubject);
        }

        return teachers;
    },

    handleSearch(query) {
        this.searchQuery = query;
        this.currentPage = 1;
        this.render();
    },

    filterBySubject(subject) {
        this.filterSubject = subject;
        this.currentPage = 1;
        this.render();
    },

    goToPage(page) {
        const teachers = this.getFilteredTeachers();
        const totalPages = Math.ceil(teachers.length / this.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
        }
    },

    getDegreeBadge(degree) {
        const badges = {
            'Tiến sĩ': 'badge-success',
            'Thạc sĩ': 'badge-info',
            'Cử nhân': 'badge-secondary'
        };
        return badges[degree] || 'badge-secondary';
    },

    view(id) {
        const teacher = Database.getTeacher(id);
        if (!teacher) return;

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Teachers.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user"></i> Thông Tin Giảng Viên</h3>
                        <button class="close-btn" onclick="Teachers.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="teacher-detail">
                        <div class="teacher-avatar-section">
                            <img src="${teacher.avatar}" alt="${teacher.name}" class="teacher-avatar-large">
                            <h2>${teacher.name}</h2>
                            <p>${teacher.subject}</p>
                        </div>
                        <div class="teacher-info-grid">
                            <div class="info-item">
                                <label>Mã giảng viên:</label>
                                <span>${teacher.id}</span>
                            </div>
                            <div class="info-item">
                                <label>Email:</label>
                                <span>${teacher.email}</span>
                            </div>
                            <div class="info-item">
                                <label>Số điện thoại:</label>
                                <span>${teacher.phone}</span>
                            </div>
                            <div class="info-item">
                                <label>Học vị:</label>
                                <span>${teacher.degree}</span>
                            </div>
                            <div class="info-item">
                                <label>Kinh nghiệm:</label>
                                <span>${teacher.experience} năm</span>
                            </div>
                            <div class="info-item full-width">
                                <label>Lớp phụ trách:</label>
                                <span>${teacher.classes.join(', ')}</span>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-secondary" onclick="Teachers.closeModal()">
                                <i class="fas fa-times"></i> Đóng
                            </button>
                            <button class="btn btn-primary" onclick="Teachers.closeModal(); Teachers.edit('${teacher.id}')">
                                <i class="fas fa-edit"></i> Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    addNew() {
        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Teachers.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user-plus"></i> Thêm Giảng Viên Mới</h3>
                        <button class="close-btn" onclick="Teachers.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Teachers.saveNewTeacher(event)" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Họ và tên <span class="required">*</span></label>
                                <input type="text" name="name" required>
                            </div>
                            <div class="form-group">
                                <label>Môn dạy <span class="required">*</span></label>
                                <input type="text" name="subject" required>
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
                                <label>Học vị</label>
                                <select name="degree">
                                    <option value="Cử nhân">Cử nhân</option>
                                    <option value="Thạc sĩ">Thạc sĩ</option>
                                    <option value="Tiến sĩ">Tiến sĩ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Kinh nghiệm (năm)</label>
                                <input type="number" name="experience" min="0" value="0">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Teachers.closeModal()">
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

    saveNewTeacher(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacherData = {
            name: formData.get('name'),
            subject: formData.get('subject'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            degree: formData.get('degree'),
            experience: parseInt(formData.get('experience')) || 0,
            classes: [],
            performance: 0
        };

        const newTeacher = Database.addTeacher(teacherData);
        this.closeModal();
        Utils.showToast(`Đã thêm giảng viên ${newTeacher.name}`, 'success');
        this.render();
    },

    edit(id) {
        const teacher = Database.getTeacher(id);
        if (!teacher) {
            Utils.showToast('Không tìm thấy giảng viên', 'error');
            return;
        }

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Teachers.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-edit"></i> Chỉnh Sửa Giảng Viên</h3>
                        <button class="close-btn" onclick="Teachers.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Teachers.saveEditTeacher(event, '${id}')" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Họ và tên <span class="required">*</span></label>
                                <input type="text" name="name" value="${teacher.name}" required>
                            </div>
                            <div class="form-group">
                                <label>Môn dạy <span class="required">*</span></label>
                                <input type="text" name="subject" value="${teacher.subject}" required>
                            </div>
                            <div class="form-group">
                                <label>Email <span class="required">*</span></label>
                                <input type="email" name="email" value="${teacher.email}" required>
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại</label>
                                <input type="tel" name="phone" value="${teacher.phone}">
                            </div>
                            <div class="form-group">
                                <label>Học vị</label>
                                <select name="degree">
                                    <option value="Cử nhân" ${teacher.degree === 'Cử nhân' ? 'selected' : ''}>Cử nhân</option>
                                    <option value="Thạc sĩ" ${teacher.degree === 'Thạc sĩ' ? 'selected' : ''}>Thạc sĩ</option>
                                    <option value="Tiến sĩ" ${teacher.degree === 'Tiến sĩ' ? 'selected' : ''}>Tiến sĩ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Kinh nghiệm (năm)</label>
                                <input type="number" name="experience" min="0" value="${teacher.experience}">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Teachers.closeModal()">
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

    saveEditTeacher(event, id) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacherData = {
            name: formData.get('name'),
            subject: formData.get('subject'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            degree: formData.get('degree'),
            experience: parseInt(formData.get('experience'))
        };

        const updated = Database.updateTeacher(id, teacherData);
        if (updated) {
            this.closeModal();
            Utils.showToast(`Đã cập nhật thông tin ${updated.name}`, 'success');
            this.render();
        } else {
            Utils.showToast('Cập nhật thất bại', 'error');
        }
    },

    deleteTeacher(id) {
        const teacher = Database.getTeacher(id);
        if (!teacher) return;

        if (confirm(`Bạn có chắc muốn xóa giảng viên ${teacher.name}?`)) {
            const deleted = Database.deleteTeacher(id);
            if (deleted) {
                Utils.showToast(`Đã xóa giảng viên ${teacher.name}`, 'success');
                this.render();
            } else {
                Utils.showToast('Xóa thất bại', 'error');
            }
        }
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    }
};
