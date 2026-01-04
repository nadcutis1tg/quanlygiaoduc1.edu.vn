// Schedule Management Module - AI-Powered Timetable
const Schedule = {
    currentWeek: 1,
    viewMode: 'class', // 'class', 'teacher', 'room'

    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="schedule-page">
                <div class="page-header">
                    <h1>📅 Thời khóa biểu Thông minh</h1>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="Schedule.uploadFile()">
                            <i class="fas fa-upload"></i> Upload Excel
                        </button>
                        <button class="btn btn-secondary" onclick="Schedule.exportSchedule()">
                            <i class="fas fa-download"></i> Xuất TKB
                        </button>
                        <button class="btn btn-primary" onclick="Schedule.autoGenerate()">
                            <i class="fas fa-magic"></i> AI Xếp lịch tự động
                        </button>
                    </div>
                </div>

                <!-- AI Optimization Banner -->
                <div class="ai-insights-banner">
                    <div class="insight-icon">🤖</div>
                    <div class="insight-content">
                        <h3>AI phát hiện 15 xung đột có thể tối ưu</h3>
                        <p>Giảm xung đột lịch học, tối ưu phòng học và giảm thời gian di chuyển giảng viên</p>
                        <button class="btn-link" onclick="Schedule.optimizeNow()">
                            Tối ưu ngay →
                        </button>
                    </div>
                </div>

                <!-- View Mode Selector -->
                <div class="view-mode-selector">
                    <button class="mode-btn ${this.viewMode === 'class' ? 'active' : ''}" 
                            onclick="Schedule.changeViewMode('class')">
                        <i class="fas fa-users"></i> Theo lớp
                    </button>
                    <button class="mode-btn ${this.viewMode === 'teacher' ? 'active' : ''}" 
                            onclick="Schedule.changeViewMode('teacher')">
                        <i class="fas fa-chalkboard-teacher"></i> Theo giảng viên
                    </button>
                    <button class="mode-btn ${this.viewMode === 'room' ? 'active' : ''}" 
                            onclick="Schedule.changeViewMode('room')">
                        <i class="fas fa-door-open"></i> Theo phòng học
                    </button>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <select id="schedule-filter" onchange="Schedule.filterSchedule(this.value)">
                        ${this.getFilterOptions()}
                    </select>
                    <select onchange="Schedule.changeWeek(this.value)">
                        <option value="1">Tuần 1</option>
                        <option value="2">Tuần 2</option>
                        <option value="3">Tuần 3</option>
                        <option value="4">Tuần 4</option>
                    </select>
                    <button class="btn btn-secondary" onclick="Schedule.manualEdit()">
                        <i class="fas fa-edit"></i> Xếp tay
                    </button>
                </div>

                <!-- Timetable -->
                <div class="timetable-container">
                    ${this.renderTimetable()}
                </div>

                <!-- Conflicts & Warnings -->
                <div class="conflicts-section">
                    <h3>⚠️ Xung đột & Cảnh báo</h3>
                    <div class="conflicts-list">
                        ${this.renderConflicts()}
                    </div>
                </div>

                <!-- Statistics -->
                <div class="schedule-stats">
                    <div class="stat-card">
                        <h4>📊 Thống kê</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Tổng tiết học:</span>
                                <span class="stat-value">450</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Phòng học sử dụng:</span>
                                <span class="stat-value">45/50</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Giảng viên tham gia:</span>
                                <span class="stat-value">120</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Xung đột:</span>
                                <span class="stat-value warning">15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getFilterOptions() {
        const options = {
            'class': `
                <option value="">Chọn lớp</option>
                <option value="10A">Lớp 10A</option>
                <option value="10B">Lớp 10B</option>
                <option value="11A">Lớp 11A</option>
            `,
            'teacher': `
                <option value="">Chọn giảng viên</option>
                <option value="GV001">GS. Nguyễn Văn A</option>
                <option value="GV002">PGS. Trần Thị B</option>
                <option value="GV003">TS. Lê Văn C</option>
            `,
            'room': `
                <option value="">Chọn phòng học</option>
                <option value="P301">Phòng 301</option>
                <option value="P302">Phòng 302</option>
                <option value="LAB1">Lab 1</option>
            `
        };
        return options[this.viewMode];
    },

    renderTimetable() {
        const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const periods = ['1-2', '3-4', '5-6', '7-8', '9-10'];

        return `
            <table class="timetable">
                <thead>
                    <tr>
                        <th class="period-header">Tiết</th>
                        ${days.map(day => `<th>${day}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${periods.map((period, pIndex) => `
                        <tr>
                            <td class="period-cell">${period}</td>
                            ${days.map((day, dIndex) => {
                                const lesson = this.getLesson(dIndex, pIndex);
                                return `
                                    <td class="lesson-cell ${lesson.conflict ? 'conflict' : ''}" 
                                        onclick="Schedule.editLesson(${dIndex}, ${pIndex})">
                                        ${lesson.content}
                                    </td>
                                `;
                            }).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    getLesson(dayIndex, periodIndex) {
        const schedule = Database.get('schedule');
        const lesson = schedule.find(l => l.day === dayIndex && l.period === periodIndex);
        
        if (lesson) {
            // Check for conflicts
            const conflicts = schedule.filter(l => 
                l.day === dayIndex && 
                l.period === periodIndex && 
                (l.room === lesson.room || l.teacherId === lesson.teacherId)
            );
            
            return {
                content: `
                    <div class="lesson-info">
                        <div class="lesson-subject">${lesson.courseName}</div>
                        <div class="lesson-teacher">${lesson.teacherName}</div>
                        <div class="lesson-room">${lesson.room}</div>
                        <div class="lesson-class">${lesson.class}</div>
                    </div>
                `,
                conflict: conflicts.length > 1
            };
        }

        return {
            content: '<div class="empty-lesson">+</div>',
            conflict: false
        };
    },

    renderConflicts() {
        const conflicts = [
            {
                type: 'room',
                severity: 'high',
                message: 'Phòng 301 bị trùng lịch: Lớp 10A và 10B cùng tiết 3-4 thứ 3',
                suggestion: 'Chuyển lớp 10B sang phòng 302'
            },
            {
                type: 'teacher',
                severity: 'high',
                message: 'GV Nguyễn Văn A dạy 2 lớp cùng giờ: 10A và 11B',
                suggestion: 'Đổi giờ dạy lớp 11B sang tiết 5-6'
            },
            {
                type: 'student',
                severity: 'medium',
                message: 'Lớp 10A có 2 môn học cùng tiết',
                suggestion: 'Điều chỉnh thời khóa biểu lớp 10A'
            }
        ];

        return conflicts.map(conflict => `
            <div class="conflict-item ${conflict.severity}">
                <div class="conflict-icon">
                    ${conflict.type === 'room' ? '🚪' : conflict.type === 'teacher' ? '👨‍🏫' : '👨‍🎓'}
                </div>
                <div class="conflict-content">
                    <div class="conflict-message">${conflict.message}</div>
                    <div class="conflict-suggestion">
                        💡 Đề xuất: ${conflict.suggestion}
                    </div>
                </div>
                <button class="btn-icon" onclick="Schedule.resolveConflict('${conflict.type}')">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        `).join('');
    },

    changeViewMode(mode) {
        this.viewMode = mode;
        this.render();
    },

    filterSchedule(value) {
        console.log('Filter schedule:', value);
    },

    changeWeek(week) {
        this.currentWeek = week;
        this.render();
    },

    editLesson(dayIndex, periodIndex) {
        const courses = Database.get('courses');
        const teachers = Database.get('teachers');
        const classes = ['CNTT-K18', 'CNTT-K19', 'KT-K18', 'KT-K19', 'NN-K18'];
        
        const modal = `
            <div class="modal-overlay" onclick="Schedule.closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>✏️ Chỉnh sửa tiết học</h2>
                        <button onclick="Schedule.closeModal()">✕</button>
                    </div>
                    <div class="modal-body">
                        <form onsubmit="Schedule.saveLesson(event, ${dayIndex}, ${periodIndex})">
                            <div class="form-group">
                                <label>Môn học *</label>
                                <select name="course" required>
                                    <option value="">Chọn môn học</option>
                                    ${courses.map(c => `<option value="${c.id}">${c.name} (${c.credits} TC)</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Giảng viên *</label>
                                <select name="teacher" required>
                                    <option value="">Chọn giảng viên</option>
                                    ${teachers.map(t => `<option value="${t.id}">${t.name} - ${t.department}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Phòng học *</label>
                                <select name="room" required>
                                    <option value="">Chọn phòng</option>
                                    <option value="P301">P301</option>
                                    <option value="P302">P302</option>
                                    <option value="P303">P303</option>
                                    <option value="LAB1">LAB1</option>
                                    <option value="LAB2">LAB2</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Lớp *</label>
                                <select name="class" required>
                                    <option value="">Chọn lớp</option>
                                    ${classes.map(c => `<option value="${c}">${c}</option>`).join('')}
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onclick="Schedule.closeModal()">
                                    Hủy
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    },

    saveLesson(event, dayIndex, periodIndex) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        const courseId = formData.get('course');
        const teacherId = formData.get('teacher');
        const room = formData.get('room');
        const className = formData.get('class');
        
        const course = Database.findOne('courses', c => c.id === courseId);
        const teacher = Database.findOne('teachers', t => t.id === teacherId);
        
        const lesson = {
            id: `SCH${dayIndex}${periodIndex}`,
            day: dayIndex,
            period: periodIndex,
            courseId: course.id,
            courseName: course.name,
            teacherId: teacher.id,
            teacherName: teacher.name,
            room: room,
            class: className
        };
        
        // Remove existing lesson at this slot
        const schedule = Database.get('schedule');
        const filtered = schedule.filter(l => !(l.day === dayIndex && l.period === periodIndex));
        filtered.push(lesson);
        Database.save('schedule', filtered);
        
        this.closeModal();
        this.render();
        alert('✅ Đã lưu thay đổi!');
    },

    autoGenerate() {
        if (confirm('AI sẽ tự động xếp thời khóa biểu dựa trên các ràng buộc. Tiếp tục?')) {
            // Show loading
            const loading = `
                <div class="loading-overlay">
                    <div class="loading-content">
                        <div class="loader"></div>
                        <p>🤖 AI đang xếp thời khóa biểu...</p>
                        <p class="loading-detail">Đang phân tích ràng buộc và tối ưu hóa...</p>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', loading);

            // Simulate AI processing
            setTimeout(() => {
                document.querySelector('.loading-overlay')?.remove();
                alert('✅ Đã xếp thời khóa biểu thành công!\n\n📊 Kết quả:\n- Giảm 15 xung đột\n- Tối ưu phòng học 20%\n- Giảm di chuyển GV 30%');
                this.render();
            }, 3000);
        }
    },

    optimizeNow() {
        alert('Đang tối ưu hóa thời khóa biểu...');
    },

    uploadFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx,.xls,.csv';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const analysis = await AIEngine.analyzeUploadedFile(file);
                alert(`File đã phân tích:\n- ${analysis.detectedSheets.length} sheets\n- Độ tin cậy: ${analysis.confidence * 100}%`);
            }
        };
        input.click();
    },

    exportSchedule() {
        alert('Xuất thời khóa biểu ra Excel');
    },

    manualEdit() {
        alert('Chế độ xếp tay: Click vào ô để thêm/sửa tiết học');
    },

    resolveConflict(type) {
        alert(`Giải quyết xung đột ${type}`);
    }
};
