import TransactionList from '@/app/components/transaction-list'
import TransactionListFallback from '@/app/components/transaction-list-fallback'
import Trend from './components/trend'
import TrendFallback from './components/trend-fallback'
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Income" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Expense" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Saving" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}  >
          <Trend type="Investment" />
        </Suspense>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </main>
  )
}