'use client'

import TransactionItem from "@/app/components/transaction-item"
import TransactionSummaryItem from "@/app/components/transaction-summary-item"
import Separator from "@/app/components/separator"
import { groupAndSumTransactionsByDate } from "@/lib/utils"

export default function TransactionList({ initialTransactions }: { initialTransactions: any[] }) {
  const grouped = groupAndSumTransactionsByDate(initialTransactions)
  return (
    <div className="space-y-8">
      {Object.entries(grouped)
        .map(([date, { transactions, amount }]) =>
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Separator />
            <section className="space-y-4">
              {transactions.map(transaction => <div key={transaction.id}>
                <TransactionItem {...transaction} />
              </div>)}
            </section>
          </div>
        )}
    </div>
  )
}