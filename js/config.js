/* Cấu hình chung của website: tên, menu, danh sách trang, thông tin liên hệ.
   Sửa ở đây thì header, footer và ô tìm kiếm trên mọi trang đổi theo. */
window.SITE = {
  name: 'StudyMate Slides',
  tagline: 'Thiết kế PowerPoint cho bài tập nhóm sinh viên. Bạn lo nội dung — StudyMate lo phần trình bày.',
  contact: { zalo: '0966450735', email: 'luuhoangluc.03022021@gmail.com', hours: '8:00-22:00' },

  /* đường dẫn tính từ thư mục gốc của website */
  nav: [
    { label: 'Trang chủ', href: 'index.html', page: 'home' },
    { label: 'Dịch vụ', children: [
      { label: 'Giá dịch vụ',     href: 'gia/index.html',      page: 'gia' },
      { label: 'Quy trình',       href: 'quy-trinh/index.html', page: 'quy-trinh' },
      { label: 'Nền tảng hỗ trợ', href: 'nen-tang/index.html',  page: 'nen-tang' },
      { label: 'Cam kết',         href: 'cam-ket/index.html',   page: 'cam-ket' }
    ]},
    { label: 'Dự án',    href: 'du-an/index.html',    page: 'du-an' },
    { label: 'Đánh giá', href: 'danh-gia/index.html', page: 'danh-gia' },
    { label: 'Hỏi đáp',  href: 'faq/index.html',      page: 'faq' },
    { label: 'Về chúng tôi', children: [
      { label: 'Về chúng tôi',      href: 've-chung-toi/index.html', page: 've-chung-toi' },
      { label: 'Bạn lo nội dung',   href: 'van-de/index.html',       page: 'van-de' },
      { label: 'Đối tượng phục vụ', href: 'doi-tuong/index.html',    page: 'doi-tuong' }
    ]},
    { label: 'Liên hệ', href: 'lien-he/index.html', page: 'lien-he' }
  ],

  /* dùng cho ô tìm kiếm */
  pages: [
    {"slug": "du-an", "title": "Dự án", "desc": "Hãy kéo qua lại trái, phải để nhận thấy sự thay đổi sau khi khách hàng lựa chọn dịch vụ làm Slide thuyết trình của chúng tôi", "keywords": "trước sau slide thiết kế lại demo", "href": "du-an/index.html"},
    {"slug": "van-de", "title": "Bạn lo nội dung, StudyMate lo trình bày", "desc": "Dành cho nhóm sinh viên đại học/cao đẳng có bài tập nhóm cần thuyết trình định kỳ, đặc biệt là sinh viên năm 1–3 thiếu thời gian và kỹ năng thiết kế PowerPoint.", "keywords": "vấn đề nhiều chữ deadline", "href": "van-de/index.html"},
    {"slug": "doi-tuong", "title": "Đối tượng phục vụ", "desc": "Nhóm sinh viên đại học/cao đẳng có bài báo cáo, tiểu luận cần chuyển thành PowerPoint để thuyết trình — đặc biệt là sinh viên năm 1–3, sinh viên làm bài nhóm hoặc không có nhiều thời gian và kỹ năng thiết kế PowerPoint.", "keywords": "sinh viên nhóm khách hàng", "href": "doi-tuong/index.html"},
    {"slug": "gia", "title": "Giá dịch vụ", "desc": "Không tính theo đầu người. Chia cho 4–5 bạn, mỗi người chỉ góp vài chục nghìn. Chọn gói phù hợp với tình trạng nội dung của bạn.", "keywords": "giá basic standard premium gói phụ phí", "href": "gia/index.html"},
    {"slug": "quy-trinh", "title": "Quy trình", "desc": "Quy trình rõ ràng, bạn luôn biết mình đang ở bước nào và cần chuẩn bị gì.", "keywords": "bước brief cọc bàn giao", "href": "quy-trinh/index.html"},
    {"slug": "cam-ket", "title": "Cam kết", "desc": "Bảo mật nội dung, đúng thời hạn, hỗ trợ sau bàn giao và tối ưu cho mục đích sử dụng.", "keywords": "bảo mật đúng hạn hỗ trợ", "href": "cam-ket/index.html"},
    {"slug": "danh-gia", "title": "Đánh giá", "desc": "Một vài phản hồi từ các nhóm sinh viên đã sử dụng dịch vụ.", "keywords": "khách hàng nhận xét", "href": "danh-gia/index.html"},
    {"slug": "nen-tang", "title": "Nền tảng hỗ trợ", "desc": "StudyMate ưu tiên PowerPoint để đảm bảo bạn tự chỉnh sửa dễ dàng. Nếu cần nền tảng khác, hãy ghi rõ trong brief.", "keywords": "powerpoint google slides canva", "href": "nen-tang/index.html"},
    {"slug": "lien-he", "title": "Liên hệ & báo giá", "desc": "Điền brief, xem giá tạm tính và gửi cho StudyMate qua Zalo hoặc email.", "keywords": "liên hệ báo giá brief form zalo email", "href": "lien-he/index.html"},
    {"slug": "ve-chung-toi", "title": "Về chúng tôi", "desc": "Vì sao có StudyMate, cách chúng tôi làm việc và đội ngũ.", "keywords": "giới thiệu đội ngũ", "href": "ve-chung-toi/index.html"},
    {"slug": "faq", "title": "Hỏi đáp", "desc": "Giải đáp thắc mắc về dịch vụ, giá, chỉnh sửa và file nhận được.", "keywords": "faq câu hỏi thường gặp", "href": "faq/index.html"}
  ]
};
