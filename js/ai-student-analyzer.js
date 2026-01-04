// AI Student Analyzer - Advanced Student Analysis Module
const AIStudentAnalyzer = {
    currentStudent: null,
    analysisData: null,

    // Open AI Analysis Panel
    open(studentId) {
        this.currentStudent = this.getStudentData(studentId);
        this.performAnalysis();
        this.render();
    },

    // Get student data
    getStudentData(studentId) {
        // Get data from Database
        const student = Database.getStudent(studentId);
        if (student) {
            return student;
        }
        
        // Fallback to mock data if not found
        return {
            id: studentId,
            name: 'Học sinh không tìm thấy',
            avatar: 'https://ui-avatars.com/api/?name=Unknown&background=6B7280&color=fff',
            class: 'N/A',
            email: 'unknown@student.edu.vn',
            phone: 'N/A',
            dateOfBirth: '2008-01-01',
            address: 'N/A',
            parentName: 'N/A',
            parentPhone: 'N/A',
            enrollmentDate: '2024-09-01',
            gpa: 0,
            attendance: 0,
            credits: 0,
            grades: [],
            attendanceHistory: [],
            behaviorNotes: [],
            socialInteractions: { friendsCount: 0, groupParticipation: 0, isolationScore: 0 },
            financialStatus: { tuitionPaid: false, hasDebt: false, scholarshipEligible: false }
        };
    },

    // Perform AI Analysis
    performAnalysis() {
        const student = this.currentStudent;
        
        this.analysisData = {
            // Risk Assessment
            riskAssessment: this.calculateRiskAssessment(student),
            
            // Learning Style
            learningStyle: this.detectLearningStyle(student),
            
            // Behavioral Analysis
            behavioralAnalysis: this.analyzeBehavior(student),
            
            // Academic Performance
            academicAnalysis: this.analyzeAcademicPerformance(student),
            
            // Social Analysis
            socialAnalysis: this.analyzeSocialBehavior(student),
            
            // Recommendations
            recommendations: this.generateRecommendations(student),
            
            // Predictions
            predictions: this.generatePredictions(student)
        };
    },

    calculateRiskAssessment(student) {
        const factors = {
            gpa: student.gpa < 2.0 ? 40 : student.gpa < 2.5 ? 25 : student.gpa < 3.0 ? 10 : 0,
            attendance: student.attendance < 60 ? 30 : student.attendance < 75 ? 20 : student.attendance < 85 ? 10 : 0,
            financial: student.financialStatus.hasDebt ? 15 : 0,
            social: student.socialInteractions.isolationScore > 0.6 ? 10 : student.socialInteractions.isolationScore > 0.4 ? 5 : 0,
            behavioral: student.behaviorNotes.filter(n => n.type === 'negative').length > 3 ? 5 : 0
        };

        const totalRisk = Object.values(factors).reduce((a, b) => a + b, 0);
        
        // Tạo đề xuất cụ thể dựa trên từng yếu tố
        const recommendations = [];
        
        if (factors.gpa > 0) {
            recommendations.push({
                factor: 'GPA thấp',
                severity: factors.gpa >= 25 ? 'critical' : 'warning',
                actions: [
                    'Sắp xếp lớp học bổ trợ cho các môn yếu',
                    'Ghép với mentor/sinh viên giỏi',
                    'Tư vấn phương pháp học tập hiệu quả',
                    'Theo dõi tiến độ học tập hàng tuần'
                ]
            });
        }
        
        if (factors.attendance > 0) {
            recommendations.push({
                factor: 'Tỷ lệ tham gia thấp',
                severity: factors.attendance >= 20 ? 'critical' : 'warning',
                actions: [
                    'Liên hệ phụ huynh để tìm hiểu nguyên nhân',
                    'Khuyến khích tham gia hoạt động ngoại khóa',
                    'Theo dõi điểm danh hàng ngày',
                    'Tạo động lực học tập qua các hoạt động thú vị'
                ]
            });
        }
        
        if (factors.financial > 0) {
            recommendations.push({
                factor: 'Vấn đề tài chính',
                severity: 'warning',
                actions: [
                    'Tư vấn về học bổng và hỗ trợ tài chính',
                    'Giới thiệu các chương trình làm thêm phù hợp',
                    'Liên hệ phòng Tài chính để lập kế hoạch thanh toán',
                    'Xem xét miễn giảm học phí nếu đủ điều kiện'
                ]
            });
        }
        
        if (factors.social > 0) {
            recommendations.push({
                factor: 'Cô lập xã hội',
                severity: factors.social >= 10 ? 'critical' : 'warning',
                actions: [
                    'Kết nối với tư vấn viên tâm lý',
                    'Khuyến khích tham gia CLB và hoạt động nhóm',
                    'Theo dõi sức khỏe tinh thần',
                    'Tạo môi trường học tập thân thiện'
                ]
            });
        }
        
        if (factors.behavioral > 0) {
            recommendations.push({
                factor: 'Hành vi tiêu cực',
                severity: 'warning',
                actions: [
                    'Gặp gỡ và trao đổi trực tiếp với sinh viên',
                    'Liên hệ phụ huynh để phối hợp giáo dục',
                    'Tìm hiểu nguyên nhân gốc rễ',
                    'Đưa ra kế hoạch cải thiện hành vi cụ thể'
                ]
            });
        }
        
        return {
            score: totalRisk,
            level: totalRisk > 60 ? 'HIGH' : totalRisk > 30 ? 'MEDIUM' : 'LOW',
            factors: factors,
            description: this.getRiskDescription(totalRisk),
            recommendations: recommendations
        };
    },

    getRiskDescription(score) {
        if (score > 70) return 'Nguy cơ bỏ học rất cao. Cần can thiệp khẩn cấp.';
        if (score > 40) return 'Có nguy cơ bỏ học. Cần theo dõi và hỗ trợ.';
        return 'Nguy cơ thấp. Tiếp tục theo dõi định kỳ.';
    },

    detectLearningStyle(student) {
        // Simulate learning style detection
        return {
            primary: 'Visual',
            secondary: 'Kinesthetic',
            scores: {
                visual: 0.75,
                auditory: 0.45,
                kinesthetic: 0.60
            },
            characteristics: [
                'Học tốt qua hình ảnh và sơ đồ',
                'Thích ghi chú bằng màu sắc',
                'Cần thực hành để hiểu sâu'
            ]
        };
    },

    analyzeBehavior(student) {
        const negativeCount = student.behaviorNotes.filter(n => n.type === 'negative').length;
        const positiveCount = student.behaviorNotes.filter(n => n.type === 'positive').length;
        
        return {
            overallScore: (positiveCount - negativeCount) / student.behaviorNotes.length,
            positiveCount: positiveCount,
            negativeCount: negativeCount,
            recentTrend: negativeCount > positiveCount ? 'declining' : 'improving',
            concerns: this.identifyBehavioralConcerns(student)
        };
    },

    identifyBehavioralConcerns(student) {
        const concerns = [];
        
        if (student.attendance < 80) {
            concerns.push({
                type: 'attendance',
                severity: 'high',
                message: 'Tỷ lệ vắng mặt cao'
            });
        }
        
        const lateSubmissions = student.behaviorNotes.filter(n => 
            n.note.includes('trễ') || n.note.includes('muộn')
        ).length;
        
        if (lateSubmissions > 2) {
            concerns.push({
                type: 'punctuality',
                severity: 'medium',
                message: 'Thường xuyên nộp bài trễ'
            });
        }
        
        return concerns;
    },

    analyzeAcademicPerformance(student) {
        const avgScore = student.grades.reduce((sum, g) => sum + g.score, 0) / student.grades.length;
        const decliningSubjects = student.grades.filter(g => g.trend === 'down');
        
        return {
            averageScore: avgScore.toFixed(2),
            gpa: student.gpa,
            trend: decliningSubjects.length > 2 ? 'declining' : 'stable',
            strengths: student.grades.filter(g => g.score >= 8).map(g => g.subject),
            weaknesses: student.grades.filter(g => g.score < 7).map(g => g.subject),
            decliningSubjects: decliningSubjects.map(g => g.subject),
            improvement: this.calculateImprovement(student)
        };
    },

    calculateImprovement(student) {
        // Simulate improvement calculation
        return {
            lastMonth: -5,
            lastQuarter: -8,
            trend: 'declining'
        };
    },

    analyzeSocialBehavior(student) {
        return {
            isolationLevel: student.socialInteractions.isolationScore > 0.5 ? 'high' : 
                           student.socialInteractions.isolationScore > 0.3 ? 'medium' : 'low',
            friendsCount: student.socialInteractions.friendsCount,
            groupParticipation: student.socialInteractions.groupParticipation,
            concerns: student.socialInteractions.isolationScore > 0.5 ? 
                ['Có dấu hiệu cô lập xã hội', 'Cần tư vấn tâm lý'] : []
        };
    },

    generateRecommendations(student) {
        const recommendations = [];
        
        // Academic recommendations
        if (student.gpa < 2.5) {
            recommendations.push({
                category: 'academic',
                priority: 'high',
                title: 'Hỗ trợ học tập',
                actions: [
                    'Sắp xếp lớp học bổ trợ',
                    'Ghép với mentor',
                    'Tài liệu học tập bổ sung'
                ]
            });
        }
        
        // Attendance recommendations
        if (student.attendance < 80) {
            recommendations.push({
                category: 'attendance',
                priority: 'high',
                title: 'Cải thiện tham gia',
                actions: [
                    'Liên hệ phụ huynh',
                    'Tìm hiểu nguyên nhân vắng mặt',
                    'Theo dõi hàng tuần'
                ]
            });
        }
        
        // Social recommendations
        if (student.socialInteractions.isolationScore > 0.5) {
            recommendations.push({
                category: 'social',
                priority: 'medium',
                title: 'Hỗ trợ xã hội',
                actions: [
                    'Kết nối với tư vấn viên',
                    'Tham gia hoạt động nhóm',
                    'Theo dõi sức khỏe tâm lý'
                ]
            });
        }
        
        return recommendations;
    },

    generatePredictions(student) {
        return {
            nextSemesterGPA: {
                predicted: 2.8,
                confidence: 0.75,
                trend: 'declining'
            },
            graduationProbability: {
                onTime: 0.65,
                delayed: 0.25,
                dropout: 0.10
            },
            careerPath: {
                recommended: ['CNTT', 'Kinh doanh'],
                basedOn: ['Điểm mạnh môn Toán', 'Kỹ năng giao tiếp']
            }
        };
    },

    // Render AI Analysis Panel
    render() {
        const panel = `
            <div class="ai-analyzer-overlay" onclick="AIStudentAnalyzer.close()">
                <div class="ai-analyzer-panel" onclick="event.stopPropagation()">
                    ${this.renderHeader()}
                    ${this.renderTabs()}
                    <div class="ai-analyzer-content" id="ai-analyzer-content">
                        ${this.renderOverview()}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', panel);
    },

    renderHeader() {
        const student = this.currentStudent;
        const risk = this.analysisData.riskAssessment;
        
        return `
            <div class="ai-analyzer-header">
                <div class="student-header-info">
                    <img src="${student.avatar}" alt="${student.name}" class="student-avatar-large">
                    <div class="student-header-details">
                        <h2>${student.name}</h2>
                        <p>${student.id} • ${student.class}</p>
                        <div class="risk-indicator ${risk.level.toLowerCase()}">
                            <i class="fas fa-exclamation-triangle"></i>
                            Nguy cơ: ${risk.level}
                        </div>
                    </div>
                </div>
                <button class="close-btn" onclick="AIStudentAnalyzer.close()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    },

    renderTabs() {
        return `
            <div class="ai-analyzer-tabs">
                <button class="tab-btn active" onclick="AIStudentAnalyzer.switchTab('overview')">
                    <i class="fas fa-chart-pie"></i> Tổng quan
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('academic')">
                    <i class="fas fa-graduation-cap"></i> Học tập
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('behavior')">
                    <i class="fas fa-user-check"></i> Hành vi
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('social')">
                    <i class="fas fa-users"></i> Xã hội
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('timeline')">
                    <i class="fas fa-history"></i> Lịch sử
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('comparison')">
                    <i class="fas fa-balance-scale"></i> So sánh
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('goals')">
                    <i class="fas fa-bullseye"></i> Mục tiêu
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('communication')">
                    <i class="fas fa-comments"></i> Giao tiếp
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('health')">
                    <i class="fas fa-heartbeat"></i> Sức khỏe
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('extracurricular')">
                    <i class="fas fa-trophy"></i> Ngoại khóa
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('aichat')">
                    <i class="fas fa-robot"></i> AI Chat
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('recommendations')">
                    <i class="fas fa-lightbulb"></i> Đề xuất
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('export')">
                    <i class="fas fa-file-export"></i> Xuất báo cáo
                </button>
                <button class="tab-btn" onclick="AIStudentAnalyzer.switchTab('edit')">
                    <i class="fas fa-edit"></i> Chỉnh sửa
                </button>
            </div>
        `;
    },

    renderOverview() {
        const risk = this.analysisData.riskAssessment;
        const academic = this.analysisData.academicAnalysis;
        const learning = this.analysisData.learningStyle;
        
        return `
            <div class="overview-tab">
                <!-- Risk Assessment Card -->
                <div class="analysis-card risk-card">
                    <h3><i class="fas fa-exclamation-triangle"></i> Đánh giá Nguy cơ</h3>
                    <div class="risk-score-container">
                        <div class="risk-score ${risk.level.toLowerCase()}">
                            ${risk.score}%
                        </div>
                        <div class="risk-level">${risk.level}</div>
                    </div>
                    <p class="risk-description">${risk.description}</p>
                    
                    <div class="risk-factors">
                        <h4>Các yếu tố ảnh hưởng:</h4>
                        ${Object.entries(risk.factors).map(([key, value]) => `
                            <div class="factor-item">
                                <span class="factor-name">${this.getFactorName(key)}</span>
                                <div class="factor-bar">
                                    <div class="factor-fill" style="width: ${value}%"></div>
                                </div>
                                <span class="factor-value">${value}%</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${risk.recommendations && risk.recommendations.length > 0 ? `
                        <div class="risk-recommendations">
                            <h4><i class="fas fa-lightbulb"></i> Đề xuất Can thiệp:</h4>
                            ${risk.recommendations.map(rec => `
                                <div class="recommendation-item ${rec.severity}">
                                    <div class="rec-header">
                                        <strong>${rec.factor}</strong>
                                        <span class="severity-badge ${rec.severity}">${rec.severity === 'critical' ? 'Khẩn cấp' : 'Cảnh báo'}</span>
                                    </div>
                                    <ul class="rec-actions">
                                        ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <button class="btn btn-primary" onclick="AIStudentAnalyzer.generateInterventionPlan()">
                        <i class="fas fa-file-medical"></i> Tạo kế hoạch can thiệp
                    </button>
                </div>

                <!-- Academic Performance -->
                <div class="analysis-card">
                    <h3><i class="fas fa-chart-line"></i> Hiệu suất Học tập</h3>
                    <div class="performance-grid">
                        <div class="perf-item">
                            <div class="perf-label">GPA</div>
                            <div class="perf-value">${academic.gpa}</div>
                        </div>
                        <div class="perf-item">
                            <div class="perf-label">Điểm TB</div>
                            <div class="perf-value">${academic.averageScore}</div>
                        </div>
                        <div class="perf-item">
                            <div class="perf-label">Xu hướng</div>
                            <div class="perf-value ${academic.trend}">
                                ${academic.trend === 'declining' ? '📉' : '📈'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="strengths-weaknesses">
                        <div class="sw-column">
                            <h4>💪 Điểm mạnh</h4>
                            <ul>
                                ${academic.strengths.map(s => `<li>${s}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="sw-column">
                            <h4>⚠️ Điểm yếu</h4>
                            <ul>
                                ${academic.weaknesses.map(w => `<li>${w}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Learning Style -->
                <div class="analysis-card">
                    <h3><i class="fas fa-brain"></i> Phong cách Học tập</h3>
                    <div class="learning-style-primary">
                        <div class="style-icon">🎨</div>
                        <div class="style-info">
                            <h4>${learning.primary} Learner</h4>
                            <p>Phong cách học tập chính</p>
                        </div>
                    </div>
                    
                    <div class="learning-scores">
                        ${Object.entries(learning.scores).map(([type, score]) => `
                            <div class="learning-score-item">
                                <span>${this.capitalize(type)}</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: ${score * 100}%"></div>
                                </div>
                                <span>${(score * 100).toFixed(0)}%</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="learning-characteristics">
                        <h4>Đặc điểm:</h4>
                        <ul>
                            ${learning.characteristics.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    getFactorName(key) {
        const names = {
            gpa: 'Điểm GPA',
            attendance: 'Tham gia',
            financial: 'Tài chính',
            social: 'Xã hội',
            behavioral: 'Hành vi'
        };
        return names[key] || key;
    },

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    switchTab(tab) {
        // Update active tab
        document.querySelectorAll('.ai-analyzer-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.closest('.tab-btn').classList.add('active');
        
        // Render content
        const content = document.getElementById('ai-analyzer-content');
        
        switch(tab) {
            case 'overview':
                content.innerHTML = this.renderOverview();
                break;
            case 'academic':
                content.innerHTML = this.renderAcademicTab();
                break;
            case 'behavior':
                content.innerHTML = this.renderBehaviorTab();
                break;
            case 'social':
                content.innerHTML = this.renderSocialTab();
                break;
            case 'timeline':
                content.innerHTML = this.renderTimelineTab();
                break;
            case 'comparison':
                content.innerHTML = this.renderComparisonTab();
                break;
            case 'goals':
                content.innerHTML = this.renderGoalsTab();
                break;
            case 'communication':
                content.innerHTML = this.renderCommunicationTab();
                break;
            case 'health':
                content.innerHTML = this.renderHealthTab();
                break;
            case 'extracurricular':
                content.innerHTML = this.renderExtracurricularTab();
                break;
            case 'aichat':
                content.innerHTML = this.renderAIChatTab();
                break;
            case 'recommendations':
                content.innerHTML = this.renderRecommendationsTab();
                break;
            case 'export':
                content.innerHTML = this.renderExportTab();
                break;
            case 'edit':
                content.innerHTML = this.renderEditTab();
                break;
        }
    },

    close() {
        document.querySelector('.ai-analyzer-overlay')?.remove();
    },

    generateInterventionPlan() {
        Utils.showToast('Đang tạo kế hoạch can thiệp...', 'info');
        setTimeout(() => {
            Utils.showToast('Kế hoạch can thiệp đã được tạo!', 'success');
        }, 2000);
    }
};

    renderAcademicTab() {
        const student = this.currentStudent;
        const academic = this.analysisData.academicAnalysis;
        const predictions = this.analysisData.predictions;
        
        return `
            <div class="academic-tab">
                <div class="analysis-card">
                    <h3><i class="fas fa-chart-bar"></i> Phân tích Điểm số Chi tiết</h3>
                    <div class="grades-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Môn học</th>
                                    <th>Điểm</th>
                                    <th>Xu hướng</th>
                                    <th>So với TB lớp</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${student.grades.map(grade => `
                                    <tr>
                                        <td>${grade.subject}</td>
                                        <td>
                                            <span class="grade-score ${this.getGradeClass(grade.score)}">
                                                ${grade.score}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="trend-indicator ${grade.trend}">
                                                ${this.getTrendIcon(grade.trend)}
                                            </span>
                                        </td>
                                        <td>+0.5</td>
                                        <td>
                                            <button class="btn-icon" onclick="AIStudentAnalyzer.editGrade('${grade.subject}')">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="analysis-card">
                    <h3><i class="fas fa-crystal-ball"></i> Dự báo AI</h3>
                    <div class="prediction-grid">
                        <div class="prediction-card">
                            <h4>GPA Học kỳ tới</h4>
                            <div class="prediction-value">${predictions.nextSemesterGPA.predicted}</div>
                            <div class="confidence">Độ tin cậy: ${(predictions.nextSemesterGPA.confidence * 100).toFixed(0)}%</div>
                            <div class="prediction-trend ${predictions.nextSemesterGPA.trend}">
                                ${predictions.nextSemesterGPA.trend === 'declining' ? '📉 Giảm' : '📈 Tăng'}
                            </div>
                        </div>
                        
                        <div class="prediction-card">
                            <h4>Xác suất Tốt nghiệp</h4>
                            <div class="graduation-probs">
                                <div class="prob-item">
                                    <span>Đúng hạn</span>
                                    <div class="prob-bar">
                                        <div class="prob-fill success" style="width: ${predictions.graduationProbability.onTime * 100}%"></div>
                                    </div>
                                    <span>${(predictions.graduationProbability.onTime * 100).toFixed(0)}%</span>
                                </div>
                                <div class="prob-item">
                                    <span>Trễ hạn</span>
                                    <div class="prob-bar">
                                        <div class="prob-fill warning" style="width: ${predictions.graduationProbability.delayed * 100}%"></div>
                                    </div>
                                    <span>${(predictions.graduationProbability.delayed * 100).toFixed(0)}%</span>
                                </div>
                                <div class="prob-item">
                                    <span>Bỏ học</span>
                                    <div class="prob-bar">
                                        <div class="prob-fill danger" style="width: ${predictions.graduationProbability.dropout * 100}%"></div>
                                    </div>
                                    <span>${(predictions.graduationProbability.dropout * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="analysis-card">
                    <h3><i class="fas fa-road"></i> Định hướng Nghề nghiệp</h3>
                    <div class="career-recommendations">
                        <h4>Ngành nghề phù hợp:</h4>
                        <div class="career-tags">
                            ${predictions.careerPath.recommended.map(career => `
                                <span class="career-tag">${career}</span>
                            `).join('')}
                        </div>
                        <p class="career-reason">Dựa trên: ${predictions.careerPath.basedOn.join(', ')}</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderBehaviorTab() {
        const student = this.currentStudent;
        const behavior = this.analysisData.behavioralAnalysis;
        
        return `
            <div class="behavior-tab">
                <div class="analysis-card">
                    <h3><i class="fas fa-user-check"></i> Phân tích Hành vi</h3>
                    <div class="behavior-summary">
                        <div class="behavior-score ${behavior.recentTrend}">
                            <div class="score-circle">
                                ${(behavior.overallScore * 100).toFixed(0)}
                            </div>
                            <p>Điểm hành vi tổng thể</p>
                        </div>
                        <div class="behavior-counts">
                            <div class="count-item positive">
                                <i class="fas fa-thumbs-up"></i>
                                <span>${behavior.positiveCount}</span>
                                <p>Tích cực</p>
                            </div>
                            <div class="count-item negative">
                                <i class="fas fa-thumbs-down"></i>
                                <span>${behavior.negativeCount}</span>
                                <p>Tiêu cực</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="analysis-card">
                    <h3><i class="fas fa-calendar-check"></i> Lịch sử Điểm danh</h3>
                    <div class="attendance-stats">
                        <div class="stat-box">
                            <div class="stat-value">${student.attendance}%</div>
                            <div class="stat-label">Tỷ lệ tham gia</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">${student.attendanceHistory.filter(a => a.status === 'absent').length}</div>
                            <div class="stat-label">Vắng mặt</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value">${student.attendanceHistory.filter(a => a.status === 'late').length}</div>
                            <div class="stat-label">Đi muộn</div>
                        </div>
                    </div>
                    
                    <div class="attendance-timeline">
                        ${student.attendanceHistory.map(record => `
                            <div class="attendance-record ${record.status}">
                                <span class="record-date">${record.date}</span>
                                <span class="record-status">${this.getAttendanceStatus(record.status)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="analysis-card">
                    <h3><i class="fas fa-clipboard-list"></i> Ghi chú Hành vi</h3>
                    <div class="behavior-notes">
                        ${student.behaviorNotes.map(note => `
                            <div class="note-item ${note.type}">
                                <div class="note-header">
                                    <span class="note-date">${note.date}</span>
                                    <span class="note-type ${note.type}">
                                        ${note.type === 'positive' ? '✓' : '✗'}
                                    </span>
                                </div>
                                <p class="note-content">${note.note}</p>
                                <div class="note-actions">
                                    <button class="btn-icon" onclick="AIStudentAnalyzer.editNote('${note.date}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-icon" onclick="AIStudentAnalyzer.deleteNote('${note.date}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" onclick="AIStudentAnalyzer.addBehaviorNote()">
                        <i class="fas fa-plus"></i> Thêm ghi chú
                    </button>
                </div>

                ${behavior.concerns.length > 0 ? `
                    <div class="analysis-card warning-card">
                        <h3><i class="fas fa-exclamation-triangle"></i> Cảnh báo</h3>
                        <div class="concerns-list">
                            ${behavior.concerns.map(concern => `
                                <div class="concern-item ${concern.severity}">
                                    <i class="fas fa-exclamation-circle"></i>
                                    <span>${concern.message}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderSocialTab() {
        const social = this.analysisData.socialAnalysis;
        const student = this.currentStudent;
        
        return `
            <div class="social-tab">
                <div class="analysis-card">
                    <h3><i class="fas fa-users"></i> Phân tích Xã hội</h3>
                    <div class="social-metrics">
                        <div class="metric-card">
                            <div class="metric-icon">👥</div>
                            <div class="metric-value">${social.friendsCount}</div>
                            <div class="metric-label">Bạn bè</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">🎯</div>
                            <div class="metric-value">${social.groupParticipation}</div>
                            <div class="metric-label">Nhóm tham gia</div>
                        </div>
                        <div class="metric-card ${social.isolationLevel}">
                            <div class="metric-icon">📊</div>
                            <div class="metric-value">${social.isolationLevel.toUpperCase()}</div>
                            <div class="metric-label">Mức độ cô lập</div>
                        </div>
                    </div>
                </div>

                <div class="analysis-card">
                    <h3><i class="fas fa-project-diagram"></i> Mạng lưới Quan hệ</h3>
                    <div class="social-network-viz">
                        <div class="network-placeholder">
                            <i class="fas fa-sitemap"></i>
                            <p>Biểu đồ mạng lưới quan hệ</p>
                            <small>Hiển thị kết nối với bạn bè và nhóm</small>
                        </div>
                    </div>
                </div>

                ${social.concerns.length > 0 ? `
                    <div class="analysis-card warning-card">
                        <h3><i class="fas fa-heart"></i> Quan tâm Tâm lý</h3>
                        <div class="psychological-concerns">
                            ${social.concerns.map(concern => `
                                <div class="concern-item">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <span>${concern}</span>
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn btn-primary" onclick="AIStudentAnalyzer.referToCounselor()">
                            <i class="fas fa-user-md"></i> Chuyển đến tư vấn viên
                        </button>
                    </div>
                ` : ''}

                <div class="analysis-card">
                    <h3><i class="fas fa-comments"></i> Tương tác Gần đây</h3>
                    <div class="recent-interactions">
                        <p class="no-data">Chưa có dữ liệu tương tác</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderRecommendationsTab() {
        const recommendations = this.analysisData.recommendations;
        
        return `
            <div class="recommendations-tab">
                <div class="recommendations-header">
                    <h3><i class="fas fa-lightbulb"></i> Đề xuất từ AI</h3>
                    <p>Các hành động được đề xuất dựa trên phân tích toàn diện</p>
                </div>

                ${recommendations.map((rec, index) => `
                    <div class="recommendation-card ${rec.priority}">
                        <div class="rec-header">
                            <div class="rec-icon">${this.getRecommendationIcon(rec.category)}</div>
                            <div class="rec-info">
                                <h4>${rec.title}</h4>
                                <span class="rec-priority ${rec.priority}">
                                    Ưu tiên: ${rec.priority.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div class="rec-actions">
                            <h5>Hành động đề xuất:</h5>
                            <ul>
                                ${rec.actions.map(action => `
                                    <li>
                                        <input type="checkbox" id="action-${index}-${rec.actions.indexOf(action)}">
                                        <label for="action-${index}-${rec.actions.indexOf(action)}">${action}</label>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="rec-footer">
                            <button class="btn btn-secondary" onclick="AIStudentAnalyzer.implementRecommendation(${index})">
                                <i class="fas fa-check"></i> Thực hiện
                            </button>
                            <button class="btn btn-secondary" onclick="AIStudentAnalyzer.customizeRecommendation(${index})">
                                <i class="fas fa-edit"></i> Tùy chỉnh
                            </button>
                        </div>
                    </div>
                `).join('')}

                <div class="generate-plan-section">
                    <button class="btn btn-primary btn-large" onclick="AIStudentAnalyzer.generateComprehensivePlan()">
                        <i class="fas fa-magic"></i> Tạo Kế hoạch Toàn diện
                    </button>
                </div>
            </div>
        `;
    },

    renderEditTab() {
        const student = this.currentStudent;
        
        return `
            <div class="edit-tab">
                <form onsubmit="AIStudentAnalyzer.saveChanges(event)" class="edit-form">
                    <div class="analysis-card">
                        <h3><i class="fas fa-user-edit"></i> Thông tin Cá nhân</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Họ và tên</label>
                                <input type="text" value="${student.name}" required>
                            </div>
                            <div class="form-group">
                                <label>Mã sinh viên</label>
                                <input type="text" value="${student.id}" readonly>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="${student.email}" required>
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại</label>
                                <input type="tel" value="${student.phone}">
                            </div>
                            <div class="form-group">
                                <label>Ngày sinh</label>
                                <input type="date" value="${student.dateOfBirth}">
                            </div>
                            <div class="form-group">
                                <label>Lớp</label>
                                <select>
                                    <option value="10A" ${student.class === '10A' ? 'selected' : ''}>10A</option>
                                    <option value="10B">10B</option>
                                    <option value="11A">11A</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="analysis-card">
                        <h3><i class="fas fa-users"></i> Thông tin Phụ huynh</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Tên phụ huynh</label>
                                <input type="text" value="${student.parentName}">
                            </div>
                            <div class="form-group">
                                <label>SĐT phụ huynh</label>
                                <input type="tel" value="${student.parentPhone}">
                            </div>
                        </div>
                    </div>

                    <div class="analysis-card">
                        <h3><i class="fas fa-graduation-cap"></i> Thông tin Học tập</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>GPA</label>
                                <input type="number" step="0.01" value="${student.gpa}" min="0" max="4">
                            </div>
                            <div class="form-group">
                                <label>Tỷ lệ tham gia (%)</label>
                                <input type="number" value="${student.attendance}" min="0" max="100">
                            </div>
                            <div class="form-group">
                                <label>Tín chỉ tích lũy</label>
                                <input type="number" value="${student.credits}" min="0">
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="AIStudentAnalyzer.close()">
                            <i class="fas fa-times"></i> Hủy
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        `;
    },

    // Helper methods
    getGradeClass(score) {
        if (score >= 8) return 'excellent';
        if (score >= 6.5) return 'good';
        if (score >= 5) return 'average';
        return 'poor';
    },

    getTrendIcon(trend) {
        const icons = {
            'up': '📈',
            'down': '📉',
            'stable': '➡️'
        };
        return icons[trend] || '➡️';
    },

    getAttendanceStatus(status) {
        const statuses = {
            'present': 'Có mặt',
            'absent': 'Vắng mặt',
            'late': 'Đi muộn'
        };
        return statuses[status] || status;
    },

    getRecommendationIcon(category) {
        const icons = {
            'academic': '📚',
            'attendance': '📅',
            'social': '👥',
            'financial': '💰',
            'health': '❤️'
        };
        return icons[category] || '💡';
    },

    // Action methods
    editGrade(subject) {
        Utils.showToast(`Chỉnh sửa điểm môn ${subject}`, 'info');
    },

    editNote(date) {
        Utils.showToast('Chỉnh sửa ghi chú', 'info');
    },

    deleteNote(date) {
        if (confirm('Bạn có chắc muốn xóa ghi chú này?')) {
            Utils.showToast('Đã xóa ghi chú', 'success');
        }
    },

    addBehaviorNote() {
        Utils.showToast('Thêm ghi chú hành vi mới', 'info');
    },

    referToCounselor() {
        Utils.showToast('Đã chuyển đến tư vấn viên', 'success');
    },

    implementRecommendation(index) {
        Utils.showToast('Đang thực hiện đề xuất...', 'info');
    },

    customizeRecommendation(index) {
        Utils.showToast('Tùy chỉnh đề xuất', 'info');
    },

    generateComprehensivePlan() {
        Utils.showLoading('AI đang tạo kế hoạch toàn diện...');
        setTimeout(() => {
            Utils.hideLoading();
            Utils.showToast('Kế hoạch toàn diện đã được tạo!', 'success');
        }, 3000);
    },

    saveChanges(event) {
        event.preventDefault();
        Utils.showLoading('Đang lưu thay đổi...');
        setTimeout(() => {
            Utils.hideLoading();
            Utils.showToast('Đã lưu thay đổi thành công!', 'success');
            this.close();
        }, 1500);
    }
};
