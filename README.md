# 💗 SUPER DATE — LEVEL 20/10: PIXEL ADVENTURE INVITATION

> *“Một cuộc hẹn nhỏ, một nhiệm vụ đặc biệt.”*

Website thiệp mời hẹn hò ngày 20/10 tương tác theo phong cách game platformer 2D retro pixel art 16-bit (lấy cảm hứng từ thể loại phiêu lưu kinh điển), được xây dựng 100% bằng **HTML5, CSS3, JavaScript thuần, Canvas API** và tích hợp **EmailJS** gửi trực tiếp phản hồi về Gmail.

---

## 🎮 CÁC TÍNH NĂNG CHÍNH

1. **Màn hình Start Game Retro**:
   - Tiêu đề nhấp nháy, âm nhạc / hiệu ứng âm thanh 8-bit tổng hợp bằng Web Audio API không dính bản quyền âm nhạc.
   - Nút bật/tắt âm thanh, nút tiếp tục hành trình nếu đang dở phiên chơi.
   - Màn xuất hiện nhân vật rơi từ trên mây xuống kèm hiệu ứng bụi và tim.
2. **Platformer 2D nguyên bản**:
   - Đồ họa pixel tự vẽ hoàn toàn bằng Canvas API (mây trôi, đồi thoai thoải, cây cỏ, bậc gạch, ống nước, bục mây, hộp quà bí mật nhả tiền xu và tim).
   - Di chuyển mượt mà, nhảy, đụng đầu vào hộp quà, không lo rơi khỏi bản đồ (có sàn đất liền và cơ chế lưới an toàn).
   - Điều khiển linh hoạt: Bàn phím máy tính (`A/D/Mũi tên/Space/E/Enter`) và nút cảm ứng ảo trên màn hình điện thoại (hỗ trợ chạm đa điểm – vừa giữ phím đi vừa bấm nhảy).
3. **World 1 — The Compliments (Những điều ngọt ngào)**:
   - Công chúa vượt qua các chướng ngại vật nhẹ nhàng, nhảy lên đụng đầu vào các hộp quà bí mật `?`.
   - Mỗi hộp quà mở ra kèm pháo hoa trái tim và hiển thị một điều bạn yêu thích ở cô ấy (`SWEET_MESSAGES`).
4. **World 2 — The Secret Quest (Thử thách bí mật & Lên lịch trình)**:
   - Màn chơi thử thách kịch tính với địa hình platform và các **chú rùa xanh đi tuần tra**.
   - Cơ chế đối phó: Nhảy đạp lên đầu rùa để rùa thụt vào mai hoặc đá mai rùa trượt đi. Nếu va chạm ngang chỉ bị nảy lùi lại nhẹ (không bị Game Over ức chế).
   - **Rương 1 (Giữa màn)**: Chạm vào mở ra Card thông tin **Nơi anh sẽ đưa nàng đi** (`SECRET_DESTINATION`, ảnh thật độ nét cao, cuộn xem trơn tru từ đầu đến chân). Bấm nút tiếp tục để phiêu lưu tiếp nửa chặng còn lại!
   - **Rương 2 (Cuối màn)**: Mở ra giao diện **Lịch trình chi tiết** (`DEFAULT_ITINERARY`) cho phép nàng tự do đổi giờ, sắp xếp lại hoạt động bằng ▲ ▼ hoặc ghi chú thêm.
5. **World 3 — The Sunset Date (Hội ngộ hoàng hôn & Vé hẹn hò)**:
   - Khung cảnh ráng chiều hoàng hôn tím hồng lãng mạn, chàng trai đứng chờ ở đồi cỏ.
   - Khi công chúa tiến tới gần: kích hoạt **Cutscene ôm nhau** độc quyền (`SPR.hug`), trái tim bay ngập trời và nhạc chiến thắng vang lên.
   - Ngay sau đó xuất hiện **Vé Hẹn Hò Điện Tử (Boarding Pass)** tích hợp: Nàng điền Tên, món ăn yêu thích, lời nhắn (tự động cập nhật trực tiếp lên tấm vé) và bấm **GỬI CÂU TRẢ LỜI CHO ANH 💌** về Gmail qua EmailJS!
