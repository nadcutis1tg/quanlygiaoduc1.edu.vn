// Teachers Management Module - FIXED (No Rating)
const Teachers = {
    currentPage: 1,
    itemsPerPage: 12,
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
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            <i class="fas fa-university"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${[...new Set(allTeachers.map(t => t.faculty))].length}</h3>
                            <p>Khoa</p>
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
                        <input type="text" placeholder="Tìm kiếm giảng viên..." 
                               value="${this.searchQuery}" onkeyup="Teachers.handleSearch(this.value)">
                    </div>
                    <select onchange="Teachers.filterBySubject(this.value)">
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
                                <th>Khoa</th>
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
                <td><span class="badge badge-secondary">${teacher.faculty}</span></td>
                <td>${teacher.classes.slice(0, 2).join(', ')}${teacher.classes.length > 2 ? '...' : ''}</td>
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
            pages += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                             onclick="Teachers.goToPage(${i})">${i}</button>`;
        }
        return `<div class="pagination">${pages}</div>`;
    },

    getFilteredTeachers() {
        let teachers = Database.getAllTeachers();
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            teachers = teachers.filter(t => 
                t.name.toLowerCase().includes(query) ||
                t.id.toLowerCase().includes(query) ||
                t.subject.toLowerCase().includes(query)
            );
        }
        if (this.filterSubject !== 'all') {
            teachers = teachers.filter(t => t.subject === this.filterSubject);
        }
        return teachers;
    },

    getDegreeBadge(degree) {
        const badges = {
            'Tiến sĩ': 'badge-success',
            'Thạc sĩ': 'badge-primary',
            'Cử nhân': 'badge-secondary'
        };
        return badges[degree] || 'badge-secondary';
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
        this.currentPage = page;
        this.render();
    },

    view(id) {
        const teacher = Database.getTeacher(id);
        if (!teacher) return;

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Teachers.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user-tie"></i> Thông tin Giảng viên</h3>
                        <button class="close-btn" onclick="Teachers.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="teacher-detail">
                        <div class="detail-grid">
                            <div class="info-item">
                                <label>Mã GV:</label>
                                <span>${teacher.id}</span>
                            </div>
                            <div class="info-item">
                                <label>Họ tên:</label>
                                <span>${teacher.name}</span>
                            </div>
                            <div class="info-item">
                                <label>Email:</label>
                                <span>${teacher.email}</span>
                            </div>
                            <div class="info-item">
                                <label>SĐT:</label>
                                <span>${teacher.phone}</span>
                            </div>
                            <div class="info-item">
                                <label>Môn dạy:</label>
                                <span>${teacher.subject}</span>
                            </div>
                            <div class="info-item">
                                <label>Khoa:</label>
                                <span>${teacher.faculty}</span>
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
                        <h3><i class="fas fa-plus"></i> Thêm Giảng viên</h3>
                        <button class="close-btn" onclick="Teachers.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Teachers.saveNew(event)" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Họ tên <span class="required">*</span></label>
                                <input type="text" name="name" required>
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
                                <label>Môn dạy <span class="required">*</span></label>
                                <input type="text" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label>Khoa <span class="required">*</span></label>
                                <select name="faculty" required>
                                    <option value="Công nghệ Thông tin">Công nghệ Thông tin</option>
                                    <option value="Quản trị Kinh doanh">Quản trị Kinh doanh</option>
                                    <option value="Kế toán">Kế toán</option>
                                    <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                                    <option value="Kỹ thuật Cơ khí">Kỹ thuật Cơ khí</option>
                                    <option value="Y Dược">Y Dược</option>
                                    <option value="Khoa học Cơ bản">Khoa học Cơ bản</option>
                                </select>
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

    saveNew(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacherData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            faculty: formData.get('faculty'),
            degree: formData.get('degree'),
            experience: parseInt(formData.get('experience')) || 0,
            classes: []
        };

        Database.addTeacher(teacherData);
        this.closeModal();
        Utils.showToast('Đã thêm giảng viên', 'success');
        this.render();
    },

    edit(id) {
        const teacher = Database.getTeacher(id);
        if (!teacher) return;

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Teachers.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-edit"></i> Chỉnh sửa Giảng viên</h3>
                        <button class="close-btn" onclick="Teachers.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Teachers.saveEdit(event, '${id}')" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Họ tên <span class="required">*</span></label>
                                <input type="text" name="name" value="${teacher.name}" required>
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
                                <label>Môn dạy <span class="required">*</span></label>
                                <input type="text" name="subject" value="${teacher.subject}" required>
                            </div>
                            <div class="form-group">
                                <label>Khoa <span class="required">*</span></label>
                                <select name="faculty" required>
                                    <option value="Công nghệ Thông tin" ${teacher.faculty === 'Công nghệ Thông tin' ? 'selected' : ''}>Công nghệ Thông tin</option>
                                    <option value="Quản trị Kinh doanh" ${teacher.faculty === 'Quản trị Kinh doanh' ? 'selected' : ''}>Quản trị Kinh doanh</option>
                                    <option value="Kế toán" ${teacher.faculty === 'Kế toán' ? 'selected' : ''}>Kế toán</option>
                                    <option value="Ngôn ngữ Anh" ${teacher.faculty === 'Ngôn ngữ Anh' ? 'selected' : ''}>Ngôn ngữ Anh</option>
                                    <option value="Kỹ thuật Cơ khí" ${teacher.faculty === 'Kỹ thuật Cơ khí' ? 'selected' : ''}>Kỹ thuật Cơ khí</option>
                                    <option value="Y Dược" ${teacher.faculty === 'Y Dược' ? 'selected' : ''}>Y Dược</option>
                                    <option value="Khoa học Cơ bản" ${teacher.faculty === 'Khoa học Cơ bản' ? 'selected' : ''}>Khoa học Cơ bản</option>
                                </select>
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
                                <input type="number" name="experience" value="${teacher.experience}" min="0">
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

    saveEdit(event, id) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacherData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            faculty: formData.get('faculty'),
            degree: formData.get('degree'),
            experience: parseInt(formData.get('experience'))
        };

        Database.updateTeacher(id, teacherData);
        this.closeModal();
        Utils.showToast('Đã cập nhật giảng viên', 'success');
        this.render();
    },

    deleteTeacher(id) {
        const teacher = Database.getTeacher(id);
        if (!teacher) return;

        if (confirm(`Bạn có chắc muốn xóa giảng viên ${teacher.name}?`)) {
            Database.deleteTeacher(id);
            Utils.showToast('Đã xóa giảng viên', 'success');
            this.render();
        }
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    }
};
