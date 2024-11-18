import TransactionItem from "@/app/components/transaction-item"
import TransactionSummaryItem from "@/app/components/transaction-summary-item"
import Separator from "@/app/components/separator"

const groupAndSumTransactionsByDate = (transactions: any[]) => {
  const grouped: Record<string, { transactions: any[]; amount: number }> = {}
  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0]
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 }
    }
    grouped[date].transactions.push(transaction)
    const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount
    grouped[date].amount += amount
  }
  return grouped
}

export default async function TransactionList() {
  const response = await fetch(
    'http://localhost:3100/transactions'
  )
  const transactions = await response.json()
  console.log(transactions)
  const grouped = groupAndSumTransactionsByDate(transactions)
  console.log(grouped)
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