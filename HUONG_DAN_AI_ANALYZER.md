# 🤖 Hướng dẫn Sử dụng AI Student Analyzer

## 📖 Giới thiệu

AI Student Analyzer là công cụ phân tích toàn diện về học sinh, sử dụng AI để đưa ra đánh giá, dự đoán và đề xuất cải thiện.

---

## 🚀 Cách mở AI Analyzer

### Bước 1: Đăng nhập
```
Username: admin
Password: admin123
```

### Bước 2: Vào module Quản lý Học viên
- Click vào menu "Quản lý Học viên"
- Danh sách 90 học sinh sẽ hiển thị

### Bước 3: Mở AI Analyzer
- Click nút "Phân tích AI" (biểu tượng 🤖) trên bất kỳ học sinh nào
- Panel AI Analyzer sẽ mở ra

---

## 📊 14 Tabs chức năng

### 1. 📈 Overview (Tổng quan)
**Mục đích:** Xem tổng quan về học sinh và đánh giá nguy cơ

**Nội dung:**
- **Risk Assessment**: Đánh giá nguy cơ bỏ học (LOW/MEDIUM/HIGH)
- **Các yếu tố ảnh hưởng**: GPA, Attendance, Financial, Social, Behavioral
- **Academic Performance**: GPA, Điểm TB, Xu hướng, Điểm mạnh/yếu
- **Learning Style**: Visual/Auditory/Kinesthetic learner

**Actions:**
- Click "Tạo kế hoạch can thiệp" để tạo kế hoạch hỗ trợ

---

### 2. 📚 Academic (Học tập)
**Mục đích:** Phân tích chi tiết về học tập

**Nội dung:**
- **Bảng điểm chi tiết**: Tất cả 11 môn học với xu hướng
- **Dự báo AI**: GPA học kỳ tới, xác suất tốt nghiệp
- **Định hướng nghề nghiệp**: Ngành nghề phù hợp

**Actions:**
- Click biểu tượng ✏️ để chỉnh sửa điểm (UI ready)

---

### 3. 👤 Behavior (Hành vi)
**Mục đích:** Phân tích hành vi và điểm danh

**Nội dung:**
- **Điểm hành vi tổng thể**: Tích cực vs Tiêu cực
- **Lịch sử điểm danh**: 30 ngày gần nhất
- **Ghi chú hành vi**: Từ giáo viên
- **Cảnh báo**: Nếu có vấn đề

**Actions:**
- Click "Thêm ghi chú" để thêm ghi chú mới
- Click ✏️ để sửa ghi chú
- Click 🗑️ để xóa ghi chú

---

### 4. 👥 Social (Xã hội)
**Mục đích:** Phân tích mối quan hệ xã hội

**Nội dung:**
- **Số bạn bè**: Trong trường
- **Nhóm tham gia**: CLB, đội tuyển
- **Mức độ cô lập**: LOW/MEDIUM/HIGH
- **Mạng lưới quan hệ**: Biểu đồ (UI ready)

**Actions:**
- Click "Chuyển đến tư vấn viên" nếu có vấn đề tâm lý

---

### 5. 📜 Timeline (Lịch sử)
**Mục đích:** Xem toàn bộ lịch sử tiến trình

**Nội dung:**
- **Sự kiện học tập**: Từ behavior notes
- **Hoạt động xã hội**: Tham gia CLB, đội tuyển
- **Thành tích**: Giải thưởng, chứng nhận
- **Sức khỏe**: Khám định kỳ
- **Mục tiêu**: Hoàn thành mục tiêu

**Actions:**
- Click các nút filter để lọc theo loại:
  - Tất cả
  - 📚 Học tập
  - 👤 Hành vi
  - 🏆 Thành tích
  - 👥 Xã hội
- Click "Chi tiết" để xem thêm

---

### 6. ⚖️ Comparison (So sánh)
**Mục đích:** So sánh với trung bình lớp

**Nội dung:**
- **Xếp hạng trong lớp**: #1, #2, #3...
- **So sánh GPA**: Học sinh vs TB lớp vs Cao nhất
- **So sánh Attendance**: Tỷ lệ tham gia
- **So sánh từng môn**: Điểm của bạn vs TB lớp

**Dữ liệu:**
- ✅ Sử dụng dữ liệu thực từ Database
- ✅ Tính toán trung bình lớp thực tế
- ✅ Xếp hạng dựa trên GPA thực

---

### 7. 🎯 Goals (Mục tiêu)
**Mục đích:** Quản lý mục tiêu học tập

**Nội dung:**
- **Danh sách mục tiêu**: Tất cả mục tiêu của học sinh
- **Tiến độ**: Progress bar cho từng mục tiêu
- **Hạn chót**: Số ngày còn lại
- **Thống kê**: Tổng mục tiêu, Đã hoàn thành, Đang thực hiện

