import PageHeader from '@/app/components/page-header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader className="my-8" />
      <main>{children}</main>
      <footer className="mt-auto py-8 text-center">
        Footer
      </footer>
    </>
  )
}
