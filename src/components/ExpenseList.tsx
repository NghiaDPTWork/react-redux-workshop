import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { useExpenseFilter } from '../hooks/useExpenseFilter'
import ExpenseItem from './ExpenseItem'
import ExpenseSummary from './ExpenseSummary'

interface ExpenseListProps {
  query: string
}

function ExpenseList({ query }: ExpenseListProps) {
  const expenses = useSelector((state: RootState) => state.expenses.items)
  const activeCategory = useSelector((state: RootState) => state.filters.category)
  
  const categoryFilteredExpenses = activeCategory
    ? expenses.filter(e => e.category === activeCategory)
    : expenses

  const { filteredExpenses, total } = useExpenseFilter(categoryFilteredExpenses, query)

  return (
    <div className="expense-list">
      <ExpenseSummary total={total} />
      <h2>Expenses</h2>
      {filteredExpenses.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ul>
          {filteredExpenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
