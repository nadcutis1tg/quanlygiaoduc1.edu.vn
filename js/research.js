// Research Management Module
const Research = {
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    filterStatus: 'all',

    render() {
        const contentArea = document.getElementById('content-area');
        const research = this.getFilteredResearch();
        const paginated = Utils.paginate(research, this.currentPage, this.itemsPerPage);
        const allResearch = Database.getAllResearch();

        contentArea.innerHTML = `
            <div class="research-page">
                <div class="page-header">
                    <h1>🔬 Nghiên cứu Khoa học</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="Research.addNew()">
                            <i class="fas fa-plus"></i> Thêm đề tài
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <i class="fas fa-flask"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allResearch.length}</h3>
                            <p>Tổng đề tài</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            <i class="fas fa-tasks"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allResearch.filter(r => r.status === 'Đang thực hiện').length}</h3>
                            <p>Đang thực hiện</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allResearch.filter(r => r.status === 'Hoàn thành').length}</h3>
                            <p>Hoàn thành</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="stat-info">
                            <h3>${allResearch.filter(r => r.status === 'Đã xuất bản').length}</h3>
                            <p>Đã xuất bản</p>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="research-search" placeholder="Tìm kiếm đề tài..." 
                               value="${this.searchQuery}" onkeyup="Research.handleSearch(this.value)">
                    </div>
                    <select id="status-filter" onchange="Research.filterByStatus(this.value)">
                        <option value="all">Tất cả trạng thái</option>
                        <option value="Đang thực hiện" ${this.filterStatus === 'Đang thực hiện' ? 'selected' : ''}>Đang thực hiện</option>
                        <option value="Hoàn thành" ${this.filterStatus === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                        <option value="Đã xuất bản" ${this.filterStatus === 'Đã xuất bản' ? 'selected' : ''}>Đã xuất bản</option>
                    </select>
                </div>

                <!-- Research Cards -->
                <div class="research-grid">
                    ${paginated.data.map(r => this.renderResearchCard(r)).join('')}
                </div>

                <!-- Pagination -->
                ${this.renderPagination(paginated)}
            </div>
        `;
    },

    renderResearchCard(research) {
        return `
            <div class="research-card">
                <div class="research-header">
                    <h3>${research.title}</h3>
                    <span class="badge ${this.getStatusBadge(research.status)}">${research.status}</span>
                </div>
                <div class="research-body">
                    <div class="research-info">
                        <div class="info-row">
                            <i class="fas fa-user"></i>
                            <span>${research.author}</span>
                        </div>
                        <div class="info-row">
                            <i class="fas fa-calendar"></i>
                            <span>Bắt đầu: ${research.startDate}</span>
                        </div>
                        <div class="info-row">
                            <i class="fas fa-book-open"></i>
                            <span>${research.journal}</span>
                        </div>
                        <div class="info-row">
                            <i class="fas fa-quote-right"></i>
                            <span>${research.citations} trích dẫn</span>
                        </div>
                    </div>
                    <div class="research-progress">
                        <div class="progress-label">
                            <span>Tiến độ</span>
                            <span>${research.progress}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${research.progress}%"></div>
                        </div>
                    </div>
                    <div class="research-abstract">
                        <p>${research.abstract}</p>
                    </div>
                    <div class="research-keywords">
                        ${research.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
                    </div>
                </div>
                <div class="research-actions">
                    <button class="btn btn-secondary" onclick="Research.view('${research.id}')">
                        <i class="fas fa-eye"></i> Xem chi tiết
                    </button>
                    <button class="btn btn-secondary" onclick="Research.edit('${research.id}')">
                        <i class="fas fa-edit"></i> Chỉnh sửa
                    </button>
                    <button class="btn btn-danger" onclick="Research.deleteResearch('${research.id}')">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `;
    },

    renderPagination(paginated) {
        if (paginated.totalPages <= 1) return '';

        let pages = '';
        for (let i = 1; i <= paginated.totalPages; i++) {
            pages += `
                <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="Research.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        return `
            <div class="pagination">
                <button class="page-btn" onclick="Research.goToPage(${this.currentPage - 1})" 
                        ${this.currentPage === 1 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                ${pages}
                <button class="page-btn" onclick="Research.goToPage(${this.currentPage + 1})" 
                        ${this.currentPage === paginated.totalPages ? 'disabled' : ''}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    },

    getFilteredResearch() {
        let research = Database.getAllResearch();

        if (this.searchQuery) {
            research = Utils.search(research, this.searchQuery, ['title', 'author', 'abstract']);
        }

        if (this.filterStatus !== 'all') {
            research = research.filter(r => r.status === this.filterStatus);
        }

        return research;
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
        const research = this.getFilteredResearch();
        const totalPages = Math.ceil(research.length / this.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
        }
    },

    getStatusBadge(status) {
        const badges = {
            'Đang thực hiện': 'badge-warning',
            'Hoàn thành': 'badge-success',
            'Đã xuất bản': 'badge-info'
        };
        return badges[status] || 'badge-secondary';
    },

    view(id) {
        const research = Database.getResearch(id);
        if (!research) return;

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Research.closeModal()">
                <div class="modal-content large">
                    <div class="modal-header">
                        <h3><i class="fas fa-flask"></i> Chi Tiết Đề Tài</h3>
                        <button class="close-btn" onclick="Research.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="research-detail">
                        <h2>${research.title}</h2>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Tác giả:</label>
                                <span>${research.author}</span>
                            </div>
                            <div class="detail-item">
                                <label>Trạng thái:</label>
                                <span class="badge ${this.getStatusBadge(research.status)}">${research.status}</span>
                            </div>
                            <div class="detail-item">
                                <label>Ngày bắt đầu:</label>
                                <span>${research.startDate}</span>
                            </div>
                            <div class="detail-item">
                                <label>Tiến độ:</label>
                                <span>${research.progress}%</span>
                            </div>
                            <div class="detail-item">
                                <label>Tạp chí:</label>
                                <span>${research.journal}</span>
                            </div>
                            <div class="detail-item">
                                <label>Trích dẫn:</label>
                                <span>${research.citations}</span>
                            </div>
                        </div>
                        <div class="abstract-section">
                            <h4>Tóm tắt</h4>
                            <p>${research.abstract}</p>
                        </div>
                        <div class="keywords-section">
                            <h4>Từ khóa</h4>
                            <div class="research-keywords">
                                ${research.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-secondary" onclick="Research.closeModal()">
                                <i class="fas fa-times"></i> Đóng
                            </button>
                            <button class="btn btn-primary" onclick="Research.closeModal(); Research.edit('${research.id}')">
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
        const teachers = Database.getAllTeachers();
        
        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Research.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-plus"></i> Thêm Đề Tài Nghiên Cứu</h3>
                        <button class="close-btn" onclick="Research.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Research.saveNew(event)" class="student-form">
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label>Tên đề tài <span class="required">*</span></label>
                                <input type="text" name="title" required>
                            </div>
                            <div class="form-group">
                                <label>Tác giả <span class="required">*</span></label>
                                <select name="authorId" required>
                                    ${teachers.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Ngày bắt đầu</label>
                                <input type="date" name="startDate" value="${new Date().toISOString().split('T')[0]}">
                            </div>
                            <div class="form-group">
                                <label>Tạp chí</label>
                                <input type="text" name="journal" placeholder="Tạp chí Giáo dục">
                            </div>
                            <div class="form-group">
                                <label>Từ khóa (phân cách bằng dấu phẩy)</label>
                                <input type="text" name="keywords" placeholder="giáo dục, công nghệ">
                            </div>
                            <div class="form-group full-width">
                                <label>Tóm tắt</label>
                                <textarea name="abstract" rows="4"></textarea>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Research.closeModal()">
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
        const author = Database.getTeacher(formData.get('authorId'));
        
        const researchData = {
            title: formData.get('title'),
            author: author.name,
            authorId: author.id,
            startDate: formData.get('startDate'),
            journal: formData.get('journal') || 'Chưa xác định',
            abstract: formData.get('abstract') || '',
            keywords: formData.get('keywords') ? formData.get('keywords').split(',').map(k => k.trim()) : []
        };

        Database.addResearch(researchData);
        this.closeModal();
        Utils.showToast('Đã thêm đề tài nghiên cứu', 'success');
        this.render();
    },

    edit(id) {
        const research = Database.getResearch(id);
        if (!research) return;

        const teachers = Database.getAllTeachers();
        
        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Research.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-edit"></i> Chỉnh Sửa Đề Tài</h3>
                        <button class="close-btn" onclick="Research.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Research.saveEdit(event, '${id}')" class="student-form">
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label>Tên đề tài <span class="required">*</span></label>
                                <input type="text" name="title" value="${research.title}" required>
                            </div>
                            <div class="form-group">
                                <label>Tác giả <span class="required">*</span></label>
                                <select name="authorId" required>
                                    ${teachers.map(t => `<option value="${t.id}" ${t.id === research.authorId ? 'selected' : ''}>${t.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Trạng thái</label>
                                <select name="status">
                                    <option value="Đang thực hiện" ${research.status === 'Đang thực hiện' ? 'selected' : ''}>Đang thực hiện</option>
                                    <option value="Hoàn thành" ${research.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                                    <option value="Đã xuất bản" ${research.status === 'Đã xuất bản' ? 'selected' : ''}>Đã xuất bản</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Tiến độ (%)</label>
                                <input type="number" name="progress" min="0" max="100" value="${research.progress}">
                            </div>
                            <div class="form-group">
                                <label>Tạp chí</label>
                                <input type="text" name="journal" value="${research.journal}">
                            </div>
                            <div class="form-group">
                                <label>Từ khóa (phân cách bằng dấu phẩy)</label>
                                <input type="text" name="keywords" value="${research.keywords.join(', ')}">
                            </div>
                            <div class="form-group full-width">
                                <label>Tóm tắt</label>
                                <textarea name="abstract" rows="4">${research.abstract}</textarea>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Research.closeModal()">
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
        const author = Database.getTeacher(formData.get('authorId'));
        
        const researchData = {
            title: formData.get('title'),
            author: author.name,
            authorId: author.id,
            status: formData.get('status'),
            progress: parseInt(formData.get('progress')),
            journal: formData.get('journal'),
            abstract: formData.get('abstract'),
            keywords: formData.get('keywords').split(',').map(k => k.trim())
        };

        Database.updateResearch(id, researchData);
        this.closeModal();
        Utils.showToast('Đã cập nhật đề tài', 'success');
        this.render();
    },

    deleteResearch(id) {
        const research = Database.getResearch(id);
        if (!research) return;

        if (confirm(`Bạn có chắc muốn xóa đề tài "${research.title}"?`)) {
            Database.deleteResearch(id);
            Utils.showToast('Đã xóa đề tài', 'success');
            this.render();
        }
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    }
};