6. **Bảo mật & Tôn trọng quyền riêng tư**:
   - Không lưu thông tin cá nhân trên máy.
   - Không để lộ Private Key ở Frontend. Gửi thông tin trực tiếp về Gmail qua EmailJS.

---

## 📂 CẤU TRÚC THƯ MỤC

```text
20_10/
├── index.html               # Giao diện chính (HUD, Canvas, Modals, Forms, Ticket)
├── style.css                # Toàn bộ CSS phong cách Pixel 16-bit, nút arcade, responsive
├── script.js                # Game Engine Canvas, Quản lý State, Cấu hình LOCATIONS & EmailJS
├── README.md                # Tài liệu hướng dẫn sử dụng và triển khai
└── assets/
    ├── player/              # Tài nguyên nhân vật
    ├── tiles/               # Gạch, đất, bục mây
    ├── backgrounds/         # Mây, núi đồi
    ├── locations/           # Nơi lưu ảnh thực tế của địa điểm (jpg, png, webp)
    │   └── README.md
    ├── icons/               # Biểu tượng pixel
    └── sounds/              # Âm thanh hiệu ứng
```

---

## 📖 HƯỚNG DẪN CHI TIẾT

### 1. Chạy Website Bằng VS Code Live Server
1. Mở thư mục dự án `20_10` bằng **Visual Studio Code**.
2. Cài đặt tiện ích mở rộng **Live Server** (của tác giả *Ritwick Dey*) nếu chưa có.
3. Nhấp chuột phải vào file `index.html` và chọn **Open with Live Server** (hoặc bấm nút *Go Live* ở góc dưới cùng bên phải màn hình VS Code).
4. Website sẽ tự động mở trên trình duyệt tại địa chỉ `http://127.0.0.1:5500/index.html`.

---

### 2. Thêm Ảnh Địa Điểm
1. Chuẩn bị ảnh chụp thực tế hoặc ảnh sưu tầm của các địa điểm hẹn hò (quán cafe, nhà hàng, bờ hồ, rạp phim...).
2. Lưu các file ảnh vào thư mục `assets/locations/`.
3. Đặt tên file đơn giản, không dấu, ví dụ:
   - `cafe-01.jpg`
   - `restaurant-01.jpg`
   - `movie-01.jpg`
   - `park-01.jpg`
   - `ho-tay.webp`
4. *Lưu ý*: Tỉ lệ ảnh ngang (16:9 hoặc 4:3) sẽ hiển thị đẹp nhất. Nếu ảnh bị lỗi đường dẫn hoặc bạn chưa kịp đưa ảnh vào, website sẽ **tự động hiện khung Pixel Art đại diện** có màu sắc và biểu tượng tương ứng với địa điểm đó.

---

