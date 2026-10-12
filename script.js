/* ==========================================================================
   SUPER DATE — LEVEL 20/10 💗
   "Một cuộc hẹn nhỏ, một nhiệm vụ đặc biệt."

   Thiệp mời hẹn hò dạng game platformer pixel 2D.
   Chỉ dùng HTML5 + CSS3 + JavaScript thuần + Canvas API + EmailJS.

   MỤC LỤC
   1.  CẤU HÌNH  ← BẠN CHỈ CẦN SỬA PHẦN NÀY
       1.1 SWEET_MESSAGES (Những điều anh thích ở em — Mở hộp quà Màn 1)
       1.2 SECRET_DESTINATION (Địa điểm cố định anh bí mật chuẩn bị — Mở rương Màn 2)
       1.3 DEFAULT_ITINERARY (Lịch trình anh chuẩn bị — Nàng được sửa ở Màn 3)
       1.4 EmailJS
       1.5 Thông tin người mời & lời thoại
   2.  Hằng số game & Palette
   3.  State chung
   4.  Tiện ích & Web Audio Sound Engine
   5.  Sprite Pixel Art nguyên bản (Princess, Boy, Hug Sprite ôm nhau, Tiles, Items)
   6.  Xây dựng 5 màn chơi
   7.  Engine: Vật lý, Camera, Va chạm & Cutscene Ôm Nhau
   8.  Vẽ (Render)
   9.  Điều khiển (Phím, Cảm ứng, Chuột)
   10. Hộp thoại & Popup điều ngọt ngào
   11. Luồng 5 màn chơi
   12. Modal Địa Điểm Bí Mật (Màn 2)
   13. Lịch trình & Chỉnh sửa (Màn 3)
   14. Hồ sơ & Trạng thái (Màn 4)
   15. Vé hẹn hò điện tử & Xác nhận (Màn 5)
   16. Gửi email về Gmail (EmailJS)
   17. Lưu tiến trình phiên chơi tạm thời
   18. Khởi động game
   ========================================================================== */
'use strict';

/* ==========================================================================
   1.1 NHỮNG ĐIỀU ANH THÍCH Ở EM (MÀN 1 — MỞ HỘP QUÀ BÍ MẬT '?')
   --------------------------------------------------------------------------
   Mỗi lần công chúa nhảy lên đụng đầu vào hộp quà '?' trong Màn 1,
   game sẽ bung ra 1 điều dưới đây kèm pháo hoa trái tim!
   Bạn có thể thêm, sửa, xoá hoặc viết những câu của riêng hai bạn nhé!
   ========================================================================== */
const SWEET_MESSAGES = [
  "Anh thích cách em có thể thoải mái tâm sự, chia sẻ những suy nghĩ và câu chuyện của mình với anh 💗",
  "Anh thích sự vui vẻ, tinh nghịch của em, vì em luôn biết cách khiến những điều bình thường trở nên thú vị hơn 🌷",
  "Anh trân trọng sự trưởng thành trong cách em suy nghĩ, cách em nhìn nhận mọi chuyện và đối xử với những người xung quanh ✨",
  "Anh biết phía sau những lúc em vui vẻ cũng có những nỗi niềm riêng, nhất là những điều em luôn dành nhiều tình cảm cho gia đình. Anh mong em sẽ luôn có người để sẻ chia 💗",
  "Anh ngưỡng mộ sự giỏi giang, độc lập và những cố gắng của em. Mong cô gái tuyệt vời ấy sẽ luôn tự hào về chính mình và được yêu thương thật nhiều 🌻"
];

/* ==========================================================================
   1.2 ĐỊA ĐIỂM HẸN HÒ CỐ ĐỊNH (MÀN 2 — MỞ RƯƠNG BÍ MẬT CUỐI MÀN)
   --------------------------------------------------------------------------
   Địa điểm cố định do anh bí mật chuẩn bị sẵn cho công chúa.
   Khi nàng vượt qua thử thách Màn 2 và mở rương báu, thông tin này sẽ hiện ra!
   Ảnh thật sẽ hiển thị sắc nét tự nhiên, không bị vỡ hay pixel hoá.
   ========================================================================== */
const SECRET_DESTINATION = {
  name: "Nhà Hàng & Cafe Hoàng Hôn",
  image: "assets/locations/cafe-01.jpg", // Đổi thành file ảnh của bạn trong assets/locations/ hoặc URL https://
  address: "Tầng thượng ngắm trọn thành phố",
  description: "Không gian lung linh ánh nến, có view hoàng hôn tuyệt đẹp và giai điệu acoustic êm dịu.",
  whyThisPlace: "Vì anh nhớ em từng bảo em chưa được ăn món này bao giờ.",
  price: "Anh đã lo hết mọi thứ rồi nhé!",
  note: "Anh đã bí mật đặt trước chiếc bàn có tầm nhìn đẹp nhất cho hai đứa mình tối 20/10."
};

/* ==========================================================================
   1.3 LỊCH TRÌNH HẸN HÒ ANH CHUẨN BỊ TRƯỚC (MÀN 3 — NÀNG ĐƯỢC PHÉP CHỈNH SỬA)
   --------------------------------------------------------------------------
   Lịch trình mặc định do bạn lên sẵn. Nàng sẽ được xem và có thể chỉnh sửa
   giờ giấc, đổi thứ tự hoạt động hoặc thêm ghi chú theo ý thích ở Màn 3!
   ========================================================================== */
const DEFAULT_ITINERARY = {
  date: "",                     // "YYYY-MM-DD". Để trống = tự lấy ngày 20/10 gần nhất
  pickupTime: "19:00",
  startTime: "19:30",
  pickupPlace: "Trước cổng nhà em",
  planningMode: "sender",
  dinnerTime: "19:30",
  endTime: "22:00",
  activities: [
    { id: "act-1", time: "19:00", title: "Anh qua đón Karli đi chơi", note: "Em chỉ cần chuẩn bị thật xinh!" },
    { id: "act-3", time: "19:30", title: "Bữa tối lãng mạn ngày 20/10", note: "Thưởng thức các món ngon em thích" },
    { id: "act-4", time: "21:30", title: "Đi dạo phố gió mát & ngắm cảnh đêm", note: "Nắm tay dạo quanh hồ" },
    { id: "act-5", time: "22:00", title: "Đưa em về đến tận cửa an toàn", note: "Trao món quà bí mật cuối ngày 🎁" }
  ],
  notes: "Nhớ mang theo áo khoác mỏng nhé, tối trời có thể se lạnh."
};

const PLANNING_MODES = [
  { id: "sender", label: "Anh chuẩn bị", description: "Anh chuẩn bị kế hoạch, em cứ xem và chỉnh lại theo ý thích nhé." },
  { id: "together", label: "Cùng lên kế hoạch", description: "Hai đứa cùng chọn hoạt động và giờ giấc cho buổi hẹn." },
  { id: "guest", label: "Em chọn kế hoạch", description: "Em chọn lịch trình em thích, anh sẽ chuẩn bị theo gợi ý của em." }
];

const ITINERARY_TEMPLATES = [
  { id: "prepared", label: "Anh chuẩn bị", itinerary: DEFAULT_ITINERARY },
  {
    id: "coffee", label: "Cà phê & ăn tối",
    itinerary: {
      pickupTime: "17:30", startTime: "18:00", dinnerTime: "19:00", endTime: "21:00",
      activities: [
        { time: "17:30", title: "Anh qua đón em", note: "" },
        { time: "18:00", title: "Cà phê & trò chuyện", note: "Chọn một góc ngồi thật thoải mái" },
        { time: "19:00", title: "Ăn tối tại điểm hẹn bí mật", note: "" },
        { time: "20:00", title: "Đi dạo & chụp ảnh cùng nhau", note: "" },
        { time: "21:00", title: "Đưa em về nhà", note: "" }
      ]
    }
  },
  {
    id: "relaxed", label: "Buổi tối nhẹ nhàng",
    itinerary: {
      pickupTime: "19:00", startTime: "19:30", dinnerTime: "19:30", endTime: "21:30",
      activities: [
        { time: "19:00", title: "Anh qua đón em", note: "" },
        { time: "19:30", title: "Ăn tối tại điểm hẹn bí mật", note: "Thong thả thưởng thức món em thích" },
        { time: "20:30", title: "Đi dạo & trò chuyện", note: "" },
        { time: "21:30", title: "Đưa em về nhà", note: "" }
      ]
    }
  }
];

/* ==========================================================================
   1.4 CẤU HÌNH EMAILJS ĐỂ NHẬN PHẢN HỒI VỀ GMAIL
   Chỉ dùng PUBLIC KEY. KHÔNG đặt Private Key hay mật khẩu Gmail ở đây.
   ========================================================================== */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; /*YOUR_PUBLIC_KEY*/
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; /*YOUR_SERVICE_ID*/
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; /*YOUR_TEMPLATE_ID*/

/* ==========================================================================
   1.5 THÔNG TIN NGƯỜI MỜI & LỜI THOẠI
   ========================================================================== */
const INVITE_CONFIG = {
  senderName: "Teni",
  receiverName: "Karli"
};

const DIALOGUES = {
  intro: [
    "Chào Karli xinh đẹp! Chúc em ngày 20/10 ngập tràn niềm vui 💗",
    "Hôm nay, anh đã chuẩn bị một thế giới phiêu lưu đặc biệt dành riêng cho em.",
    "Trước khi xuất phát, anh dặn dò công chúa vài điều bí mật nè:",
    "💗 Nhặt TRÁI TIM: Bắn pháo hoa rực rỡ và bay lên những lời thì thầm ngọt ngào anh dành cho em!",
    "🎁 Mở HỘP QUÀ '?': Hãy nhảy lên húc đầu vào các khối hộp '?' — mỗi hộp quà sẽ bật mí một điều anh cực kỳ yêu thích ở em đó!",
    "🪙 Ăn ĐỒNG XU: Thu thập để nạp đầy thanh năng lượng tình yêu trên góc màn hình.",
    "🎮 Điều khiển: Dùng mũi tên Trái / Phải (hoặc phím A/D, nút ảo) để đi, phím Space (hoặc nút JUMP) để nhảy.",
    "Thu thập thật nhiều yêu thương rồi tiến về cột cờ đích đến nhé! Em đã sẵn sàng chưa nào Karli?"
  ],
  world1Done: [
    "Đó chỉ là vài điều nhỏ trong vô vàn điều anh yêu thích ở em thôi 💗",
    "Ở Màn 2, một thử thách kịch tính với 2 chiếc rương báu đang chờ em!",
    "Rương giữa mở Địa Điểm Bí Mật, rương cuối mở Lịch Trình Chi Tiết.",
    "Nhớ cẩn thận với những chú rùa đi tuần tra nhé!"
  ],
  world2Intro: [
    "Màn 2: Thử thách vượt chướng ngại vật & mở 2 chiếc rương báu!",
    "Rương giữa màn: Bật mí Nơi anh sẽ đưa nàng đi.",
    "Rương cuối màn: Lịch trình chi tiết ngày 20/10.",
    "Mẹo: Nhảy đạp lên đầu chú rùa để rùa thụt vào mai nhé!"
  ],
  world3Hug: [
    "Cuối cùng em cũng đến bên anh rồi! 💗",
    "Chúc mừng Karli đã vượt qua mọi thử thách để gặp anh!",
    "Ngày 20/10 này, điều tuyệt vời nhất với anh là được ở bên em."
  ]
};

/* Những từ ngữ yêu thương bay lên khi nhặt tim */
const HEART_WORDS = [
  "Yêu em 💗", "Dễ thương ✨", "Ấm áp ☀️", "Ngọt ngào 🍬", "Hạnh phúc 🌸", "Chân thành 💫"
];

/* ==========================================================================
   2. HẰNG SỐ GAME & PALETTE
   ========================================================================== */
const TILE = 16;
const ROWS = 13;
const GROUND_ROW = 11;
const GROUND_Y = GROUND_ROW * TILE;   // 176
const WORLD_H = ROWS * TILE;          // 208
const VIEW_LIMITS = { minW: 240, maxW: 480, minH: WORLD_H, maxH: 320 };
const PHYS = {
  gravity: 0.3, maxFall: 6, accel: 0.22, airAccel: 0.16, friction: 0.74,
  maxSpeed: 1.9, jumpVel: -6.3, coyote: 7, buffer: 8
};
const SOLID = new Set(["G", "D", "B", "Q", "U", "S", "[", "]", "{", "}"]);
const ONE_WAY = new Set(["C", "="]);

const WORLD_INFO = {
  1: { name: "THE COMPLIMENTS" },
  2: { name: "THE SECRET QUEST" },
  3: { name: "THE SUNSET DATE" }
};

const STATUS_OPTIONS = [
  { id: "accepted",      label: "💗 Em đồng ý hẹn hò với kế hoạch này" },
  { id: "needs_changes", label: "✎ Em muốn chỉnh sửa thêm kế hoạch" },
  { id: "thinking",      label: "… Em cần suy nghĩ thêm" }
];
const STATUS_LABELS = {
  accepted: "ĐỒNG Ý HẸN HÒ",
  needs_changes: "MUỐN CHỈNH SỬA KẾ HOẠCH",
  thinking: "CẦN SUY NGHĨ THÊM"
};

/* ==========================================================================
   3. STATE CHUNG
   ========================================================================== */
function createInitialState() {
  return {
    currentScreen: "start",          // start | world1 | world2 | world3 | world4 | world5 | ticket
    playerPosition: { x: 0, y: 0 },
    collectedCoins: 0,               // Điểm xu năng lượng vui vẻ
    collectedHearts: 0,              // Điểm trái tim yêu thương
    openedGiftsCount: 0,             // Số hộp quà đã mở trong Màn 1
    collectedKeys: [],               // Khóa id các item đã nhặt
    itinerary: JSON.parse(JSON.stringify(DEFAULT_ITINERARY)),
    guestProfile: { name: "", email: "", phone: "", favoriteFood: "", preferences: "", message: "" },
    confirmationStatus: null,        // null | accepted | needs_changes | thinking
    isHugging: false,                // Đang trong cutscene ôm nhau ở Màn 4
    hugCutsceneDone: false,
    editingFromTicket: false,
    sendState: "idle",               // idle | sending | sent | error
    soundOn: true
  };
}
let state = createInitialState();

