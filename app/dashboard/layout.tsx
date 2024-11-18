import Header from '@/app/components/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header className="mt-8" />
      {children}
      <footer className="mt-auto text-center py-8">Footer</footer>
    </main>
  )
}
