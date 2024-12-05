import { cn } from "@/lib/utils"

export function Layout({ children, fixed = false, className }) {
  return (
    <div className={cn("min-h-screen w-full", fixed && "fixed", className)}>
      {children}
    </div>
  )
}

Layout.Header = function LayoutHeader({ children, className }) {
  return (
    <header className={cn("sticky top-0 z-50 border-b bg-background px-4 py-4", className)}>
      {children}
    </header>
  )
}

Layout.Body = function LayoutBody({ children, className }) {
  return (
    <main className={cn("container mx-auto h-[calc(100vh-73px)] px-4 py-6", className)}>
      {children}
    </main>
  )
}