/* ==========================================================================
   4. TIỆN ÍCH & WEB AUDIO SOUND ENGINE
   ========================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const uid = () => Math.random().toString(36).slice(2, 10);
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function hash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function hashStr(s) { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) | 0; return Math.abs(h); }
function timeToMin(t) {
  if (!/^\d{1,2}:\d{2}$/.test(t || "")) return null;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function minToTime(m) {
  m = ((m % 1440) + 1440) % 1440;
  return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
}
function addMinutes(t, d) { const m = timeToMin(t); return m == null ? "" : minToTime(m + d); }
function defaultDateISO() {
  if (/^\d{4}-\d{2}-\d{2}$/.test(DEFAULT_ITINERARY.date)) return DEFAULT_ITINERARY.date;
  const now = new Date();
  let y = now.getFullYear();
  if (now > new Date(y, 9, 20, 23, 59, 59)) y += 1;
  return `${y}-10-20`;
}
function formatDateVN(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return "Chưa chọn";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const wd = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"][dt.getDay()];
  return `${wd}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}
function isTypingTarget(el) {
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}
let toastTimer = null;
function toast(msg, ms = 2400) {
  els.toast.textContent = msg;
  els.toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.add("hidden"), ms);
}

/* Âm thanh tự tổng hợp bằng WebAudio (nguyên bản, không bản quyền) */
const Sound = {
  ctx: null,
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) { try { this.ctx = new AC(); } catch (e) { this.ctx = null; } }
    }
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    return this.ctx;
  },
  tone(freq, dur, type = "square", vol = 0.06, when = 0, slideTo = null) {
    if (!state.soundOn) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.03);
  },
  noise(dur = 0.3, vol = 0.06) {
    if (!state.soundOn) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    const g = ctx.createGain();
    g.gain.value = vol;
    src.buffer = buf;
    src.connect(g).connect(ctx.destination);
    src.start();
  },
  play(name) {
    switch (name) {
      case "jump": this.tone(260, 0.16, "square", 0.045, 0, 620); break;
      case "coin": this.tone(988, 0.07, "square", 0.045); this.tone(1319, 0.22, "square", 0.045, 0.07); break;
      case "heart": [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.12, "triangle", 0.08, i * 0.06)); break;
      case "bump": this.tone(140, 0.08, "square", 0.05, 0, 90); break;
      case "stomp": this.tone(420, 0.08, "square", 0.05, 0, 190); break;
      case "select": this.tone(660, 0.07, "square", 0.045); this.tone(990, 0.14, "square", 0.045, 0.07); break;
      case "unselect": this.tone(600, 0.08, "square", 0.04, 0, 300); break;
      case "open": [440, 554, 659].forEach((f, i) => this.tone(f, 0.08, "square", 0.04, i * 0.05)); break;
      case "blip": this.tone(820, 0.025, "square", 0.018); break;
      case "land": this.tone(180, 0.06, "triangle", 0.06); break;
      case "success": [523, 659, 784, 1047, 784, 1047, 1318].forEach((f, i) => this.tone(f, i === 6 ? 0.45 : 0.11, "square", 0.045, i * 0.1)); break;
      case "hug": [392, 523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.22, "triangle", 0.07, i * 0.08)); break;
      case "start": [392, 523, 659, 784].forEach((f, i) => this.tone(f, 0.1, "square", 0.045, i * 0.08)); break;
      case "firework": this.noise(0.45, 0.05); this.tone(900, 0.3, "triangle", 0.025, 0, 200); break;
      case "error": this.tone(220, 0.25, "sawtooth", 0.04, 0, 110); break;
    }
  }
};

/* ==========================================================================
   5. SPRITE PIXEL ART NGUYÊN BẢN (vẽ bằng code)
   ========================================================================== */
const PAL = {
  K: "#3b1f2b", H: "#8a4b2a", h: "#b5683a", S: "#ffd9b8", R: "#ff8fa3", Y: "#ffd43b",
  P: "#ff6fa5", p: "#d9487f", W: "#ffffff", B: "#7a2b4a", r: "#e8435f",
  C: "#3a7bd5", T: "#ff8c42", N: "#3d4a8c", J: "#4a2c1a", b: "#5a3a2a",
  G: "#3cb043", g: "#2a8a33", s: "#cfd8dc", w: "#7b4a2a", D: "#c21f4f", L: "#ffd6e0"
};

function makeCanvas(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
function px(ctx, x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); }
function makeSprite(rows, palette = PAL) {
  const h = rows.length, w = Math.max(...rows.map((r) => r.length));
  const c = makeCanvas(w, h), x = c.getContext("2d");
  rows.forEach((row, yy) => {
    for (let i = 0; i < row.length; i++) {
      const col = palette[row[i]];
      if (col) px(x, i, yy, 1, 1, col);
    }
  });
  return c;
}
function flipCanvas(src) {
  const c = makeCanvas(src.width, src.height), x = c.getContext("2d");
  x.translate(src.width, 0); x.scale(-1, 1); x.drawImage(src, 0, 0);
  return c;
}
function frame(base, over = {}) {
  const rows = base.slice();
  for (const k in over) rows[k] = over[k];
  const c = makeSprite(rows);
  return { r: c, l: flipCanvas(c) };
}

const PRINCESS = [
  "......Y.Y.Y.....",
  "......YYYYY.....",
  ".....HHHHHHH....",
  "....HHhhHHHHH...",
  "....HHSSSSSSH...",
  "....HSSSKSSKS...",
  "....HSSSKSSKS...",
  "....HSRSSSSRS...",
  "....HHSSSrSSS...",
  "....HH.PPPP.....",
  "....H.SPWWPS....",
  ".....PPPPPPPP...",
  ".....PpPPPPpP...",
  "....PPPPPPPPPP..",
  "....pppppppppp..",
  "......BB..BB...."
];
const BOY = [
  "................",
  ".....CCCCCC.....",
  "....CCCrCCCC....",
  "....CCCCCCCCCC..",
  "....JJSSSSSJ....",
  "....JSSKSSKS....",
  "....JSSKSSKS....",
  "....JSRSSSRS....",
  ".....SSSrSS.....",
  ".....TTTTTT.....",
  "....STTTTTTS....",
  "....STTWTTTS....",
  ".....TTTTTT.....",
  ".....NNNNNN.....",
  ".....NN..NN.....",
  "....bbb..bbb...."
];

/* Sprite Ôm Nhau (Princess + Boy Hug Sprite 20x16) */
const HUG_ROWS = [
  ".......rr.rr........",
  "......rrrrrrr.......",
  ".......rrrrr........",
  "........rrr.........",
  "....CCCC..HHHHHH....",
  "...CCCCCC.HSSSSSH...",
  "...JJSSSC.HSSKSSH...",
  "...JSSKSC.HSRSSRH...",
  "...JSRSSC.HHSSSH....",
  "...TTTTSSSSSPPPP....",
  "..STTTTTSSSPPWWPS...",
  "..STTWTTSSPPPPPPPP..",
  "...TTTTTTPpPPPPpP...",
  "...NNNNNNPPPPPPPPP..",
  "...NN..NNppppppppp..",
  "..bbb.bbb..BB..BB..."
];

const HEART_ROWS = [
  ".rr.rr..",
  "rLrrrrr.",
  "rrrrrrr.",
  "rrrrrrr.",
  ".rrrrr..",
  "..rrr...",
  "...r...."
];

/* Sprite Chú Rùa xanh tuần tra (Turtle / Koopa-style cute enemy 16x11) */
const TURTLE_WALK1 = [
  ".....ggggg......",
  "....ggggggg.....",
  "...ggGGGGGgg....",
  "..ggGGGGGGGgg...",
  "..SSggGGGGGgg...",
  "..SWKgYYYYYY....",
  "..SSSSYYYYYY....",
  "...SSYYYYYYYY...",
  "....YYYYYYYYY...",
  "....SS....SS....",
  "...SSSS..SSSS..."
];

const TURTLE_WALK2 = [
  ".....ggggg......",
  "....ggggggg.....",
  "...ggGGGGGgg....",
  "..ggGGGGGGGgg...",
  "..SSggGGGGGgg...",
  "..SWKgYYYYYY....",
  "..SSSSYYYYYY....",
  "...SSYYYYYYYY...",
  "....YYYYYYYYY...",
  ".....SS....SS...",
  "....SSSS..SSSS.."
];

const TURTLE_SHELL = [
  ".....ggggg......",
  "...ggggggggg....",
  "..ggGGGGGGGgg...",
  "..ggGGGGGGGgg...",
  "..ggGGGGGGGgg...",
  "..YYYYYYYYYYY...",
  "...YYYYYYYYY...."
];

const SPR = {};

function buildSprites() {
  SPR.princess = {
    idle: frame(PRINCESS),
    blink: frame(PRINCESS, { 5: "....HSSSSSSSS..." }),
    run1: frame(PRINCESS, { 10: "....HSPPWWPS....", 15: "....BB.....BB..." }),
    run2: frame(PRINCESS, { 10: "....H.SPWWPPS...", 15: "......BBBB......" }),
    jump: frame(PRINCESS, { 9: "...SHH.PPPP..S..", 10: "....H..PWWP.....", 15: ".....BB....BB..." })
  };
  SPR.boy = { idle: frame(BOY), blink: frame(BOY, { 5: "....JSSSSSSS...." }) };
  SPR.hug = makeSprite(HUG_ROWS);
  SPR.heart = makeSprite(HEART_ROWS);
  SPR.turtle = {
    walk1: { r: makeSprite(TURTLE_WALK1), l: flipCanvas(makeSprite(TURTLE_WALK1)) },
    walk2: { r: makeSprite(TURTLE_WALK2), l: flipCanvas(makeSprite(TURTLE_WALK2)) },
    shell: makeSprite(TURTLE_SHELL)
  };
  SPR.tiles = buildTiles();
  SPR.coins = buildCoins();
  SPR.cloud = buildCloud();
  SPR.hillBig = buildHill(112, 52, "#2f8f46", "#5fcf6a");
  SPR.hillSmall = buildHill(72, 32, "#2f8f46", "#5fcf6a");
  SPR.hillFar = buildHill(160, 70, "#7cc7a0", "#a6e3c0");
  SPR.bush = buildBush();
  SPR.tree = buildTree();
  SPR.castle = buildCastle();
  SPR.chestClosed = buildChest(false);
  SPR.chestOpen = buildChest(true);
}

function spriteUrl(canvas, scale = 4) {
  const c = makeCanvas(canvas.width * scale, canvas.height * scale), x = c.getContext("2d");
  x.imageSmoothingEnabled = false;
  x.drawImage(canvas, 0, 0, c.width, c.height);
  return c.toDataURL();
}

function buildTiles() {
  const T = {};
  const tile = (fn) => { const c = makeCanvas(16, 16); fn(c.getContext("2d")); return c; };
  const dirt = (x) => {
    px(x, 0, 0, 16, 16, "#d9894a");
    [[2, 3], [9, 2], [13, 7], [5, 9], [11, 12], [3, 13], [7, 6]].forEach(([a, b]) => {
      px(x, a, b, 2, 1, "#b0652f"); px(x, a, b + 1, 1, 1, "#b0652f");
    });
    px(x, 1, 5, 1, 1, "#f0a868"); px(x, 12, 10, 1, 1, "#f0a868");
  };
  T.D = tile(dirt);
  T.G = tile((x) => {
    dirt(x);
    px(x, 0, 0, 16, 5, "#5ac43a");
    px(x, 0, 0, 16, 1, "#9be86a");
    for (let i = 0; i < 16; i += 2) px(x, i, 5, 1, (i % 4 === 0) ? 2 : 1, "#3a9a2a");
    px(x, 3, 2, 1, 1, "#9be86a"); px(x, 10, 1, 1, 1, "#9be86a");
  });
  T.B = tile((x) => {
    px(x, 0, 0, 16, 16, "#8a3324");
    const brick = (bx, by, bw) => { px(x, bx, by, bw, 7, "#e0704f"); px(x, bx, by, bw, 1, "#f5a07f"); px(x, bx, by, 1, 7, "#f5a07f"); };
    brick(0, 0, 7); brick(8, 0, 8); brick(0, 8, 3); brick(4, 8, 8); brick(13, 8, 3);
  });
  T.Q = tile((x) => {
    px(x, 0, 0, 16, 16, "#3b1f2b");
    px(x, 1, 1, 14, 14, "#ff7eb6");
    px(x, 1, 1, 14, 1, "#ffb3d4"); px(x, 1, 14, 14, 1, "#d9487f");
    px(x, 7, 1, 2, 14, "#ffd43b"); px(x, 1, 7, 14, 2, "#ffd43b");
    px(x, 4, 3, 3, 3, "#ffd43b"); px(x, 9, 3, 3, 3, "#ffd43b"); px(x, 5, 4, 1, 1, "#ff7eb6"); px(x, 10, 4, 1, 1, "#ff7eb6");
  });
  T.U = tile((x) => {
    px(x, 0, 0, 16, 16, "#3b1f2b");
    px(x, 1, 1, 14, 14, "#b0835a");
    px(x, 1, 1, 14, 1, "#cfa57a");
    [[3, 3], [12, 3], [3, 12], [12, 12]].forEach(([a, b]) => px(x, a, b, 1, 1, "#3b1f2b"));
  });
  T.S = tile((x) => {
    px(x, 0, 0, 16, 16, "#3b1f2b");
    px(x, 1, 1, 14, 14, "#e2b98a");
    px(x, 1, 1, 14, 2, "#f6dcb5"); px(x, 1, 1, 2, 14, "#f6dcb5");
    px(x, 1, 13, 14, 2, "#b88a5a"); px(x, 13, 1, 2, 14, "#b88a5a");
  });
  const PO = "#1d4a2b", PB = "#43c66b", PD = "#2e8f4b", PL = "#9cf0b2";
  T["["] = tile((x) => {
    px(x, 0, 0, 16, 7, PO); px(x, 1, 1, 15, 5, PB); px(x, 2, 1, 2, 5, PL); px(x, 5, 1, 1, 5, PL);
    px(x, 2, 7, 14, 9, PO); px(x, 3, 7, 13, 9, PB); px(x, 4, 7, 2, 9, PL);
  });
  T["]"] = tile((x) => {
    px(x, 0, 0, 16, 7, PO); px(x, 0, 1, 15, 5, PB); px(x, 10, 1, 4, 5, PD);
    px(x, 0, 7, 14, 9, PO); px(x, 0, 7, 13, 9, PB); px(x, 8, 7, 4, 9, PD);
  });
  T["{"] = tile((x) => { px(x, 2, 0, 14, 16, PO); px(x, 3, 0, 13, 16, PB); px(x, 4, 0, 2, 16, PL); });
  T["}"] = tile((x) => { px(x, 0, 0, 14, 16, PO); px(x, 0, 0, 13, 16, PB); px(x, 8, 0, 4, 16, PD); });
  T.C = tile((x) => {
    px(x, 0, 4, 16, 8, "#ffffff"); px(x, 2, 2, 5, 3, "#ffffff"); px(x, 9, 1, 5, 4, "#ffffff");
    px(x, 0, 10, 16, 2, "#d6efff"); px(x, 0, 12, 16, 1, "#9cc9f0");
  });
  T["="] = tile((x) => {
    px(x, 0, 0, 16, 6, "#3b1f2b"); px(x, 0, 1, 16, 4, "#c98a4b"); px(x, 0, 1, 16, 1, "#e8b27a");
    px(x, 3, 2, 1, 1, "#3b1f2b"); px(x, 12, 2, 1, 1, "#3b1f2b"); px(x, 7, 1, 1, 4, "#a8703a");
  });
  return T;
}

function buildCoins() {
  return [6, 4, 2, 4].map((w) => {
    const c = makeCanvas(8, 8), x = c.getContext("2d");
    const ox = (8 - w) / 2;
    if (w <= 2) { px(x, 3, 0, 2, 8, "#e0a200"); return c; }
    px(x, ox, 1, w, 6, "#b8860b"); px(x, ox + 1, 0, w - 2, 8, "#b8860b");
    px(x, ox + 1, 1, w - 2, 6, "#ffd43b");
    px(x, ox + 1, 1, 1, 3, "#fff6b0");
    return c;
  });
}

function buildCloud() {
  const c = makeCanvas(32, 14), x = c.getContext("2d");
  const W = "#ffffff", L = "#d6efff";
  px(x, 4, 6, 24, 6, W); px(x, 8, 3, 8, 4, W); px(x, 15, 1, 9, 6, W); px(x, 2, 8, 28, 4, W); px(x, 24, 4, 5, 4, W);
  px(x, 2, 11, 28, 2, L); px(x, 5, 13, 22, 1, L);
  return c;
}

