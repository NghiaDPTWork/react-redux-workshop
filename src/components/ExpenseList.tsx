import type { Expense } from '../types/expense'
import ExpenseItem from './ExpenseItem'
import ExpenseSummary from './ExpenseSummary'

interface ExpenseListProps {
  expenses: Expense[]
  onDeleteExpense: (id: string) => void
}

// CÁCH LÀM VÀ GIẢI THÍCH FLOW:
// Để loại bỏ việc trung chuyển prop từ cha xuống con gián tiếp qua ExpenseList ta rút gọn danh sách props nhận vào của component này.
// Lúc này ExpenseList chỉ còn nhận danh sách expenses và hàm xóa onDeleteExpense.
// Các thông số khác như currencySymbol hay theme sẽ do chính component con là ExpenseItem tự truy vấn từ context.
function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  return (
    <div className="expense-list">
      <ExpenseSummary />
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ul>
          {expenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDeleteExpense={onDeleteExpense}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
