# 🚨 URGENT FIXES - TODO List

## Đã làm xong:
- ✅ Teachers: 105 giảng viên với môn đại học

## Đang làm:
- 🔄 Teachers: Bỏ phần đánh giá sao (performance/rating)
- 🔄 Schedule: Thêm dữ liệu đầy đủ
- 🔄 Finance: Biểu đồ miền (area chart) + export
- 🔄 Bỏ tính năng điểm danh/đánh giá
- 🔄 Bỏ báo cáo/phân tích taskboard
- 🔄 Thêm Lớp học online
- 🔄 Fix AI không hoạt động

## Chi tiết:

### 1. Teachers (js/teachers.js)
**Cần bỏ:**
- Dòng 50-52: Đánh giá TB trong stats
- Dòng 125-129: Rating column trong table
- Dòng 262: Đánh giá trong detail modal
- Dòng 351: performance field

**Cần giữ:**
- Môn dạy, Khoa, Học vị, Kinh nghiệm, Lớp phụ trách

### 2. Schedule (js/schedule.js)
**Hiện tại:** Trống trơn
**Cần:** Hiển thị lịch từ Database.schedules

### 3. Finance (js/finance.js)
**Cần:**
- Đổi bar chart → area chart
- Thêm export Excel/PDF

### 4. Dashboard (js/dashboard.js)
**Cần bỏ:**
- Tính năng điểm danh
- Tính năng đánh giá
- Báo cáo và phân tích trên taskboard

### 5. Online Classes
**Cần thêm:** Module mới hoàn toàn

### 6. AI
**Cần check:** Console errors

---

## Ưu tiên:
1. Teachers - Bỏ rating (NHANH)
2. Schedule - Hiển thị data (NHANH)
3. Finance - Area chart (TRUNG BÌNH)
4. AI - Fix lỗi (KHẨN CẤP)
5. Online Classes - Module mới (LÂU)