function buildHill(w, h, dark, light) {
  const c = makeCanvas(w, h), x = c.getContext("2d");
  const cx = w / 2;
  for (let yy = 0; yy < h; yy++) {
    const t = (h - yy) / h;
    const hw = Math.round(cx * Math.sqrt(Math.max(0, 1 - t * t)));
    if (hw <= 0) continue;
    px(x, cx - hw, yy, hw * 2, 1, dark);
    if (hw > 1 && yy > 0) px(x, cx - hw + 1, yy, hw * 2 - 2, 1, light);
  }
  return c;
}

function buildBush() {
  const c = makeCanvas(32, 12), x = c.getContext("2d");
  const blob = (bx, r) => {
    for (let yy = 0; yy <= r; yy++) {
      const hw = Math.round(Math.sqrt(r * r - (r - yy) * (r - yy)));
      px(x, bx - hw, 12 - r - 1 + yy, hw * 2, 1, "#2a8a33");
      if (hw > 1) px(x, bx - hw + 1, 12 - r + yy, hw * 2 - 2, 1, "#4cc35a");
    }
  };
  blob(8, 6); blob(24, 6); blob(16, 9);
  px(x, 0, 11, 32, 1, "#2a8a33");
  return c;
}

function buildTree() {
  const c = makeCanvas(16, 32), x = c.getContext("2d");
  px(x, 6, 18, 4, 14, "#3b1f2b"); px(x, 7, 18, 2, 14, "#8a5a32");
  px(x, 2, 2, 12, 16, "#2a8a33"); px(x, 0, 6, 16, 9, "#2a8a33"); px(x, 4, 0, 8, 2, "#2a8a33");
  px(x, 3, 3, 10, 14, "#4cc35a"); px(x, 1, 7, 14, 7, "#4cc35a"); px(x, 5, 1, 6, 2, "#4cc35a");
  return c;
}

function buildCastle() {
  const c = makeCanvas(80, 80), x = c.getContext("2d");
  const OL = "#3b1f2b", ST = "#f6c4d6", SD = "#e09ab6", SL = "#ffe6ef";
  px(x, 22, 34, 36, 46, OL); px(x, 23, 35, 34, 45, ST);
  [23, 32, 41, 50].forEach((m) => { px(x, m, 27, 6, 8, OL); px(x, m + 1, 28, 4, 7, ST); });
  for (let yy = 42; yy < 80; yy += 8) px(x, 23, yy, 34, 1, SD);
  px(x, 23, 35, 34, 1, SL);
  [0, 56].forEach((tx) => {
    px(x, tx, 14, 24, 66, OL); px(x, tx + 1, 15, 22, 65, ST);
    [0, 9, 18].forEach((m) => { px(x, tx + m, 7, 6, 8, OL); px(x, tx + m + 1, 8, 4, 7, ST); });
    for (let yy = 22; yy < 80; yy += 8) px(x, tx + 1, yy, 22, 1, SD);
    px(x, tx + 1, 15, 22, 1, SL);
  });
  px(x, 30, 54, 20, 26, OL); px(x, 32, 56, 16, 24, "#6b2e46");
  x.drawImage(makeSprite(HEART_ROWS), 36, 43);
  px(x, 39, 8, 1, 20, OL); px(x, 40, 8, 9, 6, "#ff4d6d");
  return c;
}

function buildChest(open) {
  const c = makeCanvas(16, 16), x = c.getContext("2d");
  const OL = "#3b1f2b", W = "#a0612f", WL = "#c98a4b", G = "#ffd43b";
  if (!open) {
    px(x, 1, 4, 14, 12, OL); px(x, 2, 5, 12, 10, W); px(x, 2, 5, 12, 3, WL);
    px(x, 1, 9, 14, 1, OL); px(x, 2, 10, 12, 1, G); px(x, 7, 8, 2, 4, G); px(x, 7, 9, 2, 1, OL);
  } else {
    px(x, 1, 0, 14, 5, OL); px(x, 2, 1, 12, 3, WL);
    px(x, 1, 6, 14, 10, OL); px(x, 2, 7, 12, 8, W); px(x, 2, 6, 12, 3, G);
    px(x, 4, 6, 2, 1, "#fff6b0"); px(x, 9, 6, 3, 1, "#fff6b0"); px(x, 2, 11, 12, 1, G);
  }
  return c;
}

/* ==========================================================================
   6. XÂY DỰNG 3 MÀN CHƠI THEO CỐT TRUYỆN
   ========================================================================== */
function createLevel(id, cols) {
  const tiles = [];
  for (let r = 0; r < ROWS; r++) tiles.push(new Array(cols).fill("."));
  return {
    id, cols, tiles,
    coins: [], hearts: [], giftBoxes: [], decor: [],
    enemies: [],
    midChest: null,
    npc: null, goal: null, spawn: { c: 2 }
  };
}
function setTile(L, c, r, ch) { if (c >= 0 && c < L.cols && r >= 0 && r < ROWS) L.tiles[r][c] = ch; }
function tileAt(L, c, r) { if (c < 0 || c >= L.cols || r < 0 || r >= ROWS) return "."; return L.tiles[r][c]; }
function fillGround(L, from, to) { for (let c = from; c <= to; c++) { setTile(L, c, GROUND_ROW, "G"); setTile(L, c, GROUND_ROW + 1, "D"); } }
function addRow(L, c, r, str) { [...str].forEach((ch, i) => setTile(L, c + i, r, ch)); }
function addPlatform(L, c, r, w, ch) { for (let i = 0; i < w; i++) setTile(L, c + i, r, ch); }
function addPipe(L, c, h) {
  const top = GROUND_ROW - h;
  setTile(L, c, top, "["); setTile(L, c + 1, top, "]");
  for (let r = top + 1; r < GROUND_ROW; r++) { setTile(L, c, r, "{"); setTile(L, c + 1, r, "}"); }
}
function addStairs(L, c, n, dir) {
  for (let i = 0; i < n; i++) {
    const h = dir === "up" ? i + 1 : n - i;
    for (let k = 0; k < h; k++) setTile(L, c + i, GROUND_ROW - 1 - k, "S");
  }
}
function addCoin(L, c, r) { L.coins.push({ x: c * TILE + 4, y: r * TILE + 4, key: `${L.id}:c:${c},${r}`, taken: false }); }
function addCoins(L, c, r, n) { for (let i = 0; i < n; i++) addCoin(L, c + i, r); }
function addCoinArc(L, c, r, n) {
  for (let i = 0; i < n; i++) {
    const off = Math.round(Math.sin((i / Math.max(1, n - 1)) * Math.PI) * 2);
    addCoin(L, c + i, r - off);
  }
}
function addHeart(L, c, r) { L.hearts.push({ x: c * TILE + 4, y: r * TILE + 4, key: `${L.id}:h:${c},${r}`, taken: false }); }
function addEnemy(L, opts) {
  const c = opts.c, r = opts.r != null ? opts.r : GROUND_ROW - 1;
  const minC = opts.minC != null ? opts.minC : c - 4;
  const maxC = opts.maxC != null ? opts.maxC : c + 4;
  L.enemies.push({
    id: `${L.id}:e:${c},${r}`,
    type: opts.type || "turtle",
    x: c * TILE,
    y: r * TILE + 2,
    w: 14, h: 14,
    vx: opts.speed || 0.45,
    minX: minC * TILE,
    maxX: maxC * TILE,
    dir: -1,
    anim: 0,
    shell: false,
    shellTimer: 0,
    dead: false
  });
}
function addGroundDecor(L, seed, avoid = []) {
  for (let c = 1; c < L.cols - 1; c++) {
    if (avoid.some(([a, b]) => c >= a && c <= b)) continue;
    if (tileAt(L, c, GROUND_ROW - 1) !== "." || tileAt(L, c + 1, GROUND_ROW - 1) !== ".") continue;
    const v = hash(c * 7.13 + seed);
    if (v < 0.1) { L.decor.push({ type: "bush", c }); c += 2; }
    else if (v < 0.16) { L.decor.push({ type: "tree", c }); c += 1; }
    else if (v < 0.34) L.decor.push({ type: "flower", c, off: Math.floor(hash(c + seed + 5) * 10), color: v < 0.25 ? "#ff6fa5" : "#ffd43b" });
  }
}

/* --------------------------------------------------------------------------
   WORLD 1 — THE INVITATION & NHỮNG ĐIỀU ANH THÍCH Ở EM
   Mỗi hộp quà '?' nhảy lên đụng đầu sẽ bung ra 1 lời khen ngọt ngào!
   -------------------------------------------------------------------------- */
function buildWorld1() {
  const cols = 68;
  const L = createLevel("w1", cols);
  fillGround(L, 0, cols - 1);
  L.spawn = { c: 3 };

  // Hộp quà bí mật 1
  addRow(L, 12, 8, "BQB");
  L.giftBoxes.push({ c: 13, r: 8, msgIndex: 0 });
  addCoins(L, 12, 7, 3);

  addPipe(L, 18, 2); addCoins(L, 18, 7, 2);

  // Hộp quà bí mật 2
  addPlatform(L, 23, 7, 3, "C");
  addRow(L, 24, 4, "Q");
  L.giftBoxes.push({ c: 24, r: 4, msgIndex: 1 });
  addHeart(L, 24, 2);

  addStairs(L, 30, 3, "up"); addStairs(L, 33, 3, "down");
  addHeart(L, 32, 6);

  // Hộp quà bí mật 3
  addRow(L, 38, 8, "BQB");
  L.giftBoxes.push({ c: 39, r: 8, msgIndex: 2 });
  addCoins(L, 38, 7, 3);

  addPlatform(L, 44, 6, 4, "C");
  // Hộp quà bí mật 4
  addRow(L, 45, 3, "Q");
  L.giftBoxes.push({ c: 45, r: 3, msgIndex: 3 });
  addHeart(L, 45, 1);

  // Hộp quà bí mật 5
  addRow(L, 51, 8, "BQB");
  L.giftBoxes.push({ c: 52, r: 8, msgIndex: 4 });
  addCoinArc(L, 54, 9, 4);

  L.goal = { type: "flag", c: 60 };
  L.decor.push({ type: "castle", c: 63 });
  addGroundDecor(L, 11, [[1, 5], [59, 67]]);
  return L;
}

/* --------------------------------------------------------------------------
   WORLD 2 — THE SECRET QUEST (GỘP MÀN 2 & 3: 2 RƯƠNG & RÙA TUẦN TRA)
   - Nửa đầu: Vượt rùa tuần tra tới RƯƠNG 1 (Mở Địa Điểm Bí Mật)
   - Nửa sau: Thử thách platform và rùa tuần tra tới RƯƠNG 2 (Mở Lịch Trình Chi Tiết)
   -------------------------------------------------------------------------- */
function buildWorld2() {
  const cols = 88;
  const L = createLevel("w2", cols);
  fillGround(L, 0, cols - 1);
  L.spawn = { c: 2 };

  // --- NỬA ĐẦU: Tiến tới Rương 1 (Địa điểm bí mật) ---
  addPipe(L, 8, 2); addCoinArc(L, 11, 8, 4);
  addRow(L, 15, 8, "BBBB"); addCoins(L, 15, 7, 4);

  // Chú rùa 1 tuần tra trên đất bằng
  addEnemy(L, { c: 20, minC: 17, maxC: 24, speed: 0.45 });

  addPlatform(L, 23, 6, 3, "C"); addHeart(L, 24, 4);
  addStairs(L, 28, 3, "up"); addStairs(L, 31, 3, "down");
  addCoins(L, 30, 6, 2);

  // Chú rùa 2 tuần tra
  addEnemy(L, { c: 36, minC: 33, maxC: 40, speed: 0.5 });

  // RƯƠNG GIỮA MÀN Ở CỘT 42 (MỞ ĐỊA ĐIỂM BÍ MẬT)
  L.midChest = { c: 42, opened: false };
  addPlatform(L, 41, 8, 3, "C"); addCoins(L, 41, 7, 3);
  addHeart(L, 42, 5);

  // --- NỬA SAU: Thử thách platform tới Rương 2 (Lịch trình) ---
  addPipe(L, 48, 3); addCoinArc(L, 51, 8, 4);
  addRow(L, 55, 6, "BBB"); addCoins(L, 55, 5, 3);

  // Chú rùa 3 tuần tra trên platform
  addPlatform(L, 60, 7, 5, "C");
  addEnemy(L, { c: 62, r: 6, minC: 60, maxC: 64, speed: 0.5 });
  addHeart(L, 62, 4);

  // Bậc thang và chướng ngại vật
  addStairs(L, 68, 4, "up"); addCoins(L, 70, 5, 3);
  addPlatform(L, 74, 5, 3, "C"); addHeart(L, 75, 3);

  // RƯƠNG CUỐI MÀN Ở CỘT 80 (MỞ LỊCH TRÌNH CHI TIẾT)
  L.goal = { type: "itinerary_chest", c: 80 };
  L.decor.push({ type: "castle", c: 83 });
  addGroundDecor(L, 22, [[1, 4], [39, 45], [78, 87]]);
  return L;
}

/* --------------------------------------------------------------------------
   WORLD 3 — THE SUNSET DATE (GỘP MÀN 4 & 5: HỘI NGỘ HOÀNG HÔN & ÔM NHAU)
   Cảnh hoàng hôn tím hồng lãng mạn, chàng trai đứng chờ, công chúa chạy tới ôm!
   Sau cutscene ôm nhau, chuyển thẳng sang Vé Hẹn Hò & Phản Hồi.
   -------------------------------------------------------------------------- */
function buildWorld3() {
  const cols = 48;
  const L = createLevel("w3", cols);
  fillGround(L, 0, cols - 1);
  L.spawn = { c: 2 };

  // Đường hoa và tim trải dài
  [6, 12, 18, 24].forEach((c) => addHeart(L, c, 9));
  addCoinArc(L, 8, 9, 3);
  addCoinArc(L, 14, 9, 3);
  addCoinArc(L, 20, 9, 3);

  // Cổng hoa 20/10 đón chào
  L.decor.push({ type: "gate", c: 26 });

  // CHÀNG TRAI ĐỨNG CHỜ ĐÓN CÔNG CHÚA Ở CỘT 36!
  L.npc = { c: 36 };
  L.decor.push({ type: "castle", c: 40 });
  addGroundDecor(L, 44, [[1, 4], [34, 46]]);
  return L;
}

const LEVEL_BUILDERS = {
  1: buildWorld1,
  2: buildWorld2,
  3: buildWorld3
};

/* ==========================================================================
   7. ENGINE: VẬT LÝ, CAMERA, VA CHẠM & CUTSCENE ÔM NHAU
   ========================================================================== */
const game = {
  world: 0, level: null, player: null,
  mode: "attract",                 // attract | intro | play | frozen | cutscene_hug
  t: 0, particles: [], rockets: [], bumps: [], timers: [],
  near: null, nearKey: "", chestOpen: false, fireworksAuto: false, onLand: null,
  hugPartnerX: 0
};
const view = { w: 320, h: WORLD_H, scale: 1 };
const cam = { x: 0, y: 0, dir: 1 };
const input = { left: false, right: false, jump: false, jumpPressed: false };
let canvas, ctx, skyGrad;

function createPlayer(x, y) {
  return { x, y, w: 10, h: 14, vx: 0, vy: 0, onGround: false, facing: 1, coyote: 0, jumpBuf: 0, anim: 0, safeX: x, safeY: y };
}
function after(frames, fn) { game.timers.push({ t: frames, fn }); }
function isSolid(t) { return SOLID.has(t); }