**Actions:**
- ✅ **Thêm mục tiêu mới**:
  1. Click "Thêm mục tiêu mới"
  2. Nhập tiêu đề
  3. Nhập hạn chót (YYYY-MM-DD)
  4. Chọn danh mục (academic/attendance/extracurricular/social/health)
  5. Chọn ưu tiên (high/medium/low)
  6. Mục tiêu được lưu vào Database

- ✅ **Cập nhật tiến độ**:
  1. Click "Cập nhật" trên mục tiêu
  2. Nhập tiến độ mới (0-100)
  3. Tiến độ được cập nhật

- ✅ **Hoàn thành mục tiêu**:
  1. Click "Hoàn thành"
  2. Mục tiêu được đánh dấu 100%

- ✅ **Xem chi tiết**:
  1. Click "Chi tiết"
  2. Xem thông tin đầy đủ

**Dữ liệu:**
- ✅ Lưu trong `student.goals`
- ✅ Persist qua LocalStorage
- ✅ CRUD đầy đủ

---

### 8. 💬 Communication (Giao tiếp)
**Mục đích:** Quản lý tin nhắn và giao tiếp

**Nội dung:**
- **Tin nhắn**: Từ giáo viên, phụ huynh
- **Thống kê**: Tổng tin nhắn, Đã đọc, Chưa đọc
- **Lịch họp**: Họp phụ huynh
- **Liên hệ nhanh**: Gọi, Email, SMS

**Actions:**
- Click "Soạn tin nhắn" để gửi tin mới
- Click vào tin nhắn để đọc
- Click "Đặt lịch" để đặt lịch họp
- Click "Gọi/Email/SMS" để liên hệ nhanh

**Dữ liệu:**
- ✅ Sử dụng `Database.getMessages()`
- ✅ Mock messages từ giáo viên

---

### 9. ❤️ Health (Sức khỏe)
**Mục đích:** Theo dõi sức khỏe và wellness

**Nội dung:**
- **Sức khỏe thể chất**: Điểm/100, Trạng thái
- **Sức khỏe tinh thần**: Điểm/100, Mối quan tâm
- **Giấc ngủ**: Trung bình giờ/đêm, Chất lượng
- **Vận động**: Tần suất/tuần, Hoạt động
- **Lịch sử khám**: Khám định kỳ

**Actions:**
- Click "Đặt lịch tư vấn" nếu có vấn đề tâm lý
- Click "Xem chi tiết" để xem kết quả khám

**Dữ liệu:**
- ✅ Sử dụng `student.healthData`
- ✅ Physical, Mental, Sleep, Exercise

---

### 10. 🏆 Extracurricular (Ngoại khóa)
**Mục đích:** Quản lý hoạt động ngoại khóa

**Nội dung:**
- **Danh sách hoạt động**: CLB, đội tuyển, tình nguyện
- **Thống kê**: Tổng hoạt động, Tổng giờ, Thành tích
- **Chi tiết**: Vai trò, Ngày tham gia, Số giờ, Thành tích

**Actions:**
- ✅ **Thêm hoạt động mới**:
  1. Click "Thêm hoạt động"
  2. Nhập tên hoạt động
  3. Nhập vai trò
  4. Hoạt động được lưu vào Database

- ✅ **Cập nhật số giờ**:
  1. Click biểu tượng ✏️
  2. Nhập số giờ mới
  3. Số giờ được cập nhật

- ✅ **Xem chi tiết**:
  1. Click biểu tượng 👁️
  2. Xem thông tin đầy đủ

**Dữ liệu:**
- ✅ Lưu trong `student.activities`
- ✅ Persist qua LocalStorage
- ✅ CRUD đầy đủ

---

### 11. 🤖 AI Chat
**Mục đích:** Trò chuyện với AI về học sinh

**Nội dung:**
- **AI Assistant**: Trả lời câu hỏi về học sinh
- **Quick Questions**: Câu hỏi nhanh
- **Chat History**: Lịch sử trò chuyện

**Actions:**
- Click các nút Quick Question:
  - 💪 Điểm mạnh là gì?
  - 📈 Cần cải thiện gì?
  - 🔮 Dự đoán học kỳ tới
  - 📊 So với lớp thế nào?
- Hoặc nhập câu hỏi tự do

**Ví dụ câu hỏi:**
- "Phân tích điểm mạnh của học sinh"
- "Học sinh cần cải thiện gì?"
- "Dự đoán kết quả học kỳ tới"
- "So sánh với trung bình lớp"

---

### 12. 💡 Recommendations (Đề xuất)
**Mục đích:** Xem đề xuất từ AI

**Nội dung:**
- **Đề xuất học tập**: Nếu GPA thấp
- **Đề xuất tham gia**: Nếu attendance thấp
- **Đề xuất xã hội**: Nếu có dấu hiệu cô lập
- **Hành động cụ thể**: Checklist các bước

**Actions:**
- Click "Thực hiện" để bắt đầu thực hiện đề xuất
- Click "Tùy chỉnh" để chỉnh sửa đề xuất
- Click "Tạo Kế hoạch Toàn diện" để tạo kế hoạch chi tiết

---

### 13. 📤 Export (Xuất báo cáo)
**Mục đích:** Xuất báo cáo phân tích

**Nội dung:**
- **Báo cáo Tổng quan**: PDF/Word
- **Báo cáo Học tập**: PDF/Excel
- **Báo cáo Hành vi**: PDF
- **Báo cáo Đề xuất AI**: PDF
- **Báo cáo Toàn diện**: PDF

**Actions:**
- Click "Xuất PDF" hoặc "Xuất Word/Excel"
- Click "Email cho phụ huynh"
- Click "In báo cáo"
- Click "Tạo link chia sẻ"

**Lịch sử:**
- Xem các báo cáo đã xuất trước đó
- Click 📥 để tải lại

---

### 14. ✏️ Edit (Chỉnh sửa)
**Mục đích:** Chỉnh sửa thông tin học sinh

**Nội dung:**
- **Thông tin cá nhân**: Tên, Email, SĐT, Ngày sinh, Lớp
- **Thông tin phụ huynh**: Tên, SĐT
- **Thông tin học tập**: GPA, Attendance, Credits

**Actions:**
- Chỉnh sửa các trường
- Click "Lưu thay đổi"
- Click "Hủy" để đóng

---

## 💾 Data Persistence

### LocalStorage
Tất cả dữ liệu được lưu trong LocalStorage:
```javascript
{
    "edumanager_students": [...],  // 90 students
    "edumanager_teachers": [...],  // 11 teachers
    "edumanager_schedules": [...], // Schedules
    "edumanager_finances": [...]   // Finances
}
```

### Khi nào dữ liệu được lưu?
- ✅ Thêm mục tiêu mới → Lưu ngay
- ✅ Cập nhật tiến độ → Lưu ngay
- ✅ Thêm hoạt động → Lưu ngay
- ✅ Cập nhật số giờ → Lưu ngay
- ✅ Chỉnh sửa thông tin → Lưu ngay

### Refresh trang
- ✅ Dữ liệu vẫn còn (load từ LocalStorage)
- ✅ Nếu LocalStorage trống → Tự động khởi tạo 90 sinh viên

---

## 🎨 UI/UX Features

### Animations
- ✅ Fade in khi mở panel
- ✅ Slide up cho cards
- ✅ Smooth transitions

### Notifications
- ✅ Toast notifications cho mọi action
- ✅ Success/Error/Info states
- ✅ Auto-dismiss sau 3 giây

### Loading States
- ✅ Loading spinner khi tạo báo cáo
- ✅ Loading overlay khi xử lý

### Responsive
- ✅ Desktop: Full width
- ✅ Tablet: Adjusted layout
- ✅ Mobile: Stack layout

---

## 🔧 Troubleshooting

### Vấn đề: Panel không mở
**Giải pháp:**
1. Kiểm tra console (F12)
2. Đảm bảo đã load đủ JS files
3. Refresh trang

### Vấn đề: Dữ liệu không lưu
**Giải pháp:**
1. Kiểm tra LocalStorage có bị disable không
2. Xóa LocalStorage và refresh
3. Kiểm tra console có lỗi không

### Vấn đề: Không thấy dữ liệu
**Giải pháp:**
1. Mở Console (F12)
2. Chạy: `Database.init()`
3. Chạy: `Database.saveToLocalStorage()`
4. Refresh trang

---

## 📞 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra file `TEST_AI_ANALYZER.md`
2. Xem file `CHANGELOG_AI_INTEGRATION.md`
3. Đọc file `PROJECT_SUMMARY.md`

---

## 🎯 Tips & Tricks

### Tip 1: Xem nhiều học sinh
- Mở AI Analyzer cho học sinh A
- Đóng lại
- Mở cho học sinh B
- So sánh kết quả

### Tip 2: Theo dõi tiến độ
- Thêm mục tiêu cho học sinh
- Cập nhật tiến độ hàng tuần
- Xem Timeline để thấy sự thay đổi

### Tip 3: Xuất báo cáo định kỳ
- Mỗi tháng xuất báo cáo Tổng quan
- Gửi email cho phụ huynh
- Lưu vào hồ sơ học sinh

### Tip 4: Sử dụng AI Chat
- Hỏi AI về xu hướng học tập
- Nhận đề xuất cải thiện
- Dự đoán kết quả

---

**Chúc bạn sử dụng hiệu quả! 🚀**
