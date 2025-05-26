# CamoPatch Website

Đây là website demo cho project [Blackbox-Attack-on-Realworld](https://github.com/hoanglvuit/Blackbox-Attack-on-Realworld.git)

## Công nghệ sử dụng

- **Backend**: FastAPI
- **Frontend**: Tailwind CSS với Vite
- **Database**: Không sử dụng database

## Cấu trúc thư mục

```
CamoPatch-website/
├── README.md
├── backend/
│   ├── saved_log/
│   ├── src/
│   │   ├── api.py
│   │   ├── best_f1.pt
│   │   └── main.py
│   └── requirements.txt
└── frontend/
```

## Hướng dẫn cài đặt và chạy

### 1. Clone project

```bash
git clone https://github.com/hoanglvuit/CamoPatch-website.git
cd CamoPatch-website
```

### 2. Thiết lập Backend

```bash
cd backend
```

Tạo môi trường ảo (virtual environment):

```bash
python -m venv venv
```

Kích hoạt môi trường ảo:

**Windows:**
```bash
venv\Scripts\activate
```

Cài đặt các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

Chạy server backend:

```bash
uvicorn main:app --reload
```

### 3. Thiết lập Frontend

Mở terminal mới và di chuyển đến thư mục frontend:

```bash
cd frontend
```

Cài đặt các dependencies:

```bash
npm install
```

Chạy development server:

```bash
npm run dev
```

## Sử dụng

Sau khi hoàn thành các bước trên, bạn có thể truy cập website thông qua địa chỉ được hiển thị trong terminal của frontend (thường là `http://localhost:5173` hoặc tương tự).

Backend API sẽ chạy trên `http://localhost:8000` (hoặc port được chỉ định trong console).