function moveX(p, L) {
  p.x += p.vx;
  const top = Math.floor(p.y / TILE), bottom = Math.floor((p.y + p.h - 0.01) / TILE);
  if (p.vx > 0) {
    const c = Math.floor((p.x + p.w - 0.01) / TILE);
    for (let r = top; r <= bottom; r++) if (isSolid(tileAt(L, c, r))) { p.x = c * TILE - p.w; p.vx = 0; break; }
  } else if (p.vx < 0) {
    const c = Math.floor(p.x / TILE);
    for (let r = top; r <= bottom; r++) if (isSolid(tileAt(L, c, r))) { p.x = (c + 1) * TILE; p.vx = 0; break; }
  }
  p.x = clamp(p.x, 0, L.cols * TILE - p.w);
}

function moveY(p, L) {
  const prevBottom = p.y + p.h;
  p.y += p.vy;
  p.onGround = false;
  const left = Math.floor(p.x / TILE), right = Math.floor((p.x + p.w - 0.01) / TILE);
  if (p.vy > 0) {
    const r = Math.floor((p.y + p.h - 0.01) / TILE);
    for (let c = left; c <= right; c++) {
      const t = tileAt(L, c, r);
      if (isSolid(t) || (ONE_WAY.has(t) && prevBottom <= r * TILE + 0.5)) {
        p.y = r * TILE - p.h; p.vy = 0; p.onGround = true; break;
      }
    }
  } else if (p.vy < 0) {
    const r = Math.floor(p.y / TILE);
    const center = Math.floor((p.x + p.w / 2) / TILE);
    const order = [center, left, right].filter((v, i, a) => a.indexOf(v) === i);
    for (const c of order) {
      if (isSolid(tileAt(L, c, r))) { p.y = (r + 1) * TILE; p.vy = 0; bumpTile(L, c, r); break; }
    }
  }
}

/* Đập đầu vào khối gạch / hộp quà '?' */
function bumpTile(L, c, r) {
  const t = tileAt(L, c, r);
  game.bumps.push({ c, r, t: 8 });
  if (t === "Q") {
    setTile(L, c, r, "U");
    state.collectedKeys.push(`${L.id}:q:${c},${r}`);
    state.collectedCoins += 1;
    state.openedGiftsCount++;

    // Kiểm tra xem đây có phải là hộp quà ngọt ngào trong Màn 1 không
    const box = (L.giftBoxes || []).find((b) => b.c === c && b.r === r);
    const msgIdx = box ? box.msgIndex : (state.openedGiftsCount - 1);
    const msg = SWEET_MESSAGES[msgIdx % SWEET_MESSAGES.length];

    spawnParticles(c * TILE + 8, r * TILE - 4, 16, ["#ff6fa5", "#ffd43b", "#ffffff"], { speed: 1.6, up: 1.4 });
    burstHearts(c * TILE + 8, r * TILE - 14, 6);
    Sound.play("coin");
    updateHUD();

    // Hiện popup / dialog điều ngọt ngào
    after(15, () => {
      showSweetNoteDialog(msgIdx + 1, msg);
    });
  } else {
    Sound.play("bump");
  }
}

function overlap(a, bx, by, bw, bh) { return a.x < bx + bw && a.x + a.w > bx && a.y < by + bh && a.y + a.h > by; }

function collectItems(p, L) {
  // Nhặt xu
  for (const coin of L.coins) {
    if (!coin.taken && overlap(p, coin.x, coin.y, 8, 8)) {
      coin.taken = true; state.collectedCoins++; state.collectedKeys.push(coin.key);
      spawnParticles(coin.x + 4, coin.y + 4, 6, ["#ffd43b", "#fff6b0"], { speed: 1 });
      Sound.play("coin"); updateHUD();
    }
  }
  // Nhặt tim
  for (const h of L.hearts) {
    if (!h.taken && overlap(p, h.x, h.y, 8, 7)) {
      h.taken = true; state.collectedHearts++; state.collectedKeys.push(h.key);
      spawnParticles(h.x + 4, h.y + 4, 14, ["#ff3d6e", "#ff8fa3", "#ffffff"], { speed: 1.4 });
      burstHearts(h.x + 4, h.y - 2, 4);

      // Lời thì thầm yêu thương bay lên
      const word = HEART_WORDS[state.collectedHearts % HEART_WORDS.length];
      toast(word, 1200);

      Sound.play("heart"); updateHUD();
    }
  }
}

function applyCollected(L) {
  const keys = new Set(state.collectedKeys);
  L.coins.forEach((c) => { if (keys.has(c.key)) c.taken = true; });
  L.hearts.forEach((h) => { if (keys.has(h.key)) h.taken = true; });
  state.collectedKeys.forEach((k) => {
    const m = k.match(/^(\w+):q:(\d+),(\d+)$/);
    if (m && m[1] === L.id && tileAt(L, +m[2], +m[3]) === "Q") setTile(L, +m[2], +m[3], "U");
  });
}

function spawnParticles(x, y, n, colors, o = {}) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, s = (o.speed || 1.5) * (0.4 + Math.random() * 0.8);
    const life = (o.life || 30) + Math.random() * 20;
    game.particles.push({
      x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (o.up || 0), g: o.g ?? 0.08,
      life, max: life, color: colors[i % colors.length], size: o.size || 2, type: o.type || "px"
    });
  }
}
function launchRocket(x) {
  const colors = ["#ff4d6d", "#ffd43b", "#4cc9f0", "#b5ff6a", "#ff9ff3", "#ffffff"];
  game.rockets.push({ x, y: WORLD_H, vy: -(3.6 + Math.random() * 1.2), color: colors[Math.floor(Math.random() * colors.length)] });
}
function burstHearts(x, y, n = 8) {
  for (let i = 0; i < n; i++) {
    game.particles.push({ x: x + (Math.random() - 0.5) * 36, y: y + Math.random() * 10, vx: (Math.random() - 0.5) * 0.6, vy: -0.5 - Math.random() * 0.8, g: 0, life: 70 + Math.random() * 30, max: 100, type: "heart" });
  }
}

function update() {
  game.t++;
  if (game.timers.length) {
    const due = [];
    game.timers = game.timers.filter((tm) => (--tm.t > 0) || (due.push(tm), false));
    due.forEach((tm) => tm.fn());
  }

  // Hạt & pháo hoa
  game.particles = game.particles.filter((pt) => {
    pt.x += pt.vx; pt.y += pt.vy; pt.vy += pt.g; pt.life--;
    return pt.life > 0;
  });
  game.rockets = game.rockets.filter((rk) => {
    rk.y += rk.vy; rk.vy += 0.05;
    if (game.t % 2 === 0) game.particles.push({ x: rk.x, y: rk.y, vx: 0, vy: 0.2, g: 0, life: 12, max: 12, color: "#fff6b0", size: 1, type: "px" });
    if (rk.vy >= -0.4) {
      spawnParticles(rk.x, rk.y, 40, [rk.color, "#ffffff", rk.color], { speed: 2.1, g: 0.035, life: 50 });
      Sound.play("firework");
      return false;
    }
    return true;
  });
  game.bumps = game.bumps.filter((b) => --b.t > 0);
  if (game.fireworksAuto && game.t % 70 === 0) launchRocket(cam.x + 30 + Math.random() * (view.w - 60));

  const L = game.level, p = game.player;
  if (!L) return;

  if (game.mode === "attract") {
    const maxX = Math.max(0, L.cols * TILE - view.w);
    cam.x += 0.35 * cam.dir;
    if (cam.x >= maxX) { cam.x = maxX; cam.dir = -1; }
    if (cam.x <= 0) { cam.x = 0; cam.dir = 1; }
    cam.y = WORLD_H - view.h;
    return;
  }
  if (!p) return;

  // Xử lý Cutscene Ôm Nhau ở Màn 3 (Hội ngộ hoàng hôn)
  if (game.mode === "cutscene_hug") {
    const targetX = game.hugPartnerX - 6;
    if (Math.abs(p.x - targetX) > 1) {
      p.vx = p.x < targetX ? 1.0 : -1.0;
      p.facing = p.vx > 0 ? 1 : -1;
      p.anim += 0.2;
      moveX(p, L);
    } else {
      p.x = targetX;
      p.vx = 0;
      if (!state.isHugging) {
        state.isHugging = true;
        Sound.play("hug");
        burstHearts(targetX + 10, GROUND_Y - 24, 20);
        for (let i = 0; i < 4; i++) after(i * 15, () => launchRocket(cam.x + 40 + i * (view.w - 80) / 3));
        after(60, () => {
          showDialog({
            speaker: INVITE_CONFIG.senderName,
            avatar: "boy",
            lines: DIALOGUES.world3Hug,
            actions: [{ label: "XEM VÉ HẸN HÒ & GỬI CÂU TRẢ LỜI 🎟▶", primary: true, onClick: () => showTicket() }]
          });
        });
      }
    }
    updateCamera(false);
    return;
  }

  const controllable = game.mode === "play" && !isOverlayOpen();
  let dir = 0;
  if (controllable) { if (input.left) dir -= 1; if (input.right) dir += 1; }

  const accel = p.onGround ? PHYS.accel : PHYS.airAccel;
  if (dir !== 0) { p.vx += dir * accel; p.facing = dir; }
  else { p.vx *= p.onGround ? PHYS.friction : 0.94; if (Math.abs(p.vx) < 0.05) p.vx = 0; }
  p.vx = clamp(p.vx, -PHYS.maxSpeed, PHYS.maxSpeed);

  if (controllable && input.jumpPressed) p.jumpBuf = PHYS.buffer;
  input.jumpPressed = false;
  if (p.onGround) p.coyote = PHYS.coyote; else if (p.coyote > 0) p.coyote--;
  if (p.jumpBuf > 0) {
    p.jumpBuf--;
    if (p.coyote > 0) { p.vy = PHYS.jumpVel; p.coyote = 0; p.jumpBuf = 0; p.onGround = false; Sound.play("jump"); }
  }
  p.vy = Math.min(p.vy + PHYS.gravity, PHYS.maxFall);

  const wasGround = p.onGround;
  moveX(p, L);
  moveY(p, L);
  if (p.onGround) {
    p.safeX = p.x; p.safeY = p.y;
    if (!wasGround && game.onLand) { const fn = game.onLand; game.onLand = null; fn(); }
  }
  if (p.y > WORLD_H + 32) {
    p.x = p.safeX; p.y = p.safeY - 2; p.vx = 0; p.vy = 0;
    spawnParticles(p.x + 5, p.y + 7, 12, ["#ffffff", "#ff8fa3"]);
  }
  p.anim += p.onGround ? Math.abs(p.vx) * 0.12 : 0;

  // Cập nhật Enemies (Chú rùa xanh tuần tra)
  if (L.enemies && L.enemies.length) {
    for (const e of L.enemies) {
      if (e.dead) continue;
      if (e.shell) {
        if (e.vx !== 0) {
          e.x += e.vx;
          if (e.x <= e.minX - 40 || e.x >= e.maxX + 60) e.dead = true;
        } else {
          e.shellTimer--;
          if (e.shellTimer <= 0) { e.shell = false; e.vx = 0.45; }
        }
      } else {
        e.x += e.dir * e.vx;
        e.anim += 0.1;
        if (e.x <= e.minX) { e.x = e.minX; e.dir = 1; }
        else if (e.x >= e.maxX) { e.x = e.maxX; e.dir = -1; }
      }

      // Va chạm với player nếu đang chơi
      if (controllable) {
        const overlapX = (p.x + p.w > e.x + 2) && (p.x < e.x + e.w - 2);
        const overlapY = (p.y + p.h > e.y + 2) && (p.y < e.y + e.h);
        if (overlapX && overlapY) {
          // Nhảy đạp từ trên xuống
          if (p.vy > 0 && (p.y + p.h - p.vy <= e.y + 7)) {
            Sound.play("stomp");
            p.vy = -3.8;
            p.onGround = false;
            spawnParticles(e.x + 7, e.y + 7, 10, ["#4caf50", "#ffd43b", "#ffffff"], { speed: 1.5 });
            if (!e.shell) {
              e.shell = true;
              e.shellTimer = 220;
              e.vx = 0;
              toast("Bốp! Chú rùa thụt vào mai rồi 🐢", 1100);
            } else {
              e.vx = p.facing * 3.5;
              toast("Viuuu! Mai rùa trượt đi 💨", 1100);
            }
          } else {
            // Va chạm ngang
            if (e.shell && e.vx === 0) {
              Sound.play("bump");
              e.vx = (p.x < e.x ? 1 : -1) * 3.5;
              p.vx = (p.x < e.x ? -1 : 1) * 1.5;
              toast("Đá mai rùa đi nè! 🐢💨", 1000);
            } else if (!p.invincible || p.invincible <= 0) {
              Sound.play("bump");
              p.vx = (p.x < e.x ? -2.4 : 2.4);
              p.vy = -1.8;
              p.invincible = 50;
              spawnParticles(p.x + 5, p.y + 7, 8, ["#ffd43b", "#ff8fa3"], { speed: 1.2 });
              toast("Úi! Tránh chú rùa đáng yêu ra nha 🐢", 1200);
            }
          }
        }
      }
    }
  }

  if (p.invincible > 0) p.invincible--;

  if (game.mode === "play" || game.mode === "frozen") collectItems(p, L);
  if (game.mode === "play" && !isOverlayOpen()) checkTriggers(p, L);
  updateNearby();
  updateCamera(false);
  state.playerPosition = { x: Math.round(p.x), y: Math.round(p.y) };
}

function updateCamera(snap) {
  const L = game.level, p = game.player;
  if (!L) return;
  const maxX = Math.max(0, L.cols * TILE - view.w);
  cam.y = WORLD_H - view.h;
  if (!p) { cam.x = clamp(cam.x, 0, maxX); return; }
  const target = clamp(p.x + p.w / 2 - view.w / 2 + p.facing * 18, 0, maxX);
  cam.x = snap ? target : cam.x + (target - cam.x) * 0.1;
}

/* Kiểm tra các sự kiện qua màn và kích hoạt cutscene */
function checkTriggers(p, L) {
  // MÀN 3: Kiểm tra khoảng cách tới chàng trai để kích hoạt Cutscene Ôm Nhau
  if (game.world === 3 && L.npc && !state.isHugging) {
    const npcX = L.npc.c * TILE + 8;
    if (Math.abs(p.x - npcX) < 38) {
      game.mode = "cutscene_hug";
      game.hugPartnerX = npcX;
      return;
    }
  }

  // MÀN 2: Kiểm tra Rương giữa màn (Bật mí địa điểm bí mật)
  if (L.midChest && !L.midChest.opened) {
    const midX = L.midChest.c * TILE;
    if (Math.abs(p.x - midX) < 14) {
      onMidChestReached();
      return;
    }
  }

  const g = L.goal;
  if (!g) return;

  // Cột cờ Màn 1
  if (g.type === "flag" && p.x + p.w > g.c * TILE + 2) onFlagReached();

  // Rương cuối Màn 2 (Lịch trình chi tiết)
  if (g.type === "itinerary_chest" && !game.chestOpen && p.x + p.w > g.c * TILE - 4) onItineraryChestReached();
}

function updateNearby() {
  const L = game.level, p = game.player;
  let found = null;
  if (L && p && game.mode === "play") {
    const pcx = p.x + p.w / 2, pb = p.y + p.h;
    if (L.npc && game.world !== 3) {
      const nx = L.npc.c * TILE + 8;
      if (Math.abs(pcx - nx) < 22 && Math.abs(pb - GROUND_Y) < 20) found = { type: "npc", id: "npc" };
    }
  }
  setNearby(found);
}

function setNearby(n) {
  const key = n ? `${n.type}:${n.id}` : "";
  if (key === game.nearKey) return;
  game.nearKey = key;
  game.near = n;
  if (!n) {
    els.prompt.classList.add("hidden");
    els.tcAction.classList.remove("ready");
    return;
  }
  els.promptName.textContent = `💬 ${INVITE_CONFIG.senderName}`;
  els.btnInteract.textContent = "NÓI CHUYỆN";
  els.tcAction.textContent = "NÓI";
  els.prompt.classList.remove("hidden");
  els.tcAction.classList.add("ready");
}

