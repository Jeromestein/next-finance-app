import Header from '@/app/components/Header'
import Trend from '@/app/components/Trend'
import TransactionItem from '@/app/components/TransactionItem'

export default function Playground() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">Header</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div><Header /></div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="flex space-x-4">
          <Trend type="Income" amount={1000} prevAmount={900} />
          <Trend type="Expense" amount={1000} prevAmount={900} />
          <Trend type="Savings" amount={1000} prevAmount={1100} />
          <Trend type="Investments" amount={1000} prevAmount={1100} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">TransactionItem</h2>
        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
          <TransactionItem type="Saving" description="For children" amount={500} />
          <TransactionItem type="Investment" description="In Microsoft" amount={9000} />
        </div>
      </div>
    </main>
  )
}

