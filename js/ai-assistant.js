// AI Assistant - Chatbot thông minh
const AIAssistant = {
    isOpen: false,
    conversationHistory: [],

    toggle() {
        this.isOpen = !this.isOpen;
        const panel = document.getElementById('ai-assistant-panel');
        if (this.isOpen) {
            panel.classList.remove('hidden');
            panel.classList.add('show');
        } else {
            panel.classList.remove('show');
            panel.classList.add('hidden');
        }
    },

    sendMessage() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Hiển thị tin nhắn của user
        this.addUserMessage(message);
        input.value = '';

        // Lưu vào lịch sử
        this.conversationHistory.push({ role: 'user', content: message });

        // Hiển thị typing indicator
        this.showTyping();

        // Simulate AI thinking
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addAIMessage(response);
            this.conversationHistory.push({ role: 'assistant', content: response });
        }, 1000 + Math.random() * 1000);
    },

    addUserMessage(message) {
        const chatContainer = document.getElementById('ai-chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'user-message';
        messageEl.innerHTML = `
            <div class="user-message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
            <div class="user-avatar-small">
                <i class="fas fa-user"></i>
            </div>
        `;
        chatContainer.appendChild(messageEl);
        this.scrollToBottom();
    },

    addAIMessage(message) {
        const chatContainer = document.getElementById('ai-chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'ai-message';
        messageEl.innerHTML = `
            <div class="ai-avatar-small">
                <i class="fas fa-robot"></i>
            </div>
            <div class="ai-message-content">
                ${message}
            </div>
        `;
        chatContainer.appendChild(messageEl);
        this.scrollToBottom();
    },

    showTyping() {
        const chatContainer = document.getElementById('ai-chat-messages');
        const typingEl = document.createElement('div');
        typingEl.className = 'ai-message typing-indicator';
        typingEl.id = 'typing-indicator';
        typingEl.innerHTML = `
            <div class="ai-avatar-small">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        `;
        chatContainer.appendChild(typingEl);
        this.scrollToBottom();
    },

    hideTyping() {
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) typingEl.remove();
    },

    scrollToBottom() {
        const chatContainer = document.getElementById('ai-chat-messages');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Phân tích dữ liệu
        if (lowerMessage.includes('phân tích') || lowerMessage.includes('thống kê') || lowerMessage.includes('báo cáo')) {
            return this.analyzeData(lowerMessage);
        }

        // Dự đoán
        if (lowerMessage.includes('dự đoán') || lowerMessage.includes('xu hướng') || lowerMessage.includes('tương lai')) {
            return this.predictTrends(lowerMessage);
        }

        // Tối ưu
        if (lowerMessage.includes('tối ưu') || lowerMessage.includes('cải thiện') || lowerMessage.includes('nâng cao')) {
            return this.optimizeSuggestions(lowerMessage);
        }

        // Sinh viên
        if (lowerMessage.includes('sinh viên') || lowerMessage.includes('học sinh') || lowerMessage.includes('học viên')) {
            return this.studentInfo(lowerMessage);
        }

        // Giảng viên
        if (lowerMessage.includes('giảng viên') || lowerMessage.includes('giáo viên') || lowerMessage.includes('thầy') || lowerMessage.includes('cô')) {
            return this.teacherInfo(lowerMessage);
        }

        // Thời khóa biểu
        if (lowerMessage.includes('thời khóa biểu') || lowerMessage.includes('lịch học') || lowerMessage.includes('lịch dạy')) {
            return this.scheduleInfo(lowerMessage);
        }

        // Tài chính
        if (lowerMessage.includes('tài chính') || lowerMessage.includes('học phí') || lowerMessage.includes('chi phí')) {
            return this.financeInfo(lowerMessage);
        }

        // Nghiên cứu
        if (lowerMessage.includes('nghiên cứu') || lowerMessage.includes('đề tài') || lowerMessage.includes('khoa học')) {
            return this.researchInfo(lowerMessage);
        }

        // Chào hỏi
        if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return '<p>Xin chào! Tôi là AI Assistant của EduManager Pro. Tôi có thể giúp bạn phân tích dữ liệu, dự đoán xu hướng, và đưa ra các đề xuất thông minh. Bạn muốn biết điều gì?</p>';
        }

        // Cảm ơn
        if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
            return '<p>Rất vui được giúp đỡ bạn! Nếu có câu hỏi gì khác, đừng ngại hỏi nhé. 😊</p>';
        }

        // Giúp đỡ
        if (lowerMessage.includes('giúp') || lowerMessage.includes('help') || lowerMessage.includes('hướng dẫn')) {
            return `
                <p>Tôi có thể giúp bạn với các vấn đề sau:</p>
                <ul>
                    <li>📊 <strong>Phân tích dữ liệu</strong>: "Phân tích tình hình sinh viên"</li>
                    <li>🔮 <strong>Dự đoán xu hướng</strong>: "Dự đoán tỷ lệ bỏ học"</li>
                    <li>💡 <strong>Đề xuất giải pháp</strong>: "Tối ưu thời khóa biểu"</li>
                    <li>👨‍🎓 <strong>Thông tin sinh viên</strong>: "Có bao nhiêu sinh viên?"</li>
                    <li>👨‍🏫 <strong>Thông tin giảng viên</strong>: "Danh sách giảng viên"</li>
                    <li>💰 <strong>Tài chính</strong>: "Tình hình tài chính"</li>
                </ul>
                <p>Hãy thử hỏi tôi bất cứ điều gì!</p>
            `;
        }

        // Default response
        return `
            <p>Tôi đã hiểu câu hỏi của bạn. Tuy nhiên, tôi cần thêm thông tin để trả lời chính xác hơn.</p>
            <p>Bạn có thể hỏi tôi về:</p>
            <ul>
                <li>Phân tích dữ liệu sinh viên, giảng viên</li>
                <li>Dự đoán xu hướng học tập</li>
                <li>Tối ưu hóa thời khóa biểu</li>
                <li>Tình hình tài chính</li>
                <li>Nghiên cứu khoa học</li>
            </ul>
        `;
    },

    analyzeData(message) {
        const students = Database.getAllStudents();
        const teachers = Database.getAllTeachers();
        
        const avgGPA = (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2);
        const avgAttendance = (students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1);
        const atRiskCount = students.filter(s => s.status === 'at-risk').length;
        const excellentCount = students.filter(s => s.status === 'excellent').length;

        return `
            <p><strong>📊 Phân tích Tổng quan Hệ thống:</strong></p>
            <div class="ai-stats">
                <div class="ai-stat-item">
                    <span class="stat-label">Tổng sinh viên:</span>
                    <span class="stat-value">${students.length}</span>
                </div>
                <div class="ai-stat-item">
                    <span class="stat-label">GPA trung bình:</span>
                    <span class="stat-value">${avgGPA}</span>
                </div>
                <div class="ai-stat-item">
                    <span class="stat-label">Tỷ lệ tham gia TB:</span>
                    <span class="stat-value">${avgAttendance}%</span>
                </div>
                <div class="ai-stat-item warning">
                    <span class="stat-label">Sinh viên có nguy cơ:</span>
                    <span class="stat-value">${atRiskCount}</span>
                </div>
                <div class="ai-stat-item success">
                    <span class="stat-label">Sinh viên xuất sắc:</span>
                    <span class="stat-value">${excellentCount}</span>
                </div>
                <div class="ai-stat-item">
                    <span class="stat-label">Tổng giảng viên:</span>
                    <span class="stat-value">${teachers.length}</span>
                </div>
            </div>
            <p><strong>💡 Nhận xét:</strong></p>
            <ul>
                <li>${avgGPA >= 3.0 ? '✅ GPA trung bình ở mức tốt' : '⚠️ GPA trung bình cần cải thiện'}</li>
                <li>${avgAttendance >= 85 ? '✅ Tỷ lệ tham gia cao' : '⚠️ Cần tăng cường tỷ lệ tham gia'}</li>
                <li>${atRiskCount > 0 ? `⚠️ Có ${atRiskCount} sinh viên cần can thiệp khẩn cấp` : '✅ Không có sinh viên nguy cơ'}</li>
            </ul>
        `;
    },

    predictTrends(message) {
        const students = Database.getAllStudents();
        const atRiskCount = students.filter(s => s.status === 'at-risk').length;
        const dropoutRate = ((atRiskCount / students.length) * 100).toFixed(1);

        return `
            <p><strong>🔮 Dự đoán Xu hướng:</strong></p>
            <div class="ai-prediction">
                <div class="prediction-item">
                    <span class="prediction-label">Tỷ lệ bỏ học dự kiến:</span>
                    <span class="prediction-value warning">${dropoutRate}%</span>
                </div>
                <div class="prediction-item">
                    <span class="prediction-label">Xu hướng GPA:</span>
                    <span class="prediction-value">${Math.random() > 0.5 ? '📈 Tăng' : '📉 Giảm'}</span>
                </div>
                <div class="prediction-item">
                    <span class="prediction-label">Độ tin cậy:</span>
                    <span class="prediction-value">85%</span>
                </div>
            </div>
            <p><strong>📋 Khuyến nghị:</strong></p>
            <ul>
                <li>Tăng cường hỗ trợ cho ${atRiskCount} sinh viên có nguy cơ</li>
                <li>Tổ chức thêm lớp học bổ trợ cho các môn yếu</li>
                <li>Tư vấn tâm lý cho sinh viên có vấn đề về sức khỏe tinh thần</li>
                <li>Liên hệ phụ huynh để phối hợp hỗ trợ</li>
            </ul>
        `;
    },

    optimizeSuggestions(message) {
        return `
            <p><strong>💡 Đề xuất Tối ưu hóa:</strong></p>
            <div class="ai-suggestions">
                <div class="suggestion-item">
                    <div class="suggestion-icon">📅</div>
                    <div class="suggestion-content">
                        <strong>Thời khóa biểu</strong>
                        <p>Phát hiện 3 xung đột lịch học. Đề xuất điều chỉnh lịch dạy của GV Nguyễn Văn A sang buổi chiều.</p>
                    </div>
                </div>
                <div class="suggestion-item">
                    <div class="suggestion-icon">👥</div>
                    <div class="suggestion-content">
                        <strong>Phân bổ lớp học</strong>
                        <p>Lớp CNTT-K24A có 75 sinh viên, vượt sức chứa phòng. Đề xuất chia thành 2 nhóm.</p>
                    </div>
                </div>
                <div class="suggestion-item">
                    <div class="suggestion-icon">💰</div>
                    <div class="suggestion-content">
                        <strong>Tài chính</strong>
                        <p>Phát hiện 15 sinh viên chưa đóng học phí. Đề xuất gửi thông báo nhắc nhở.</p>
                    </div>
                </div>
            </div>
        `;
    },

    studentInfo(message) {
        const students = Database.getAllStudents();
        const classes = Database.classes;
        
        return `
            <p><strong>👨‍🎓 Thông tin Sinh viên:</strong></p>
            <ul>
                <li>Tổng số sinh viên: <strong>${students.length}</strong></li>
                <li>Số lớp: <strong>${classes.length}</strong></li>
                <li>Trung bình sinh viên/lớp: <strong>${Math.round(students.length / classes.length)}</strong></li>
                <li>Sinh viên xuất sắc: <strong>${students.filter(s => s.status === 'excellent').length}</strong></li>
                <li>Sinh viên có nguy cơ: <strong>${students.filter(s => s.status === 'at-risk').length}</strong></li>
            </ul>
            <p>Bạn muốn xem chi tiết về sinh viên nào không?</p>
        `;
    },

    teacherInfo(message) {
        const teachers = Database.getAllTeachers();
        const faculties = [...new Set(teachers.map(t => t.faculty))];
        
        return `
            <p><strong>👨‍🏫 Thông tin Giảng viên:</strong></p>
            <ul>
                <li>Tổng số giảng viên: <strong>${teachers.length}</strong></li>
                <li>Số khoa: <strong>${faculties.length}</strong></li>
                <li>Tiến sĩ: <strong>${teachers.filter(t => t.degree === 'Tiến sĩ').length}</strong></li>
                <li>Thạc sĩ: <strong>${teachers.filter(t => t.degree === 'Thạc sĩ').length}</strong></li>
                <li>Cử nhân: <strong>${teachers.filter(t => t.degree === 'Cử nhân').length}</strong></li>
            </ul>
        `;
    },

    scheduleInfo(message) {
        const schedules = Database.schedules;
        
        return `
            <p><strong>📅 Thông tin Thời khóa biểu:</strong></p>
            <ul>
                <li>Tổng số tiết học: <strong>${schedules.length}</strong></li>
                <li>Trạng thái: <strong>Đã xếp lịch</strong></li>
                <li>Xung đột: <strong>0</strong></li>
            </ul>
            <p>💡 Bạn có thể dùng tính năng "Tự động xếp lịch" để tối ưu hóa thời khóa biểu!</p>
        `;
    },

    financeInfo(message) {
        const finances = Database.getAllFinances();
        const totalIncome = finances.reduce((sum, f) => sum + f.income.total, 0);
        const totalExpense = finances.reduce((sum, f) => sum + f.expense.total, 0);
        const profit = totalIncome - totalExpense;
        
        return `
            <p><strong>💰 Tình hình Tài chính:</strong></p>
            <div class="ai-stats">
                <div class="ai-stat-item success">
                    <span class="stat-label">Tổng thu:</span>
                    <span class="stat-value">${(totalIncome / 1000000000).toFixed(2)} tỷ VNĐ</span>
                </div>
                <div class="ai-stat-item warning">
                    <span class="stat-label">Tổng chi:</span>
                    <span class="stat-value">${(totalExpense / 1000000000).toFixed(2)} tỷ VNĐ</span>
                </div>
                <div class="ai-stat-item ${profit > 0 ? 'success' : 'warning'}">
                    <span class="stat-label">Lợi nhuận:</span>
                    <span class="stat-value">${(profit / 1000000000).toFixed(2)} tỷ VNĐ</span>
                </div>
            </div>
            <p>${profit > 0 ? '✅ Tình hình tài chính ổn định' : '⚠️ Cần kiểm soát chi phí'}</p>
        `;
    },

    researchInfo(message) {
        const research = Database.getAllResearch();
        const completed = research.filter(r => r.status === 'Hoàn thành' || r.status === 'Đã xuất bản').length;
        
        return `
            <p><strong>🔬 Nghiên cứu Khoa học:</strong></p>
            <ul>
                <li>Tổng số đề tài: <strong>${research.length}</strong></li>
                <li>Đã hoàn thành: <strong>${completed}</strong></li>
                <li>Đang thực hiện: <strong>${research.filter(r => r.status === 'Đang thực hiện').length}</strong></li>
                <li>Tổng trích dẫn: <strong>${research.reduce((sum, r) => sum + r.citations, 0)}</strong></li>
            </ul>
        `;
    },

    quickAction(action) {
        const input = document.getElementById('ai-input');
        
        switch(action) {
            case 'analyze':
                input.value = 'Phân tích tình hình sinh viên hiện tại';
                break;
            case 'predict':
                input.value = 'Dự đoán xu hướng học tập';
                break;
            case 'optimize':
                input.value = 'Đề xuất tối ưu hóa hệ thống';
                break;
        }
        
        this.sendMessage();
    }
};