function interact() {
  if (game.near && game.near.type === "npc") {
    talkToNpc();
  }
}
function talkToNpc() {
  const lines = [
    "Anh đang chờ em đó 💗",
    "Phía trước còn nhiều điều bất ngờ lắm, đi tiếp đi em!",
    "Mỗi trái tim là một điều anh luôn yêu thương ở em ✨"
  ];
  const line = lines[Math.floor(Math.random() * lines.length)];
  Sound.play("open");
  showDialog({ lines: [line] });
}

/* ==========================================================================
   8. VẼ (RENDER)
   ========================================================================== */
function resize() {
  if (!canvas) return;
  const rect = els.stage.getBoundingClientRect();
  const sw = Math.max(1, rect.width), sh = Math.max(1, rect.height);
  const scale = Math.max(0.5, Math.min(sw / VIEW_LIMITS.minW, sh / VIEW_LIMITS.minH));
  view.scale = scale;
  view.w = clamp(Math.floor(sw / scale), VIEW_LIMITS.minW, VIEW_LIMITS.maxW);
  view.h = clamp(Math.floor(sh / scale), VIEW_LIMITS.minH, VIEW_LIMITS.maxH);
  canvas.width = view.w;
  canvas.height = view.h;
  canvas.style.width = Math.floor(view.w * scale) + "px";
  canvas.style.height = Math.floor(view.h * scale) + "px";
  ctx.imageSmoothingEnabled = false;

  // Bầu trời thay đổi theo màn: Màn 3 hoàng hôn lãng mạn
  skyGrad = ctx.createLinearGradient(0, 0, 0, view.h);
  if (game.world === 3) {
    skyGrad.addColorStop(0, "#4a255b");
    skyGrad.addColorStop(0.45, "#d2527f");
    skyGrad.addColorStop(1, "#f39c12");
  } else {
    skyGrad.addColorStop(0, "#5fb8ff");
    skyGrad.addColorStop(1, "#c9ecff");
  }
  updateCamera(true);
}

function render() {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = skyGrad || "#6ec6ff";
  ctx.fillRect(0, 0, view.w, view.h);
  const L = game.level;
  if (!L) return;
  const cx = Math.round(cam.x), cy = Math.round(cam.y);

  drawBackground(cx, cy);
  for (const d of L.decor) drawDecor(d, cx, cy);
  if (L.goal && L.goal.type === "flag") drawFlag(L.goal.c * TILE - cx, GROUND_Y - cy);

  // Ô gạch
  const c0 = Math.max(0, Math.floor(cx / TILE)), c1 = Math.min(L.cols - 1, Math.floor((cx + view.w) / TILE));
  for (let r = 0; r < ROWS; r++) {
    for (let c = c0; c <= c1; c++) {
      const t = L.tiles[r][c];
      if (t === ".") continue;
      const img = SPR.tiles[t];
      if (!img) continue;
      const b = game.bumps.find((bb) => bb.c === c && bb.r === r);
      const off = b ? Math.round(Math.sin((b.t / 8) * Math.PI) * 4) : 0;
      ctx.drawImage(img, c * TILE - cx, r * TILE - cy - off);
    }
  }

  // Rương giữa màn ở Màn 2 (Địa điểm bí mật)
  if (L.midChest) {
    const mx = L.midChest.c * TILE - cx, my = GROUND_Y - 16 - cy;
    if (L.midChest.opened) {
      ctx.globalAlpha = 0.35 + Math.sin(game.t / 8) * 0.15;
      px(ctx, mx - 6, my - 10, 28, 26, "#fff6b0");
      ctx.globalAlpha = 1;
    }
    ctx.drawImage(L.midChest.opened ? SPR.chestOpen : SPR.chestClosed, mx, my);
  }

  // Rương cuối màn (Lịch trình chi tiết)
  if (L.goal && (L.goal.type === "itinerary_chest" || L.goal.type === "dest_chest" || L.goal.type === "ticket_chest")) {
    const gx = L.goal.c * TILE - cx, gy = GROUND_Y - 16 - cy;
    if (game.chestOpen) {
      ctx.globalAlpha = 0.35 + Math.sin(game.t / 8) * 0.15;
      px(ctx, gx - 6, gy - 10, 28, 26, "#fff6b0");
      ctx.globalAlpha = 1;
    }
    ctx.drawImage(game.chestOpen ? SPR.chestOpen : SPR.chestClosed, gx, gy);
  }

  // Enemies (Chú rùa xanh tuần tra)
  if (L.enemies) {
    for (const e of L.enemies) {
      if (e.dead) continue;
      const ex = Math.round(e.x - cx), ey = Math.round(e.y - cy);
      if (ex < -20 || ex > view.w + 20) continue;
      if (e.shell) {
        ctx.drawImage(SPR.turtle.shell, ex, ey);
      } else {
        const spr = (Math.floor(e.anim) % 2 === 0) ? SPR.turtle.walk1 : SPR.turtle.walk2;
        ctx.drawImage(e.dir < 0 ? spr.l : spr.r, ex, ey);
      }
    }
  }

  // Xu & tim
  const coinFrame = SPR.coins[Math.floor(game.t / 8) % 4];
  for (const coin of L.coins) if (!coin.taken) ctx.drawImage(coinFrame, coin.x - cx, coin.y - cy);
  for (const h of L.hearts) if (!h.taken) ctx.drawImage(SPR.heart, h.x - cx, h.y - cy + Math.round(Math.sin(game.t / 12 + h.x) * 1.5));

  // Cảnh ÔM NHAU ở Màn 3 (Hug Sprite)
  if (state.isHugging && game.world === 3) {
    const hx = Math.round(game.hugPartnerX - 10 - cx);
    const hy = Math.round(GROUND_Y - 16 - cy);
    ctx.drawImage(SPR.hug, hx, hy);
    drawArrow(hx + 10, hy - 8);
  } else {
    // Vẽ NPC (chàng trai) nếu chưa ôm
    if (L.npc) {
      const nx = L.npc.c * TILE, ny = GROUND_Y - 16;
      const p = game.player;
      const faceLeft = p ? (p.x + p.w / 2 < nx + 8) : true;
      const blink = (game.t % 180) < 8;
      const f = blink ? SPR.boy.blink : SPR.boy.idle;
      ctx.drawImage(faceLeft ? f.l : f.r, nx - cx, ny - cy);
    }

    // Người chơi (công chúa)
    const p = game.player;
    if (p && game.mode !== "attract") {
      let f;
      if (!p.onGround) f = SPR.princess.jump;
      else if (Math.abs(p.vx) > 0.25) f = (Math.floor(p.anim) % 2 === 0) ? SPR.princess.run1 : SPR.princess.run2;
      else f = (game.t % 200) < 8 ? SPR.princess.blink : SPR.princess.idle;
      const bob = p.onGround && Math.abs(p.vx) > 0.25 && Math.floor(p.anim) % 2 === 0 ? -1 : 0;
      if (p.invincible > 0 && Math.floor(game.t / 4) % 2 === 0) ctx.globalAlpha = 0.4;
      ctx.drawImage(p.facing < 0 ? f.l : f.r, Math.round(p.x - 3 - cx), Math.round(p.y - 2 - cy + bob));
      ctx.globalAlpha = 1;
    }
  }

  // Hạt & pháo hoa
  for (const pt of game.particles) {
    const a = clamp(pt.life / (pt.max || 30), 0, 1);
    ctx.globalAlpha = a;
    if (pt.type === "heart") ctx.drawImage(SPR.heart, Math.round(pt.x - cx), Math.round(pt.y - cy));
    else if (pt.type === "coin") ctx.drawImage(SPR.coins[Math.floor(game.t / 3) % 4], Math.round(pt.x - cx), Math.round(pt.y - cy));
    else px(ctx, Math.round(pt.x - cx), Math.round(pt.y - cy), pt.size, pt.size, pt.color);
  }
  ctx.globalAlpha = 1;
  for (const rk of game.rockets) px(ctx, Math.round(rk.x - cx), Math.round(rk.y - cy), 2, 3, rk.color);
}

function drawBackground(cx, cy) {
  const cloudScroll = cx * 0.15 + game.t * 0.08;
  const s0 = Math.floor(cloudScroll / 130) - 1, s1 = s0 + Math.ceil(view.w / 130) + 2;
  for (let i = s0; i <= s1; i++) {
    const x = Math.round(i * 130 + hash(i) * 60 - cloudScroll);
    const y = Math.round(-90 + hash(i + 99) * 130 - cy * 0.6);
    ctx.drawImage(SPR.cloud, x, y);
  }
  const farScroll = cx * 0.2;
  for (let i = Math.floor(farScroll / 230) - 1; i <= Math.floor((farScroll + view.w) / 230) + 1; i++) {
    const x = Math.round(i * 230 + hash(i + 7) * 80 - farScroll);
    ctx.drawImage(SPR.hillFar, x, GROUND_Y - cy - SPR.hillFar.height + 6);
  }
  const nearScroll = cx * 0.45;
  for (let i = Math.floor(nearScroll / 170) - 1; i <= Math.floor((nearScroll + view.w) / 170) + 1; i++) {
    const big = hash(i + 3) > 0.5;
    const img = big ? SPR.hillBig : SPR.hillSmall;
    const x = Math.round(i * 170 + hash(i + 13) * 60 - nearScroll);
    ctx.drawImage(img, x, GROUND_Y - cy - img.height);
  }
}

function drawDecor(d, cx, cy) {
  const x = d.c * TILE - cx;
  if (x < -100 || x > view.w + 20) return;
  switch (d.type) {
    case "bush": ctx.drawImage(SPR.bush, x, GROUND_Y - 12 - cy); break;
    case "tree": ctx.drawImage(SPR.tree, x, GROUND_Y - 32 - cy); break;
    case "flower": {
      const fx = x + d.off, fy = GROUND_Y - 6 - cy;
      px(ctx, fx + 2, fy + 3, 1, 3, "#2a8a33");
      px(ctx, fx + 1, fy, 3, 3, d.color); px(ctx, fx + 2, fy + 1, 1, 1, "#fff6b0");
      break;
    }
    case "castle": ctx.drawImage(SPR.castle, x, GROUND_Y - 80 - cy); break;
    case "gate": drawGate(x, GROUND_Y - cy); break;
  }
}

function drawGate(x, gy) {
  const OL = "#3b1f2b", ST = "#ff9ec4", SD = "#e0709e";
  px(ctx, x, gy - 56, 10, 56, OL); px(ctx, x + 1, gy - 55, 8, 55, ST); px(ctx, x + 6, gy - 55, 3, 55, SD);
  px(ctx, x + 54, gy - 56, 10, 56, OL); px(ctx, x + 55, gy - 55, 8, 55, ST); px(ctx, x + 60, gy - 55, 3, 55, SD);
  px(ctx, x - 4, gy - 68, 72, 14, OL); px(ctx, x - 3, gy - 67, 70, 12, "#fff8e7");
  ctx.fillStyle = "#e8435f";
  ctx.font = "8px 'Press Start 2P', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("20/10", x + 32, gy - 60);
  const bob = Math.round(Math.sin(game.t / 15) * 2);
  ctx.drawImage(SPR.heart, x + 28, gy - 80 + bob);
}

function drawFlag(x, gy) {
  px(ctx, x + 6, gy - 4, 6, 4, "#3b1f2b"); px(ctx, x + 7, gy - 3, 4, 3, "#e2b98a");
  px(ctx, x + 8, gy - 72, 2, 68, "#3b1f2b"); px(ctx, x + 8, gy - 72, 1, 68, "#8a8a8a");
  px(ctx, x + 6, gy - 77, 6, 6, "#3b1f2b"); px(ctx, x + 7, gy - 76, 4, 4, "#ffd43b");
  const wave = Math.round(Math.sin(game.t / 10) * 1.5);
  px(ctx, x + 10, gy - 70 + wave, 14, 10, "#3b1f2b");
  px(ctx, x + 10, gy - 69 + wave, 13, 8, "#ff6fa5");
  ctx.drawImage(SPR.heart, x + 13, gy - 69 + wave);
}

function drawArrow(x, y) {
  const b = Math.round(Math.sin(game.t / 6) * 2);
  px(ctx, x - 3, y - 6 + b, 7, 2, "#3b1f2b");
  px(ctx, x - 2, y - 4 + b, 5, 1, "#ffd43b"); px(ctx, x - 1, y - 3 + b, 3, 1, "#ffd43b"); px(ctx, x, y - 2 + b, 1, 1, "#ffd43b");
}

/* ==========================================================================
   9. ĐIỀU KHIỂN
   ========================================================================== */
const KEYMAP = {
  ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right",
  Space: "jump", ArrowUp: "jump", KeyW: "jump", KeyE: "action", Enter: "action"
};

function resetInput() { input.left = input.right = input.jump = input.jumpPressed = false; }

function bindControls() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeTopModal(); return; }
    if (isTypingTarget(e.target)) return;
    if (dialog.open) {
      if (!dialog.actionsShown && ["Space", "Enter", "KeyE", "NumpadEnter"].includes(e.code)) { e.preventDefault(); advanceDialog(); }
      return;
    }
    if (isOverlayOpen() || game.mode !== "play") return;
    const k = KEYMAP[e.code];
    if (!k) return;
    e.preventDefault();
    if (k === "jump") { if (!e.repeat) input.jumpPressed = true; input.jump = true; }
    else if (k === "action") { if (!e.repeat) interact(); }
    else input[k] = true;
  });
  window.addEventListener("keyup", (e) => {
    const k = KEYMAP[e.code];
    if (k === "jump") input.jump = false;
    else if (k === "left" || k === "right") input[k] = false;
  });
  window.addEventListener("blur", resetInput);
  document.addEventListener("visibilitychange", resetInput);

  const hold = (btn, key) => {
    const down = (e) => {
      e.preventDefault();
      Sound.ensure();
      try { btn.setPointerCapture(e.pointerId); } catch (err) {}
      btn.classList.add("pressed");
      if (key === "jump") { input.jump = true; input.jumpPressed = true; } else input[key] = true;
    };
    const up = () => {
      btn.classList.remove("pressed");
      if (key === "jump") input.jump = false; else input[key] = false;
    };
    btn.addEventListener("pointerdown", down);
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((ev) => btn.addEventListener(ev, up));
  };
  hold(els.tcLeft, "left");
  hold(els.tcRight, "right");
  hold(els.tcJump, "jump");
  els.tcAction.addEventListener("pointerdown", (e) => { e.preventDefault(); interact(); });
  els.btnInteract.addEventListener("click", () => interact());

  window.addEventListener("touchstart", () => { if (!isTouch) { isTouch = true; updateControlsVisibility(); } }, { passive: true });
}

let isTouch = false;
function updateControlsVisibility() {
  const inGame = ["world1", "world2", "world3"].includes(state.currentScreen);
  els.touch.classList.toggle("hidden", !(inGame && isTouch));
  els.keyHint.classList.toggle("hidden", !(inGame && !isTouch));
  els.hud.classList.toggle("hidden", !inGame);
  els.btnList.classList.add("hidden"); // Không cần nút danh sách chọn địa điểm vì địa điểm là bí mật cố định
  requestAnimationFrame(resize);
}

/* ==========================================================================
   10. HỘP THOẠI RETRO & POPUP ĐIỀU NGỌT NGÀO
   ========================================================================== */
const dialog = { open: false, lines: [], idx: 0, typing: false, timer: null, actions: null, onClose: null, actionsShown: false };

