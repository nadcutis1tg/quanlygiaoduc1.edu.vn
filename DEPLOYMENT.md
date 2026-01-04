# Hướng dẫn Triển khai EduManager Pro lên GitHub Pages

## 📋 Yêu cầu

- Tài khoản GitHub
- Git đã cài đặt trên máy
- Node.js (tùy chọn, cho development)

## 🚀 Các bước triển khai

### Bước 1: Tạo Repository trên GitHub

1. Đăng nhập vào GitHub
2. Tạo repository mới với tên: `quanlygiaoduc.edu.vn`
3. Để repository ở chế độ Public
4. Không cần tạo README, .gitignore (đã có sẵn)

### Bước 2: Clone và Push code

```bash
# Clone repository (nếu chưa có)
git clone https://github.com/nadcutis1tg/quanlygiaoduc.edu.vn.git
cd quanlygiaoduc.edu.vn

# Hoặc nếu đã có code, init git
git init
git add .
git commit -m "Initial commit: EduManager Pro v1.0"

# Thêm remote
git remote add origin https://github.com/nadcutis1tg/quanlygiaoduc.edu.vn.git

# Push code
git branch -M main
git push -u origin main
```

### Bước 3: Cấu hình GitHub Pages

1. Vào repository trên GitHub
2. Click vào **Settings**
3. Scroll xuống phần **Pages** (bên trái)
4. Trong **Source**, chọn:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Bước 4: Đợi Deploy

- GitHub sẽ tự động deploy
- Quá trình mất khoảng 1-2 phút
- Kiểm tra tab **Actions** để xem tiến trình

### Bước 5: Truy cập Website

Website sẽ có địa chỉ:
```
https://nadcutis1tg.github.io/quanlygiaoduc.edu.vn/
```

## 🔧 Cấu hình Custom Domain (Tùy chọn)

Nếu bạn muốn sử dụng domain riêng:

### 1. Mua domain
- Mua domain từ nhà cung cấp (GoDaddy, Namecheap, etc.)

### 2. Cấu hình DNS
Thêm các DNS records sau:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: nadcutis1tg.github.io
```

### 3. Cấu hình GitHub Pages
1. Vào Settings > Pages
2. Trong **Custom domain**, nhập domain của bạn
3. Check **Enforce HTTPS**
4. Click **Save**

### 4. Tạo file CNAME
Tạo file `CNAME` trong root directory:
```
quanlygiaoduc.edu.vn
```

## 🔄 Cập nhật Website

Mỗi khi có thay đổi:

```bash
# Thêm file thay đổi
git add .

# Commit
git commit -m "Mô tả thay đổi"

# Push
git push origin main
```

GitHub Actions sẽ tự động deploy lại.

## 🐛 Xử lý Lỗi

### Lỗi 404 Not Found
- Kiểm tra file `index.html` có ở root directory
- Kiểm tra branch và folder trong Settings > Pages

### Lỗi CSS/JS không load
- Kiểm tra đường dẫn file (phải relative path)
- Xóa cache browser (Ctrl + Shift + R)

### Lỗi CORS
- GitHub Pages tự động xử lý CORS
- Nếu gọi API external, cần cấu hình CORS ở server API

## 📊 Monitoring

### Xem Logs
1. Vào tab **Actions**
2. Click vào workflow run mới nhất
3. Xem logs chi tiết

### Analytics
Tích hợp Google Analytics:

```html
<!-- Thêm vào <head> của index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Bảo mật

### HTTPS
- GitHub Pages tự động cung cấp HTTPS
- Luôn enforce HTTPS trong Settings

### Environment Variables
- Không commit file `.env`
- Sử dụng GitHub Secrets cho sensitive data
- Trong Settings > Secrets and variables > Actions

### API Keys
- Không hardcode API keys trong code
- Sử dụng environment variables
- Hoặc sử dụng backend proxy

## 🚀 Tối ưu Performance

### 1. Minify CSS/JS
```bash
npm install -g minify
minify css/style.css > css/style.min.css
```

### 2. Optimize Images
- Sử dụng WebP format
- Compress images trước khi upload
- Lazy loading cho images

### 3. Enable Caching
Tạo file `.htaccess` (nếu dùng custom server):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 📱 Testing

### Local Testing
```bash
# Sử dụng live-server
npm install -g live-server
live-server --port=3000

# Hoặc Python
python -m http.server 3000
```

### Cross-browser Testing
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

### Responsive Testing
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🔄 CI/CD Pipeline

GitHub Actions đã được cấu hình tự động:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
      - uses: actions/deploy-pages@v4
```

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. Xem logs trong Actions tab
3. Liên hệ support team

## ✅ Checklist Triển khai

- [ ] Code đã được test local
- [ ] Tất cả file đã được commit
- [ ] Repository đã được tạo trên GitHub
- [ ] Code đã được push lên GitHub
- [ ] GitHub Pages đã được enable
- [ ] Website đã accessible
- [ ] HTTPS đã được enable
- [ ] Custom domain đã được cấu hình (nếu có)
- [ ] Analytics đã được tích hợp
- [ ] Performance đã được tối ưu

## 🎉 Hoàn thành!

Website của bạn đã sẵn sàng tại:
**https://nadcutis1tg.github.io/quanlygiaoduc.edu.vn/**

---

Made with ❤️ by EduManager Team
