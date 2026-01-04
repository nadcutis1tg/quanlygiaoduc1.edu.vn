// AI Engine - Core AI functionality
const AIEngine = {
    // AI Assistant Chat
    chat: async function(message) {
        // Simulate AI response
        const responses = {
            'tuyển sinh': 'Dựa trên phân tích, tôi dự đoán số lượng tuyển sinh năm nay sẽ tăng 12% so với năm trước. Ngành CNTT và AI sẽ có nhu cầu cao nhất.',
            'học phí': 'Tỷ lệ thu học phí hiện tại là 92%, cao hơn 5% so với cùng kỳ. Tôi đề xuất gửi nhắc nhở cho 450 sinh viên chưa đóng học phí.',
            'thời khóa biểu': 'Tôi phát hiện 15 xung đột trong thời khóa biểu hiện tại. Bạn có muốn tôi tự động tối ưu không?',
            'sinh viên yếu': 'Hiện có 85 sinh viên có nguy cơ bỏ học cao. Tôi đã tạo danh sách và đề xuất biện pháp hỗ trợ cho từng trường hợp.'
        };

        // Find matching response
        for (let key in responses) {
            if (message.toLowerCase().includes(key)) {
                return responses[key];
            }
        }

        return 'Tôi đã hiểu câu hỏi của bạn. Để trả lời chính xác hơn, bạn có thể cung cấp thêm thông tin không?';
    },

    // Student Dropout Prediction
    predictDropout: function(studentData) {
        // Simulate ML model prediction
        const factors = {
            gpa: studentData.gpa < 2.0 ? 30 : 0,
            attendance: studentData.attendance < 70 ? 25 : 0,
            financial: studentData.hasDebt ? 20 : 0,
            engagement: studentData.engagement < 50 ? 15 : 0,
            social: studentData.socialScore < 40 ? 10 : 0
        };

        const riskScore = Object.values(factors).reduce((a, b) => a + b, 0);

        return {
            riskScore: riskScore,
            riskLevel: riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW',
            factors: factors,
            recommendations: this.generateRecommendations(factors)
        };
    },

    generateRecommendations: function(factors) {
        const recommendations = [];
        
        if (factors.gpa > 0) {
            recommendations.push('Sắp xếp lớp học bổ trợ cho sinh viên');
        }
        if (factors.attendance > 0) {
            recommendations.push('Liên hệ phụ huynh về tình trạng vắng học');
        }
        if (factors.financial > 0) {
            recommendations.push('Xem xét hỗ trợ học bổng hoặc trả góp');
        }
        if (factors.engagement > 0) {
            recommendations.push('Mời tham gia các hoạt động ngoại khóa');
        }
        if (factors.social > 0) {
            recommendations.push('Kết nối với tư vấn viên tâm lý');
        }

        return recommendations;
    },

    // Schedule Optimization
    optimizeSchedule: function(scheduleData) {
        // Simulate AI schedule optimization
        const conflicts = this.detectConflicts(scheduleData);
        const optimized = this.resolveConflicts(conflicts);

        return {
            originalConflicts: conflicts.length,
            resolvedConflicts: conflicts.length - 3,
            optimizedSchedule: optimized,
            improvements: [
                'Giảm 15 xung đột lịch học',
                'Tối ưu sử dụng phòng học 20%',
                'Giảm thời gian di chuyển giảng viên 30%'
            ]
        };
    },

    detectConflicts: function(scheduleData) {
        // Detect scheduling conflicts
        return [
            { type: 'room', description: 'Phòng 301 bị trùng lịch' },
            { type: 'teacher', description: 'GV Nguyễn Văn A dạy 2 lớp cùng giờ' },
            { type: 'student', description: 'Lớp 10A có 2 môn cùng tiết' }
        ];
    },

    resolveConflicts: function(conflicts) {
        // Resolve conflicts using AI
        return {
            resolved: conflicts.length - 3,
            suggestions: [
                'Chuyển lớp CS101 sang phòng 302',
                'Đổi giờ dạy của GV Nguyễn Văn A',
                'Điều chỉnh thời khóa biểu lớp 10A'
            ]
        };
    },

    // Financial Forecasting
    forecastRevenue: function(historicalData) {
        // Simulate revenue forecasting
        const trend = this.calculateTrend(historicalData);
        const seasonality = this.detectSeasonality(historicalData);

        return {
            nextMonth: 450000000, // 450M VND
            nextQuarter: 1350000000, // 1.35B VND
            nextYear: 5400000000, // 5.4B VND
            confidence: 0.85,
            trend: trend,
            seasonality: seasonality,
            recommendations: [
                'Tăng học phí ngành CNTT 10%',
                'Mở thêm 2 lớp ngành AI',
                'Giảm chi phí hành chính 5%'
            ]
        };
    },

    calculateTrend: function(data) {
        return 'INCREASING'; // Simplified
    },

    detectSeasonality: function(data) {
        return {
            peak: 'Tháng 9-10 (đầu năm học)',
            low: 'Tháng 6-8 (hè)'
        };
    },

    // Research Paper Recommendation
    recommendJournals: function(paperAbstract) {
        // Simulate journal recommendation
        return [
            {
                name: 'Nature Machine Intelligence',
                matchScore: 0.92,
                impactFactor: 25.8,
                acceptanceRate: 0.15,
                reviewTime: '3-4 months'
            },
            {
                name: 'IEEE Transactions on AI',
                matchScore: 0.88,
                impactFactor: 12.5,
                acceptanceRate: 0.25,
                reviewTime: '2-3 months'
            },
            {
                name: 'Journal of Machine Learning Research',
                matchScore: 0.85,
                impactFactor: 8.9,
                acceptanceRate: 0.30,
                reviewTime: '4-6 months'
            }
        ];
    },

    // File Upload Analysis
    analyzeUploadedFile: function(file) {
        // Simulate file analysis
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    fileName: file.name,
                    fileType: file.type,
                    detectedSheets: [
                        {
                            name: 'Danh sách giảng viên',
                            type: 'LECTURERS',
                            columns: ['Mã GV', 'Họ tên', 'Email', 'Chuyên ngành'],
                            rowCount: 35
                        },
                        {
                            name: 'Môn học',
                            type: 'COURSES',
                            columns: ['Mã môn', 'Tên môn', 'Số TC'],
                            rowCount: 24
                        },
                        {
                            name: 'Phòng học',
                            type: 'ROOMS',
                            columns: ['Mã phòng', 'Loại phòng', 'Sức chứa'],
                            rowCount: 18
                        }
                    ],
                    autoMapping: {
                        lecturers: 35,
                        courses: 24,
                        rooms: 18
                    },
                    confidence: 0.95
                });
            }, 1500);
        });
    },

    // Sentiment Analysis (Vietnamese)
    analyzeSentiment: function(text) {
        // Simplified Vietnamese sentiment analysis
        const negativeKeywords = ['buồn', 'chán', 'mệt', 'stress', 'áp lực', 'khó khăn'];
        const positiveKeywords = ['vui', 'hạnh phúc', 'tốt', 'tuyệt vời', 'thích'];

        let score = 0;
        negativeKeywords.forEach(word => {
            if (text.toLowerCase().includes(word)) score -= 1;
        });
        positiveKeywords.forEach(word => {
            if (text.toLowerCase().includes(word)) score += 1;
        });

        return {
            score: score,
            sentiment: score < -2 ? 'VERY_NEGATIVE' : score < 0 ? 'NEGATIVE' : score > 2 ? 'VERY_POSITIVE' : score > 0 ? 'POSITIVE' : 'NEUTRAL',
            urgency: score < -3 ? 'HIGH' : 'NORMAL'
        };
    },

    // Learning Style Detection
    detectLearningStyle: function(studentBehavior) {
        // Analyze student behavior to detect learning style
        const scores = {
            visual: studentBehavior.videoWatchTime * 0.4 + studentBehavior.imageInteraction * 0.6,
            auditory: studentBehavior.audioListenTime * 0.5 + studentBehavior.discussionParticipation * 0.5,
            kinesthetic: studentBehavior.practicalExercises * 0.6 + studentBehavior.labWork * 0.4
        };

        const maxScore = Math.max(...Object.values(scores));
        const dominantStyle = Object.keys(scores).find(key => scores[key] === maxScore);

        return {
            dominantStyle: dominantStyle,
            scores: scores,
            recommendations: this.getLearningRecommendations(dominantStyle)
        };
    },

    getLearningRecommendations: function(style) {
        const recommendations = {
            visual: [
                'Sử dụng nhiều sơ đồ, biểu đồ',
                'Xem video bài giảng',
                'Ghi chú bằng mind map'
            ],
            auditory: [
                'Nghe podcast giáo dục',
                'Tham gia thảo luận nhóm',
                'Đọc to bài học'
            ],
            kinesthetic: [
                'Thực hành nhiều bài tập',
                'Tham gia lab, workshop',
                'Học qua dự án thực tế'
            ]
        };

        return recommendations[style] || [];
    }
};

