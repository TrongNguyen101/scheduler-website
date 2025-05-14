# Scheduler-Website


## Directory Structure for Front-End Web (NextJS 15)

### 1. `app/`
- **Mô tả**: NextJS 15 sử dụng cơ chế App Router, nên routing dựa vào tên folder.
- **Ví dụ**:  
  `localhost:3000/admin` tương ứng với folder `/app/admin`.
- **Chi tiết**:
  - Mỗi folder sẽ chứa:
    - `layout.tsx`: Root layout cho trang (thường chứa các component như `Header`, `Footer`, `Nav`, ... nếu cần thiết).
    - `page.tsx`: Chứa UI chính của trang.
  - **Lưu ý**:
    - Với các trang đơn giản như `login`, chỉ cần duy nhất file `page.tsx`.

---

### 2. `api/`
- **Mô tả**: 
  Đây là nơi định nghĩa các hàm để gọi API, truyền endpoint, data và config cho các method của Axios.
- **Ví dụ**:
  ```typescript
  export const createData = async (data: object) => { 
    const response = await ExampleAPI.createPosts("posts", data, { 
      headers: { 
        "Content-Type": "application/json", 
      }, 
    }); 
    console.log(response); 
    return response;
  };
  ```
  - `posts`: Là endpoint.
  - `data`: Dữ liệu cần truyền.
  - `{ headers }`: Cấu hình bổ sung (ví dụ: token, content-type,...).

---

### 3. `component/`
- **Mô tả**: 
  Chứa các component dùng chung như:
  - `Header`, `Nav`, `Footer`, `Button`, `Modal`, `Alert`, ...

---

### 4. `context/`
- **Mô tả**: 
  Chứa các file quản lý state toàn cục, đặc biệt là liên quan đến xác thực và phân quyền.
- **Ví dụ**:
  - `authcontext.tsx`: Xử lý trạng thái đăng nhập, lưu trữ token.
  - `protectedrouter.tsx`: Kiểm tra quyền truy cập route dựa trên role của người dùng.

---

### 5. `hooks/`
- **Mô tả**: 
  Chứa các custom hooks tái sử dụng nhiều lần trong dự án.
- **Ví dụ**:
  - Custom `useEffect`, `useFetch`, `useDebounce`, ...

---

### 6. `lib/`
- **Mô tả**: 
  Thư mục dành cho các thư viện, tiện ích mở rộng tùy chỉnh phục vụ cho dự án.

---

### 7. `services/`
- **Mô tả**: 
  Chứa các hàm xử lý logic gọi API, trung gian giữa tầng `api` và hệ thống.
- **Ví dụ**:
  ```typescript
  export const createPosts = async (
    path: string, 
    data: object, 
    config?: AxiosRequestConfig
  ) => { 
    const response = await baseURL.post(path, data, config); 
    return response.data;
  };
  ```
  - Các tham số `path`, `data`, `config` sẽ được truyền từ các hàm trong folder `api` khi gọi tới.

---

### 8. `utils/`
- **Mô tả**: 
  Chứa các hàm và cấu hình dùng chung cho toàn bộ dự án.
- **Ví dụ**:
  - `baseURL.ts`: Khởi tạo instance của Axios.
  - `registerLicense.ts`: Hàm đăng ký license key của Syncfusion trước khi sử dụng component.

---

### 9. `.env`
- **Mô tả**: 
  Chứa các biến môi trường như:
  - `LICENSE_KEY`: Key bản quyền Syncfusion.
  - `API_URL`: Đường dẫn API chính.
  - `API_PREFIX`: Tiền tố cho endpoint.
  - Các biến cấu hình bảo mật khác.



## Front-End Web Libraries Documentation

### 1. Material UI (MUI)
- **Mục đích sử dụng**: Dùng cho các component nhỏ như `Button`, `Alert`, `Icon`, ...
- **Nguồn tham khảo**: [MUI - The React component library you always wanted](https://mui.com/)
- **Cài đặt package**:
  ```bash
  npm install @mui/material @emotion/react @emotion/styled
  ```
- **Cách import vào hệ thống**:
  Ví dụ import Icon:
  ```typescript
  import SendIcon from "@mui/icons-material/Send";
  ```
- **Ví dụ**: Xem tại thư mục `component/button`

---

### 2. Syncfusion
- **Mục đích sử dụng**: Dùng cho các component lớn như:
  - `Chart`
  - `Scheduler`
  - `Dashboard`
- **Nguồn tham khảo**: [Syncfusion UI Components](https://www.syncfusion.com/)
- **License Key**:
  - Đã được lưu trong file `.env` của dự án.
- **Cài đặt & Import**:
  Ví dụ import Scheduler:
  ```typescript
  import {
    ScheduleComponent,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    DragAndDrop,
  } from "@syncfusion/ej2-react-schedule";
  ```
- **Lưu ý**:
  - Khi sử dụng phải gọi hàm `registerSyncfusionLicense()` tại file:
    ```
    /component/registerLicense.ts
    ```
  - Hàm này sẽ tự động lấy key từ biến môi trường để kích hoạt bản quyền.
- **Custom**:
  - Có thể tuỳ chỉnh giao diện và chức năng bằng cách thay đổi các `props` truyền vào component.

---

### 3. Tailwind CSS
- **Mục đích sử dụng**: Thiết lập UI tổng thể cho website (utility-first CSS framework).
- **Cấu hình**:
  - Đã được config sẵn trong file:
    ```
    /style/global.css
    ```
- **Nguồn tham khảo**: [Tailwind CSS](https://tailwindcss.com/)

