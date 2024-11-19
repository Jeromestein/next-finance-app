'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createTransaction(formData: any) {
  // Handle errors
  // Validate data
  console.log(formData)
  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .insert(formData)

  if (error) {
    throw new Error('Failed creating the transaction')
  }
  revalidatePath('/dashboard')
}
