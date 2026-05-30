import { useState } from 'react'
import { CATEGORIES } from '../constants'
import type { Expense } from '../types/expense'

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void
}

interface FormState {
  description: string
  amount: string
  category: string
}

const initialFormState: FormState = {
  description: '',
  amount: '',
  category: '',
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET' }

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      }
    case 'RESET':
      return initialFormState
    default:
      return state
  }
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  // TODO: replace with useReducer(formReducer, initialFormState)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!description || !amount || !category) return
    onAddExpense({
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
    })
    // TODO: dispatch({ type: 'RESET' })
    setDescription('')
    setAmount('')
    setCategory('')
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <label>
        Name
        <input
          value={description}
          // TODO: onChange => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })
          onChange={e => setDescription(e.target.value)}
          placeholder="e.g. Lunch"
          required
        />
      </label>
      <label>
        Amount ($)
        <input
          value={amount}
          // TODO: onChange => dispatch({ type: 'SET_FIELD', field: 'amount', value: e.target.value })
          onChange={e => setAmount(e.target.value)}
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>
      <label>
        Category
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          {/* TODO: onChange => dispatch({ type: 'SET_FIELD', field: 'category', value: e.target.value }) */}
          <option value="">Select category</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm
