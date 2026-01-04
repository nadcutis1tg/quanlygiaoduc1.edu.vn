# Hướng dẫn Setup OAuth cho EduManager Pro

## 🔐 Tổng quan
Để tích hợp đăng nhập Google và Apple thực sự, bạn cần:
1. Tạo OAuth credentials trên Google Cloud Console
2. Tạo Apple Sign In trên Apple Developer
3. Cập nhật code với credentials thực

---

## 📱 1. Setup Google Sign-In

### Bước 1: Tạo Google Cloud Project
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Enable **Google+ API**

### Bước 2: Tạo OAuth 2.0 Credentials
1. Vào **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Chọn **Web application**
4. Thêm **Authorized JavaScript origins**:
   - `http://localhost` (cho development)
   - `https://yourdomain.com` (cho production)
5. Thêm **Authorized redirect URIs**:
   - `http://localhost/callback`
   - `https://yourdomain.com/callback`
6. Lưu lại **Client ID**

### Bước 3: Cập nhật Code

Thêm vào `index.html` (đã thêm rồi):
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

Cập nhật `js/auth.js`:
```javascript
// Thay thế YOUR_GOOGLE_CLIENT_ID bằng Client ID thực
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// Khởi tạo Google Sign-In
function initGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback
    });
}

// Xử lý callback từ Google
function handleGoogleCallback(response) {
    // Decode JWT token
    const userObject = parseJwt(response.credential);
    
    const googleUser = {
        email: userObject.email,
        name: userObject.name,
        avatar: userObject.picture,
        provider: 'google',
        googleId: userObject.sub
    };

    // Lưu thông tin user
    localStorage.setItem('authToken', response.credential);
    localStorage.setItem('user', JSON.stringify(googleUser));
    App.currentUser = googleUser;
    App.showDashboard();
}

// Parse JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Cập nhật hàm loginWithGoogle
async function loginWithGoogle() {
    google.accounts.id.prompt(); // Hiển thị popup Google Sign-In
}
```

---

## 🍎 2. Setup Apple Sign-In

### Bước 1: Tạo Apple Developer Account
1. Đăng ký [Apple Developer Program](https://developer.apple.com/programs/) ($99/năm)
2. Truy cập [Apple Developer Console](https://developer.apple.com/account/)

### Bước 2: Tạo Service ID
1. Vào **Certificates, Identifiers & Profiles**
2. Click **Identifiers** → **+** (Add)
3. Chọn **Services IDs** → Continue
4. Nhập:
   - Description: `EduManager Pro`
   - Identifier: `com.edumanager.signin`
5. Enable **Sign In with Apple**
6. Configure:
   - Primary App ID: Chọn app ID của bạn
   - Domains: `yourdomain.com`
   - Return URLs: `https://yourdomain.com/callback`

### Bước 3: Tạo Private Key
1. Vào **Keys** → **+** (Add)
2. Nhập Key Name: `EduManager Apple Sign In Key`
3. Enable **Sign In with Apple**
4. Configure → Chọn Primary App ID
5. Download file `.p8` (chỉ download được 1 lần!)
6. Lưu lại **Key ID** và **Team ID**

### Bước 4: Cập nhật Code

Thêm Apple Sign-In script vào `index.html`:
```html
<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
```

Cập nhật `js/auth.js`:
```javascript
// Khởi tạo Apple Sign-In
function initAppleSignIn() {
    AppleID.auth.init({
        clientId: 'com.edumanager.signin', // Service ID của bạn
        scope: 'name email',
        redirectURI: 'https://yourdomain.com/callback',
        usePopup: true
    });
}

// Xử lý Apple Sign-In
async function loginWithApple() {
    try {
        const data = await AppleID.auth.signIn();
        
        const appleUser = {
            email: data.user?.email || 'user@privaterelay.appleid.com',
            name: data.user?.name?.firstName + ' ' + data.user?.name?.lastName || 'Apple User',
            avatar: 'https://via.placeholder.com/150',
            provider: 'apple',
            appleId: data.user
        };

        // Lưu thông tin user
        localStorage.setItem('authToken', data.authorization.id_token);
        localStorage.setItem('user', JSON.stringify(appleUser));
        App.currentUser = appleUser;
        App.showDashboard();
    } catch (error) {
        console.error('Apple Sign-In Error:', error);
        alert('Đăng nhập Apple thất bại: ' + error.message);
    }
}
```

---

## 🚀 3. Khởi tạo OAuth khi load trang

Thêm vào cuối `js/auth.js`:
```javascript
// Khởi tạo OAuth khi trang load
window.addEventListener('load', () => {
    if (typeof google !== 'undefined') {
        initGoogleSignIn();
    }
    if (typeof AppleID !== 'undefined') {
        initAppleSignIn();
    }
});
```

---

## 🔒 4. Bảo mật

### Backend API (Khuyến nghị)
Để bảo mật tốt hơn, bạn nên:
1. Tạo backend API (Node.js, Python, PHP...)
2. Verify token từ Google/Apple ở backend
3. Tạo session token riêng cho app
4. Lưu user vào database

### Ví dụ Backend (Node.js + Express):
```javascript
const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Verify Google token
app.post('/auth/google', async (req, res) => {
    const { token } = req.body;
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const userId = payload['sub'];
        
        // Lưu user vào database
        // Tạo session token
        
        res.json({ success: true, user: payload });
    } catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
});
```

---

## 📝 5. Testing

### Test Google Sign-In:
1. Mở app trên localhost hoặc domain đã đăng ký
2. Click "Đăng nhập bằng Google"
3. Chọn tài khoản Google
4. Cho phép quyền truy cập
5. Kiểm tra console để xem thông tin user

### Test Apple Sign-In:
1. Chỉ hoạt động trên HTTPS (không hoạt động trên localhost)
2. Deploy lên server có SSL
3. Click "Đăng nhập bằng Apple"
4. Đăng nhập bằng Apple ID
5. Kiểm tra thông tin user

---

## ⚠️ Lưu ý quan trọng

1. **Google Sign-In**:
   - Hoạt động trên localhost
   - Cần domain được verify cho production
   - Token có thời hạn 1 giờ

2. **Apple Sign-In**:
   - Chỉ hoạt động trên HTTPS
   - Không hoạt động trên localhost
   - Cần Apple Developer Account ($99/năm)
   - Email có thể bị ẩn (Private Relay)

3. **Bảo mật**:
   - Không lưu token trực tiếp trên client
   - Luôn verify token ở backend
   - Sử dụng HTTPS cho production
   - Implement CSRF protection

---

## 🎯 Hiện tại

Code hiện tại đang dùng **mock data** để demo. Để sử dụng OAuth thực:
1. Follow các bước trên để setup credentials
2. Thay thế code mock bằng code thực
3. Test trên môi trường phù hợp

---

## 📚 Tài liệu tham khảo

- [Google Sign-In Documentation](https://developers.google.com/identity/gsi/web/guides/overview)
- [Apple Sign-In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [OAuth 2.0 Specification](https://oauth.net/2/)
