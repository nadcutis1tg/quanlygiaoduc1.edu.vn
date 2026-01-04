# Đóng góp cho EduManager Pro

Cảm ơn bạn đã quan tâm đến việc đóng góp cho EduManager Pro! 🎉

## 🤝 Cách đóng góp

### 1. Fork Repository
- Click nút "Fork" ở góc trên bên phải
- Clone fork về máy của bạn

```bash
git clone https://github.com/YOUR_USERNAME/quanlygiaoduc.edu.vn.git
cd quanlygiaoduc.edu.vn
```

### 2. Tạo Branch mới
```bash
git checkout -b feature/ten-tinh-nang-moi
```

Quy tắc đặt tên branch:
- `feature/` - Tính năng mới
- `bugfix/` - Sửa lỗi
- `hotfix/` - Sửa lỗi khẩn cấp
- `docs/` - Cập nhật documentation
- `refactor/` - Refactor code

### 3. Thực hiện thay đổi
- Viết code clean, dễ đọc
- Follow coding standards
- Thêm comments khi cần thiết
- Test kỹ trước khi commit

### 4. Commit changes
```bash
git add .
git commit -m "feat: thêm tính năng XYZ"
```

Quy tắc commit message:
- `feat:` - Tính năng mới
- `fix:` - Sửa lỗi
- `docs:` - Cập nhật docs
- `style:` - Format code
- `refactor:` - Refactor
- `test:` - Thêm tests
- `chore:` - Maintenance

### 5. Push và tạo Pull Request
```bash
git push origin feature/ten-tinh-nang-moi
```

Sau đó tạo Pull Request trên GitHub với:
- Tiêu đề rõ ràng
- Mô tả chi tiết thay đổi
- Screenshots (nếu có UI changes)
- Link đến issue (nếu có)

## 📋 Coding Standards

### HTML
- Sử dụng semantic HTML5
- Indent: 4 spaces
- Lowercase cho tags và attributes
- Always close tags

### CSS
- BEM naming convention
- Mobile-first approach
- Use CSS variables
- Organize by components

### JavaScript
- ES6+ syntax
- camelCase cho variables/functions
- PascalCase cho Classes
- Meaningful variable names
- Add JSDoc comments

### Ví dụ:
```javascript
/**
 * Calculate student GPA
 * @param {Array} grades - Array of grade objects
 * @returns {number} GPA value
 */
function calculateGPA(grades) {
    const total = grades.reduce((sum, grade) => sum + grade.value, 0);
    return (total / grades.length).toFixed(2);
}
```

## 🧪 Testing

Trước khi submit PR:
- [ ] Test trên Chrome, Firefox, Safari
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Kiểm tra console không có errors
- [ ] Test các tính năng liên quan
- [ ] Chạy linter (nếu có)

## 🐛 Báo cáo Bug

Khi báo cáo bug, vui lòng bao gồm:
1. **Mô tả bug**: Mô tả rõ ràng, ngắn gọn
2. **Các bước tái hiện**:
   - Bước 1
   - Bước 2
   - ...
3. **Kết quả mong đợi**: Điều gì nên xảy ra
4. **Kết quả thực tế**: Điều gì đã xảy ra
5. **Screenshots**: Nếu có
6. **Môi trường**:
   - OS: [e.g. Windows 11]
   - Browser: [e.g. Chrome 120]
   - Version: [e.g. 1.0.0]

## 💡 Đề xuất tính năng

Khi đề xuất tính năng mới:
1. **Mô tả tính năng**: Giải thích rõ ràng
2. **Use case**: Tại sao cần tính năng này?
3. **Giải pháp đề xuất**: Cách implement
4. **Alternatives**: Các phương án khác
5. **Mockups**: Nếu có UI changes

## 📝 Documentation

Khi thêm tính năng mới:
- Cập nhật README.md
- Thêm comments trong code
- Tạo/cập nhật API docs
- Thêm examples nếu cần

## ⚖️ Code of Conduct

### Cam kết của chúng tôi
- Tôn trọng mọi người
- Chấp nhận phản hồi mang tính xây dựng
- Tập trung vào điều tốt nhất cho cộng đồng
- Thể hiện sự đồng cảm với người khác

### Không chấp nhận
- Ngôn ngữ hoặc hình ảnh khiêu dâm
- Trolling, bình luận xúc phạm
- Quấy rối công khai hoặc riêng tư
- Công bố thông tin cá nhân của người khác

## 🎯 Ưu tiên

Chúng tôi đặc biệt hoan nghênh đóng góp cho:
- [ ] Tính năng AI mới
- [ ] Cải thiện performance
- [ ] Accessibility improvements
- [ ] Mobile experience
- [ ] Internationalization (i18n)
- [ ] Documentation
- [ ] Bug fixes

## 📞 Liên hệ

Nếu có câu hỏi:
- Tạo issue trên GitHub
- Email: support@edumanager.edu.vn
- Discord: [Link]

## 🙏 Cảm ơn

Cảm ơn tất cả contributors đã giúp EduManager Pro ngày càng tốt hơn!

### Top Contributors
- [Contributor 1]
- [Contributor 2]
- [Contributor 3]

---

Happy Coding! 🚀
