import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Để loại bỏ các tham số prop tổng giá trị và ký hiệu tiền tệ truyền từ cha ta sử dụng hook useContext kết nối với AppContext.
// Component lúc này tự truy vấn tổng tiền total và currencySymbol trực tiếp từ context dùng chung.
// Nhờ đó cấu trúc component được làm gọn hơn và không cần định nghĩa props.
function ExpenseSummary() {
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext must be used within an AppProvider')
  const { total, currencySymbol } = context

  return (
    <div className="expense-summary">
      <span className="expense-summary-label">Total</span>
      <span className="expense-summary-amount">{currencySymbol}{total.toFixed(2)}</span>
    </div>
  )
}

export default ExpenseSummary