function showDialog({ speaker = INVITE_CONFIG.senderName, avatar = "boy", lines, actions = null, onClose = null }) {
  resetInput();
  Object.assign(dialog, { open: true, lines, idx: 0, actions, onClose, actionsShown: false });
  els.dialogSpeaker.textContent = speaker;
  const actx = els.dialogAvatar.getContext("2d");
  actx.clearRect(0, 0, 16, 16);
  actx.imageSmoothingEnabled = false;
  if (avatar === "boy") actx.drawImage(SPR.boy.idle.r, 0, 0);
  else if (avatar === "princess") actx.drawImage(SPR.princess.idle.r, 0, 0);
  else actx.drawImage(SPR.heart, 4, 4);
  els.dialog.classList.remove("hidden");
  typeLine();
}
function typeLine() {
  const chars = Array.from(dialog.lines[dialog.idx] || "");
  dialog.typing = true;
  dialog.actionsShown = false;
  els.dialogText.textContent = "";
  els.dialogActions.innerHTML = "";
  els.dialogNext.classList.add("hidden");
  clearInterval(dialog.timer);
  let i = 0;
  dialog.timer = setInterval(() => {
    i++;
    els.dialogText.textContent = chars.slice(0, i).join("");
    if (i % 3 === 0) Sound.play("blip");
    if (i >= chars.length) finishLine();
  }, 26);
}
function finishLine() {
  clearInterval(dialog.timer);
  dialog.typing = false;
  els.dialogText.textContent = dialog.lines[dialog.idx] || "";
  const isLast = dialog.idx >= dialog.lines.length - 1;
  if (isLast && dialog.actions && dialog.actions.length) {
    dialog.actionsShown = true;
    dialog.actions.forEach((a, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "px-btn px-btn-small " + (a.primary ? "px-btn-red" : "");
      b.textContent = a.label;
      b.addEventListener("click", (ev) => {
        ev.stopPropagation();
        Sound.play("select");
        closeDialog();
        a.onClick && a.onClick();
      });
      els.dialogActions.appendChild(b);
      if (i === 0) setTimeout(() => b.focus({ preventScroll: true }), 30);
    });
  } else {
    els.dialogNext.classList.remove("hidden");
  }
}
function advanceDialog() {
  if (!dialog.open) return;
  if (dialog.typing) { finishLine(); return; }
  if (dialog.idx < dialog.lines.length - 1) { dialog.idx++; typeLine(); return; }
  if (!dialog.actions || !dialog.actions.length) {
    const cb = dialog.onClose;
    closeDialog();
    cb && cb();
  }
}
function closeDialog() {
  clearInterval(dialog.timer);
  dialog.open = false;
  dialog.actionsShown = false;
  els.dialog.classList.add("hidden");
}

/* Hộp thoại bật mí điều ngọt ngào (khi đập hộp quà '?' ở Màn 1) */
function showSweetNoteDialog(index, text) {
  game.mode = "frozen";
  showDialog({
    speaker: `🎁 ĐIỀU ANH THÍCH Ở EM #${index}`,
    avatar: "heart",
    lines: [text],
    actions: [{
      label: "DỄ THƯƠNG QUÁ 💗",
      primary: true,
      onClick: () => {
        game.mode = "play";
        toast(`Đã mở khoá điều #${index}!`, 1800);
      }
    }]
  });
}

/* ==========================================================================
   11. LUỒNG 5 MÀN CHƠI
   ========================================================================== */
const PAGES = ["screen-start", "screen-itinerary", "screen-ticket"];
function showPage(id) {
  PAGES.forEach((p) => {
    const el = $("#" + p);
    if (el) el.classList.toggle("hidden", p !== id);
  });
  if (id) { const el = $("#" + id); if (el) el.scrollTop = 0; }
}
function isOverlayOpen() {
  return dialog.open ||
    !els.locModal.classList.contains("hidden") ||
    !els.listPanel.classList.contains("hidden") ||
    !$("#screen-start").classList.contains("hidden") ||
    !$("#screen-itinerary").classList.contains("hidden") ||
    !$("#screen-ticket").classList.contains("hidden");
}
function closeAllModals() {
  els.locModal.classList.add("hidden");
  if (dialog.open) closeDialog();
}
function closeTopModal() {
  if (!els.locModal.classList.contains("hidden")) { closeLocation(); return; }
  if (!els.editMenu.classList.contains("hidden")) els.editMenu.classList.add("hidden");
}

function updateHUD() {
  els.hudCoins.textContent = String(state.collectedCoins).padStart(2, "0");
  els.hudHearts.textContent = String(state.collectedHearts);
  const n = game.world || 1;
  els.hudMission.textContent = `${n}/3`;
  els.hudWorld.textContent = String(n);
  els.hudWorldName.textContent = " · " + (WORLD_INFO[n] ? WORLD_INFO[n].name : "");
}

let bannerTimer = null;
function showWorldBanner(n) {
  els.bannerCode.textContent = `WORLD ${n}`;
  els.bannerName.textContent = WORLD_INFO[n].name;
  els.banner.classList.remove("hidden");
  els.banner.classList.remove("show");
  void els.banner.offsetWidth;
  els.banner.classList.add("show");
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => els.banner.classList.add("hidden"), 2600);
}

function startAttract() {
  game.world = 1;
  game.level = buildWorld1();
  game.player = null;
  game.mode = "attract";
  cam.x = 0;
}

function startNewGame() {
  const sound = state.soundOn;
  state = createInitialState();
  state.soundOn = sound;
  Sound.ensure();
  Sound.play("start");
  clearProgress();
  startWorld(1, { intro: true });
}

function startWorld(n, opts = {}) {
  closeAllModals();
  showPage(null);
  state.currentScreen = "world" + n;
  game.world = n;
  game.level = LEVEL_BUILDERS[n]();
  applyCollected(game.level);
  game.particles = []; game.rockets = []; game.timers = []; game.bumps = [];
  game.chestOpen = false; game.fireworksAuto = false; game.onLand = null;
  state.isHugging = false;
  game.nearKey = "__"; setNearby(null);

  const L = game.level;
  const sx = (opts.spawnC != null ? opts.spawnC : L.spawn.c) * TILE + 3;
  game.player = createPlayer(sx, GROUND_Y - 14);
  updateControlsVisibility();
  resize();
  updateCamera(true);
  updateHUD();
  saveProgress();

  if (opts.intro) {
    game.player.y = cam.y - 24;
    game.mode = "intro";
    game.onLand = () => {
      Sound.play("land");
      spawnParticles(game.player.x + 5, game.player.y + 14, 16, ["#ffffff", "#ff8fa3", "#ffd43b"], { speed: 1.6, up: 0.6 });
      burstHearts(game.player.x + 5, game.player.y - 6, 4);
      game.mode = "frozen";
      after(30, () => showDialog({
        speaker: INVITE_CONFIG.senderName,
        avatar: "boy",
        lines: DIALOGUES.intro,
        actions: [{ label: "EM ĐÃ HIỂU RỒI! BẮT ĐẦU THÔI ▶", primary: true, onClick: () => { game.mode = "play"; showWorldBanner(1); } }]
      }));
    };
    return;
  }

  game.mode = "play";
  showWorldBanner(n);

  if (n === 2 && !opts.skipIntro) {
    game.mode = "frozen";
    after(50, () => showDialog({
      lines: DIALOGUES.world2Intro,
      actions: [{ label: "BẮT ĐẦU THỬ THÁCH ▶", primary: true, onClick: () => { game.mode = "play"; } }]
    }));
  }
}

/* KẾT THÚC MÀN 1: Chạm cột cờ */
function onFlagReached() {
  const p = game.player, L = game.level;
  game.mode = "frozen";
  p.vx = 0;
  Sound.play("success");
  burstHearts(L.goal.c * TILE + 16, GROUND_Y - 60, 10);
  spawnParticles(L.goal.c * TILE + 16, GROUND_Y - 70, 30, ["#ff6fa5", "#ffd43b", "#ffffff"], { speed: 2 });
  after(60, () => showDialog({
    lines: DIALOGUES.world1Done,
    actions: [{ label: "VÀO MÀN 2: THỬ THÁCH BÍ MẬT ▶", primary: true, onClick: () => startWorld(2) }]
  }));
}

/* MÀN 2 — GIỮA MÀN: Chạm rương 1 mở địa điểm cố định */
function onMidChestReached() {
  const L = game.level;
  if (!L.midChest || L.midChest.opened) return;
  L.midChest.opened = true;
  Sound.play("open");
  const gx = L.midChest.c * TILE + 8;
  spawnParticles(gx, GROUND_Y - 16, 25, ["#ffd43b", "#fff6b0", "#ff6fa5"], { speed: 2, up: 1.5 });
  burstHearts(gx, GROUND_Y - 24, 10);
  launchRocket(cam.x + view.w / 2);
  after(20, () => Sound.play("success"));
  after(45, () => openSecretDestinationModal());
}

/* MÀN 2 — CUỐI MÀN: Chạm rương 2 mở lịch trình chi tiết */
function onItineraryChestReached() {
  const L = game.level;
  game.mode = "frozen";
  game.player.vx = 0;
  game.chestOpen = true;
  Sound.play("open");
  const gx = L.goal.c * TILE + 8;
  spawnParticles(gx, GROUND_Y - 16, 30, ["#ffd43b", "#fff6b0", "#ff6fa5"], { speed: 2, up: 1.5 });
  burstHearts(gx, GROUND_Y - 24, 12);
  for (let i = 0; i < 3; i++) after(i * 15, () => launchRocket(cam.x + 30 + i * (view.w - 60) / 2));
  after(30, () => Sound.play("success"));
  after(65, () => goToItinerary());
}

function goToItinerary() {
  closeAllModals();
  game.mode = "frozen";
  state.currentScreen = "itinerary";
  game.world = 2;
  ensureItinerary();
  updateControlsVisibility();
  showPage("screen-itinerary");
  renderItinerary();
  saveProgress();
}

function returnToTicket() {
  state.editingFromTicket = false;
  showTicket();
}

/* ==========================================================================
   12. MODAL ĐỊA ĐIỂM BÍ MẬT (MÀN 2)
   ========================================================================== */
function openSecretDestinationModal() {
  resetInput();
  Sound.play("open");
  const loc = SECRET_DESTINATION;

  // Render ảnh thật sắc nét (không pixel hoá)
  const box = els.locMedia;
  box.innerHTML = "";
  box.classList.remove("loading");
  if (!loc.image) {
    box.innerHTML = `<div class="loc-placeholder"><strong>${esc(loc.name)}</strong><small>Ảnh đang được cập nhật</small></div>`;
  } else {
    const img = new Image();
    img.className = "loc-photo";
    img.alt = loc.name;
    img.onload = () => box.classList.remove("loading");
    img.onerror = () => {
      box.classList.remove("loading");
      box.innerHTML = `<div class="loc-placeholder"><strong>${esc(loc.name)}</strong><small>Ảnh đang được cập nhật</small></div>`;
    };
    box.classList.add("loading");
    img.src = loc.image;
    box.appendChild(img);
  }

  els.locCat.innerHTML = `✨ BẬT MÍ ĐIỂM HẸN BÍ MẬT NGÀY 20/10 ✨`;
  els.locName.textContent = loc.name;
  els.locDesc.textContent = loc.description;

  const meta = [];
  if (loc.address) meta.push(["📍 Địa chỉ", loc.address]);
  if (loc.whyThisPlace) meta.push(["💖 Vì sao anh chọn nơi này", loc.whyThisPlace]);
  if (loc.price) meta.push(["💰 Chi phí", loc.price]);
  if (loc.note) meta.push(["📝 Ghi chú của anh", loc.note]);

  els.locMeta.innerHTML = meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  els.locStatus.innerHTML = `<span class="badge badge-gold">★ ĐIỂM HẸN HOÀN HẢO DÀNH CHO EM</span>`;

  els.locActions.innerHTML = `
    <button class="px-btn px-btn-red px-btn-big font-arcade" type="button" id="btn-dest-next">
      EM RẤT THÍCH! TIẾP TỤC HÀNH TRÌNH ▶
    </button>
  `;

  $("#btn-dest-next").addEventListener("click", () => {
    closeLocation();
    game.mode = "play";
    toast("Hãy vượt qua chặng đường còn lại để mở rương lịch trình nhé! 🎁", 2400);
  });

  els.locModal.classList.remove("hidden");
  els.locModal.scrollTop = 0;
}

function closeLocation() {
  els.locModal.classList.add("hidden");
  if (game.world === 2 && game.mode === "frozen") {
    game.mode = "play";
  }
}

/* ==========================================================================
   13. WORLD 3 — LỊCH TRÌNH & NÀNG ĐƯỢC PHÉP CHỈNH SỬA
   ========================================================================== */
function ensureItinerary() {
  const it = state.itinerary;
  if (!it.date) it.date = defaultDateISO();
  if (!it.pickupTime) it.pickupTime = DEFAULT_ITINERARY.pickupTime;
  if (typeof it.startTime !== "string") it.startTime = it.pickupTime;
  if (!PLANNING_MODES.some((mode) => mode.id === it.planningMode)) it.planningMode = "sender";
  if (!it.pickupPlace) it.pickupPlace = DEFAULT_ITINERARY.pickupPlace;
  if (!it.dinnerTime) it.dinnerTime = DEFAULT_ITINERARY.dinnerTime;
  if (!it.endTime) it.endTime = DEFAULT_ITINERARY.endTime;
  if (!Array.isArray(it.activities)) {
    it.activities = JSON.parse(JSON.stringify(DEFAULT_ITINERARY.activities));
  }
}

function renderPlanningModes() {
  els.modeOptions.innerHTML = PLANNING_MODES.map((mode) => `
    <button type="button" class="mode-btn" data-mode="${mode.id}" aria-pressed="false">${esc(mode.label)}</button>
  `).join("");
  updatePlanningMode();
}

