import Link from 'next/link'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { PlusCircle } from 'lucide-react'
import { sizes, variants } from "@/lib/variants"
import { types } from '@/lib/consts'
import TransactionListWrapper from '@/app/dashboard/components/transaction-list-wrapper'
import TransactionListFallback from '@/app/components/transaction-list-fallback'
import Trend from '@/app/dashboard/components/trend'
import TrendFallback from '@/app/dashboard/components/trend-fallback'
import Range from '@/app/dashboard/components/range'

export default async function Dashboard({ searchParams }: { searchParams: { range: string } }) {
  const range = searchParams.range ?? 'last30days'

  return (
    <div className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range />
        </aside>
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {types.map(type => <ErrorBoundary key={type} fallback={
          <div className="text-red-500">Cannot fetch {type} trend data</div>
        }>
          <Suspense fallback={<TrendFallback />}>
            <Trend type={type} range={range} />
          </Suspense>
        </ErrorBoundary>)}
      </section>

      <section className="flex justify-between items-center">
        <h2 className="text-2xl">Transactions</h2>
        <Link href="/dashboard/transaction/add" className={`flex items-center space-x-1 ${variants['outline']} ${sizes['sm']}`}>
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionListWrapper range={range} />
      </Suspense>
    </div>
  )
}