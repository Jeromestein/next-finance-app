"use client"

import SubmitButton from "@/app/components/submit-button";
import Input from "@/app/components/input";
import { login } from "@/lib/actions";

export default function LoginForm() {
  return <form action={login} className="space-y-2">
    <Input type="email" placeholder="name@example.com"
      name="email" required />
    <SubmitButton size="sm" className="w-full">
      Sign in with email
    </SubmitButton>
  </form>
}