function updatePlanningMode() {
  const selected = PLANNING_MODES.find((mode) => mode.id === state.itinerary.planningMode) || PLANNING_MODES[0];
  $$("[data-mode]", els.modeOptions).forEach((button) => {
    const active = button.dataset.mode === selected.id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  els.modeDesc.textContent = selected.description;
}

function applyItineraryTemplate(id) {
  const template = ITINERARY_TEMPLATES.find((item) => item.id === id);
  if (!template) return;
  const it = state.itinerary, source = template.itinerary;
  ["pickupTime", "startTime", "dinnerTime", "endTime"].forEach((key) => { it[key] = source[key]; });
  it.activities = source.activities.map((activity) => ({ ...activity, id: uid() }));
  renderItinerary();
  markEdited();
  Sound.play("select");
  toast(`Đã áp dụng mẫu: ${template.label}`);
  const button = $$("[data-template]", els.templateOptions).find((item) => item.dataset.template === id);
  if (button) button.focus({ preventScroll: true });
}

function renderItinerary() {
  const it = state.itinerary;
  renderPlanningModes();
  els.templateOptions.innerHTML = ITINERARY_TEMPLATES.map((template) => `
    <button type="button" class="px-btn px-btn-small" data-template="${template.id}">${esc(template.label)}</button>
  `).join("");

  // Hiển thị thông báo địa điểm cố định
  els.itSelected.innerHTML = `
    <span class="chip chip-main">📍 ĐIỂM HẸN CHÍNH: ${esc(SECRET_DESTINATION.name)} (Anh đã bí mật chuẩn bị chu đáo)</span>
  `;

  els.itDate.value = it.date || "";
  els.itPickupTime.value = it.pickupTime || "";
  els.itPickupPlace.value = it.pickupPlace || "";
  els.itStart.value = it.startTime || "";
  els.itDinner.value = it.dinnerTime || "";
  els.itEnd.value = it.endTime || "";
  els.itNotes.value = it.notes || "";
  els.btnItTicket.classList.toggle("hidden", !state.editingFromTicket);

  renderActivities();
}

function renderActivities() {
  const acts = state.itinerary.activities;
  if (!acts.length) {
    els.activityList.innerHTML = `<li class="empty">Chưa có hoạt động nào. Hãy nhấn "+ THÊM HOẠT ĐỘNG" nhé!</li>`;
    return;
  }
  els.activityList.innerHTML = acts.map((a, i) => `
    <li class="act-item" data-id="${esc(a.id)}">
      <button type="button" class="drag-handle" title="Kéo hoặc dùng phím ↑ ↓ để đổi thứ tự" aria-label="Di chuyển hoạt động ${i + 1}">⠿</button>
      <span class="act-index">${i + 1}</span>
      <div class="act-fields">
        <input type="time" class="act-time" data-field="time" value="${esc(a.time)}" aria-label="Giờ" />
        <input type="text" class="act-title" data-field="title" value="${esc(a.title)}" maxlength="140" placeholder="Tên hoạt động" />
        <input type="text" class="act-note" data-field="note" value="${esc(a.note)}" maxlength="200" placeholder="Ghi chú (tuỳ chọn)" />
      </div>
      <div class="act-buttons">
        <button type="button" class="px-btn px-btn-tiny" data-act="up" ${i === 0 ? "disabled" : ""}>▲</button>
        <button type="button" class="px-btn px-btn-tiny" data-act="down" ${i === acts.length - 1 ? "disabled" : ""}>▼</button>
        <button type="button" class="px-btn px-btn-tiny px-btn-red" data-act="del">✕</button>
      </div>
    </li>`).join("");
}

function moveActivity(id, offset, focusSelector) {
  const acts = state.itinerary.activities;
  const from = acts.findIndex((activity) => activity.id === id);
  const to = from + offset;
  if (from < 0 || to < 0 || to >= acts.length) return;
  const [activity] = acts.splice(from, 1);
  acts.splice(to, 0, activity);
  renderActivities();
  markEdited();
  Sound.play("blip");
  const row = $$(".act-item", els.activityList).find((item) => item.dataset.id === id);
  const control = $(focusSelector, row);
  (control.disabled ? $(".drag-handle", row) : control).focus({ preventScroll: true });
}

function bindActivityDrag() {
  const list = els.activityList;
  let drag = null;
  let scrollFrame = null;

  const placeRow = () => {
    const next = $$(".act-item", list).find((row) => {
      if (row === drag.row) return false;
      const rect = row.getBoundingClientRect();
      return drag.y < rect.top + rect.height / 2;
    });
    if (drag.row.nextElementSibling !== (next || null)) list.insertBefore(drag.row, next || null);
  };

  const autoScroll = () => {
    if (!drag || !drag.active) return;
    const page = els.screenItinerary;
    const rect = page.getBoundingClientRect();
    const delta = drag.y < rect.top + 48 ? -12 : drag.y > rect.bottom - 48 ? 12 : 0;
    const previous = page.scrollTop;
    page.scrollTop += delta;
    if (page.scrollTop !== previous) placeRow();
    scrollFrame = requestAnimationFrame(autoScroll);
  };

  const finish = (commit) => {
    if (!drag) return;
    const current = drag;
    drag = null;
    cancelAnimationFrame(scrollFrame);
    if (list.hasPointerCapture(current.pointerId)) list.releasePointerCapture(current.pointerId);
    list.classList.remove("is-dragging");
    current.row.classList.remove("dragging");
    if (!current.active) return;
    if (commit) {
      const oldOrder = state.itinerary.activities;
      const byId = new Map(oldOrder.map((activity) => [activity.id, activity]));
      const newOrder = $$(".act-item", list).map((row) => byId.get(row.dataset.id));
      if (newOrder.some((activity, i) => activity !== oldOrder[i])) {
        state.itinerary.activities = newOrder;
        markEdited();
        Sound.play("blip");
        toast("Đã đổi thứ tự hoạt động");
      }
    }
    renderActivities();
    const row = $$(".act-item", list).find((item) => item.dataset.id === current.row.dataset.id);
    if (row) $(".drag-handle", row).focus({ preventScroll: true });
  };

  list.addEventListener("pointerdown", (event) => {
    const handle = event.target.closest(".drag-handle");
    if (!handle || drag || !event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    handle.focus({ preventScroll: true });
    drag = { row: handle.closest(".act-item"), pointerId: event.pointerId, startY: event.clientY, y: event.clientY, active: false };
    list.setPointerCapture(event.pointerId);
  });
  list.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    drag.y = event.clientY;
    if (!drag.active) {
      if (Math.abs(drag.y - drag.startY) < 5) return;
      drag.active = true;
      drag.row.classList.add("dragging");
      list.classList.add("is-dragging");
      scrollFrame = requestAnimationFrame(autoScroll);
    }
    placeRow();
  });
  list.addEventListener("pointerup", (event) => { if (drag && event.pointerId === drag.pointerId) finish(true); });
  ["pointercancel", "lostpointercapture"].forEach((name) => {
    list.addEventListener(name, (event) => { if (drag && event.pointerId === drag.pointerId) finish(false); });
  });
  list.addEventListener("keydown", (event) => {
    if (drag || !event.target.matches(".drag-handle") || !["ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    moveActivity(event.target.closest(".act-item").dataset.id, event.key === "ArrowUp" ? -1 : 1, ".drag-handle");
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drag) { event.preventDefault(); finish(false); }
  });
  window.addEventListener("blur", () => finish(false));
  document.addEventListener("visibilitychange", () => { if (document.hidden) finish(false); });
}

function bindItinerary() {
  const bindField = (el, key) => el.addEventListener("input", () => { state.itinerary[key] = el.value; markEdited(); });
  bindField(els.itDate, "date");
  bindField(els.itPickupTime, "pickupTime");
  bindField(els.itStart, "startTime");
  bindField(els.itPickupPlace, "pickupPlace");
  bindField(els.itDinner, "dinnerTime");
  bindField(els.itEnd, "endTime");
  bindField(els.itNotes, "notes");

  els.modeOptions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mode]");
    if (!button) return;
    state.itinerary.planningMode = button.dataset.mode;
    updatePlanningMode();
    markEdited();
    Sound.play("select");
  });
  els.templateOptions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-template]");
    if (button) applyItineraryTemplate(button.dataset.template);
  });
  bindActivityDrag();

  els.activityList.addEventListener("input", (e) => {
    const field = e.target.dataset.field;
    if (!field) return;
    const li = e.target.closest(".act-item");
    const a = state.itinerary.activities.find((x) => x.id === li.dataset.id);
    if (!a) return;
    a[field] = e.target.value;
    markEdited();
  });

  els.activityList.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const li = b.closest(".act-item");
    const acts = state.itinerary.activities;
    const i = acts.findIndex((x) => x.id === li.dataset.id);
    if (i < 0) return;
    if (b.dataset.act === "up" || b.dataset.act === "down") {
      moveActivity(li.dataset.id, b.dataset.act === "up" ? -1 : 1, `[data-act="${b.dataset.act}"]`);
      return;
    }
    if (b.dataset.act === "del") acts.splice(i, 1);
    Sound.play("blip");
    renderActivities(); markEdited();
  });

  els.btnAddActivity.addEventListener("click", () => {
    const acts = state.itinerary.activities;
    const last = acts.length ? acts[acts.length - 1].time : state.itinerary.pickupTime;
    acts.push({ id: uid(), time: addMinutes(last, 60), title: "", note: "" });
    Sound.play("blip");
    renderActivities(); markEdited();
  });

  els.btnGenActivity.addEventListener("click", () => {
    applyItineraryTemplate("prepared");
    els.btnGenActivity.focus({ preventScroll: true });
  });

  els.btnItBack.addEventListener("click", () => {
    closeAllModals();
    showPage(null);
    state.currentScreen = "world2";
    game.mode = "play";
    updateControlsVisibility();
  });
  els.btnItNext.addEventListener("click", () => {
    Sound.play("select");
    startWorld(3); // Sang Màn 3 mới: Sunset Finale (Hội ngộ hoàng hôn & Ôm nhau!)
  });
  els.btnItTicket.addEventListener("click", () => { Sound.play("select"); returnToTicket(); });
}

let saveTimer = null;
function markEdited() {
  if (state.sendState === "sent") state.sendState = "idle";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveProgress, 300);
}

/* ==========================================================================
   14. WORLD 4 — HỒ SƠ & TRẠNG THÁI
   ========================================================================== */
function renderStatusOptions(container, name) {
  container.innerHTML = STATUS_OPTIONS.map((o) => `
    <label class="status-opt ${state.confirmationStatus === o.id ? "checked" : ""}">
      <input type="radio" name="${name}" value="${o.id}" ${state.confirmationStatus === o.id ? "checked" : ""} />
      <span>${esc(o.label)}</span>
    </label>`).join("");
}

function renderProfile() {
  const g = state.guestProfile;
  els.pfName.value = g.name;
  els.pfEmail.value = g.email;
  els.pfPhone.value = g.phone;
  els.pfFood.value = g.favoriteFood;
  els.pfPref.value = g.preferences;
  els.pfMessage.value = g.message;
  renderStatusOptions(els.pfStatus, "pf-status");
  $$(".field-error", els.profileForm).forEach((e) => { e.textContent = ""; });
  els.btnPfTicket.classList.toggle("hidden", !state.editingFromTicket);
}

function validateProfile() {
  const g = state.guestProfile;
  const errs = {};
  if (!g.name.trim()) errs["pf-name"] = "Em nhập tên hoặc biệt danh nhé 💗";
  if (g.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g.email.trim())) errs["pf-email"] = "Email chưa đúng định dạng";
  if (g.phone.trim() && !/^[0-9+\-\s().]{8,20}$/.test(g.phone.trim())) errs["pf-phone"] = "Số điện thoại chưa hợp lệ";
  $$(".field-error", els.profileForm).forEach((e) => { e.textContent = errs[e.dataset.for] || ""; });
  const first = Object.keys(errs)[0];
  if (first) { Sound.play("error"); $("#" + first).focus(); return false; }
  return true;
}

function bindProfile() {
  const map = [
    [els.pfName, "name"], [els.pfEmail, "email"], [els.pfPhone, "phone"],
    [els.pfFood, "favoriteFood"], [els.pfPref, "preferences"], [els.pfMessage, "message"]
  ];
  map.forEach(([el, key]) => {
    if (!el) return;
    el.addEventListener("input", () => {
      state.guestProfile[key] = el.value;
      if (state.sendState === "sent") state.sendState = "idle";
      renderTicket(); // Live update trên tấm vé Boarding Pass!
    });
  });

  if (els.pfStatus) {
    els.pfStatus.addEventListener("change", (e) => {
      if (e.target.type !== "radio") return;
      state.confirmationStatus = e.target.value;
      if (state.sendState === "sent") state.sendState = "idle";
      Sound.play("blip");
      renderTicket();
    });
  }

  if (els.profileForm) {
    els.profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateProfile()) return;
      Sound.play("select");
      showTicket();
    });
  }

  if (els.btnPfBack) els.btnPfBack.addEventListener("click", () => goToItinerary());
  if (els.btnPfTicket) els.btnPfTicket.addEventListener("click", () => { if (validateProfile()) returnToTicket(); });
}

/* ==========================================================================
   15. WORLD 5 — VÉ HẸN HÒ ĐIỆN TỬ
   ========================================================================== */
function showTicket() {
  closeAllModals();
  ensureItinerary();
  state.currentScreen = "ticket";
  game.world = 3;
  game.mode = "frozen";
  game.fireworksAuto = true;
  state.editingFromTicket = false;
  updateControlsVisibility();
  showPage("screen-ticket");
  els.editMenu.classList.add("hidden");
  renderTicket();
  saveProgress();
}

function renderTicket() {
  const g = state.guestProfile, it = state.itinerary;
  const ticketNo = "2010-" + String(hashStr(g.name + it.date) % 10000).padStart(4, "0");
  const statusCls = state.confirmationStatus ? `st-${state.confirmationStatus}` : "st-none";
  const statusText = state.confirmationStatus ? STATUS_LABELS[state.confirmationStatus] : "CHƯA CHỌN";

  const actHtml = (it.activities || []).map((a) => `
    <li><span class="tl-time">${esc(a.time || "--:--")}</span><span class="tl-text">${esc(a.title || "(chưa đặt tên)")}${a.note ? `<small>${esc(a.note)}</small>` : ""}</span></li>
  `).join("");

  const extra = [
    ["GHI CHÚ LỊCH TRÌNH", it.notes],
    ["MÓN EM YÊU THÍCH", g.favoriteFood],
    ["SỞ THÍCH & LƯU Ý", g.preferences],
    ["LỜI NHẮN GỬI ANH", g.message]
  ].filter(([, v]) => v && v.trim());

  els.ticket.innerHTML = `
    <div class="ticket-head">
      <span class="ticket-brand font-arcade">SUPER DATE</span>
      <span class="ticket-sub font-arcade">LEVEL 20/10 · ADMIT 2</span>
    </div>
    <div class="ticket-body">
      <div class="tk-player"><span class="tk-label">PLAYER</span><span class="tk-big">${esc(g.name || "Công chúa")}</span></div>
      <div class="tk-grid">
        <div class="span-2"><span class="tk-label">NGÀY HẸN</span><span class="tk-val">${esc(formatDateVN(it.date))}</span></div>
        <div><span class="tk-label">GIỜ ĐÓN</span><span class="tk-val">${esc(it.pickupTime || "--:--")}</span></div>
        <div><span class="tk-label">GIỜ BẮT ĐẦU</span><span class="tk-val">${esc(it.startTime || "--:--")}</span></div>
        <div><span class="tk-label">ĂN TỐI</span><span class="tk-val">${esc(it.dinnerTime || "--:--")}</span></div>
        <div><span class="tk-label">KẾT THÚC</span><span class="tk-val">${esc(it.endTime || "--:--")}</span></div>
        <div class="span-2"><span class="tk-label">NGƯỜI LÊN KẾ HOẠCH</span><span class="tk-val">${esc((PLANNING_MODES.find((mode) => mode.id === it.planningMode) || PLANNING_MODES[0]).label)}</span></div>
        <div class="span-2"><span class="tk-label">ĐIỂM ĐÓN</span><span class="tk-val">${esc(it.pickupPlace || "—")}</span></div>
        <div class="span-2"><span class="tk-label">ĐIỂM HẸN BÍ MẬT</span><span class="tk-val" style="color:#d9487f">★ ${esc(SECRET_DESTINATION.name)}</span></div>
      </div>
      <div class="tk-section"><span class="tk-label">LỊCH TRÌNH CHI TIẾT</span><ol class="tk-timeline">${actHtml}</ol></div>
      ${extra.map(([k, v]) => `<div class="tk-section"><span class="tk-label">${esc(k)}</span><p class="tk-text">${esc(v)}</p></div>`).join("")}
      <div class="tk-status ${statusCls}">TRẠNG THÁI: ${esc(statusText)}</div>
    </div>
    <div class="ticket-stub">
      <span class="font-arcade">NO.${ticketNo}</span>
      <span class="barcode" aria-hidden="true"></span>
      <span class="stub-coins">● ${state.collectedCoins} XU · ♥ ${state.collectedHearts} TIM</span>
    </div>`;

  renderStatusOptions(els.tkStatus, "tk-status");
  els.btnConfirm.textContent = state.confirmationStatus === "accepted" ? "✓ DATE CONFIRMED" : "CONFIRM DATE";
  els.btnConfirm.classList.toggle("is-done", state.confirmationStatus === "accepted");
  updateSendButton();
}

