// AI Student Analyzer - Extended Tabs
// This file extends the AIStudentAnalyzer with additional tabs

// Timeline Tab - Student Progress History
AIStudentAnalyzer.renderTimelineTab = function() {
    const student = this.currentStudent;
    
    // Build timeline from real data
    const timelineData = [];
    
    // Add behavior notes to timeline
    student.behaviorNotes.forEach(note => {
        timelineData.push({
            date: note.date,
            type: note.type === 'positive' ? 'achievement' : 'behavior',
            icon: note.type === 'positive' ? '✅' : '⚠️',
            title: note.type === 'positive' ? 'Hành vi tích cực' : 'Cần chú ý',
            description: note.note,
            trend: note.type === 'positive' ? 'up' : 'down'
        });
    });
    
    // Add activities to timeline
    student.activities.forEach(activity => {
        timelineData.push({
            date: activity.joined,
            type: 'social',
            icon: '👥',
            title: `Tham gia ${activity.name}`,
            description: `Vai trò: ${activity.role}`,
            trend: 'up'
        });
        
        // Add achievements
        activity.achievements.forEach(ach => {
            timelineData.push({
                date: activity.joined,
                type: 'achievement',
                icon: '🏆',
                title: ach,
                description: `Trong hoạt động ${activity.name}`,
                trend: 'up'
            });
        });
    });
    
    // Add health checkup to timeline
    if (student.healthData && student.healthData.physical) {
        timelineData.push({
            date: student.healthData.physical.lastCheckup,
            type: 'health',
            icon: '❤️',
            title: 'Khám sức khỏe định kỳ',
            description: `Tình trạng: ${this.getHealthStatus(student.healthData.physical.status)}`,
            trend: 'stable'
        });
    }
    
    // Add goals to timeline
    student.goals.forEach(goal => {
        if (goal.status === 'completed') {
            timelineData.push({
                date: goal.deadline,
                type: 'achievement',
                icon: '🎯',
                title: `Hoàn thành mục tiêu: ${goal.title}`,
                description: `Đạt ${goal.progress}%`,
                trend: 'up'
            });
        }
    });
    
    // Sort by date descending
    timelineData.sort((a, b) => new Date(b.date) - new Date(a.date));

    return `
        <div class="timeline-tab">
            <div class="analysis-card">
                <h3><i class="fas fa-history"></i> Lịch sử Tiến trình</h3>
                <p class="tab-description">Theo dõi toàn bộ quá trình phát triển của học sinh</p>
                
                <div class="timeline-filters">
                    <button class="filter-btn active" onclick="AIStudentAnalyzer.filterTimeline('all')">
                        Tất cả
                    </button>
                    <button class="filter-btn" onclick="AIStudentAnalyzer.filterTimeline('academic')">
                        📚 Học tập
                    </button>
                    <button class="filter-btn" onclick="AIStudentAnalyzer.filterTimeline('behavior')">
                        👤 Hành vi
                    </button>
                    <button class="filter-btn" onclick="AIStudentAnalyzer.filterTimeline('achievement')">
                        🏆 Thành tích
                    </button>
                    <button class="filter-btn" onclick="AIStudentAnalyzer.filterTimeline('social')">
                        👥 Xã hội
                    </button>
                </div>

                <div class="timeline-container">
                    ${timelineData.map(event => `
                        <div class="timeline-item ${event.type}" data-type="${event.type}">
                            <div class="timeline-marker ${event.trend}">
                                <span class="timeline-icon">${event.icon}</span>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-date">${event.date}</div>
                                <h4 class="timeline-title">${event.title}</h4>
                                <p class="timeline-description">${event.description}</p>
                                <div class="timeline-actions">
                                    <button class="btn-icon" onclick="AIStudentAnalyzer.viewTimelineDetail('${event.date}')">
                                        <i class="fas fa-eye"></i> Chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-chart-line"></i> Biểu đồ Tiến trình</h3>
                <div class="progress-chart-container">
                    <canvas id="progressChart" width="800" height="300"></canvas>
                </div>
            </div>
        </div>
    `;
};

// Comparison Tab - Compare with class average
AIStudentAnalyzer.renderComparisonTab = function() {
    const student = this.currentStudent;
    
    // Get class average from Database
    const classAvg = Database.getClassAverage(student.class);
    const classStudents = Database.getStudentsByClass(student.class);
    
    // Calculate student rank
    const sortedByGPA = classStudents.sort((a, b) => b.gpa - a.gpa);
    const studentRank = sortedByGPA.findIndex(s => s.id === student.id) + 1;
    const topStudent = sortedByGPA[0];

    return `
        <div class="comparison-tab">
            <div class="analysis-card">
                <h3><i class="fas fa-balance-scale"></i> So sánh với Trung bình Lớp</h3>
                
                <div class="comparison-overview">
                    <div class="rank-display">
                        <div class="rank-number">#${studentRank}</div>
                        <div class="rank-label">Xếp hạng trong lớp</div>
                        <div class="rank-total">Trên tổng số ${classAvg.totalStudents} học sinh</div>
                    </div>
                </div>

                <div class="comparison-metrics">
                    <div class="metric-comparison">
                        <h4>GPA</h4>
                        <div class="comparison-bars">
                            <div class="comparison-bar-item">
                                <span class="bar-label">Học sinh</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill student" style="width: ${(student.gpa / 4) * 100}%"></div>
                                </div>
                                <span class="bar-value">${student.gpa.toFixed(2)}</span>
                            </div>
                            <div class="comparison-bar-item">
                                <span class="bar-label">TB Lớp</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill average" style="width: ${(classAvg.gpa / 4) * 100}%"></div>
                                </div>
                                <span class="bar-value">${classAvg.gpa.toFixed(2)}</span>
                            </div>
                            <div class="comparison-bar-item">
                                <span class="bar-label">Cao nhất</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill top" style="width: ${(topStudent.gpa / 4) * 100}%"></div>
                                </div>
                                <span class="bar-value">${topStudent.gpa.toFixed(2)}</span>
                            </div>
                        </div>
                        <div class="comparison-insight">
                            ${student.gpa > classAvg.gpa ? 
                                `<span class="positive">✓ Cao hơn TB lớp ${(student.gpa - classAvg.gpa).toFixed(2)} điểm</span>` :
                                `<span class="negative">⚠ Thấp hơn TB lớp ${(classAvg.gpa - student.gpa).toFixed(2)} điểm</span>`
                            }
                        </div>
                    </div>

                    <div class="metric-comparison">
                        <h4>Tỷ lệ Tham gia</h4>
                        <div class="comparison-bars">
                            <div class="comparison-bar-item">
                                <span class="bar-label">Học sinh</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill student" style="width: ${student.attendance}%"></div>
                                </div>
                                <span class="bar-value">${student.attendance}%</span>
                            </div>
                            <div class="comparison-bar-item">
                                <span class="bar-label">TB Lớp</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill average" style="width: ${classAvg.attendance}%"></div>
                                </div>
                                <span class="bar-value">${classAvg.attendance}%</span>
                            </div>
                            <div class="comparison-bar-item">
                                <span class="bar-label">Cao nhất</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill top" style="width: ${sortedByGPA[0].attendance}%"></div>
                                </div>
                                <span class="bar-value">${sortedByGPA[0].attendance}%</span>
                            </div>
                        </div>
                        <div class="comparison-insight">
                            ${student.attendance > classAvg.attendance ? 
                                `<span class="positive">✓ Cao hơn TB lớp ${(student.attendance - classAvg.attendance).toFixed(0)}%</span>` :
                                `<span class="negative">⚠ Thấp hơn TB lớp ${(classAvg.attendance - student.attendance).toFixed(0)}%</span>`
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-users"></i> So sánh theo Môn học</h3>
                <div class="subject-comparison-grid">
                    ${student.grades.map(grade => {
                        // Calculate class average for this subject from all students
                        const allGrades = classStudents.map(s => {
                            const g = s.grades.find(gr => gr.subject === grade.subject);
                            return g ? g.score : 0;
                        });
                        const classAvgSubject = (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(1);
                        
                        return `
                            <div class="subject-comparison-card">
                                <h4>${grade.subject}</h4>
                                <div class="score-comparison">
                                    <div class="score-item">
                                        <span class="score-label">Bạn</span>
                                        <span class="score-value student">${grade.score}</span>
                                    </div>
                                    <div class="score-divider">vs</div>
                                    <div class="score-item">
                                        <span class="score-label">TB</span>
                                        <span class="score-value average">${classAvgSubject}</span>
                                    </div>
                                </div>
                                <div class="score-diff ${grade.score > classAvgSubject ? 'positive' : 'negative'}">
                                    ${grade.score > classAvgSubject ? '+' : ''}${(grade.score - classAvgSubject).toFixed(1)}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
};
                            <div class="comparison-bar-item">
                                <span class="bar-label">Học sinh</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill student" style="width: ${student.attendance}%"></div>
                                </div>
                                <span class="bar-value">${student.attendance}%</span>
                            </div>
                            <div class="comparison-bar-item">
                                <span class="bar-label">TB Lớp</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill average" style="width: ${comparisonData.classAverage.attendance}%"></div>
                                </div>
                                <span class="bar-value">${comparisonData.classAverage.attendance}%</span>
                            </div>
                            <div class="comparison-bar-item">
                                <span class="bar-label">Cao nhất</span>
                                <div class="comparison-bar">
                                    <div class="bar-fill top" style="width: ${comparisonData.topStudent.attendance}%"></div>
                                </div>
                                <span class="bar-value">${comparisonData.topStudent.attendance}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-users"></i> So sánh theo Môn học</h3>
                <div class="subject-comparison-grid">
                    ${student.grades.map(grade => {
                        const classAvg = (Math.random() * 2 + 6).toFixed(1);
                        return `
                            <div class="subject-comparison-card">
                                <h4>${grade.subject}</h4>
                                <div class="score-comparison">
                                    <div class="score-item">
                                        <span class="score-label">Bạn</span>
                                        <span class="score-value student">${grade.score}</span>
                                    </div>
                                    <div class="score-divider">vs</div>
                                    <div class="score-item">
                                        <span class="score-label">TB</span>
                                        <span class="score-value average">${classAvg}</span>
                                    </div>
                                </div>
                                <div class="score-diff ${grade.score > classAvg ? 'positive' : 'negative'}">
                                    ${grade.score > classAvg ? '+' : ''}${(grade.score - classAvg).toFixed(1)}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
};

// Goals Tab - Set and track goals
AIStudentAnalyzer.renderGoalsTab = function() {
    const student = this.currentStudent;
    const goals = student.goals || [];

    return `
        <div class="goals-tab">
            <div class="goals-header">
                <h3><i class="fas fa-bullseye"></i> Mục tiêu & Theo dõi</h3>
                <button class="btn btn-primary" onclick="AIStudentAnalyzer.addNewGoal()">
                    <i class="fas fa-plus"></i> Thêm mục tiêu mới
                </button>
            </div>

            <div class="goals-stats">
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-info">
                        <div class="stat-value">${goals.length}</div>
                        <div class="stat-label">Tổng mục tiêu</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-info">
                        <div class="stat-value">${goals.filter(g => g.status === 'completed').length}</div>
                        <div class="stat-label">Đã hoàn thành</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⏳</div>
                    <div class="stat-info">
                        <div class="stat-value">${goals.filter(g => g.status === 'in-progress').length}</div>
                        <div class="stat-label">Đang thực hiện</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-info">
                        <div class="stat-value">${Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)}%</div>
                        <div class="stat-label">Tiến độ TB</div>
                    </div>
                </div>
            </div>

            <div class="goals-list">
                ${goals.map(goal => `
                    <div class="goal-card ${goal.status} ${goal.priority}">
                        <div class="goal-header">
                            <div class="goal-title-section">
                                <h4>${goal.title}</h4>
                                <span class="goal-category">${this.getCategoryName(goal.category)}</span>
                            </div>
                            <span class="goal-priority ${goal.priority}">${goal.priority.toUpperCase()}</span>
                        </div>
                        <div class="goal-body">
                            <div class="goal-progress-section">
                                <div class="progress-label">
                                    <span>Tiến độ</span>
                                    <span class="progress-percent">${goal.progress}%</span>
                                </div>
                                <div class="progress-bar-container">
                                    <div class="progress-bar-fill" style="width: ${goal.progress}%"></div>
                                </div>
                            </div>
                            <div class="goal-deadline">
                                <i class="fas fa-calendar"></i> Hạn: ${goal.deadline}
                                ${this.getDaysRemaining(goal.deadline)}
                            </div>
                        </div>
                        <div class="goal-actions">
                            <button class="btn-icon" onclick="AIStudentAnalyzer.updateGoalProgress(${goal.id})">
                                <i class="fas fa-edit"></i> Cập nhật
                            </button>
                            <button class="btn-icon" onclick="AIStudentAnalyzer.viewGoalDetail(${goal.id})">
                                <i class="fas fa-eye"></i> Chi tiết
                            </button>
                            ${goal.status !== 'completed' ? `
                                <button class="btn-icon success" onclick="AIStudentAnalyzer.completeGoal(${goal.id})">
                                    <i class="fas fa-check"></i> Hoàn thành
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-lightbulb"></i> Đề xuất Mục tiêu từ AI</h3>
                <div class="ai-suggested-goals">
                    <div class="suggested-goal">
                        <i class="fas fa-robot"></i>
                        <div class="suggested-content">
                            <h4>Tham gia thêm hoạt động nhóm</h4>
                            <p>Dựa trên phân tích, bạn nên tăng cường kỹ năng làm việc nhóm</p>
                        </div>
                        <button class="btn btn-secondary" onclick="AIStudentAnalyzer.acceptSuggestedGoal(1)">
                            <i class="fas fa-plus"></i> Thêm
                        </button>
                    </div>
                    <div class="suggested-goal">
                        <i class="fas fa-robot"></i>
                        <div class="suggested-content">
                            <h4>Cải thiện điểm Toán lên 8.5</h4>
                            <p>Với xu hướng hiện tại, mục tiêu này có thể đạt được trong 2 tháng</p>
                        </div>
                        <button class="btn btn-secondary" onclick="AIStudentAnalyzer.acceptSuggestedGoal(2)">
                            <i class="fas fa-plus"></i> Thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Communication Tab
AIStudentAnalyzer.renderCommunicationTab = function() {
    const student = this.currentStudent;
    const messages = Database.getMessages(student.id);

    return `
        <div class="communication-tab">
            <div class="comm-header">
                <h3><i class="fas fa-comments"></i> Giao tiếp & Trao đổi</h3>
                <button class="btn btn-primary" onclick="AIStudentAnalyzer.composeMessage()">
                    <i class="fas fa-pen"></i> Soạn tin nhắn
                </button>
            </div>

            <div class="comm-stats">
                <div class="stat-item">
                    <i class="fas fa-envelope"></i>
                    <span class="stat-number">${messages.length}</span>
                    <span class="stat-text">Tin nhắn</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-envelope-open"></i>
                    <span class="stat-number">${messages.filter(m => m.read).length}</span>
                    <span class="stat-text">Đã đọc</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-bell"></i>
                    <span class="stat-number">${messages.filter(m => !m.read).length}</span>
                    <span class="stat-text">Chưa đọc</span>
                </div>
            </div>

            <div class="messages-list">
                ${messages.length > 0 ? messages.map(msg => `
                    <div class="message-card ${msg.read ? 'read' : 'unread'}" onclick="AIStudentAnalyzer.openMessage(${msg.id})">
                        <div class="message-header">
                            <div class="message-from">
                                <i class="fas fa-user-circle"></i>
                                <strong>${msg.from}</strong>
                                <i class="fas fa-arrow-right"></i>
                                <span>${msg.to}</span>
                            </div>
                            <div class="message-date">${msg.date}</div>
                        </div>
                        <div class="message-subject">${msg.subject}</div>
                        <div class="message-preview">${msg.content}</div>
                        ${!msg.read ? '<div class="unread-badge">Mới</div>' : ''}
                    </div>
                `).join('') : '<p class="no-data">Chưa có tin nhắn nào</p>'}
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-calendar-alt"></i> Lịch Họp & Gặp mặt</h3>
                <div class="meetings-list">
                    <div class="meeting-item">
                        <div class="meeting-icon">📅</div>
                        <div class="meeting-info">
                            <h4>Họp phụ huynh</h4>
                            <p>20/11/2024 - 14:00</p>
                            <span class="meeting-location">Phòng 301</span>
                        </div>
                        <button class="btn btn-secondary" onclick="AIStudentAnalyzer.scheduleMeeting()">
                            <i class="fas fa-calendar-plus"></i> Đặt lịch
                        </button>
                    </div>
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-phone"></i> Liên hệ Nhanh</h3>
                <div class="quick-contacts">
                    <button class="contact-btn" onclick="AIStudentAnalyzer.callParent()">
                        <i class="fas fa-phone"></i> Gọi: ${student.parentPhone}
                    </button>
                    <button class="contact-btn" onclick="AIStudentAnalyzer.emailParent()">
                        <i class="fas fa-envelope"></i> Email: ${student.parentEmail || 'N/A'}
                    </button>
                    <button class="contact-btn" onclick="AIStudentAnalyzer.smsParent()">
                        <i class="fas fa-sms"></i> SMS phụ huynh
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Health & Wellness Tab
AIStudentAnalyzer.renderHealthTab = function() {
    const student = this.currentStudent;
    const healthData = student.healthData || {
        physical: { score: 0, status: 'unknown', lastCheckup: 'N/A' },
        mental: { score: 0, status: 'unknown', concerns: [] },
        sleep: { average: 0, recommended: 8, quality: 'unknown' },
        exercise: { frequency: 0, recommended: 4, activities: [] }
    };

    return `
        <div class="health-tab">
            <div class="analysis-card">
                <h3><i class="fas fa-heartbeat"></i> Tổng quan Sức khỏe</h3>
                <div class="health-overview">
                    <div class="health-score-card physical">
                        <div class="health-icon">💪</div>
                        <div class="health-info">
                            <h4>Sức khỏe Thể chất</h4>
                            <div class="health-score">${healthData.physical.score}/100</div>
                            <div class="health-status ${healthData.physical.status}">${this.getHealthStatus(healthData.physical.status)}</div>
                        </div>
                    </div>
                    <div class="health-score-card mental">
                        <div class="health-icon">🧠</div>
                        <div class="health-info">
                            <h4>Sức khỏe Tinh thần</h4>
                            <div class="health-score">${healthData.mental.score}/100</div>
                            <div class="health-status ${healthData.mental.status}">${this.getHealthStatus(healthData.mental.status)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-bed"></i> Giấc ngủ</h3>
                <div class="sleep-analysis">
                    <div class="sleep-stat">
                        <div class="stat-label">Trung bình</div>
                        <div class="stat-value">${healthData.sleep.average}h/đêm</div>
                    </div>
                    <div class="sleep-stat">
                        <div class="stat-label">Khuyến nghị</div>
                        <div class="stat-value">${healthData.sleep.recommended}h/đêm</div>
                    </div>
                    <div class="sleep-stat">
                        <div class="stat-label">Chất lượng</div>
                        <div class="stat-value ${healthData.sleep.quality}">${this.getHealthStatus(healthData.sleep.quality)}</div>
                    </div>
                </div>
                <div class="health-recommendation">
                    <i class="fas fa-lightbulb"></i>
                    <p>Cần tăng thời gian ngủ thêm ${healthData.sleep.recommended - healthData.sleep.average}h mỗi đêm</p>
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-running"></i> Hoạt động Thể chất</h3>
                <div class="exercise-analysis">
                    <div class="exercise-stat">
                        <div class="stat-label">Tần suất hiện tại</div>
                        <div class="stat-value">${healthData.exercise.frequency} lần/tuần</div>
                    </div>
                    <div class="exercise-stat">
                        <div class="stat-label">Khuyến nghị</div>
                        <div class="stat-value">${healthData.exercise.recommended} lần/tuần</div>
                    </div>
                </div>
                <div class="activities-list">
                    <h4>Hoạt động thường xuyên:</h4>
                    <div class="activity-tags">
                        ${healthData.exercise.activities.map(activity => `
                            <span class="activity-tag">${activity}</span>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="analysis-card warning-card">
                <h3><i class="fas fa-exclamation-triangle"></i> Quan tâm Tâm lý</h3>
                <div class="mental-concerns">
                    ${healthData.mental.concerns.map(concern => `
                        <div class="concern-item">
                            <i class="fas fa-circle"></i>
                            <span>${concern}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary" onclick="AIStudentAnalyzer.referToCounselor()">
                    <i class="fas fa-user-md"></i> Đặt lịch tư vấn
                </button>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-notes-medical"></i> Lịch sử Khám sức khỏe</h3>
                <div class="checkup-history">
                    <div class="checkup-item">
                        <div class="checkup-date">${healthData.physical.lastCheckup}</div>
                        <div class="checkup-result">Khám định kỳ - Kết quả tốt</div>
                        <button class="btn-icon" onclick="AIStudentAnalyzer.viewCheckupDetail()">
                            <i class="fas fa-file-medical"></i> Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Extracurricular Tab
AIStudentAnalyzer.renderExtracurricularTab = function() {
    const student = this.currentStudent;
    const activities = student.activities || [];

    const totalHours = activities.reduce((sum, a) => sum + a.hours, 0);
    const totalAchievements = activities.reduce((sum, a) => sum + a.achievements.length, 0);

    return `
        <div class="extracurricular-tab">
            <div class="extra-header">
                <h3><i class="fas fa-trophy"></i> Hoạt động Ngoại khóa</h3>
                <button class="btn btn-primary" onclick="AIStudentAnalyzer.addActivity()">
                    <i class="fas fa-plus"></i> Thêm hoạt động
                </button>
            </div>

            <div class="extra-stats">
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-value">${activities.length}</div>
                    <div class="stat-label">Hoạt động</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⏱️</div>
                    <div class="stat-value">${totalHours}h</div>
                    <div class="stat-label">Tổng giờ</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">${totalAchievements}</div>
                    <div class="stat-label">Thành tích</div>
                </div>
            </div>

            <div class="activities-list">
                ${activities.map(activity => `
                    <div class="activity-card">
                        <div class="activity-header">
                            <div class="activity-icon">🎯</div>
                            <div class="activity-info">
                                <h4>${activity.name}</h4>
                                <span class="activity-role">${activity.role}</span>
                            </div>
                        </div>
                        <div class="activity-details">
                            <div class="detail-item">
                                <i class="fas fa-calendar"></i>
                                <span>Tham gia: ${activity.joined}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>${activity.hours} giờ</span>
                            </div>
                        </div>
                        <div class="activity-achievements">
                            <h5>Thành tích:</h5>
                            <ul>
                                ${activity.achievements.map(ach => `<li>${ach}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="activity-actions">
                            <button class="btn-icon" onclick="AIStudentAnalyzer.editActivity(${activity.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" onclick="AIStudentAnalyzer.viewActivityDetail(${activity.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-lightbulb"></i> Đề xuất Hoạt động</h3>
                <div class="suggested-activities">
                    <div class="suggested-activity">
                        <div class="activity-icon">🎨</div>
                        <div class="activity-content">
                            <h4>CLB Nghệ thuật</h4>
                            <p>Phát triển kỹ năng sáng tạo và thẩm mỹ</p>
                        </div>
                        <button class="btn btn-secondary">Tham gia</button>
                    </div>
                    <div class="suggested-activity">
                        <div class="activity-icon">🗣️</div>
                        <div class="activity-content">
                            <h4>CLB Hùng biện</h4>
                            <p>Rèn luyện kỹ năng giao tiếp và thuyết trình</p>
                        </div>
                        <button class="btn btn-secondary">Tham gia</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// AI Chat Tab
AIStudentAnalyzer.renderAIChatTab = function() {
    const student = this.currentStudent;
    
    return `
        <div class="aichat-tab">
            <div class="chat-container">
                <div class="chat-header">
                    <div class="chat-avatar">🤖</div>
                    <div class="chat-info">
                        <h3>AI Assistant</h3>
                        <p>Hỏi bất cứ điều gì về ${student.name}</p>
                    </div>
                </div>

                <div class="chat-messages" id="student-chat-messages">
                    <div class="chat-message ai">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p>Xin chào! Tôi là AI Assistant chuyên phân tích về ${student.name}.</p>
                            <p>Bạn có thể hỏi tôi về:</p>
                            <ul>
                                <li>📚 Hiệu suất học tập và xu hướng</li>
                                <li>🎯 Điểm mạnh và điểm yếu</li>
                                <li>💡 Đề xuất cải thiện</li>
                                <li>📊 So sánh với bạn cùng lớp</li>
                                <li>🔮 Dự đoán kết quả học tập</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="chat-quick-questions">
                    <button class="quick-q-btn" onclick="AIStudentAnalyzer.askAI('Phân tích điểm mạnh của học sinh')">
                        💪 Điểm mạnh là gì?
                    </button>
                    <button class="quick-q-btn" onclick="AIStudentAnalyzer.askAI('Học sinh cần cải thiện gì?')">
                        📈 Cần cải thiện gì?
                    </button>
                    <button class="quick-q-btn" onclick="AIStudentAnalyzer.askAI('Dự đoán kết quả học kỳ tới')">
                        🔮 Dự đoán học kỳ tới
                    </button>
                    <button class="quick-q-btn" onclick="AIStudentAnalyzer.askAI('So sánh với trung bình lớp')">
                        📊 So với lớp thế nào?
                    </button>
                </div>

                <div class="chat-input-container">
                    <input type="text" id="student-chat-input" placeholder="Hỏi AI về học sinh..." 
                           onkeypress="if(event.key==='Enter') AIStudentAnalyzer.sendChatMessage()">
                    <button class="chat-send-btn" onclick="AIStudentAnalyzer.sendChatMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Export Tab
AIStudentAnalyzer.renderExportTab = function() {
    const student = this.currentStudent;
    
    return `
        <div class="export-tab">
            <div class="analysis-card">
                <h3><i class="fas fa-file-export"></i> Xuất Báo cáo</h3>
                <p class="tab-description">Tạo và xuất báo cáo phân tích toàn diện về học sinh</p>

                <div class="export-options">
                    <div class="export-option-card">
                        <div class="export-icon">📄</div>
                        <h4>Báo cáo Tổng quan</h4>
                        <p>Bao gồm tất cả thông tin cơ bản và phân tích AI</p>
                        <div class="export-actions">
                            <button class="btn btn-primary" onclick="AIStudentAnalyzer.exportReport('overview', 'pdf')">
                                <i class="fas fa-file-pdf"></i> Xuất PDF
                            </button>
                            <button class="btn btn-secondary" onclick="AIStudentAnalyzer.exportReport('overview', 'word')">
                                <i class="fas fa-file-word"></i> Xuất Word
                            </button>
                        </div>
                    </div>

                    <div class="export-option-card">
                        <div class="export-icon">📊</div>
                        <h4>Báo cáo Học tập</h4>
                        <p>Chi tiết về điểm số, GPA, và xu hướng học tập</p>
                        <div class="export-actions">
                            <button class="btn btn-primary" onclick="AIStudentAnalyzer.exportReport('academic', 'pdf')">
                                <i class="fas fa-file-pdf"></i> Xuất PDF
                            </button>
                            <button class="btn btn-secondary" onclick="AIStudentAnalyzer.exportReport('academic', 'excel')">
                                <i class="fas fa-file-excel"></i> Xuất Excel
                            </button>
                        </div>
                    </div>

                    <div class="export-option-card">
                        <div class="export-icon">👤</div>
                        <h4>Báo cáo Hành vi</h4>
                        <p>Phân tích hành vi, tham gia, và kỷ luật</p>
                        <div class="export-actions">
                            <button class="btn btn-primary" onclick="AIStudentAnalyzer.exportReport('behavior', 'pdf')">
                                <i class="fas fa-file-pdf"></i> Xuất PDF
                            </button>
                        </div>
                    </div>

                    <div class="export-option-card">
                        <div class="export-icon">💡</div>
                        <h4>Báo cáo Đề xuất AI</h4>
                        <p>Các đề xuất và kế hoạch can thiệp từ AI</p>
                        <div class="export-actions">
                            <button class="btn btn-primary" onclick="AIStudentAnalyzer.exportReport('recommendations', 'pdf')">
                                <i class="fas fa-file-pdf"></i> Xuất PDF
                            </button>
                        </div>
                    </div>

                    <div class="export-option-card">
                        <div class="export-icon">📋</div>
                        <h4>Báo cáo Toàn diện</h4>
                        <p>Tất cả thông tin và phân tích trong một file</p>
                        <div class="export-actions">
                            <button class="btn btn-primary" onclick="AIStudentAnalyzer.exportReport('complete', 'pdf')">
                                <i class="fas fa-file-pdf"></i> Xuất PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-share-alt"></i> Chia sẻ Báo cáo</h3>
                <div class="share-options">
                    <button class="share-btn" onclick="AIStudentAnalyzer.emailReport()">
                        <i class="fas fa-envelope"></i>
                        <span>Email cho phụ huynh</span>
                    </button>
                    <button class="share-btn" onclick="AIStudentAnalyzer.printReport()">
                        <i class="fas fa-print"></i>
                        <span>In báo cáo</span>
                    </button>
                    <button class="share-btn" onclick="AIStudentAnalyzer.shareLink()">
                        <i class="fas fa-link"></i>
                        <span>Tạo link chia sẻ</span>
                    </button>
                </div>
            </div>

            <div class="analysis-card">
                <h3><i class="fas fa-history"></i> Lịch sử Xuất báo cáo</h3>
                <div class="export-history">
                    <div class="history-item">
                        <div class="history-icon">📄</div>
                        <div class="history-info">
                            <h4>Báo cáo Tổng quan</h4>
                            <p>Xuất ngày 15/11/2024 - 14:30</p>
                        </div>
                        <button class="btn-icon" onclick="AIStudentAnalyzer.downloadPreviousReport(1)">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                    <div class="history-item">
                        <div class="history-icon">📊</div>
                        <div class="history-info">
                            <h4>Báo cáo Học tập</h4>
                            <p>Xuất ngày 01/11/2024 - 10:15</p>
                        </div>
                        <button class="btn-icon" onclick="AIStudentAnalyzer.downloadPreviousReport(2)">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Helper methods for new tabs
AIStudentAnalyzer.getCategoryName = function(category) {
    const names = {
        'academic': '📚 Học tập',
        'attendance': '📅 Tham gia',
        'extracurricular': '🎯 Ngoại khóa',
        'social': '👥 Xã hội',
        'health': '❤️ Sức khỏe'
    };
    return names[category] || category;
};

AIStudentAnalyzer.getDaysRemaining = function(deadline) {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '<span class="overdue">Quá hạn</span>';
    if (diffDays === 0) return '<span class="today">Hôm nay</span>';
    if (diffDays <= 7) return `<span class="urgent">Còn ${diffDays} ngày</span>`;
    return `<span class="normal">Còn ${diffDays} ngày</span>`;
};

AIStudentAnalyzer.getHealthStatus = function(status) {
    const statuses = {
        'excellent': 'Xuất sắc',
        'good': 'Tốt',
        'fair': 'Trung bình',
        'poor': 'Kém'
    };
    return statuses[status] || status;
};

// Action methods for new features
AIStudentAnalyzer.filterTimeline = function(type) {
    const items = document.querySelectorAll('.timeline-item');
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    items.forEach(item => {
        if (type === 'all' || item.dataset.type === type) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

AIStudentAnalyzer.viewTimelineDetail = function(date) {
    Utils.showToast(`Xem chi tiết sự kiện ${date}`, 'info');
};

AIStudentAnalyzer.addNewGoal = function() {
    const student = this.currentStudent;
    const title = prompt('Nhập tiêu đề mục tiêu:');
    if (!title) return;
    
    const deadline = prompt('Nhập hạn chót (YYYY-MM-DD):');
    if (!deadline) return;
    
    const category = prompt('Chọn danh mục (academic/attendance/extracurricular/social/health):') || 'academic';
    const priority = prompt('Chọn ưu tiên (high/medium/low):') || 'medium';
    
    const newGoal = {
        title: title,
        category: category,
        deadline: deadline,
        priority: priority
    };
    
    Database.addGoal(student.id, newGoal);
    Utils.showToast('Đã thêm mục tiêu mới!', 'success');
    
    // Refresh tab
    this.switchTab('goals');
};

AIStudentAnalyzer.updateGoalProgress = function(id) {
    const student = this.currentStudent;
    const goal = student.goals.find(g => g.id === id);
    if (!goal) return;
    
    const newProgress = prompt(`Cập nhật tiến độ cho "${goal.title}" (0-100):`, goal.progress);
    if (newProgress === null) return;
    
    const progress = parseInt(newProgress);
    if (isNaN(progress) || progress < 0 || progress > 100) {
        Utils.showToast('Tiến độ không hợp lệ!', 'error');
        return;
    }
    
    Database.updateGoal(student.id, id, { 
        progress: progress,
        status: progress === 100 ? 'completed' : 'in-progress'
    });
    
    Utils.showToast('Đã cập nhật tiến độ!', 'success');
    this.switchTab('goals');
};

AIStudentAnalyzer.viewGoalDetail = function(id) {
    const student = this.currentStudent;
    const goal = student.goals.find(g => g.id === id);
    if (!goal) return;
    
    alert(`Mục tiêu: ${goal.title}\nDanh mục: ${goal.category}\nHạn chót: ${goal.deadline}\nTiến độ: ${goal.progress}%\nTrạng thái: ${goal.status}`);
};

AIStudentAnalyzer.completeGoal = function(id) {
    const student = this.currentStudent;
    Database.updateGoal(student.id, id, { 
        progress: 100,
        status: 'completed'
    });
    
    Utils.showToast('Đã hoàn thành mục tiêu!', 'success');
    this.switchTab('goals');
};

AIStudentAnalyzer.acceptSuggestedGoal = function(id) {
    Utils.showToast('Đã thêm mục tiêu được đề xuất', 'success');
};

AIStudentAnalyzer.composeMessage = function() {
    Utils.showToast('Soạn tin nhắn mới', 'info');
};

AIStudentAnalyzer.openMessage = function(id) {
    Utils.showToast(`Mở tin nhắn #${id}`, 'info');
};

AIStudentAnalyzer.scheduleMeeting = function() {
    Utils.showToast('Đặt lịch họp', 'info');
};

AIStudentAnalyzer.callParent = function() {
    Utils.showToast('Đang gọi phụ huynh...', 'info');
};

AIStudentAnalyzer.emailParent = function() {
    Utils.showToast('Mở email gửi phụ huynh', 'info');
};

AIStudentAnalyzer.smsParent = function() {
    Utils.showToast('Gửi SMS cho phụ huynh', 'info');
};

AIStudentAnalyzer.viewCheckupDetail = function() {
    Utils.showToast('Xem chi tiết khám sức khỏe', 'info');
};

AIStudentAnalyzer.addActivity = function() {
    const student = this.currentStudent;
    const name = prompt('Nhập tên hoạt động:');
    if (!name) return;
    
    const role = prompt('Vai trò của bạn:') || 'Thành viên';
    
    const newActivity = {
        name: name,
        role: role
    };
    
    Database.addActivity(student.id, newActivity);
    Utils.showToast('Đã thêm hoạt động mới!', 'success');
    
    // Refresh tab
    this.switchTab('extracurricular');
};

AIStudentAnalyzer.editActivity = function(id) {
    const student = this.currentStudent;
    const activity = student.activities.find(a => a.id === id);
    if (!activity) return;
    
    const hours = prompt(`Cập nhật số giờ cho "${activity.name}":`, activity.hours);
    if (hours === null) return;
    
    const hoursNum = parseInt(hours);
    if (isNaN(hoursNum) || hoursNum < 0) {
        Utils.showToast('Số giờ không hợp lệ!', 'error');
        return;
    }
    
    Database.updateActivity(student.id, id, { hours: hoursNum });
    Utils.showToast('Đã cập nhật hoạt động!', 'success');
    this.switchTab('extracurricular');
};

AIStudentAnalyzer.viewActivityDetail = function(id) {
    const student = this.currentStudent;
    const activity = student.activities.find(a => a.id === id);
    if (!activity) return;
    
    const achievementsText = activity.achievements.length > 0 ? activity.achievements.join(', ') : 'Chưa có';
    alert(`Hoạt động: ${activity.name}\nVai trò: ${activity.role}\nTham gia: ${activity.joined}\nSố giờ: ${activity.hours}\nThành tích: ${achievementsText}`);
};

AIStudentAnalyzer.askAI = function(question) {
    const chatMessages = document.getElementById('student-chat-messages');
    
    // Add user message
    chatMessages.insertAdjacentHTML('beforeend', `
        <div class="chat-message user">
            <div class="message-content">
                <p>${question}</p>
            </div>
            <div class="message-avatar">👤</div>
        </div>
    `);
    
    // Simulate AI response
    setTimeout(() => {
        const responses = {
            'Phân tích điểm mạnh của học sinh': 'Dựa trên phân tích, điểm mạnh của học sinh bao gồm: Toán học (8.0), tư duy logic tốt, và khả năng làm việc nhóm xuất sắc.',
            'Học sinh cần cải thiện gì?': 'Học sinh cần cải thiện: Môn Văn (6.5), tỷ lệ tham gia lớp (75%), và kỹ năng quản lý thời gian.',
            'Dự đoán kết quả học kỳ tới': 'Với xu hướng hiện tại, GPA dự kiến đạt 2.8 (giảm 0.4 điểm). Cần can thiệp để cải thiện.',
            'So sánh với trung bình lớp': 'GPA của học sinh (3.2) cao hơn trung bình lớp (2.8) 0.4 điểm. Tuy nhiên, tỷ lệ tham gia thấp hơn.'
        };
        
        const response = responses[question] || 'Tôi đã hiểu câu hỏi của bạn. Để phân tích chính xác hơn, bạn có thể cung cấp thêm thông tin không?';
        
        chatMessages.insertAdjacentHTML('beforeend', `
            <div class="chat-message ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${response}</p>
                </div>
            </div>
        `);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

AIStudentAnalyzer.sendChatMessage = function() {
    const input = document.getElementById('student-chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    this.askAI(message);
    input.value = '';
};

AIStudentAnalyzer.exportReport = function(type, format) {
    Utils.showLoading(`Đang tạo báo cáo ${type} định dạng ${format}...`);
    setTimeout(() => {
        Utils.hideLoading();
        Utils.showToast(`Đã xuất báo cáo ${type}.${format}`, 'success');
    }, 2000);
};

AIStudentAnalyzer.emailReport = function() {
    Utils.showToast('Đang gửi email báo cáo...', 'info');
};

AIStudentAnalyzer.printReport = function() {
    Utils.showToast('Đang chuẩn bị in...', 'info');
};

AIStudentAnalyzer.shareLink = function() {
    Utils.showToast('Đã tạo link chia sẻ', 'success');
};

AIStudentAnalyzer.downloadPreviousReport = function(id) {
    Utils.showToast(`Đang tải báo cáo #${id}...`, 'info');
};
