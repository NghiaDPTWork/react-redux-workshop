import { createContext } from 'react'

export interface AppContextValue {
  currency: 'USD' | 'VND'
  setCurrency: (c: 'USD' | 'VND') => void
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
  currencySymbol: string
  total: number
}

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Để giải quyết bài toán truyền prop qua nhiều cấp trung gian gây phức tạp mã nguồn ta sử dụng context để định nghĩa một không gian lưu trữ dữ liệu dùng chung cho toàn bộ cây component.
// Biến AppContext được khởi tạo bằng phương thức tạo context của thư viện react dùng để lưu trữ các thông tin liên quan đến tiền tệ giao diện cũng như tổng chi phí của ứng dụng.
// Nhờ đó các component con ở bất kỳ vị trí nào cũng có thể kết nối trực tiếp đến context này để đọc hoặc chỉnh sửa dữ liệu mà không cần thông qua cha.
export const AppContext = createContext<AppContextValue | null>(null)
