'use server'
import { revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function purgeTransactionListCache() {
  revalidateTag('transaction-list')
}

export async function createTransaction(formData: any) {
  // Handle errors
  // Validate data
  console.log(formData)
  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .insert(formData)

  if (error) {
    console.error(error)
    return {
      message: 'Database Error: Failed to create transaction.'
    }
  }
}
