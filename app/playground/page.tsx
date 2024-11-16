import Header from '@/app/components/Header'
import Trend from '@/app/components/Trend'

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
    </main>
  )
}

