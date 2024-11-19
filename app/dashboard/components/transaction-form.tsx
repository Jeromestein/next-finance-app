'use client'
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Label from "@/app/components/label";
import Select from "@/app/components/select";
import { categories, types } from "@/lib/consts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/lib/actions";
import FormError from "@/app/components/form-error";

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema)
  })

  const router = useRouter()
  const [isSaving, setSaving] = useState(false)
  const [lastError, setLastError] = useState(null)

  const onSubmit = async (data: any) => {
    setSaving(true)

    try {
      await createTransaction(data)
      router.push('/dashboard')
    } catch (error) {
      setLastError(error)
    }
    finally {
      setSaving(false)
    }
  }


  return <form className="space-y-4"
    onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="mb-1">Type</Label>
        <Select {...register("type")}>
          {types.map(type => (
            <option key={type}>
              {type}
            </option>
          ))}
        </Select>
        <FormError error={errors.type} />
      </div>

      <div>
        <Label className="mb-1">Category</Label>
        <Select {...register("category")}>
          {categories.map(category => (
            <option key={category}>
              {category}
            </option>
          ))}
        </Select>
        <FormError error={errors.category} />
      </div>

      <div>
        <Label className="mb-1">Date</Label>
        <Input {...register("created_at")} />
        <FormError error={errors.created_at} />
      </div>

      <div>
        <Label className="mb-1">Amount</Label>
        <Input type="number" {...register("amount")} />
        <FormError error={errors.amount} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <Label className="mb-1">Description</Label>
        <Input {...register("description")} />
        <FormError error={errors.description} />
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div>
        {lastError && <FormError error={lastError} />}
      </div>
      <Button type="submit" disabled={isSaving}>Save</Button>
    </div>
  </form>
}