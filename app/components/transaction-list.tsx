'use client'

import Button from "@/app/components/button"
import TransactionItem from "@/app/components/transaction-item"
import TransactionSummaryItem from "@/app/components/transaction-summary-item"
import Separator from "@/app/components/separator"
import { fetchTransactions } from "@/lib/actions"
import { groupAndSumTransactionsByDate } from "@/lib/utils"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function TransactionList({ range, initialTransactions }: { range: string, initialTransactions: any[] }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0)
  const [loading, setLoading] = useState(false)
  const grouped = groupAndSumTransactionsByDate(transactions)

  const handleClick = async () => {
    setLoading(true)
    let nextTransactions = null
    try {
      nextTransactions = await fetchTransactions(range, transactions.length, 10)
      setButtonHidden(nextTransactions.length === 0)
      setTransactions(prevTransactions => [
        ...prevTransactions,
        ...nextTransactions
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleRemoved = (id: string) => () => {
    setTransactions(prev => [...prev].filter(t => t.id !== id))
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped)
        .map(([date, { transactions, amount }]) =>
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Separator />
            <section className="space-y-4">
              {transactions.map(transaction => <div key={transaction.id}>
                <TransactionItem {...transaction} onRemoved={handleRemoved(transaction.id)} />
              </div>)}
            </section>
          </div>
        )}
      {transactions.length === 0 && <div className="text-center text-gray-400 dark:text-gray-500">No transactions found</div>}
      {!buttonHidden && <div className="flex justify-center">
        <Button variant="ghost" onClick={handleClick} disabled={loading}>
          <div className="flex items-center space-x-1">
            {loading && <Loader2 className="animate-spin" />}
            <div>Load More</div>
          </div>
        </Button>
      </div>}
    </div>
  )
}