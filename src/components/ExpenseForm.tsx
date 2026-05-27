import { useState } from "react";
import { CATEGORIES } from "../constants";
import type { Expense } from "../types/expense";

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id" | "date">) => void;
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  // Khai báo các state để quản lý giá trị của từng ô nhập liệu
  // (Controlled Component)
  // Mỗi thay đổi của người dùng sẽ cập nhật trực tiếp vào State của React.
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Hàm xử lý khi submit form
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Chuyển đổi dữ liệu amount từ String sang Float
    const parsedAmount = parseFloat(amount);

    // Kiểm tra dữ liệu hợp lệ cơ bản
    if (!description.trim() || isNaN(parsedAmount) || !category) return;

    // Gọi callback prop để truyền dữ liệu lên component cha (App)
    onAddExpense({
      description: description.trim(),
      amount: parsedAmount,
      category,
    });

    // Reset lại toàn bộ state về rỗng (giao diện cũng sẽ tự động xóa sạch text trong ô input)
    setDescription("");
    setAmount("");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>

      <label>
        Name
        {/* Liên kết value với state 'description' 
        và cập nhật qua 'onChange' */}
        <input
          name="description"
          placeholder="e.g. Lunch"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        Amount ($)
        {/* Liên kết value với state 'amount'
         và cập nhật qua 'onChange' */}
        <input
          name="amount"
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>

      <label>
        Category
        {/* Liên kết value với state 'category'
         và cập nhật qua 'onChange' */}
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
