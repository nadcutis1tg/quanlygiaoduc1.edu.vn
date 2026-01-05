// AI Service - Xử lý gọi API AI thực
const AIService = {
    // Kiểm tra xem có dùng AI thực không
    isRealAI() {
        return AI_CONFIG?.settings?.useRealAI === true;
    },

    // Lấy API key
    getAPIKey() {
        // Ưu tiên lấy từ localStorage (user tự nhập)
        const stored = localStorage.getItem('ai_api_key');
        if (stored) return stored;
        
        // Lấy từ config
        const provider = AI_CONFIG?.provider || 'gemini';
        if (provider === 'gemini') {
            return AI_CONFIG?.gemini?.apiKey;
        } else {
            return AI_CONFIG?.openai?.apiKey;
        }
    },

    // Kiểm tra API key có hợp lệ không
    hasValidAPIKey() {
        const apiKey = this.getAPIKey();
        return apiKey && apiKey.length > 10;
    },

    // Gọi AI API
    async chat(message, context = {}) {
        if (!this.isRealAI()) {
            throw new Error('Real AI is disabled. Set AI_CONFIG.settings.useRealAI = true');
        }

        if (!this.hasValidAPIKey()) {
            throw new Error('API key not configured');
        }

        const provider = AI_CONFIG?.provider || 'gemini';
        
        if (provider === 'gemini') {
            return await this.callGemini(message, context);
        } else {
            return await this.callOpenAI(message, context);
        }
    },

    // Google Gemini API
    async callGemini(message, context) {
        const apiKey = this.getAPIKey();
        const endpoint = `${AI_CONFIG.gemini.endpoint}?key=${apiKey}`;
        
        // Tạo prompt với context
        const systemPrompt = this.buildSystemPrompt(context);
        const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: AI_CONFIG.settings.temperature,
                        maxOutputTokens: AI_CONFIG.settings.maxTokens
                    }
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.candidates || data.candidates.length === 0) {
                throw new Error('No response from AI');
            }

            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    },

    // OpenAI ChatGPT API
    async callOpenAI(message, context) {
        const apiKey = this.getAPIKey();
        const endpoint = AI_CONFIG.openai.endpoint;
        
        const systemPrompt = this.buildSystemPrompt(context);
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: AI_CONFIG.openai.model,
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: AI_CONFIG.settings.temperature,
                    max_tokens: AI_CONFIG.settings.maxTokens
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.choices || data.choices.length === 0) {
                throw new Error('No response from AI');
            }

            return data.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw error;
        }
    },

    // Tạo system prompt với context từ hệ thống
    buildSystemPrompt(context) {
        const students = Database.getAllStudents();
        const teachers = Database.getAllTeachers();
        const avgGPA = (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2);
        const atRiskCount = students.filter(s => s.status === 'at-risk').length;
        const avgAttendance = (students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1);
        
        return `Bạn là AI Assistant của hệ thống quản lý giáo dục EduManager Pro.

THÔNG TIN HỆ THỐNG HIỆN TẠI:
- Tổng sinh viên: ${students.length}
- GPA trung bình: ${avgGPA}/4.0
- Tỷ lệ tham gia trung bình: ${avgAttendance}%
- Sinh viên có nguy cơ bỏ học: ${atRiskCount}
- Tổng giảng viên: ${teachers.length}
- Số lớp: ${Database.classes.length}

VAI TRÒ CỦA BẠN:
1. Phân tích dữ liệu giáo dục một cách chuyên sâu
2. Dự đoán xu hướng và rủi ro trong học tập
3. Đưa ra đề xuất cải thiện cụ thể và khả thi
4. Trả lời câu hỏi về quản lý giáo dục
5. Hỗ trợ ra quyết định dựa trên dữ liệu

NGUYÊN TẮC TRẢ LỜI:
- Trả lời bằng tiếng Việt
- Chuyên nghiệp, rõ ràng, dễ hiểu
- Dựa trên dữ liệu thực tế từ hệ thống
- Đưa ra số liệu cụ thể khi có thể
- Format câu trả lời dễ đọc (dùng bullet points, số liệu)

${context.additionalInfo || ''}`;
    },

    // Format response từ AI
    formatResponse(text) {
        // Convert markdown-like syntax to HTML
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n- /g, '<br>• ')
            .replace(/\n\d+\. /g, '<br>')
            .replace(/\n/g, '<br>');
        
        // Wrap in paragraph if not already
        if (!formatted.startsWith('<')) {
            formatted = '<p>' + formatted + '</p>';
        }
        
        return formatted;
    },

    // Test connection
    async testConnection() {
        try {
            const response = await this.chat('Xin chào, bạn có hoạt động không?');
            return {
                success: true,
                message: 'Kết nối AI thành công!',
                response: response
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                error: error
            };
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIService;
}