// AI Assistant UI
const AIAssistant = {
    isOpen: false,

    open: function() {
        if (this.isOpen) return;
        
        const assistantHTML = `
            <div class="ai-assistant-overlay" onclick="AIAssistant.close()"></div>
            <div class="ai-assistant-panel">
                <div class="ai-assistant-header">
                    <h3>🤖 AI Assistant</h3>
                    <button onclick="AIAssistant.close()">✕</button>
                </div>
                <div class="ai-assistant-body" id="ai-chat-body">
                    <div class="ai-message">
                        <div class="ai-avatar">🤖</div>
                        <div class="ai-text">
                            Xin chào! Tôi là AI Assistant của EduManager Pro. 
                            Tôi có thể giúp bạn:
                            <ul>
                                <li>Phân tích dữ liệu và tạo báo cáo</li>
                                <li>Dự đoán xu hướng và rủi ro</li>
                                <li>Tối ưu thời khóa biểu</li>
                                <li>Đề xuất giải pháp thông minh</li>
                            </ul>
                            Bạn cần tôi giúp gì?
                        </div>
                    </div>
                </div>
                <div class="ai-assistant-footer">
                    <input type="text" id="ai-chat-input" placeholder="Nhập câu hỏi..." 
                           onkeypress="if(event.key==='Enter') AIAssistant.sendMessage()">
                    <button onclick="AIAssistant.sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', assistantHTML);
        this.isOpen = true;
    },

    close: function() {
        document.querySelector('.ai-assistant-overlay')?.remove();
        document.querySelector('.ai-assistant-panel')?.remove();
        this.isOpen = false;
    },

    sendMessage: async function() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        // Get AI response
        const response = await AIEngine.chat(message);
        
        // Remove typing indicator and add response
        this.hideTyping();
        this.addMessage(response, 'ai');
    },

    addMessage: function(text, sender) {
        const chatBody = document.getElementById('ai-chat-body');
        const messageHTML = sender === 'user' ? `
            <div class="user-message">
                <div class="user-text">${text}</div>
                <div class="user-avatar">👤</div>
            </div>
        ` : `
            <div class="ai-message">
                <div class="ai-avatar">🤖</div>
                <div class="ai-text">${text}</div>
            </div>
        `;

        chatBody.insertAdjacentHTML('beforeend', messageHTML);
        chatBody.scrollTop = chatBody.scrollHeight;
    },

    showTyping: function() {
        const chatBody = document.getElementById('ai-chat-body');
        chatBody.insertAdjacentHTML('beforeend', `
            <div class="ai-message typing-indicator">
                <div class="ai-avatar">🤖</div>
                <div class="ai-text">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `);
        chatBody.scrollTop = chatBody.scrollHeight;
    },

    hideTyping: function() {
        document.querySelector('.typing-indicator')?.remove();
    }
};
