// Schedule Management Module
const Schedule = {
    selectedClass: 'all',
    selectedWeek: 0,
    selectedCourse: null,
    pendingCourses: [],

    render() {
        const contentArea = document.getElementById('content-area');
        const classes = Database.classes;
        
        // Tạo danh sách môn học chờ xếp
        this.generatePendingCourses();

        contentArea.innerHTML = `
            <style>
                .schedule-page-ai { height: 100%; display: flex; flex-direction: column; }
                .schedule-header { background: white; padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
                .schedule-header h1 { font-size: 24px; font-weight: 700; margin: 0; }
                .schedule-subtitle { font-size: 12px; color: #6b7280; margin-top: 4px; }
                .schedule-actions { display: flex; gap: 12px; }
                .schedule-content { flex: 1; display: flex; gap: 24px; padding: 24px; overflow: hidden; }
                .schedule-sidebar { width: 300px; background: white; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 20px; display: flex; flex-direction: column; }
                .sidebar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #f3f4f6; }
                .sidebar-header h3 { font-size: 14px; font-weight: 700; text-transform: uppercase; margin: 0; }
                .ai-badge { background: #eef2ff; color: #4f46e5; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 9999px; }
                .sidebar-filter { width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px; }
                .pending-courses { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
                .course-card { padding: 16px; border-radius: 12px; cursor: pointer; transition: all 0.2s; border-left: 4px solid; }
                .course-card.blue { background: #eff6ff; border-left-color: #3b82f6; }
                .course-card.purple { background: #f5f3ff; border-left-color: #8b5cf6; }
                .course-card.orange { background: #fff7ed; border-left-color: #f97316; }
                .course-card.green { background: #f0fdf4; border-left-color: #22c55e; }
                .course-card.red { background: #fef2f2; border-left-color: #ef4444; }
                .course-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-2px); }
                .course-card.selected { box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.3); }
                .course-name { font-size: 14px; font-weight: 700; margin: 0 0 8px 0; }
                .course-teacher { font-size: 11px; color: #6b7280; margin: 0 0 12px 0; }
                .course-meta { display: flex; justify-content: space-between; }
                .course-periods { font-size: 10px; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid #e5e7eb; }
                .course-class { font-size: 10px; font-weight: 700; color: #4f46e5; text-transform: uppercase; }
                .schedule-table-wrapper { flex: 1; background: white; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column; }
                .table-info { padding: 16px 20px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 12px; }
                .legend { display: flex; gap: 16px; font-size: 11px; }
                .legend-box { width: 12px; height: 12px; border-radius: 2px; display: inline-block; margin-right: 4px; }
                .legend-box.blue { background: #3b82f6; }
                .legend-box.purple { background: #8b5cf6; }
                .schedule-table-container { flex: 1; overflow: auto; }
                .schedule-table-ai { width: 100%; border-collapse: collapse; }
                .schedule-table-ai thead { position: sticky; top: 0; z-index: 10; background: white; }
                .schedule-table-ai th { padding: 16px; border-bottom: 2px solid #e5e7eb; border-right: 1px solid #e5e7eb; text-align: center; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #6b7280; }
                .schedule-table-ai th.time-column { width: 80px; }
                .schedule-table-ai td { padding: 8px; border-bottom: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; height: 120px; vertical-align: top; }
                .period-cell { background: #f9fafb; text-align: center; font-weight: 700; color: #9ca3af; font-size: 14px; }
                .schedule-cell { cursor: pointer; transition: background 0.2s; }
                .schedule-cell:hover { background: #eef2ff; }
                .empty-cell { height: 100%; display: flex; align-items: center; justify-content: center; color: #d1d5db; font-size: 12px; }
                .class-block { padding: 8px; border-radius: 8px; height: 100%; display: flex; flex-direction: column; justify-content: center; color: white; font-size: 10px; }
                .class-block.blue { background: #3b82f6; }
                .class-block.purple { background: #8b5cf6; }
                .class-block.orange { background: #f97316; }
                .class-block.green { background: #22c55e; }
                .class-block.red { background: #ef4444; }
                .class-block.pink { background: #ec4899; }
                .block-subject { font-weight: 700; margin: 0 0 4px 0; font-size: 11px; }
                .block-teacher, .block-room, .block-class { margin: 2px 0; opacity: 0.9; }
            </style>
            <div class="schedule-page-ai">
                <!-- Header -->
                <div class="schedule-header">
                    <div>
                        <h1>📅 Quản lý Thời khóa biểu AI</h1>
                        <p class="schedule-subtitle">Học kỳ 1 (2024 - 2025) • Cơ sở chính</p>
                    </div>
                    <div class="schedule-actions">
                        <button class="btn btn-success" onclick="Schedule.openAIScan()">
                            <i class="fas fa-file-import"></i> NHẬP EXCEL (AI SCAN)
                        </button>
                        <button class="btn btn-primary" onclick="Schedule.autoSchedule()">
                            <i class="fas fa-magic"></i> TỰ ĐỘNG XẾP LỊCH
                        </button>
                        <button class="btn btn-secondary" onclick="Schedule.exportSchedule()">
                            <i class="fas fa-download"></i> XUẤT FILE
                        </button>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="schedule-content">
                    <!-- Sidebar: Môn học chờ xếp -->
                    <div class="schedule-sidebar">
                        <div class="sidebar-header">
                            <h3>Môn học chờ xếp</h3>
                            <span class="ai-badge">AI ĐỀ XUẤT</span>
                        </div>
                        
                        <!-- Filter -->
                        <select class="sidebar-filter" id="class-filter" onchange="Schedule.filterByClass(this.value)">
                            <option value="all">Tất cả lớp</option>
                            ${classes.map(c => `
                                <option value="${c.name}" ${this.selectedClass === c.name ? 'selected' : ''}>
                                    ${c.name}
                                </option>
                            `).join('')}
                        </select>

                        <div class="pending-courses">
                            ${this.renderPendingCourses()}
                        </div>
                    </div>

                    <!-- Main Table -->
                    <div class="schedule-table-wrapper">
                        <div class="table-info">
                            <span><i class="fas fa-info-circle"></i> Mẹo: Chọn môn bên trái rồi nhấn vào ô trống để xếp</span>
                            <div class="legend">
                                <span><span class="legend-box blue"></span> Lý thuyết</span>
                                <span><span class="legend-box purple"></span> Thực hành</span>
                            </div>
                        </div>
                        ${this.renderScheduleTable()}
                    </div>
                </div>
            </div>
        `;
    },

    generatePendingCourses() {
        const teachers = Database.getAllTeachers();
        const classes = Database.classes;
        
        this.pendingCourses = [];
        
        // Tạo danh sách môn học mẫu chưa xếp lịch
        const subjects = [
            { name: 'Toán Rời Rạc', periods: 3, color: 'blue', type: 'theory' },
            { name: 'Lập trình C++', periods: 4, color: 'purple', type: 'practice' },
            { name: 'AI Cơ bản', periods: 2, color: 'orange', type: 'theory' },
            { name: 'Cơ sở dữ liệu', periods: 3, color: 'green', type: 'theory' },
            { name: 'Mạng máy tính', periods: 3, color: 'red', type: 'theory' }
        ];

        subjects.forEach((subject, index) => {
            const teacher = teachers[index % teachers.length];
            const classInfo = classes[index % classes.length];
            
            this.pendingCourses.push({
                id: `pending-${index}`,
                subject: subject.name,
                teacher: teacher.name,
                teacherId: teacher.id,
                className: classInfo.name,
                periods: subject.periods,
                color: subject.color,
                type: subject.type
            });
        });
    },

    renderPendingCourses() {
        let courses = this.pendingCourses;
        
        if (this.selectedClass !== 'all') {
            courses = courses.filter(c => c.className === this.selectedClass);
        }

        return courses.map(course => `
            <div class="course-card ${course.color}" 
                 data-course-id="${course.id}"
                 onclick="Schedule.selectCourse('${course.id}')">
                <p class="course-name">${course.subject}</p>
                <p class="course-teacher"><i class="fas fa-user-tie"></i> GV: ${course.teacher}</p>
                <div class="course-meta">
                    <span class="course-periods">${course.periods} Tiết/Tuần</span>
                    <span class="course-class">Lớp: ${course.className}</span>
                </div>
            </div>
        `).join('');
    },

    selectCourse(courseId) {
        // Bỏ chọn tất cả
        document.querySelectorAll('.course-card').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Chọn môn học
        const courseEl = document.querySelector(`[data-course-id="${courseId}"]`);
        if (courseEl) {
            courseEl.classList.add('selected');
            this.selectedCourse = this.pendingCourses.find(c => c.id === courseId);
        }
    },

    renderScheduleTable() {
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
        const periods = 6; // 6 ca học

        let schedules = Database.schedules;
        if (this.selectedClass !== 'all') {
            schedules = schedules.filter(s => s.className === this.selectedClass);
        }

        return `
            <div class="schedule-table-container">
                <table class="schedule-table-ai">
                    <thead>
                        <tr>
                            <th class="time-column">CA</th>
                            ${days.map(day => `<th>${day}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${Array.from({length: periods}, (_, periodIndex) => `
                            <tr>
                                <td class="period-cell">Ca ${periodIndex + 1}</td>
                                ${days.map((day, dayIndex) => {
                                    const schedule = schedules.find(s => 
                                        s.dayIndex === dayIndex && s.periodIndex === periodIndex
                                    );
                                    return `
                                        <td class="schedule-cell ${schedule ? 'has-class' : ''}" 
                                            data-day="${dayIndex}" 
                                            data-period="${periodIndex}"
                                            onclick="Schedule.placeCourse(${dayIndex}, ${periodIndex})">
                                            ${schedule ? `
                                                <div class="class-block ${this.getColorClass(schedule.subject)}">
                                                    <p class="block-subject">${schedule.subject}</p>
                                                    <p class="block-teacher">${schedule.teacherName}</p>
                                                    <p class="block-room">${schedule.room}</p>
                                                    ${this.selectedClass === 'all' ? `<p class="block-class">${schedule.className}</p>` : ''}
                                                </div>
                                            ` : '<div class="empty-cell"></div>'}
                                        </td>
                                    `;
                                }).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    getColorClass(subject) {
        const colors = ['blue', 'purple', 'orange', 'green', 'red', 'pink'];
        const hash = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    },

    placeCourse(dayIndex, periodIndex) {
        if (!this.selectedCourse) {
            Utils.showToast('Vui lòng chọn môn học từ danh sách bên trái', 'warning');
            return;
        }

        // Kiểm tra xem ô đã có lịch chưa
        const existingSchedule = Database.schedules.find(s => 
            s.dayIndex === dayIndex && 
            s.periodIndex === periodIndex &&
            (this.selectedClass === 'all' || s.className === this.selectedClass)
        );

        if (existingSchedule) {
            if (confirm('Ô này đã có lịch. Bạn có muốn gỡ môn học này không?')) {
                Database.deleteSchedule(existingSchedule.id);
                Utils.showToast('Đã gỡ lịch học', 'success');
                this.render();
            }
            return;
        }

        // Thêm lịch học mới
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
        const periods = ['Tiết 1-2', 'Tiết 3-4', 'Tiết 5-6', 'Tiết 7-8', 'Tiết 9-10', 'Tiết 11-12'];
        const classInfo = Database.classes.find(c => c.name === this.selectedCourse.className);

        const scheduleData = {
            classId: classInfo.id,
            className: this.selectedCourse.className,
            faculty: classInfo.faculty,
            subject: this.selectedCourse.subject,
            teacherId: this.selectedCourse.teacherId,
            teacherName: this.selectedCourse.teacher,
            room: `P${Math.floor(Math.random() * 500) + 100}`,
            day: days[dayIndex],
            dayIndex: dayIndex,
            period: periods[periodIndex],
            periodIndex: periodIndex,
            startTime: `${7 + periodIndex * 2}:00`,
            endTime: `${9 + periodIndex * 2}:00`
        };

        Database.addSchedule(scheduleData);
        Utils.showToast(`Đã xếp ${this.selectedCourse.subject} vào ${days[dayIndex]} Ca ${periodIndex + 1}`, 'success');
        
        // Bỏ chọn môn học
        this.selectedCourse = null;
        this.render();
    },

    filterByClass(className) {
        this.selectedClass = className;
        this.render();
    },

    openAIScan() {
        const modal = `
            <div class="modal-overlay ai-scan-modal" onclick="if(event.target === this) Schedule.closeModal()">
                <div class="modal-content ai-modal-content">
                    <div class="ai-modal-header">
                        <div class="ai-header-left">
                            <div class="ai-icon">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3>AI ĐANG PHÂN TÍCH FILE...</h3>
                        </div>
                        <button class="close-btn" onclick="Schedule.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="ai-modal-body">
                        <!-- Scanning Effect -->
                        <div id="scanningEffect" class="scanning-effect">
                            <div class="progress-bar-ai">
                                <div class="progress-fill-ai"></div>
                            </div>
                            <p class="scanning-text">Đang nhận diện Header: "Mã GV", "Tên môn học", "Sĩ số phòng"...</p>
                        </div>

                        <!-- AI Result -->
                        <div id="aiResult" class="ai-result hidden">
                            <div class="success-box">
                                <i class="fas fa-check-circle"></i>
                                <div>
                                    <p class="success-title">PHÂN TÍCH THÀNH CÔNG!</p>
                                    <p class="success-file">File: "Danh_sach_HK1_2024.xlsx"</p>
                                    <ul class="success-list">
                                        <li>👨‍🏫 <strong>35 Giảng viên</strong>: Tự động khớp từ cột "Teacher_ID"</li>
                                        <li>📚 <strong>24 Môn học</strong>: Tự động khớp từ cột "Course_Code"</li>
                                        <li>🏫 <strong>18 Phòng học</strong>: Tự động khớp từ cột "Room_Capacity"</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="ai-question-box">
                                <i class="fas fa-comment-dots"></i>
                                <div>
                                    <p class="ai-question-title">TRỢ LÝ AI HỎI:</p>
                                    <p class="ai-question-text">"Tôi phát hiện có <strong>2 Giảng viên</strong> bị trùng lịch nếu xếp theo mặc định. Bạn có muốn tôi ưu tiên xếp họ dạy vào buổi sáng để tối ưu không?"</p>
                                </div>
                            </div>

                            <div class="ai-actions">
                                <button class="btn btn-primary btn-large" onclick="Schedule.proceedWithAI()">
                                    TIẾN HÀNH XẾP LỊCH
                                </button>
                                <button class="btn btn-secondary btn-large" onclick="Schedule.closeModal()">
                                    CHỈNH SỬA THỦ CÔNG
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        
        // Simulate AI scanning
        setTimeout(() => {
            document.getElementById('scanningEffect').classList.add('hidden');
            document.getElementById('aiResult').classList.remove('hidden');
        }, 2200);
    },

    proceedWithAI() {
        this.closeModal();
        Utils.showToast('AI đang tự động xếp lịch...', 'info');
        setTimeout(() => {
            this.autoSchedule();
        }, 500);
    },

    autoSchedule() {
        Utils.showLoading('AI đang tự động xếp lịch tối ưu...');
        
        setTimeout(() => {
            // Xóa tất cả lịch cũ
            Database.schedules = [];
            
            // Tự động xếp lịch cho các môn học
            const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
            const periods = ['Tiết 1-2', 'Tiết 3-4', 'Tiết 5-6', 'Tiết 7-8', 'Tiết 9-10', 'Tiết 11-12'];
            
            this.pendingCourses.forEach((course, index) => {
                const dayIndex = index % 5;
                const periodIndex = Math.floor(index / 5) % 6;
                const classInfo = Database.classes.find(c => c.name === course.className);
                
                if (classInfo) {
                    Database.addSchedule({
                        classId: classInfo.id,
                        className: course.className,
                        faculty: classInfo.faculty,
                        subject: course.subject,
                        teacherId: course.teacherId,
                        teacherName: course.teacher,
                        room: `P${Math.floor(Math.random() * 500) + 100}`,
                        day: days[dayIndex],
                        dayIndex: dayIndex,
                        period: periods[periodIndex],
                        periodIndex: periodIndex,
                        startTime: `${7 + periodIndex * 2}:00`,
                        endTime: `${9 + periodIndex * 2}:00`
                    });
                }
            });
            
            Utils.hideLoading();
            Utils.showToast('AI đã xếp lịch thành công cho tất cả môn học!', 'success');
            this.render();
        }, 2000);
    },

    previousWeek() {
        this.selectedWeek--;
        Utils.showToast('Xem tuần trước', 'info');
    },

    nextWeek() {
        this.selectedWeek++;
        Utils.showToast('Xem tuần sau', 'info');
    },

    viewScheduleDetail(id) {
        if (!id) {
            Utils.showToast('Tiết học trống', 'info');
            return;
        }

        const schedule = Database.schedules.find(s => s.id === id);
        if (!schedule) return;

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Schedule.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-calendar"></i> Chi Tiết Lịch Học</h3>
                        <button class="close-btn" onclick="Schedule.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="schedule-detail">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Môn học:</label>
                                <span class="highlight">${schedule.subject}</span>
                            </div>
                            <div class="detail-item">
                                <label>Lớp:</label>
                                <span>${schedule.className}</span>
                            </div>
                            <div class="detail-item">
                                <label>Giảng viên:</label>
                                <span>${schedule.teacherName}</span>
                            </div>
                            <div class="detail-item">
                                <label>Phòng học:</label>
                                <span>${schedule.room}</span>
                            </div>
                            <div class="detail-item">
                                <label>Thời gian:</label>
                                <span>${schedule.day}, ${schedule.period}</span>
                            </div>
                            <div class="detail-item">
                                <label>Giờ học:</label>
                                <span>${schedule.startTime} - ${schedule.endTime}</span>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-secondary" onclick="Schedule.closeModal()">
                                <i class="fas fa-times"></i> Đóng
                            </button>
                            <button class="btn btn-primary" onclick="Schedule.closeModal(); Schedule.editSchedule('${schedule.id}')">
                                <i class="fas fa-edit"></i> Chỉnh sửa
                            </button>
                            <button class="btn btn-danger" onclick="Schedule.deleteScheduleConfirm('${schedule.id}')">
                                <i class="fas fa-trash"></i> Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    addSchedule() {
        const classes = Database.classes;
        const teachers = Database.getAllTeachers();
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
        const periods = ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Schedule.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-plus"></i> Thêm Lịch Học</h3>
                        <button class="close-btn" onclick="Schedule.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Schedule.saveNewSchedule(event)" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Lớp <span class="required">*</span></label>
                                <select name="className" required>
                                    ${classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Môn học <span class="required">*</span></label>
                                <input type="text" name="subject" required>
                            </div>
                            <div class="form-group">
                                <label>Giảng viên <span class="required">*</span></label>
                                <select name="teacherId" required>
                                    ${teachers.map(t => `<option value="${t.id}">${t.name} - ${t.subject}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Phòng học <span class="required">*</span></label>
                                <input type="text" name="room" placeholder="P101" required>
                            </div>
                            <div class="form-group">
                                <label>Thứ <span class="required">*</span></label>
                                <select name="day" required>
                                    ${days.map((d, i) => `<option value="${i}">${d}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Tiết <span class="required">*</span></label>
                                <select name="period" required>
                                    ${periods.map((p, i) => `<option value="${i}">${p}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Schedule.closeModal()">
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

    saveNewSchedule(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacher = Database.getTeacher(formData.get('teacherId'));
        const className = formData.get('className');
        const classInfo = Database.classes.find(c => c.name === className);
        const dayIndex = parseInt(formData.get('day'));
        const periodIndex = parseInt(formData.get('period'));
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
        const periods = ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];

        const scheduleData = {
            classId: classInfo.id,
            className: className,
            subject: formData.get('subject'),
            teacherId: teacher.id,
            teacherName: teacher.name,
            room: formData.get('room'),
            day: days[dayIndex],
            dayIndex: dayIndex,
            period: periods[periodIndex],
            periodIndex: periodIndex,
            startTime: `${7 + periodIndex}:00`,
            endTime: `${8 + periodIndex}:00`
        };

        Database.addSchedule(scheduleData);
        this.closeModal();
        Utils.showToast('Đã thêm lịch học', 'success');
        this.render();
    },

    editSchedule(id) {
        const schedule = Database.schedules.find(s => s.id === id);
        if (!schedule) return;

        const classes = Database.classes;
        const teachers = Database.getAllTeachers();
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
        const periods = ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Schedule.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-edit"></i> Chỉnh Sửa Lịch Học</h3>
                        <button class="close-btn" onclick="Schedule.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form onsubmit="Schedule.saveEditSchedule(event, '${id}')" class="student-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Lớp <span class="required">*</span></label>
                                <select name="className" required>
                                    ${classes.map(c => `<option value="${c.name}" ${c.name === schedule.className ? 'selected' : ''}>${c.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Môn học <span class="required">*</span></label>
                                <input type="text" name="subject" value="${schedule.subject}" required>
                            </div>
                            <div class="form-group">
                                <label>Giảng viên <span class="required">*</span></label>
                                <select name="teacherId" required>
                                    ${teachers.map(t => `<option value="${t.id}" ${t.id === schedule.teacherId ? 'selected' : ''}>${t.name} - ${t.subject}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Phòng học <span class="required">*</span></label>
                                <input type="text" name="room" value="${schedule.room}" required>
                            </div>
                            <div class="form-group">
                                <label>Thứ <span class="required">*</span></label>
                                <select name="day" required>
                                    ${days.map((d, i) => `<option value="${i}" ${i === schedule.dayIndex ? 'selected' : ''}>${d}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Tiết <span class="required">*</span></label>
                                <select name="period" required>
                                    ${periods.map((p, i) => `<option value="${i}" ${i === schedule.periodIndex ? 'selected' : ''}>${p}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="Schedule.closeModal()">
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

    saveEditSchedule(event, id) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const teacher = Database.getTeacher(formData.get('teacherId'));
        const className = formData.get('className');
        const classInfo = Database.classes.find(c => c.name === className);
        const dayIndex = parseInt(formData.get('day'));
        const periodIndex = parseInt(formData.get('period'));
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
        const periods = ['Tiết 1', 'Tiết 2', 'Tiết 3', 'Tiết 4', 'Tiết 5'];

        const scheduleData = {
            classId: classInfo.id,
            className: className,
            subject: formData.get('subject'),
            teacherId: teacher.id,
            teacherName: teacher.name,
            room: formData.get('room'),
            day: days[dayIndex],
            dayIndex: dayIndex,
            period: periods[periodIndex],
            periodIndex: periodIndex,
            startTime: `${7 + periodIndex}:00`,
            endTime: `${8 + periodIndex}:00`
        };

        Database.updateSchedule(id, scheduleData);
        this.closeModal();
        Utils.showToast('Đã cập nhật lịch học', 'success');
        this.render();
    },

    deleteScheduleConfirm(id) {
        if (confirm('Bạn có chắc muốn xóa lịch học này?')) {
            Database.deleteSchedule(id);
            this.closeModal();
            Utils.showToast('Đã xóa lịch học', 'success');
            this.render();
        }
    },

    exportSchedule() {
        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Schedule.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-download"></i> Xuất Thời Khóa Biểu</h3>
                        <button class="close-btn" onclick="Schedule.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="export-options">
                        <p style="margin-bottom: 20px; color: #6B7280;">Chọn định dạng file bạn muốn xuất:</p>
                        <div class="export-buttons">
                            <button class="export-btn excel" onclick="Schedule.exportToExcel()">
                                <i class="fas fa-file-excel"></i>
                                <div>
                                    <strong>Xuất Excel</strong>
                                    <p>File .xlsx có thể chỉnh sửa</p>
                                </div>
                            </button>
                            <button class="export-btn pdf" onclick="Schedule.exportToPDF()">
                                <i class="fas fa-file-pdf"></i>
                                <div>
                                    <strong>Xuất PDF</strong>
                                    <p>File .pdf để in ấn</p>
                                </div>
                            </button>
                            <button class="export-btn csv" onclick="Schedule.exportToCSV()">
                                <i class="fas fa-file-csv"></i>
                                <div>
                                    <strong>Xuất CSV</strong>
                                    <p>File .csv dữ liệu thô</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .export-options { padding: 30px; }
                .export-buttons { display: flex; flex-direction: column; gap: 15px; }
                .export-btn { display: flex; align-items: center; gap: 20px; padding: 20px; border: 2px solid #E5E7EB; border-radius: 12px; background: white; cursor: pointer; transition: all 0.3s; text-align: left; }
                .export-btn:hover { border-color: #4F46E5; background: #F5F3FF; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2); }
                .export-btn i { font-size: 48px; }
                .export-btn.excel i { color: #10B981; }
                .export-btn.pdf i { color: #EF4444; }
                .export-btn.csv i { color: #F59E0B; }
                .export-btn strong { display: block; font-size: 16px; color: #111827; margin-bottom: 4px; }
                .export-btn p { margin: 0; font-size: 13px; color: #6B7280; }
            </style>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    exportToExcel() {
        this.closeModal();
        Utils.showToast('Đang tạo file Excel...', 'info');
        
        setTimeout(() => {
            // Tạo dữ liệu Excel
            let schedules = Database.schedules;
            if (this.selectedClass !== 'all') {
                schedules = schedules.filter(s => s.className === this.selectedClass);
            }

            // Tạo CSV content (Excel có thể mở file CSV)
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Lớp,Môn học,Giảng viên,Phòng,Thứ,Tiết,Giờ bắt đầu,Giờ kết thúc\n";
            
            schedules.forEach(s => {
                csvContent += `${s.className},${s.subject},${s.teacherName},${s.room},${s.day},${s.period},${s.startTime},${s.endTime}\n`;
            });

            // Download file
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `ThoiKhoaBieu_${this.selectedClass}_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Utils.showToast('Đã xuất file Excel thành công!', 'success');
        }, 1000);
    },

    exportToPDF() {
        this.closeModal();
        Utils.showToast('Đang tạo file PDF...', 'info');
        
        setTimeout(() => {
            // Tạo HTML content để in
            let schedules = Database.schedules;
            if (this.selectedClass !== 'all') {
                schedules = schedules.filter(s => s.className === this.selectedClass);
            }

            const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
            const periods = 6;

            let htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Thời Khóa Biểu</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { text-align: center; color: #4F46E5; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: center; }
                        th { background: #4F46E5; color: white; }
                        .class-info { background: #F0F9FF; padding: 8px; border-radius: 4px; }
                        .subject { font-weight: bold; color: #111827; }
                        .teacher { font-size: 12px; color: #6B7280; }
                        .room { font-size: 11px; color: #9CA3AF; }
                    </style>
                </head>
                <body>
                    <h1>THỜI KHÓA BIỂU ${this.selectedClass !== 'all' ? 'LỚP ' + this.selectedClass : 'TOÀN TRƯỜNG'}</h1>
                    <p style="text-align: center; color: #6B7280;">Học kỳ 1 (2024-2025)</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Ca</th>
                                ${days.map(day => `<th>${day}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${Array.from({length: periods}, (_, periodIndex) => `
                                <tr>
                                    <td><strong>Ca ${periodIndex + 1}</strong></td>
                                    ${days.map((day, dayIndex) => {
                                        const schedule = schedules.find(s => 
                                            s.dayIndex === dayIndex && s.periodIndex === periodIndex
                                        );
                                        return `
                                            <td>
                                                ${schedule ? `
                                                    <div class="class-info">
                                                        <div class="subject">${schedule.subject}</div>
                                                        <div class="teacher">${schedule.teacherName}</div>
                                                        <div class="room">${schedule.room}</div>
                                                    </div>
                                                ` : '-'}
                                            </td>
                                        `;
                                    }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
                </html>
            `;

            // Mở cửa sổ mới để in
            const printWindow = window.open('', '_blank');
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            
            // Tự động mở hộp thoại in
            setTimeout(() => {
                printWindow.print();
            }, 500);

            Utils.showToast('Đã mở cửa sổ in PDF. Chọn "Save as PDF" để lưu file!', 'success');
        }, 1000);
    },

    exportToCSV() {
        this.closeModal();
        Utils.showToast('Đang tạo file CSV...', 'info');
        
        setTimeout(() => {
            let schedules = Database.schedules;
            if (this.selectedClass !== 'all') {
                schedules = schedules.filter(s => s.className === this.selectedClass);
            }

            // Tạo CSV content
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "STT,Lớp,Môn học,Giảng viên,Mã GV,Phòng,Thứ,Tiết,Giờ bắt đầu,Giờ kết thúc\n";
            
            schedules.forEach((s, index) => {
                csvContent += `${index + 1},${s.className},${s.subject},${s.teacherName},${s.teacherId},${s.room},${s.day},${s.period},${s.startTime},${s.endTime}\n`;
            });

            // Download file
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `ThoiKhoaBieu_${this.selectedClass}_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            Utils.showToast('Đã xuất file CSV thành công!', 'success');
        }, 1000);
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    }
};
