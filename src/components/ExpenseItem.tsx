import { memo, useContext } from 'react'
import type { Expense } from '../types/expense'
import { AppContext } from '../context/AppContext'

interface ExpenseItemProps {
  expense: Expense
  onDeleteExpense: (id: string) => void
}

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Để loại bỏ các props giao diện theme và ký hiệu tiền tệ truyền từ ExpenseList ta sử dụng hook useContext kết nối với AppContext.
// Việc này giúp ExpenseItem tự động lấy về currencySymbol và theme từ context chung.
// Nhờ đó các prop truyền từ cha được tối giản hóa chỉ còn lại dữ liệu của chính chi tiêu đó và callback xóa phần tử.
function ExpenseItem({ expense, onDeleteExpense }: ExpenseItemProps) {
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext must be used within an AppProvider')
  const { currencySymbol, theme } = context

  return (
    <li className="expense-item">
      <span className={`expense-icon category-${expense.category}`}>
        {expense.category === 'Food' ? '\uD83C\uDF54' : expense.category === 'Transport' ? '\uD83D\uDE98' : expense.category === 'Housing' ? '\uD83C\uDFE0' : '\uD83D\uDCCB'}
      </span>
      <span className="expense-description">{expense.description}</span>
      <span className="expense-amount">{currencySymbol}{expense.amount.toFixed(2)}</span>
      <span className="expense-category">{expense.category}</span>
      <span className="expense-date">{expense.date}</span>
      <span className="theme-badge" title={`Theme: ${theme}`}>
        {theme === 'light' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDeleteExpense(expense.id)}
        aria-label="Delete expense"
      >
        {'\u2715'}
      </button>
    </li>
  )
}

export default memo(ExpenseItem)
