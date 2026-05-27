import { useState } from "react";
import type { Expense } from "./types/expense";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  // Khởi tạo state 'expenses' để lưu trữ danh sách các khoản chi tiêu.
  // State được "nhấc lên" (State Lifting) ở component App để cả component Form (thêm)
  // và component List (hiển thị/xóa) đều có thể chia sẻ và thao tác chung dữ liệu.
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Hàm xử lý thêm một khoản chi tiêu mới.
  // Nhận vào thông tin cơ bản (description, amount, category), tự động sinh ID và ngày tháng.
  const handleAddExpense = (expenseData: Omit<Expense, "id" | "date">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  // 3. Hàm xử lý xóa một khoản chi tiêu dựa vào ID.
  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        {/* Truyền hàm thêm chi tiêu xuống Form dưới dạng prop */}
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        {/* Truyền danh sách chi tiêu và hàm xóa xuống List dưới dạng prop */}
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  );
}

export default App;