function confirmDate() {
  state.confirmationStatus = "accepted";
  if (state.sendState === "sent") state.sendState = "idle";
  Sound.play("success");
  for (let i = 0; i < 4; i++) after(i * 14, () => launchRocket(cam.x + 30 + Math.random() * (view.w - 60)));
  renderTicket();
  toast("💗 Em đã xác nhận hẹn hò! Hãy bấm SEND MY ANSWER để gửi cho anh nhé.", 3800);
}

function updateSendButton() {
  const b = els.btnSend;
  b.disabled = state.sendState === "sending" || state.sendState === "sent";
  b.textContent = { idle: "SEND MY ANSWER", sending: "SENDING...", sent: "SENT ✓", error: "RETRY SEND" }[state.sendState] || "SEND MY ANSWER";
}

function showSendStatus(type, html) {
  els.sendStatus.className = `send-status send-${type}`;
  els.sendStatus.innerHTML = html;
}

function bindTicket() {
  els.btnConfirm.addEventListener("click", confirmDate);
  els.btnEdit.addEventListener("click", () => {
    Sound.play("select");
    state.editingFromTicket = true;
    goToItinerary();
  });

  els.editMenu.addEventListener("click", (e) => {
    const b = e.target.closest("[data-edit]");
    if (!b) return;
    state.editingFromTicket = true;
    if (state.sendState === "sent" || state.sendState === "error") state.sendState = "idle";
    els.sendStatus.classList.add("hidden");
    game.fireworksAuto = false;
    if (b.dataset.edit === "locations") openSecretDestinationModal();
    if (b.dataset.edit === "itinerary") goToItinerary();
    if (b.dataset.edit === "profile") { const el = document.getElementById("pf-name"); if (el) el.focus(); }
  });

  els.tkStatus.addEventListener("change", (e) => {
    if (e.target.type !== "radio") return;
    state.confirmationStatus = e.target.value;
    if (state.sendState === "sent") state.sendState = "idle";
    Sound.play("blip");
    renderTicket();
  });

  els.btnSend.addEventListener("click", sendInvitationResponse);
  els.sendStatus.addEventListener("click", (e) => { if (e.target.closest("[data-retry]")) sendInvitationResponse(); });
}

/* ==========================================================================
   16. GỬI EMAIL VỀ GMAIL (EmailJS)
   ========================================================================== */
function isEmailJsConfigured() {
  return [EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].every(
    (v) => typeof v === "string" && v.trim() !== "" && !/^YOUR_/i.test(v.trim())
  );
}

function buildEmailParams() {
  const g = state.guestProfile, it = state.itinerary;
  const planningMode = (PLANNING_MODES.find((mode) => mode.id === it.planningMode) || PLANNING_MODES[0]).label;
  const actLines = (it.activities || []).map((a, i) => `${i + 1}. ${a.time || "--:--"}  ${a.title || ""}${a.note ? ` (${a.note})` : ""}`).join("\n");
  const schedule = [
    `Ngày hẹn: ${formatDateVN(it.date)}`,
    `Người lên kế hoạch: ${planningMode}`,
    `Điểm hẹn bí mật: ${SECRET_DESTINATION.name} (${SECRET_DESTINATION.address})`,
    `Giờ đón: ${it.pickupTime || "--:--"} tại ${it.pickupPlace || "—"}`,
    `Giờ bắt đầu: ${it.startTime || "--:--"}`,
    `Ăn tối: ${it.dinnerTime || "--:--"}`,
    `Kết thúc: ${it.endTime || "--:--"}`,
    "Hoạt động chi tiết:",
    actLines,
    `Ghi chú lịch trình: ${it.notes || "(không)"}`
  ].join("\n");

  return {
    guest_name: g.name.trim(),
    guest_email: g.email.trim() || "(không cung cấp)",
    guest_phone: g.phone.trim() || "(không cung cấp)",
    reply_to: g.email.trim(),
    confirmation_status: STATUS_LABELS[state.confirmationStatus] || "CHƯA CHỌN",
    planning_mode: planningMode,
    main_location: SECRET_DESTINATION.name,
    selected_locations: SECRET_DESTINATION.name + " (" + SECRET_DESTINATION.address + ")",
    activities: actLines,
    date: formatDateVN(it.date),
    pickup_time: it.pickupTime || "--:--",
    start_time: it.startTime || "--:--",
    pickup_place: it.pickupPlace || "—",
    dinner_time: it.dinnerTime || "--:--",
    end_time: it.endTime || "--:--",
    schedule,
    itinerary_notes: it.notes || "(không)",
    favorite_food: g.favoriteFood || "(không)",
    preferences: g.preferences || "(không)",
    message: g.message || "(không)",
    coins: String(state.collectedCoins),
    hearts: String(state.collectedHearts),
    sent_at: new Date().toLocaleString("vi-VN", { hour12: false })
  };
}

async function sendInvitationResponse() {
  if (state.sendState === "sending") return;
  els.sendStatus.classList.remove("hidden");

  if (!validateProfile()) {
    showSendStatus("warn", "Em hãy nhập <b>Tên hoặc biệt danh</b> ở trên trước khi gửi nhé 💗");
    return;
  }

  if (!state.confirmationStatus) {
    Sound.play("error");
    showSendStatus("warn", "Em hãy chọn <b>câu trả lời</b> ở trên trước khi gửi nhé (đồng ý / muốn chỉnh sửa / cần suy nghĩ thêm).");
    els.tkStatus.classList.add("shake");
    setTimeout(() => els.tkStatus.classList.remove("shake"), 500);
    return;
  }
  if (!state.guestProfile.name.trim()) {
    Sound.play("error");
    showSendStatus("warn", `Em chưa nhập tên. <button type="button" class="px-btn px-btn-tiny" onclick="const el=document.getElementById('pf-name');if(el)el.focus()">NHẬP TÊN</button>`);
    return;
  }
  if (!isEmailJsConfigured()) {
    state.sendState = "error"; updateSendButton(); Sound.play("error");
    showSendStatus("error", "❌ <b>Chưa gửi được:</b> EmailJS chưa được cấu hình key trong script.js. Câu trả lời <b>chưa</b> được gửi đi.");
    return;
  }
  if (!window.emailjs || typeof window.emailjs.send !== "function") {
    state.sendState = "error"; updateSendButton(); Sound.play("error");
    showSendStatus("error", `❌ <b>Chưa gửi được:</b> Không tải được thư viện EmailJS. <button type="button" class="px-btn px-btn-tiny" data-retry>THỬ LẠI</button>`);
    return;
  }

  state.sendState = "sending"; updateSendButton();
  showSendStatus("loading", `<span class="spinner" aria-hidden="true"></span> Đang gửi câu trả lời của em về cho anh…`);
  try {
    const res = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, buildEmailParams(), { publicKey: EMAILJS_PUBLIC_KEY });
    if (!res || res.status !== 200) throw new Error((res && res.text) || "Phản hồi không hợp lệ");
    state.sendState = "sent"; updateSendButton();
    Sound.play("success");
    for (let i = 0; i < 6; i++) after(i * 12, () => launchRocket(cam.x + 20 + Math.random() * (view.w - 40)));
    showSendStatus("success", "✅ <b>Đã gửi thành công!</b> Anh đã nhận được câu trả lời của em rồi. Hẹn gặp em ngày 20/10 nhé! 💗");
  } catch (err) {
    console.error("[SUPER DATE] EmailJS error:", err);
    state.sendState = "error"; updateSendButton(); Sound.play("error");
    const detail = esc((err && (err.text || err.message)) || "Lỗi mạng");
    showSendStatus("error", `❌ <b>Gửi thất bại:</b> ${detail}. <button type="button" class="px-btn px-btn-tiny" data-retry>GỬI LẠI</button>`);
  }
}

/* ==========================================================================
   17. LƯU TIẾN TRÌNH PHIÊN CHƠI TẠM THỜI
   ========================================================================== */
const PROGRESS_KEY = "superdate-progress-v2";
const SOUND_KEY = "superdate-sound";

function saveProgress() {
  try {
    const data = {
      currentScreen: state.currentScreen,
      collectedCoins: state.collectedCoins,
      collectedHearts: state.collectedHearts,
      openedGiftsCount: state.openedGiftsCount,
      collectedKeys: state.collectedKeys,
      itinerary: state.itinerary
    };
    sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (e) {}
}
function loadProgress() {
  try {
    const raw = sessionStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    return d && d.currentScreen && d.currentScreen !== "start" ? d : null;
  } catch (e) { return null; }
}
function clearProgress() { try { sessionStorage.removeItem(PROGRESS_KEY); } catch (e) {} }

function resumeGame(saved) {
  const sound = state.soundOn;
  state = createInitialState();
  state.soundOn = sound;
  state.collectedCoins = Number(saved.collectedCoins) || 0;
  state.collectedHearts = Number(saved.collectedHearts) || 0;
  state.openedGiftsCount = Number(saved.openedGiftsCount) || 0;
  state.collectedKeys = Array.isArray(saved.collectedKeys) ? saved.collectedKeys : [];
  if (saved.itinerary) {
    state.itinerary = Object.assign(state.itinerary, saved.itinerary);
    // Tiến trình cũ từng dùng giờ đón làm giờ bắt đầu.
    if (typeof saved.itinerary.startTime !== "string") state.itinerary.startTime = state.itinerary.pickupTime;
  }
  ensureItinerary();
  Sound.ensure(); Sound.play("start");
  const scr = saved.currentScreen;
  if (scr === "world1") startWorld(1);
  else if (scr === "world2") startWorld(2);
  else if (scr === "itinerary") goToItinerary();
  else if (scr === "world3") startWorld(3);
  else showTicket();
}

/* ==========================================================================
   18. KHỞI ĐỘNG GAME
   ========================================================================== */
let els = {};

function cacheEls() {
  const id = (x) => document.getElementById(x);
  els = {
    stage: id("stage"), hud: id("hud"), touch: id("touch-controls"), keyHint: id("key-hint"),
    hudCoins: id("hud-coins"), hudHearts: id("hud-hearts"), hudMission: id("hud-mission"), hudWorld: id("hud-world"),
    hudWorldName: id("hud-world-name"), hudSelected: id("hud-selected"), btnList: id("btn-list"), btnSoundHud: id("btn-sound-hud"),
    banner: id("world-banner"), bannerCode: id("world-banner-code"), bannerName: id("world-banner-name"),
    prompt: id("interact-prompt"), promptName: id("interact-name"), btnInteract: id("btn-interact"),
    tcLeft: id("tc-left"), tcRight: id("tc-right"), tcJump: id("tc-jump"), tcAction: id("tc-action"),
    btnStart: id("btn-start"), btnContinue: id("btn-continue"), btnSoundStart: id("btn-sound-start"),
    dialog: id("dialog"), dialogBox: id("dialog-box"), dialogAvatar: id("dialog-avatar"), dialogSpeaker: id("dialog-speaker"),
    dialogText: id("dialog-text"), dialogActions: id("dialog-actions"), dialogNext: id("dialog-next"),
    locModal: id("loc-modal"), locMedia: id("loc-media"), locCat: id("loc-cat"), locName: id("loc-name"), locDesc: id("loc-desc"),
    locMeta: id("loc-meta"), locStatus: id("loc-status"), locActions: id("loc-actions"),
    listPanel: id("list-panel"), listSelected: id("list-selected"), listAll: id("list-all"),
    btnListClose: id("btn-list-close"), btnListNext: id("btn-list-next"), btnListTicket: id("btn-list-ticket"),
    screenItinerary: id("screen-itinerary"), modeOptions: id("mode-options"), modeDesc: id("mode-desc"), itSelected: id("it-selected"),
    templateOptions: id("template-options"), itDate: id("it-date"), itPickupTime: id("it-pickup-time"), itPickupPlace: id("it-pickup-place"),
    itStart: id("it-start"), itDinner: id("it-dinner"), itEnd: id("it-end"), itNotes: id("it-notes"), activityList: id("activity-list"),
    btnAddActivity: id("btn-add-activity"), btnGenActivity: id("btn-gen-activity"),
    btnItBack: id("btn-it-back"), btnItNext: id("btn-it-next"), btnItTicket: id("btn-it-ticket"),
    profileForm: id("profile-form"), pfName: id("pf-name"), pfEmail: id("pf-email"), pfPhone: id("pf-phone"), pfFood: id("pf-food"),
    pfPref: id("pf-pref"), pfMessage: id("pf-message"), pfStatus: id("pf-status-options"),
    btnPfBack: id("btn-pf-back"), btnPfTicket: id("btn-pf-ticket"),
    ticket: id("ticket"), tkStatus: id("tk-status-options"), btnConfirm: id("btn-confirm"), btnEdit: id("btn-edit"), btnSend: id("btn-send"),
    editMenu: id("edit-menu"), sendStatus: id("send-status"), toast: id("toast")
  };
}

function updateSoundButtons() {
  els.btnSoundStart.textContent = state.soundOn ? "SOUND: ON" : "SOUND: OFF";
  els.btnSoundHud.textContent = state.soundOn ? "🔊" : "🔇";
}
function toggleSound() {
  state.soundOn = !state.soundOn;
  try { localStorage.setItem(SOUND_KEY, state.soundOn ? "on" : "off"); } catch (e) {}
  updateSoundButtons();
  if (state.soundOn) { Sound.ensure(); Sound.play("coin"); }
}

function bindUI() {
  els.btnStart.addEventListener("click", startNewGame);
  els.btnContinue.addEventListener("click", () => { const s = loadProgress(); if (s) resumeGame(s); else startNewGame(); });
  els.btnSoundStart.addEventListener("click", toggleSound);
  els.btnSoundHud.addEventListener("click", (e) => { toggleSound(); e.currentTarget.blur(); });
  els.dialogBox.addEventListener("click", (e) => { if (!e.target.closest("button")) advanceDialog(); });
  $$("[data-close]").forEach((b) => b.addEventListener("click", closeLocation));
  els.locModal.addEventListener("click", (e) => { if (e.target === els.locModal) closeLocation(); });

  bindItinerary();
  bindProfile();
  bindTicket();
  window.addEventListener("pagehide", () => {
    if (state.currentScreen !== "start") saveProgress();
  });
}

function loop() {
  let last = performance.now(), acc = 0;
  const STEP = 1000 / 60;
  const tick = (now) => {
    acc += Math.min(100, now - last);
    last = now;
    while (acc >= STEP) { update(); acc -= STEP; }
    render();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function init() {
  cacheEls();
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  try { state.soundOn = localStorage.getItem(SOUND_KEY) !== "off"; } catch (e) { state.soundOn = true; }
  isTouch = (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) || navigator.maxTouchPoints > 0;

  buildSprites();
  $("#title-princess").src = spriteUrl(SPR.princess.idle.r, 4);
  $("#title-boy").src = spriteUrl(SPR.boy.idle.l, 4);

  bindUI();
  bindControls();
  updateSoundButtons();

  if (window.ResizeObserver) new ResizeObserver(() => resize()).observe(els.stage);
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", () => setTimeout(resize, 200));

  startAttract();
  resize();
  showPage("screen-start");
  updateControlsVisibility();
  if (loadProgress()) els.btnContinue.classList.remove("hidden");
  if (isEmailJsConfigured() && window.emailjs && window.emailjs.init) {
    try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch (e) { console.warn(e); }
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => render());
  loop();
}

document.addEventListener("DOMContentLoaded", init);
