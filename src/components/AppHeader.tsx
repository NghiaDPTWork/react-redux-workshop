import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Để loại bỏ việc nhận các tham số cấu hình giao diện từ bên ngoài ta chuyển sang dùng hook useContext để kết nối trực tiếp với AppContext.
// Component lúc này sẽ tự động lấy về trạng thái currency và theme cùng các phương thức cập nhật tương ứng từ context chung.
// Nhờ đó mã nguồn của AppHeader được tinh giản tối đa và tránh được sự phụ phục không cần thiết vào props của cha.
function AppHeader() {
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext must be used within an AppProvider')
  const { currency, setCurrency, theme, setTheme } = context

  return (
    <div className="app-header">
      <div className="app-header-row">
        <span className="app-header-label">Currency</span>
        <button
          className="app-header-btn"
          onClick={() => setCurrency(currency === 'USD' ? 'VND' : 'USD')}
        >
          {currency === 'USD' ? '$ USD' : '₫ VND'}
        </button>
      </div>
      <div className="app-header-row">
        <span className="app-header-label">Theme</span>
        <button
          className="app-header-btn"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '\u2600 Light' : '\uD83C\uDF19 Dark'}
        </button>
      </div>
    </div>
  )
}

export default AppHeader
