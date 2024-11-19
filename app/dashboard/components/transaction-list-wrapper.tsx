import { fetchTransactions } from "@/lib/actions"
import TransactionList from "@/app/components/transaction-list"

export default async function TransactionListWrapper({ range }: { range: string }) {
  const transactions = await fetchTransactions(range)
  return <TransactionList initialTransactions={transactions} />
}