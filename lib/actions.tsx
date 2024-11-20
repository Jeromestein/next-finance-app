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

export async function fetchTransactions(range: string, offset = 0, limit = 10) {
  const supabase = await createClient()
  let { data, error } = await supabase
    .rpc('fetch_transactions', {
      limit_arg: limit,
      offset_arg: offset,
      range_arg: range
    })
  if (error) throw new Error("We can't fetch transactions")
  return data
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .delete()
    .eq('id', id)
  if (error) throw new Error(`Could not delete the transaction ${id}`)
  revalidatePath('/dashboard')
}

export async function updateTransaction(id: string, formData: any) {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }
  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .update(validated.data)
    .eq('id', id)
  if (error) {
    throw new Error('Failed creating the transaction')
  }
  revalidatePath('/dashboard')
}

export async function login(prevState: any, formData: any) {
  if ('jura.piotrek@gmail.com' === formData.get('email')) {
    return {
      message: 'You have a success'
    }
  }
  return {
    error: true,
    message: 'Wrong email supplied!'
  }
}