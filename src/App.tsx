import { useState, useEffect } from "react";
import type { Expense } from "./types/expense";
import { STORAGE_KEY } from "./constants";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  // Khởi tạo state bằng hàm (Lazy State Initialization) để nạp dữ liệu cũ từ localStorage lên.
  // Điều này chạy duy nhất một lần khi component mount, tránh việc bị render đè dữ liệu rỗng.
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Expense[]) : [];
  });

  // Side effect tự động đồng bộ hóa/lưu mảng 'expenses' xuống localStorage mỗi khi nó thay đổi.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  function handleAddExpense(expense: Omit<Expense, "id">) {
    setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }]);
  }

  function handleDeleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  );
}

export default App;
