import TransactionList from '@/app/components/transaction-list'
import TransactionListFallback from '@/app/components/transaction-list-fallback'
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </main>
  )
}