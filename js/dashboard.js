// Dashboard Module
const Dashboard = {
    render() {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>🎯 Dashboard Tổng quan</h1>
                    <div class="dashboard-actions">
                        <button class="btn btn-primary" onclick="AIAssistant.open()">
                            <i class="fas fa-robot"></i> AI Assistant
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background: #EBF5FF;">
                            <i class="fas fa-user-graduate" style="color: #3B82F6;"></i>
                        </div>
                        <div class="stat-content">
                            <h3>15,200</h3>
                            <p>Tổng Sinh viên</p>
                            <span class="stat-change positive">+12% so với kỳ trước</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon" style="background: #F0FDF4;">
                            <i class="fas fa-chalkboard-teacher" style="color: #10B981;"></i>
                        </div>
                        <div class="stat-content">
                            <h3>850</h3>
                            <p>Giảng viên</p>
                            <span class="stat-change positive">+5% so với năm trước</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon" style="background: #FEF3C7;">
                            <i class="fas fa-book" style="color: #F59E0B;"></i>
                        </div>
                        <div class="stat-content">
                            <h3>450</h3>
                            <p>Khóa học</p>
                            <span class="stat-change">Đang hoạt động</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon" style="background: #FEE2E2;">
                            <i class="fas fa-flask" style="color: #EF4444;"></i>
                        </div>
                        <div class="stat-content">
                            <h3>156</h3>
                            <p>Đề tài NCKH</p>
                            <span class="stat-change positive">+8 đề tài mới</span>
                        </div>
                    </div>
                </div>

                <!-- Charts Row -->
                <div class="charts-row">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>📊 Thống kê Tuyển sinh</h3>
                            <select onchange="Dashboard.updateChart('enrollment', this.value)">
                                <option value="month">Tháng</option>
                                <option value="quarter">Quý</option>
                                <option value="year">Năm</option>
                            </select>
                        </div>
                        <canvas id="enrollmentChart"></canvas>
                    </div>

                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>💰 Doanh thu & Chi phí</h3>
                            <select onchange="Dashboard.updateChart('finance', this.value)">
                                <option value="month">Tháng</option>
                                <option value="quarter">Quý</option>
                                <option value="year">Năm</option>
                            </select>
                        </div>
                        <canvas id="financeChart"></canvas>
                    </div>
                </div>

                <!-- AI Insights -->
                <div class="ai-insights-section">
                    <div class="section-header">
                        <h2>🤖 AI Insights & Recommendations</h2>
                    </div>
                    <div class="insights-grid">
                        <div class="insight-card warning">
                            <div class="insight-icon">⚠️</div>
                            <div class="insight-content">
                                <h4>Cảnh báo: Tỷ lệ sinh viên yếu tăng</h4>
                                <p>Phát hiện 85 sinh viên có nguy cơ bỏ học trong tháng tới</p>
                                <button class="btn-link" onclick="navigateTo('students')">Xem chi tiết →</button>
                            </div>
                        </div>

                        <div class="insight-card success">
                            <div class="insight-icon">✅</div>
                            <div class="insight-content">
                                <h4>Tốt: Tỷ lệ thu học phí cao</h4>
                                <p>92% sinh viên đã đóng học phí đúng hạn</p>
                                <button class="btn-link" onclick="navigateTo('finance')">Xem báo cáo →</button>
                            </div>
                        </div>

                        <div class="insight-card info">
                            <div class="insight-icon">💡</div>
                            <div class="insight-content">
                                <h4>Đề xuất: Tối ưu thời khóa biểu</h4>
                                <p>AI phát hiện 15 xung đột lịch học có thể tối ưu</p>
                                <button class="btn-link" onclick="navigateTo('schedule')">Tối ưu ngay →</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div class="recent-activities">
                    <div class="section-header">
                        <h2>📋 Hoạt động gần đây</h2>
                        <a href="#" class="view-all">Xem tất cả →</a>
                    </div>
                    <div class="activity-list">
                        ${this.renderActivities()}
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <h2>⚡ Thao tác nhanh</h2>
                    <div class="actions-grid">
                        <button class="action-btn" onclick="Students.addNew()">
                            <i class="fas fa-user-plus"></i>
                            <span>Thêm sinh viên</span>
                        </button>
                        <button class="action-btn" onclick="Schedule.create()">
                            <i class="fas fa-calendar-plus"></i>
                            <span>Tạo thời khóa biểu</span>
                        </button>
                        <button class="action-btn" onclick="Finance.createInvoice()">
                            <i class="fas fa-file-invoice"></i>
                            <span>Tạo hóa đơn</span>
                        </button>
                        <button class="action-btn" onclick="Reports.generate()">
                            <i class="fas fa-chart-line"></i>
                            <span>Tạo báo cáo</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initCharts();
    },

    renderActivities() {
        const activities = [
            { icon: '👨‍🎓', text: 'Sinh viên Nguyễn Văn A đã đăng ký khóa học AI', time: '5 phút trước', type: 'student' },
            { icon: '💰', text: 'Thanh toán học phí từ Trần Thị B - 9,000,000 VNĐ', time: '15 phút trước', type: 'finance' },
            { icon: '📚', text: 'Giảng viên Lê Văn C đã cập nhật điểm thi', time: '30 phút trước', type: 'academic' },
            { icon: '🔬', text: 'Đề tài NCKH mới được phê duyệt', time: '1 giờ trước', type: 'research' },
            { icon: '📅', text: 'Thời khóa biểu học kỳ 2 đã được công bố', time: '2 giờ trước', type: 'schedule' }
        ];

        return activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    },

    initCharts() {
        // Initialize charts (would use Chart.js in production)
        console.log('Charts initialized');
    },

    updateChart(chartType, period) {
        console.log(`Updating ${chartType} chart for ${period}`);
    }
};
