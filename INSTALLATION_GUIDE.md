# 🚀 Hướng dẫn Cài đặt - Final Fixes

## Bước 1: Backup (Quan trọng!)
```bash
# Copy các file cũ ra folder backup
mkdir backup
copy js\schedule.js backup\
copy js\teachers.js backup\
copy js\finance.js backup\
```

## Bước 2: Thay thế file
1. Mở file `js/schedule.js` → Xóa hết → Copy code từ `schedule-new.js`
2. Mở file `js/teachers.js` → Xóa hết → Copy code từ `teachers-fixed.js`  
3. Mở file `js/finance.js` → Xóa hết → Copy code từ `finance-area.js`

## Bước 3: Reset Database
1. Mở `reset-database.html` trong browser
2. Click "Xóa & Tạo lại Database"
3. Chờ redirect về index.html

## Bước 4: Test
1. Đăng nhập: admin/admin123
2. Test Schedule: Xem lịch, drag-drop môn học
3. Test Teachers: Không còn rating
4. Test Finance: Area chart + export

## Nếu có lỗi:
1. Mở Console (F12)
2. Xem error message
3. Check file đã copy đúng chưa

## Files được tạo:
- ✅ schedule-new.js (Schedule AI với drag-drop)
- ✅ teachers-fixed.js (Bỏ rating)
- ✅ finance-area.js (Area chart + export)
- ✅ INSTALLATION_GUIDE.md (File này)

Chúc may mắn! 🎉