### 3. Tùy Chỉnh Thông Điệp Ngọt Ngào (`SWEET_MESSAGES`) — Màn 1
Mở đầu file [script.js](file:///c:/Users/20_10/script.js#L42-L48). Bạn sẽ thấy mảng `SWEET_MESSAGES`:
```javascript
const SWEET_MESSAGES = [
  "Nụ cười toả nắng của em có thể làm sáng bừng cả ngày của anh ☀️",
  "Cách em cười tít mắt và hớn hở mỗi khi được ăn món ngon yêu thích 🍰",
  "Đôi mắt long lanh và những câu chuyện líu lo mỗi ngày của em ✨",
  "Sự dịu dàng, chu đáo và luôn biết lắng nghe mà em dành cho anh 💗",
  "Em luôn là chính mình – cô gái đáng yêu và đặc biệt nhất quả đất! 👑"
];
```
> *Mỗi khi công chúa nhảy lên húc đầu vào các khối hộp quà '?' trong Màn 1, từng điều trên sẽ bung nở kèm pháo hoa trái tim!*

---

### 4. Tùy Chỉnh Địa Điểm Bí Mật Cố Định (`SECRET_DESTINATION`) — Rương Giữa Màn 2
Tại dòng 57 của [script.js](file:///c:/Users/20_10/script.js#L57-L65):
```javascript
const SECRET_DESTINATION = {
  name: "Nhà Hàng & Cafe Hoàng Hôn",
  image: "assets/locations/cafe-01.jpg", // Đổi tên ảnh trong assets/locations/ hoặc dán link https://
  address: "Tầng thượng ngắm trọn thành phố",
  description: "Không gian lung linh ánh nến, có view hoàng hôn tuyệt đẹp và giai điệu acoustic êm dịu.",
  whyThisPlace: "Vì anh nhớ em từng bảo rất thích ngắm hoàng hôn và muốn có một bữa tối thật lãng mạn cùng anh.",
  price: "Anh đã lo hết mọi thứ rồi nhé!",
  note: "Anh đã bí mật đặt trước chiếc bàn có tầm nhìn đẹp nhất cho hai đứa mình tối 20/10."
};
```
> *Địa điểm này sẽ được mở ra khi nàng vượt qua nửa chặng đường Màn 2 và chạm vào Chiếc Rương Báu Thứ 1. Ảnh hiển thị sắc nét tự nhiên, cuộn mượt mà từ trên xuống dưới.*

---

### 5. Tùy Chỉnh Lịch Trình Mặc Định (`DEFAULT_ITINERARY`) — Rương Cuối Màn 2
Tại dòng 73 của [script.js](file:///c:/Users/20_10/script.js#L73-L87):
```javascript
const DEFAULT_ITINERARY = {
  date: "",                     // "YYYY-MM-DD". Để trống = tự động lấy ngày 20/10
  pickupTime: "17:30",
  pickupPlace: "Trước cổng nhà em",
  dinnerTime: "19:00",
  endTime: "22:00",
  activities: [
    { id: "act-1", time: "17:30", title: "Anh qua đón công chúa đi chơi", note: "Em chỉ cần chuẩn bị thật xinh!" },
    { id: "act-2", time: "18:00", title: "Cà phê đón hoàng hôn & trò chuyện", note: "Ngắm thành phố lúc chiều tà" },
    { id: "act-3", time: "19:00", title: "Bữa tối lãng mạn ngày 20/10", note: "Thưởng thức các món ngon em thích" },
    { id: "act-4", time: "20:30", title: "Đi dạo phố gió mát & ngắm cảnh đêm", note: "Nắm tay dạo quanh hồ" },
    { id: "act-5", time: "22:00", title: "Đưa em về đến tận cửa an toàn", note: "Trao món quà bí mật cuối ngày 🎁" }
  ],
  notes: "Nhớ mang theo áo khoác mỏng nhé, tối trời có thể se lạnh."
};
```
> *Khi công chúa chạm vào Chiếc Rương Báu Thứ 2 ở cuối Màn 2, giao diện Lịch trình sẽ mở ra. Nàng có thể duyệt toàn bộ và được phép chỉnh sửa giờ giấc, đổi thứ tự hoạt động hoặc thêm ghi chú nếu muốn.*

---

### 6. Cấu Hình EmailJS Để Nhận Thông Báo Về Gmail
Dịch vụ [EmailJS](https://www.emailjs.com/) cho phép gửi email trực tiếp từ JavaScript mà không cần backend hay server riêng (gói miễn phí 200 email/tháng, rất dư dả).

1. **Đăng ký tài khoản EmailJS**:
   - Truy cập [emailjs.com](https://www.emailjs.com/) và bấm *Sign Up*.
2. **Thêm Email Service (Gmail)**:
   - Vào menu **Email Services** -> Bấm **Add New Service** -> Chọn **Gmail**.
   - Bấm **Connect Account** để liên kết với tài khoản Gmail bạn muốn nhận thư.
   - Sao chép mã **Service ID** (ví dụ: `service_abc123`).
3. **Tạo Email Template**:
   - Vào menu **Email Templates** -> Bấm **Create New Template**.
   - Mục **Subject**: `[SUPER DATE 20/10] Phản hồi từ {{guest_name}} 💗 ({{confirmation_status}})`
   - Mục **Content**: Bạn dán nội dung mẫu sau vào:
   ```html
   <h2>💗 SUPER DATE 20/10 — CÂU TRẢ LỜI CỦA EM</h2>
   <p><b>Người gửi:</b> {{guest_name}}</p>
   <p><b>Trạng thái:</b> {{confirmation_status}}</p>
   <p><b>Email:</b> {{guest_email}} | <b>SĐT:</b> {{guest_phone}}</p>
   <p><b>Phương án chuẩn bị:</b> {{planning_mode}}</p>
   <hr/>
   <h3>📍 ĐỊA ĐIỂM ĐÃ CHỌN</h3>
   <p><b>Điểm chính:</b> {{main_location}}</p>
   <pre>{{selected_locations}}</pre>
   <hr/>
   <h3>🗓 LỊCH TRÌNH CHI TIẾT</h3>
   <pre>{{schedule}}</pre>
   <hr/>
   <h3>💌 LỜI NHẮN & SỞ THÍCH</h3>
   <p><b>Món yêu thích:</b> {{favorite_food}}</p>
   <p><b>Lưu ý/Dị ứng:</b> {{preferences}}</p>
   <p><b>Lời nhắn gửi anh:</b> {{message}}</p>
   <p><i>Gửi lúc: {{sent_at}} | Xu nhặt được: {{coins}} | Tim nhặt được: {{hearts}}</i></p>
   ```
   - Bấm **Save** và sao chép mã **Template ID** (ví dụ: `template_xyz789`).
4. **Lấy Public Key**:
   - Vào mục **Account** (biểu tượng hình người) -> Tab **General** -> Tìm mục **Public Key** (ví dụ: `pK_1a2b3c4d...`).
5. **Cập nhật vào `script.js`**:
   - Mở file `script.js` (khoảng dòng 90) và điền 3 thông số này vào:
   ```javascript
   const EMAILJS_PUBLIC_KEY = "pK_1a2b3c4d...";
   const EMAILJS_SERVICE_ID = "service_abc123";
   const EMAILJS_TEMPLATE_ID = "template_xyz789";
   ```

*Lưu ý an toàn*: Chỉ dùng Public Key. Frontend không lưu Private Key hay mật khẩu Gmail, đảm bảo an toàn 100%.

---

### 7. Kiểm Tra Trên Điện Thoại Di Động
Để trải nghiệm chân thực nhất như khi người ấy nhận thiệp:
1. Đảm bảo máy tính và điện thoại đang kết nối chung một mạng Wi-Fi.
2. Kiểm tra địa chỉ IP nội bộ của máy tính (ví dụ: mở cmd gõ `ipconfig` -> `192.168.1.15`).
3. Mở trình duyệt Safari hoặc Chrome trên điện thoại và truy cập `http://192.168.1.15:5500/index.html`.
4. Các nút ảo (Trái, Phải, Nhảy, Xem) sẽ tự động hiện lên trên điện thoại, hỗ trợ cảm ứng đa điểm mượt mà.

---

### 8. Deploy Lên Hosting Tĩnh (Miễn Phí & Có Link Chia Sẻ Ngay)

#### Cách 1: Vercel (Khuyên dùng, thao tác cực nhanh)
1. Cài đặt Vercel CLI (nếu có Node.js): mở terminal trong thư mục `20_10` và gõ `npx vercel`.
2. Hoặc kéo thả thư mục dự án lên trang web [vercel.com](https://vercel.com/) -> Bấm Deploy.
3. Bạn sẽ nhận được ngay đường link dạng: `https://super-date-2010.vercel.app`.

#### Cách 2: GitHub Pages
1. Tạo một repository mới trên GitHub (ví dụ: `super-date-2010`).
2. Đẩy toàn bộ mã nguồn lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "Super Date 20/10 Pixel Adventure"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan>/super-date-2010.git
   git push -u origin main
   ```
3. Vào repository trên GitHub -> Chọn **Settings** -> **Pages** -> Tại nhánh chọn `main` và thư mục `/ (root)` -> Bấm **Save**.
4. Sau 1 phút, thiệp của bạn sẽ hoạt động tại địa chỉ: `https://<tai-khoan>.github.io/super-date-2010/`.

#### Cách 3: Netlify
1. Truy cập [app.netlify.com/drop](https://app.netlify.com/drop).
2. Kéo thả nguyên thư mục `20_10` vào khung drop.
3. Netlify sẽ cấp ngay một đường link công khai để bạn gửi cho công chúa của mình! 💗
