import type { Expense } from "../types/expense";

// Định nghĩa props cho ExpenseList, nhận vào danh sách chi tiêu và callback để xóa
interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {/* Kiểm tra điều kiện: Nếu mảng trống thì hiển thị thông báo chưa có dữ liệu */}
      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            // Luôn cần có thuộc tính 'key' duy nhất khi render danh sách trong React
            // để giúp React tối ưu hóa việc cập nhật, thêm, xóa các phần tử DOM.
            <li key={expense.id} className="expense-item">
              <span className={`expense-icon category-${expense.category}`}>
                {expense.category === "Food"
                  ? "\uD83C\uDF54"
                  : expense.category === "Transport"
                    ? "\uD83D\uDE98"
                    : expense.category === "Housing"
                      ? "\uD83C\uDFE0"
                      : "\uD83D\uDCCB"}
              </span>
              <span className="expense-description">{expense.description}</span>
              <span className="expense-amount">
                ${expense.amount.toFixed(2)}
              </span>
              <span className="expense-category">{expense.category}</span>
              <span className="expense-date">{expense.date}</span>
              <button
                className="delete-btn"
                onClick={() => onDeleteExpense(expense.id)}
                aria-label="Delete expense"
              >
                {"\u2715"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
