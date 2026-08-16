import type { ReactNode } from 'react'

interface ShellProps {
  title?: ReactNode
  subtitle?: ReactNode
  right?: ReactNode
  children: ReactNode
  footer?: ReactNode
  centered?: boolean
}

export function Shell({ title, subtitle, right, children, footer, centered }: ShellProps) {
  return (
    <main className="mx-auto flex h-full overflow-hidden w-full max-w-3xl flex-col px-5 pb-8 pt-6 sm:pt-10">
      {title && (
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[1.6rem] leading-tight text-text">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-text-2">{subtitle}</p>}
          </div>
          {right}
        </header>
      )}

      <div className={`flex-1 ${centered ? 'flex flex-col items-center justify-center' : ''}`}>{children}</div>

      {footer && <footer className="mt-6">{footer}</footer>}
    </main>
  )
}