import { CircleUser, KeyRound } from 'lucide-react'
import Link from 'next/link'
import DarkModeToggle from '@/app/components/dark-mode-toggle'
import Button from '@/app/components/button'
import useServerDarkMode from '@/app/hooks/use-server-dark-mode'
import { createClient } from '@/lib/supabase/server'
import { sizes, variants } from '@/lib/variants'

export default async function Header({ className }: { className?: string }) {
  const theme = useServerDarkMode()
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Finance App</Link>

      <div className="flex items-center">
        <DarkModeToggle defaultMode={await theme === 'dark' ? 'dark' : 'light'} />
        {user && <Button variant="ghost" size="sm" className="flex items-center space-x-1">
          <CircleUser className="w-6 h-6" />
          <span>{user?.email}</span>
        </Button>}
        {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}>
          <KeyRound className="w-6 h-6" />
        </Link>}
      </div>
    </header>
  )
}