'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { transactionSchema } from '@/lib/validation'
export async function createTransaction(formData: any) {
  // Handle errors
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .insert(validated.data)

  if (error) {
    throw new Error('Failed creating the transaction')
  }
  revalidatePath('/dashboard')
}
