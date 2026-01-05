// AI Configuration
// Để sử dụng AI thực, thay YOUR_API_KEY bằng API key thật

const AI_CONFIG = {
    // Chọn provider: 'gemini' (miễn phí) hoặc 'openai' (trả phí)
    provider: 'gemini',
    
    // Google Gemini (Khuyến nghị - Miễn phí)
    gemini: {
        apiKey: '', // Lấy tại: https://makersuite.google.com/app/apikey
        model: 'gemini-pro',
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
    },
    
    // OpenAI ChatGPT (Trả phí)
    openai: {
        apiKey: '', // Lấy tại: https://platform.openai.com/api-keys
        model: 'gpt-3.5-turbo',
        endpoint: 'https://api.openai.com/v1/chat/completions'
    },
    
    // Cấu hình chung
    settings: {
        temperature: 0.7,
        maxTokens: 1000,
        useRealAI: false // Set true để dùng AI thực, false để dùng AI giả lập
    }
};

// Export để dùng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AI_CONFIG;
}
